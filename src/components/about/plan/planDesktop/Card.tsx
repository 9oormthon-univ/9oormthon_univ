import React from 'react';

import classNames from 'classnames/bind';

import { Text } from '@goorm-dev/vapor-components';
import styles from './PlanDesktop.module.scss';

const cx = classNames.bind(styles);

interface CardProps {
  Icon: React.FC | string;
  title: string;
  description: string;
  month: number;
  idx: number;
  handleMonthClick: (month: number) => void;
}

export default function Card({ Icon, title, description, month, idx, handleMonthClick }: CardProps) {
  return (
    <div className={cx('card')} onClick={() => handleMonthClick(Number(idx))}>
      <div
        className={cx(
          'cardContent',
          'd-flex flex-column justify-content-center',
          `${month === Number(idx) && 'selected'}`,
        )}>
        <div className={cx('icon')}>
          <Icon />
        </div>
        <Text className={cx('cardTitle')} typography="heading4" color={month === Number(idx) ? `blue-700` : `gray-700`}>
          {title}
        </Text>
        <Text typography="subtitle1" color={month === Number(idx) ? `blue-700` : `gray-700`}>
          {description}
        </Text>
      </div>
    </div>
  );
}
