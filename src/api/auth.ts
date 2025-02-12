// 회원 관련 api

import instance from './instance';

// JWT 토큰 재발급
export const reissueAPI = async () => {
  const response = await instance.post('/api/v1/auth/reissue');

  return response.data;
};

// 로그인 api
export const loginAPI = async (serial_id: string, password: string) => {
  const response = await instance.post('/api/v1/auth/login', { serial_id, password });

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

// 비밀번호 재설정
export const resetPasswordAPI = async (current_password: string, new_password: string) => {
  const response = await instance.patch('/api/v1/auth/password', {
    current_password,
    new_password,
  });

  return response.data;
};

// 유저 정보 가져오기
export const getUserBriefAPI = async () => {
  const response = await instance.get('/api/v1/auth/briefs');

  return response.data;
};
