"use client"

import Link from "next/link"
import { useLocale } from "@/components/LocaleContext"
import { Section, Container } from "@/components/layout/Layout"
import { PostData } from "@/lib/posts"

export function BlogPreviewSection({ latestPosts }: { latestPosts: PostData[] }) {
  const { dict } = useLocale()

  return (
    <Section background="stone">
      <Container>
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
                <p className="text-stone-600 line-clamp-3 text-sm leading-relaxed mb-6 flex-grow">
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
      </Container>
    </Section>
  )
}
