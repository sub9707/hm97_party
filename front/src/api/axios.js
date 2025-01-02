import axios from 'axios';

// 환경 변수에 따라 baseURL 설정
const baseURL =
  import.meta.env.VITE_ENVIRONMENT === 'DEVELOPMENT'
    ? `http://${import.meta.env.VITE_API_HOST_DEVELOPMENT}:${import.meta.env.VITE_API_PORT}`
    : `https://${import.meta.env.VITE_API_HOST_PRODUCTION}`;

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL, // API 기본 URL
  timeout: 30000, // 요청 타임아웃 (단위: ms)
  headers: {
    'Content-Type': 'application/json', // 기본 Content-Type
  },
  withCredentials: true, // 쿠키 및 인증 정보 포함
});

export default axiosInstance;