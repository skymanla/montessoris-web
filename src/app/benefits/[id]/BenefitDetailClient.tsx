import Link from "next/link"
import { getDefaultDictionary } from "@/lib/dictionaries"
import {
  GlyphSprout,
  GlyphCylinder,
  GlyphPair,
  GlyphTriangle,
} from "@/components/MaterialGlyph"
import DefinitionLead from "@/components/DefinitionLead"
import DefinitionFaq from "@/components/DefinitionFaq"

const dict = getDefaultDictionary()

interface BenefitItem {
  id: string
  title: string
  desc: string
  content: string
}

const glyphs: Record<string, (p: { className?: string }) => React.ReactElement> = {
  independence: GlyphSprout,
  concentration: GlyphCylinder,
  "social-emotional": GlyphPair,
  creativity: GlyphTriangle,
}

export default function BenefitDetailClient({ id }: { id: string }) {
  const benefit = dict.benefits.items.find((item: BenefitItem) => item.id === id)

  if (!benefit) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Benefit not found
        </h1>
        <Link href="/benefits" className="mt-4 inline-block text-sage-deep hover:underline">
          돌아가기
        </Link>
      </div>
    )
  }

  const Glyph = glyphs[benefit.id] ?? GlyphSprout

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-24 pt-16">
        <Link
          href="/benefits"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-ink/55 transition-colors hover:text-ink"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          목록으로 돌아가기
        </Link>

        <article>
          <header className="mb-12">
            <Glyph className="h-12 w-12 text-sage" />
            <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              {benefit.title}
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-ink/60">{benefit.desc}</p>
          </header>

          {/* 정의 front-load — 이 장점이 무엇인지/어떻게 길러지는지 직접 답. */}
          <DefinitionLead slug={`benefits-${id}`} className="mb-12" />

          <div className="prose prose-neutral max-w-none prose-p:leading-relaxed prose-p:text-ink/75">
            <p className="whitespace-pre-line text-lg">{benefit.content}</p>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <DefinitionFaq slug={`benefits-${id}`} />
          </div>

          <div className="mt-16 rounded-2xl bg-linen p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-ink">
              함께 확인해보세요
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {dict.benefits.items
                .filter((item: BenefitItem) => item.id !== id)
                .map((item: BenefitItem) => {
                  const G = glyphs[item.id] ?? GlyphSprout
                  return (
                    <Link
                      key={item.id}
                      href={`/benefits/${item.id}`}
                      className="flex items-center gap-3 rounded-lg border border-ink/10 bg-white px-4 py-3.5 transition-colors hover:border-sage/50"
                    >
                      <G className="h-7 w-7 shrink-0 text-sage" />
                      <span className="font-semibold text-ink">{item.title}</span>
                    </Link>
                  )
                })}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
