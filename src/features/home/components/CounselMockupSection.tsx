"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Container } from "@/components/layout/Layout"

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
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* 설명 영역 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-sage-deep">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
              </span>
              24시간 실시간 상담
            </div>

            <h2 className="mt-5 font-display text-3xl sm:text-4xl font-medium leading-tight tracking-tight text-ink">
              아이의 행동이 고민될 때,
              <br />
              <span className="text-sage-deep">AI 마리 선생님</span>에게
              물어보세요
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink/70">
              미국 몬테소리 협회(AMS) 기준의 정통 육아 이론을 학습한 안심 AI 상담사
              마리가 대기하고 있습니다. 가정 환경 구성부터 훈육 고민까지, 언제
              어디서나 따뜻한 길잡이가 되어 드립니다.
            </p>

            <div className="mt-8">
              <Link
                href="/counsel"
                onClick={handleCounselClick}
                className="inline-flex items-center gap-2 rounded-md bg-sage px-6 py-3.5 font-semibold text-white transition-colors hover:bg-sage-deep"
              >
                무료 AI 상담 시작하기
                <span aria-hidden className="text-lg">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* 모의 대화창 영역 */}
          <div className="lg:col-span-7">
            <div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_24px_60px_-30px_rgba(38,64,47,0.45)] lg:ml-auto">
              {/* 헤더 */}
              <div className="flex items-center gap-3 border-b border-ink/[0.07] bg-linen/50 px-5 py-4">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #7fae97 0%, #33503f 100%)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="9.5" r="4.5" fill="#fff" opacity="0.95" />
                    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" fill="#fff" opacity="0.95" />
                    <path
                      d="M10 9.2q2 1.4 4 0"
                      stroke="#33503f"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">
                    마리 · AI 몬테소리 상담사
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-sage-deep">
                    실시간 답변 가능
                  </p>
                </div>
              </div>

              {/* 메시지 리스트 */}
              <div className="space-y-4 bg-paper/40 p-5 text-sm">
                {/* 부모 메시지 */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-sage px-4 py-3 leading-relaxed text-white shadow-sm">
                    18개월 아이가 자꾸 손에 잡히는 물건을 던져요. 화내지 않고
                    훈육하는 법이 있을까요?
                  </div>
                </div>

                {/* AI 답변 */}
                <div className="flex items-start justify-start gap-2.5">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #7fae97 0%, #33503f 100%)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="9.5" r="4.5" fill="#fff" />
                    </svg>
                  </span>
                  <div className="max-w-[85%] space-y-2 rounded-2xl rounded-bl-sm border border-ink/10 bg-white px-4 py-3 leading-relaxed text-ink/80 shadow-sm">
                    <p>
                      아이가 물건을 던지는 행동은 무조건적인 말썽이라기보다{" "}
                      <strong className="font-semibold text-ink">
                        중력과 포물선 궤적을 관찰하고자 하는 정상적인 감각적
                        흥미
                      </strong>
                      일 가능성이 큽니다.
                    </p>
                    <p className="font-semibold text-sage-deep">
                      몬테소리 안심 제안:
                    </p>
                    <ul className="list-inside list-disc space-y-1 pl-1 text-[13px] text-ink/65">
                      <li>
                        <strong className="text-ink">대체 욕구 해소</strong>:
                        “이것은 던지는 게 아니야”라고 제한하는 대신, “대신 이
                        부드러운 공은 던져도 돼”라며 던질 수 있는 바구니와 안전한
                        물건(펠트공, 양말 뭉치)을 마련해 주세요.
                      </li>
                      <li>
                        <strong className="text-ink">명확한 한계 설정</strong>:
                        단단하거나 위험한 것을 던지려 할 때는 단호하되 평온한
                        목소리로 손을 부드럽게 잡으며 “물건은 다치게 할 수
                        있어”라고 알려줍니다.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 두번째 부모 메시지 */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-sage px-4 py-3 leading-relaxed text-white shadow-sm">
                    가정에서 몬테소리 환경을 만들어 줄 때 가장 중요한 핵심이
                    무엇인가요?
                  </div>
                </div>

                {/* AI 답변 */}
                <div className="flex items-start justify-start gap-2.5">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #7fae97 0%, #33503f 100%)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="9.5" r="4.5" fill="#fff" />
                    </svg>
                  </span>
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-ink/10 bg-white px-4 py-3 leading-relaxed text-ink/80 shadow-sm">
                    가장 중요한 것은{" "}
                    <strong className="font-semibold text-ink">
                      ‘아이의 눈높이에 맞춘 독립적 환경(Prepared Environment)’
                    </strong>
                    입니다. 스스로 교구를 선택하고 스스로 정리할 수 있도록 낮은
                    2단 교구장을 배치하고, 아이의 힘으로 들 수 있는 가벼운 쟁반을
                    마련해 내면의 질서감을 가꿔주세요.
                  </div>
                </div>
              </div>

              {/* 하단 입력 폼 모형 */}
              <div className="border-t border-ink/[0.07] bg-white p-4">
                <Link
                  href="/counsel"
                  onClick={handleCounselClick}
                  className="flex w-full items-center justify-between rounded-lg border border-ink/15 px-4 py-3 text-sm text-ink/40 transition-colors hover:border-sage/60"
                >
                  <span>고민되는 아이 행동이나 육아 관련 질문을 적어보세요...</span>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-md text-white"
                    style={{ backgroundColor: "#5f8d76" }}
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3.4 20.4 21 12 3.4 3.6 3.4 10.2 16 12 3.4 13.8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
