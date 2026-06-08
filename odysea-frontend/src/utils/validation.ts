import type { LoginCredentials } from '../types/auth';
import { normalizeEmail } from './security';

export interface LoginValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof LoginCredentials, string>>;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export function validateLogin(credentials: LoginCredentials): LoginValidationResult {
  const errors: LoginValidationResult['errors'] = {};
  const email = normalizeEmail(credentials.email);

  if (!email) {
    errors.email = 'Informe o e-mail de acesso.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!credentials.password.trim()) {
    errors.password = 'Informe a senha.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
