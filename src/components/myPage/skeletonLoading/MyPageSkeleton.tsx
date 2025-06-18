import { AvatarSkeleton, Skeleton } from '@goorm-dev/vapor-components';
import styles from './myPageSkeleton.module.scss';

export default function MyPageSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHeader}>
        <AvatarSkeleton size="lg" className={styles.skeletonAvatar} />
        <div className={styles.skeletonHeaderRight}>
          <div className={styles.skeletonHeaderRightTop}>
            <Skeleton width="3rem" height="1.25rem" />
            <div className={styles.skeletonHeaderRightTopBottom}>
              <Skeleton width="15rem" height="1.25rem" />
              <Skeleton width="6rem" height="1.25rem" />
            </div>
          </div>
          <div className={styles.skeletonHeaderRightBottom}>
            <Skeleton width="2rem" height="2rem" />
            <Skeleton width="2rem" height="2rem" />
          </div>
        </div>
      </div>

      <div className={styles.skeletonContent}>
        <div className={styles.skeletonContentItem}>
          <Skeleton width="29.375rem" height="1.25rem" />
          <Skeleton width="100%" height="1.25rem" />
          <Skeleton width="16.625rem" height="1.25rem" />
        </div>
        <div className={styles.skeletonContentItem}>
          <Skeleton width="4rem" height="1.25rem" />
          <div className={styles.skeletonContentItemBottom}>
            <Skeleton width="1.5rem" height="1.5rem" />
            <Skeleton width="1.5rem" height="1.5rem" />
            <Skeleton width="1.5rem" height="1.5rem" />
            <Skeleton width="1.5rem" height="1.5rem" />
            <Skeleton width="1.5rem" height="1.5rem" />
          </div>
        </div>
      </div>

      <div className={styles.skeletonContent}>
        <Skeleton width="5rem" height="1.25rem" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div className={styles.skeletonProjectItem} key={index}>
            <Skeleton width="11.25rem" height="6.25rem" />
            <div className={styles.skeletonProjectItemRight}>
              <div className={styles.skeletonProjectItemRightTop}>
                <Skeleton width="4rem" height="1.25rem" />
                <Skeleton width="10rem" height="1.25rem" />
              </div>
              <Skeleton width="2.5rem" height="1.25rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
