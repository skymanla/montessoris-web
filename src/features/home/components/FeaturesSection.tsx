import Link from "next/link"
import { getDefaultDictionary } from "@/lib/dictionaries"
import { Container } from "@/components/layout/Layout"
import { Reveal } from "@/components/Reveal"
import { GlyphTower, GlyphSprout, GlyphPair } from "@/components/MaterialGlyph"

const dict = getDefaultDictionary()

const features = [
  {
    title: dict.why.feature1_title,
    description: dict.why.feature1_desc,
    Glyph: GlyphTower,
    href: "/montessori",
    cta: "정통 교육 기준 알아보기",
  },
  {
    title: dict.why.feature2_title,
    description: dict.why.feature2_desc,
    Glyph: GlyphSprout,
    href: "/programs",
    cta: "연령별 프로그램 정보",
  },
  {
    title: dict.why.feature3_title,
    description: dict.why.feature3_desc,
    Glyph: GlyphPair,
    href: "/benefits",
    cta: "부모 코칭 혜택 보기",
  },
]

export function FeaturesSection() {
  return (
    <section id="about" className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink">
            {dict.why.title}
          </h2>
          <p className="mt-4 leading-relaxed text-ink/65">{dict.why.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map(({ title, description, Glyph, href, cta }, idx) => (
            <Reveal
              key={title}
              as="article"
              delay={idx * 110}
              className="flex flex-col rounded-xl border border-ink/10 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-[0_18px_44px_-26px_rgba(38,64,47,0.4)]"
            >
              <Glyph className="text-sage" />
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                {title}
              </h3>
              <p className="mt-3 flex-grow text-[15px] leading-relaxed text-ink/70">
                {description}
              </p>
              <div className="mt-6 border-t border-ink/[0.08] pt-4">
                <Link
                  href={href}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep transition-colors hover:text-pine"
                >
                  {cta}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
