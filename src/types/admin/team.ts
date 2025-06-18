import { User } from './member';
import { PositionWithoutNull } from '../../constants/position';

export interface Team {
  name: string;
  pm_capacity: number;
  pd_capacity: number;
  fe_capacity: number;
  be_capacity: number;
}

export interface TeamOverview {
  teams: {
    id: number;
    number?: number;
    name: string;
    service_name?: string;
    member_count: number;
    team_building: 'RECRUITING' | 'END';
  }[];
  page_info: {
    current_page: number;
    current_items: number;
    page_size: number;
    total_pages: number;
    total_items: number;
  };
}

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum Sorting {
  ID = 'ID',
  TEAM_NUMBER = 'TEAM_NUMBER',
  TEAM_NAME = 'TEAM_NAME',
  SERVICE_NAME = 'SERVICE_NAME',
  MEMBER_COUNT = 'MEMBER_COUNT',
  TEAM_BUILDING = 'TEAM_BUILDING',
}

// 팀 빌딩 상태
export enum TeamBuildingStatus {
  RECRUITING = 'RECRUITING',
  END = 'END',
}

// 팀 상세
export interface TeamDetail {
  id: number;
  number: number;
  team_name: string;
  pm_capacity: number;
  pd_capacity: number;
  fe_capacity: number;
  be_capacity: number;
  service_name: string;
  idea_id?: number;
  leader?: User;
  team_building: TeamBuildingStatus;
}

// 팀 수정 폼
export interface TeamUpdateForm {
  number: number;
  team_name: string;
  pm_capacity: number;
  pd_capacity: number;
  fe_capacity: number;
  be_capacity: number;
  service_name: string;
  leader_id?: number;
  status: TeamBuildingStatus;
}

// 4.5 팀원 정보 요약
export interface TeamMemberSummary {
  id: number;
  user_id: number;
  name: string;
  role: PositionWithoutNull;
  univ: string;
  email: string;
  is_leader: boolean;
}
