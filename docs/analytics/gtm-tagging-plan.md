# GTM 태깅 플랜 — montessoris.net

**버전:** 1.0 · **작성일:** 2026-07-01 · **상태:** 구현 착수용
**대상:** 개발자(이벤트 계측) + 운영/마케터(GTM·GA4 설정)

---

## 1. 스코프 & 전제

| 항목 | 내용 |
|---|---|
| 사이트 | montessoris.net — 한국어 몬테소리 교육정보 + 24H AI 육아 상담 위젯 |
| 스택 | Next.js 16 App Router, **정적 export**(`output: 'export'`), 단일 로케일 `ko-KR` |
| 태그 관리 | GTM `GTM-PZRT52KL` (`@next/third-parties/google`의 `GoogleTagManager`, **프로덕션만** 마운트) |
| 분석 목적지 | **GA4**(GTM의 GA4 구성 태그 경유). AdSense 탑재(현재 토글). **Google Ads 전환추적 없음** |
| 이커머스 | **없음** (장바구니·구매·거래 없음) → 콘텐츠·인게이지먼트 측정 모델 |
| 트래픽 | 한국 위주, GA상 미국·중국 유입도 존재 (→ §7 국제 트래픽 주의) |
| 로그인/CRM | 없음. 상담은 익명 `sessionId`를 localStorage에 보관 (개인식별 아님) |

**최우선 목표(= GA4 key event로 셀 것):**
1. **AI 상담 위젯 참여** — `counsel_conversation_started`
2. **콘텐츠(블로그) 소비 깊이** — `blog_read`
3. **3D 교구 체험 참여** — `experience_complete`

> AdSense 수익은 이번 전환 목표가 아님(별도 AdSense 리포트로 관리). 단, 콘텐츠·체험 인게이지먼트 향상이 곧 페이지 품질·체류로 이어져 AdSense에도 간접 기여.

---

## 2. 측정 계획

### 2.1 목표 → KPI → 이벤트

| 비즈니스 목표 | KPI | 이벤트 |
|---|---|---|
| AI 상담 활성화 | 상담 시작 수, 시작률(방문 대비), 대화당 메시지 수 | `counsel_cta_click` → `counsel_open` → `counsel_conversation_started` → `counsel_message_sent` |
| 상담 품질/안정성 | 응답 성공률, 오류율 | `counsel_reply_received`, `counsel_error` |
| 콘텐츠·SEO 성장 | 글 조회수, **읽음(60%/45s)** 비율, 재방문 | `blog_view`, `blog_read` |
| 3D 교구 체험 | 체험 시작·상호작용·완성률 | `experience_start`, `experience_first_interaction`, `experience_complete` |
| 체험 기술 안정성 | WebGL 실패율 | `experience_load_failed` |

### 2.2 이벤트 → 목적지 매트릭스

모든 이벤트는 **GA4** 단일 목적지. "Key event"는 GA4에서 핵심 이벤트로 표시.

| # | 이벤트 | GA4 key event | 발화 시점 | 주요 파라미터 |
|---|---|:---:|---|---|
| 1 | `counsel_cta_click` | | 홈 상담 CTA 클릭 | `cta_location` |
| 2 | `counsel_open` | | 상담 패널 열림 | `counsel_surface` |
| 3 | `counsel_message_sent` | | 사용자가 메시지 전송 | `counsel_message_index`, `counsel_resumed` |
| 4 | **`counsel_conversation_started`** | ✅ | 이번 방문 첫 전송 | `counsel_resumed` |
| 5 | `counsel_reply_received` | | AI 응답 성공 | `counsel_message_index` |
| 6 | `counsel_error` | | 응답 실패 | `counsel_error_message` |
| 7 | `counsel_reset` | | "새 대화" | — |
| 8 | `experience_start` | | 교구 씬 로드 성공 | `experience_material`, `experience_material_name` |
| 9 | `experience_first_interaction` | | 첫 조각 배치 | `experience_material` |
| 10 | **`experience_complete`** | ✅ | 교구 완성 | `experience_material`, `experience_pieces` |
| 11 | `experience_load_failed` | | WebGL 미지원 등 | `experience_material` |
| 12 | `blog_view` | | 글 진입 | `content_slug`, `content_title`, `content_date` |
| 13 | **`blog_read`** | ✅ | 60% 스크롤 또는 45s 체류 | `content_slug`, `content_title`, `read_trigger` |

