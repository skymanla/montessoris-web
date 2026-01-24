import { Metadata } from "next"
import HomeClient from "./HomeClient"

export const metadata: Metadata = {
  title: "홈 | Montessori",
  description: "정통 AMS 몬테소리 교육으로 아이의 자율성과 잠재력을 깨워주세요. 0세부터 6세까지, 발달 단계별 맞춤형 교구와 준비된 환경을 제공합니다.",
}

export default function Home() {
  return <HomeClient />
}
