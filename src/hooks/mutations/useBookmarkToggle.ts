// src/hooks/mutations/useBookmarkToggle.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addIdeaBookmark } from '@/api/idea';
import { toast } from '@goorm-dev/vapor-components';
import { updateMockIdeaBookmark } from '@/utilities/mockUtils';
import { mockIdeas } from '@/constants/mockData';

export const useBookmarkToggle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (idea_id: number) => {
      if (import.meta.env.DEV) {
        updateMockIdeaBookmark(mockIdeas, idea_id);
        return idea_id;
      } else {
        await addIdeaBookmark(idea_id);
        return idea_id;
      }
    },
    onMutate: async (idea_id: number) => {
      await queryClient.cancelQueries({ queryKey: ['ideas'] });
      const previousIdeas = queryClient.getQueryData(['ideas']);
      queryClient.setQueryData(['ideas'], (old: any) => {
        if (!old) return old;
        return old.map((idea: any) => (idea.id === idea_id ? { ...idea, is_bookmarked: !idea.is_bookmarked } : idea));
      });
      return { previousIdeas };
    },
    onError: (err: any, _idea_id, context) => {
      const errorCode = err.response.data.error?.code;
      if (errorCode === 40013) {
        toast('본인 아이디어는 북마크 할 수 없습니다.', { type: 'danger' });
        return;
      } else {
        toast('북마크 상태 변경에 실패했습니다.', { type: 'danger' });
      }
      queryClient.setQueryData(['ideas'], context?.previousIdeas);
    },
    onSuccess: () => {
      toast('북마크 상태가 변경되었습니다.', { type: 'primary' });
    },
  });
};