**페이지뷰**는 커스텀으로 보내지 않음. GA4 **Enhanced Measurement의 "브라우저 히스토리 기반 페이지뷰"**가 App Router 클라이언트 라우팅을 자동 집계함. → 수동 `page_view`를 추가하면 **이중 집계**되므로 금지.

---

## 3. 이벤트 계약 (코드에서 이미 방출 중)

계측은 `src/lib/analytics.ts`의 타입드 헬퍼(`sendGTMEvent` 래퍼)로 통일. 각 이벤트는 `dataLayer`에 `{ event: '<name>', ...params }` 형태로 push됨. 값에 **PII 없음**(이메일·전화·상담 내용·sessionId 미전송).

| 이벤트 / 파라미터 | 타입 | 설명 | 계측 위치 |
|---|---|---|---|
| **counsel_cta_click** | | | `HeroSection.tsx`, `CounselMockupSection.tsx` |
|  `cta_location` | string | `hero` \| `home_mockup` | |
| **counsel_open** | | | `CounselWidget.tsx` (`CounselPanel` mount) |
|  `counsel_surface` | string | `popup`(데스크톱) \| `page`(/counsel) | |
| **counsel_message_sent** | | | `useChatSession.ts` `send()` |
|  `counsel_message_index` | number | 이번 방문 누적 전송 수(1,2,3…) | |
|  `counsel_resumed` | boolean | 이전 세션 복원 후 이어쓴 경우 true | |
| **counsel_conversation_started** ✅ | | 이번 방문 첫 전송(=대화 시작) | `useChatSession.ts` `send()` |
|  `counsel_resumed` | boolean | 신규 대화만 셀 땐 GA4에서 `=false`로 제한 | |
| **counsel_reply_received** | | AI 응답 성공 | `useChatSession.ts` |
| **counsel_error** | | 응답 실패 | `useChatSession.ts` (catch) |
|  `counsel_error_message` | string | 오류 메시지(100자 컷) | |
| **counsel_reset** | | "새 대화" 초기화 | `useChatSession.ts` `reset()` |
| **experience_start** | | 씬 로드 성공 | `ExperienceClient.tsx` |
|  `experience_material` | string | 교구 slug (`pink-tower` 등) | |
|  `experience_material_name` | string | 교구 표시명 | |
| **experience_first_interaction** | | 첫 조각 배치(세션 1회) | `ExperienceClient.tsx` `onProgress` |
| **experience_complete** ✅ | | 교구 완성 | `ExperienceClient.tsx` `onComplete` |
|  `experience_pieces` | number | 총 조각 수 | |
| **experience_load_failed** | | WebGL 미지원 등 로드 실패 | `ExperienceClient.tsx` (catch) |
| **blog_view** | | 글 진입 | `ArticleAnalytics.tsx` (mount) |
|  `content_slug` / `content_title` / `content_date` | string | 글 식별/제목/발행일 | |
|  `content_type` | string | 고정값 `blog` | |
| **blog_read** ✅ | | 60% 스크롤 또는 45s 체류(글당 1회) | `ArticleAnalytics.tsx` |
|  `read_trigger` | string | `scroll` \| `dwell` | |

---

## 4. GTM 컨테이너 설정 (운영자가 GTM UI에서 구성)

> 전제: GTM `GTM-PZRT52KL` 안에 **GA4 구성(Google 태그)이 이미 존재**(현재 GA에 데이터 유입 중). 아래는 위 커스텀 이벤트를 GA4로 흘리기 위한 **추가** 작업.

### 4.1 명명 규칙

| 요소 | 규칙 | 예 |
|---|---|---|
| 태그 | `GA4 - Event - <event>` | `GA4 - Event - counsel_conversation_started` |
| 트리거 | `CE - <event>` | `CE - counsel_conversation_started` |
| 변수 | `DLV - <key>` | `DLV - counsel_surface` |

### 4.2 변수 (Data Layer Variable, 버전2)

