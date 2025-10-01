import TeamInformation from '@/components/hackathon/teamBuilding/TeamInformation';
import styles from './styles.module.scss';
import { Text, Button, toast, Badge } from '@goorm-dev/vapor-components';
import { useUser } from '@/hooks/queries/useUser';
import { UserStatus } from '@/constants/role';
import InformationModal from '@/components/common/modal/InformationModal';
import { useState } from 'react';
import TeamInformationSkeleton from '@/components/hackathon/teamBuilding/skeletonLoading/TeamInformationSkeleton';
import { TEAM_BUILDING_CONFIRM_ERROR_MESSAGES } from '@/constants/errorMessage';
import { useTeamInfo } from '@/hooks/queries/useTeamInfo';
import { useConfirmTeamMutation } from '@/hooks/mutations/useConfirmTeamMutation';

export default function ApplicantTeamPage() {
  const { data: user } = useUser();
  const status = user?.status ?? UserStatus.NONE;

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { data: teamInfo, isLoading } = useTeamInfo();
  let viewer = true;

  if (status === UserStatus.PROVIDER) {
    viewer = false;
  }

  const { mutate: confirmTeamBuildingMutation } = useConfirmTeamMutation();

  const handleConfirmTeamBuilding = () => {
    confirmTeamBuildingMutation({
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

  return (
    <div className={styles.teamPageContainer}>
      <div className={styles.teamPageContent}>
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

          {!viewer && (
            <Button size="md" color="primary" onClick={toggle} disabled={teamInfo?.team_building === 'END'}>
              팀 빌딩 확정
            </Button>
          )}
        </div>
        {isLoading ? (
          <TeamInformationSkeleton />
        ) : (
          <TeamInformation viewer={viewer} teamInfo={teamInfo ?? { team_building: 'RECRUITING', role: {} }} />
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
