import { useState } from 'react';
import styles from './teamList.module.scss';
import { Button, Input, Text } from '@goorm-dev/vapor-components';
import { TeamTable } from '../../../components/admin/teamList/teamTable/TeamTable';
import TeamCreateModal from '../../../components/admin/teamList/modal/TeamCreateModal';

export default function TeamList() {
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  const toggleCreateTeam = () => setIsCreateTeamOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Text typography="heading4" as="h4" color="text-normal">
          팀 리스트
        </Text>
        <Text typography="heading5" as="h5" color="text-primary">
          999
        </Text>
      </div>
      <div className={styles.filterContainer}>
        <Input bgSize="md" placeholder="팀 번호, 팀 명, 서비스 명으로 검색" className={styles.searchInput} />
        <Button size="md" color="primary" onClick={toggleCreateTeam}>
          팀 추가하기
        </Button>
      </div>
      <TeamTable />
      <TeamCreateModal isOpen={isCreateTeamOpen} toggle={toggleCreateTeam} />
    </div>
  );
}
