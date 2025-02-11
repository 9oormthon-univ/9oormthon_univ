import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

// 엑세스 토큰 있어야 접근 가능
export default function ProtectedRoute() {
  const [cookies] = useCookies(['access_token']);

  if (!cookies.access_token) {
    console.log('엑세스 토큰 없음');
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
}
