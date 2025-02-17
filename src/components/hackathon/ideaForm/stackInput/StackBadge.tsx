import React from 'react';
import { UncontrolledBadge } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
interface BadgeProps {
  label: string;
  onRemove: () => void;
}

const StackBadge: React.FC<BadgeProps> = ({ label, onRemove }) => {
  return (
    <UncontrolledBadge size="md" onClick={onRemove} className={styles.badge}>
      {label}
    </UncontrolledBadge>
  );
};

export default StackBadge;
