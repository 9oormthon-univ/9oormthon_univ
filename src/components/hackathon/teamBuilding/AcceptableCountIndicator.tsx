import { Applies, ApplyStatus, TeamInfo } from '../../../types/user/team';
import { Text } from '@goorm-dev/vapor-components';
import { getPositionName, PositionKey, POSITIONS } from '../../../constants/position';
import styles from './styles.module.scss';

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
  if (!teamInfo) return null;

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
