import instance from './instance';
import { PositionKey } from '../constants/position';
import { IdeaCreateEdit } from '@/types/user/idea';
import { GENERATION } from '@/constants/common';

// 아이디어 생성 API
export const createIdeaAPI = async (idea: IdeaCreateEdit) => {
  await instance.post('/api/v1/users/ideas', idea);
};

// 3.7 내 아이디어 상세 조회 API
export const fetchMyIdeaDetail = async () => {
  const response = await instance.get('/api/v1/users/ideas/details');
  return response.data;
};

// 3.8 아이디어 상세 조회 API
export const fetchIdeaDetailById = async (idea_id: string) => {
  const response = await instance.get(`/api/v1/users/ideas/${idea_id}/details`);
  return response.data;
};

// 3.13 아이디어 수정 API
export const updateIdeaAPI = async (idea: IdeaCreateEdit, idea_id: number) => {
  await instance.put(`/api/v1/users/ideas/${idea_id}`, idea);
};

// 3.9 아이디어 주제 간단 리스트 조회
export const fetchIdeaSubjects = async (generation: number) => {
  const response = await instance.get(`/api/v1/users/idea-subjects/briefs?generation=${generation}`);
  return response.data;
};

// 3.6 아이디어 요약 리스트 조회 API
export const fetchIdeas = async (
  page: number,
  size: number,
  generation: number,
  subjectId?: number,
  isActive?: boolean,
  isBookmarked?: boolean,
  search?: string,
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    generation: generation.toString(),
  });

  // undefined인 경우 쿼리 파라미터에 추가하지 않음
  if (subjectId !== undefined) queryParams.append('subject-id', subjectId?.toString() || '');
  if (isActive !== undefined) queryParams.append('is-active', isActive.toString());
  if (isBookmarked !== undefined) queryParams.append('is-bookmarked', isBookmarked.toString());
  if (search) queryParams.append('search', search);

  const requestUrl = `/api/v1/users/ideas/overviews?${queryParams.toString()}`;
  const response = await instance.get(requestUrl);
  return response.data;
};

// 아이디어 북마크 추가 API
export const addIdeaBookmark = async (idea_id: number) => {
  const response = await instance.post(`/api/v1/users/ideas/${idea_id}/bookmarks`);
  return response.data;
};

// 3.11 내 잔여 지망 간단 리스트 조회 API
export const fetchMyRemainingRanks = async (phase: number) => {
  const response = await instance.get(`/api/v1/users/applies/briefs?generation=${GENERATION}&phase=${phase}`);
  return response.data;
};

// 아이디어 지원
export const applyIdea = async (
  idea_id: string,
  phase: number,
  preference: number,
  motivation: string,
  role: PositionKey,
) => {
  const response = await instance.post(`/api/v1/users/ideas/${idea_id}/applies`, {
    phase,
    preference,
    motivation,
    role,
  });
  return response.data;
};

// 3.16 아이디어 삭제
export const deleteIdea = async (idea_id: number) => {
  const response = await instance.delete(`/api/v1/users/ideas/${idea_id}`);
  return response.data;
};
