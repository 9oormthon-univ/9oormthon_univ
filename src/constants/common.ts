import BeotkkotProject2024Data from './BeotkkotProject2024Data';
import DanpoongProject2023Data from './DanpoongProject2023Data';
import DanpungProject2024Data from './DanpungProject2024Data';

export const THIS_SEASON = {
  SEASON: '4',
  AMOUNT_OF_UNIV: 62, // 유니브 수
};

// 추후 업데이트 필요
export const LINKS = {
  PRE_REGISTRATION_LINK_4TH:
    'https://docs.google.com/forms/d/e/1FAIpQLSeg4pfokyfK0YXfOYI8GGk_ACsSdu_tcztfH_t-ODJ2cY0Sow/viewform?usp=sharing',
};

export const allProjects = [...DanpoongProject2023Data, ...BeotkkotProject2024Data, ...DanpungProject2024Data].sort(
  () => Math.random() - 0.5,
);

export const PROJECTS = [allProjects, DanpoongProject2023Data, BeotkkotProject2024Data, DanpungProject2024Data];

// 기수 (추후 변경 필요)
export const GENERATION = 4;
