export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="text-2xl font-bold text-white tracking-tight mb-4 block">Montessori</span>
            <p className="max-w-sm">
              아이의 무한한 잠재력을 믿습니다.<br/>
              엄마와 아이가 함께 성장하는 몬테소리 교육.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-800 text-sm text-center">
          &copy; {new Date().getFullYear()} Montessori. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
