const { GoogleSpreadsheet } = require("google-spreadsheet");
const {google} = require('googleapis');
const {  JWT } = require('google-auth-library');

const serviceAccountAuth = new JWT({
    email: process.env.client_email,
    key: process.env.private_key,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, serviceAccountAuth);


exports.getAllSheetData = async (req, res) => {
    try {
        const authorize = new google.auth.JWT(
            process.env.client_email,
            null,
            process.env.private_key.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets']
        );

        // Google Sheets API 초기화
        const googleSheet = google.sheets({ version: 'v4', auth: authorize });

        // 스프레드시트의 데이터 가져오기
        const response = await googleSheet.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range: 'users!A2:C', // 데이터 시작 범위 (A열:번호, B열:이름, C열:상세 정보)
        });

        // 스프레드시트 데이터를 가져온 후 가공
        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'No data found.' });
        }

        // 데이터를 객체 형태로 가공
        const formattedData = rows.map((row) => {
            return {
                number: row[0] || '',          // 번호
                name: row[1] || '',            // 이름
                details: JSON.parse(row[2] || '{}'),  // 상세 정보를 JSON으로 파싱
            };
        });

        res.json(formattedData);

    } catch (error) {
        console.error("Error reading spreadsheet data:", error);
        res.status(500).json({ error: "Failed to fetch spreadsheet data" });
    }
};
