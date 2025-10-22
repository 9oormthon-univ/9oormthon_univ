// src/hooks/queries/useApply.ts

import { useQuery } from '@tanstack/react-query';
import { getMyApplySummary } from '@/api/users';
import { mockIfDev } from '@/utilities/devMock';
import { mockMyApplySummaryByPhase } from '@/constants/mockData';

export const useApply = (phase: number) => {
  const query = useQuery({
    queryKey: ['apply', phase],
    queryFn: mockIfDev(() => getMyApplySummary(phase), mockMyApplySummaryByPhase[phase]),
    staleTime: 60 * 1000,
  });

  return query;
};
