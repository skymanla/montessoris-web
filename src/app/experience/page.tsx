import Link from "next/link"
import { PageHeader } from "@/components/PageHeader"
import { MeasureRule } from "@/components/Measure"
import JsonLd from "@/components/JsonLd"
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
  webPageJsonLd,
} from "@/lib/structured-data"
import { createPageMetadata } from "@/lib/metadata"
import { MATERIALS, type MaterialSlug } from "@/features/experience/materials"
import {
  PreviewTower,
  PreviewStair,
  PreviewRods,
} from "@/features/experience/MaterialPreview"

const title = "몬테소리 교구 가이드 — 아이가 스스로 해보는 3D 놀이"
const description =
  "분홍탑·갈색계단·숫자막대를 아이처럼 만져보고, 집에서도 해볼 수 있는 몬테소리 교구 놀이를 천천히 살펴보세요."

export const metadata = createPageMetadata({
  title,
  description,
  path: "/experience/",
  keywords: [
    "몬테소리 교구",
    "몬테소리 교구 가이드",
    "몬테소리 분홍탑",
    "몬테소리 갈색계단",
    "몬테소리 숫자막대",
    "집에서 몬테소리",
  ],
})

const PREVIEWS: Record<MaterialSlug, (p: { className?: string }) => React.ReactElement> = {
  "pink-tower": PreviewTower,
  "brown-stair": PreviewStair,
  "number-rods": PreviewRods,
}

