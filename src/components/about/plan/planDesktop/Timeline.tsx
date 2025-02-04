import { TIMELINE_DATA } from '../../../../utilities/AboutData.ts';

import { ButtonToggleGroup } from '@goorm-dev/vapor-components';
import CardList from './CardList.tsx';
import styles from './PlanDesktop.module.scss';
import { useEffect, useState } from 'react';

export const getMonthText = (key: number) => {
  switch (key) {
    case 0:
      return '2월';
    case 1:
      return '3월';
    case 2:
      return '5월';
    case 3:
      return '4월-6월';
    case 4:
      return '7월-9월';
    case 5:
      return '11월';
    default:
      return `${key}월`;
  }
};

interface TimelineProps {
  month: number;
  handleMonthClick: (month: number) => void;
}

// 사이즈 정의
type Size = 'md' | 'xl';

const getSizeByWindowWidth = (width: number) => {
  if (width <= 540) return 'md';
  return 'xl';
};

export default function Timeline({ month, handleMonthClick }: TimelineProps) {
  const [size, setSize] = useState<Size>(getSizeByWindowWidth(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setSize(getSizeByWindowWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.timeline}>
      <ButtonToggleGroup className={styles.toggleGroup} activeIndex={month} size={size} onToggle={handleMonthClick}>
        {TIMELINE_DATA.map((_, index) => (
          <ButtonToggleGroup.ButtonToggleItem onClick={() => handleMonthClick(index)}>
            {getMonthText(index)}
          </ButtonToggleGroup.ButtonToggleItem>
        ))}
      </ButtonToggleGroup>

      <CardList month={month} handleMonthClick={handleMonthClick} />
    </div>
  );
}
