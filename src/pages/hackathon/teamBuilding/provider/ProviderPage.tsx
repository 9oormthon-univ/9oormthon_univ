import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import TeamInformation from '../../../../components/hackathon/teamBuilding/TeamInformation';
import ApplyStatusTable from '../../../../components/hackathon/teamBuilding/applyStatusTable/ApplyStatusTable';
export default function ProviderPage() {
  return (
    <div className={styles.container}>
      <div className={styles.teamInform}>
        <Text as="h3" typography="heading3" color="text-normal">
          팀 정보
        </Text>
        <TeamInformation viewer={false} />
      </div>
      <div className={styles.applyStatus}>
        <Text as="h3" typography="heading3" color="text-normal">
          지원 현황
        </Text>
        <ApplyStatusTable />
      </div>
    </div>
  );
}
