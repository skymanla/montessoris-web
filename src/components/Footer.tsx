"use client"

import Link from "next/link"
import { useLocale } from "./LocaleContext"
import { usePathname } from "next/navigation"

export default function Footer() {
  const { dict } = useLocale()
  const pathname = usePathname()

  if (pathname === "/counsel") {
    return null
  }

  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="text-2xl font-bold text-white tracking-tight mb-4 block">Montessori</span>
            <p className="max-w-sm mb-6">
              {dict.hero.subtitle.split('\n')[0]}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3 text-sm">
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
              <Link href="/montessori" className="block hover:text-white transition-colors">{dict.header.about}</Link>
              <Link href="/benefits" className="block hover:text-white transition-colors">{dict.header.benefits}</Link>
              <Link href="/programs" className="block hover:text-white transition-colors">{dict.header.programs}</Link>
            </div>
            <div className="space-y-3 text-sm">
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider">Support</h4>
              <Link href="/contact" className="block hover:text-white transition-colors">{dict.footer.contact}</Link>
            </div>
            <div className="space-y-3 text-sm">
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider">Legal</h4>
              <Link href="/privacy" className="block hover:text-white transition-colors">{dict.footer.privacy}</Link>
              <Link href="/terms" className="block hover:text-white transition-colors">{dict.footer.terms}</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-800 text-sm text-center">
          &copy; {new Date().getFullYear()} montessoris.net
        </div>
      </div>
    </footer>
  )
}
