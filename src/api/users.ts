import instance from './instance';
import { UserInfo } from '../types/user/users';
import { Sorting, SortType } from '../types/user/idea';
import { GENERATION } from '@/constants/common';

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

// 2.8 유저정보 수정
export const updateUserInfo = async (data: UserInfo) => {
  const response = await instance.put(`/api/v1/users`, data);
  return response.data;
};

// 3.10 내 지원정보 요약 리스트 조회
export const getMyApplySummary = async (phase: number) => {
  const response = await instance.get(`/api/v1/users/applies/overviews?generation=${GENERATION}&phase=${phase}`);
  return response.data;
};

// 3.12 아이디어에 대한 지원 현황 리스트 조회
export const getIdeaApplyStatus = async (
  generation: number,
  phase: number,
  sorting?: Sorting,
  sort_type?: SortType,
) => {
  const queryParams = new URLSearchParams({
    generation: generation.toString(),
    phase: phase.toString(),
  });

  if (sorting) {
    queryParams.append('sorting', sorting);
  }

  if (sort_type) {
    queryParams.append('sort-type', sort_type);
  }

  const response = await instance.get(`/api/v1/users/teams/applies/overviews?${queryParams.toString()}`);
  return response.data;
};

// 3.14 지원 수락
export const acceptApply = async (applyId: number) => {
  const response = await instance.patch(`/api/v1/users/applies/${applyId}/accept`);
  return response.data;
};

// 3.15 지원 거절
export const rejectApply = async (applyId: number) => {
  const response = await instance.patch(`/api/v1/users/applies/${applyId}/reject`);
  return response.data;
};

// 3.17 지원 삭제(지원 취소)
export const deleteApply = async (applyId: number) => {
  const response = await instance.delete(`/api/v1/users/applies/${applyId}`);
  return response.data;
};
