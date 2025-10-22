// src/hooks/queries/system/usePeriod.ts

import { useQuery } from '@tanstack/react-query';
import { fetchPeriod } from '@/api/system';
import { useMemo } from 'react';
import { mockPeriodData } from '@/constants/mockData';
import { mockIfDev } from '@/utilities/devMock';

export const usePeriod = () => {
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['period'],
    queryFn: mockIfDev(fetchPeriod, mockPeriodData),
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const currentPhase = useMemo(() => {
    const period = data?.current_period;
    if (period?.startsWith('PHASE1')) return 1;
    if (period?.startsWith('PHASE2')) return 2;
    if (period?.startsWith('PHASE3')) return 3;
    return 0;
  }, [data]);

  // 팀빌딩 지원 기간인지 확인
  const isApplyAblePeriod = ['PHASE1_TEAM_BUILDING', 'PHASE2_TEAM_BUILDING', 'PHASE3_TEAM_BUILDING'].includes(
    data?.current_period,
  );

  // 확정 기간인지 확인
  const isConfirmationPeriod = ['PHASE1_CONFIRMATION', 'PHASE2_CONFIRMATION', 'PHASE3_CONFIRMATION'].includes(
    data?.current_period,
  );

  // 게시글 열람 가능 여부
  const isAccessibility = isApplyAblePeriod || isConfirmationPeriod || data?.current_period === 'HACKATHON';

  // 기간 정보 문구
  const PHASE_INFO = {
    IDEA_SUBMISSION: `지금은 아이디어 제출 기간입니다. (${data?.idea_submission_period})`,
    PHASE1_TEAM_BUILDING: `지금은 1차 팀빌딩 지원 기간입니다. (${data?.phase1_team_building_period})`,
    PHASE1_CONFIRMATION: `지금은 1차 팀빌딩 합불 결정 기간입니다. (${data?.phase1_confirmation_period})`,
    PHASE2_TEAM_BUILDING: `지금은 2차 팀빌딩 지원 기간입니다. (${data?.phase2_team_building_period})`,
    PHASE2_CONFIRMATION: `지금은 2차 팀빌딩 합불 결정 기간입니다. (${data?.phase2_confirmation_period})`,
    PHASE3_TEAM_BUILDING: `지금은 3차 팀빌딩 지원 기간입니다. (${data?.phase3_team_building_period})`,
    PHASE3_CONFIRMATION: `지금은 3차 팀빌딩 합불 결정 기간입니다. (${data?.phase3_confirmation_period})`,
    HACKATHON: `팀 빌딩 기간이 종료되었습니다. (${data?.hackathon_period})`,
    NONE: '해커톤 또는 팀 빌딩 기간이 아닙니다.',
  };

  return {
    periodData: data,
    currentPhase,
    isApplyAblePeriod,
    isConfirmationPeriod,
    isAccessibility,
    PHASE_INFO,
    isLoading,
    isFetched,
  };
};
