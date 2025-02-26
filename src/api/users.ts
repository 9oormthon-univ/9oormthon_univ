import instance from './instance';

// 내 정보 조회
export const getMyInfo = async () => {
  const response = await instance.get('/api/v1/users/details');
  return response.data;
};

// 유저 정보 조회
export const getUserInfo = async (userId: string) => {
  const response = await instance.get(`/api/v1/users/${userId}/details`);
  return response.data;
};

// 유저정보 수정
export const updateUserInfo = async (data: any) => {
  const response = await instance.patch(`/api/v1/users`, data);
  return response.data;
};
