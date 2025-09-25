// src/hooks/queries/useIdeaDetail.ts

import { useQuery } from '@tanstack/react-query';
import { fetchMyIdeaDetail } from '@/api/idea';
import { IdeaInfo, ProviderInfo, Requirements } from '@/types/user/idea';

interface IdeaDetail {
  provider_info: ProviderInfo;
  idea_info: IdeaInfo;
  requirements: Requirements;
}

export const useIdeaDetail = () => {
  const query = useQuery<IdeaDetail, Error>({
    queryKey: ['ideaDetail'],
    queryFn: () => fetchMyIdeaDetail(),
    select: (data: IdeaDetail) => data,
    staleTime: 0,
  });

  return query;
};
