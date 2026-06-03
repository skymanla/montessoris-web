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
    <main className="relative min-h-[100dvh] w-full flex items-center justify-center bg-gradient-to-tr from-stone-100 via-[#f5f7f6] to-[#ecf2ef] overflow-hidden sm:p-6 md:p-8">
      {/* Background decorative soft blur elements (Desktop only) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#7fae97]/10 blur-[120px] pointer-events-none hidden sm:block" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-amber-100/20 blur-[140px] pointer-events-none hidden sm:block" />

      {/* Counseling Chat Container */}
      <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:flex sm:items-center sm:justify-center animate-in fade-in duration-500">
        <CounselPanel isPage={true} onClose={handleClose} />
      </div>
    </main>
  )
}
