import { sendGTMEvent } from "@next/third-parties/google"

/**
 * GA4 이벤트 계측 헬퍼 (GTM `dataLayer` 경유).
 *
 * 설계 원칙 (docs/analytics/gtm-tagging-plan.md 참고):
 * - 이벤트명·파라미터명은 GA4 규칙에 맞춘 snake_case.
 * - 페이지뷰는 여기서 보내지 않는다. GA4 Enhanced Measurement의
 *   "browser history 기반 페이지뷰"가 App Router 라우팅을 커버하므로,
 *   수동 page_view 를 추가하면 이중 집계된다.
 * - 모든 호출부는 'use client' 컴포넌트의 effect/handler 안 → 클라이언트에서만 실행.
 *
 * GTM(GTM-PZRT52KL)은 프로덕션에서만 마운트되지만, sendGTMEvent 는
 * window.dataLayer 를 안전하게 초기화하므로 환경 게이팅 없이 호출해도 무해하다.
 */

type GtmParams = Record<string, string | number | boolean | undefined>

function track(event: string, params: GtmParams = {}) {
  // undefined 값은 dataLayer 를 어지럽히지 않도록 제거
  const clean: GtmParams = {}
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) clean[k] = v
  }
  sendGTMEvent({ event, ...clean })
}

/* ── 상담 위젯 (AI 육아 상담) ─────────────────────────────── */

/** 홈 등에서 상담 CTA 클릭 (전환의 출처 파악용). */
export function trackCounselCtaClick(location: "hero" | "home_mockup" | string) {
  track("counsel_cta_click", { cta_location: location })
}

/** 상담 패널이 열림 (데스크톱 팝업 또는 /counsel 페이지). */
export function trackCounselOpen(surface: "popup" | "page") {
  track("counsel_open", { counsel_surface: surface })
}

/** 사용자가 상담 메시지를 전송. index 는 이번 방문에서의 누적 전송 수. */
export function trackCounselMessageSent(index: number, resumed: boolean) {
  track("counsel_message_sent", {
    counsel_message_index: index,
    counsel_resumed: resumed,
  })
}

/**
 * 이번 방문에서 첫 메시지를 전송 = 상담 대화 시작 (KEY EVENT).
 * resumed=true 는 이전 세션을 복원한 뒤 이어서 보낸 경우.
 * "신규 대화만" 전환으로 세고 싶으면 GA4에서 counsel_resumed=false 로 제한.
 */
export function trackCounselConversationStarted(resumed: boolean) {
  track("counsel_conversation_started", { counsel_resumed: resumed })
}

/** 상담사(AI) 응답 수신 성공. */
export function trackCounselReplyReceived(index: number) {
  track("counsel_reply_received", { counsel_message_index: index })
}

/** 상담 응답 실패 (품질 지표). */
export function trackCounselError(message: string) {
  track("counsel_error", { counsel_error_message: message.slice(0, 100) })
}

/** "새 대화" 로 세션 초기화. */
export function trackCounselReset() {
  track("counsel_reset")
}

/* ── 3D 교구 체험 (/experience) ───────────────────────────── */

/** 교구 체험 씬이 성공적으로 로드됨 = 체험 시작. */
export function trackExperienceStart(material: string, materialName?: string) {
  track("experience_start", {
    experience_material: material,
    experience_material_name: materialName,
  })
}

/** 첫 조각을 배치 = 실제 상호작용 시작 (이탈이 아님). 세션당 1회. */
export function trackExperienceFirstInteraction(material: string) {
  track("experience_first_interaction", { experience_material: material })
}

/** 교구 완성 (KEY EVENT). */
export function trackExperienceComplete(material: string, pieces: number) {
  track("experience_complete", {
    experience_material: material,
    experience_pieces: pieces,
  })
}

/** WebGL 미지원 등으로 체험 로드 실패 (품질 지표). */
export function trackExperienceLoadFailed(material: string) {
  track("experience_load_failed", { experience_material: material })
}

/* ── 콘텐츠 (블로그) ──────────────────────────────────────── */

/** 블로그 글 진입. */
export function trackBlogView(slug: string, title: string, date?: string) {
  track("blog_view", {
    content_type: "blog",
    content_slug: slug,
    content_title: title,
    content_date: date,
  })
}

/** 글을 실제로 읽음: 60% 스크롤 또는 45초 체류 (KEY EVENT). 글당 1회. */
export function trackBlogRead(
  slug: string,
  title: string,
  trigger: "scroll" | "dwell",
) {
  track("blog_read", {
    content_type: "blog",
    content_slug: slug,
    content_title: title,
    read_trigger: trigger,
  })
}
