import classNames from 'classnames/bind';
import styles from './Activity.module.scss';

const cx = classNames.bind(styles);

interface ActivityItemProps {
  idx: number;
  imgSrc: string;
  title: string;
  title_en: string;
}

export default function ActivityItem({ idx, imgSrc, title, title_en }: ActivityItemProps) {
  return (
    <div className={cx('activityItem', `${idx === 2 && 'hackathonItem'}`, 'd-flex flex-column flex-column-reverse')}>
      <article className={cx('contentBox', 'd-flex flex-column')}>
        <div className={cx('contentTitle', 'd-flex align-items-baseline')}>
          <h3 className={cx('titleTextKo')}>{title}</h3>
          <h6 className={cx('titleTextEn')}>{title_en}</h6>
        </div>
      </article>
      <div className={cx('contentImgWrap', `${idx === 2 && 'hackathonImg'}`)}>
        <img className={cx('contentImg')} src={imgSrc} alt={title} />
      </div>
    </div>
  );
}
