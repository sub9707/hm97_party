import React, {useEffect} from 'react';
import styles from './KakaoLogin.module.scss';
import kakaoButton from '/src/assets/icons/kakao_login_small.png';
import kakaoButtonWide from '/src/assets/icons/kakao_login_medium_wide.png';
import useUserStore from '/src/store/userStore';
import axiosInstance from '/src/api/axios';
import { useNavigate } from 'react-router-dom';

function KakaoLogin({wide=false}) {
    const Rest_api_key = import.meta.env.VITE_KAKAO_REST_KEY; // REST API KEY
    const redirect_uri = import.meta.env.VITE_ENVIRONMENT == 'DEVELOPMENT'
    ? `http://${import.meta.env.VITE_API_HOST_DEVELOPMENT}:${import.meta.env.VITE_API_PORT}/auth/kakao`
    : `https://${import.meta.env.VITE_API_HOST_PRODUCTION}`;

    const { setUser } = useUserStore();
    const navigate = useNavigate();

    // OAuth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    
    const handleLogin = () => {
      const kakao = window.Kakao;
      kakao.Auth.login({
        success: async (authObj) => {
          try {
            const response = await axiosInstance.post('/auth/kakao', {
              accessToken: authObj.access_token,
            });
            setUser(response.data.user);
          } catch (error) {
            console.error('로그인 실패:', error);
          }
          navigate('/');
        },
        fail: (err) => {
          console.error('카카오 로그인 실패:', err);
        },
      });
    };

    useEffect(() => {
      // 카카오 SDK 초기화
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
      }
    }, []);

    return (
        <img src={ wide ? kakaoButtonWide : kakaoButton} className={`${styles.kakaoLogin} ${wide ? styles.wide : ''}`} onClick={handleLogin} alt="Login with Kakao" />
    );
}

export default KakaoLogin;
