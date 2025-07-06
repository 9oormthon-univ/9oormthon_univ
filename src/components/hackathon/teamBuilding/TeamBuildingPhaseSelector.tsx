import { ButtonToggleGroup } from '@goorm-dev/vapor-components';
import usePeriodStore from '../../../store/usePeriodStore';
import styles from './styles.module.scss';

interface TeamBuildingPhaseSelectorProps {
  onPhaseChange: (index: number) => void;
  activeIndex: number;
}

export default function TeamBuildingPhaseSelector({ onPhaseChange, activeIndex }: TeamBuildingPhaseSelectorProps) {
  // 기간 정보 불러오기
  const { current_period, phase1_period, phase2_period, phase3_period } = usePeriodStore();

  // 각 단계 그룹화 (기간 포함)
  const phases = [
    { label: '1차', periodText: phase1_period, keys: ['PHASE1_TEAM_BUILDING', 'PHASE1_CONFIRMATION'] },
    { label: '2차', periodText: phase2_period, keys: ['PHASE2_TEAM_BUILDING', 'PHASE2_CONFIRMATION'] },
    { label: '3차', periodText: phase3_period, keys: ['PHASE3_TEAM_BUILDING', 'PHASE3_CONFIRMATION'] },
  ];

  // 현재 진행 중인 단계 찾기
  const currentPhaseIndex = phases.findIndex((phase) => phase.keys.includes(current_period));
  const isHackathon = current_period === 'HACKATHON';

  return (
    <ButtonToggleGroup
      size="lg"
      activeIndex={activeIndex}
      onToggle={(index) => onPhaseChange(index)}
      className={styles.buttonToggleGroup}>
      {phases.map((phase, index) => {
        const isUpcoming = !isHackathon && index > currentPhaseIndex;

        return (
          <ButtonToggleGroup.ButtonToggleItem key={phase.label} disabled={isUpcoming}>
            {currentPhaseIndex === index ? `${phase.label} (${phase.periodText})` : `${phase.label}`}
          </ButtonToggleGroup.ButtonToggleItem>
        );
      })}
    </ButtonToggleGroup>
  );
}
