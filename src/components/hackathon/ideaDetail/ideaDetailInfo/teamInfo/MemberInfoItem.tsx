import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';

interface MemberInfoItemProps {
  name: string;
  imgUrl: string;
}

export default function MemberInfoItem({ name, imgUrl }: MemberInfoItemProps) {
  return (
    <div className={styles.memberInfoItem}>
      <div className={styles.memberInfoImg}>
        <img src={imgUrl} alt="memberImg" />
      </div>
      <Text as="p" typography="body2" color="text-alternative">
        {name}
      </Text>
    </div>
  );
}
