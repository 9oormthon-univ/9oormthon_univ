import { Skeleton } from '@goorm-dev/vapor-components';
import styles from './ideaApplyListSkeleton.module.scss';

export default function IdeaApplyListSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, idx) => (
        <div className={styles.container} key={idx}>
          <div className={styles.skeletonContainer}>
            <div className={styles.skeletonLeftContainer}>
              <Skeleton width="3.5rem" height="1.25rem" />
              <Skeleton width="15.5rem" height="1.25rem" />
              <Skeleton width="41.75rem" height="1.25rem" />
              <Skeleton width="32.5rem" height="1.25rem" />
            </div>
            <div className={styles.skeletonRightContainer}>
              <div className={styles.skeletonRightTopContainer}>
                <Skeleton width="3.5rem" height="1.25rem" />
                <Skeleton width="5rem" height="1.25rem" />
              </div>
              <Skeleton width="5rem" height="1.25rem" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
