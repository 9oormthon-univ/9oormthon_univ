import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import ApplyStatusTable from '../../../../components/hackathon/teamBuilding/applyStatusTable/ApplyStatusTable';
import TeamBuildingPhaseSelector from '../../../../components/hackathon/teamBuilding/TeamBuildingPhaseSelector';
import { useEffect, useState } from 'react';
import usePeriodStore from '../../../../store/usePeriodStore';
import { getIdeaApplyStatus } from '../../../../api/users';
import { getTeamInfo } from '../../../../api/teams';

export default function ProviderPage() {
  const [buttonIndex, setButtonIndex] = useState(0);
  const [applyStatus, setApplyStatus] = useState<any>(null);
  const [teamInfo, setTeamInfo] = useState<any>(null);
  // 현재 팀빌딩 기간 조회
  const { fetchPeriodData } = usePeriodStore();

  useEffect(() => {
    fetchPeriodData();
  }, []);

  // 지원 현황 조회
  useEffect(() => {
    const fetchApplyStatus = async () => {
      try {
        const response = await getIdeaApplyStatus(4, buttonIndex + 1);
        setApplyStatus(response.data);
      } catch (error) {
        console.error('지원 현황 불러오기 실패:', error);
        setApplyStatus({ counts: 0, applies: [] });
      }
    };
    fetchApplyStatus();
  }, [buttonIndex]);

  // 팀 정보 조회
  useEffect(() => {
    const fetchTeamInfo = async () => {
      const response = await getTeamInfo(4);
      setTeamInfo(response.data);
    };
    fetchTeamInfo();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.teamInform}>
        <Text as="h3" typography="heading3" color="text-normal">
          팀 정보
        </Text>
        <TeamInformation viewer={false} role={teamInfo?.role ?? {}} />
      </div>
      <div className={styles.applyStatus}>
        <div className={styles.applyStatusHeader}>
          <Text as="h3" typography="heading3" color="text-normal">
            지원 현황
          </Text>
          <Text as="h4" typography="heading4" color="text-primary">
            {applyStatus?.counts}명
          </Text>
        </div>

        <TeamBuildingPhaseSelector onPhaseChange={setButtonIndex} activeIndex={buttonIndex} />

        {applyStatus?.applies?.length > 0 ? (
          <ApplyStatusTable applicants={applyStatus} />
        ) : (
          <div className={styles.noApplyStatus}>
            <Text as="p" typography="body2" color="text-hint">
              지원자가 없습니다.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
