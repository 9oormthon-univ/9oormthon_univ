import styles from './styles.module.scss';
import { Text, toast, Skeleton, Alert } from '@goorm-dev/vapor-components';
import ApplyStatusTable from '@/components/hackathon/teamBuilding/applyStatusTable/ApplyStatusTable';
import TeamBuildingPhaseSelector from '@/components/hackathon/teamBuilding/TeamBuildingPhaseSelector';
import { useEffect, useState } from 'react';
import InformationModal from '@/components/common/modal/InformationModal';
import TeamBuildingTableSkeleton from '@/components/hackathon/teamBuilding/skeletonLoading/TeamBuildingTableSkeleton';
import AcceptableCountIndicator from '@/components/hackathon/teamBuilding/AcceptableCountIndicator';
import { Sorting, SortType } from '@/types/user/idea';
import { TEAM_BUILDING_CONFIRM_ERROR_MESSAGES } from '@/constants/errorMessage';
import { InfoCircleIcon } from '@goorm-dev/vapor-icons';
import { usePeriod } from '@/hooks/queries/system/usePeriod';
import { useApplyStatus } from '@/hooks/queries/useApplyStatus';
import { useConfirmTeamMutation } from '@/hooks/mutations/useConfirmTeamMutation';
import { useTeamInfo } from '@/hooks/queries/useTeamInfo';

export default function ProviderPage() {
  const { periodData, PHASE_INFO, currentPhase, isLoading: isPeriodLoading } = usePeriod();
  const [buttonIndex, setButtonIndex] = useState<number>(currentPhase ? currentPhase - 1 : 0);
  const [sorting, setSorting] = useState<Sorting | undefined>(undefined);
  const [sortType, setSortType] = useState<SortType | undefined>(undefined);
  const { data: applyStatus, isLoading: isApplyStatusLoading } = useApplyStatus(buttonIndex + 1, sorting, sortType);
  const { data: currentPhaseApplyStatus } = useApplyStatus(currentPhase, sorting, sortType);
  const { mutate: confirmTeamBuilding } = useConfirmTeamMutation();
  const { data: teamInfo, isLoading: isTeamInfoLoading } = useTeamInfo();

  // 팀 빌딩 확정 모달
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // 팀 빌딩 확정
  const handleConfirmTeamBuilding = () => {
    confirmTeamBuilding({
      onSuccess: () => {
        toast('팀 빌딩이 확정되었습니다.', { type: 'primary' });
        toggle();
      },
      onError: (error: any) => {
        const errorCode = error.response?.data?.error?.code;
        if (errorCode) {
          toast(TEAM_BUILDING_CONFIRM_ERROR_MESSAGES[errorCode] || '팀 빌딩 확정에 실패했습니다.', { type: 'danger' });
        }
      },
    });
  };

  // current_phase 변경 시 buttonIndex 업데이트
  useEffect(() => {
    setButtonIndex(currentPhase ? currentPhase - 1 : 0);
  }, [currentPhase]);

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
      {!isPeriodLoading && (
        <Alert leftIcon={InfoCircleIcon} style={{ margin: 0 }}>
          {PHASE_INFO[periodData.current_period as keyof typeof PHASE_INFO]}
        </Alert>
      )}
      <div className={styles.applyStatus}>
        <div className={styles.applyStatusHeader}>
          <Text as="h3" typography="heading3" color="text-normal">
            지원 현황
          </Text>
          <Text as="h4" typography="heading4" color="text-primary">
            {applyStatus?.counts}명
          </Text>
        </div>

        {isTeamInfoLoading ? (
          <Skeleton width="32rem" height="3rem" />
        ) : (
          teamInfo && <AcceptableCountIndicator teamInfo={teamInfo} applies={currentPhaseApplyStatus?.applies || []} />
        )}

        {isApplyStatusLoading ? (
          <Skeleton width="23.4375rem" height="3rem" />
        ) : (
          <TeamBuildingPhaseSelector onPhaseChange={setButtonIndex} activeIndex={buttonIndex} />
        )}

        {isApplyStatusLoading ? (
          <TeamBuildingTableSkeleton />
        ) : applyStatus?.applies?.length > 0 ? (
          <ApplyStatusTable applicants={applyStatus.applies} onSortChange={handleSortChange} />
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
