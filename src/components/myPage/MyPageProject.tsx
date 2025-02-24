import styles from './styles.module.scss';
import notfound from '../../assets/images/notfound.png';
import { Badge, Text } from '@goorm-dev/vapor-components';

export const MyPageProject = () => {
  return (
    <div className={styles.contentProjectContainer}>
      <img src={notfound} alt="notfound" />
      <div className={styles.contentProjectItem}>
        <div className={styles.contentProjectItemTitle}>
          <Text as="h6" typography="heading6" color="gray-900">
            프로젝트 이름
          </Text>
        </div>
        <Badge color="primary" size="md">
          기획
        </Badge>
      </div>
    </div>
  );
};
