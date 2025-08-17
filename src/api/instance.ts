import axios from 'axios';
import { reissueAPI } from './auth';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from '@goorm-dev/vapor-components';
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

export const authLessInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false; // 토큰 재발급 중인지 여부
let refreshSubscribers: ((token: string) => void)[] = []; // 토큰 갱신 중인 요청 보관 (요청이 여러 개일 수 있으니 배열로 저장)

let navigate: ReturnType<typeof useNavigate> | null = null;

export const setAxiosNavigate = (nav: ReturnType<typeof useNavigate>) => {
  navigate = nav;
};

// 401 오류 발생하면 accessToken 재발급
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 원래 요청 정보 저장
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 401에러 코드 - 토큰 재발급이 필요한 경우들
    const retryableCodes = [40101, 40102, 40108]; // EXPIRED_TOKEN, INVALID_TOKEN, NOT_FOUND_AUTHORIZATION_COOKIE
    if (retryableCodes.includes(error.response?.data?.error?.code) && !originalRequest._retry) {
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
        await reissueAPI();

        isRefreshing = false;
        refreshSubscribers.forEach((callback) => callback(''));
        refreshSubscribers = [];

        return instance(originalRequest); // 원래 요청 다시 시도
      } catch (error) {
        isRefreshing = false;
        refreshSubscribers = [];
        useAuthStore.getState().resetToGuest(); // 로그인 풀리면 GUEST로 변경
        toast('로그아웃 되었습니다. 다시 로그인해주세요.', { type: 'danger' });
        if (navigate) {
          navigate('/login');
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
export default instance;
