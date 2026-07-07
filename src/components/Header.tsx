"use client"

import { useState } from "react"
import Link from "next/link"
import { getDefaultDictionary } from "@/lib/dictionaries"
import { isChromelessPath } from "@/lib/routes"
import { usePathname } from "next/navigation"

const dict = getDefaultDictionary()

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if (isChromelessPath(pathname)) {
    return null
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { name: dict.header.about, href: "/montessori" },
    { name: dict.header.benefits, href: "/benefits" },
    { name: dict.header.programs, href: "/programs" },
    { name: "교구 가이드", href: "/experience" },
    { name: "블로그", href: "/blog" },
  ]

  return (
    <header className="fixed w-full bg-paper/85 backdrop-blur-md z-50 border-b border-ink/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-display text-2xl font-semibold text-ink tracking-tight">
              몬테소리
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ink/70 hover:text-ink px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors"
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
              <span className="sr-only">{isOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
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
        <div id="mobile-navigation" className="md:hidden bg-paper border-b border-ink/[0.08]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
