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
import { Sorting, SortType } from '../../../../types/user/idea';
import { TEAM_BUILDING_CONFIRM_ERROR_MESSAGES } from '../../../../constants/errorMessage';
import {
  getMockTeamInfo,
  getMockIdeaApplyStatus,
  confirmMockTeamBuilding,
  getMockPeriod,
} from '../../../../utilities/mockUtils';

export default function ProviderPage() {
  // 현재 팀빌딩 기간 조회
  const { current_phase, isLoading, isFetched, fetchPeriodData } = usePeriodStore();
  const [buttonIndex, setButtonIndex] = useState<number>(0);
  const [applyStatus, setApplyStatus] = useState<{ counts: number; applies: Applies[] }>({ counts: 0, applies: [] });
  const [currentPhaseApplyStatus, setCurrentPhaseApplyStatus] = useState<{ counts: number; applies: Applies[] }>({
    counts: 0,
    applies: [],
  });
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const [sorting, setSorting] = useState<Sorting | undefined>(undefined);
  const [sortType, setSortType] = useState<SortType | undefined>(undefined);

  // 팀 빌딩 확정 모달
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // 로딩 상태
  const [isTeamInfoLoading, setIsTeamInfoLoading] = useState(false);
  const [isApplyStatusLoading, setIsApplyStatusLoading] = useState(false);

  // fetchApplyStatus를 컴포넌트 레벨로 올리고 재사용 가능하게 만듦
  const fetchApplyStatus = async (sorting?: Sorting, sortType?: SortType) => {
    try {
      setIsApplyStatusLoading(true);
      if (import.meta.env.DEV) {
        const response = await getMockIdeaApplyStatus(buttonIndex + 1, sorting, sortType);
        setApplyStatus(response.data);
      } else {
        const response = await getIdeaApplyStatus(GENERATION, buttonIndex + 1, sorting, sortType);
        setApplyStatus(response.data);
      }
    } catch (error) {
      console.error('지원 현황 불러오기 실패:', error);
      setApplyStatus({ counts: 0, applies: [] });
    } finally {
      setIsApplyStatusLoading(false);
    }
  };

  // 현재 차시 지원 현황 불러오기
  const fetchCurrentPhaseApplyStatus = async () => {
    try {
      setIsApplyStatusLoading(true);
      if (import.meta.env.DEV) {
        const response = await getMockIdeaApplyStatus(current_phase, undefined, undefined);
        setCurrentPhaseApplyStatus(response.data);
      } else {
        const response = await getIdeaApplyStatus(GENERATION, current_phase, undefined, undefined);
        setCurrentPhaseApplyStatus(response.data);
      }
    } catch (error) {
      console.error('지원 현황 불러오기 실패:', error);
      setCurrentPhaseApplyStatus({ counts: 0, applies: [] });
    } finally {
      setIsApplyStatusLoading(false);
    }
  };

  // 팀 빌딩 확정
  const handleConfirmTeamBuilding = async () => {
    try {
      if (import.meta.env.DEV) {
        await confirmMockTeamBuilding();
      } else {
        await confirmTeamBuilding(GENERATION);
      }
      toast('팀 빌딩이 확정되었습니다.', {
        type: 'primary',
      });
      toggle();
      fetchTeamInfo();
    } catch (error: any) {
      const errorCode = error.response?.data?.error?.code;
      if (errorCode) {
        toast(TEAM_BUILDING_CONFIRM_ERROR_MESSAGES[errorCode] || '팀 빌딩 확정에 실패했습니다.', {
          type: 'danger',
        });
      }
    }
  };

  // 팀 정보 불러오기
  const fetchTeamInfo = async () => {
    try {
      setIsTeamInfoLoading(true);
      if (import.meta.env.DEV) {
        const res = await getMockTeamInfo();
        setTeamInfo(res.data);
      } else {
        const res = await getTeamInfo(GENERATION);
        setTeamInfo(res.data);
      }
    } catch (error: any) {
      console.error('팀 정보 불러오기 실패:', error);
      toast('팀 정보 불러오기 실패', { type: 'danger' });
    } finally {
      setIsTeamInfoLoading(false);
    }
  };

  // 개발 환경에서 Period Store 초기화
  useEffect(() => {
    if (import.meta.env.DEV) {
      // 개발 환경에서는 목업 데이터로 Period Store 초기화
      getMockPeriod().then(() => {
        // Period Store를 직접 업데이트하는 대신 fetchPeriodData를 호출
        fetchPeriodData();
      });
    } else {
      fetchPeriodData();
    }
  }, []);

  // 팀 정보 불러오기
  useEffect(() => {
    fetchTeamInfo();
    fetchCurrentPhaseApplyStatus();
  }, []);

  // current_phase 변경 시 buttonIndex 업데이트
  useEffect(() => {
    if (isFetched && typeof current_phase === 'number') {
      setButtonIndex(current_phase ? current_phase - 1 : 0);
    }
  }, [current_phase, isFetched]);

  // 지원 현황 불러오기
  useEffect(() => {
    if (isFetched) {
      fetchApplyStatus(sorting, sortType);
    }
  }, [buttonIndex, isFetched, sorting, sortType]);

  const handleSortChange = (newSorting: Sorting) => {
    if (sorting !== newSorting) {
      setSorting(newSorting);
      setSortType('ASC');
    } else {
      setSortType(sortType === 'ASC' ? 'DESC' : 'ASC');
    }
  };

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

        {isTeamInfoLoading ? <TeamInformationSkeleton /> : <TeamInformation viewer={false} teamInfo={teamInfo} />}
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
          isFetched &&
          typeof current_phase === 'number' && (
            <TeamBuildingPhaseSelector onPhaseChange={setButtonIndex} activeIndex={buttonIndex} />
          )
        )}

        {isApplyStatusLoading ? (
          <TeamBuildingTableSkeleton />
        ) : applyStatus?.applies?.length > 0 ? (
          <ApplyStatusTable
            applicants={applyStatus.applies}
            refetchApplyStatus={fetchApplyStatus}
            refetchCurrentPhaseApplyStatus={fetchCurrentPhaseApplyStatus}
            onSortChange={handleSortChange}
          />
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
