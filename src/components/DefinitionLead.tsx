// DefinitionLead — 페이지 도입부에 "정의 front-loading" 블록을 렌더합니다.
// H1 바로 아래 첫 콘텐츠로 배치해, 정의형("~란?") 검색 쿼리에 대한 직접 답을
// 페이지 상위 30%(=AI 인용의 ~44%가 발생하는 구간)에 노출합니다.
//
// 사용법:
//   <DefinitionLead slug="montessori" />        // definitions.ts에서 조회
//   <DefinitionLead entry={customEntry} />       // 직접 주입

import { getDefinition, type DefinitionEntry } from "@/lib/definitions"

type Props =
  | { slug: string; entry?: never; className?: string }
  | { entry: DefinitionEntry; slug?: never; className?: string }

export default function DefinitionLead({ slug, entry, className }: Props) {
  const def = entry ?? (slug ? getDefinition(slug) : undefined)
  if (!def) return null

  return (
    <section
      aria-label={`${def.term} 정의`}
      className={[
        "not-prose border-l-2 border-pine/60 pl-5 sm:pl-6",
        className ?? "",
      ].join(" ")}
    >
      {/* ① 직접 정의 — 페이지의 첫 문장. 굵게, 크게. 맥락 0에서도 완결. */}
      <p className="font-display text-lg leading-relaxed font-semibold text-ink sm:text-xl">
        {def.lead}
      </p>

      {/* ② 뒷받침 문단 — 자기완결 인용 블록을 구성 */}
      {def.body.map((para, i) => (
        <p key={i} className="mt-4 leading-relaxed text-ink/80">
          {para}
        </p>
      ))}
    </section>
  )
}
