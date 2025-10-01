import { ButtonToggleGroup } from '@goorm-dev/vapor-components';
import { usePeriod } from '@/hooks/queries/system/usePeriod';
import styles from './styles.module.scss';

interface TeamBuildingPhaseSelectorProps {
  onPhaseChange: (index: number) => void;
  activeIndex: number;
}

export default function TeamBuildingPhaseSelector({ onPhaseChange, activeIndex }: TeamBuildingPhaseSelectorProps) {
  // 기간 정보 불러오기
  const { currentPhase, periodData } = usePeriod();

  // 각 단계 그룹화 (기간 포함)
  const phases = [
    { label: '1차', periodText: periodData?.phase1_period, number: 1 },
    { label: '2차', periodText: periodData?.phase2_period, number: 2 },
    { label: '3차', periodText: periodData?.phase3_period, number: 3 },
  ];

  // 현재 진행 중인 단계 찾기
  const currentPhaseIndex = phases.findIndex((phase) => phase.number === currentPhase);
  const isHackathon = currentPhase !== 1 && currentPhase !== 2 && currentPhase !== 3;

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
