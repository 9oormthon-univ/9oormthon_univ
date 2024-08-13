import BeotkkotProject2024Data from './BeotkkotProject2024Data';
import DanpoongProject2023Data from './DanpoongProject2023Data';

export const THIS_SEASON = 3;

const allProjects = [...DanpoongProject2023Data, ...BeotkkotProject2024Data].sort(() => Math.random() - 0.5);

export const PROJECTS = [allProjects, DanpoongProject2023Data, BeotkkotProject2024Data];
