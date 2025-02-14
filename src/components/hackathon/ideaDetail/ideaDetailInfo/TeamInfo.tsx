import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';
import TeamInfoCard from './teamInfo/TeamInfoCard';
import { POSITIONS } from '../../../../constants/position';

interface TeamMember {
  id: number;
  img_url: string;
  name: string;
  univ: string;
}

interface PositionRequirement {
  requirement: string;
  current_count: number;
  max_count: number;
  required_tech_stacks: string[];
  current_members: TeamMember[];
}

interface TeamInfoProps {
  requirements?: {
    pm: PositionRequirement;
    pd: PositionRequirement;
    fe: PositionRequirement;
    be: PositionRequirement;
  };
}

export default function TeamInfo({ requirements }: TeamInfoProps) {
  // 목업 데이터

  return (
    <div className={styles.container}>
      <Text as="h5" typography="heading5" color="gray-900">
        원하는 팀원상
      </Text>
      <div className={styles.teamInfoContainer}>
        {Object.entries(requirements || {}).map(([position, info]) => (
          <TeamInfoCard
            key={position}
            role={position as keyof typeof POSITIONS}
            currentCount={info.current_count}
            maxCount={info.max_count}
            description={info.requirement}
            skills={info.required_tech_stacks}
            currentMembers={info.current_members}
          />
        ))}
      </div>
    </div>
  );
}
