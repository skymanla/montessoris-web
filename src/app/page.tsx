import { Metadata } from "next"
import HomeClient from "./HomeClient"

export const metadata: Metadata = {
  title: "홈 | Montessori",
  description: "아이의 잠재력을 깨우는 정통 AMS 몬테소리 교육. 엄마와 아이가 함께 성장하는 특별한 시간을 만나보세요.",
}

export default function Home() {
  return <HomeClient />
}
