import { Button } from '@goorm-dev/vapor-components';
import { ChevronLeftOutlineIcon, ChevronRightOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';

export default function IdeaDetailNavigation() {
  return (
    <div className={styles.navContainer}>
      <Button size="lg" color="secondary" outline icon={ChevronLeftOutlineIcon}>
        뒤로가기
      </Button>
      <div className={styles.buttonAlign}>
        <Button size="lg" color="secondary" outline icon={ChevronLeftOutlineIcon} />
        <Button size="lg" color="secondary" outline icon={ChevronRightOutlineIcon} />
      </div>
    </div>
  );
}
