import { Metadata } from "next"
import MontessoriClient from "./MontessoriClient"

export const metadata: Metadata = {
  title: "몬테소리란? | Montessori",
  description: "마리아 몬테소리 박사의 철학과 정통 몬테소리 교육의 3요소(아이, 환경, 교사)에 대해 알아보세요.",
}

export default function MontessoriPage() {
  return <MontessoriClient />
}
