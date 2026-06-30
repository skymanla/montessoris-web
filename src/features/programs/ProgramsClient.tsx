import { getDefaultDictionary } from "@/lib/dictionaries"
import { PageHeader } from "@/components/PageHeader"

const dict = getDefaultDictionary()

// Ascending gradation = the developmental sequence the programs follow.
const programs = [
  { ...dict.programs.nido, step: "#C8DBCF" },
  { ...dict.programs.ic, step: "#9DBCAA" },
  { ...dict.programs.casa, step: "#5F8D76" },
  { ...dict.programs.parenting, step: "#33503F" },
]

export default function ProgramsClient() {
  return (
    <div className="pt-16">
      <PageHeader
        eyebrow="연령별 커리큘럼"
        title={dict.programs.title}
        subtitle={dict.programs.subtitle}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-sage-deep">
          Nido → Infant Community → Casa → 부모 코칭
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <div
              key={program.name}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-26px_rgba(38,64,47,0.4)]"
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: program.step }} />
              <div className="flex flex-grow flex-col p-7">
                <span className="font-mono text-xs uppercase tracking-wider text-ink/45">
                  {program.age}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                  {program.name}
                </h3>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-ink/70">
                  {program.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Program features */}
        <section className="mt-20 rounded-2xl bg-linen p-8 sm:p-12 lg:mt-28">
          <h2 className="text-center font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink">
            {dict.programs.features.title}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-12">
            {[
              { t: dict.programs.features.f1_title, d: dict.programs.features.f1_desc },
              { t: dict.programs.features.f2_title, d: dict.programs.features.f2_desc },
            ].map((f) => (
              <div key={f.t} className="flex items-start gap-3.5">
                <span aria-hidden className="mt-1.5 h-6 w-1 shrink-0 rounded-sm bg-sage" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{f.t}</h3>
                  <p className="mt-2 leading-relaxed text-ink/70">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
