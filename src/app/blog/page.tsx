import Link from "next/link"
import { getSortedPostsData } from "@/lib/posts"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "블로그 | Montessori",
  description: "몬테소리 교육에 대한 깊이 있는 이야기와 유용한 육아 정보를 만나보세요.",
}

export default function BlogPage() {
  const allPostsData = getSortedPostsData()

  return (
    <div className="min-h-screen pt-32 pb-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Blog</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            몬테소리 교육의 철학과 실천 방법, 그리고 아이들과 함께하는 일상의 이야기를 나눕니다.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {allPostsData.map(({ id, date, title, description }) => (
            <Link
              key={id}
              href={`/blog/${id}`}
              className="block group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-200 hover:shadow-lg transition-all"
            >
              <div className="p-8">
                <time className="text-sm text-stone-500 mb-2 block">{date}</time>
                <h2 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-stone-600 transition-colors">
                  {title}
                </h2>
                <p className="text-stone-600 leading-relaxed line-clamp-3">
                  {description}
                </p>
                <div className="mt-6 flex items-center text-stone-800 font-medium group-hover:underline">
                  Read more
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
