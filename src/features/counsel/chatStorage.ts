import { SITE_CODE } from './counselConfig';

const CLIENT_SESSION_STORAGE_KEY = 'montessoris-counsel.clientSessionKey';
const SESSION_ID_STORAGE_KEY = `montessoris-counsel.sessionId.${SITE_CODE}`;

// 익명 위젯 남용 차단(rate-limit)의 두 번째 축. 브라우저별로 한 번 생성해 유지.
export const CLIENT_SESSION_KEY = ((): string => {
  try {
    // 정적 export 프리렌더(서버)에서는 window 가 없다.
    if (typeof window === 'undefined') return `cs-${Date.now()}`;
    let value = window.localStorage.getItem(CLIENT_SESSION_STORAGE_KEY);
    if (!value) {
      value = `cs-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem(CLIENT_SESSION_STORAGE_KEY, value);
    }
    return value;
  } catch {
    return `cs-${Date.now()}`;
  }
})();

export function loadStoredSessionId(): string | null {
  try {
    return window.localStorage.getItem(SESSION_ID_STORAGE_KEY) || null;
  } catch {
    return null;
  }
}

export function persistSessionId(sessionId: string | null): void {
  try {
    if (sessionId) window.localStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId);
    else window.localStorage.removeItem(SESSION_ID_STORAGE_KEY);
  } catch {
    /* localStorage 차단 환경에서는 메모리에만 유지한다. */
  }
}
