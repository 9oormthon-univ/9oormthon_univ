// src/hooks/mutations/useApplyMutation.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteApply } from '@/api/users';
import { toast } from '@goorm-dev/vapor-components';
import { mockIfDev } from '@/utilities/devMock';
import { deleteMockApply } from '@/utilities/mockUtils';

export const useApplyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockIfDev((applyId: number) => deleteApply(applyId), deleteMockApply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apply'] });
      toast('지원 취소가 완료되었습니다.', { type: 'primary' });
    },
    onError: (error: any) => {
      const serverMessage = error?.response?.data?.error?.message;
      const message = serverMessage || '알 수 없는 오류가 발생하였습니다.';
      toast(message, { type: 'danger' });
    },
  });
};