각 파라미터 키마다 DLV 생성:
`cta_location`, `counsel_surface`, `counsel_message_index`, `counsel_resumed`, `counsel_error_message`,
`experience_material`, `experience_material_name`, `experience_pieces`,
`content_slug`, `content_title`, `content_date`, `content_type`, `read_trigger`.

### 4.3 트리거

이벤트당 **맞춤 이벤트(Custom Event) 트리거** 1개. 이벤트 이름 = 위 표의 이벤트명 그대로.
(예: 트리거 유형 "맞춤 이벤트", 이벤트 이름 `blog_read`.)

### 4.4 태그

이벤트당 **GA4 이벤트 태그** 1개:
- 유형: *Google 애널리틱스: GA4 이벤트*
- 구성 태그: 기존 GA4 Google 태그
- 이벤트 이름: 해당 이벤트명(예: `counsel_conversation_started`)
- 이벤트 매개변수: 위 표의 파라미터를 각 DLV로 매핑
- 트리거: 대응 `CE - <event>`
- 동의 설정: `analytics_storage`(§6)

> 태그 수를 줄이려면, 이벤트명이 이미 GA4 규격 snake_case이므로 **범용 GA4 이벤트 태그 1개**로 `{{Event}}`(내장 변수)를 이벤트 이름에 바인딩하고, 관련 이벤트를 정규식 트리거(`^(counsel_|experience_|blog_)`)로 잡는 방식도 가능. 다만 파라미터 매핑이 이벤트마다 달라 초기엔 이벤트별 태그가 디버깅에 유리.

---

## 5. GA4 속성 설정

| 설정 | 조치 |
|---|---|
| 핵심 이벤트 | `counsel_conversation_started`, `blog_read`, `experience_complete` 를 **핵심 이벤트**로 표시 |
| 맞춤 측정기준(이벤트 범위) | `cta_location`, `counsel_surface`, `counsel_resumed`, `content_slug`, `content_title`, `read_trigger`, `experience_material` 등록(리포트에서 쓰려면 필수) |
| 맞춤 측정항목 | `counsel_message_index`, `experience_pieces` (필요 시) |
| 향상된 측정(Enhanced Measurement) | **"브라우저 기록 이벤트 기반 페이지뷰" ON 유지**(SPA 라우팅 집계). 스크롤 측정은 우리 `blog_read`와 목적이 다르니 그대로 두되 중복 해석 주의 |
| 지역/언어 | 별도 설정 불필요(자동). 미국·중국 세그먼트는 리포트에서 국가 기준 분석 |
| 내부 트래픽 | 운영자 IP 필터 정의 후 활성화(테스트 유입 제외) |
| 데이터 보관 | 14개월(표준 최대) 권장 |
| PII | 이벤트 파라미터에 이메일/전화/상담 내용 **없음**(설계상 미전송) — 유지 |

---

## 6. 동의(Consent) & 개인정보

- **Consent Mode v2 권장.** EEA/영국 트래픽은 적을 것으로 보이나, **AdSense(개인화 광고)**를 켜는 경우와 국제 트래픽을 감안하면 도입이 안전. 인증 CMP + 기본 `denied` → 사용자 선택 시 `update`, GTM 로드 **이전**에 설정.
  - GA4 태그: `analytics_storage`
  - AdSense/광고: `ad_storage`, `ad_user_data`, `ad_personalization`
- **한국(PIPA)·미국 주법(CCPA/CPRA 등)** 고려: 최소한 개인정보처리방침에 GA4/GTM/AdSense 사용과 쿠키 고지. `/privacy` 페이지 존재하므로 문구 반영 권장.
- **상담 위젯 개인정보:** 상담 텍스트는 GA4가 아니라 외부 API(`ai-api.trigger.kr`)로 전송됨. 이는 분석 태깅과 별개지만, 처리방침에 외부 처리 사실을 명시할 것. 분석 이벤트에는 상담 내용/식별자가 담기지 않음(가드레일).

---

## 7. 국제 트래픽 주의 (미국 · 중국)

