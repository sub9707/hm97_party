// RollingPaper.js
const express = require('express');
const { loadCanvas, saveCanvas } = require('../controller/rollingPaperController');
const router = express.Router();

// 전체 사진 조회
router.get('/paper/:userId', loadCanvas);
router.post('/paper/:userId', saveCanvas);

module.exports = router;
