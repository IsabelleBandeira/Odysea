export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');
export const USE_API = import.meta.env.VITE_USE_API === 'true';

export function shouldUseApi(): boolean {
  return Boolean(USE_API && API_BASE_URL);
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!shouldUseApi()) {
    throw new Error('API desativada. Usando dados mockados.');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Falha ao acessar API: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
