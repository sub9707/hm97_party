import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ENVIRONMENT === 'DEVELOPMENT' ? `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}` : `https://${import.meta.env.VITE_API_HOST}`,
  timeout: 30000, // 요청 타임아웃을 설정할 수 있습니다. (단위: ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;