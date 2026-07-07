# GEO — 정의 Front-loading (적용 완료)

montessoris.net GEO 오디트 #1 개선안("정의 front-loading")을 코드에 반영한 기록입니다.

> **왜:** AI 인용의 ~44%가 페이지 상위 30%에서 발생하고, 정의형("~란?") 쿼리는 AI Overviews·ChatGPT·Perplexity가 가장 잘 인용하는 유형입니다. 23개 정의형 페이지의 도입부를 *맥락 없이도 인용 가능한 직접 답*으로 시작하도록 만들었습니다.

## 문서
- `GEO-ANALYSIS.md` — GEO 오디트 원본 (점수 60/100, 개선안)
- `GEO-FRONTLOAD-REWRITE.md` — 23개 페이지 정의 리드/블록/FAQ/DefinedTerm 카탈로그 (사람용 복붙 소스)

## 콘텐츠 생성 방식
페이지별 **fetch → 초안 → (AMS/AMI 교육학 critic + GEO citability critic 적대 검증) → 에디터 최종화** 파이프라인(115 에이전트). 정확도 22/23 high, 1/23 medium(`experience-number-rods`, 검수 후 정확 확인).

## 추가된 코드

| 파일 | 역할 |
|------|------|
| `src/lib/definitions.ts` | 23개 페이지 콘텐츠 데이터 (lead + body[] + shortDef + faq[]). slug로 조회. |
| `src/components/DefinitionLead.tsx` | 도입부 정의 블록. `<DefinitionLead slug="..." />` |
| `src/components/DefinitionFaq.tsx` | 하단 FAQ (네이티브 `<details>`, 무-JS). |
| `src/lib/structured-data.ts` | `definedTermJsonLd()` + `faqPageJsonLd()` 추가 (기존 헬퍼 컨벤션 준수). |

## 페이지별 적용

| 라우트 | 정의 slug | 노출 방식 |
|--------|-----------|-----------|
| `/montessori/` | `montessori` | 리드 + FAQ + JSON-LD |
| `/programs/` | `programs` | 리드 + FAQ + JSON-LD |
| `/benefits/[id]/` (4) | `benefits-{id}` | 리드 + FAQ + JSON-LD |
| `/blog/[slug]/` (14) | `{slug}` | 리드 + FAQ + JSON-LD (정의형 글만; 에세이형 글은 자동 제외) |
| `/experience/[material]/` (3) | `experience-{material}` | **JSON-LD만** (몰입형 3D 화면이라 본문 텍스트 슬롯 없음) |

- slug 미존재 시 컴포넌트/스키마 모두 no-op → 나머지 블로그 에세이 글은 무영향.
- 정적 export(`out/`)에서 리드 텍스트·JSON-LD가 **JS 없이** HTML에 포함됨을 확인 (AI 크롤러 수신 가능).

## 함께 반영한 사실 정정
- `src/lib/dictionaries.ts` `montessori.history.p1`: "이탈리아 **최초의** 여성 의사" → "이탈리아에서 의학 학위를 취득한 **초기 여성 의사 중 한 명**". 교육학 critic이 검증 가능한 사실 오류로 지적(에르네스티나 파페르 1877년 선례). 새 정의 리드와의 동일 페이지 모순 제거 목적.

## 사람 검수 권장 (후속)
- `montessori.elements.director_desc`의 **"Teachable Moment"**(비-몬테소리 용어) → "민감기/제시(presentation)" 프레이밍 정정 권장. (front-loading 범위 밖이라 미변경, 콘텐츠 담당 판단.)
- `dictionaries.ts`의 **"정신지체 아동"** → "발달지연/지적장애 아동" 등 현행 용어 권장. (범위 밖, 미변경.)
- `montessori-grace-courtesy`, `montessori-at-home` 인용 블록이 ~300단어로 이상 밴드(134~167)보다 김 → 첫 2~3문단만 남기고 나머지 본문 분리 고려.

## 검증
- `npm run build` ✓ (TS 통과, 48 페이지 정적 생성) · `npm run lint` ✓
