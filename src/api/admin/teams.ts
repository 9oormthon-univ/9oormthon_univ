import instance from '../instance';
import { Team, TeamUpdateForm } from '../../types/admin/team';
import { PositionKey } from '../../constants/position';

// 4.1 어드민 팀 추가
export const createTeamAPI = async (teamData: Team) => {
  const response = await instance.post(`/api/v1/admins/teams`, teamData);
  return response.data;
};

// 4.2 어드민 특정 팀에 팀원 추가
export const addTeamMemberAPI = async (team_id: number, user_id: number, role: PositionKey) => {
  const response = await instance.post(`/api/v1/admins/teams/${team_id}/members`, {
    user_id,
    role,
  });
  return response.data;
};

// 4.3 어드민 팀 요약 리스트 조회
export const fetchTeamSummaryListAPI = async (
  page: number,
  size: number,
  generation: number,
  sorting?: string,
  sort_type?: string,
  search?: string,
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    generation: generation.toString(),
  });

  if (sorting !== undefined) {
    queryParams.append('sorting', sorting);
  }

  if (sort_type !== undefined) {
    queryParams.append('sort-type', sort_type);
  }

  if (search !== undefined && search.trim() !== '') {
    queryParams.append('search', search);
  }

  const response = await instance.get(`/api/v1/admins/teams/overviews?${queryParams.toString()}`);
  return response.data;
};

// 4.4 어드민 팀 정보 상세 조회
export const fetchTeamDetailAPI = async (team_id: number) => {
  const response = await instance.get(`/api/v1/admins/teams/${team_id}/details`);
  return response.data;
};

// 4.5 어드민 팀원 정보 요약 리스트 조회
export const fetchTeamMemberSummaryListAPI = async (team_id: number) => {
  const response = await instance.get(`/api/v1/admins/teams/${team_id}/members/overviews`);
  return response.data;
};

// 4.7 어드민 팀 정보 수정
export const updateTeamAPI = async (team_id: number, team: TeamUpdateForm) => {
  const response = await instance.put(`/api/v1/admins/teams/${team_id}`, team);
  return response.data;
};

// 4.8 어드민 팀원 팀장 임명
export const updateTeamLeaderAPI = async (member_id: number) => {
  const response = await instance.patch(`/api/v1/admins/members/${member_id}/is-leader`);
  return response.data;
};

// 4.11 어드민 팀 해체
export const deleteTeamAPI = async (team_id: number) => {
  const response = await instance.delete(`/api/v1/admins/teams/${team_id}`);
  return response.data;
};

// 4.12 어드민 팀원 방출
export const deleteTeamMemberAPI = async (member_id: number) => {
  const response = await instance.delete(`/api/v1/admins/members/${member_id}`);
  return response.data;
};

// 4.13 어드민 팀번호 랜덤 부여
export const assignTeamNumberAPI = async (generation: number) => {
  const response = await instance.post(`/api/v1/admins/teams/number/randomize?generation=${generation}`);
  return response.data;
};

// 4.14. 어드민 팀원 지원파트 변경
export const updateTeamMemberPartAPI = async (member_id: number, role: PositionKey) => {
  const response = await instance.patch(`/api/v1/admins/members/${member_id}/role`, {
    role,
  });
  return response.data;
};
