import axios from 'axios';
import { reissueAPI } from './auth';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

let isRefreshing = false; // 토큰 재발급 중인지 여부
let refreshSubscribers: ((token: string) => void)[] = []; // 토큰 갱신 중인 요청 보관

// 401 오류 발생하면 accessToken 재발급
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 원래 요청 정보 저장
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 토큰 재발급 시, 새 토큰 받을 때까지 대기
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest._retry = true;
            resolve(instance(originalRequest)); // 재발급 되면 원래 요청 재시도
          });
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        // 토큰 재발급
        const response = await reissueAPI();
        console.log(response);

        isRefreshing = false;
        refreshSubscribers.forEach((callback) => callback(''));
        refreshSubscribers = [];

        return instance(originalRequest);
      } catch (error) {
        isRefreshing = false;
        refreshSubscribers = [];
        console.log(error);
        window.location.href = '/login'; // 리프레시 토큰도 만료되었다면 리다이렉트
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
export default instance;
