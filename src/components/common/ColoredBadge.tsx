import { ReactNode } from 'react';
import styles from './styles.module.scss';

export default function DarkBadge({ children }: { children: ReactNode }) {
  return <div className={styles.badge}>{children}</div>;
}
