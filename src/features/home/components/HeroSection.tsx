"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getDefaultDictionary } from "@/lib/dictionaries"
import { RodStaircase } from "@/components/Measure"
import { trackCounselCtaClick } from "@/lib/analytics"

const dict = getDefaultDictionary()

export function HeroSection() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleCounselClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackCounselCtaClick("hero")
    if (!isMobile) {
      e.preventDefault()
      router.push("?counsel=open")
    }
  }

  return (
    <section className="relative overflow-hidden bg-pine text-paper">
      {/* faint Pink-Tower echo, atmosphere only */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -right-10 -top-6 h-[420px] w-[420px] text-paper/[0.04]"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="40" y="120" width="120" height="60" />
          <rect x="55" y="78" width="90" height="42" />
          <rect x="70" y="46" width="60" height="32" />
          <rect x="85" y="24" width="30" height="22" />
        </g>
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="max-w-3xl">
          <p className="animate-fade font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-moss-light">
            몬테소리 · AMS 정통 교육 · 0–6세
          </p>

          <h1 className="animate-rise mt-7 font-display font-medium leading-[1.16] tracking-tight text-4xl sm:text-5xl lg:text-[3.9rem]">
            <span className="text-moss-light/80">「</span>나 혼자 할 수 있도록
            <br />
            도와주세요<span className="text-moss-light/80">」</span>
          </h1>

          <p
            className="animate-rise mt-4 font-display text-base sm:text-lg text-moss-light"
            style={{ animationDelay: "0.08s" }}
          >
            — 마리아 몬테소리
          </p>

          <p
            className="animate-rise mt-8 max-w-xl whitespace-pre-line text-base sm:text-lg leading-relaxed text-paper/85"
            style={{ animationDelay: "0.16s" }}
          >
            {dict.hero.subtitle}
          </p>

          <div
            className="animate-rise mt-10 flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: "0.24s" }}
          >
            <Link
              href="/montessori"
              className="inline-flex items-center justify-center rounded-md bg-paper px-7 py-4 text-base font-semibold text-pine transition-colors hover:bg-white"
            >
              {dict.hero.cta}
            </Link>
            <Link
              href="/counsel"
              onClick={handleCounselClick}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-moss/40 px-7 py-4 text-base font-semibold text-paper transition-colors hover:border-moss hover:bg-white/[0.06]"
            >
              AI 육아 상담 받기
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Signature: the child grows in measured, self-directed steps */}
        <div className="mt-14 lg:mt-16">
          <RodStaircase />
          <div className="measure-rule mt-2 max-w-md text-moss-light/70" aria-hidden />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-moss-light/70">
            Nido · Infant Community · Casa — 한 걸음씩, 자기 속도로
          </p>
        </div>
      </div>
    </section>
  )
}
