"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getDefaultDictionary } from "@/lib/dictionaries"

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
    if (!isMobile) {
      e.preventDefault()
      router.push("?counsel=open")
    }
  }

  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 tracking-tight mb-6 leading-tight">
            {dict.hero.title} <br/>
            <span className="text-stone-500">몬테소리</span>
          </h1>
          <p className="mt-4 text-xl text-stone-600 mb-10 whitespace-pre-line leading-relaxed">
            {dict.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/montessori"
              className="w-full sm:w-auto px-8 py-4 bg-stone-900 text-white text-center rounded-full font-semibold text-lg hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {dict.hero.cta}
            </Link>
            <Link 
              href="/counsel"
              onClick={handleCounselClick}
              className="w-full sm:w-auto px-8 py-4 border border-[#5f8d76]/30 bg-white text-[#4e7a66] hover:bg-[#5f8d76]/5 hover:border-[#5f8d76]/50 text-center rounded-full font-semibold text-lg transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1"
            >
              AI 육아 상담 받기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
