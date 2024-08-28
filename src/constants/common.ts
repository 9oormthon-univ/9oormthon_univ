import BeotkkotProject2024Data from './BeotkkotProject2024Data';
import DanpoongProject2023Data from './DanpoongProject2023Data';

export const THIS_SEASON = {
  SEASON: '4',
  AMOUNT_OF_UNIV: 48,
};

export const LINKS = {
  PRE_REGISTRATION_LINK_4TH: 'https://forms.gle/Pt1xfeHbKgbYFZhj8',
};

export const allProjects = [...DanpoongProject2023Data, ...BeotkkotProject2024Data].sort(() => Math.random() - 0.5);

export const PROJECTS = [allProjects, DanpoongProject2023Data, BeotkkotProject2024Data];
