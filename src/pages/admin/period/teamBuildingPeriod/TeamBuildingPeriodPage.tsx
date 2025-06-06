import { useState } from 'react';
import PeriodRangeRow from '../../../../components/admin/period/teamBuildingPeriod/PeriodRangeRow';
import styles from './teamBuildingPeriodPage.module.scss';
import { Text, Button, toast } from '@goorm-dev/vapor-components';
import TeamBuildingPhase from '../../../../components/admin/period/teamBuildingPeriod/TeamBuildingPhase';
import { setPeriod } from '../../../../api/admin/system';
import { PeriodSettingPayload } from '../../../../types/admin/system';

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

  const toISOStringWithTime = (dateStr: string, isStart: boolean) => {
    if (!dateStr) return null;
    return `${dateStr}T${isStart ? '00:00:00' : '23:59:59'}`;
  };

  const handleSave = async () => {
    const payload: PeriodSettingPayload = {
      idea_submission_start: toISOStringWithTime(ideaPeriod.startDate, true) || '',
      idea_submission_end: toISOStringWithTime(ideaPeriod.endDate, false) || '',

      phase1_team_building_start: toISOStringWithTime(phase[0].supportPeriod.startDate, true) || '',
      phase1_team_building_end: toISOStringWithTime(phase[0].supportPeriod.endDate, false) || '',
      phase1_confirmation_start: toISOStringWithTime(phase[0].confirmPeriod.startDate, true) || '',
      phase1_confirmation_end: toISOStringWithTime(phase[0].confirmPeriod.endDate, false) || '',

      phase2_team_building_start: toISOStringWithTime(phase[1].supportPeriod.startDate, true) || '',
      phase2_team_building_end: toISOStringWithTime(phase[1].supportPeriod.endDate, false) || '',
      phase2_confirmation_start: toISOStringWithTime(phase[1].confirmPeriod.startDate, true) || '',
      phase2_confirmation_end: toISOStringWithTime(phase[1].confirmPeriod.endDate, false) || '',

      phase3_team_building_start: toISOStringWithTime(phase[2].supportPeriod.startDate, true) || '',
      phase3_team_building_end: toISOStringWithTime(phase[2].supportPeriod.endDate, false) || '',
      phase3_confirmation_start: toISOStringWithTime(phase[2].confirmPeriod.startDate, true) || '',
      phase3_confirmation_end: toISOStringWithTime(phase[2].confirmPeriod.endDate, false) || '',
    };
    await setPeriod(payload);
    toast('기간 설정이 완료되었습니다.', {
      type: 'success',
    });
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
