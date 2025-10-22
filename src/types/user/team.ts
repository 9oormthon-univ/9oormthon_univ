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
export const ApplyStatus = {
  WAITING: {
    key: 'WAITING',
    value: 'WAITING',
    text: '대기중',
    color: 'text-primary',
  },
  ACCEPTED: {
    key: 'ACCEPTED',
    value: 'ACCEPTED',
    text: '수락됨',
    color: 'text-success',
  },
  REJECTED: {
    key: 'REJECTED',
    value: 'REJECTED',
    text: '거절됨',
    color: 'text-danger',
  },
  CONFIRMED: {
    key: 'CONFIRMED',
    value: 'CONFIRMED',
    text: '확정',
    color: 'text-success',
  },
  ACCEPTED_NOT_JOINED: {
    key: 'ACCEPTED_NOT_JOINED',
    value: 'ACCEPTED_NOT_JOINED',
    text: '타 팀 합류',
    color: 'text-hint',
  },
} as const;

export type ApplyStatusKey = keyof typeof ApplyStatus;

export const getApplyStatusName = (status: ApplyStatusKey) => {
  return ApplyStatus[status].text;
};

export const getApplyStatusColor = (status: ApplyStatusKey) => {
  return ApplyStatus[status].color;
};

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
  status: ApplyStatusKey;
  user: ApplyUser;
}
