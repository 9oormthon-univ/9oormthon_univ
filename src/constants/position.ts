export const POSITIONS = {
  pm: '기획',
  pd: '디자인',
  fe: '프론트엔드',
  be: '백엔드',
} as const;

export enum Position {
  NULL = '',
  PM = 'PM',
  PD = 'PD',
  FE = 'FE',
  BE = 'BE',
}

export type RequirementKey = 'pm' | 'pd' | 'fe' | 'be';
