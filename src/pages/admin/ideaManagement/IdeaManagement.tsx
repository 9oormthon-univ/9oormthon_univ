import styles from './ideaManagement.module.scss';
import { Button, Input, Text } from '@goorm-dev/vapor-components';
import IdeaManageTable from '../../../components/admin/ideaManagement/ideaManageTable/IdeaManageTable';

export default function IdeaManagement() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text typography="heading4" as="h4" color="text-normal">
          아이디어 관리
        </Text>
        <Text typography="heading5" as="h5" color="text-primary">
          999
        </Text>
      </div>
      <div className={styles.searchBox}>
        <Input placeholder="아이디어 명으로 검색" className={styles.searchInput} />
        <Button type="button" size="md" color="primary">
          주제 관리
        </Button>
      </div>
      <IdeaManageTable />
    </div>
  );
}
