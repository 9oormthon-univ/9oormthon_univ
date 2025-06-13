import BackLinkNavigation from '../../../../components/hackathon/common/BackLinkNavigation';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import styles from './styles.module.scss';
import { Text, toast } from '@goorm-dev/vapor-components';
import { TeamInfo } from '../../../../types/user/team';
import { useEffect, useState } from 'react';
import { getTeamInfo } from '../../../../api/teams';
import { GENERATION } from '../../../../constants/common';
import TeamInformationSkeleton from '../../../../components/hackathon/teamBuilding/skeletonLoading/TeamInformationSkeleton';

export default function ApplicantTeamPage() {
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
    fetchTeamInfo();
  }, []);

  return (
    <div className={styles.teamPageContainer}>
      <BackLinkNavigation />
      <div className={styles.teamPageContent}>
        <Text as="h3" typography="heading3" color="text-normal">
          팀 정보
        </Text>
        {isLoading ? <TeamInformationSkeleton /> : <TeamInformation viewer={true} teamInfo={teamInfo} />}
      </div>
    </div>
  );
}
