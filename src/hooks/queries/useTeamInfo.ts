// src/hooks/queries/useTeamInfo.ts

import { useQuery } from '@tanstack/react-query';
import { getTeamInfo } from '@/api/teams';
import { TeamInfo } from '@/types/user/team';
import { getMockTeamInfo } from '@/utilities/mockUtils';
import { mockIfDev } from '@/utilities/devMock';

export const useTeamInfo = () => {
  const query = useQuery<TeamInfo, Error>({
    queryKey: ['teamInfo'],
    queryFn: mockIfDev(getTeamInfo, getMockTeamInfo),
    staleTime: 5 * 60 * 1000,
  });
  return query;
};
