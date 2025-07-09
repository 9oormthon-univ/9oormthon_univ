import { PositionKey } from '../../constants/position';

export interface TeamMember {
  id: number;
  name: string;
  img_url: string;
  is_leader: boolean; // 새로 추가
}

export interface RoleInfo {
  max_count: number;
  current_count: number;
  members?: TeamMember[];
}

export interface TeamRole {
  pm?: RoleInfo;
  pd?: RoleInfo;
  fe?: RoleInfo;
  be?: RoleInfo;
}

export interface TeamInfo {
  team_building: 'RECRUITING' | 'END';
  number?: number;
  name?: string;
  role: TeamRole;
}

// 지원 상태
export enum ApplyStatus {
  WAITING = 'WAITING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CONFIRMED = 'CONFIRMED',
  ACCEPTED_NOT_JOINED = 'ACCEPTED_NOT_JOINED',
}

// 지원자 정보
export interface ApplyUser {
  id: number;
  name: string;
  univ: string;
}

// 지원 정보
export interface Applies {
  id: number;
  preference: number;
  motivation: string;
  role: PositionKey;
  status: ApplyStatus;
  user: ApplyUser;
}
