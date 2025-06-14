import styles from './ideaListSkeleton.module.scss';
import { Skeleton } from '@goorm-dev/vapor-components';

export default function IdeaListSkeleton() {
  return (
    <div className={styles.container}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div className={styles.skeletonWrapper} key={index}>
          <div className={styles.skeletonLeftContainer}>
            <Skeleton width="3.5rem" height="1.25rem" />
            <Skeleton width="15.5rem" height="1.25rem" />
            <Skeleton width="41.75rem" height="1.25rem" />
            <Skeleton width="32.5rem" height="1.25rem" />
          </div>
          <div className={styles.skeletonRightContainer}>
            <div className={styles.skeletonRightItem}>
              <Skeleton width="3.5rem" height="1.25rem" />
              <Skeleton width="5rem" height="1.25rem" />
            </div>
            <Skeleton width="5rem" height="1.25rem" />
          </div>
        </div>
      ))}
    </div>
  );
}
