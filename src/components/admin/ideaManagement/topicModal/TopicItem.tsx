import { Button, Input, Text } from '@goorm-dev/vapor-components';
import styles from './topicItem.module.scss';
import { EditIcon, TrashIcon } from '@goorm-dev/vapor-icons';
import { useRef, useState } from 'react';
import { createIdeaSubject, updateIdeaSubject } from '../../../../api/admin/idea';
import { GENERATION } from '../../../../constants/common';

interface Topic {
  id?: number;
  value: string;
  isEditing: boolean;
  isNew?: boolean;
}

export const TopicItem = ({
  topic,
  index,
  onUpdate,
  onRemove,
}: {
  topic: Topic;
  index: number;
  onUpdate: (newTopic: Topic) => void;
  onRemove: (id: number) => void;
}) => {
  const [isEditing, setIsEditing] = useState(topic.isEditing);
  const [value, setValue] = useState(topic.value);
  const isLoadingRef = useRef(false);

  const handleComplete = async () => {
    if (!value.trim() || isLoadingRef.current) return;

    isLoadingRef.current = true;

    try {
      let updatedTopic: Topic = { ...topic, value, isEditing: false };

      if (topic.isNew) {
        const res = await createIdeaSubject(GENERATION, value);
        updatedTopic = { ...updatedTopic, id: res.id, isNew: false };
      } else if (topic.id) {
        await updateIdeaSubject(topic.id, value);
      }

      onUpdate(updatedTopic);
      setIsEditing(false);
    } catch (error) {
      console.error('주제 저장 실패:', error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  return (
    <div className={styles.container}>
      <Text typography="body2" color="text-hint" className={styles.number}>
        {index + 1}
      </Text>
      {isEditing ? (
        <Input
          size="lg"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              handleComplete();
            }
          }}
          placeholder="해커톤 주제를 입력해주세요"
          className={styles.input}
        />
      ) : (
        <Text typography="subtitle1" color="text-normal" className={styles.title}>
          {value}
        </Text>
      )}
      {isEditing ? (
        <Button size="lg" color="primary" onClick={handleComplete} className={styles.editButton}>
          완료
        </Button>
      ) : (
        <>
          <Button size="sm" color="secondary" icon={EditIcon} onClick={() => setIsEditing(!isEditing)} />
          <Button size="sm" color="secondary" icon={TrashIcon} onClick={() => onRemove(topic.id!)} />
        </>
      )}
    </div>
  );
};
