import { useEffect, useState } from 'react';
import PeriodRangeRow from '../../../../components/admin/period/teamBuildingPeriod/PeriodRangeRow';
import styles from './teamBuildingPeriodPage.module.scss';
import { Text, Button, toast } from '@goorm-dev/vapor-components';
import TeamBuildingPhase from '../../../../components/admin/period/teamBuildingPeriod/TeamBuildingPhase';
import { getPeriod, setPeriod } from '../../../../api/admin/system';
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

  const [hackathonPeriod, setHackathonPeriod] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: '',
  });

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

      hackathon_start: toISOStringWithTime(hackathonPeriod.startDate, true) || '',
      hackathon_end: toISOStringWithTime(hackathonPeriod.endDate, false) || '',
    };
    try {
      await setPeriod(payload);
      toast('기간 설정이 완료되었습니다.', {
        type: 'primary',
      });
    } catch {
      toast('기간 설정에 실패했습니다.', {
        type: 'danger',
      });
    }
  };

  const formatDateInput = (date: string) => {
    return date.split('T')[0];
  };

  // 기간 조회
  useEffect(() => {
    const fetchPeriod = async () => {
      try {
        const res = await getPeriod();
        const data = res.data;
        setIdeaPeriod({
          startDate: formatDateInput(data.idea_submission_start),
          endDate: formatDateInput(data.idea_submission_end),
        });
        setPhase([
          {
            id: 1,
            supportPeriod: {
              startDate: formatDateInput(data.phase1_team_building_start),
              endDate: formatDateInput(data.phase1_team_building_end),
            },
            confirmPeriod: {
              startDate: formatDateInput(data.phase1_confirmation_start),
              endDate: formatDateInput(data.phase1_confirmation_end),
            },
          },
          {
            id: 2,
            supportPeriod: {
              startDate: formatDateInput(data.phase2_team_building_start),
              endDate: formatDateInput(data.phase2_team_building_end),
            },
            confirmPeriod: {
              startDate: formatDateInput(data.phase2_confirmation_start),
              endDate: formatDateInput(data.phase2_confirmation_end),
            },
          },
          {
            id: 3,
            supportPeriod: {
              startDate: formatDateInput(data.phase3_team_building_start),
              endDate: formatDateInput(data.phase3_team_building_end),
            },
            confirmPeriod: {
              startDate: formatDateInput(data.phase3_confirmation_start),
              endDate: formatDateInput(data.phase3_confirmation_end),
            },
          },
        ]);
        setHackathonPeriod({
          startDate: formatDateInput(data.hackathon_start),
          endDate: formatDateInput(data.hackathon_end),
        });
      } catch {
        toast('기간 조회에 실패했습니다.', {
          type: 'error',
        });
      }
    };
    fetchPeriod();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text typography="heading4" color="text-normal">
          팀 빌딩 기간
        </Text>
        <Button size="md" color="primary" onClick={handleSave}>
          저장
        </Button>
      </div>
      <PeriodRangeRow
        label="아이디어 등록 기간"
        startDate={ideaPeriod.startDate}
        endDate={ideaPeriod.endDate}
        onChange={(startDate, endDate) => {
          setIdeaPeriod({ startDate: formatDateInput(startDate), endDate: formatDateInput(endDate) });
        }}
      />
      {phase.map((item) => (
        <TeamBuildingPhase key={item.id} phase={item} setPhase={setPhase} />
      ))}
      <PeriodRangeRow
        label="해커톤 기간(팀 빌딩 종료)"
        startDate={hackathonPeriod.startDate}
        endDate={hackathonPeriod.endDate}
        onChange={(startDate, endDate) => {
          setHackathonPeriod({ startDate: formatDateInput(startDate), endDate: formatDateInput(endDate) });
        }}
      />
    </div>
  );
}
