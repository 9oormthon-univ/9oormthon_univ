// 회원 관련 api

import instance from './instance';

// 로그인 api
export const loginAPI = async (serial_id: string, password: string) => {
  const response = await instance.post('/api/v1/auth/login', { serial_id, password });

  return response.data;
};
