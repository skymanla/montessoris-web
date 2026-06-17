"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Section, Container } from "@/components/layout/Layout"

export function CounselMockupSection() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleCounselClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) {
      e.preventDefault()
      router.push("?counsel=open")
    }
  }

  return (
    <Section background="stone" className="py-20 lg:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* 설명 영역 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5f8d76]/10 text-[#4e7a66] text-xs font-semibold tracking-wide">
              <span>🤖 24시간 실시간 상담</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
              아이의 행동이 고민될 때,<br/>
              <span className="text-[#5f8d76]">AI 마리 선생님</span>에게 물어보세요
            </h2>
            <p className="text-stone-600 leading-relaxed text-base sm:text-lg">
              미국 몬테소리 협회(AMS) 기준의 정통 육아 이론을 학습한 안심 AI 상담사 마리가 대기하고 있습니다. 
              가정 환경 구성부터 훈육 고민까지, 언제 어디서나 따뜻한 길잡이가 되어 드립니다.
            </p>
            <div className="pt-2">
              <Link 
                href="/counsel"
                onClick={handleCounselClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#5f8d76] hover:bg-[#4e7a66] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                무료 AI 상담 시작하기
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>

          {/* 모의 대화창 영역 */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-xl border border-stone-200/60 overflow-hidden max-w-xl mx-auto lg:ml-auto">
              {/* 헤더 */}
              <div className="flex items-center gap-3 border-b border-stone-100 bg-stone-50/50 px-5 py-4">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #7fae97 0%, #4e7a66 100%)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="9.5" r="4.5" fill="#fff" opacity="0.95" />
                    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" fill="#fff" opacity="0.95" />
                    <path d="M10 9.2q2 1.4 4 0" stroke="#4e7a66" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-800">마리 · AI 몬테소리 상담사</h3>
                  <p className="text-[10px] text-[#5f8d76] font-medium">실시간 답변 가능</p>
                </div>
              </div>

              {/* 메시지 리스트 */}
              <div className="p-5 space-y-4 text-sm bg-stone-50/30">
                {/* 부모 메시지 */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-[#5f8d76] text-white rounded-2xl rounded-br-none px-4 py-3 shadow-sm leading-relaxed">
                    18개월 아이가 자꾸 손에 잡히는 물건을 던져요. 화내지 않고 훈육하는 법이 있을까요?
                  </div>
                </div>

                {/* AI 답변 */}
                <div className="flex justify-start items-start gap-2.5">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'linear-gradient(135deg, #7fae97 0%, #4e7a66 100%)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="9.5" r="4.5" fill="#fff" />
                    </svg>
                  </span>
                  <div className="max-w-[85%] bg-white border border-stone-200/80 text-stone-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm leading-relaxed space-y-2">
                    <p>
                      아이가 물건을 던지는 행동은 무조건적인 말썽이라기보다 **중력과 포물선 궤적을 관찰하고자 하는 정상적인 감각적 흥미**일 가능성이 큽니다.
                    </p>
                    <p className="font-semibold text-[#4e7a66]">몬테소리 안심 제안:</p>
                    <ul className="list-disc list-inside space-y-1 text-stone-600 pl-1 text-[13px]">
                      <li><strong className="text-stone-700">대체 욕구 해소</strong>: "이것은 던지는 게 아니야"라고 제한하는 대신, "대신 이 부드러운 공은 던져도 돼"라며 던질 수 있는 바구니와 안전한 물건(펠트공, 양말 뭉치)을 마련해 주세요.</li>
                      <li><strong className="text-stone-700">명확한 한계 설정</strong>: 단단하거나 위험한 것을 던지려 할 때는 단호하되 평온한 목소리로 손을 부드럽게 잡으며 "물건은 다치게 할 수 있어"라고 알려줍니다.</li>
                    </ul>
                  </div>
                </div>

                {/* 두번째 부모 메시지 */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-[#5f8d76] text-white rounded-2xl rounded-br-none px-4 py-3 shadow-sm leading-relaxed">
                    가정에서 몬테소리 환경을 만들어 줄 때 가장 중요한 핵심이 무엇인가요?
                  </div>
                </div>

                {/* AI 답변 */}
                <div className="flex justify-start items-start gap-2.5">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'linear-gradient(135deg, #7fae97 0%, #4e7a66 100%)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="9.5" r="4.5" fill="#fff" />
                    </svg>
                  </span>
                  <div className="max-w-[85%] bg-white border border-stone-200/80 text-stone-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm leading-relaxed">
                    가장 중요한 것은 **'아이의 눈높이에 맞춘 독립적 환경(Prepared Environment)'**입니다. 스스로 교구를 선택하고 스스로 정리할 수 있도록 낮은 2단 교구장을 배치하고, 아이의 힘으로 들 수 있는 가벼운 쟁반을 마련해 내면의 질서감을 가꿔주세요.
                  </div>
                </div>
              </div>

              {/* 하단 입력 폼 모형 */}
              <div className="border-t border-stone-100 p-4 bg-white">
                <Link 
                  href="/counsel"
                  onClick={handleCounselClick}
                  className="flex items-center justify-between w-full rounded-2xl border border-stone-200 px-4 py-3 text-stone-400 text-sm hover:border-[#5f8d76]/50 transition-colors"
                >
                  <span>고민되는 아이 행동이나 육아 관련 질문을 적어보세요...</span>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: '#5f8d76' }}
                    aria-label="보내기"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10.2 16 12 3.4 13.8Z" fill="currentColor" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
