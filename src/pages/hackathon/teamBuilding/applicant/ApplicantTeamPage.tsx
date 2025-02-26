import BackLinkNavigation from '../../../../components/hackathon/common/BackLinkNavigation';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';

export default function ApplicantTeamPage() {
  return (
    <div className={styles.teamPageContainer}>
      <BackLinkNavigation backLink="/team/applicant" />
      <div className={styles.teamPageContent}>
        <Text as="h3" typography="heading3" color="text-normal">
          팀 정보
        </Text>
        <TeamInformation viewer />
      </div>
    </div>
  );
}
