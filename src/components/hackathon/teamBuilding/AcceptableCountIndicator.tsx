import { Applies, ApplyStatus, TeamInfo } from '../../../types/user/team';
import { Text } from '@goorm-dev/vapor-components';
import { getPositionName, PositionKey, POSITIONS } from '../../../constants/position';
import styles from './styles.module.scss';
import useBreakpoint from '../../../hooks/useBreakPoint';

interface AcceptableCountIndicatorProps {
  teamInfo: TeamInfo;
  applies?: Applies[];
}
const getRemaining = (role: PositionKey, teamInfo: TeamInfo, applies?: Applies[]) => {
  const roleKey = role.toLowerCase() as keyof typeof teamInfo.role;
  const max = teamInfo.role[roleKey]?.max_count || 0;
  const current = teamInfo.role[roleKey]?.current_count || 0;
  if (!applies) return max - current;
  else {
    const confirmedCount = applies?.filter((a) => a.role === role && a.status === ApplyStatus.ACCEPTED).length || 0;

    return Math.max(0, max - current - confirmedCount);
  }
};

export default function AcceptableCountIndicator({ teamInfo, applies }: AcceptableCountIndicatorProps) {
  const breakpoint = useBreakpoint();
  if (!teamInfo) return null;

  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';

  if (isMobile) {
    // 모바일에서는 2x2 격자로 표시
    return (
      <div className={`${styles.acceptableWrap} ${styles.acceptableWrapMobile}`}>
        <div className={styles.acceptableRow}>
          <div className={styles.acceptableItem}>
            <Text as="span" typography="subtitle1" color="text-normal">
              {getPositionName('PM')}
            </Text>
            <Text
              as="span"
              typography="body2"
              color={getRemaining('PM', teamInfo, applies) > 0 ? 'text-primary' : 'text-hint'}>
              {getRemaining('PM', teamInfo, applies)}명 수락 가능
            </Text>
          </div>
          <div className={styles.line} />
          <div className={styles.acceptableItem}>
            <Text as="span" typography="subtitle1" color="text-normal">
              {getPositionName('PD')}
            </Text>
            <Text
              as="span"
              typography="body2"
              color={getRemaining('PD', teamInfo, applies) > 0 ? 'text-primary' : 'text-hint'}>
              {getRemaining('PD', teamInfo, applies)}명 수락 가능
            </Text>
          </div>
        </div>
        <div className={styles.acceptableRow}>
          <div className={styles.acceptableItem}>
            <Text as="span" typography="subtitle1" color="text-normal">
              {getPositionName('FE')}
            </Text>
            <Text
              as="span"
              typography="body2"
              color={getRemaining('FE', teamInfo, applies) > 0 ? 'text-primary' : 'text-hint'}>
              {getRemaining('FE', teamInfo, applies)}명 수락 가능
            </Text>
          </div>
          <div className={styles.line} />
          <div className={styles.acceptableItem}>
            <Text as="span" typography="subtitle1" color="text-normal">
              {getPositionName('BE')}
            </Text>
            <Text
              as="span"
              typography="body2"
              color={getRemaining('BE', teamInfo, applies) > 0 ? 'text-primary' : 'text-hint'}>
              {getRemaining('BE', teamInfo, applies)}명 수락 가능
            </Text>
          </div>
        </div>
      </div>
    );
  }

  // 데스크탑에서는 기존 레이아웃 유지
  return (
    <div className={styles.acceptableWrap}>
      {Object.values(POSITIONS).map((role, index) => (
        <>
          <div className={styles.acceptableItem} key={role.key}>
            <Text key={role.key} as="span" typography="subtitle1" color="text-normal">
              {getPositionName(role.key)}
            </Text>
            <Text
              key={role.key}
              as="span"
              typography="body2"
              color={getRemaining(role.key, teamInfo, applies) > 0 ? 'text-primary' : 'text-hint'}>
              {getRemaining(role.key, teamInfo, applies)}명 수락 가능
            </Text>
          </div>
          {index !== Object.values(POSITIONS).length - 1 && <div className={styles.line} />}
        </>
      ))}
    </div>
  );
}
