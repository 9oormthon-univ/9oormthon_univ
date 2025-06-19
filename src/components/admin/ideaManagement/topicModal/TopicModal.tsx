import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Text } from '@goorm-dev/vapor-components';
import { TopicItem } from './TopicItem';
import styles from './topicModal.module.scss';
import { PlusOutlineIcon } from '@goorm-dev/vapor-icons';
import { useEffect, useState } from 'react';
import { deleteIdeaSubject, fetchIdeaSubjects } from '../../../../api/admin/idea';
import { GENERATION } from '../../../../constants/common';

interface Topic {
  id?: number;
  value: string;
  isEditing: boolean;
  isNew?: boolean;
}

export const TopicModal = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchTopics = async () => {
      try {
        const res = await fetchIdeaSubjects(GENERATION);
        if (res.data.idea_subjects.length === 0) {
          setTopics([{ value: '', isEditing: true, isNew: true }]);
        } else {
          setTopics(res.data.idea_subjects.map((t: any) => ({ id: t.id, value: t.name, isEditing: false })));
        }
      } catch (err) {
        console.error('조회 실패', err);
      }
    };

    fetchTopics();
  }, [isOpen]);

  const handleAdd = () => {
    setTopics((prev) => [...prev, { value: '', isEditing: true, isNew: true }]);
  };

  const handleUpdate = (newTopic: Topic) => {
    setTopics((prev) => prev.map((topic) => (topic.id === newTopic.id ? newTopic : topic)));
  };

  const handleRemove = async (id: number) => {
    setTopics((prev) => prev.filter((topic) => topic.id !== id));
    await deleteIdeaSubject(id);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading5" color="text-normal">
          해커톤 주제 관리
        </Text>
      </ModalHeader>
      <ModalBody className={styles.body}>
        {topics.map((topic, index) => (
          <TopicItem key={topic.id} topic={topic} index={index} onUpdate={handleUpdate} onRemove={handleRemove} />
        ))}
        <Button size="lg" color="secondary" icon={PlusOutlineIcon} outline onClick={handleAdd}>
          주제 생성
        </Button>
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" onClick={toggle}>
          완료
        </Button>
      </ModalFooter>
    </Modal>
  );
};
