import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import styles from './styles.module.scss';
import { Text, Button, toast, Badge } from '@goorm-dev/vapor-components';
import useAuthStore from '../../../../store/useAuthStore';
import { UserStatus } from '../../../../constants/role';
import InformationModal from '../../../../components/common/modal/InformationModal';
import { useEffect, useState, useCallback } from 'react';
import { confirmTeamBuilding, getTeamInfo } from '../../../../api/teams';
import { GENERATION } from '../../../../constants/common';
import TeamInformationSkeleton from '../../../../components/hackathon/teamBuilding/skeletonLoading/TeamInformationSkeleton';
import { TeamInfo } from '../../../../types/user/team';

export default function ApplicantTeamPage() {
  const { status } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTeamInfo = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchTeamInfo();
  }, [fetchTeamInfo]);

  let viewer = true;

  if (status === UserStatus.PROVIDER) {
    viewer = false;
  }

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
      toast('팀 빌딩 확정에 실패했습니다. 팀 빌딩 조건을 다시 확인해주세요.', {
        type: 'danger',
      });
    }
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
        {isLoading ? <TeamInformationSkeleton /> : <TeamInformation viewer={viewer} teamInfo={teamInfo} />}
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
