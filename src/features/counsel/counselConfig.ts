export const SITE_CODE = 'MONTESSORIS';

function resolveApiBaseUrl(): string {
  const injected = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
  if (injected) return injected.replace(/\/+$/, '');
  if (
    typeof window !== 'undefined' &&
    /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
  ) {
    return 'http://localhost:8080';
  }
  return 'https://ai-api.trigger.kr';
}

export const API_BASE_URL = resolveApiBaseUrl();

export const counselConfig = { SITE_CODE, API_BASE_URL };
