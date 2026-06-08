import type { MockUser } from '../types/auth';

export const mockUsers: MockUser[] = [
  {
    id: 1,
    name: 'Operadora Odysea',
    email: 'operador@odysea.space',
    role: 'Operador',
    // Hash SHA-256 da senha de demonstracao informada no README.
    passwordHash: '1a9ffe0ecd4aa0e90f358f50346fbc4d14cabd06191c8c428e403002f6a2504d',
  },
];