- **중국(핵심 주의):** `googletagmanager.com` / `google-analytics.com` 은 중국 본토에서 **차단·불안정(GFW)**. 따라서 **중국 유입은 GA4에서 구조적으로 과소집계**되고, 중국 사용자의 상담/체험 이벤트도 상당수 누락될 수 있음.
  - 조치: (a) GA4 "국가=중국" 데이터는 **실제보다 적다고 해석**. (b) 서버 접속 로그(정적 호스팅/CDN) 대비 GA 세션 수를 비교해 누락 폭을 가늠. (c) 중국 오디언스가 사업적으로 중요해지면 **서버사이드 태깅(1st-party 도메인)** 또는 중국권 분석(예: Baidu Tongji) 도입 검토.
- **미국:** GA/GTM 정상 작동. 콘텐츠가 한국어이므로 재외 한국인일 가능성 높음 — 리포트에서 `언어/국가` 세그먼트로 콘텐츠 수요 파악. 주(state) 개인정보법 대비는 §6의 동의/고지로 커버.
- 한국어 단일 사이트라 **i18n·hreflang 확장은 현재 불필요**하나, 재외 수요가 크면 콘텐츠 전략 차원에서 별도 검토.

---

## 8. QA / 검증

도구: **GTM 미리보기(Tag Assistant) + GA4 DebugView**. (프로덕션에서만 GTM이 로드되므로 스테이징/프로덕션에서 검증.)

| 이벤트 | 재현 방법 | 통과 기준 |
|---|---|---|
| counsel_cta_click | 홈 히어로/상담섹션 CTA 클릭 | `cta_location` 정확 |
| counsel_open | 런처(우하단) 또는 /counsel 진입 | `counsel_surface` popup/page 구분, 1회 |
| counsel_conversation_started | 첫 메시지 전송 | 방문당 1회, `counsel_resumed` 정확 |
| counsel_message_sent | 여러 번 전송 | `counsel_message_index` 증가 |
| counsel_reply_received / error | 정상/네트워크 차단 상태 전송 | 각 분기에서 발화 |
| experience_start / first_interaction / complete | /experience/pink-tower 진입 → 조각 배치 → 완성 | 순서대로, 완성 시 `experience_pieces` |
| experience_load_failed | WebGL 미지원 브라우저 | 발화 |
| blog_view / blog_read | 글 진입 → 60% 스크롤 또는 45초 | view 즉시, read 1회, `read_trigger` 정확 |
| (페이지뷰) | 페이지 이동 | 라우팅마다 1회, **이중 집계 없음** |

체크: 값에 PII 없음 · 이벤트명/파라미터명 snake_case 일치 · DebugView에 파라미터 도착.

---

## 9. 롤아웃 순서

1. **(완료) 코드 계측** — `src/lib/analytics.ts` + 상담/체험/블로그/CTA 계측.
2. GTM에서 변수(DLV) → 트리거(CE) → GA4 이벤트 태그 생성(§4). 워크스페이스 1건, 버전명 명시.
3. GTM 미리보기 + GA4 DebugView로 §8 매트릭스 검증.
4. 컨테이너 게시(프로덕션).
5. GA4에서 핵심 이벤트 표시 + 맞춤 측정기준 등록(§5).
6. 1~2주 데이터 확인 후, 상담 시작률·글 읽음률·체험 완성률 리포트/탐색 구성.
7. (선택) 중국 누락 폭 점검(§7), AdSense 동의 연동(§6).

---

## 부록 A — 이벤트/파라미터 전체 레퍼런스

`src/lib/analytics.ts`가 단일 소스. 새 이벤트 추가 시: (1) 헬퍼 함수 추가 → (2) 컴포넌트에서 호출 → (3) 본 문서 §2–3 갱신 → (4) GTM에 DLV·트리거·태그 추가 → (5) GA4 맞춤 측정기준 등록.

**가드레일(변경 시 유지):**
- 페이지뷰는 Enhanced Measurement에 위임, 수동 `page_view` 금지(이중 집계).
- 이벤트 파라미터에 PII/상담원문/sessionId를 넣지 않는다.
- 이벤트명·파라미터명은 GA4 snake_case, 40자 이내.
- key event 후보를 늘릴 땐 발화 빈도·의미를 확인(과다 집계 방지).
