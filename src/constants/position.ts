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
