import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './authContext';
import { routes } from './routes';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { DashboardPage } from '../pages/DashboardPage';
import { DeliveriesPage } from '../pages/DeliveriesPage';
import { DeliveryDetailsPage } from '../pages/DeliveryDetailsPage';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SecurityInfoPage } from '../pages/SecurityInfoPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path={routes.home} element={<Navigate to={routes.dashboard} replace />} />
              <Route path={routes.dashboard} element={<DashboardPage />} />
              <Route path={routes.deliveries} element={<DeliveriesPage />} />
              <Route path="/entregas/:id" element={<DeliveryDetailsPage />} />
              <Route path={routes.security} element={<SecurityInfoPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
