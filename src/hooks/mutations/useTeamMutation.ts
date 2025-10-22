// src/hooks/mutations/useTeamMutation.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTeamInfo } from '@/api/teams';

export const useTeamNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamName: string) => updateTeamInfo(teamName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamInfo'] });
    },
    onError: (error: any) => {
      if (import.meta.env.DEV) {
        console.log(error);
      }
    },
  });
};
