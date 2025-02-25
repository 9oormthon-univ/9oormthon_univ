export enum LinkType {
  NOTION = 'NOTION',
  GITHUB = 'GITHUB',
  LINKEDIN = 'LINKEDIN',
  BLOG = 'BLOG',
  ETC = 'ETC',
}

export const linkTypeList = [
  { label: '노션', value: LinkType.NOTION },
  { label: '깃허브', value: LinkType.GITHUB },
  { label: '링크드인', value: LinkType.LINKEDIN },
  { label: '블로그', value: LinkType.BLOG },
  { label: '기타', value: LinkType.ETC },
];
