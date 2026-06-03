import { getPostData, getAllPostIds, getSortedPostsData } from "@/lib/posts"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { Metadata } from "next"
import JsonLd from "@/components/JsonLd"
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postData = await getPostData(params.slug)
  return {
    title: postData.title,
    description: postData.description,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: postData.title,
      description: postData.description,
      type: "article",
      url: `/blog/${params.slug}`,
      publishedTime: postData.date,
      images: ["/images/edu-rooms/TalkMedia_i_88239f1cd4c2.jpeg.jpeg"],
    },
  }
}

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((path) => ({
    slug: path.params.slug,
  }))
}

export default async function BlogPost({ params }: Props) {
  const postData = await getPostData(params.slug)
  const allPosts = getSortedPostsData()
  const relatedPosts = allPosts
    .filter((post) => post.id !== params.slug)
    .slice(0, 3)
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "블로그", path: "/blog" },
    { name: postData.title, path: `/blog/${postData.id}` },
  ])

  return (
    <>
      <JsonLd data={[articleJsonLd(postData), breadcrumbSchema]} />
      <article className="min-h-screen pt-32 pb-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            블로그 목록으로
          </Link>

          <header className="mb-12">
            <time className="text-stone-500 block mb-4">{postData.date}</time>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 leading-tight">
              {postData.title}
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed font-light border-l-4 border-stone-200 pl-4 bg-white/50 p-4 rounded-r-lg">
              {postData.description}
            </p>
          </header>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-stone-100 mb-16">
            <div className="prose prose-stone prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-stone-900 hover:prose-a:text-stone-600 prose-img:rounded-xl">
              {/* @ts-expect-error Server Component */}
              <MDXRemote source={postData.content} />
            </div>
          </div>

          {/* 관련 게시글 섹션 */}
          <section className="border-t border-stone-200 pt-16">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">함께 읽으면 좋은 글</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all"
                >
                  <time className="text-sm text-stone-400 block mb-2">{post.date}</time>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-stone-500 line-clamp-2">
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
