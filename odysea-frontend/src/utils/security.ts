import type { AuthenticatedUser } from '../types/auth';

const SESSION_KEY = 'odysea:session';

export async function hashSHA256(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizeText(value: unknown): string {
  return String(value ?? '').trim();
}

export function escapeHtml(value: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '`': '&#096;',
  };

  return value.replace(/[&<>"'`]/g, (char) => map[char]);
}

export function safeDisplayText(value: unknown): string {
  return escapeHtml(normalizeText(value));
}

export function safeHashCompare(hashA: string, hashB: string): boolean {
  if (hashA.length !== hashB.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < hashA.length; index += 1) {
    mismatch |= hashA.charCodeAt(index) ^ hashB.charCodeAt(index);
  }

  return mismatch === 0;
}

export function saveSession(user: AuthenticatedUser): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession(): AuthenticatedUser | null {
  const session = sessionStorage.getItem(SESSION_KEY);

  if (!session) {
    return null;
  }

  try {
    const parsed = JSON.parse(session) as AuthenticatedUser;

    if (!parsed.email || !parsed.name || !parsed.role) {
      return null;
    }

    return parsed;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
