import React from 'react';
import PeriodRangeRow from './PeriodRangeRow';
import styles from './teamBuildingPhase.module.scss';
import { Text } from '@goorm-dev/vapor-components';

interface Phase {
  id: number;
  supportPeriod: { startDate: string; endDate: string };
  confirmPeriod: { startDate: string; endDate: string };
}

interface TeamBuildingPhaseProps {
  phase: Phase;
  setPhase: React.Dispatch<React.SetStateAction<Phase[]>>;
}

export default function TeamBuildingPhase({ phase, setPhase }: TeamBuildingPhaseProps) {
  const handleSupportPeriodChange = (startDate: string, endDate: string) => {
    setPhase((prev) => prev.map((p) => (p.id === phase.id ? { ...p, supportPeriod: { startDate, endDate } } : p)));
  };

  const handleConfirmPeriodChange = (startDate: string, endDate: string) => {
    setPhase((prev) => prev.map((p) => (p.id === phase.id ? { ...p, confirmPeriod: { startDate, endDate } } : p)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text typography="subtitle1" color="text-normal">
          {phase.id}차 팀빌딩 기간
        </Text>
        <Text typography="body4" color="text-hint">
          {phase.supportPeriod.startDate} ~ {phase.confirmPeriod.endDate}
        </Text>
      </div>
      <div className={styles.content}>
        <PeriodRangeRow
          label="지원 기간"
          startDate={phase.supportPeriod.startDate}
          endDate={phase.supportPeriod.endDate}
          onChange={(startDate, endDate) => handleSupportPeriodChange(startDate, endDate)}
        />
        <PeriodRangeRow
          label="합불 결정 기간"
          startDate={phase.confirmPeriod.startDate}
          endDate={phase.confirmPeriod.endDate}
          onChange={(startDate, endDate) => handleConfirmPeriodChange(startDate, endDate)}
        />
      </div>
    </div>
  );
}
