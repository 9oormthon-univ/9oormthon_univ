export enum Position {
  NULL = '',
  PM = 'PM',
  PD = 'PD',
  FE = 'FE',
  BE = 'BE',
}

// Null 없는 포지션들 리스트
export type PositionWithoutNull = Exclude<Position, Position.NULL>;

// 포지션 소문자로 변환
export type RequirementKey = Lowercase<PositionWithoutNull>;

// 포지션 정보
export type PositionInfo = {
  name: string;
  index: number;
};

export const POSITIONS: Record<RequirementKey, PositionInfo> = {
  pm: { name: '기획', index: 0 },
  pd: { name: '디자인', index: 1 },
  fe: { name: '프론트엔드', index: 2 },
  be: { name: '백엔드', index: 3 },
} as const;

export const POSITION_NAME = {
  [Position.PM]: '기획',
  [Position.PD]: '디자인',
  [Position.FE]: '프론트엔드',
  [Position.BE]: '백엔드',
};
