import StackItem from './StackItem';
import styles from './styles.module.scss';
import { Badge, Text } from '@goorm-dev/vapor-components';
import { POSITIONS } from '../../../../../constants/position';
import MemberInfoItem from './MemberInfoItem';
import useBreakPoint from '../../../../../hooks/useBreakPoint';
interface TeamInfoCardProps {
  role: keyof typeof POSITIONS;
  currentCount: number;
  maxCount: number;
  description: string;
  skills: string[];
  currentMembers: {
    id: number;
    name: string;
    imgUrl: string;
  }[];
}

export default function TeamInfoCard({
  role,
  currentCount,
  maxCount,
  description,
  skills,
  currentMembers,
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
            {POSITIONS[role]}
          </Text>
          <Badge color={isFull ? 'success' : 'primary'} pill>
            {currentCount}/{maxCount}
          </Badge>
        </div>
        <Text as="p" typography="body2" color="text-alternative">
          {description}
        </Text>
        {['sm', 'md', 'lg', 'xl', 'xxl'].includes(breakpoint) && (
          <div className={styles.teamMemberInfoContainer}>
            {currentMembers.map((member) => (
              <MemberInfoItem key={member.id} name={member.name} imgUrl={member.imgUrl} />
            ))}
          </div>
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
              <MemberInfoItem key={member.id} name={member.name} imgUrl={member.imgUrl} />
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
