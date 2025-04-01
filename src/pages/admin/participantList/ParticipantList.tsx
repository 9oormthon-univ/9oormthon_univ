import styles from './participantList.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import { UnivListSidebar } from '../../../components/admin/participantList/univListSideBar/UnivListSidebar';

export default function ParticipantList() {
  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <div className={styles.listTitle}>
          <Text typography="heading4" as="h4">
            미르미 리스트
          </Text>
          <Text typography="heading5" as="h5" color="text-primary">
            9,999
          </Text>
        </div>
        <div className={styles.listContent}>
          <UnivListSidebar />
        </div>
      </div>
    </div>
  );
}
