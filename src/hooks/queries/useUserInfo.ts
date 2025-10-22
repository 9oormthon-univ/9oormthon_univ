// src/hooks/queries/useUserInfo.ts

import { useQuery } from '@tanstack/react-query';
import { getMyInfo, getUserInfo } from '@/api/users';
import { UserInfoResponse } from '@/types/user/users';
import { getMockMyInfo, getMockUserInfo } from '@/utilities/mockUtils';

export const useUserInfo = (userId?: string) => {
  const query = useQuery<UserInfoResponse, Error>({
    queryKey: ['userInfo', userId ?? 'my'],
    queryFn: async () => {
      if (import.meta.env.DEV) {
        return userId ? await getMockUserInfo(userId) : await getMockMyInfo();
      } else {
        return userId ? await getUserInfo(userId) : await getMyInfo();
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  return query;
};
