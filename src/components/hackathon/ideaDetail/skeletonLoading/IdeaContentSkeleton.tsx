import { Skeleton } from '@goorm-dev/vapor-components';
import styles from './ideaContentSkeleton.module.scss';

export default function IdeaContentSkeleton() {
  return (
    <div className={styles.container}>
      {Array.from({ length: 2 }).map((_, index) => (
        <div className={styles.item} key={index}>
          <Skeleton width="43.125rem" height="1.25rem" />
          <Skeleton width="100%" height="1.25rem" />
          <Skeleton width="29.375rem" height="1.25rem" />
        </div>
      ))}
    </div>
  );
}
