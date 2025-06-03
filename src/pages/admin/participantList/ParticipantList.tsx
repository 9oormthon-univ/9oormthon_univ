import styles from './participantList.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import { UnivListSidebar } from '../../../components/admin/participantList/univListSideBar/UnivListSidebar';
import { MemberTable } from '../../../components/admin/participantList/memberTable/MemberTable';

const mockMembers = [
  {
    id: 1,
    name: '김구름',
    email: 'goorm1@example.com',
    teamBuilding: true,
  },
  {
    id: 2,
    name: '이햇살',
    email: 'sunny2@example.com',
    teamBuilding: true,
  },
  {
    id: 3,
    name: '박별빛',
    email: 'moonlight3@example.com',
    teamBuilding: false,
  },
];

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
          <MemberTable members={mockMembers} />
        </div>
      </div>
    </div>
  );
}
