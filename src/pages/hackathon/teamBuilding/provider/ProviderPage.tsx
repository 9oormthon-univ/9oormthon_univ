import styles from './styles.module.scss';
import { Text, Button, toast, Skeleton, Badge } from '@goorm-dev/vapor-components';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import ApplyStatusTable from '../../../../components/hackathon/teamBuilding/applyStatusTable/ApplyStatusTable';
import TeamBuildingPhaseSelector from '../../../../components/hackathon/teamBuilding/TeamBuildingPhaseSelector';
import { useEffect, useState } from 'react';
import usePeriodStore from '../../../../store/usePeriodStore';
import { getIdeaApplyStatus } from '../../../../api/users';
import { Applies, TeamInfo } from '../../../../types/user/team';
import { GENERATION } from '../../../../constants/common';
import InformationModal from '../../../../components/common/modal/InformationModal';
import { confirmTeamBuilding, getTeamInfo } from '../../../../api/teams';
import TeamInformationSkeleton from '../../../../components/hackathon/teamBuilding/skeletonLoading/TeamInformationSkeleton';
import TeamBuildingTableSkeleton from '../../../../components/hackathon/teamBuilding/skeletonLoading/TeamBuildingTableSkeleton';
import AcceptableCountIndicator from '../../../../components/hackathon/teamBuilding/AcceptableCountIndicator';

export default function ProviderPage() {
  // 현재 팀빌딩 기간 조회
  const { current_phase, fetchPeriodData } = usePeriodStore();
  const [buttonIndex, setButtonIndex] = useState<number>(0);
  const [applyStatus, setApplyStatus] = useState<{ counts: number; applies: Applies[] }>({ counts: 0, applies: [] });
  const [currentPhaseApplyStatus, setCurrentPhaseApplyStatus] = useState<{ counts: number; applies: Applies[] }>({
    counts: 0,
    applies: [],
  });
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);

  // 팀 빌딩 확정 모달
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [isLoading, setIsLoading] = useState(false);

  // fetchApplyStatus를 컴포넌트 레벨로 올리고 재사용 가능하게 만듦
  const fetchApplyStatus = async () => {
    try {
      setIsLoading(true);
      const response = await getIdeaApplyStatus(GENERATION, buttonIndex + 1);
      setApplyStatus(response.data);
    } catch (error) {
      console.error('지원 현황 불러오기 실패:', error);
      setApplyStatus({ counts: 0, applies: [] });
    } finally {
      setIsLoading(false);
    }
  };

  // 현재 차시 지원 현황 불러오기
  const fetchCurrentPhaseApplyStatus = async () => {
    try {
      setIsLoading(true);
      const response = await getIdeaApplyStatus(GENERATION, current_phase);
      setCurrentPhaseApplyStatus(response.data);
    } catch (error) {
      console.error('지원 현황 불러오기 실패:', error);
      setCurrentPhaseApplyStatus({ counts: 0, applies: [] });
    } finally {
      setIsLoading(false);
    }
  };

  // 팀 빌딩 확정
  const handleConfirmTeamBuilding = async () => {
    try {
      await confirmTeamBuilding(GENERATION);
      toast('팀 빌딩이 확정되었습니다.', {
        type: 'primary',
      });
      toggle();
      fetchTeamInfo();
    } catch (error) {
      console.error('팀 빌딩 확정 실패:', error);
      toast('팀 빌딩 확정에 실패했습니다.', {
        type: 'danger',
      });
    }
  };

  // 팀 정보 불러오기
  const fetchTeamInfo = async () => {
    try {
      setIsLoading(true);
      const res = await getTeamInfo(GENERATION);
      setTeamInfo(res.data);
    } catch (error: any) {
      console.error('팀 정보 불러오기 실패:', error);
      toast('팀 정보 불러오기 실패', { type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  // 팀 정보 불러오기
  useEffect(() => {
    fetchTeamInfo();
    fetchCurrentPhaseApplyStatus();
  }, []);

  // 팀 빌딩 기간 조회
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await fetchPeriodData();

      setIsLoading(false);
    };
    fetch();
  }, []);

  // current_phase 변경 시 buttonIndex 업데이트
  useEffect(() => {
    setButtonIndex(current_phase ? current_phase - 1 : 0);
  }, [current_phase]);

  // 지원 현황 불러오기
  useEffect(() => {
    fetchApplyStatus();
  }, [buttonIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.teamInform}>
        <div className={styles.teamInformHeader}>
          <div className={styles.teamInformHeaderTitle}>
            <Text as="h3" typography="heading3" color="text-normal">
              팀 정보
            </Text>
            {teamInfo?.team_building === 'END' && (
              <Badge pill size="lg" color="hint">
                확정 완료
              </Badge>
            )}
          </div>
          <Button size="md" color="primary" onClick={toggle} disabled={teamInfo?.team_building === 'END'}>
            팀 빌딩 확정
          </Button>
        </div>

        {isLoading ? <TeamInformationSkeleton /> : <TeamInformation viewer={false} teamInfo={teamInfo} />}
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

        {teamInfo && <AcceptableCountIndicator teamInfo={teamInfo} applies={currentPhaseApplyStatus.applies} />}

        {isLoading ? (
          <Skeleton width="23.4375rem" height="3rem" />
        ) : (
          typeof current_phase === 'number' && (
            <TeamBuildingPhaseSelector onPhaseChange={setButtonIndex} activeIndex={buttonIndex} />
          )
        )}

        {isLoading ? (
          <TeamBuildingTableSkeleton />
        ) : applyStatus?.applies?.length > 0 ? (
          <ApplyStatusTable applicants={applyStatus.applies} refetchApplyStatus={fetchApplyStatus} />
        ) : (
          <div className={styles.noApplyStatus}>
            <Text as="p" typography="body2" color="text-hint">
              지원자가 없습니다.
            </Text>
          </div>
        )}
      </div>

      <InformationModal
        isOpen={isOpen}
        toggle={toggle}
        title="팀 빌딩을 확정할까요?"
        description="한번 결정하면 다시 되돌리지 못해요."
        cancelLabel="취소"
        confirmLabel="확정"
        onConfirm={handleConfirmTeamBuilding}
        isPrimary={true}
        confirmButtonColor="primary"
      />
    </div>
  );
}
