import BackLinkNavigation from '../../../../components/hackathon/common/BackLinkNavigation';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import useAuthStore from '../../../../store/useAuthStore';
import { UserStatus } from '../../../../constants/role';

export default function ApplicantTeamPage() {
  const { status } = useAuthStore();

  let viewer = false;

  if (status === UserStatus.PROVIDER) {
    viewer = true;
  }

  return (
    <div className={styles.teamPageContainer}>
      <BackLinkNavigation />
      <div className={styles.teamPageContent}>
        <Text as="h3" typography="heading3" color="text-normal">
          팀 정보
        </Text>
        <TeamInformation viewer={viewer} />
      </div>
    </div>
  );
}
