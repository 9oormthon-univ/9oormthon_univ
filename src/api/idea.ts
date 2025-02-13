import instance from './instance';

export const createIdeaAPI = async (idea: {
  idea_info: {
    idea_subject_id: number;
    title: string;
    summary: string;
    content: string;
    generation: number;
    provider_role: 'pm' | 'pd' | 'fe' | 'be';
  };
  requirements: {
    pm?: { requirement: string; capacity: number; required_tech_stacks?: string[] };
    pd?: { requirement: string; capacity: number; required_tech_stacks?: string[] };
    fe?: { requirement: string; capacity: number; required_tech_stacks?: string[] };
    be?: { requirement: string; capacity: number; required_tech_stacks?: string[] };
  };
}) => {
  await instance.post('/api/v1/users/ideas', idea);
};
