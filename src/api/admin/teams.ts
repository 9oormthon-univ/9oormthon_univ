import instance from '../instance';

// 4.1 어드민 팀 추가
export const createTeamAPI = async (
  generation: number,
  name: string,
  pm_capacity: number,
  pd_capacity: number,
  fe_capacity: number,
  be_capacity: number,
) => {
  const response = await instance.post(`/api/v1/admins/teams`, {
    generation,
    name,
    pm_capacity,
    pd_capacity,
    fe_capacity,
    be_capacity,
  });
  return response.data;
};
