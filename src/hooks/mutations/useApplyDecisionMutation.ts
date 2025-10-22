// src/hooks/mutations/useApplyDesicionMutation.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptApply, rejectApply } from '@/api/users';

export const useApplyDecisionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (applyId: number) => acceptApply(applyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applyStatus'] });
    },
  });
};

export const useRejectApplyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (applyId: number) => rejectApply(applyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applyStatus'] });
    },
  });
};
