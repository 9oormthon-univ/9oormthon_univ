import { Applies, ApplyStatus, TeamInfo } from '../../../types/user/team';
import { Text } from '@goorm-dev/vapor-components';
import { POSITION_NAME, PositionList, Position } from '../../../constants/position';
import styles from './styles.module.scss';

interface AcceptableCountIndicatorProps {
  teamInfo: TeamInfo;
  applies?: Applies[];
}
const getRemaining = (role: string, teamInfo: TeamInfo, applies?: Applies[]) => {
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
      {PositionList.filter((role) => role !== Position.NULL).map((role, index) => (
        <>
          <div className={styles.acceptableItem} key={role}>
            <Text key={role} as="span" typography="subtitle1" color="text-normal">
              {POSITION_NAME[role]}
            </Text>
            <Text
              key={role}
              as="span"
              typography="body2"
              color={getRemaining(role, teamInfo, applies) > 0 ? 'text-primary' : 'text-hint'}>
              {getRemaining(role, teamInfo, applies)}명 수락 가능
            </Text>
          </div>
          {index !== PositionList.filter((role) => role !== Position.NULL).length - 1 && (
            <div className={styles.line} />
          )}
        </>
      ))}
    </div>
  );
}
