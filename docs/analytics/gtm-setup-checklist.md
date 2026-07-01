# GTM 설정 클릭 체크리스트 — `GTM-PZRT52KL`

계측 코드(`src/lib/analytics.ts`)가 `dataLayer`로 쏘는 이벤트를 GA4로 흘려보내기 위한 **GTM 컨테이너 설정** 단계별 가이드. 이벤트 정의·설계 근거는 [`gtm-tagging-plan.md`](gtm-tagging-plan.md) 참고.

작업 위치: [tagmanager.google.com](https://tagmanager.google.com) → `montessoris.net` 컨테이너.

---

## 사전 확인

- [ ] 좌측 **태그** → 기존 **GA4 구성 태그**(Google 태그 또는 "GA4 Configuration")가 있고 측정 ID `G-...`가 들어있는지 확인 (현재 GA에 데이터가 유입 중이므로 있을 것)
- [ ] 그 측정 ID를 메모 (이벤트 태그에서 재사용)

---

## STEP 1 — 데이터 영역 변수(DLV) 13개

좌측 **변수** → *사용자 정의 변수* → **새로 만들기** → 변수 구성 → **데이터 영역 변수** → *데이터 영역 변수 이름* 입력 → 이름을 `DLV - <키>`로 저장. (버전 2 기본값 유지.)

- [ ] `cta_location`
- [ ] `counsel_surface`
- [ ] `counsel_message_index`
- [ ] `counsel_resumed`
- [ ] `counsel_error_message`
- [ ] `experience_material`
- [ ] `experience_material_name`
- [ ] `experience_pieces`
- [ ] `content_type`
- [ ] `content_slug`
- [ ] `content_title`
- [ ] `content_date`
- [ ] `read_trigger`

---

## STEP 2 — 트리거 13개 (맞춤 이벤트)

좌측 **트리거** → **새로 만들기** → 트리거 구성 → **맞춤 이벤트** → *이벤트 이름* 입력 → "모든 맞춤 이벤트에서 실행" → 이름 `CE - <이벤트>` 저장.

- [ ] `counsel_cta_click`
- [ ] `counsel_open`
- [ ] `counsel_message_sent`
- [ ] `counsel_conversation_started`
- [ ] `counsel_reply_received`
- [ ] `counsel_error`
- [ ] `counsel_reset`
- [ ] `experience_start`
- [ ] `experience_first_interaction`
- [ ] `experience_complete`
- [ ] `experience_load_failed`
- [ ] `blog_view`
- [ ] `blog_read`

---

## STEP 3 — GA4 이벤트 태그

### 3.1 전체 클릭 (예시 1개 — `counsel_conversation_started`)

- [ ] 좌측 **태그** → **새로 만들기**
- [ ] *태그 구성* → **Google 애널리틱스: GA4 이벤트** 선택
- [ ] **측정 ID**: 기존 GA4 태그 선택(또는 `G-...` 직접 입력)
- [ ] **이벤트 이름**: `counsel_conversation_started` (← dataLayer 이벤트명과 **정확히 동일**)
- [ ] **이벤트 매개변수** → *행 추가*: 이름 `counsel_resumed` / 값 `{{DLV - counsel_resumed}}`
- [ ] *트리거* 영역 → `CE - counsel_conversation_started` 선택
- [ ] 태그 이름 `GA4 - Event - counsel_conversation_started` → **저장**

### 3.2 나머지 태그 — 이벤트 이름 + 매개변수 매핑만 변경

| 태그(이벤트) | 매핑할 매개변수 → 값 |
|---|---|
| `counsel_cta_click` | `cta_location` → `{{DLV - cta_location}}` |
| `counsel_open` | `counsel_surface` → `{{DLV - counsel_surface}}` |
| `counsel_message_sent` | `counsel_message_index` → `{{DLV - counsel_message_index}}`, `counsel_resumed` → `{{DLV - counsel_resumed}}` |
| `counsel_conversation_started` | `counsel_resumed` → `{{DLV - counsel_resumed}}` |
| `counsel_reply_received` | `counsel_message_index` → `{{DLV - counsel_message_index}}` |
| `counsel_error` | `counsel_error_message` → `{{DLV - counsel_error_message}}` |
| `counsel_reset` | (없음) |
| `experience_start` | `experience_material` → `{{DLV - experience_material}}`, `experience_material_name` → `{{DLV - experience_material_name}}` |
| `experience_first_interaction` | `experience_material` → `{{DLV - experience_material}}` |
| `experience_complete` | `experience_material` → `{{DLV - experience_material}}`, `experience_pieces` → `{{DLV - experience_pieces}}` |
| `experience_load_failed` | `experience_material` → `{{DLV - experience_material}}` |
| `blog_view` | `content_type`→`{{DLV - content_type}}`, `content_slug`→`{{DLV - content_slug}}`, `content_title`→`{{DLV - content_title}}`, `content_date`→`{{DLV - content_date}}` |
| `blog_read` | `content_type`→`{{DLV - content_type}}`, `content_slug`→`{{DLV - content_slug}}`, `content_title`→`{{DLV - content_title}}`, `read_trigger`→`{{DLV - read_trigger}}` |

> **태그 축소(선택):** 내장 변수 `{{Event}}`를 켜고 GA4 이벤트 태그 1개의 이벤트 이름에 `{{Event}}`를 넣은 뒤, 정규식 트리거(`^(counsel_|experience_|blog_)`) 하나로 실행하는 방식도 가능. 다만 매개변수가 이벤트마다 달라 초기 디버깅은 이벤트별 태그가 편함.

---

## STEP 4 — 미리보기 검증 (게시 전 필수)

- [ ] 우상단 **미리보기** → `https://montessoris.net` 입력 → Tag Assistant 연결
- [ ] 동작 수행: 상담 CTA 클릭 → 위젯 열기 → 메시지 전송 / `/experience/pink-tower` 진입·조각 배치·완성 / 블로그 글 60% 스크롤
- [ ] Tag Assistant에 `counsel_*` `experience_*` `blog_*` 이벤트가 뜨고 각 GA4 태그가 **Fired**인지 확인
- [ ] 별도 탭 **GA4 → 관리 → DebugView** 에서 이벤트 + 매개변수 도착 확인

> ⚠️ GTM은 **프로덕션에서만** 로드됨(`src/app/layout.tsx`의 `isProduction` 조건). 로컬 `next dev`가 아니라 배포된 `montessoris.net`에서 테스트할 것.

---

## STEP 5 — 게시

- [ ] 우상단 **제출(Submit)** → 버전 이름 예: `analytics events v1` → **게시(Publish)**

---

## STEP 6 — GA4 설정 (GTM 아님 · [analytics.google.com](https://analytics.google.com))

**핵심 이벤트 표시** — 관리 → **핵심 이벤트** → *새 핵심 이벤트* → 이름 입력:

- [ ] `counsel_conversation_started`
- [ ] `experience_complete`
- [ ] `blog_read`

**맞춤 측정기준 등록** (범위: **이벤트**) — 관리 → 맞춤 정의 → *맞춤 측정기준* → 만들기:

- [ ] `cta_location`
- [ ] `counsel_surface`
- [ ] `counsel_resumed`
- [ ] `content_slug`
- [ ] `content_title`
- [ ] `content_date`
- [ ] `read_trigger`
- [ ] `content_type`
- [ ] `experience_material`
- [ ] `counsel_error_message`

**맞춤 측정항목** (숫자, 범위: 이벤트 · 선택):

- [ ] `counsel_message_index`
- [ ] `experience_pieces`

> DebugView에 이벤트가 보여도 **맞춤 측정기준을 등록해야** 표준 리포트/탐색에서 매개변수별 분석 가능. 등록 이후 유입분부터 채워짐(소급 아님).

---

## 완료 후

- 1~2주 데이터 확인 → 상담 시작률(방문 대비 `counsel_conversation_started`), 글 읽음률(`blog_read`/`blog_view`), 체험 완성률(`experience_complete`/`experience_start`) 리포트 구성.
- 중국 유입 과소집계 주의는 [`gtm-tagging-plan.md`](gtm-tagging-plan.md) §7 참고.
