"use client"

import Link from "next/link"
import { getDefaultDictionary } from "@/lib/dictionaries"
import { isCounselPath } from "@/lib/routes"
import { usePathname } from "next/navigation"

const dict = getDefaultDictionary()

export default function Footer() {
  const pathname = usePathname()

  if (isCounselPath(pathname)) {
    return null
  }

  return (
    <footer className="bg-pine text-moss-light">
      <div className="measure-rule text-paper/30" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="font-display text-2xl font-semibold text-paper tracking-tight mb-4 block">몬테소리</span>
            <p className="max-w-sm leading-relaxed text-moss-light/90">
              {dict.hero.subtitle.split('\n')[0]}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3 text-sm">
              <h4 className="text-paper font-mono text-xs uppercase tracking-[0.18em] mb-4">바로가기</h4>
              <Link href="/montessori" className="block hover:text-paper transition-colors">{dict.header.about}</Link>
              <Link href="/benefits" className="block hover:text-paper transition-colors">{dict.header.benefits}</Link>
              <Link href="/programs" className="block hover:text-paper transition-colors">{dict.header.programs}</Link>
            </div>
            <div className="space-y-3 text-sm">
              <h4 className="text-paper font-mono text-xs uppercase tracking-[0.18em] mb-4">약관</h4>
              <Link href="/privacy" className="block hover:text-paper transition-colors">{dict.footer.privacy}</Link>
              <Link href="/terms" className="block hover:text-paper transition-colors">{dict.footer.terms}</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-paper/15 font-mono text-xs tracking-wider text-moss-light/70 text-center">
          &copy; {new Date().getFullYear()} montessoris.net
        </div>
      </div>
    </footer>
  )
}
