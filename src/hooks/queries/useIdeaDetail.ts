// src/hooks/queries/useIdeaDetail.ts

import { useQuery } from '@tanstack/react-query';
import { fetchIdeaDetailById, fetchMyIdeaDetail } from '@/api/idea';
import { IdeaInfoDetail, ProviderInfo, Requirements } from '@/types/user/idea';
import { getMockIdeaDetailById, getMockMyIdeaDetail } from '@/utilities/mockUtils';

interface IdeaDetail {
  idea_info: IdeaInfoDetail;
  provider_info: ProviderInfo;
  requirements: Requirements;
}

// 아이디어 상세 조회
export const useIdeaDetail = (ideaId?: string, enabled: boolean = true) => {
  const query = useQuery<IdeaDetail, Error>({
    queryKey: ['IdeaDetail', ideaId ?? 'my'],
    queryFn: async () => {
      if (import.meta.env.DEV) {
        return ideaId ? getMockIdeaDetailById(ideaId) : getMockMyIdeaDetail();
      } else {
        return ideaId ? fetchIdeaDetailById(ideaId) : fetchMyIdeaDetail();
      }
    },
    select: (data: IdeaDetail) => data,
    staleTime: 60 * 1000,
    enabled: enabled && !!ideaId,
  });

  return query;
};
