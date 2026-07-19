import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청하신 페이지가 없거나 주소가 변경되었습니다.",
}

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 pb-20 pt-32">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-sage-deep">
          404 · Page not found
        </p>
        <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          페이지를 찾을 수 없어요
        </h1>
        <p className="mt-5 leading-relaxed text-ink/65">
          주소가 바뀌었거나 페이지가 삭제되었을 수 있습니다. 홈이나 블로그에서
          필요한 몬테소리 정보를 다시 찾아보세요.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-pine px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-sage-deep"
          >
            홈으로 가기
          </Link>
          <Link
            href="/blog/"
            className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-sage"
          >
            블로그 둘러보기
          </Link>
        </div>
      </div>
    </main>
  )
}
