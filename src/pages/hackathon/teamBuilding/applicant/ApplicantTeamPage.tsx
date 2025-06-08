import { getTeamInfo } from '../../../../api/teams';
import { useEffect } from 'react';
import { useState } from 'react';
import BackLinkNavigation from '../../../../components/hackathon/common/BackLinkNavigation';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import styles from './styles.module.scss';
import { Text, toast } from '@goorm-dev/vapor-components';
import { GENERATION } from '../../../../constants/common';
import { TeamInfo } from '../../../../types/user/team';

export default function ApplicantTeamPage() {
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await getTeamInfo(GENERATION);
        setTeamInfo(response.data);
      } catch (error) {
        toast('팀 정보 불러오기 실패', {
          type: 'danger',
        });
        console.error('팀 정보 불러오기 실패:', error);
        setTeamInfo(null);
      }
    };
    fetchTeamInfo();
  }, []);

  return (
    <div className={styles.teamPageContainer}>
      <BackLinkNavigation backLink="/team/applicant" />
      <div className={styles.teamPageContent}>
        <Text as="h3" typography="heading3" color="text-normal">
          팀 정보
        </Text>
        {teamInfo && <TeamInformation viewer role={teamInfo.role} />}
      </div>
    </div>
  );
}
