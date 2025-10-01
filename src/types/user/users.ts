import { LinkType } from '@/constants/linkType';
import { PositionKey } from '@/constants/position';
import { ApplyStatusKey } from './team';

// 유저 정보 수정
export interface Link {
  type: LinkType;
  url: string;
}

export interface UserInfo {
  img_url: string;
  introduction: string;
  stacks: string[];
  links: Link[];
}

export interface UserBrief {
  role: string;
  status: string;
  img_url: string;
}

export interface UserInfoResponse {
  name: string;
  email: string;
  univ: string;
  img_url: string;
  introduction?: string;
  stacks?: string[];
  links?: {
    type: LinkType;
    url: string;
  }[];
  is_me: boolean;
}

// 내 지원 정보 요약 리스트 조회
export interface ApplySummary {
  apply_info: ApplyInfo;
  idea_info: IdeaInfo;
}

export interface ApplyInfo {
  id: number;
  status: ApplyStatusKey;
  ratio: string;
  preference: number;
  motivation: string;
  role: PositionKey;
}

export interface IdeaInfo {
  id: number;
  title: string;
}
