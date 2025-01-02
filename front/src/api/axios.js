import axios from 'axios';

// 환경 변수에 따라 baseURL 설정
const baseURL =
  import.meta.env.VITE_ENVIRONMENT === 'DEVELOPMENT'
    ? `http://${import.meta.env.VITE_API_HOST_DEVELOPMENT}:${import.meta.env.VITE_API_PORT}`
    : `https://${import.meta.env.VITE_API_HOST_PRODUCTION}`;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ENVIRONMENT === 'DEVELOPMENT'
    ? `http://${import.meta.env.VITE_API_HOST_DEVELOPMENT}:${import.meta.env.VITE_API_PORT}`
    : `https://${import.meta.env.VITE_API_HOST_PRODUCTION}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 포함 요청
});


export default axiosInstance;