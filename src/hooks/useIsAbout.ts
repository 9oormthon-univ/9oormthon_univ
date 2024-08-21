import { useLocation } from 'react-router-dom';

export function useIsAbout() {
  const location = useLocation();
  return location.pathname === '/';
}