export default function ExperienceShelfPage() {
  const guideFaqs = [
    {
      question: "몬테소리 교구는 몇 세부터 시작하면 좋나요?",
      answer:
        "아이마다 속도는 달라요. 분홍탑과 갈색계단은 3세 전후, 숫자막대는 4세 전후에 아이가 손으로 만지고 맞춰보는 일에 재미를 느낄 때 자연스럽게 시작해 보세요.",
    },
    {
      question: "집에 정식 몬테소리 교구가 없어도 활동할 수 있나요?",
      answer:
        "그럼요. 크기가 다른 블록, 두께가 다른 책, 색 테이프를 붙인 종이 막대만 있어도 아이는 충분히 쌓고, 놓고, 다시 해보며 즐거운 발견을 할 수 있어요.",
    },
    {
      question: "몬테소리 교구 활동에서 부모가 가장 조심할 점은 무엇인가요?",
      answer:
        "아이 손이 잠깐 멈추거나 순서가 조금 달라도 바로 말해주지 않아도 괜찮아요. 엄마가 한 박자 기다려 주면 아이가 스스로 다시 보고, 만지고, 아하 하는 순간을 만납니다.",
    },
  ]
  const structuredData = [
    webPageJsonLd({ name: title, description, path: "/experience/" }),
    breadcrumbJsonLd([
      { name: "홈", path: "/" },
      { name: "교구 체험", path: "/experience/" },
    ]),
    itemListJsonLd(
      MATERIALS.map((m) => ({ name: m.name, path: `/experience/${m.slug}/` }))
    ),
    faqPageJsonLd(guideFaqs),
  ]

  return (
    <>
      <JsonLd data={structuredData} />
      <div className="pt-16">
        <PageHeader
          eyebrow="준비된 환경 · Montessori Materials"
          title="몬테소리 교구 가이드"
          subtitle="분홍탑, 갈색계단, 숫자막대를 아이처럼 직접 만져보세요. 조금 헷갈려도 괜찮아요. 다시 보고 다시 놓아보는 그 시간이 아이 마음을 단단하게 키웁니다."
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <section
            className="mb-12 max-w-3xl"
            aria-labelledby="material-guide-heading"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-sage-deep">
              Parent Guide
            </p>
            <h2
              id="material-guide-heading"
              className="mt-3 font-display text-3xl font-medium tracking-tight text-ink"
            >
              집에서 시작하는 몬테소리 교구 활동
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              몬테소리 교구는 정답을 빨리 맞히는 장난감이 아니에요. 아이가 작은
              손으로 만지고, 다시 놓고, 혼자 웃으며 알아차리는 시간을 만들어 주는
              도구입니다. 아래 3D 체험에서 먼저 아이의 속도를 느껴보세요.
            </p>
          </section>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MATERIALS.map((m) => {
              const Preview = PREVIEWS[m.slug]
              return (
                <Link
                  key={m.slug}
                  href={`/experience/${m.slug}/`}
                  className="group flex flex-col rounded-xl border border-ink/10 bg-white p-8 transition duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:border-sage/50 hover:shadow-[0_18px_44px_-26px_rgba(38,64,47,0.4)]"
                >
                  <div className="flex items-center justify-center rounded-lg bg-linen py-6">
                    <Preview />
                  </div>
                  <div className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-sage-deep">
                    {m.eyebrow}
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                    {m.name}
                  </h2>
                  <p className="mt-2 flex-grow text-[15px] leading-relaxed text-ink/70">
                    {m.concept}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-ink/[0.08] pt-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink/45">
                      {m.dataLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep">
                      체험 시작
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* shelf board */}
          <div className="mt-4">
            <MeasureRule className="text-sage" />
          </div>

          <section className="mt-16" aria-labelledby="material-detail-heading">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-sage-deep">
                Age · Wonder · Home Play
              </p>
              <h2
                id="material-detail-heading"
                className="mt-3 font-display text-3xl font-medium tracking-tight text-ink"
              >
                교구별 엄마 가이드
              </h2>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {MATERIALS.map((m) => (
                <article
                  key={m.slug}
                  className="flex flex-col rounded-xl border border-ink/10 bg-white p-7"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/45">
                    {m.area} · {m.age}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                    {m.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {m.guide.definition}
                  </p>
                  <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                    <div>
                      <dt className="font-semibold text-ink">아이에게 남는 것</dt>
                      <dd className="mt-1 text-ink/65">{m.guide.purpose}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">집에서 해보기</dt>
                      <dd className="mt-1 text-ink/65">{m.guide.homeActivity}</dd>
                    </div>
                  </dl>
                  <Link
                    href={`/experience/${m.slug}/`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep transition-colors hover:text-pine"
                  >
                    {m.name} 3D 체험하기
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section
            className="mt-16 border-y border-ink/10 py-10"
            aria-labelledby="counsel-link-heading"
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-sage-deep">
                  AI Montessori Counsel
                </p>
                <h2
                  id="counsel-link-heading"
                  className="mt-3 font-display text-2xl font-medium tracking-tight text-ink"
                >
                  우리 아이에게 맞을지 고민된다면 편하게 물어보세요
                </h2>
                <p className="mt-3 leading-relaxed text-ink/70">
                  아이 나이와 요즘 좋아하는 놀이, 집에 있는 물건만 알려주면 오늘
                  바로 해볼 만한 몬테소리 놀이를 함께 찾아드릴게요.
                </p>
              </div>
              <Link
                href="/counsel/"
                className="inline-flex items-center justify-center rounded-md bg-sage px-6 py-3.5 font-semibold text-white transition-colors hover:bg-sage-deep"
              >
                무료 AI 상담 시작하기
                <span aria-hidden className="ml-2">→</span>
              </Link>
            </div>
          </section>

          {/* 마리's note for parents */}
          <div className="mt-14 rounded-2xl bg-linen p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-sage-deep">
              기다림의 힘 · Child Discovery
            </p>
            <div className="mt-4 flex items-start gap-3.5">
              <span aria-hidden className="mt-1.5 h-6 w-1 shrink-0 rounded-sm bg-sage" />
              <p className="text-[15px] leading-relaxed text-ink/75">
                아이가 순서를 조금 다르게 놓아도 바로 고쳐주지 않아도 괜찮아요. 탑이
                살짝 흔들리고 계단 모양이 달라 보이면, 아이는 다시 바라보고 손끝으로
                만져보며 자기만의 답을 찾아갑니다. 마리 선생님은 곁에서 기다려줄 뿐,
                아이의 작은 발견을 대신 가져가지 않아요.
              </p>
            </div>
          </div>

          <section className="mt-14" aria-labelledby="material-faq-heading">
            <h2
              id="material-faq-heading"
              className="font-display text-2xl font-semibold text-ink"
            >
              몬테소리 교구 FAQ
            </h2>
            <div className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
              {guideFaqs.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer list-none font-semibold text-ink">
                    {item.question}
                    <span
                      aria-hidden
                      className="float-right text-sage-deep transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink/70">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold text-sage-deep transition-colors hover:text-pine"
            >
              <span aria-hidden>←</span> 홈으로
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
