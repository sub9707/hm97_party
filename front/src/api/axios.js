import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `https://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`, // 서버의 기본 URL로 설정합니다.
  timeout: 30000, // 요청 타임아웃을 설정할 수 있습니다. (단위: ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;