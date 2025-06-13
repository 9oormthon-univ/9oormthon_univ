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
  // 현재 팀빌딩 기간 조회
  const { current_phase, fetchPeriodData } = usePeriodStore();
  const [buttonIndex, setButtonIndex] = useState<number>(current_phase ? current_phase - 1 : 0);
  const [applySummary, setApplySummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 지원 내역 조회
  const fetchApplySummary = async () => {
    try {
      setIsLoading(true);
      const response = await getMyApplySummary(GENERATION, buttonIndex + 1);
      setApplySummary(response.data);
    } catch (error) {
      console.error('Error fetching apply summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await fetchPeriodData();
      setButtonIndex(current_phase ? current_phase - 1 : 0);
      setIsLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    fetchApplySummary();
  }, [buttonIndex]);

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
