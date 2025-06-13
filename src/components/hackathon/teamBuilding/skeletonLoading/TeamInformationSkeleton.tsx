import { Skeleton } from '@goorm-dev/vapor-components';
import styles from './teamInformationSkeleton.module.scss';

export default function TeamInformationSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Skeleton width="2rem" height="1.25rem" />
        <Skeleton width="10rem" height="1.25rem" />
      </div>
      {Array.from({ length: 2 }).map((_, index) => (
        <div className={styles.content} key={index}>
          <Skeleton width="2rem" height="1.25rem" />
          <Skeleton width="5.625rem" height="2.5rem" />
        </div>
      ))}
      {Array.from({ length: 2 }).map((_, index) => (
        <div className={styles.content} key={index}>
          <Skeleton width="2rem" height="1.25rem" />
          <div className={styles.secondContent}>
            <Skeleton width="5.625rem" height="2.5rem" />
            <Skeleton width="5.625rem" height="2.5rem" />
          </div>
        </div>
      ))}
    </div>
  );
}
