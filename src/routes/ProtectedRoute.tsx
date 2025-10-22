import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/hooks/queries/useUser';
import { Role } from '@/constants/role';
import { toast } from '@goorm-dev/vapor-components';

// 유저 상태에 따라 접근가능
export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { data, isFetched } = useUser();

  if (!isFetched) {
    return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
  }

  console.log(isFetched);

  const userRole = data?.role;

  // role이 없거나 allowedRoles에 포함되지 않는 경우 리다이렉트
  if (!userRole || !allowedRoles.includes(userRole as Role)) {
    toast('로그인 후 이용해주세요.', {
      type: 'danger',
    });
    return <Navigate to="/notFound" replace />;
  }

  return <Outlet />;
}
