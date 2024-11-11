import React from 'react';
import styles from './KakaoLogin.module.scss';
import kakaoButton from '/src/assets/icons/kakao_login_small.png';
import kakaoButtonWide from '/src/assets/icons/kakao_login_medium_wide.png';

function KakaoLogin({wide=false}) {
    const Rest_api_key = import.meta.env.VITE_KAKAO_REST_KEY; // REST API KEY
    const redirect_uri = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/auth/kakao/callback`; // Backend endpoint for handling Kakao's response

    // OAuth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    };

    return (
        <img src={ wide ? kakaoButtonWide : kakaoButton} className={`${styles.kakaoLogin} ${wide ? styles.wide : ''}`} onClick={handleLogin} alt="Login with Kakao" />
    );
}

export default KakaoLogin;
