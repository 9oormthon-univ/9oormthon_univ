import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import ApplyStatusTable from '../../../../components/hackathon/teamBuilding/applyStatusTable/ApplyStatusTable';
import TeamBuildingPhaseSelector from '../../../../components/hackathon/teamBuilding/TeamBuildingPhaseSelector';
import { useEffect, useState } from 'react';
import usePeriodStore from '../../../../store/usePeriodStore';
import { getIdeaApplyStatus } from '../../../../api/users';
import { Applies } from '../../../../types/user/team';
import { GENERATION } from '../../../../constants/common';

export default function ProviderPage() {
  const [buttonIndex, setButtonIndex] = useState<number>(0);
  const [applyStatus, setApplyStatus] = useState<{ counts: number; applies: Applies[] }>({ counts: 0, applies: [] });
  // 현재 팀빌딩 기간 조회
  const { current_phase, fetchPeriodData } = usePeriodStore();

  useEffect(() => {
    fetchPeriodData();
  }, []);

  // fetchApplyStatus를 컴포넌트 레벨로 올리고 재사용 가능하게 만듦
  const fetchApplyStatus = async () => {
    try {
      const response = await getIdeaApplyStatus(GENERATION, buttonIndex + 1);
      setApplyStatus(response.data);
    } catch (error) {
      console.error('지원 현황 불러오기 실패:', error);
      setApplyStatus({ counts: 0, applies: [] });
    }
  };

  useEffect(() => {
    if (typeof current_phase === 'number') {
      setButtonIndex(current_phase - 1);
    }
  }, [current_phase]);

  useEffect(() => {
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

        {typeof current_phase === 'number' && (
          <TeamBuildingPhaseSelector onPhaseChange={setButtonIndex} activeIndex={buttonIndex} />
        )}

        {applyStatus?.applies?.length > 0 ? (
          <ApplyStatusTable applicants={applyStatus.applies} refetchApplyStatus={fetchApplyStatus} />
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
