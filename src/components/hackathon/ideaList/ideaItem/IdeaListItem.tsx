import { Button } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import { BookmarkIcon } from '@goorm-dev/vapor-icons';

interface IdeaListItemProps {
  topic: string; // 해커톤 주제
  title: string; // 아이디어 제목
  description: string; // 아이디어 소개
  status: string; // 모집 상태
}

export default function IdeaListItem({ topic, title, description, status }: IdeaListItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.titleWrap}>
          <Text typography="body3" color="text-hint" fontWeight="medium">
            {topic}
          </Text>
          <Text typography="heading4" color="text-normal" fontWeight="bold">
            {title}
          </Text>
        </div>
        <Text as="p" typography="body2" color="text-alternative" fontWeight="medium" className={styles.ideaIntro}>
          {description}
        </Text>
      </div>
      <div className={styles.rightContainer}>
        <Text
          typography="heading4"
          color={status === '모집 완료' ? 'text-hint' : 'text-primary'}
          fontWeight="bold"
          className={styles.fixedText}>
          {status}
        </Text>
        <Button color="secondary" size="md" icon={BookmarkIcon} />
      </div>
    </div>
  );
}
