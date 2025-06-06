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
    team_building: boolean;
  }[];
  page_info: {
    current_page: number;
    current_items: number;
    page_size: number;
    total_pages: number;
    total_items: number;
  };
}

export enum Sorting {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortType {
  ID = 'ID',
  TEAM_NUMBER = 'TEAM_NUMBER',
  TEAM_NAME = 'TEAM_NAME',
  SERVICE_NAME = 'SERVICE_NAME',
  MEMBER_COUNT = 'MEMBER_COUNT',
  TEAM_BUILDING = 'TEAM_BUILDING',
}
