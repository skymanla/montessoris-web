import { getDefaultDictionary } from "@/lib/dictionaries"

const dict = getDefaultDictionary()

export default function ProgramsClient() {
  return (
    <div className="min-h-screen pt-16 font-[family-name:var(--font-geist-sans)] pb-24">
      {/* Title Header */}
      <div className="bg-stone-100 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6">{dict.programs.title}</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          {dict.programs.subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              age: dict.programs.nido.age,
              name: dict.programs.nido.name,
              description: dict.programs.nido.desc,
              color: "bg-rose-50"
            },
            {
              age: dict.programs.ic.age,
              name: dict.programs.ic.name,
              description: dict.programs.ic.desc,
              color: "bg-amber-50"
            },
            {
              age: dict.programs.casa.age,
              name: dict.programs.casa.name,
              description: dict.programs.casa.desc,
              color: "bg-emerald-50"
            },
            {
              age: dict.programs.parenting.age,
              name: dict.programs.parenting.name,
              description: dict.programs.parenting.desc,
              color: "bg-blue-50"
            }
          ].map((program, idx) => (
            <div key={idx} className={`${program.color} p-8 rounded-3xl border border-stone-200/50 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow`}>
              <span className="text-sm font-bold text-stone-500 mb-2">{program.age}</span>
              <h3 className="text-xl font-bold text-stone-900 mb-4">{program.name}</h3>
              <p className="text-stone-600 text-sm leading-relaxed flex-grow">{program.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Content for Program Page */}
        <section className="mt-24 bg-stone-50 p-12 rounded-3xl border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">{dict.programs.features.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-stone-800">{dict.programs.features.f1_title}</h3>
              <p className="text-stone-600">{dict.programs.features.f1_desc}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-stone-800">{dict.programs.features.f2_title}</h3>
              <p className="text-stone-600">{dict.programs.features.f2_desc}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
