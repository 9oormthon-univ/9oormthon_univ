import { Skeleton, Text } from '@goorm-dev/vapor-components';
import styles from './ideaTeamContentSkeleton.module.scss';
import useBreakpoint from '../../../../hooks/useBreakPoint';

export default function IdeaTeamContentSkeleton() {
  const breakpoint = useBreakpoint();

  return (
    <div className={styles.container}>
      <Text typography="heading5" color="text-normal">
        원하는 팀원상
      </Text>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <Skeleton width="5rem" height="1.25rem" />
          <div className={styles.info}>
            {breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' ? (
              <>
                <Skeleton width="100%" height="1.25rem" />
                <Skeleton width="80%" height="1.25rem" />
              </>
            ) : (
              <>
                <Skeleton width="46.875rem" height="1.25rem" />
                <Skeleton width="34.5625rem" height="1.25rem" />
              </>
            )}
          </div>
          <Skeleton width="5.625rem" height="2.5rem" />
        </div>
      </div>
    </div>
  );
}
