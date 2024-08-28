import { useState } from 'react';

import { Button, Text } from '@goorm-dev/vapor-components';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './PlanDesktop.module.scss';
import Timeline from './Timeline';

const cx = classNames.bind(styles);

// 이 컴포넌트는 container-xl(1200px~) 부터를 다룬다

export default function PlanDesktop() {
  const navigate = useNavigate();
  const [month, setMonth] = useState(1);

  const handleMonthClick = (month: number) => {
    setMonth(month);
  };

  return (
    <div className={cx('planDesktop')}>
      <h2 className={cx('title')}>구름톤 유니브 3기 로드맵</h2>
      <Text typography="heading6" className={styles.description} color="gray-500">
        다가올 새로운 여정을 함께해요!
      </Text>
      <Timeline month={month} handleMonthClick={handleMonthClick} />
      <div className={cx('buttonContainer')}>
        <Button
          size="xl"
          onClick={() => {
            navigate('recruit');
          }}>
          3기 일정 자세히 보기
        </Button>
      </div>
    </div>
  );
}
