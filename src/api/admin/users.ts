import { UserForm } from '../../types/admin/member';
import { Sorting, SortType } from '../../types/admin/user';
import instance from '../instance';
import { GENERATION } from '../../constants/common';

// 2.1 어드민 유저 생성
export const createUserAPI = async (userData: UserForm) => {
  const response = await instance.post('/api/v1/admins/users', userData);
  return response.data;
};

// 2.5 어드민 유저 간단 리스트 조회
export const fetchUserListAPI = async (univId?: number, search?: string, teamId?: number) => {
  const queryParams = new URLSearchParams();

  if (univId !== undefined) {
    queryParams.append('univ-id', univId.toString());
  }

  if (search !== undefined) {
    queryParams.append('search', search);
  }

  if (teamId !== undefined) {
    queryParams.append('team-id', teamId.toString());
  }

  const response = await instance.get(`/api/v1/admins/users/briefs?generation=${GENERATION}&${queryParams.toString()}`);
  return response.data;
};

// 2.6 어드민 유저 요약 리스트 조회
export const fetchUserSummaryListAPI = async (
  page: number,
  size: number,
  univ_id?: number,
  search?: string,
  sorting?: Sorting,
  sort_type?: SortType,
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  // undefined인 경우 쿼리 파라미터에 추가하지 않음
  if (univ_id !== undefined) {
    queryParams.append('univ-id', univ_id.toString());
  }

  if (sorting !== undefined) {
    queryParams.append('sorting', sorting);
  }

  if (sort_type !== undefined) {
    queryParams.append('sort-type', sort_type);
  }

  if (search !== undefined) {
    queryParams.append('search', search);
  }

  const requestUrl = `/api/v1/admins/users/overviews?generation=${GENERATION}&${queryParams.toString()}`;
  const response = await instance.get(requestUrl);
  return response.data;
};

// 2.7 어드민 유저 상세조회
export const fetchUserDetailAPI = async (user_id: number, generation: number) => {
  const response = await instance.get(`/api/v1/admins/users/${user_id}/details?generation=${generation}`);
  return response.data;
};

// 어드민 유저 정보 수정
export const updateUserAPI = async (
  user_id: number,
  univ_id: number,
  name: string,
  email: string,
  phone_number: string,
  generations: number[],
  img_url?: string,
) => {
  const response = await instance.put(`/api/v1/admins/users/${user_id}`, {
    name,
    univ_id,
    email,
    phone_number,
    generations,
    img_url,
  });
  return response.data;
};

// 어드민 유저 정보 삭제
export const deleteUserAPI = async (user_id: number) => {
  const response = await instance.delete(`/api/v1/admins/users/${user_id}`);
  return response.data;
};

// 2.2 어드민 유저 엑셀로 생성
export const createUserExcelAPI = async (formData: FormData) => {
  const response = await instance.post('/api/v1/admins/users/excel', formData);
  return response.data;
};

// 2.11 어드민 유저 비밀번호 초기화
export const resetPasswordAPI = async (user_id: number) => {
  const response = await instance.post(`/api/v1/admins/users/${user_id}/password/reset`);
  return response.data;
};
