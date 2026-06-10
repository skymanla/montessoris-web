'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchSessionHistory,
  sendChatMessage,
} from './chatApi';
import { loadStoredSessionId, persistSessionId } from './chatStorage';

export type ChatStatus = 'idle' | 'thinking' | 'error' | 'restoring';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
  followUps?: string[];
}

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    '안녕하세요 :) 몬테소리 상담이에요. 요즘 아이를 지켜보며 어떤 점이 궁금하셨어요?',
};

export function useChatSession() {
  const [sessionId, setSessionId] = useState<string | null>(() => loadStoredSessionId());
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [status, setStatus] = useState<ChatStatus>(sessionId ? 'restoring' : 'idle');
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const seqRef = useRef(1);

  const nextId = () => `m-${seqRef.current++}`;

  // 새로고침/재방문 시 localStorage 의 sessionId 로 이전 대화 흐름을 한 번 복원.
  // 세션이 사라졌으면 조용히 welcome 만 남기고 새 흐름으로 시작.
  // StrictMode 의 mount→cleanup→재mount 로 첫 fetch 가 abort 될 수 있으니,
  // abort 로 인한 실패에는 sessionId 를 지우지 않는다(재mount 가 다시 복원).
  useEffect(() => {
    const stored = loadStoredSessionId();
    if (!stored) return;

    const controller = new AbortController();
    fetchSessionHistory({ sessionId: stored, signal: controller.signal })
      .then((history) => {
        if (controller.signal.aborted) return;
        if (history && history.messages.length > 0) {
          setSessionId(history.sessionId);
          persistSessionId(history.sessionId);
          setMessages([WELCOME, ...history.messages]);
        } else {
          persistSessionId(null);
          setSessionId(null);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        if (controller.signal.aborted) return;
        persistSessionId(null);
        setSessionId(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setStatus('idle');
      });

    return () => controller.abort();
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === 'thinking' || status === 'restoring') return;

      const userMsg: ChatMessage = { id: nextId(), role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setStatus('thinking');
      setError(null);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const { sessionId: newSid, content, followUps } = await sendChatMessage({
          sessionId,
          userMessage: trimmed,
          signal: controller.signal,
        });
        if (newSid && newSid !== sessionId) {
          setSessionId(newSid);
          persistSessionId(newSid);
        }
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: 'assistant', content, followUps },
        ]);
        setStatus('idle');
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        const message = e instanceof Error ? e.message : '잠시 후 다시 이야기 나눠요.';
        setError(message);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: 'assistant', content: message, isError: true },
        ]);
        setStatus('error');
      }
    },
    [sessionId, status],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    persistSessionId(null);
    setSessionId(null);
    setMessages([WELCOME]);
    setStatus('idle');
    setError(null);
  }, []);

  return { sessionId, messages, status, error, send, reset };
}
