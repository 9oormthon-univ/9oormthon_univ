// 유저 정보 수정
export interface Link {
  type: 'GITHUB' | 'NOTION' | 'LINKEDIN' | 'BLOG' | 'ETC';
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
