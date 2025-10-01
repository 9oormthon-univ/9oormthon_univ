import { useState } from 'react';
import styles from './styles.module.scss';
import { Skeleton, Text } from '@goorm-dev/vapor-components';
import IdeaApplyListItem from '@/components/hackathon/teamBuilding/IdeaApplyListItem';
import TeamBuildingPhaseSelector from '@/components/hackathon/teamBuilding/TeamBuildingPhaseSelector';
import IdeaApplyListSkeleton from '@/components/hackathon/teamBuilding/skeletonLoading/IdeaApplyListSkeleton';
import { useApply } from '@/hooks/queries/useApply';
import { usePeriod } from '@/hooks/queries/system/usePeriod';
import { ApplySummary } from '@/types/user/users';

export default function ApplicantPage() {
  // 현재 팀빌딩 기간 조회
  const { currentPhase, isLoading } = usePeriod();
  const [buttonIndex, setButtonIndex] = useState<number>(currentPhase ? currentPhase - 1 : 0);
  const { data: applySummary, isLoading: isApplySummaryLoading } = useApply(buttonIndex + 1);

  return (
    <div className={styles.container}>
      <Text as="h3" typography="heading3">
        팀 빌딩 현황
      </Text>
      {isLoading ? (
        <Skeleton width="23.4375rem" height="3rem" />
      ) : (
        <TeamBuildingPhaseSelector onPhaseChange={setButtonIndex} activeIndex={buttonIndex} />
      )}
      {isApplySummaryLoading ? (
        <IdeaApplyListSkeleton />
      ) : applySummary && applySummary.applies?.length > 0 ? (
        [...(applySummary.applies || [])]
          .sort((a, b) => a.apply_info.preference - b.apply_info.preference)
          .map((apply: ApplySummary) => (
            <IdeaApplyListItem
              key={apply.apply_info.id}
              applySummary={apply}
              onDeleteSuccess={() => {}}
              applyIndex={apply.apply_info.preference}
            />
          ))
      ) : (
        <Text typography="body1">지원 내역이 없습니다.</Text>
      )}
    </div>
  );
}
