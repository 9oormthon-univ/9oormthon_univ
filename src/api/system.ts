import instance from './instance';

// 기간 조회 API
export const fetchPeriod = async () => {
  const response = await instance.get('/api/v1/system-settings/current-period', {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
  return response.data.data;
};
