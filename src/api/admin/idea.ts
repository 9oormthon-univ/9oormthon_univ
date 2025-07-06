import { Sorting, SortType } from '../../types/admin/idea';
import instance from '../instance';

// 3.18 어드민 아이디어 주제 간단 리스트 조회
export const fetchIdeaSubjects = async (generation: number) => {
  const response = await instance.get(`/api/v1/admins/idea-subjects/briefs?generation=${generation}`);
  return response.data;
};

// 3.19 어드민 아이디어 주제 생성
export const createIdeaSubject = async (generation: number, name: string) => {
  const response = await instance.post(`/api/v1/admins/idea-subjects`, {
    generation,
    name,
  });
  return response.data;
};

// 3.20 어드민 아이디어 주제 수정
export const updateIdeaSubject = async (id: number, name: string) => {
  const response = await instance.put(`/api/v1/admins/idea-subjects/${id}`, {
    name,
  });
  return response.data;
};

// 3.21 어드민 아이디어 주제 삭제
export const deleteIdeaSubject = async (id: number) => {
  const response = await instance.delete(`/api/v1/admins/idea-subjects/${id}`);
  return response.data;
};

// 3.22 어드민 아이디어 요약 리스트 조회
export const fetchIdeaSummaries = async (
  page: number,
  size: number,
  generation: number,
  sorting?: Sorting,
  sortType?: SortType,
  search?: string,
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    generation: generation.toString(),
  });

  if (sorting !== undefined) {
    queryParams.append('sorting', sorting);
  }

  if (sortType !== undefined) {
    queryParams.append('sort-type', sortType);
  }

  if (search !== undefined) {
    queryParams.append('search', search);
  }

  const response = await instance.get(`/api/v1/admins/ideas/overviews?${queryParams.toString()}`);
  return response.data;
};

// 3.24 어드민 아이디어 삭제
export const deleteIdea = async (id: number) => {
  const response = await instance.delete(`/api/v1/admins/ideas/${id}`);
  return response.data;
};
