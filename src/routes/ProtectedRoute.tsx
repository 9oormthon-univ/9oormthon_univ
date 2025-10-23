import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/hooks/queries/useUser';
import { Role } from '@/constants/role';
import { toast } from '@goorm-dev/vapor-components';
import { useAuthStore } from '@/store/useAuthStore';

export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { user: cachedUser } = useAuthStore();
  const { data: freshUser, isLoading, isError } = useUser();

  const user = freshUser || cachedUser;

  console.log('ProtectedRoute Debug:', {
    cachedUser,
    freshUser,
    user,
  });

  // 캐시된 데이터도 없고 로딩 중일 때만 대기
  if (!cachedUser && isLoading) {
    return null;
  }

  if (isError || !user || !allowedRoles.includes(user.role as Role)) {
    console.log('ProtectedRoute Debug:', {
      user,
      allowedRoles,
      isError,
      isLoading,
    });
    toast('로그인이 필요합니다.', {
      type: 'danger',
    });
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
