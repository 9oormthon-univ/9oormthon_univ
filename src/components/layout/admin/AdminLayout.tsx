import { SideNavigation } from '../../admin/sideNav/SideNavigation';
import styles from './admin.module.scss';
import useAuthStore from '../../../store/useAuthStore';
import { Role } from '../../../constants/role';
import { Outlet, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminLayout() {
  const { role, fetchUserStatus } = useAuthStore();

  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  if (role !== Role.ADMIN) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sideNav}>
        <SideNavigation />
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
