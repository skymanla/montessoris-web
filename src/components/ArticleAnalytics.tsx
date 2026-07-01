"use client"

import { useEffect, useRef } from "react"
import { trackBlogRead, trackBlogView } from "@/lib/analytics"

/**
 * 블로그 글 참여 계측 (서버 컴포넌트인 글 페이지에 삽입하는 클라이언트 자식).
 * - 마운트 시 blog_view.
 * - 60% 스크롤 또는 45초 체류 중 먼저 도달하면 blog_read (글당 1회, KEY EVENT).
 */
export default function ArticleAnalytics({
  slug,
  title,
  date,
}: {
  slug: string
  title: string
  date?: string
}) {
  const readFiredRef = useRef(false)

  useEffect(() => {
    trackBlogView(slug, title, date)

    // setTimeout 핸들을 담는 홀더(const 로 두어 forward-reference/재할당 이슈 방지).
    const timers: { dwell?: ReturnType<typeof setTimeout> } = {}

    const onScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      if (scrollable <= 0) return
      const ratio = (doc.scrollTop || window.scrollY) / scrollable
      if (ratio >= 0.6) fireRead("scroll")
    }

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll)
      if (timers.dwell) clearTimeout(timers.dwell)
    }

    const fireRead = (trigger: "scroll" | "dwell") => {
      if (readFiredRef.current) return
      readFiredRef.current = true
      trackBlogRead(slug, title, trigger)
      cleanup()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    timers.dwell = setTimeout(() => fireRead("dwell"), 45000)
    onScroll() // 짧은 글이라 이미 60% 이상 노출된 경우 즉시 발화

    return cleanup
  }, [slug, title, date])

  return null
}
