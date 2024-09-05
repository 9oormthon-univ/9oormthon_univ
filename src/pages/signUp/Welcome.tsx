import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import completeImg from '../../assets/svgs/img-complete.svg';
import { Button, Text } from '@goorm-dev/vapor-components';

export default function Welcome() {
  const location = useLocation();
  const { name } = location.state || {};
  return (
    <div className={styles.welcomeContainer}>
      <img className={styles.welcomeImg} src={completeImg} alt="Welcome" />
      {name ? (
        <Text typography="heading2">어서와요, {name} 미르미!</Text>
      ) : (
        <Text typography="heading2">어서와요, 미르미!</Text>
      )}
      <Text className={styles.welcomeText} color="gray-800">
        구름톤 유니브에서의<br></br>특별한 성장을 응원해요!
      </Text>
      <Button className={styles.mainBtn} size="lg">
        메인으로
      </Button>
    </div>
  );
}
