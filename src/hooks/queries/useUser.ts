// src/hooks/queries/useUser.ts

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getUserBriefAPI } from '@/api/auth';
import { UserBrief } from '@/types/user/users';
import { mockIfDev } from '@/utilities/devMock';
import { mockUserBriefData } from '@/constants/mockData';
import { useAuthStore } from '@/store/useAuthStore';

export const useUser = () => {
  const { setUser } = useAuthStore();

  const query = useQuery<UserBrief, Error, UserBrief>({
    queryKey: ['user'],
    queryFn: mockIfDev(getUserBriefAPI, mockUserBriefData),
    staleTime: 1000 * 60 * 3,
  });

  // 데이터가 성공적으로 로드되면 Zustand 스토어에 동기화
  useEffect(() => {
    if (query.data) {
      setUser(query.data);
      console.log('useUser Debug:', {
        data: query.data,
        user: useAuthStore.getState().user,
      });
    }
  }, [query.data, setUser]);

  return query;
};
