
import { Metadata } from "next"
import ProgramsClient from "./ProgramsClient"

export const metadata: Metadata = {
  title: "프로그램 | Montessori",
  description: "니도(Nido), IC, 카사(Casa) 등 아이의 발달 단계에 맞춘 정통 AMS 몬테소리 프로그램을 확인해 보세요.",
}

export default function ProgramsPage() {
  return <ProgramsClient />
}
