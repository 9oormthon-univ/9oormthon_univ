import { Text } from '@goorm-dev/vapor-components';
import classNames from 'classnames/bind';
import styles from './BenefitDesktop.module.scss';
import HorizontalScroll from './HorizontalScroll';

const cx = classNames.bind(styles);

export default function BenefitDesktop() {
  return (
    <div
      className={cx(
        'benefitDesktop',
        'd-none d-md-flex position-relative flex-column justify-content-center align-items-center',
      )}>
      <Text typography="heading2">혜택 둘러보기</Text>
      <Text typography="heading6" color="gray-600">
        구름톤 유니브에서 맘껏 누려요
      </Text>
      <HorizontalScroll />
    </div>
  );
}
