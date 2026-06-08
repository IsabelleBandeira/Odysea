import { NavLink } from 'react-router-dom';
import { routes } from '../../app/routes';

const navigationItems = [
  { to: routes.dashboard, label: 'Início', icon: '⌁' },
  { to: routes.deliveries, label: 'Entregas', icon: '◌' },
  { to: routes.security, label: 'Segurança', icon: '◇' },
];

export function MobileNavigation() {
  return (
    <nav className="mobile-nav" aria-label="Navegação principal">
      {navigationItems.map((item) => (
        <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'mobile-nav__item active' : 'mobile-nav__item')}>
          <span aria-hidden="true">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
