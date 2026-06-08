export interface MockUser {
  id: number;
  name: string;
  email: string;
  role: 'Operador' | 'Analista' | 'Administrador';
  passwordHash: string;
}

export interface AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  role: MockUser['role'];
}

export interface LoginCredentials {
  email: string;
  password: string;
}
