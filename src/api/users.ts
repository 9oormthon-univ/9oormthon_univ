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
  const response = await instance.put(`/api/v1/users`, data);
  return response.data;
};

// 내 지원정보 요약 리스트 조회
export const getMyApplySummary = async (generation: number, phase: number) => {
  const response = await instance.get(`/api/v1/users/applies/overviews?generation=${generation}&phase=${phase}`);
  return response.data;
};

// 아이디어에 대한 지원 현황 리스트 조회
export const getIdeaApplyStatus = async (generation: number, phase: number) => {
  const response = await instance.get(`/api/v1/users/teams/applies/overviews?generation=${generation}&phase=${phase}`);
  return response.data;
};

// 지원 결정 (수락)
export const acceptApply = async (applyId: number) => {
  const response = await instance.post(`/api/v1/users/applies/${applyId}/accept`);
  return response.data;
};

// 지원 결정 (거절)
export const rejectApply = async (applyId: number) => {
  const response = await instance.post(`/api/v1/users/applies/${applyId}/reject`);
  return response.data;
};
