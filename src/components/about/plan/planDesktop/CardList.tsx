import { TIMELINE_DATA } from '../../../../utilities/AboutData';

import classNames from 'classnames/bind';
import Card from './Card';
import styles from './PlanDesktop.module.scss';

const cx = classNames.bind(styles);

interface CardListUProps {
  month: number;
  handleMonthClick: (month: number) => void;
}

export default function CardList({ month, handleMonthClick }: CardListUProps) {
  return (
    <div className={cx('cardList', 'd-flex')}>
      {TIMELINE_DATA.map((item, index) => (
        <Card
          handleMonthClick={handleMonthClick}
          key={index}
          idx={index}
          month={month}
          Icon={item.Icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}
