import { useState } from 'react';

import { Button, Text } from '@goorm-dev/vapor-components';
import { useNavigate } from 'react-router-dom';
import styles from './PlanDesktop.module.scss';
import Timeline from './Timeline';

export default function PlanDesktop() {
  const navigate = useNavigate();
  const [month, setMonth] = useState(0);

  const handleMonthClick = (month: number) => {
    setMonth(month);
  };

  return (
    <div className={styles.planDesktop}>
      <h2 className={styles.title}>구름톤 유니브 4기 로드맵</h2>
      <Text typography="heading6" className={styles.description} color="gray-500">
        다가올 새로운 여정을 함께해요!
      </Text>
      <Timeline month={month} handleMonthClick={handleMonthClick} />
      <div className={styles.buttonContainer}>
        <Button
          size="xl"
          onClick={() => {
            navigate('recruit');
          }}>
          4기 일정 자세히 보기
        </Button>
      </div>
    </div>
  );
}
