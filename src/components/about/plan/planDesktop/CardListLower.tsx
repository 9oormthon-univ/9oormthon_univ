import { TIMELINE_DATA } from '../../../../utilities/AboutData';

import Card from './Card';

import classNames from 'classnames/bind';
import styles from './PlanDesktop.module.scss';

const cx = classNames.bind(styles);

interface CardListLowerProps {
  month: number;
  handleMonthClick: (idx: number) => void;
}

export default function CardListLower({ month, handleMonthClick }: CardListLowerProps) {
  return (
    <div className={cx('cardListLower', 'd-flex')}>
      {Object.keys(TIMELINE_DATA)
        .filter((item) => item >= 4)
        .map((key, idx) => {
          const item = TIMELINE_DATA[key];
          return (
            <Card
              handleMonthClick={handleMonthClick}
              key={key}
              idx={key}
              month={month}
              Icon={item.Icon}
              title={item.title}
              description={item.description}
            />
          );
        })}
    </div>
  );
}
