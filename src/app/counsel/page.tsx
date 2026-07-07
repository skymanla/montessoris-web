'use client'

import { useRouter } from 'next/navigation'
import { CounselPanel } from '@/features/counsel/CounselWidget'

export default function CounselPage() {
  const router = useRouter()

  const handleClose = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <main className="relative min-h-[100dvh] w-full bg-gradient-to-tr from-stone-100 via-[#f5f7f6] to-[#ecf2ef] overflow-hidden sm:p-6 md:p-8 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,500px)] lg:items-center lg:gap-10 xl:gap-16">
      <section className="relative z-10 hidden max-w-xl justify-self-end lg:block">
        <p className="mb-4 text-sm font-semibold text-[#4e7a66]">
          24시간 무료 AI 몬테소리 육아 상담
        </p>
        <div className="text-4xl font-bold leading-tight tracking-tight text-stone-900 xl:text-5xl">
          24시간 무료 AI 몬테소리 육아 상담
        </div>
        <p className="mt-6 text-lg leading-8 text-stone-600">
          아이의 떼쓰기, 언어 발달, 스크린 타임, 집에서 어떻게 놀아줘야 할지
          막막한 순간까지 몬테소리 관점으로 차분히 함께 풀어드립니다.
        </p>
        <ul className="mt-8 space-y-3 text-sm leading-6 text-stone-600">
          <li>오늘 아이를 조금 덜 혼내고 더 잘 바라볼 수 있는 질문</li>
          <li>0-6세 아이가 스스로 해보려는 마음을 지켜주는 대화</li>
          <li>분홍탑, 갈색계단, 숫자막대를 지금 꺼내도 좋을지 함께 고민</li>
          <li>엄마 마음이 놓일 때까지 이어갈 수 있는 후속 질문</li>
        </ul>
      </section>

      {/* Counseling Chat Container */}
      <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:flex sm:items-center sm:justify-center animate-in fade-in duration-500">
        <CounselPanel isPage={true} onClose={handleClose} />
      </div>
    </main>
  )
}
