// src/hooks/queries/admin/useUnivList.ts

import { useQuery } from '@tanstack/react-query';
import { fetchUnivDetailAPI, fetchUnivListAPI } from '@/api/admin/univs';
import { mockUnivList, mockUnivDetail } from '@/constants/mockData';
import { mockIfDev } from '@/utilities/devMock';

export const useUnivList = () => {
  const query = useQuery({
    queryKey: ['univList'],
    queryFn: mockIfDev(fetchUnivListAPI, mockUnivList),
    staleTime: 60 * 1000,
  });
  return query;
};

export const useUnivDetail = (univId: number) => {
  const query = useQuery({
    queryKey: ['univDetail', univId],
    queryFn: mockIfDev(fetchUnivDetailAPI, mockUnivDetail),
    staleTime: 60 * 1000,
  });
  return query;
};
