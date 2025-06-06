import instance from '../instance';

// 2.3 어드민 유저 간단 리스트 조회
export const fetchUserListAPI = async (generation: number, univId?: number, search?: string) => {
  const queryParams = new URLSearchParams({
    generation: generation.toString(),
  });

  if (univId !== undefined) {
    queryParams.append('univ-id', univId.toString());
  }

  if (search !== undefined) {
    queryParams.append('search', search);
  }

  const response = await instance.get(`/api/v1/admins/users/briefs?${queryParams.toString()}`);
  return response.data;
};

// 어드민 유저 요약 리스트 조회
export const fetchUserSummaryListAPI = async (
  page: number,
  size: number,
  generation: number,
  univ_id?: number,
  search?: string,
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    generation: generation.toString(),
  });

  // undefined인 경우 쿼리 파라미터에 추가하지 않음
  if (univ_id !== undefined) {
    queryParams.append('univ-id', univ_id.toString());
  }
  if (search !== undefined) {
    queryParams.append('search', search);
  }

  const requestUrl = `/api/v1/admins/users/overviews?${queryParams.toString()}`;
  const response = await instance.get(requestUrl);
  return response.data;
};

// 어드민 유저 상세조회
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
) => {
  const response = await instance.put(`/api/v1/admins/users/${user_id}`, {
    name,
    univ_id,
    email,
    phone_number,
    generations,
  });
  return response.data;
};

// 어드민 유저 정보 삭제
export const deleteUserAPI = async (user_id: number) => {
  const response = await instance.delete(`/api/v1/admins/users/${user_id}`);
  return response.data;
};
