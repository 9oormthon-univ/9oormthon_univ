export interface TeamMember {
  id: number;
  name: string;
  img_url: string;
  is_leader: boolean; // 새로 추가
}

export interface RoleInfo {
  max_count: number;
  current_count: number;
  members: TeamMember[];
}

export interface TeamInfo {
  number?: number;
  name?: string;
  role: {
    pm?: RoleInfo;
    pd?: RoleInfo;
    fe?: RoleInfo;
    be?: RoleInfo;
  };
}
