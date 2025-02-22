import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';

export default function MyPage() {
  return (
    <div className={styles.container}>
      <Text as="h3" typography="heading3">
        마이페이지
      </Text>
    </div>
  );
}
