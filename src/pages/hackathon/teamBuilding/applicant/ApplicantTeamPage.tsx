import { getTeamInfo } from '../../../../api/teams';
import { useEffect } from 'react';
import { useState } from 'react';
import BackLinkNavigation from '../../../../components/hackathon/common/BackLinkNavigation';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';

interface TeamMember {
  id: number;
  name: string;
  img_url: string;
}

interface RoleInfo {
  max_count: number;
  current_count: number;
  members: TeamMember[];
}

interface TeamInfo {
  number?: number;
  name?: string;
  role: {
    pm?: RoleInfo;
    pd?: RoleInfo;
    fe?: RoleInfo;
    be?: RoleInfo;
  };
}

export default function ApplicantTeamPage() {
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await getTeamInfo(4);
        setTeamInfo(response.data);
      } catch (error) {
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
