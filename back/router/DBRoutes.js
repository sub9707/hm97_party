const express = require('express');
const router = express.Router();
const dbController = require('../controller/DBController');
// 특정 시트 데이터 전체 가져오기
router.get('/:sheetName', dbController.getAllSheetData);

module.exports = router;