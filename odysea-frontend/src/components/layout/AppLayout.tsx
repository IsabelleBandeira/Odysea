import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/authContext';
import { routes } from '../../app/routes';
import { Button } from '../ui/Button';
import { MobileNavigation } from './MobileNavigation';

export function AppLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout(): void {
    logout();
    navigate(routes.login, { replace: true });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Menu lateral">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">O</span>
          <div>
            <strong>Odysea</strong>
            <small> | Rastreio espacial</small>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Navegação principal">
          <NavLink to={routes.dashboard}>Dashboard</NavLink>
          <NavLink to={routes.deliveries}>Entregas</NavLink>
          <NavLink to={routes.security}>Segurança</NavLink>
        </nav>

        <div className="sidebar__footer">
          <small>Operador logado</small>
          <strong>{user?.name}</strong>
          <Button variant="ghost" onClick={handleLogout}>Sair</Button>
        </div>
      </aside>

      <div className="app-content">
        <header className="topbar">
          <div>
            <span className="eyebrow">Odysea Mission Ops</span>
            <h1>Logística espacial para Lua e Marte</h1>
          </div>
          <Button variant="secondary" onClick={handleLogout}>Sair</Button>
        </header>

        <main className="page-container">
          <Outlet />
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}
