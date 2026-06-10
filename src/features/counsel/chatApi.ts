import { API_BASE_URL, SITE_CODE } from './counselConfig';
import { CLIENT_SESSION_KEY } from './chatStorage';

export interface ChatReply {
  sessionId: string | null;
  content: string;
  followUps: string[];
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

function extractFollowUps(json: unknown): string[] {
  const response = (json as { response?: { followUps?: unknown } } | null)?.response;
  const raw = response?.followUps;
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .slice(0, 3);
}

/**
 * 상담 메시지 1건 전송. 네트워크 실패/비2xx 는 한국어 메시지로 throw.
 * 모델명·raw payload 는 클라이언트 경계에서 의도적으로 버린다.
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
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
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
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
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
          (message) =>
            (message.role === 'user' || message.role === 'assistant') &&
            typeof message.content === 'string' &&
            message.content.trim().length > 0,
        )
        .map((message) => ({
          id: `db-${message.messageId}`,
          role: message.role as 'user' | 'assistant',
          content: message.content,
        })),
    };
  } catch {
    return null;
  }
}
