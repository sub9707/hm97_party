const { GoogleSpreadsheet } = require("google-spreadsheet");
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

const serviceAccountAuth = new JWT({
    email: process.env.client_email,
    key: process.env.private_key,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, serviceAccountAuth);

exports.getAllComments = async (req, res) => {
    try {
        const authorize = new google.auth.JWT(
            process.env.client_email,
            null,
            process.env.private_key.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets']
        );
        const googleSheet = google.sheets({ version: 'v4', auth: authorize });

        // A1:E에서 컬럼명 포함 데이터 가져오기
        const response = await googleSheet.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range: 'comments!A1:E',
        });

        // 전체 데이터 (첫 행: 컬럼명, 이후: 데이터)
        const rows = response.data.values;

        // 컬럼명 추출 (첫 번째 행)
        const headers = rows[0];

        // 데이터 매핑 (두 번째 행부터)
        const comments = rows.slice(1).map(row => {
            const comment = {};
            headers.forEach((header, index) => {
                comment[header] = row[index] || null; // 값이 없으면 null로 처리
            });
            return comment;
        });

        // JSON 형식으로 응답
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

exports.addComment = async (req, res) => {
    try {
        const authorize = new google.auth.JWT(
            process.env.client_email,
            null,
            process.env.private_key.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets']
        );
        const googleSheet = google.sheets({ version: 'v4', auth: authorize });

        const { username, content } = req.body;

        if (!username || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 새로운 ID 생성
        const response = await googleSheet.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range: 'comments!A2:A', // ID가 위치한 열
        });
        const rows = response.data.values || [];
        const newId = rows.length + 1; // 기존 ID 개수 + 1

        // 날짜 변환 함수
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
        };

        // 현재 시간 포맷팅
        const currentTime = formatDate(new Date());

        // 데이터 추가하기
        await googleSheet.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range: 'comments!A1:D',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[newId, username, content, currentTime]], // 포맷팅된 날짜 사용
            },
        });

        res.status(200).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const authorize = new google.auth.JWT(
            process.env.client_email,
            null,
            process.env.private_key.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets']
        );
        const googleSheet = google.sheets({ version: 'v4', auth: authorize });

        const { username, commentId } = req.query;

        if (!username || !commentId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // comments 시트 ID 가져오기 함수
        const getSheetId = async (sheetTitle) => {
            const response = await googleSheet.spreadsheets.get({
                spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            });

            const sheet = response.data.sheets.find(sheet => sheet.properties.title === sheetTitle);
            return sheet ? sheet.properties.sheetId : null;
        };

        // comments 시트 ID 가져오기
        const commentsSheetId = await getSheetId('comments');
        if (!commentsSheetId) {
            return res.status(400).json({ error: 'Sheet "comments" not found' });
        }

        // comments 시트 데이터 가져오기
        const response = await googleSheet.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range: 'comments!A2:D',
        });

        const rows = response.data.values || [];
        let rowIndexToDelete = -1;

        // 삭제할 행의 인덱스 찾기
        rows.forEach((row, index) => {
            if (row[0] === commentId && row[1] === username) {
                rowIndexToDelete = index + 2; // A2부터 시작하므로 +2
            }
        });

        if (rowIndexToDelete === -1) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // 행 삭제 요청
        await googleSheet.spreadsheets.batchUpdate({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            resource: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: commentsSheetId,
                                dimension: 'ROWS',
                                startIndex: rowIndexToDelete - 1,
                                endIndex: rowIndexToDelete,
                            },
                        },
                    },
                ],
            },
        });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};




