import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Role } from '../constants/role';

// 유저 상태에 따라 접근가능
export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { role, isFetched } = useAuthStore();

  if (!isFetched) {
    return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
  }

  // 개발 환경에서는 모든 유저 접근 가능
  if (import.meta.env.DEV) {
    return <Outlet />;
  }

  if (!allowedRoles.includes(role as Role)) {
    alert('권한이 없습니다.');
    return <Navigate to="/notFound" replace />;
  }

  return <Outlet />;
}
