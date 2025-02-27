import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import ApplyStatusTable from '../../../../components/hackathon/teamBuilding/applyStatusTable/ApplyStatusTable';
import TeamBuildingPhaseSelector from '../../../../components/hackathon/teamBuilding/TeamBuildingPhaseSelector';
import { useEffect, useState } from 'react';
import usePeriodStore from '../../../../store/usePeriodStore';
import { getIdeaApplyStatus } from '../../../../api/users';

export default function ProviderPage() {
  const [buttonIndex, setButtonIndex] = useState(0);
  const [applyStatus, setApplyStatus] = useState<any>(null);
  // 현재 팀빌딩 기간 조회
  const { fetchPeriodData } = usePeriodStore();

  useEffect(() => {
    fetchPeriodData();
  }, []);

  // 지원 현황 조회
  useEffect(() => {
    const fetchApplyStatus = async () => {
      const response = await getIdeaApplyStatus(4, buttonIndex + 1);
      setApplyStatus(response.data);
    };
    fetchApplyStatus();
  }, [buttonIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.teamInform}>
        <Text as="h3" typography="heading3" color="text-normal">
          팀 정보
        </Text>
        <TeamInformation viewer={false} />
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

        <ApplyStatusTable applicants={applyStatus} />
      </div>
    </div>
  );
}
