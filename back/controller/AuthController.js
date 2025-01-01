const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const axios = require('axios');
const crypto = require('crypto');

// 환경 변수 설정
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.ENVIRONMENT === 'DEVELOPMENT'
    ? `http://${process.env.API_URL_DEV}:${process.env.PORT}/auth/kakao/callback`
    : `${process.env.API_URL_PRODUCTION}/auth/kakao/callback`;

const SPREADSHEET_ID = '1TJploids2HnfUCFPAMRHGIBwefzwZYCGix8xAwIvZJM';

// Google Sheets JWT 인증 설정
const authorizeGoogleSheet = new JWT({
    email: process.env.client_email,
    key: process.env.private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// 랜덤 state 값 생성
function generateRandomState() {
    return crypto.randomBytes(16).toString('hex');
}

// 1. 카카오 로그인 URL 생성 및 리다이렉트
exports.kakaoLogin = async(req, res) => {
    const { accessToken } = req.body;
    try {
        // 카카오 사용자 정보 요청
        const response = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userInfo = response.data;

        res.status(200).json({
            message: '로그인 성공',
            user: {
                id: userInfo.id,
                nickname: userInfo.kakao_account.profile.nickname,
                profile_image: userInfo.kakao_account.profile.profile_image_url,
                is_default_image: userInfo.kakao_account.profile.is_default_image,
                createdAt: userInfo.connected_at
            },
        });
    } catch (error) {
        console.error('카카오 사용자 정보 요청 실패:', error);
        res.status(500).json({ message: '로그인 실패' });
    }
};

// 2. 카카오 콜백 처리
exports.kakaoCallback = async (req, res) => {
    try {
        const { code } = req.query;

        // 액세스 토큰 요청
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            params: {
                grant_type: 'authorization_code',
                client_id: KAKAO_CLIENT_ID,
                redirect_uri: KAKAO_REDIRECT_URI,
                code,
            },
        });

        const { access_token } = tokenResponse.data;

        // 사용자 정보 요청
        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const { id, properties: { nickname, profile_image }, kakao_account } = userResponse.data;
        const email = kakao_account?.email || '';

        // Google Sheets API 초기화
        const googleSheet = google.sheets({ version: 'v4', auth: authorizeGoogleSheet });

        // 스프레드시트에서 사용자 검색
        const response = await googleSheet.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A2:E',
        });

        const rows = response.data.values || [];
        const existingUser = rows.find(row => row[0] === id.toString());

        if (existingUser) {
            return res.json({ success: true, user: existingUser });
        }

        return res.json({
            success: false,
            newUser: { id, nickname, email, profile_image },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 3. 카카오 회원가입 처리
exports.kakaoSignup = async (req, res) => {
    try {
        const { id, nickname, profile_image, email } = req.query;
        const createdAt = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString(); // 한국 시간

        // Google Sheets API 초기화
        const googleSheet = google.sheets({ version: 'v4', auth: authorizeGoogleSheet });

        // 신규 사용자 등록
        await googleSheet.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A2:E',
            valueInputOption: 'RAW',
            resource: {
                values: [[id.toString(), nickname, email, profile_image, createdAt]],
            },
        });

        res.redirect(`${process.env.FRONTEND_URL}/welcome`);
    } catch (error) {
        console.error("Kakao signup error:", error.message, error.response?.data || {});
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// 4. 사용자 정보 조회
exports.getUserInfo = async (req, res) => {
    try {
        const { userId } = req.params;

        // Google Sheets API 초기화
        const googleSheet = google.sheets({ version: 'v4', auth: authorizeGoogleSheet });

        // 사용자 데이터 검색
        const response = await googleSheet.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A2:E',
        });

        const rows = response.data.values || [];
        const userRow = rows.find(row => row[0] === userId);

        if (!userRow) {
            console.error("User not found in Google Sheets");
            return res.status(404).json({ error: 'User not found' });
        }

        const [id, nickname, email, profile_image, createdAt] = userRow;
        res.json({ id, nickname, email, profile_image, createdAt });
    } catch (error) {
        console.error("Failed to retrieve user info:", error.message, error.response?.data || {});
        res.status(500).json({ error: 'Failed to retrieve user information' });
    }
};
