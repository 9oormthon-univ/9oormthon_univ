import instance from '../instance';
import { Team } from '../../types/admin/team';

// 4.1 어드민 팀 추가
export const createTeamAPI = async (generation: number, team: Team) => {
  const response = await instance.post(`/api/v1/admins/teams`, {
    generation,
    team,
  });
  return response.data;
};
