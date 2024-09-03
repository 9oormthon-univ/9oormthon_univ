import { Link } from 'react-router-dom';

import { BackPageIcon } from '@goorm-dev/gds-icons';
import { Text } from '@goorm-dev/vapor-components';
import styles from './BenefitDesktop.module.scss';

interface BenefitItemProps {
  title: string;
  description: string;
  url: string;
}

export default function BenefitItem({ title, description, url }: BenefitItemProps) {
  return (
    <Link className={styles.benefitLink} to={url} target="\_blank">
      <div className={styles.itemTextWrapper}>
        <Text typography="body2">{description}</Text>
        <Text typography="heading5">{title}</Text>
      </div>
      <div className={styles.iconWrapper}>
        <BackPageIcon width="32" height="32" fill="#858899" />
      </div>
    </Link>
  );
}
