import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';

interface NoAccessProps {
  heading1: string;
  heading2?: string;
}

export default function NoAccess({ heading1, heading2 }: NoAccessProps) {
  return (
    <div className={styles.container}>
      <img
        className={styles.imgSrc}
        src="https://statics.goorm.io/gds/resources/images/light/empty_folder.svg"
        alt="빈 폴더"
      />
      <div className={styles.textWrap}>
        <Text as="h2" typography="heading5" color="text-hint">
          {heading1}
        </Text>
        <Text as="h2" typography="body2" color="text-hint">
          {heading2}
        </Text>
      </div>
    </div>
  );
}
