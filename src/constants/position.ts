// export enum Position {
//   NULL = '',
//   PM = 'PM',
//   PD = 'PD',
//   FE = 'FE',
//   BE = 'BE',
// }

// export const PositionList = [Position.PM, Position.PD, Position.FE, Position.BE];

// // Null 없는 포지션들 리스트
// export type PositionWithoutNull = Exclude<Position, Position.NULL>;

// // 포지션 소문자로 변환
// export type RequirementKey = Lowercase<PositionWithoutNull>;

// // 포지션 정보
// export type PositionInfo = {
//   name: string;
//   index: number;
// };

// export const POSITIONS: Record<RequirementKey, PositionInfo> = {
//   pm: { name: '기획', index: 0 },
//   pd: { name: '디자인', index: 1 },
//   fe: { name: '프론트엔드', index: 2 },
//   be: { name: '백엔드', index: 3 },
// } as const;

// export const POSITION_NAME = {
//   [Position.PM]: '기획',
//   [Position.PD]: '디자인',
//   [Position.FE]: '프론트엔드',
//   [Position.BE]: '백엔드',
// };

// export const POSITION_COLOR = {
//   [Position.PM]: 'danger',
//   [Position.PD]: 'warning',
//   [Position.FE]: 'primary',
//   [Position.BE]: 'success',
// } as const;
// constants/position.ts

export const POSITIONS = {
  PM: {
    key: 'PM',
    lowerKey: 'pm',
    name: '기획',
    color: 'danger',
    index: 0,
  },
  PD: {
    key: 'PD',
    lowerKey: 'pd',
    name: '디자인',
    color: 'warning',
    index: 1,
  },
  FE: {
    key: 'FE',
    lowerKey: 'fe',
    name: '프론트엔드',
    color: 'primary',
    index: 2,
  },
  BE: {
    key: 'BE',
    lowerKey: 'be',
    name: '백엔드',
    color: 'success',
    index: 3,
  },
} as const;

export type PositionKey = keyof typeof POSITIONS; // 'PM' | 'PD' | ...
export type PositionLowerKey = (typeof POSITIONS)[PositionKey]['lowerKey']; // 'pm' | 'pd' | ...

// 유틸: 소문자 → 대문자 키 변환
export const getPositionKey = (lower: string): PositionKey | undefined => {
  return Object.values(POSITIONS).find((p) => p.lowerKey === lower)?.key;
};

// 유틸: 대문자 키 → 한글명
export const getPositionName = (key: PositionKey): string => POSITIONS[key].name;

// 유틸: 대문자 키 → 색상
export const getPositionColor = (key: PositionKey): string => POSITIONS[key].color;
