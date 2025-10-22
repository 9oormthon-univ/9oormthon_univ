// src/hooks/queries/useApplyStatus.ts

import { useQuery } from '@tanstack/react-query';
import { getIdeaApplyStatus } from '@/api/users';
import { mockIfDev } from '@/utilities/devMock';
import { getMockIdeaApplyStatus } from '@/utilities/mockUtils';
import { Sorting, SortType } from '@/types/user/idea';

export const useApplyStatus = (phase: number, sorting?: Sorting, sort_type?: SortType) => {
  const query = useQuery({
    queryKey: ['applyStatus', phase, sorting ?? undefined, sort_type ?? undefined],
    queryFn: mockIfDev(
      () => getIdeaApplyStatus(phase, sorting, sort_type),
      getMockIdeaApplyStatus(phase, sorting, sort_type),
    ),
    staleTime: 60 * 1000,
  });

  return query;
};
