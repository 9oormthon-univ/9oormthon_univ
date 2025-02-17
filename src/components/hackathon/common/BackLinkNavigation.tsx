import { Button } from '@goorm-dev/vapor-components';
import { ChevronLeftOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

interface BackLinkNavigationProps {
  backLink?: string;
}

export default function BackLinkNavigation({ backLink }: BackLinkNavigationProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (backLink) {
      navigate(backLink);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.navContainer}>
      <Button size="lg" color="secondary" outline icon={ChevronLeftOutlineIcon} onClick={handleBackClick}>
        뒤로가기
      </Button>
    </div>
  );
}
