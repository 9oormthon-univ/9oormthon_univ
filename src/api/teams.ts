import instance from './instance';
import { GENERATION } from '@/constants/common';

// 4.6 팀 정보 조회
export const getTeamInfo = async () => {
  const response = await instance.get(`/api/v1/users/teams/details?generation=${GENERATION}`);
  return response.data.data;
};

// 4.9 팀 정보 수정
export const updateTeamInfo = async (name: string) => {
  const response = await instance.patch(`/api/v1/users/teams`, {
    generation: GENERATION,
    name,
  });
  return response.data;
};

// 4.10 팀 빌딩 확정
export const confirmTeamBuilding = async () => {
  const response = await instance.patch(`/api/v1/users/teams/status`, {
    generation: GENERATION,
  });
  return response.data;
};
