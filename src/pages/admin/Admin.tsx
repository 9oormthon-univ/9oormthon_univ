import { SideNavigation } from '../../components/admin/sideNav/SideNavigation';
import styles from './Admin.module.scss';

export default function Admin() {
  return (
    <div className={styles.container}>
      <aside className={styles.sideNav}>
        <SideNavigation />
      </aside>
    </div>
  );
}
