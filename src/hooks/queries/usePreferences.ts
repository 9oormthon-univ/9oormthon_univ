// src/hooks/queries/usePreferences.ts

import { useQuery } from '@tanstack/react-query';
import { fetchMyRemainingRanks } from '@/api/idea';
import { usePeriod } from './system/usePeriod';
import { mockIfDev } from '@/utilities/devMock';
import { mockMyRemainingRanks } from '@/constants/mockData';

export const usePreferences = () => {
  const { currentPhase } = usePeriod();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['preferences', currentPhase],
    queryFn: mockIfDev(
      () => fetchMyRemainingRanks(currentPhase),
      () => mockMyRemainingRanks,
    ),
    select: (data: { preferences: { number: number; is_active: boolean }[] }) => data.preferences,
    staleTime: 60 * 1000,
  });

  return { data, isLoading, isFetched };
};
