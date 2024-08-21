import classNames from 'classnames/bind';

import styles from './PlanDesktop.module.scss';

const cx = classNames.bind(styles);

interface CardProps {
  Icon: React.FC;
  title: string;
  description: string;
  month: number;
  idx: number;
  handleMonthClick: (idx: number) => void;
}

export default function Card({ Icon, title, description, month, idx, handleMonthClick }: CardProps) {
  return (
    <div className={cx('card', 'd-flex flex-column w-100')} onClick={() => handleMonthClick(Number(idx))}>
      <div
        className={cx(
          'cardContent',
          'd-flex flex-column justify-content-center',
          `${month === Number(idx) && 'selected'}`,
        )}>
        <div className={cx('icon')}>
          <Icon />
        </div>
        <h4 className={cx('cardTitle')}>{title}</h4>
        <p className={cx('cardDescription', 'subtitle-1')}>{description}</p>
      </div>
    </div>
  );
}
