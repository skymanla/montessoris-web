"use client"

import Image from "next/image"
import { useLocale } from "@/components/LocaleContext"

export default function MontessoriPage() {
  const { dict } = useLocale()
  
  return (
    <div className="min-h-screen pt-16 font-[family-name:var(--font-geist-sans)] pb-24">
      {/* Title Header */}
      <div className="bg-stone-100 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6">{dict.montessori.title}</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto whitespace-pre-line">
          {dict.montessori.subtitle}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">

        {/* Section 1: History */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-4">{dict.montessori.history.title}</h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
               <p>
                 {dict.montessori.history.p1}
               </p>
               <p>
                 {dict.montessori.history.p2}
               </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Maria_Montessori_%28portrait%29.jpg"
              alt={dict.montessori.history.img_alt}
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Section 2: Core Principles */}
        <section>
          <h2 className="text-3xl font-bold text-stone-900 text-center mb-12">{dict.montessori.elements.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">👶</div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">{dict.montessori.elements.child_title}</h3>
              <p className="text-stone-600">
                {dict.montessori.elements.child_desc}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="text-4xl mb-4">🏫</div>
               <h3 className="text-xl font-bold text-stone-800 mb-3">{dict.montessori.elements.env_title}</h3>
               <p className="text-stone-600">
                 {dict.montessori.elements.env_desc}
               </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="text-4xl mb-4">👩‍🏫</div>
               <h3 className="text-xl font-bold text-stone-800 mb-3">{dict.montessori.elements.director_title}</h3>
               <p className="text-stone-600">
                 {dict.montessori.elements.director_desc}
               </p>
             </div>
          </div>
        </section>

        {/* Section 3: Quote */}
        <section className="bg-stone-50 p-12 rounded-3xl text-center border border-stone-100">
           <blockquote className="text-2xl font-serif italic text-stone-800 mb-6">
             &quot;{dict.montessori.quote.text}&quot;
           </blockquote>
           <cite className="text-stone-500 font-medium">- {dict.montessori.quote.author}</cite>
        </section>

      </div>
    </div>
  )
}
