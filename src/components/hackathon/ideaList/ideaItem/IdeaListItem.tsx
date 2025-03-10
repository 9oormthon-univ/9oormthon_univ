import { Button } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import { BookmarkIcon, BookmarkOutlineIcon } from '@goorm-dev/vapor-icons';

interface IdeaListItemProps {
  topic: string; // 해커톤 주제
  title: string; // 아이디어 제목
  description: string; // 아이디어 소개
  is_active: boolean; // 모집 상태
  is_bookmarked: boolean; // 북마크 상태
  onClick: () => void; // 클릭 이벤트 핸들러
  onBookmarkToggle: () => void; // 북마크 토글 이벤트 핸들러
}

export default function IdeaListItem({
  topic,
  title,
  description,
  is_active,
  is_bookmarked,
  onClick,
  onBookmarkToggle,
}: IdeaListItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.titleWrap}>
          <Text typography="body3" color="text-hint" fontWeight="medium">
            {topic}
          </Text>
          <Text typography="heading4" color="text-normal" fontWeight="bold" onClick={onClick} className={styles.title}>
            {title}
          </Text>
        </div>
        <Text as="p" typography="body2" color="text-alternative" fontWeight="medium" className={styles.ideaIntro}>
          {description}
        </Text>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.statusWrap}>
          <Text
            typography="heading4"
            color={is_active ? 'text-primary' : 'text-hint'}
            fontWeight="bold"
            className={styles.fixedText}>
            {is_active ? '모집 중' : '모집 완료'}
          </Text>
        </div>

        <Button
          color="secondary"
          size="md"
          icon={is_bookmarked ? BookmarkIcon : BookmarkOutlineIcon}
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle();
          }}
        />
      </div>
    </div>
  );
}
