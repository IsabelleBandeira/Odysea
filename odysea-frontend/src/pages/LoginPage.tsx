import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../app/authContext';
import { routes } from '../app/routes';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import type { LoginCredentials } from '../types/auth';

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginCredentials, string>>>({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destination = (location.state as { from?: string } | null)?.from ?? routes.dashboard;

  if (isAuthenticated) {
    return <Navigate to={routes.dashboard} replace />;
  }

  function updateField(field: keyof LoginCredentials, value: string): void {
    setCredentials((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const result = await login(credentials);
    setIsSubmitting(false);

    if (!result.success) {
      setErrors(result.errors ?? {});
      setMessage(result.message ?? 'Revise os campos destacados.');
      return;
    }

    navigate(destination, { replace: true });
  }

  return (
    <main className="login-page">
      <section className="login-hero" aria-label="Apresentação da Odysea">
        <div className="login-hero__content">
          <span className="brand__mark brand__mark--large" aria-hidden="true">O</span>
          <p className="eyebrow">Odysea Mission Ops</p>
          <h1>Odysea</h1>
          <p>Logística espacial para missões na Lua e em Marte.</p>
        </div>
      </section>

      <section className="login-card" aria-labelledby="login-title">
        <div>
          <span className="eyebrow">Acesso seguro mockado</span>
          <h2 id="login-title">Entrar na plataforma</h2>
          <p>Use as credenciais acadêmicas para acessar o protótipo mobile-first da Odysea.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <Input
            id="email"
            label="E-mail"
            type="email"
            autoComplete="email"
            placeholder="operador@odysea.space"
            value={credentials.email}
            error={errors.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
            placeholder="Senha de demonstração"
            value={credentials.password}
            error={errors.password}
            onChange={(event) => updateField('password', event.target.value)}
          />

          {message ? <p className="form-alert" role="alert">{message}</p> : null}

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Validando hash...' : 'Entrar'}
          </Button>
        </form>

        <div className="demo-credentials" aria-label="Credenciais de demonstração">
          <strong>Credenciais para apresentação</strong>
          <span>E-mail: operador@odysea.space</span>
          <span>Senha: Odysea@2026</span>
        </div>
      </section>
    </main>
  );
}
