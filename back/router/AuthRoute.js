// AuthRoute.js
const express = require('express');
const router = express.Router();
const { kakaoLogin, kakaoCallback, kakaoSignup, getUserInfo } = require('../controller/AuthController'); // 정확한 경로 확인

router.get('/kakao', kakaoLogin); // Redirect to Kakao login
router.get('/kakao/callback', kakaoCallback); // Handle callback from Kakao
router.get('/kakao/signup', kakaoSignup); // Handle signup for new users
router.get('/kakao/userinfo/:userId', getUserInfo); // Handle signup for new users

module.exports = router;
