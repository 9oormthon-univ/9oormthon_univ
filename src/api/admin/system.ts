import { PeriodSettingPayload } from '../../types/admin/system';
import instance from '../instance';

// 어드민 기간 설정
export const setPeriod = async (data: PeriodSettingPayload) => {
  const response = await instance.post('/api/v1/admins/system-settings', data);
  return response.data;
};
