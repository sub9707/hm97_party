const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const axios = require('axios');

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = `http://${process.env.API_URL}:${process.env.PORT}/auth/kakao/callback`;
const SPREADSHEET_ID = '1TJploids2HnfUCFPAMRHGIBwefzwZYCGix8xAwIvZJM';

// Google Sheets authorization
const authorizeGoogleSheet = new JWT({
    email: process.env.client_email,
    key: process.env.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Redirect to Kakao OAuth
exports.kakaoLogin = (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    res.redirect(kakaoAuthURL);
};

// Kakao OAuth callback
exports.kakaoCallback = async (req, res) => {
    try {
        const { code } = req.query;

        // Exchange code for Kakao access token
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: KAKAO_CLIENT_ID,
                redirect_uri: KAKAO_REDIRECT_URI,
                code,
            },
        });

        const { access_token } = tokenResponse.data;

        // Get user info from Kakao
        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const { id, properties: { nickname, profile_image }, kakao_account } = userResponse.data;
        const email = kakao_account?.email || '';

        // Initialize Google Sheets API
        const googleSheet = google.sheets({ version: 'v4', auth: authorizeGoogleSheet });

        // Check if user exists in spreadsheet
        const response = await googleSheet.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A2:C',
        });

        const rows = response.data.values || [];
        const existingUser = rows.find(row => row[0] === id.toString());

        if (existingUser) {
            res.redirect(`${process.env.FRONTEND_URL}/?userId=${id}`);
        } else {
            // New user, redirect to signup
            res.redirect(`/auth/kakao/signup?id=${id}&nickname=${nickname}&profile_image=${profile_image}&email=${email}`);
        }

    } catch (error) {
        console.error("Kakao login error:", error);
        res.status(500).json({ error: 'Failed to log in with Kakao' });
    }
};

// User Signup Route
exports.kakaoSignup = async (req, res) => {
    try {
        const { id, nickname, profile_image, email } = req.query;
        const createdAt = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString(); // 한국 표준시(KST)로 설정

        // Initialize Google Sheets API
        const googleSheet = google.sheets({ version: 'v4', auth: authorizeGoogleSheet });

        // Add new user to spreadsheet
        await googleSheet.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A2:C',
            valueInputOption: 'RAW',
            resource: {
                values: [
                    [
                        id.toString(),
                        nickname,
                        JSON.stringify({ email, profile_image, createdAt }),
                    ],
                ],
            },
        });

        res.redirect(`${process.env.FRONTEND_URL}/`);

    } catch (error) {
        console.error("Kakao signup error:", error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Retrieve user info (after login)
exports.getUserInfo = async (req, res) => {
    try {
        const { userId } = req.params; // 클라이언트에서 userId를 쿼리 파라미터로 전달받음
        // Initialize Google Sheets API
        const googleSheet = google.sheets({ version: 'v4', auth: authorizeGoogleSheet });

        // Get user data from Google Sheets
        const response = await googleSheet.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A2:C',
        });

        const rows = response.data.values || [];

        // Find user by ID
        const userRow = rows.find(row => row[0] === userId);

        if (!userRow) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Parse user information from the row
        const [id, nickname, additionalData] = userRow;
        const { email, profile_image, createdAt } = JSON.parse(additionalData);

        // Return user information as JSON
        res.json({
            id,
            nickname,
            email,
            profile_image,
            createdAt,
        });

    } catch (error) {
        console.error("Failed to retrieve user info:", error);
        res.status(500).json({ error: 'Failed to retrieve user information' });
    }
};
