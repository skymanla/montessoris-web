
export default function MontessoriPage() {
  return (
    <div className="min-h-screen pt-16 font-[family-name:var(--font-geist-sans)] pb-24">
      {/* Title Header */}
      <div className="bg-stone-100 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6">몬테소리 교육이란?</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          "스스로 할 수 있도록 도와주세요"<br/>
          아이는 자신을 창조하는 놀라운 능력을 가지고 있습니다.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">

        {/* Section 1: History */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-4">마리아 몬테소리 (Maria Montessori)</h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
               <p>
                 몬테소리 교육의 창시자 마리아 몬테소리는 이탈리아 최초의 여성 의사였습니다.
                 그녀는 정신지체 아동들을 관찰하며 그들이 감각적인 자극에 반응한다는 것을 발견하고,
                 이를 일반 아동 교육에 적용하여 혁신적인 교육법을 창안했습니다.
               </p>
               <p>
                 1907년 로마의 빈민가에 '어린이의 집(Casa dei Bambini)'을 설립하여,
                 아이들이 준비된 환경 속에서 스스로 선택하고 집중할 때 놀라운 성장을 보인다는 것을 처음으로 증명했습니다.
               </p>
            </div>
          </div>
          <div className="bg-stone-200 h-[300px] rounded-2xl flex items-center justify-center text-stone-500">
            {/* Image Placeholder */}
            <span>마리아 몬테소리 사진</span>
          </div>
        </section>

        {/* Section 2: Core Principles */}
        <section>
          <h2 className="text-3xl font-bold text-stone-900 text-center mb-12">몬테소리 교육의 3요소</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">👶</div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">아이 (The Child)</h3>
              <p className="text-stone-600">
                아이는 학습의 주체입니다. 어른이 주입시키는 것이 아니라, 아이 내부의 발달 본능(흡수정신)에 따라 환경과 상호작용하며 스스로 배웁니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="text-4xl mb-4">🏫</div>
               <h3 className="text-xl font-bold text-stone-800 mb-3">준비된 환경 (Environment)</h3>
               <p className="text-stone-600">
                 아이의 발달 단계와 신체 사이즈에 꼭 맞는 교구와 가구들이 질서 있게 정돈된 환경입니다. 아이는 이곳에서 자유롭게 교구를 선택합니다.
               </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="text-4xl mb-4">👩‍🏫</div>
               <h3 className="text-xl font-bold text-stone-800 mb-3">제시자 (Director)</h3>
               <p className="text-stone-600">
                 교사는 가르치는 사람이 아닌 아이와 환경을 연결해주는 안내자입니다. 아이를 관찰하고 적절한 시기에 교구를 제시합니다.
               </p>
             </div>
          </div>
        </section>

        {/* Section 3: Quote */}
        <section className="bg-stone-50 p-12 rounded-3xl text-center border border-stone-100">
           <blockquote className="text-2xl font-serif italic text-stone-800 mb-6">
             "교육의 목적은 아이가 독립적인 인격체로 성장하도록 돕는 것입니다.
             우리는 아이가 혼자 할 수 있는 일을 결코 대신 해주어서는 안 됩니다."
           </blockquote>
           <cite className="text-stone-500 font-medium">- Maria Montessori</cite>
        </section>

      </div>
    </div>
  );
}
