import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ButtonToggleGroup, Text } from '@goorm-dev/vapor-components';
import IdeaApplyListItem from '../../../../components/hackathon/teamBuilding/IdeaApplyListItem';
import { getMyApplySummary } from '../../../../api/users';
import usePeriodStore from '../../../../store/usePeriodStore';

export default function ApplicantPage() {
  const [buttonIndex, setButtonIndex] = useState(0);
  const [applySummary, setApplySummary] = useState<any>(null);

  // 현재 팀 빌딩 기간 조회
  const { current_period, phase1_period, phase2_period, phase3_period, fetchPeriodData } = usePeriodStore();

  useEffect(() => {
    fetchPeriodData();
  }, []);

  // 각 단계 그룹화 (기간 포함)
  const phases = [
    { label: '1차', periodText: phase1_period, keys: ['PHASE1_TEAM_BUILDING', 'PHASE1_CONFIRMATION'] },
    { label: '2차', periodText: phase2_period, keys: ['PHASE2_TEAM_BUILDING', 'PHASE2_CONFIRMATION'] },
    { label: '3차', periodText: phase3_period, keys: ['PHASE3_TEAM_BUILDING', 'PHASE3_CONFIRMATION'] },
  ];

  const currentPhaseIndex = phases.findIndex((phase) => phase.keys.includes(current_period));

  // 지원 내역 조회
  useEffect(() => {
    if (currentPhaseIndex >= 0) {
      const fetchApplySummary = async () => {
        try {
          const response = await getMyApplySummary(4, buttonIndex + 1);
          setApplySummary(response.data);
        } catch (error) {
          console.error('Error fetching apply summary:', error);
        }
      };
      fetchApplySummary();
    }
  }, [buttonIndex, currentPhaseIndex]);

  return (
    <div className={styles.container}>
      <Text as="h3" typography="heading3">
        팀 빌딩 현황
      </Text>
      <ButtonToggleGroup
        size="lg"
        activeIndex={buttonIndex}
        onToggle={setButtonIndex}
        className={styles.buttonToggleGroup}>
        {phases.map((phase, index) => {
          const isUpcoming = index > currentPhaseIndex;

          return (
            <ButtonToggleGroup.ButtonToggleItem key={phase.label} disabled={isUpcoming}>
              {isUpcoming ? `${phase.label} 공개 예정` : `${phase.label} (${phase.periodText || '기간 미정'})`}
            </ButtonToggleGroup.ButtonToggleItem>
          );
        })}
      </ButtonToggleGroup>

      {applySummary?.applies?.map((apply: any) => (
        <IdeaApplyListItem key={apply.apply_info.id} applySummary={apply} phase={buttonIndex + 1} />
      ))}
    </div>
  );
}
