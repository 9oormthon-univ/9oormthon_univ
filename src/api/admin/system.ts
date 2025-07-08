import { PeriodSettingPayload } from '../../types/admin/system';
import instance from '../instance';

// 0.3 어드민 시스템 기간 설정
export const setPeriod = async (data: PeriodSettingPayload) => {
  const response = await instance.put('/api/v1/admins/system-settings', data);
  return response.data;
};

// 0.2 어드민 시스템 설정 기간 상세 조회
export const getPeriod = async () => {
  const response = await instance.get('/api/v1/admins/system-settings/details');
  return response.data;
};

// 0.4 어드민 아이디어 최대 개수 수정
export const setIdeaCount = async (max_idea_number: number) => {
  const response = await instance.patch('/api/v1/admins/system-settings/max-idea-number', { max_idea_number });
  return response.data;
};
