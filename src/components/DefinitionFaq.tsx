// DefinitionFaq — 페이지 하단 FAQ 블록 (질문형 헤딩 = AI 검색 쿼리 패턴 정합).
// 네이티브 <details>로 무-JS 아코디언 → 내용은 정적 HTML(DOM)에 상존해 크롤러/AI가 읽습니다.
// FAQPage 스키마는 lib/structured-data.ts의 faqPageJsonLd()로 별도 주입하세요.
//
// 사용법:
//   <DefinitionFaq slug="montessori" />
//   <DefinitionFaq items={def.faq} />

import { getDefinition, type FaqItem } from "@/lib/definitions"

type Props =
  | { slug: string; items?: never; heading?: string }
  | { items: FaqItem[]; slug?: never; heading?: string }

export default function DefinitionFaq({ slug, items, heading = "자주 묻는 질문" }: Props) {
  const faq = items ?? (slug ? getDefinition(slug)?.faq : undefined)
  if (!faq || faq.length === 0) return null

  return (
    <section aria-label={heading} className="not-prose border-t border-ink/10 pt-10">
      <h2 className="mb-6 font-display text-2xl font-semibold text-ink">{heading}</h2>
      <dl className="divide-y divide-ink/10">
        {faq.map((item, i) => (
          <details key={i} className="group py-4" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <dt className="font-medium text-ink">{item.q}</dt>
              <span
                aria-hidden
                className="shrink-0 text-ink/40 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <dd className="mt-3 leading-relaxed text-ink/80">{item.a}</dd>
          </details>
        ))}
      </dl>
    </section>
  )
}
