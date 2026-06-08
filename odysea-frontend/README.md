# Odysea

Odysea é uma plataforma acadêmica e simulada de rastreamento de entregas espaciais, desenvolvida para representar uma solução de logística aplicada a futuras operações entre a Terra, a Lua e Marte.

O frontend foi desenvolvido para demonstrar as telas mobile/web responsivas e a segurança mockada da plataforma, mantendo compatibilidade conceitual com a API Spring Boot e a simulação IoT criadas por outra integrante da equipe.

> Importante: os dados, usuários, rotas e eventos de rastreamento deste frontend são simulados. A autenticação também é uma simulação acadêmica executada no front-end para atender ao tópico de segurança da Global Solution.

## Objetivo acadêmico

Este repositório cobre a responsabilidade de front-end mobile/web responsivo e segurança mockada da aplicação Odysea.

A entrega atende aos tópicos:

- Tópico 4 - Implementação do Front-end Mobile.
- Tópico 5 - Parte de Segurança da Aplicação.

## Funcionalidades implementadas

- Login mockado com e-mail e senha.
- Comparação de senha usando hash SHA-256 via Web Crypto API.
- Proteção de rotas com `ProtectedRoute`.
- Dashboard com métricas de entregas espaciais.
- Lista de entregas com filtros por texto, status e destino.
- Detalhes da entrega com rota, status, carga, coordenadas e histórico.
- Painel de tracking IoT simulado com `entregaId`, latitude e longitude.
- Tela de segurança explicando práticas aplicadas e limitações.
- Dados mockados locais para Lua e Marte.
- Camada de services preparada para integração opcional com API Spring Boot.
- Fallback automático para mocks quando a API não está configurada ou falha.
- Layout mobile-first, responsivo e adequado para prints em modo celular.

## Stack utilizada

- React
- Vite
- TypeScript
- React Router
- CSS global organizado com variáveis e componentes reutilizáveis
- Fetch API
- Web Crypto API
- Deploy sugerido: Vercel

## Telas implementadas

1. Login
2. Dashboard
3. Lista de entregas
4. Detalhes da entrega
5. Segurança
6. Página de rota não encontrada

## Login de demonstração

Use as credenciais abaixo para acessar o protótipo:

```txt
E-mail: operador@odysea.space
Senha: Odysea@2026
```

A senha não é comparada diretamente em texto puro no fluxo de login. O app gera o hash SHA-256 da senha digitada e compara com o hash armazenado no mock de usuário.

## Segurança implementada

### 1. Senha com hash simulada

O arquivo `src/utils/security.ts` usa `window.crypto.subtle.digest('SHA-256', ...)` para gerar um hash da senha digitada.

Essa abordagem serve apenas para demonstração acadêmica. Em sistemas reais, senha e autenticação devem ser tratadas no backend, usando algoritmos próprios para senha, como bcrypt, Argon2 ou PBKDF2, com salt, política de expiração, proteção contra brute force e tokens seguros.

### 2. Validação de entrada

O arquivo `src/utils/validation.ts` valida:

- e-mail obrigatório;
- formato de e-mail;
- senha obrigatória;
- bloqueio de envio vazio.

### 3. Proteção contra XSS

O projeto não usa `dangerouslySetInnerHTML`. Os dados mockados são renderizados como texto pelo React. O arquivo `src/utils/security.ts` também possui funções de normalização e escape para reforçar a prática.

### 4. Proteção conceitual contra SQL Injection

Não há SQL no front-end, então SQL Injection não se aplica diretamente nesta camada. Mesmo assim, o projeto evita construir queries com entradas do usuário e documenta que a API real deve usar validação, ORM seguro e consultas parametrizadas.

### 5. Rotas protegidas

As telas internas ficam protegidas por `ProtectedRoute`. A sessão é armazenada em `sessionStorage` apenas para simular a experiência de usuário autenticado durante a demonstração.

## Relação com backend/API/IoT da equipe

Este frontend foi criado de forma independente, mas alinhado conceitualmente ao backend Spring Boot e à simulação IoT existentes no projeto da equipe.

Endpoints considerados:

```txt
POST   /api/entregas
GET    /api/entregas
GET    /api/entregas/{id}
PUT    /api/entregas/{id}/status?status={status}
DELETE /api/entregas/{id}
POST   /tracking/events
GET    /tracking/{entregaId}
POST   /api/entregas/{entregaId}/eventos
GET    /api/entregas/{entregaId}/eventos
```

