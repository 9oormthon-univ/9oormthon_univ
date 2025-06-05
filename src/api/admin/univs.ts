import instance from '../instance';

// 어드민 유니브 생성
export const createUnivAPI = async (name: string, instagram_url: string, generation: number) => {
  const response = await instance.post('/api/v1/admins/univs', {
    name,
    instagram_url,
    generation,
  });
  return response.data;
};

// 유니브 간단 리스트 조회
export const fetchUnivListAPI = async (generation: number) => {
  const response = await instance.get(`/api/v1/admins/univs/briefs?generation=${generation}`);
  return response.data;
};

// 어드민 유니브 상세 조회
export const fetchUnivDetailAPI = async (univ_id: number) => {
  const response = await instance.get(`/api/v1/admins/univs/${univ_id}/details`);
  return response.data;
};

// 어드민 유니브 수정
export const updateUnivAPI = async (univ_id: number, name: string, instagram_url: string, leader_id?: number) => {
  const response = await instance.put(`/api/v1/admins/univs/${univ_id}`, {
    name,
    instagram_url,
    leader_id,
  });
  return response.data;
};

// 어드민 유니브 삭제
export const deleteUnivAPI = async (univ_id: number) => {
  const response = await instance.delete(`/api/v1/admins/univs/${univ_id}`);
  return response.data;
};
