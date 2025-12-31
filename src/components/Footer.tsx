export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-white tracking-tight mb-4 block">Montessori</span>
            <p className="max-w-sm">
              아이의 무한한 잠재력을 믿습니다.<br/>
              엄마와 아이가 함께 성장하는 몬테소리 교육 센터.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">바로가기</h4>
            <ul className="space-y-2">
              <li><a href="/center" className="hover:text-white transition-colors">센터 소개</a></li>
              <li><a href="/#programs" className="hover:text-white transition-colors">프로그램</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-800 text-sm text-center">
          &copy; {new Date().getFullYear()} Montessori. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
