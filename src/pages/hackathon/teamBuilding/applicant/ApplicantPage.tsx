import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Skeleton, Text } from '@goorm-dev/vapor-components';
import IdeaApplyListItem from '../../../../components/hackathon/teamBuilding/IdeaApplyListItem';
import { getMyApplySummary } from '../../../../api/users';
import { getMockMyApplySummary } from '../../../../utilities/mockUtils';
import usePeriodStore from '../../../../store/usePeriodStore';
import TeamBuildingPhaseSelector from '../../../../components/hackathon/teamBuilding/TeamBuildingPhaseSelector';
import { GENERATION } from '../../../../constants/common';
import IdeaApplyListSkeleton from '../../../../components/hackathon/teamBuilding/skeletonLoading/IdeaApplyListSkeleton';

export default function ApplicantPage() {
  // 현재 팀빌딩 기간 조회
  const { current_phase, isLoading } = usePeriodStore();
  const [buttonIndex, setButtonIndex] = useState<number>(current_phase ? current_phase - 1 : 0);
  const [applySummary, setApplySummary] = useState<any>(null);
  const [isApplySummaryLoading, setIsApplySummaryLoading] = useState(false);

  // 지원 내역 조회
  const fetchApplySummary = async () => {
    try {
      setIsApplySummaryLoading(true);
      if (import.meta.env.DEV) {
        // 개발 환경에서는 목업 데이터 사용
        const response = await getMockMyApplySummary(GENERATION, buttonIndex + 1);
        setApplySummary(response.data);
      } else {
        // 프로덕션 환경에서는 실제 API 호출
        const response = await getMyApplySummary(GENERATION, buttonIndex + 1);
        setApplySummary(response.data);
      }
    } catch (error) {
      console.error('Error fetching apply summary:', error);
      setApplySummary(null);
    } finally {
      setIsApplySummaryLoading(false);
    }
  };

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
      {isApplySummaryLoading ? (
        <IdeaApplyListSkeleton />
      ) : applySummary?.applies?.length > 0 ? (
        [...applySummary.applies]
          .sort((a, b) => a.apply_info.preference - b.apply_info.preference)
          .map((apply: any) => (
            <IdeaApplyListItem
              key={apply.apply_info.id}
              applySummary={apply}
              onDeleteSuccess={fetchApplySummary}
              applyIndex={apply.apply_info.preference}
            />
          ))
      ) : (
        <Text typography="body1">지원 내역이 없습니다.</Text>
      )}
    </div>
  );
}
