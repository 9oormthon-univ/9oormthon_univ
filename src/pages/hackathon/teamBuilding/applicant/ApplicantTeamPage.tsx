import { getTeamInfo } from '../../../../api/teams';
import { useEffect } from 'react';
import { useState } from 'react';
import BackLinkNavigation from '../../../../components/hackathon/common/BackLinkNavigation';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';

export default function ApplicantTeamPage() {
  const [teamInfo, setTeamInfo] = useState<any>(null);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      const response = await getTeamInfo(4);
      setTeamInfo(response.data);
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
        <TeamInformation viewer role={teamInfo?.role} />
      </div>
    </div>
  );
}
