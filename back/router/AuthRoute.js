// AuthRoute.js
const express = require('express');
const router = express.Router();
const { kakaoLogin, kakaoCallback, kakaoSignup, getUserInfo } = require('../controller/AuthController');

router.get('/kakao', kakaoLogin);
router.get('/kakao/callback', kakaoCallback); 
router.get('/kakao/signup', kakaoSignup);
router.get('/kakao/userinfo/:userId', getUserInfo);

module.exports = router;
