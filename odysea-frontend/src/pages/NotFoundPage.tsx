import { Link } from 'react-router-dom';
import { routes } from '../app/routes';

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="panel not-found-card">
        <span className="brand__mark" aria-hidden="true">O</span>
        <h1>Rota não encontrada</h1>
        <p>A página solicitada não faz parte do protótipo Odysea.</p>
        <Link className="text-link" to={routes.dashboard}>Voltar ao dashboard</Link>
      </section>
    </main>
  );
}
