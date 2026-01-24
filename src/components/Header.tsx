"use client"

import { useState } from "react"
import Link from "next/link"
import { useLocale } from "@/components/LocaleContext"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { locale, dict, setLocale } = useLocale()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleLocale = () => {
    const newLocale = locale === "ko" ? "en" : "ko"
    setLocale(newLocale)
  }

  const menuItems = [
    { name: dict.header.about, href: "/montessori" },
    { name: dict.header.benefits, href: "/benefits" },
    { name: dict.header.programs, href: "/programs" },
    { name: "Blog", href: "/blog" },
  ]

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-stone-800 tracking-tight">
              Montessori
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-stone-600 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-stone-200 hover:border-stone-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {locale === "ko" ? "EN" : "KO"}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">메뉴 열기</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleLocale()
                setIsOpen(false)
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {locale === "ko" ? "English (EN)" : "한국어 (KO)"}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
