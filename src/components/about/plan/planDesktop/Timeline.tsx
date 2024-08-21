import { useEffect } from 'react';

import useScrollValue from '../../../../hooks/useScrollValue.ts';

import { TIMELINE_DATA } from '../../../../utilities/AboutData.ts';
import CardListLower from './CardListLower.tsx';
import CardListUpper from './CardListUpper.tsx';

import classNames from 'classnames/bind';

import styles from './PlanDesktop.module.scss';

const cx = classNames.bind(styles);

export const getMonthText = (key: number) => {
  switch (key) {
    case 1:
      return '6월';
    case 2:
      return '7월';
    case 3:
      return '8월';
    case 4:
      return '8-10월';
    case 5:
      return '11월';
    case 6:
      return '12월';
    default:
      return `${key}월`;
  }
};

interface TimelineProps {
  month: number;
  handleMonthClick: (idx: number) => void;
}

export default function Timeline({ month, handleMonthClick }: TimelineProps) {
  const { scrollValue, totalHeight } = useScrollValue();

  useEffect(() => {
    const percentage = (scrollValue.y / totalHeight) * 100;

    if (percentage < 31) {
      handleMonthClick(1);
    } else if (percentage < 33) {
      handleMonthClick(2);
    } else if (percentage < 35) {
      handleMonthClick(3);
    } else if (percentage < 37) {
      handleMonthClick(4);
    } else if (percentage < 39) {
      handleMonthClick(5);
    } else {
      handleMonthClick(6);
    }
  }, [scrollValue]);

  return (
    <div className={cx('timeline', 'd-flex flex-column')}>
      <CardListUpper month={month} handleMonthClick={handleMonthClick} />
      <figure className={cx('timelineBar', 'position-relative')}>
        <div className={cx(`fillBar${month}`, 'position-absolute')} />
        <div className={cx('monthText', 'd-flex align-items-center justify-content-between')}>
          {Object.keys(TIMELINE_DATA).map((key) => (
            <h5
              key={key}
              id={key}
              className={cx(
                `monthTextClickable`,
                `${Number(key) === month && 'active'}`,
                `${Number(key) < month && 'prev'}`,
              )}
              onClick={() => handleMonthClick(Number(key))}>
              {getMonthText(Number(key))}
            </h5>
          ))}
        </div>
      </figure>
      <CardListLower month={month} handleMonthClick={handleMonthClick} />
    </div>
  );
}
