import Image from "next/image"
import { getDefaultDictionary } from "@/lib/dictionaries"
import { PageHeader } from "@/components/PageHeader"
import { GlyphSprout, GlyphTower, GlyphPair } from "@/components/MaterialGlyph"
import DefinitionLead from "@/components/DefinitionLead"
import DefinitionFaq from "@/components/DefinitionFaq"

const dict = getDefaultDictionary()

const elements = [
  {
    title: dict.montessori.elements.child_title,
    desc: dict.montessori.elements.child_desc,
    Glyph: GlyphSprout,
  },
  {
    title: dict.montessori.elements.env_title,
    desc: dict.montessori.elements.env_desc,
    Glyph: GlyphTower,
  },
  {
    title: dict.montessori.elements.director_title,
    desc: dict.montessori.elements.director_desc,
    Glyph: GlyphPair,
  },
]

export default function MontessoriClient() {
  return (
    <div className="pt-16">
      <PageHeader
        eyebrow="몬테소리 교육"
        title={dict.montessori.title}
        subtitle={dict.montessori.subtitle}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-20 lg:space-y-28">
        {/* 정의 front-load — H1 직후 첫 콘텐츠. 정의형 쿼리 인용 최적화. */}
        <DefinitionLead slug="montessori" />

        {/* History */}
        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-sage-deep">
              1870 – 1952
            </p>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink">
              {dict.montessori.history.title}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink/70">
              <p>{dict.montessori.history.p1}</p>
              <p>{dict.montessori.history.p2}</p>
            </div>
          </div>
          <div className="relative h-[380px] overflow-hidden rounded-lg shadow-[0_24px_60px_-30px_rgba(38,64,47,0.5)] sm:h-[440px]">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Maria_Montessori_%28portrait%29.jpg"
              alt={dict.montessori.history.img_alt}
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Core principles */}
        <section>
          <h2 className="text-center font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink">
            {dict.montessori.elements.title}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {elements.map(({ title, desc, Glyph }) => (
              <div
                key={title}
                className="rounded-xl border border-ink/10 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-[0_18px_44px_-26px_rgba(38,64,47,0.4)]"
              >
                <Glyph className="text-sage" />
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/70">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ — 질문형 헤딩으로 정의형 쿼리 인용 후보 확장 */}
        <DefinitionFaq slug="montessori" />
      </div>

      {/* Quote — pine band bookends the page */}
      <section className="bg-pine text-paper">
        <div className="measure-rule text-paper/25" aria-hidden />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center lg:py-24">
          <blockquote className="font-display text-2xl sm:text-3xl font-medium leading-snug">
            “{dict.montessori.quote.text}”
          </blockquote>
          <cite className="mt-6 block font-mono text-xs uppercase not-italic tracking-[0.2em] text-moss-light">
            {dict.montessori.quote.author}
          </cite>
        </div>
      </section>
    </div>
  )
}
