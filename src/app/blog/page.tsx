import Link from "next/link"
import Image from "next/image"
import { getSortedPostsData } from "@/lib/posts"
import { createPageMetadata } from "@/lib/metadata"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/structured-data"
import { PageHeader } from "@/components/PageHeader"

const title = "몬테소리 교육 블로그"
const description =
  "몬테소리 철학, 교구 선택, 집에서 실천하는 준비된 환경, 유치원 비교까지 부모를 위한 교육 글을 모았습니다."

export const metadata = createPageMetadata({ title, description, path: "/blog/" })

export default function BlogPage() {
  const allPostsData = getSortedPostsData()
  const structuredData = [
    webPageJsonLd({ name: title, description, path: "/blog/" }),
    breadcrumbJsonLd([
      { name: "홈", path: "/" },
      { name: "블로그", path: "/blog/" },
    ]),
  ]

  return (
    <>
      <JsonLd data={structuredData} />
      <div className="pt-16">
        <PageHeader
          eyebrow="몬테소리 교육 블로그"
          title="블로그"
          subtitle="몬테소리 교육의 철학과 실천 방법, 그리고 아이들과 함께하는 일상의 이야기를 나눕니다."
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {allPostsData.map(({ id, date, title, description, image, imageAlt }) => (
              <Link
                key={id}
                href={`/blog/${id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-[0_18px_44px_-26px_rgba(38,64,47,0.4)]"
              >
                {image && (
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={image}
                      alt={imageAlt || title}
                      fill
                      sizes="(min-width: 1024px) 448px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-grow flex-col p-8">
                  <time className="font-mono text-xs uppercase tracking-wider text-ink/45">
                    {date}
                  </time>
                  <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-sage-deep">
                    {title}
                  </h2>
                  <p className="mt-3 line-clamp-3 flex-grow leading-relaxed text-ink/65">
                    {description}
                  </p>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-sage-deep">
                    자세히 보기
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
