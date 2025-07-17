import { Skeleton } from '@goorm-dev/vapor-components';
import styles from './ideaHeaderSkeleton.module.scss';
import useBreakpoint from '../../../../hooks/useBreakPoint';

export default function IdeaHeaderSkeleton() {
  const breakpoint = useBreakpoint();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {breakpoint === 'xs' ? (
          <>
            <Skeleton width="7rem" height="1.25rem" />
            <Skeleton width="13.5rem" height="1.25rem" />
          </>
        ) : (
          <>
            <Skeleton width="10rem" height="1.25rem" />
            <Skeleton width="17.5625rem" height="1.25rem" />
          </>
        )}
      </div>
      {breakpoint === 'xs' ? (
        <Skeleton width="16.5rem" height="1.25rem" />
      ) : breakpoint === 'sm' ? (
        <Skeleton width="23.5rem" height="1.25rem" />
      ) : (
        <Skeleton width="35rem" height="1.25rem" />
      )}
      <Skeleton width="8.5rem" height="1.25rem" />
    </div>
  );
}
