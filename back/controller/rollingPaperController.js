const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const URL_EXPIRATION = 3600; // 1시간

// 서명된 URL 생성 유틸리티 함수
const generateSignedUrl = async (key) => {
  return await getSignedUrl(s3Client, new GetObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key
  }), { expiresIn: URL_EXPIRATION });
};

// 캔버스 데이터 저장
exports.saveCanvas = async (req, res) => {
    try {
      const { userId } = req.params;
      const { imageData } = req.body;
  
      if (!userId || !imageData) {
        return res.status(400).json({ error: 'Missing required fields: userId, imageData.' });
      }
  
      // Base64 이미지 데이터 검증 및 변환
      const matches = imageData.match(/^data:image\/png;base64,(.+)$/);
      if (!matches || matches.length !== 2) {
        return res.status(400).json({ error: 'Invalid image format.' });
      }
  
      // 기존 파일 확인 및 삭제
      const listParams = {
        Bucket: S3_BUCKET_NAME,
        Prefix: `${userId}/`,
      };
  
      const listResult = await s3Client.send(new ListObjectsV2Command(listParams));
      
      // 기존 파일이 있다면 삭제
      if (listResult.Contents && listResult.Contents.length > 0) {
        const deleteParams = {
          Bucket: S3_BUCKET_NAME,
          Key: listResult.Contents[0].Key,
        };
        await s3Client.send(new DeleteObjectCommand(deleteParams));
      }
  
      // 새 파일 업로드
      const imageBuffer = Buffer.from(matches[1], 'base64');
      const fileName = `${userId}/${uuidv4()}.png`;
  
      const uploadParams = {
        Bucket: S3_BUCKET_NAME,
        Key: fileName,
        Body: imageBuffer,
        ContentType: 'image/png'
      };
  
      await s3Client.send(new PutObjectCommand(uploadParams));
      const signedUrl = await generateSignedUrl(fileName);
  
      res.status(200).json({
        message: 'Canvas saved successfully.',
        fileName: fileName.split('/').pop(),
        fileUrl: signedUrl
      });
    } catch (error) {
      console.error('Error saving canvas:', error);
      res.status(500).json({ error: 'Failed to save canvas: ' + error.message });
    }
  };

// 캔버스 데이터 가져오기
exports.loadCanvas = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ error: 'Missing required field: userId.' });
      }
  
      const listParams = {
        Bucket: S3_BUCKET_NAME,
        Prefix: `${userId}/`,
      };
  
      const listResult = await s3Client.send(new ListObjectsV2Command(listParams));
  
      if (!listResult.Contents || listResult.Contents.length === 0) {
        return res.status(200).json({ message: 'No images found.', fileUrl: null });
      }
  
      // 가장 최근 업로드된 파일 가져오기
      const file = listResult.Contents.reduce((latest, current) => 
        (new Date(current.LastModified) > new Date(latest.LastModified) ? current : latest)
      );
  
      const fileUrl = await generateSignedUrl(file.Key);
  
      res.status(200).json({
        message: 'Canvas loaded successfully.',
        fileUrl,
      });
    } catch (error) {
      console.error('Error loading canvas:', error.message);
      res.status(500).json({ error: 'Failed to load canvas: ' + error.message });
    }
  };


// 모든 캔버스 데이터 조회
exports.listAllCanvases = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Missing required field: userId.' });
    }

    const listParams = {
      Bucket: S3_BUCKET_NAME,
      Prefix: `${userId}/`,
    };

    const listResult = await s3Client.send(new ListObjectsV2Command(listParams));
    
    // 빈 결과 처리
    if (!listResult.Contents || listResult.Contents.length === 0) {
      return res.status(200).json({
        message: 'No canvases found.',
        files: []
      });
    }

    const files = await Promise.all(listResult.Contents.map(async (file) => ({
      fileName: file.Key.split('/').pop(),
      fileUrl: await generateSignedUrl(file.Key),
      lastModified: file.LastModified,
      size: file.Size
    })));

    res.status(200).json({
      message: 'Canvases retrieved successfully.',
      files
    });
  } catch (error) {
    console.error('Error listing canvases:', error);
    res.status(500).json({ error: 'Failed to list canvases: ' + error.message });
  }
};