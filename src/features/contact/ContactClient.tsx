"use client"

import { useLocale } from "@/components/LocaleContext"

export default function ContactClient() {
  const { dict } = useLocale()

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">{dict.contact.title}</h1>
          <p className="text-lg text-stone-600">{dict.contact.subtitle}</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                {dict.contact.name}
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-all"
                placeholder={dict.contact.name}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                {dict.contact.email}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-all"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                {dict.contact.message}
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-all"
                placeholder={dict.contact.message}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-stone-900 text-white rounded-xl font-semibold text-lg hover:bg-stone-800 transition-all shadow-md hover:shadow-lg"
            >
              {dict.contact.send}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
