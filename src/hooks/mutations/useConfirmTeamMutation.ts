// src/hooks/mutations/useConfirmTeamMutation.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { confirmTeamBuilding } from '@/api/teams';
import { mockIfDev } from '@/utilities/devMock';
import { confirmMockTeamBuilding } from '@/utilities/mockUtils';

export const useConfirmTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mockIfDev(confirmTeamBuilding, confirmMockTeamBuilding),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamInfo'] });
    },
  });
};
