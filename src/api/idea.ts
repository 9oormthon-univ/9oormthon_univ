import instance from './instance';

// 아이디어 생성 API
export const createIdeaAPI = async (idea: {
  idea_info: {
    idea_subject_id: number;
    title: string;
    summary: string;
    content: string;
    generation: number;
    provider_role: 'PM' | 'PD' | 'FE' | 'BE';
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

// 내 아이디어 상세 조회 API
export const fetchMyIdeaDetail = async () => {
  const response = await instance.get('/api/v1/users/ideas/details');
  return response.data;
};

// 다른 사람의 아이디어 상세 조회 API
export const fetchIdeaDetailById = async (idea_id: string) => {
  const response = await instance.get(`/api/v1/users/ideas/${idea_id}/details`);
  return response.data;
};

// 아이디어 주제 조회 API
export const fetchIdeaSubjects = async () => {
  const response = await instance.get('/api/v1/idea-subjects/briefs');
  return response.data;
};

// 아이디어 리스트 조회 API
export const fetchIdeas = async (
  page: number,
  size: number,
  generation: number,
  subjectId?: number,
  isActive?: boolean,
  isBookmarked?: boolean,
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    generation: generation.toString(),
  });

  // undefined인 경우 쿼리 파라미터에 추가하지 않음
  if (subjectId !== undefined) queryParams.append('subject-id', subjectId.toString());
  if (isActive !== undefined) queryParams.append('is-active', isActive.toString());
  if (isBookmarked !== undefined) queryParams.append('is-bookmarked', isBookmarked.toString());

  const requestUrl = `/api/v1/users/ideas/overviews?${queryParams.toString()}`;

  const response = await instance.get(requestUrl);
  return response.data;
};
