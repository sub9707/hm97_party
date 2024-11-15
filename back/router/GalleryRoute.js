// GalleryRoute.js
const express = require('express');
const { getAllPictures } = require('../controller/GalleryController');
const router = express.Router();

// 전체 사진 조회
router.get('/pictures', getAllPictures);
module.exports = router;
