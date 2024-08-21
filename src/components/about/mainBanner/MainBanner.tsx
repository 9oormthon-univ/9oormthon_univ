import classNames from 'classnames/bind';
import MainBannerImg from '../../../assets/svgs/MainBannerImg';
import MainBannerSmallImg from '../../../assets/svgs/MainBannerSmallImg';
import MainBannerSlogan from '../../../assets/svgs/main_banner_slogan.svg';
import styles from './MainBanner.module.scss';

const cx = classNames.bind(styles);

interface MainBannerProps {
  scrollTrigger: () => void;
}

export default function MainBanner({ scrollTrigger }: MainBannerProps) {
  return (
    <div
      className={cx(
        'mainBanner',
        'd-flex flex-column justify-content-between align-items-center position-fixed w-100',
      )}>
      <div className={cx('headerText', 'd-flex flex-column')}>
        <h3 className="d-none d-md-block text-center">사계절, 구름톤 유니브와 함께</h3>
        <h5 className="d-block d-md-none text-center">사계절, 구름톤 유니브와 함께</h5>
        <img className={cx('title')} src={MainBannerSlogan} alt="being all seasons with goorm" />
      </div>
      <div>
        <MainBannerImg onClick={scrollTrigger} className={cx('mainImg', 'd-none d-sm-block position-absolute')} />
        <MainBannerSmallImg
          onClick={scrollTrigger}
          className={cx('mainImgSmall', 'd-block d-sm-none position-absolute')}
        />
      </div>
    </div>
  );
}
