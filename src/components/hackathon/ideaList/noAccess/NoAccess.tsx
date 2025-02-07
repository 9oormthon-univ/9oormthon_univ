import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';

export default function NoAccess() {
  return (
    <div className={styles.container}>
      <img
        className={styles.imgSrc}
        src="https://statics.goorm.io/gds/resources/images/light/empty_folder.svg"
        alt="빈 폴더"
      />
      <div className={styles.textWrap}>
        <Text as="h2" typography="heading5" color="text-hint">
          아직 볼 수 없어요 :(
        </Text>
        <Text as="h2" typography="body2" color="text-hint">
          팀빌딩 기간 시작 후 오픈됩니다.
        </Text>
      </div>
    </div>
  );
}
