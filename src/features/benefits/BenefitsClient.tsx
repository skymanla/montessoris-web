import Link from "next/link"
import { getDefaultDictionary } from "@/lib/dictionaries"
import { PageHeader } from "@/components/PageHeader"
import {
  GlyphSprout,
  GlyphCylinder,
  GlyphPair,
  GlyphTriangle,
} from "@/components/MaterialGlyph"

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

export default function BenefitsClient() {
  return (
    <div className="pt-16">
      <PageHeader title={dict.benefits.title} subtitle={dict.benefits.subtitle} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {dict.benefits.items.map((item: BenefitItem) => {
            const Glyph = glyphs[item.id] ?? GlyphSprout
            return (
              <Link
                key={item.id}
                href={`/benefits/${item.id}`}
                className="group flex flex-col rounded-xl border border-ink/10 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-[0_18px_44px_-26px_rgba(38,64,47,0.4)]"
              >
                <div className="flex items-start justify-between">
                  <Glyph className="text-sage" />
                  <span
                    aria-hidden
                    className="text-ink/30 transition-colors group-hover:text-sage-deep"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
                <h2 className="mt-6 font-display text-2xl font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="mt-3 leading-relaxed text-ink/70">{item.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep">
                  자세히 보기
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
