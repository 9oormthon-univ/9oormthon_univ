import { Text } from '@goorm-dev/vapor-components';
import HorizontalScroll from './HorizontalScroll';

import styles from './BenefitDesktop.module.scss';

export default function BenefitDesktop() {
  return (
    <div className={styles.benefitDesktop}>
      <div className={styles.benefitTitleWrapper}>
        <Text typography="heading2">혜택 둘러보기</Text>
        <Text typography="heading6" color="gray-600">
          구름톤 유니브에서 맘껏 누려요
        </Text>
      </div>
      <HorizontalScroll />
    </div>
  );
}
