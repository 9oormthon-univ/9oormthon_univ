import styles from './ideaListSkeleton.module.scss';
import { Skeleton } from '@goorm-dev/vapor-components';
import useBreakpoint from '../../../../hooks/useBreakPoint';

export default function IdeaListSkeleton() {
  const breakpoint = useBreakpoint();

  return (
    <div className={styles.container}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div className={styles.skeletonWrapper} key={index}>
          <div className={styles.skeletonLeftContainer}>
            {breakpoint === 'xs' ? (
              <>
                <Skeleton width="3.5rem" height="1.25rem" />
                <Skeleton width="7.5rem" height="1.25rem" />
                <Skeleton width="11.25rem" height="1.25rem" />
                <Skeleton width="4.5rem" height="1.25rem" />
              </>
            ) : breakpoint === 'sm' ? (
              <>
                <Skeleton width="3.5rem" height="1.25rem" />
                <Skeleton width="15.5rem" height="1.25rem" />
                <Skeleton width="21.75rem" height="1.25rem" />
                <Skeleton width="17.5rem" height="1.25rem" />
              </>
            ) : breakpoint === 'md' ? (
              <>
                <Skeleton width="3.5rem" height="1.25rem" />
                <Skeleton width="15.5rem" height="1.25rem" />
                <Skeleton width="32rem" height="1.25rem" />
                <Skeleton width="27.5rem" height="1.25rem" />
              </>
            ) : (
              <>
                <Skeleton width="3.5rem" height="1.25rem" />
                <Skeleton width="15.5rem" height="1.25rem" />
                <Skeleton width="41.75rem" height="1.25rem" />
                <Skeleton width="32.5rem" height="1.25rem" />
              </>
            )}
          </div>
          <div className={styles.skeletonRightContainer}>
            <div className={styles.skeletonRightItem}>
              {breakpoint === 'xs' ? (
                <>
                  <Skeleton width="2.5rem" height="1.25rem" />
                  <Skeleton width="4.5rem" height="1.25rem" />
                </>
              ) : breakpoint === 'sm' ? (
                <>
                  <Skeleton width="3.5rem" height="1.25rem" />
                  <Skeleton width="5rem" height="1.25rem" />
                </>
              ) : (
                <>
                  <Skeleton width="3.5rem" height="1.25rem" />
                  <Skeleton width="5rem" height="1.25rem" />
                </>
              )}
            </div>
            {breakpoint === 'xs' ? (
              <Skeleton width="2.5rem" height="1.25rem" />
            ) : breakpoint === 'sm' ? (
              <Skeleton width="3.5rem" height="1.25rem" />
            ) : (
              <Skeleton width="5rem" height="1.25rem" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
