import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

// 유저 상태에 따라 접근가능
export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { role } = useAuthStore();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/notFound" replace />;
  }

  return <Outlet />;
}
