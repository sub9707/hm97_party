const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const creds = require('../credentials/applied-terrain-403516-0a3c705c33e1.json'); // 인증 정보 JSON 파일

// Google 인증 객체 생성
const serviceAccountAuth = new JWT({
    email: creds.client_email,
    key: creds.private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive'],
});

exports.getAllPictures = async (req, res) => {
    try {
        // Google Drive API 초기화
        const drive = google.drive({ version: 'v3', auth: serviceAccountAuth });

        // 'gallery' 폴더의 ID 가져오기
        const folderResponse = await drive.files.list({
            q: "name = 'gallery' and mimeType = 'application/vnd.google-apps.folder'",
            fields: 'files(id, name)',
            includeItemsFromAllDrives: true, // 모든 드라이브 포함
            supportsAllDrives: true,        // 공유 드라이브 지원
        });

        if (!folderResponse.data.files || folderResponse.data.files.length === 0) {
            return res.status(404).json({ error: 'Gallery folder not found.' });
        }

        const galleryFolderId = folderResponse.data.files[0].id;

        // 'gallery' 폴더 내의 이미지 파일 가져오기
        const filesResponse = await drive.files.list({
            q: `'${galleryFolderId}' in parents and mimeType contains 'image/'`,
            fields: 'files(id, name, mimeType, webViewLink, webContentLink, description)',
        });

        const files = filesResponse.data.files;

        if (!files || files.length === 0) {
            return res.status(404).json({ error: 'No images found in the gallery folder.' });
        }

        // 이미지 파일 정보 응답
        const imageList = files.map(file => ({
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            webViewLink: file.webViewLink, // 웹에서 열 수 있는 링크
            webContentLink: file.webContentLink, // 직접 다운로드 링크
            description: file.description || 'No description available.', // 상세 설명 (없으면 기본 값)
        }));

        res.json(imageList);
    } catch (error) {
        console.error("Error fetching images from gallery folder:", error);
        res.status(500).json({ error: "Failed to fetch images" });
    }
};