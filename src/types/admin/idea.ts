export type Sorting = 'TITLE' | 'SUBJECT' | 'TEAM_BUILDING' | 'PROVIDER';
export type SortType = 'ASC' | 'DESC';
export type TeamBuilding = 'RECRUITING' | 'END';

export interface Idea {
  id: number;
  title: string;
  subject: string;
  provider: string;
  team_building: TeamBuilding;
}

export interface PageInfo {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_items: number;
}
