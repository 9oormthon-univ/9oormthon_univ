import { Skeleton } from '@goorm-dev/vapor-components';
import styles from './ideaApplyListSkeleton.module.scss';
import useBreakpoint from '../../../../hooks/useBreakPoint';

export default function IdeaApplyListSkeleton() {
  const breakpoint = useBreakpoint();
  return (
    <>
      {[...Array(3)].map((_, idx) => (
        <div className={styles.container} key={idx}>
          <div className={styles.skeletonContainer}>
            <div className={styles.skeletonLeftContainer}>
              {breakpoint === 'xs' ? (
                <>
                  <Skeleton width="3.5rem" height="1.25rem" />
                  <Skeleton width="15.5rem" height="1.25rem" />
                  <Skeleton width="100%" height="1.25rem" />
                  <Skeleton width="80%" height="1.25rem" />
                </>
              ) : breakpoint === 'sm' ? (
                <>
                  <Skeleton width="3.5rem" height="1.25rem" />
                  <Skeleton width="15.5rem" height="1.25rem" />
                  <Skeleton width="100%" height="1.25rem" />
                  <Skeleton width="80%" height="1.25rem" />
                </>
              ) : breakpoint === 'md' ? (
                <>
                  <Skeleton width="3.5rem" height="1.25rem" />
                  <Skeleton width="15.5rem" height="1.25rem" />
                  <Skeleton width="100%" height="1.25rem" />
                  <Skeleton width="80%" height="1.25rem" />
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
