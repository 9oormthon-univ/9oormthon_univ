// src/hooks/queries/useIdea.ts

import { useQuery } from '@tanstack/react-query';
import { fetchIdeas } from '@/api/idea';
import { mockIdeas } from '@/constants/mockData';
import { Ideas, PageInfo } from '@/types/user/idea';

// 아이디어 조회
export const useIdeas = (
  page: number,
  size: number,
  generation: number,
  subjectId?: number,
  isActive?: boolean,
  isBookmarked?: boolean,
  search?: string,
) => {
  const query = useQuery({
    queryKey: ['ideas', { page, size, generation, subjectId, isActive, isBookmarked, search }],
    queryFn: () => fetchIdeas(page, size, generation, subjectId, isActive, isBookmarked, search),
    select: (data: { max_idea_number: number; current_idea_number: number; ideas: Ideas[]; page_info: PageInfo }) =>
      data,
    staleTime: 60 * 1000,
  });

  if (import.meta.env.DEV) {
    return {
      data: {
        max_idea_number: 50,
        current_idea_number: 8,
        ideas: mockIdeas,
        page_info: { current_page: 1, page_size: 1, total_pages: 1, total_items: 1 },
      },
      isLoading: false,
    } as const;
  }

  return query;
};
