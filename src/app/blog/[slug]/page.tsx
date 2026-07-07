import { getPostData, getAllPostIds, getSortedPostsData } from "@/lib/posts"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import JsonLd from "@/components/JsonLd"
import ArticleAnalytics from "@/components/ArticleAnalytics"
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data"
import { createPageMetadata } from "@/lib/metadata"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const postData = await getPostData(slug)
  return createPageMetadata({
    title: postData.title,
    description: postData.description,
    path: `/blog/${slug}/`,
    image: postData.image,
    openGraph: {
      type: "article",
      publishedTime: postData.date,
    },
  })
}

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((path) => ({
    slug: path.params.slug,
  }))
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const postData = await getPostData(slug)
  const allPosts = getSortedPostsData()
  const relatedPosts = allPosts
    .filter((post) => post.id !== slug)
    .slice(0, 3)
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "블로그", path: "/blog/" },
    { name: postData.title, path: `/blog/${postData.id}/` },
  ])

  return (
    <>
      <JsonLd data={[articleJsonLd(postData), breadcrumbSchema]} />
      <ArticleAnalytics slug={postData.id} title={postData.title} date={postData.date} />
      <article className="pt-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20 pt-16">
          <Link
            href="/blog"
            className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-ink/55 transition-colors hover:text-ink"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            블로그 목록으로
          </Link>

          <header className="mb-12">
            <time className="block font-mono text-xs uppercase tracking-wider text-ink/45">
              {postData.date}
            </time>
            <h1 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              {postData.title}
            </h1>
            <p className="mt-6 border-l-2 border-sage pl-5 text-lg leading-relaxed text-ink/65">
              {postData.description}
            </p>
          </header>

          {postData.image && (
            <figure className="mb-12 overflow-hidden rounded-lg border border-ink/10 bg-linen">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={postData.image}
                  alt={postData.imageAlt || postData.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          )}

          <div className="prose prose-neutral prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink/80 prose-li:text-ink/80 prose-strong:text-ink prose-a:text-sage-deep prose-a:no-underline hover:prose-a:underline prose-blockquote:border-sage prose-blockquote:text-ink/70 prose-img:rounded-lg">
            {/* @ts-expect-error Server Component */}
            <MDXRemote source={postData.content} />
          </div>

          {/* 관련 게시글 */}
          <section className="mt-16 border-t border-ink/10 pt-12">
            <h2 className="mb-8 font-display text-2xl font-semibold text-ink">
              함께 읽으면 좋은 글
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group rounded-xl border border-ink/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-[0_18px_44px_-26px_rgba(38,64,47,0.4)]"
                >
                  {post.image && (
                    <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-md">
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        sizes="(min-width: 768px) 336px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <time className="block font-mono text-xs uppercase tracking-wider text-ink/40">
                    {post.date}
                  </time>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink transition-colors group-hover:text-sage-deep">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink/60">
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
