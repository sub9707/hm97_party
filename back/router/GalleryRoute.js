// GalleryRoute.js
const express = require('express');
const { getAllPictures, uploadMiddleware, uploadPictures } = require('../controller/GalleryController');
const router = express.Router();

// 전체 사진 조회
router.get('/pictures', getAllPictures);
router.post('/upload', uploadMiddleware, uploadPictures);

module.exports = router;
