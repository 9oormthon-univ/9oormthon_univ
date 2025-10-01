// src/hooks/queries/useUser.ts

import { useQuery } from '@tanstack/react-query';
import { getUserBriefAPI } from '@/api/auth';
import { UserBrief } from '@/types/user/users';
import { mockIfDev } from '@/utilities/devMock';
import { mockUserBriefData } from '@/constants/mockData';

export const useUser = () => {
  const query = useQuery<UserBrief, Error>({
    queryKey: ['user'],
    queryFn: mockIfDev(getUserBriefAPI, mockUserBriefData),
    staleTime: 0,
    refetchOnMount: 'always',
  });
  return query;
};
