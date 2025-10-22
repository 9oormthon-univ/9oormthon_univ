// src/hooks/mutations/useApplyIdeaMutation.ts

import { useMutation } from '@tanstack/react-query';
import { applyIdea } from '@/api/idea';
import { PositionKey } from '@/constants/position';

interface ApplyIdeaMutationProps {
  idea_id: string;
  phase: number;
  preference: number;
  motivation: string;
  role: PositionKey;
}

export const useApplyIdeaMutation = () => {
  return useMutation({
    mutationFn: ({ idea_id, phase, preference, motivation, role }: ApplyIdeaMutationProps) =>
      applyIdea(idea_id, phase, preference, motivation, role),
  });
};
