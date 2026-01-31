"use client"

import ImageSlider from "@/components/ImageSlider"
import { useLocale } from "@/components/LocaleContext"
import { PostData } from "@/lib/posts"
import Link from "next/link"

export default function HomeClient({ latestPosts }: { latestPosts: PostData[] }) {
  const { dict } = useLocale()

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {dict.hero.title} <br/>
                <span className="text-stone-500">Montessori</span>
              </h1>
              <p className="mt-4 text-xl text-stone-600 mb-10 whitespace-pre-line leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 fill-mode-both">
                {dict.hero.subtitle}
              </p>
              <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
                <button className="px-8 py-4 bg-stone-900 text-white rounded-full font-semibold text-lg hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  {dict.hero.cta}
                </button>
              </div>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-green-100/50 rounded-full blur-3xl opacity-60"></div>
          </div>
        </section>

        {/* What is Montessori Section */}
        <section className="py-24 bg-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px]">
                <ImageSlider />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-stone-900 mb-6 tracking-tight">
                  <span className="block text-lg text-stone-500 font-medium mb-2">{dict.philosophy.badge}</span>
                  {dict.philosophy.title}
                </h2>
                <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                  <p>
                    {dict.philosophy.p1}
                  </p>
                  <p>
                    {dict.philosophy.p2}
                  </p>
                  <ul className="space-y-4 mt-4 text-base">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 mr-3 mt-1">✓</span>
                      <span>{dict.philosophy.feature1}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 mr-3 mt-1">✓</span>
                      <span>{dict.philosophy.feature2}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 mr-3 mt-1">✓</span>
                      <span>{dict.philosophy.feature3}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features/Philosophy Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{dict.why.title}</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                {dict.why.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: dict.why.feature1_title,
                  description: dict.why.feature1_desc,
                  icon: "🎓"
                },
                {
                  title: dict.why.feature2_title,
                  description: dict.why.feature2_desc,
                  icon: "🌱"
                },
                {
                  title: dict.why.feature3_title,
                  description: dict.why.feature3_desc,
                  icon: "👨‍👩‍👧"
                }
              ].map((feature, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-stone-50 hover:bg-white border border-stone-100 hover:border-stone-200 transition-all hover:shadow-lg group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Blog Posts Section */}
        <section className="py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-stone-900 mb-4">{dict.blog.title}</h2>
                <p className="text-stone-600">{dict.blog.subtitle}</p>
              </div>
              <Link 
                href="/blog" 
                className="text-stone-900 font-semibold hover:text-stone-600 transition-colors flex items-center gap-2"
              >
                {dict.blog.viewAll}
                <span className="text-xl">→</span>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Link 
                  href={`/blog/${post.id}`} 
                  key={post.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-200 transition-all hover:shadow-xl flex flex-col"
                >
                  <div className="p-8 flex flex-col h-full">
                    <div className="text-sm text-stone-500 mb-3">{post.date}</div>
                    <h3 className="text-xl font-bold text-stone-900 mb-4 group-hover:text-stone-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-stone-600 line-clamp-3 text-sm leading-relaxed mb-6">
                      {post.description}
                    </p>
                    <div className="mt-auto text-stone-900 font-medium flex items-center gap-1">
                      {dict.blog.readMore}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
