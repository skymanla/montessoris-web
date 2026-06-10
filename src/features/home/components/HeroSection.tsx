import { getDefaultDictionary } from "@/lib/dictionaries"

const dict = getDefaultDictionary()

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 tracking-tight mb-6 leading-tight">
            {dict.hero.title} <br/>
            <span className="text-stone-500">몬테소리</span>
          </h1>
          <p className="mt-4 text-xl text-stone-600 mb-10 whitespace-pre-line leading-relaxed">
            {dict.hero.subtitle}
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-stone-900 text-white rounded-full font-semibold text-lg hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              {dict.hero.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
