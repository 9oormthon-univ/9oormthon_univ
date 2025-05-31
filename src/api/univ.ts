import instance from './instance';

// 유니브 간단 리스트 조회
export const fetchUnivListAPI = async (generation: number) => {
  const response = await instance.get(`/api/v1/univs/briefs?generation=${generation}`);
  return response.data;
};
