
import { Metadata } from "next"
import ProgramsClient from "@/features/programs/ProgramsClient"

export const metadata: Metadata = {
  title: "프로그램 | Montessori",
  description: "정통 AMS 몬테소리 프로그램: Nido(0-14개월), IC(14-36개월), Casa(3-6세) 및 부모 코칭. 아이의 결정적 시기를 위한 맞춤형 교육 커리큘럼을 만나보세요.",
}

export default function ProgramsPage() {
  return <ProgramsClient />
}
