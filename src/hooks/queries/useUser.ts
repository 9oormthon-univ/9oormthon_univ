// src/hooks/queries/useUser.ts

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getUserBriefAPI } from '@/api/auth';
import useAuthStore from '@/store/useAuthStore';
import { UserBrief } from '@/types/user/users';
import { mockIfDev } from '@/utilities/devMock';
import { mockUserBriefData } from '@/constants/mockData';

export const useUser = () => {
  const updateUser = useAuthStore((state) => state.updateUserFromQuery);
  const query = useQuery<UserBrief, Error>({
    queryKey: ['user'],
    queryFn: mockIfDev(getUserBriefAPI, mockUserBriefData),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      const { role, status, img_url } = query.data;
      updateUser({ role, status, img_url });
    }
  }, [query.data, updateUser]);

  return query;
};
