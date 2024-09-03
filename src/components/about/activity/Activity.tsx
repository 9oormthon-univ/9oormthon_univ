import ActivityList from './ActivityList';

import { Text } from '@goorm-dev/vapor-components';
import styles from './Activity.module.scss';

export default function Activity() {
  return (
    <div className={styles.activity}>
      <div className={styles.titleText}>
        <Text typography="heading2">지난 구름톤 유니브의 여정</Text>
        <Text typography="heading6" color="gray-500">
          이전 기수는 이런 활동을 했어요
        </Text>
      </div>
      <ActivityList />
    </div>
  );
}
