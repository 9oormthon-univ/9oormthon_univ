import NotFoundImg from '../../assets/images/img-404-danpung.png';
import { Text } from '@goorm-dev/vapor-components';
import classNames from 'classnames/bind';
import styles from './notFound.module.scss';

export default function NotFound() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx('mainContainer')}>
      <div className={cx('mainWrapper')}>
        <img className={cx('img')} src={NotFoundImg} alt="단풍 이미지" />
        <Text as="h3" color="text-alternative" isInheritColor={false} typography="heading3" fontWeight="bold">
          페이지를 찾을 수 없습니다.
        </Text>
        <Text
          as="p"
          className={cx('textAlign')}
          color="text-normal"
          isInheritColor={false}
          typography="body1"
          fontWeight="regular">
          페이지의 주소가 잘못되었거나 변경되어 요청한 페이지를 찾을 수 없습니다. <br />
          다음의 내용을 확인하시고, 해결되지 않을 시 고객센터로 연락해 주시기 바랍니다.
        </Text>
      </div>
    </div>
  );
}
