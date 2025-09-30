import { LinkType } from '@/constants/linkType';

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
