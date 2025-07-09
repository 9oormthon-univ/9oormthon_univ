import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import TeamInfoCard from './teamInfo/TeamInfoCard';
import { PositionLowerKey } from '../../../../constants/position';
import { Member, Requirements } from '../../../../types/user/idea';

export default function TeamInfo({ requirements }: { requirements: Requirements }) {
  return (
    <div className={styles.container}>
      <Text as="h5" typography="heading5" color="gray-900">
        원하는 팀원상
      </Text>
      <div className={styles.teamInfoContainer}>
        {Object.entries(requirements || {}).map(([position, info]) => (
          <TeamInfoCard
            key={position}
            role={position as PositionLowerKey}
            currentCount={info.current_count}
            maxCount={info.max_count}
            description={info.requirement}
            skills={info.required_tech_stacks}
            currentMembers={info.current_members.map((member: Member) => ({
              id: member.id,
              name: member.name,
              imgUrl: member.img_url,
              is_leader: member.is_leader,
            }))}
            ratio={info.ratio}
          />
        ))}
      </div>
    </div>
  );
}
