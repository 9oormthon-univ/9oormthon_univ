// src/hooks/queries/useIdeaSubjects.ts
import { useQuery } from '@tanstack/react-query';
import { fetchIdeaSubjects } from '@/api/idea';
import { GENERATION } from '@/constants/common';
import { mockTopics } from '@/constants/mockData';
import { IdeaSubject } from '@/types/user/idea';

// 아이디어 주제 조회
export const useIdeaSubjects = (includeAll: boolean = false, isTeamBuilding: boolean = true) => {
  const query = useQuery({
    queryKey: ['ideaSubjects', GENERATION],
    queryFn: () => fetchIdeaSubjects(GENERATION),
    select: (data: { idea_subjects: IdeaSubject[] }) =>
      includeAll
        ? [
            { id: 0, name: '전체 주제' },
            ...data.idea_subjects.map((subject) => ({ id: subject.id, name: subject.name })),
          ]
        : data.idea_subjects.map((subject) => ({ id: subject.id, name: subject.name })),
    enabled: !import.meta.env.DEV && isTeamBuilding,
  });

  // 개발 환경에서는 mock 데이터 사용
  if (import.meta.env.DEV) {
    return {
      data: includeAll ? [{ id: 0, name: '전체 주제' }, ...mockTopics.idea_subjects] : mockTopics.idea_subjects,
      isLoading: false,
    } as const;
  }

  return query;
};
