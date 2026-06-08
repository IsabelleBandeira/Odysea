import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/authContext';
import { routes } from '../../app/routes';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={routes.login} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
