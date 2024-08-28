import classNames from 'classnames/bind';
import { MainBannerSlogan } from '../../../assets';
import styles from './MainBanner.module.scss';

const cx = classNames.bind(styles);

export default function containerMainBanner() {
  return (
    <div className={styles.mainBanner}>
      <div className={cx('headerText', 'd-flex flex-column')}>
        <h3 className="d-none d-md-block text-center">사계절, 구름톤 유니브와 함께</h3>
        <h5 className="d-block d-md-none text-center">사계절, 구름톤 유니브와 함께</h5>
        <MainBannerSlogan />
      </div>
    </div>
  );
}
