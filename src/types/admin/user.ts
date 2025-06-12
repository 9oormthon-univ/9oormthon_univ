export interface UserOverview {
  id: number;
  role: 'USER' | 'ADMIN';
  name: string;
  email: string;
  team_building: boolean;
  generations: string;
}

export interface PageInfo {
  current_page: number;
  current_items: number;
  page_size: number;
  total_pages: number;
  total_items: number;
}

export enum Sorting {
  ID = 'ID',
  NAME = 'NAME',
  EMAIL = 'EMAIL',
  TEAM_BUILDING = 'TEAM_BUILDING',
}

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}
