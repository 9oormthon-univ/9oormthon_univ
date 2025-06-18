import styles from './ideaManagement.module.scss';
import { Button, Input, Text } from '@goorm-dev/vapor-components';
import IdeaManageTable from '../../../components/admin/ideaManagement/ideaManageTable/IdeaManageTable';
import { TopicModal } from '../../../components/admin/ideaManagement/topicModal/TopicModal';
import { useState } from 'react';

export default function IdeaManagement() {
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const toggleTopicModal = () => {
    setIsTopicModalOpen(!isTopicModalOpen);
  };

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
        <Button type="button" size="md" color="primary" onClick={() => setIsTopicModalOpen(true)}>
          주제 관리
        </Button>
      </div>
      <IdeaManageTable />
      <TopicModal isOpen={isTopicModalOpen} toggle={toggleTopicModal} />
    </div>
  );
}
