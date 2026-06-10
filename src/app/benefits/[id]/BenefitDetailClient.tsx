import Link from "next/link"
import { DEFAULT_LOCALE, getDefaultDictionary } from "@/lib/dictionaries"

const dict = getDefaultDictionary()
const locale = DEFAULT_LOCALE

interface BenefitItem {
  id: string
  title: string
  desc: string
  content: string
}

export default function BenefitDetailClient({ id }: { id: string }) {
  const benefit = dict.benefits.items.find((item: BenefitItem) => item.id === id)

  if (!benefit) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-bold">Benefit not found</h1>
        <Link href="/benefits" className="mt-4 text-stone-600 hover:underline">Go back</Link>
      </div>
    )
  }

  const icons: { [key: string]: string } = {
    independence: "🌱",
    concentration: "🧩",
    "social-emotional": "🤝",
    creativity: "🎨",
  }

  return (
    <div className="min-h-screen pt-32 pb-24 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/benefits" 
          className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-12 transition-colors group"
        >
          <svg className="mr-2 w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === 'ko' ? '목록으로 돌아가기' : 'Back to list'}
        </Link>

        <article>
          <header className="mb-12">
            <div className="text-6xl mb-6">{icons[benefit.id]}</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 tracking-tight">
              {benefit.title}
            </h1>
            <p className="text-2xl text-stone-500 font-medium">
              {benefit.desc}
            </p>
          </header>

          <div className="prose prose-stone prose-lg max-w-none">
            <p className="text-stone-700 leading-relaxed whitespace-pre-line text-lg">
              {benefit.content}
            </p>
          </div>
          
          <div className="mt-16 pt-16 border-t border-stone-100">
            <div className="bg-stone-50 rounded-3xl p-8 sm:p-12">
              <h3 className="text-2xl font-bold text-stone-900 mb-4">
                {locale === 'ko' ? '함께 확인해보세요' : 'Check out also'}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {dict.benefits.items
                  .filter((item: BenefitItem) => item.id !== id)
                  .map((item: BenefitItem) => (
                    <Link 
                      key={item.id} 
                      href={`/benefits/${item.id}`}
                      className="p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all"
                    >
                      <span className="text-xl mr-2">{icons[item.id]}</span>
                      <span className="font-semibold text-stone-900">{item.title}</span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
