// 몬테소리스 상담 API 클라이언트.
// 브라우저가 common-api 의 사이트별 챗 엔드포인트(POST /api/sites/MONTESSORIS/chat/completions)를 직접 호출한다.
//
// 베이스 URL 우선순위:
//   1) 빌드 시 주입된 NEXT_PUBLIC_API_BASE_URL (배포 환경별로 고정)
//   2) localhost/127.0.0.1 에서 열렸으면 dev 백엔드(http://localhost:8080)
//   3) 그 외(상용)는 https://ai-api.trigger.kr
const SITE_CODE = 'MONTESSORIS';

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

const API_BASE_URL = resolveApiBaseUrl();

// 익명 위젯 남용 차단(rate-limit)의 두 번째 축. 브라우저별로 한 번 생성해 유지.
const CLIENT_SESSION_KEY = ((): string => {
  const KEY = 'montessoris-counsel.clientSessionKey';
  try {
    // 정적 export 프리렌더(서버)에서는 window 가 없다 — 던지고-잡는 대신 명시적으로 분기.
    if (typeof window === 'undefined') return `cs-${Date.now()}`;
    let v = window.localStorage.getItem(KEY);
    if (!v) {
      v = `cs-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem(KEY, v);
    }
    return v;
  } catch {
    return `cs-${Date.now()}`;
  }
})();

const SESSION_ID_STORAGE_KEY = `montessoris-counsel.sessionId.${SITE_CODE}`;

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
    /* localStorage 차단 환경 — 메모리에만 유지 */
  }
}

export interface ChatReply {
  sessionId: string | null;
  content: string;
  followUps: string[];
}

function extractFollowUps(json: unknown): string[] {
  const response = (json as { response?: { followUps?: unknown } } | null)?.response;
  const raw = response?.followUps;
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
    .slice(0, 3);
}

/**
 * 상담 메시지 1건 전송. 네트워크 실패/비2xx 는 한국어 메시지로 throw.
 * 모델명·raw payload 는 클라이언트 경계에서 의도적으로 버린다(실수로 UI 노출 방지).
 */
export async function sendChatMessage({
  sessionId,
  userMessage,
  signal,
}: {
  sessionId: string | null;
  userMessage: string;
  signal?: AbortSignal;
}): Promise<ChatReply> {
  const url = `${API_BASE_URL}/api/sites/${encodeURIComponent(SITE_CODE)}/chat/completions`;
  const body = {
    sessionId: sessionId || null,
    clientSessionKey: CLIENT_SESSION_KEY,
    messages: [{ role: 'user', content: userMessage }],
  };

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') throw e;
    throw new Error('상담 연결이 잠시 어려워요. 잠시 후 다시 시도해 주세요.');
  }

  if (response.status === 504 || response.status === 408) {
    throw new Error('답변이 조금 늦어지고 있어요. 잠시 후 다시 보내주세요.');
  }
  if (response.status === 503) {
    throw new Error('상담이 잠시 점검 중이에요. 곧 다시 열릴게요.');
  }
  if (response.status === 429) {
    throw new Error('잠깐 사이를 두고 다시 보내주실래요? 너무 빠르게 보내셨어요.');
  }
  if (!response.ok) {
    throw new Error('답변을 가져오지 못했어요. 다시 시도해 주세요.');
  }

  let json: { sessionId?: string; content?: string } & Record<string, unknown>;
  try {
    json = await response.json();
  } catch {
    throw new Error('답변을 이해하지 못했어요. 다시 시도해 주세요.');
  }

  return {
    sessionId: json.sessionId ?? null,
    content:
      typeof json.content === 'string' && json.content.trim()
        ? json.content
        : '음… 지금은 답이 잘 떠오르지 않아요. 조금 다른 이야기를 들려주실 수 있을까요?',
    followUps: extractFollowUps(json),
  };
}

export interface HistoryMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface HistoryResult {
  sessionId: string;
  messages: HistoryMessage[];
}

/**
 * 이전 세션의 대화 기록을 불러와 새로고침 후에도 흐름을 잇는다.
 * 세션이 사라졌으면(404/오류) null — 호출자는 새로 시작하면 된다.
 */
export async function fetchSessionHistory({
  sessionId,
  signal,
}: {
  sessionId: string | null;
  signal?: AbortSignal;
}): Promise<HistoryResult | null> {
  if (!sessionId) return null;
  const url = `${API_BASE_URL}/api/sites/${encodeURIComponent(SITE_CODE)}/chat/sessions/${encodeURIComponent(sessionId)}`;
  let response: Response;
  try {
    response = await fetch(url, { method: 'GET', signal });
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') throw e;
    return null;
  }
  if (response.status === 404 || !response.ok) return null;

  try {
    const json = (await response.json()) as {
      sessionId: string;
      messages?: { messageId: number; role: string; content: string }[];
    };
    const messages = Array.isArray(json.messages) ? json.messages : [];
    return {
      sessionId: json.sessionId,
      messages: messages
        .filter(
          (m) =>
            (m.role === 'user' || m.role === 'assistant') &&
            typeof m.content === 'string' &&
            m.content.trim().length > 0,
        )
        .map((m) => ({
          id: `db-${m.messageId}`,
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
    };
  } catch {
    return null;
  }
}

export const config = { SITE_CODE, API_BASE_URL };
