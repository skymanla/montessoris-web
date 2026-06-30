import Link from "next/link"
import ImageSlider from "@/components/ImageSlider"
import { getDefaultDictionary } from "@/lib/dictionaries"
import { Container } from "@/components/layout/Layout"
import { Reveal } from "@/components/Reveal"

const dict = getDefaultDictionary()

const features = [
  dict.philosophy.feature1,
  dict.philosophy.feature2,
  dict.philosophy.feature3,
]

export function PhilosophySection() {
  return (
    <section className="bg-linen py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative h-[440px] lg:h-[520px]">
            <ImageSlider />
          </Reveal>

          <Reveal delay={120}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-sage-deep">
              {dict.philosophy.badge}
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-medium leading-tight tracking-tight text-ink">
              가르치지 않습니다,
              <br />
              스스로 자라도록 돕습니다
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/70">
              <p>{dict.philosophy.p1}</p>
              <p>{dict.philosophy.p2}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3.5">
                  <span
                    aria-hidden
                    className="mt-1.5 h-5 w-1 shrink-0 rounded-sm bg-sage"
                  />
                  <span className="text-[15px] leading-relaxed text-ink/80">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/montessori"
                className="group inline-flex items-center gap-2 font-semibold text-sage-deep transition-colors hover:text-pine"
              >
                몬테소리 철학 더 보기
                <span
                  aria-hidden
                  className="text-lg transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
