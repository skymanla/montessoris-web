import Link from "next/link"
import Image from "next/image"
import { getDefaultDictionary } from "@/lib/dictionaries"
import { Container } from "@/components/layout/Layout"
import { Reveal } from "@/components/Reveal"
import { PostData } from "@/lib/posts"

const dict = getDefaultDictionary()

export function BlogPreviewSection({ latestPosts }: { latestPosts: PostData[] }) {
  return (
    <section className="bg-linen py-20 lg:py-28">
      <Container>
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink">
              {dict.blog.title}
            </h2>
            <p className="mt-3 text-ink/65">{dict.blog.subtitle}</p>
          </div>
          <Link
            href="/blog"
            className="group hidden shrink-0 items-center gap-2 font-semibold text-sage-deep transition-colors hover:text-pine sm:inline-flex"
          >
            {dict.blog.viewAll}
            <span
              aria-hidden
              className="text-lg transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {latestPosts.map((post, idx) => (
            <Reveal key={post.id} as="article" delay={idx * 110} className="h-full">
              <Link
                href={`/blog/${post.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-[0_18px_44px_-26px_rgba(38,64,47,0.4)]"
              >
                {post.image && (
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-grow flex-col p-8">
                  <div className="font-mono text-xs uppercase tracking-wider text-ink/45">
                    {post.date}
                  </div>
                  <h3 className="mt-4 line-clamp-2 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-sage-deep">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-grow text-sm leading-relaxed text-ink/65">
                    {post.description}
                  </p>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-sage-deep">
                    {dict.blog.readMore}
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-semibold text-sage-deep"
          >
            {dict.blog.viewAll}
            <span aria-hidden className="text-lg">
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  )
}
