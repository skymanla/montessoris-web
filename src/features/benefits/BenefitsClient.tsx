"use client"

import Link from "next/link"
import { useLocale } from "@/components/LocaleContext"

interface BenefitItem {
  id: string
  title: string
  desc: string
  content: string
}

export default function BenefitsClient() {
  const { dict, locale } = useLocale()

  return (
    <div className="min-h-screen pt-16 font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="bg-stone-100 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6">
            {dict.benefits.title}
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            {dict.benefits.subtitle}
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {dict.benefits.items.map((item: BenefitItem) => (
            <Link 
              key={item.id} 
              href={`/benefits/${item.id}`}
              className="group bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-stone-900 group-hover:text-white transition-colors">
                  {item.id === 'independence' && '🌱'}
                  {item.id === 'concentration' && '🧩'}
                  {item.id === 'social-emotional' && '🤝'}
                  {item.id === 'creativity' && '🎨'}
                </div>
                <span className="text-stone-400 group-hover:text-stone-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-stone-800">{item.title}</h2>
              <p className="text-stone-600 mb-6 leading-relaxed">{item.desc}</p>
              <span className="text-sm font-semibold text-stone-900 border-b-2 border-stone-200 group-hover:border-stone-900 transition-all">
                {locale === 'ko' ? '자세히 보기' : 'Read More'}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
