import StackItem from '../../../common/team/StackItem';
import styles from './styles.module.scss';
import { Badge, Text } from '@goorm-dev/vapor-components';
import { PositionLowerKey, getPositionName, getPositionKey } from '../../../../../constants/position';
import MemberInfoItem from '../../../common/team/MemberInfoItem';
import useBreakPoint from '../../../../../hooks/useBreakPoint';
import { Member } from '../../../../../types/user/idea';

interface TeamInfoCardProps {
  role: PositionLowerKey;
  currentCount: number;
  maxCount: number;
  description: string;
  skills: string[];
  currentMembers: Omit<Member, 'univ'>[];
  ratio: string;
}

export default function TeamInfoCard({
  role,
  currentCount,
  maxCount,
  description,
  skills,
  currentMembers,
  ratio,
}: TeamInfoCardProps) {
  const isFull = currentCount >= maxCount;
  const breakpoint = useBreakPoint();

  return (
    <div
      className={
        ['sm', 'md', 'lg', 'xl', 'xxl'].includes(breakpoint) ? styles.teamInfoContent : styles.teamInfoContentMobile
      }>
      <div className={styles.teamInfoLeftItem}>
        <div className={styles.teamInfoPosition}>
          <Text as="h5" typography="heading5" color="text-normal">
            {getPositionKey(role) ? getPositionName(getPositionKey(role)!) : role}
          </Text>
          <Badge color={isFull ? 'success' : 'primary'} pill>
            {currentCount}/{maxCount}
          </Badge>
        </div>
        <Text as="p" typography="body2" color="text-alternative">
          {description}
        </Text>
        {['sm', 'md', 'lg', 'xl', 'xxl'].includes(breakpoint) && (
          <>
            <div className={styles.teamMemberInfoContainer}>
              {currentMembers.map((member) => (
                <MemberInfoItem
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  img_url={member.img_url}
                  is_leader={member.is_leader}
                />
              ))}
            </div>
            <Text as="span" typography="subtitle2" color="text-hint">
              경쟁률 {ratio}
            </Text>
          </>
        )}
      </div>
      {['xs'].includes(breakpoint) && (
        <>
          <div className={styles.teamInfoRightItemMobile}>
            <Text as="p" typography="subtitle2" color="text-alternative">
              필요 스택
            </Text>
            <div className={styles.teamInfoStackContainerMobile}>
              {skills.map((skill, index) => (
                <StackItem key={index} skill={skill} />
              ))}
            </div>
          </div>
          <div className={styles.teamMemberInfoContainerMobile}>
            {currentMembers.map((member) => (
              <MemberInfoItem
                key={member.id}
                id={member.id}
                name={member.name}
                img_url={member.img_url}
                is_leader={member.is_leader}
              />
            ))}
          </div>
        </>
      )}

      {['xxl', 'xl', 'lg', 'md', 'sm'].includes(breakpoint) && (
        <div className={styles.teamInfoRightItem}>
          {skills.length > 0 && (
            <>
              <Text as="p" typography="subtitle2" color="text-alternative">
                필요 스택
              </Text>
              <div className={styles.teamInfoStackContainer}>
                {skills.map((skill, index) => (
                  <StackItem key={index} skill={skill} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
