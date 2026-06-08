import { Link } from 'react-router-dom';
import { routes } from '../app/routes';

const securityPractices = [
  {
    title: 'Hash SHA-256 no login mockado',
    description:
      'A senha digitada é transformada em hash pela Web Crypto API e comparada com um hash armazenado no mock de usuário.',
  },
  {
    title: 'Validação de entrada',
    description:
      'O formulário exige e-mail e senha, valida formato de e-mail e evita tentativa de autenticação com campos vazios.',
  },
  {
    title: 'Proteção contra XSS no front-end',
    description:
      'Os dados mockados são renderizados como texto pelo React. O projeto não usa dangerouslySetInnerHTML e inclui utilitário de escape.',
  },
  {
    title: 'Rotas protegidas',
    description:
      'Dashboard, entregas, detalhes e segurança exigem sessão mockada em sessionStorage para simular controle de acesso.',
  },
];

export function SecurityInfoPage() {
  return (
    <div className="page-stack">
      <section className="page-header-card">
        <div>
          <span className="eyebrow">Tópico 5</span>
          <h2>Segurança mockada da Odysea</h2>
          <p>
            Esta página documenta as práticas implementadas no front-end para fins acadêmicos. Em produção, autenticação e
            senha com hash devem ser tratadas no backend com algoritmos próprios para senha, como bcrypt, Argon2 ou PBKDF2.
          </p>
        </div>
      </section>

      <section className="security-grid">
        {securityPractices.map((practice) => (
          <article key={practice.title} className="panel security-card">
            <span aria-hidden="true">◇</span>
            <h3>{practice.title}</h3>
            <p>{practice.description}</p>
          </article>
        ))}
      </section>

      <section className="panel security-explanation">
        <span className="eyebrow">Limitações importantes</span>
        <h2>Por que isso é uma simulação?</h2>
        <p>
          O projeto não cria backend, banco de dados nem autenticação real na parte de front-end. O sessionStorage apenas mantém
          a experiência de navegação durante a demonstração. Qualquer pessoa com acesso ao código pode inspecionar mocks e hashes,
          por isso a implementação serve para demonstrar conceito, não para proteger um sistema real.
        </p>
        <p>
          SQL Injection não se aplica diretamente ao front-end porque não há SQL nem banco de dados nesta camada. Mesmo assim,
          o projeto evita interpolar entradas do usuário em comandos e documenta que a API real deve usar validação, ORM seguro e
          consultas parametrizadas.
        </p>
        <Link className="text-link" to={routes.dashboard}>Voltar ao dashboard</Link>
      </section>
    </div>
  );
}
