
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "교육 프로그램",
  description: "Nido(0-14개월), IC(14-36개월), Casa(3-6세) 및 부모 코칭까지, 아이의 발달 단계에 맞춘 몬테소리 커리큘럼입니다.",
}

export default function ProgramsPage() {
  return (
    <div className="min-h-screen pt-16 font-[family-name:var(--font-geist-sans)] pb-24">
      {/* Title Header */}
      <div className="bg-stone-100 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6">교육 프로그램</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          신생아부터 학령기 전 아동까지, 아이의 황금기를 함께하는 단계별 커리큘럼입니다.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              age: "0-14개월",
              name: "Nido (니도)",
              description: "신뢰감 형성과 대소근육 발달을 돕는 감각 환경",
              color: "bg-rose-50"
            },
            {
              age: "14-36개월",
              name: "IC (Infant Community)",
              description: "언어 폭발기와 자아 형성을 돕는 독립심 교육",
              color: "bg-amber-50"
            },
            {
              age: "3-6세",
              name: "Casa (어린이의 집)",
              description: "일상, 감각, 언어, 수, 문화의 5대 영역 통합 교육",
              color: "bg-emerald-50"
            },
            {
              age: "전 연령",
              name: "부모 코칭",
              description: "가정 내 몬테소리 환경 구성 및 상호작용 가이드",
              color: "bg-blue-50"
            }
          ].map((program, idx) => (
            <div key={idx} className={`${program.color} p-8 rounded-3xl border border-stone-200/50 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow`}>
              <span className="text-sm font-bold text-stone-500 mb-2">{program.age}</span>
              <h3 className="text-xl font-bold text-stone-900 mb-4">{program.name}</h3>
              <p className="text-stone-600 text-sm leading-relaxed flex-grow">{program.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Content for Program Page */}
        <section className="mt-24 bg-stone-50 p-12 rounded-3xl border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">프로그램 특징</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-stone-800">1:1 맞춤형 교육</h3>
              <p className="text-stone-600">아이마다 다른 발달 속도와 관심사를 존중하여 개별 맞춤 진도로 수업이 진행됩니다.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-stone-800">정통 AMS 교구</h3>
              <p className="text-stone-600">미국 몬테소리 협회(AMS) 인증 기준을 통과한 고품질 원목 교구들을 사용하여 감각 학습을 극대화합니다.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
