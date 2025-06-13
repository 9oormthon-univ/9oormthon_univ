import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Skeleton, Text } from '@goorm-dev/vapor-components';
import IdeaApplyListItem from '../../../../components/hackathon/teamBuilding/IdeaApplyListItem';
import { getMyApplySummary } from '../../../../api/users';
import usePeriodStore from '../../../../store/usePeriodStore';
import TeamBuildingPhaseSelector from '../../../../components/hackathon/teamBuilding/TeamBuildingPhaseSelector';
import { GENERATION } from '../../../../constants/common';
import IdeaApplyListSkeleton from '../../../../components/hackathon/teamBuilding/skeletonLoading/IdeaApplyListSkeleton';

export default function ApplicantPage() {
  const [buttonIndex, setButtonIndex] = useState(0);
  const [applySummary, setApplySummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 현재 팀빌딩 기간 조회
  const { current_phase, fetchPeriodData } = usePeriodStore();

  // 지원 내역 조회
  const fetchApplySummary = async () => {
    try {
      setIsLoading(true);
      const response = await getMyApplySummary(GENERATION, current_phase);
      setApplySummary(response.data);
    } catch (error) {
      console.error('Error fetching apply summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPeriodData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (current_phase) {
      fetchApplySummary();
    }
  }, [current_phase]);

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
      {isLoading ? (
        <IdeaApplyListSkeleton />
      ) : applySummary?.applies?.length > 0 ? (
        applySummary?.applies?.map((apply: any) => (
          <IdeaApplyListItem
            key={apply.apply_info.id}
            applySummary={apply}
            phase={current_phase}
            onDeleteSuccess={fetchApplySummary}
            applyIndex={applySummary?.applies?.indexOf(apply) + 1}
          />
        ))
      ) : (
        <Text typography="body1">지원 내역이 없습니다.</Text>
      )}
    </div>
  );
}