Campos considerados do backend:

```txt
id
codigoRastreio
origem
destino
status
latitude
longitude
```

Campos usados para tracking IoT:

```json
{
  "entregaId": 15,
  "latitude": 10.5,
  "longitude": 20.3
}
```

O frontend enriquece os dados com campos visuais, como nome da missão, tipo de carga, prioridade, agência, progresso, ETA, histórico e etapas de rota. Esses campos adicionais são mocks para melhorar a apresentação.

## Como instalar

Pré-requisitos:

- Node.js 20 ou superior
- npm
- Git
- VS Code

Clone o repositório ou extraia o ZIP:

```bash
git clone <url-do-seu-repositorio>
cd odysea-frontend
npm install
```

## Como executar localmente

```bash
npm run dev
```

Acesse o endereço exibido pelo Vite, normalmente:

```txt
http://localhost:5173
```

## Como usar apenas mocks

O modo mock é o padrão. Deixe o arquivo `.env` sem `VITE_USE_API=true`, ou use:

```env
VITE_USE_API=false
VITE_API_BASE_URL=http://localhost:8080
```

## Como configurar API local opcional

Crie um arquivo `.env` com:

```env
VITE_USE_API=true
VITE_API_BASE_URL=http://localhost:8080
```

Depois rode o backend Spring Boot da equipe localmente. Se a API não estiver disponível, o frontend faz fallback para mocks nos serviços principais.

Se aparecer erro de CORS, a correção deve ser feita no backend Spring Boot, não no front-end.

## Estrutura de pastas

```txt
src/
  app/
    App.tsx
    authContext.tsx
    routes.tsx
  components/
    deliveries/
    layout/
    tracking/
    ui/
  data/
    mockDeliveries.ts
    mockTrackingEvents.ts
    mockUsers.ts
  pages/
    DashboardPage.tsx
    DeliveriesPage.tsx
    DeliveryDetailsPage.tsx
    LoginPage.tsx
    NotFoundPage.tsx
    SecurityInfoPage.tsx
  services/
    apiClient.ts
    deliveriesService.ts
    trackingService.ts
  styles/
    globals.css
  types/
    auth.ts
    delivery.ts
    tracking.ts
  utils/
    formatters.ts
    security.ts
    status.ts
    validation.ts
```

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Prints recomendados para o PDF final

- Tela de login com marca Odysea.
- Validação do login com campos vazios ou e-mail inválido.
- Dashboard em modo celular.
- Dashboard em modo desktop.
- Lista de entregas com filtros.
- Detalhes de entrega com rota e linha do tempo.
- Painel de IoT com latitude/longitude.
- Tela de Segurança com explicação das práticas.
- DevTools em modo mobile para comprovar responsividade.

## Como publicar na Vercel

1. Suba o projeto para o GitHub.
2. Acesse a Vercel.
3. Clique em Add New Project.
4. Importe o repositório.
5. Framework Preset: Vite.
6. Build Command: `npm run build`.
7. Output Directory: `dist`.
8. Configure variáveis de ambiente apenas se for testar API local/remota.
9. Faça o deploy.

Para apresentação, recomenda-se deixar `VITE_USE_API=false` no deploy para garantir que o app funcione com mocks mesmo sem o backend online.

## Como a entrega atende ao Tópico 4

- Possui mais de 3 telas funcionais.
- A interface é mobile-first e responsiva.
- Não depende obrigatoriamente da API.
- Os dados podem ser mockados e já estão mockados localmente.
- O app permite demonstrar dashboard, lista e detalhes de rastreio.

## Como a entrega atende ao Tópico 5

- Possui sistema de login.
- Usa senha com hash SHA-256 no fluxo mockado.
- Aplica validação de entrada.
- Aplica proteção de rotas.
- Evita `dangerouslySetInnerHTML` para reduzir risco de XSS.
- Documenta limitação da segurança no front-end.

## Observações finais

Este frontend não substitui a API, banco de dados, testes ou simulação IoT do restante do grupo. Ele foi criado para demonstrar a experiência mobile/web e a segurança mockada da Odysea, mantendo alinhamento com o backend/API/IoT existente sem criar dependência obrigatória.
