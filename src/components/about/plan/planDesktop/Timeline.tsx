import { TIMELINE_DATA } from '../../../../utilities/AboutData.ts';

import classNames from 'classnames/bind';

import { Text } from '@goorm-dev/vapor-components';
import CardList from './CardList.tsx';
import styles from './PlanDesktop.module.scss';

const cx = classNames.bind(styles);

export const getMonthText = (key: number) => {
  switch (key) {
    case 0:
      return '6월';
    case 1:
      return '7월';
    case 2:
      return '8월';
    case 3:
      return '8-10월';
    case 4:
      return '11월';
    case 5:
      return '12월';
    default:
      return `${key}월`;
  }
};

interface TimelineProps {
  month: number;
  handleMonthClick: (month: number) => void;
}

export default function Timeline({ month, handleMonthClick }: TimelineProps) {
  return (
    <div className={styles.timeline}>
      <figure className={styles.timelineBar}>
        {TIMELINE_DATA.map((_, index) => (
          <div className={cx(`monthTextClickable`, `${index === month && 'active'}`)}>
            <Text typography="heading6" key={index} onClick={() => handleMonthClick(index)}>
              {getMonthText(index)}
            </Text>
          </div>
        ))}
      </figure>
      <CardList month={month} handleMonthClick={handleMonthClick} />
    </div>
  );
}
