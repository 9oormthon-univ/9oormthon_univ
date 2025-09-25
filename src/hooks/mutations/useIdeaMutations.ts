// src/hooks/mutations/useIdeaMutations.ts

import { useMutation } from '@tanstack/react-query';
import { createIdeaAPI, updateIdeaAPI } from '@/api/idea';
import { toast } from '@goorm-dev/vapor-components';
import { IdeaCreateEdit } from '@/types/user/idea';
import { IDEA_ADD_ERROR_MESSAGES } from '@/constants/errorMessage';

export const useCreateIdeaMutation = () => {
  return useMutation<void, unknown, IdeaCreateEdit>({
    mutationFn: (data: IdeaCreateEdit) => createIdeaAPI(data),
    onError: (error: any) => {
      const serverMessage = error?.response?.data?.error?.message;
      const message = serverMessage || '알 수 없는 오류가 발생하였습니다.';
      toast(message, {
        type: 'danger',
      });
    },
  });
};

export const useUpdateIdeaMutation = () => {
  return useMutation<void, unknown, { data: IdeaCreateEdit; id: number }>({
    mutationFn: ({ data, id }: { data: IdeaCreateEdit; id: number }) => updateIdeaAPI(data, id),
    onError: (error: any) => {
      const serverCode = error?.response?.data?.error?.code as keyof typeof IDEA_ADD_ERROR_MESSAGES | undefined;
      const message = (serverCode && IDEA_ADD_ERROR_MESSAGES[serverCode]) || '알 수 없는 오류가 발생하였습니다.';
      toast(message, {
        type: 'danger',
      });
    },
  });
};
