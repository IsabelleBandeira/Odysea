import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { mockUsers } from '../data/mockUsers';
import type { AuthenticatedUser, LoginCredentials } from '../types/auth';
import { clearSession, getSession, hashSHA256, normalizeEmail, safeHashCompare, saveSession } from '../utils/security';
import { validateLogin } from '../utils/validation';

interface LoginResult {
  success: boolean;
  message?: string;
  errors?: Partial<Record<keyof LoginCredentials, string>>;
}

interface AuthContextValue {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(() => getSession());

  const login = useCallback(async (credentials: LoginCredentials): Promise<LoginResult> => {
    const validation = validateLogin(credentials);

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
      };
    }

    const email = normalizeEmail(credentials.email);
    const mockUser = mockUsers.find((candidate) => candidate.email === email);

    if (!mockUser) {
      return {
        success: false,
        message: 'Credenciais inválidas. Confira o e-mail e a senha de demonstração.',
      };
    }

    const passwordHash = await hashSHA256(credentials.password);

    if (!safeHashCompare(passwordHash, mockUser.passwordHash)) {
      return {
        success: false,
        message: 'Credenciais inválidas. Confira o e-mail e a senha de demonstração.',
      };
    }

    const authenticatedUser: AuthenticatedUser = {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    };

    saveSession(authenticatedUser);
    setUser(authenticatedUser);

    return { success: true };
  }, []);

  const logout = useCallback((): void => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
