import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-stone-800 tracking-tight">
              Montessori
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/montessori" className="text-stone-600 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              몬테소리란?
            </Link>
            <Link href="/programs" className="text-stone-600 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              프로그램
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
