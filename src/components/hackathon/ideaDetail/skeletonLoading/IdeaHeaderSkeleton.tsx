import { Skeleton } from '@goorm-dev/vapor-components';
import styles from './ideaHeaderSkeleton.module.scss';

export default function IdeaHeaderSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Skeleton width="10rem" height="1.25rem" />
        <Skeleton width="17.5625rem" height="1.25rem" />
      </div>
      <Skeleton width="35rem" height="1.25rem" />
      <Skeleton width="8.5rem" height="1.25rem" />
    </div>
  );
}
