import { MoreCommonOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import { Badge, Button, Text } from '@goorm-dev/vapor-components';
import MemberInfoItem from '../common/team/MemberInfoItem';

interface TeamInformationProps {
  viewer?: boolean; // 보기 전용인지
}

export default function TeamInformation({ viewer }: TeamInformationProps) {
  return (
    <div className={styles.container}>
      <div className={styles.teamInformHeader}>
        <div className={styles.teamInformHeaderText}>
          <Text typography="subtitle1" color="text-hint">
            1팀
          </Text>
          <Text as="h4" typography="heading4" color="text-normal">
            팀 이름
          </Text>
        </div>
        {!viewer && <Button color="secondary" size="md" icon={MoreCommonOutlineIcon} />}
      </div>
      <div className={styles.teamInformContent}>
        <div className={styles.teamInformContentText}>
          <Text typography="body2" color="text-normal">
            기획
          </Text>
          <Badge color="success" size="sm">
            2/2
          </Badge>
        </div>
        <div className={styles.teamInformContentItem}>
          <MemberInfoItem name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
          <MemberInfoItem name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
        </div>
      </div>
      <div className={styles.teamInformContent}>
        <div className={styles.teamInformContentText}>
          <Text typography="body2" color="text-normal">
            디자인
          </Text>
          <Badge color="success" size="sm">
            2/2
          </Badge>
        </div>
        <div className={styles.teamInformContentItem}>
          <MemberInfoItem name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
          <MemberInfoItem name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
        </div>
      </div>
      <div className={styles.teamInformContent}>
        <div className={styles.teamInformContentText}>
          <Text typography="body2" color="text-normal">
            프론트엔드
          </Text>
          <Badge color="success" size="sm">
            2/2
          </Badge>
        </div>
        <div className={styles.teamInformContentItem}>
          <MemberInfoItem name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
          <MemberInfoItem name="김팀장" imgUrl="https://avatars.githubusercontent.com/u/100000000?v=4" />
        </div>
      </div>
    </div>
  );
}
