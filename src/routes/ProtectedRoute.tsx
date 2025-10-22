import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '../constants/role';
import { useUser } from '@/hooks/queries/useUser';

// 유저 상태에 따라 접근가능
export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { data, isFetched } = useUser();

  if (!isFetched) {
    return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
  }

  if (!allowedRoles.includes(data?.role as Role)) {
    alert('로그인 후 이용해주세요.');
    return <Navigate to="/notFound" replace />;
  }

  return <Outlet />;
}
