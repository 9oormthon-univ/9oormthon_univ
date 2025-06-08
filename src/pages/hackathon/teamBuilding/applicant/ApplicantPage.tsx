import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import IdeaApplyListItem from '../../../../components/hackathon/teamBuilding/IdeaApplyListItem';
import { getMyApplySummary } from '../../../../api/users';
import usePeriodStore from '../../../../store/usePeriodStore';
import TeamBuildingPhaseSelector from '../../../../components/hackathon/teamBuilding/TeamBuildingPhaseSelector';
import { GENERATION } from '../../../../constants/common';

export default function ApplicantPage() {
  const [buttonIndex, setButtonIndex] = useState(0);
  const [applySummary, setApplySummary] = useState<any>(null);

  // 현재 팀빌딩 기간 조회
  const { fetchPeriodData } = usePeriodStore();

  useEffect(() => {
    fetchPeriodData();
  }, []);

  // 지원 내역 조회
  const fetchApplySummary = async () => {
    try {
      const response = await getMyApplySummary(GENERATION, buttonIndex + 1);
      setApplySummary(response.data);
    } catch (error) {
      console.error('Error fetching apply summary:', error);
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
      <TeamBuildingPhaseSelector onPhaseChange={setButtonIndex} activeIndex={buttonIndex} />

      {applySummary?.applies?.map((apply: any) => (
        <IdeaApplyListItem
          key={apply.apply_info.id}
          applySummary={apply}
          phase={buttonIndex + 1}
          onDeleteSuccess={fetchApplySummary}
          applyIndex={applySummary?.applies?.indexOf(apply) + 1}
        />
      ))}
    </div>
  );
}
