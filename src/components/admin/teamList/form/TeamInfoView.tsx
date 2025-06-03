import { InOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './form.module.scss';

import { Button, Text } from '@goorm-dev/vapor-components';

export default function TeamInfoView() {
  return (
    <div className={styles.container}>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          팀 번호
        </Text>
        <Text typography="heading6" color="text-normal">
          1팀
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          팀 명
        </Text>
        <Text typography="heading6" color="text-normal">
          팀 명
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          서비스 명
        </Text>
        <Text typography="heading6" color="text-normal">
          서비스 명
        </Text>
      </div>
      <div className={styles.teamInfo}>
        <Text typography="subtitle2" color="text-hint">
          아이디어 정보
        </Text>
        <Button size="md" color="secondary" iconSide="right" icon={InOutlineIcon} className={styles.ideaInfoButton}>
          아이디어 정보 보기
        </Button>
      </div>
    </div>
  );
}
