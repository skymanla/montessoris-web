import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 tracking-tight mb-6 leading-tight">
                아이의 잠재력을 깨우는 <br/>
                <span className="text-stone-500">Montessori</span>
              </h1>
              <p className="mt-4 text-xl text-stone-600 mb-10 leading-relaxed">
                엄마와 아이가 함께 성장하는 특별한 시간.<br/>
                미국 몬테소리 협회(AMS) 기준에 맞춘 정통 교육 프로그램을 만나보세요.
              </p>
              <div className="flex justify-center gap-4">
                <button className="px-8 py-4 bg-stone-900 text-white rounded-full font-semibold text-lg hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  체험 수업 신청하기
                </button>
                <button className="px-8 py-4 bg-white text-stone-900 border border-stone-200 rounded-full font-semibold text-lg hover:bg-stone-50 transition-all shadow-sm hover:shadow-md">
                  프로그램 자세히 보기
                </button>
              </div>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-green-100/50 rounded-full blur-3xl opacity-60"></div>
          </div>
        </section>

        {/* What is Montessori Section */}
        <section className="py-24 bg-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                 {/* Placeholder for Montessori Environment Image - Using a colored div for now, ideally replaces with Image component */}
                 <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400">
                    <span className="text-lg">몬테소리 교실 이미지</span>
                 </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-stone-900 mb-6 tracking-tight">
                  <span className="block text-lg text-stone-500 font-medium mb-2">Montessori Education</span>
                  "나 혼자 할 수 있도록 도와주세요"
                </h2>
                <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                  <p>
                    몬테소리 교육은 이탈리아의 의사이자 교육가였던 마리아 몬테소리 박사가 창안한 교육법입니다.
                    아이들은 스스로 배우고자 하는 본능적인 욕구를 가지고 태어난다는 믿음에서 시작합니다.
                  </p>
                  <p>
                    우리의 역할은 아이를 가르치는 것이 아니라,
                    <strong className="text-stone-800"> '준비된 환경'</strong>을 제공하여
                    아이 스스로 잠재력을 발휘하고 성장할 수 있도록 돕는 것입니다.
                  </p>
                  <ul className="space-y-4 mt-4 text-base">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 mr-3 mt-1">✓</span>
                      <span>자율성을 존중하는 아이 중심 교육</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 mr-3 mt-1">✓</span>
                      <span>개별 발달 단계에 맞춘 1:1 교구 활동</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 mr-3 mt-1">✓</span>
                      <span>질서감과 집중력을 키우는 환경</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features/Philosophy Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">왜 Montessori인가요?</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                아이의 발달 단계에 맞춘 체계적인 환경과 교구로 자율성과 집중력을 키워줍니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "AMS 기준 정통 교육",
                  description: "미국 몬테소리 협회의 기준을 철저히 준수한 교육 환경과 커리큘럼을 제공합니다.",
                  icon: "🎓"
                },
                {
                  title: "발달 단계별 맞춤",
                  description: "아이의 개월 수와 발달 속도에 맞춘 1:1 개별 맞춤 교육 프로그램을 운영합니다.",
                  icon: "🌱"
                },
                {
                  title: "부모 교육 프로그램",
                  description: "아이를 더 잘 이해할 수 있도록 부모님을 위한 체계적인 가이드를 함께 제공합니다.",
                  icon: "👨‍👩‍👧"
                }
              ].map((feature, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-stone-50 hover:bg-white border border-stone-100 hover:border-stone-200 transition-all hover:shadow-lg group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
