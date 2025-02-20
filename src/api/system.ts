import instance from './instance';

// 기간 조회 API
export const fetchPeriod = async () => {
  const response = await instance.get('/api/v1/system-setting/current-period');
  return response.data;
};
