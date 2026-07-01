import Link from "next/link"
import { PageHeader } from "@/components/PageHeader"
import { MeasureRule } from "@/components/Measure"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/structured-data"
import { createPageMetadata } from "@/lib/metadata"
import { MATERIALS, type MaterialSlug } from "@/features/experience/materials"
import {
  PreviewTower,
  PreviewStair,
  PreviewRods,
} from "@/features/experience/MaterialPreview"

const title = "교구 체험 — 준비된 환경"
const description =
  "몬테소리 교구를 3D로 직접 만져보는 체험. 분홍탑·갈색계단·숫자막대를 크기와 순서대로 놓으며 아이의 감각과 집중을 손으로 익힙니다."

export const metadata = createPageMetadata({
  title,
  description,
  path: "/experience/",
})

const PREVIEWS: Record<MaterialSlug, (p: { className?: string }) => React.ReactElement> = {
  "pink-tower": PreviewTower,
  "brown-stair": PreviewStair,
  "number-rods": PreviewRods,
}

export default function ExperienceShelfPage() {
  const structuredData = [
    breadcrumbJsonLd([
      { name: "홈", path: "/" },
      { name: "교구 체험", path: "/experience/" },
    ]),
    itemListJsonLd(
      MATERIALS.map((m) => ({ name: m.name, path: `/experience/${m.slug}/` }))
    ),
  ]

  return (
    <>
      <JsonLd data={structuredData} />
      <div className="pt-16">
        <PageHeader
          eyebrow="준비된 환경 · Prepared Environment"
          title="교구 체험"
          subtitle="아이가 되어 교구를 직접 만져보세요. 순서가 어긋나면 교구가 스스로 알려줍니다 — 마리 선생님은 곁에서 지켜볼 뿐, 대신 놓아주지 않아요."
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
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

          {/* 마리's control-of-error note for parents */}
          <div className="mt-14 rounded-2xl bg-linen p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-sage-deep">
              오류의 정정 · Control of Error
            </p>
            <div className="mt-4 flex items-start gap-3.5">
              <span aria-hidden className="mt-1.5 h-6 w-1 shrink-0 rounded-sm bg-sage" />
              <p className="text-[15px] leading-relaxed text-ink/75">
                몬테소리 교구에는 스스로 오류를 알아차리는 장치가 담겨 있습니다. 순서가
                어긋나면 계단의 결이 흐트러지고 탑의 균형이 무너져, 아이는 어른의 지적
                없이도 스스로 발견하고 고쳐 놓습니다. 마리 선생님은 힌트를 건넬 뿐, 답을
                대신 놓아주지 않아요.
              </p>
            </div>
          </div>

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
