// 회원 관련 api

import { GENERATION } from '../constants/common';
import instance, { authLessInstance } from './instance';

// JWT 토큰 재발급
export const reissueAPI = async () => {
  const response = await instance.post('/api/v1/auth/reissue');

  return response.data;
};

// 로그인 api
export const loginAPI = async (serial_id: string, password: string) => {
  const response = await authLessInstance.post('/api/v1/auth/login', { serial_id, password });

  return response.data;
};

// 로그아웃 api
export const logoutAPI = async () => {
  const response = await instance.post('/api/v1/auth/logout');
  return response.data;
};

// JWT 재발급
export const refreshAPI = async () => {
  const response = await instance.post('/api/v1/auth/reissue');

  return response.data;
};

// 1.5 인증 정보 간단 조회
export const getUserBriefAPI = async () => {
  const response = await instance.get(`/api/v1/auth/briefs?generation=${GENERATION}`);

  return response.data;
};

// 1.6 비밀번호 재설정
export const resetPasswordAPI = async (current_password: string, new_password: string) => {
  const response = await instance.patch('/api/v1/auth/password', {
    current_password,
    new_password,
  });

  return response.data;
};
