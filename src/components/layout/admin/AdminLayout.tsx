import { SideNavigation } from '@/components/admin/sideNav/SideNavigation';
import styles from './admin.module.scss';
import { Role } from '@/constants/role';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '@/hooks/queries/useUser';

export default function AdminLayout() {
  const { data: user, isFetched } = useUser();
  const isAdmin = import.meta.env.DEV ? true : user?.role === Role.ADMIN;

  if (!isFetched) {
    return null;
  }

  if (!isAdmin) {
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
