import { useState } from 'react';
import PeriodRangeRow from '../../../../components/admin/period/teamBuildingPeriod/PeriodRangeRow';
import styles from './teamBuildingPeriodPage.module.scss';
import { Text, Button } from '@goorm-dev/vapor-components';
import TeamBuildingPhase from '../../../../components/admin/period/teamBuildingPeriod/TeamBuildingPhase';

export default function TeamBuildingPeriodPage() {
  const [ideaPeriod, setIdeaPeriod] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: '',
  });

  const [phase, setPhase] = useState([
    { id: 1, supportPeriod: { startDate: '', endDate: '' }, confirmPeriod: { startDate: '', endDate: '' } },
    { id: 2, supportPeriod: { startDate: '', endDate: '' }, confirmPeriod: { startDate: '', endDate: '' } },
    { id: 3, supportPeriod: { startDate: '', endDate: '' }, confirmPeriod: { startDate: '', endDate: '' } },
  ]);

  const handleSave = () => {
    console.log(ideaPeriod, phase);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text typography="heading4" color="text-normal">
          팀 빌딩 기간
        </Text>
        <Button size="md" color="primary" onClick={handleSave}>
          저장하기
        </Button>
      </div>
      <PeriodRangeRow
        label="아이디어 등록 기간"
        startDate={ideaPeriod.startDate}
        endDate={ideaPeriod.endDate}
        onChange={(startDate, endDate) => setIdeaPeriod({ startDate, endDate })}
      />
      {phase.map((item) => (
        <TeamBuildingPhase key={item.id} phase={item} setPhase={setPhase} />
      ))}
    </div>
  );
}
