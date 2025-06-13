import instance from './instance';

// 4.6 팀 정보 조회
export const getTeamInfo = async (generation: number) => {
  const response = await instance.get(`/api/v1/users/teams/details?generation=${generation}`);
  return response.data;
};

// 4.9 팀 정보 수정
export const updateTeamInfo = async (generation: number, name: string) => {
  const response = await instance.patch(`/api/v1/users/teams`, {
    generation,
    name,
  });
  return response.data;
};

// 4.10 팀 빌딩 확정
export const confirmTeamBuilding = async (generation: number) => {
  const response = await instance.patch(`/api/v1/users/teams/status?generation=${generation}`);
  return response.data;
};
