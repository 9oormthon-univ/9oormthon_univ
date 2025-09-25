import { PositionKey } from '@/constants/position';

export interface IdeaSubject {
  id: number;
  name: string;
}

// 아이디어 요약 조회
export interface Ideas {
  id: number;
  subject: string;
  title: string;
  summary: string;
  is_active: boolean;
  is_bookmarked: boolean;
}

export interface PageInfo {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_items: number;
}

// (Provider) 아이디어 지원 현황 조회
export type Sorting = 'UNIV' | 'ROLE' | 'PREFERENCE';
export type SortType = 'ASC' | 'DESC';

// 아이디어 상세 조회
export interface ProviderInfo {
  id: number;
  name: string;
  univ: string;
  role: PositionKey;
  is_provider: boolean;
}

export interface IdeaInfo {
  id: number;
  subject: string;
  subject_id: number;
  title: string;
  is_active: boolean;
  summary: string;
  content: string;
  is_bookmarked: boolean;
}

export interface Member {
  id: number;
  img_url: string;
  name: string;
  univ: string;
  is_leader: boolean;
}

export interface RequirementDetail {
  requirement?: string;
  current_count: number;
  max_count: number;
  required_tech_stacks?: string[];
  current_members: Member[];
  ratio: string;
}

export interface Requirements {
  pm: RequirementDetail;
  pd: RequirementDetail;
  fe: RequirementDetail;
  be: RequirementDetail;
}

// 아이디어 생성 및 수정
export interface IdeaCreateEdit {
  idea_info: {
    idea_subject_id: number;
    title: string;
    summary: string;
    content: string;
    generation?: number;
    provider_role: PositionKey | null;
  };
  requirements: {
    pm?: { requirement: string; capacity: number; required_tech_stacks?: string[] };
    pd?: { requirement: string; capacity: number; required_tech_stacks?: string[] };
    fe?: { requirement: string; capacity: number; required_tech_stacks?: string[] };
    be?: { requirement: string; capacity: number; required_tech_stacks?: string[] };
  };
}
