import instance from './instance';

// 팀 정보 조회
export const getTeamInfo = async (generation: number) => {
  const response = await instance.get(`/api/v1/users/teams/details?generation=${generation}`);
  return response.data;
};
