// src/hooks/mutations/useIdeaMutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIdeaAPI, deleteIdea, updateIdeaAPI } from '@/api/idea';
import { toast } from '@goorm-dev/vapor-components';
import { IdeaCreateEdit } from '@/types/user/idea';
import { IDEA_ADD_ERROR_MESSAGES } from '@/constants/errorMessage';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import { UserBrief } from '@/types/user/users';

// 아이디어 등록
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

// 아이디어 수정
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

// 아이디어 삭제
export const useDeleteIdeaMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const updateUser = useAuthStore((state) => state.updateUserFromQuery);

  return useMutation<void, unknown, { id: number }>({
    mutationFn: ({ id }: { id: number }) => deleteIdea(id),
    onSuccess: async (_data, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });

      const user = await queryClient.getQueryData(['user']);
      if (user) {
        updateUser(user as UserBrief);
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['ideas'] }),
        queryClient.invalidateQueries({ queryKey: ['idea', id] }),
      ]);

      navigate('/hackathon');
      toast('아이디어를 삭제했습니다.', {
        type: 'primary',
      });
    },
    onError: (error: any) => {
      const serverMessage = error?.response?.data?.error?.message;
      const message = serverMessage || '알 수 없는 오류가 발생하였습니다.';
      toast(message, {
        type: 'danger',
      });
    },
  });
};
