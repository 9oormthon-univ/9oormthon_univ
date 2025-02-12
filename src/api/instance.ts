import axios from 'axios';
import { reissueAPI } from './auth';
import useAuthStore from '../store/useAuthStore';
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

let isRefreshing = false; // 토큰 재발급 중인지 여부
let refreshSubscribers: ((token: string) => void)[] = []; // 토큰 갱신 중인 요청 보관 (요청이 여러 개일 수 있으니 배열로 저장)

// 401 오류 발생하면 accessToken 재발급
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { resetToGuest } = useAuthStore.getState(); // 상태 가져오기
    // 원래 요청 정보 저장
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 토큰 재발급 시, 새 토큰 받을 때까지 대기
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            originalRequest._retry = true;
            resolve(instance(originalRequest)); // 재발급 되면 원래 요청 재시도
          });
        });
      }

      isRefreshing = true;
      originalRequest._retry = true;
      try {
        // 토큰 재발급
        const response = await reissueAPI();
        console.log(response.data);

        isRefreshing = false;
        refreshSubscribers.forEach((callback) => callback(''));
        refreshSubscribers = [];

        return instance(originalRequest); // 원래 요청 다시 시도
      } catch (error) {
        isRefreshing = false;
        refreshSubscribers = [];
        resetToGuest(); // 로그인 풀리면 GUEST로 변경
        console.log(error);
        window.location.href = '/login'; // 리프레시 토큰도 만료되었다면 리다이렉트
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
export default instance;
