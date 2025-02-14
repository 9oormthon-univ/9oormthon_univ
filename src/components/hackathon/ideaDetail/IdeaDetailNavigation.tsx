import { Button } from '@goorm-dev/vapor-components';
import { ChevronLeftOutlineIcon, ChevronRightOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
export default function IdeaDetailNavigation() {
  const navigate = useNavigate();
  
  return (
    <div className={styles.navContainer}>
      <Button size="lg" color="secondary" outline icon={ChevronLeftOutlineIcon} onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
      <div className={styles.buttonAlign}>
        <Button size="lg" color="secondary" outline icon={ChevronLeftOutlineIcon} />
        <Button size="lg" color="secondary" outline icon={ChevronRightOutlineIcon} />
      </div>
    </div>
  );
}
