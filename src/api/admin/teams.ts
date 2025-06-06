import instance from '../instance';
import { Team } from '../../types/admin/team';
import { Position } from '../../constants/position';

// 4.1 어드민 팀 추가
export const createTeamAPI = async (generation: number, team: Team) => {
  const response = await instance.post(`/api/v1/admins/teams`, {
    generation,
    team,
  });
  return response.data;
};

// 4.2 어드민 특정 팀에 팀원 추가
export const addTeamMemberAPI = async (team_id: number, user_id: number, role: Position) => {
  const response = await instance.post(`/api/v1/admins/teams/${team_id}/members`, {
    user_id,
    role,
  });
  return response.data;
};
