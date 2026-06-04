
import { Metadata } from "next"
import ProgramsClient from "@/features/programs/ProgramsClient"

const title = "0-6세 몬테소리 프로그램과 부모 코칭"
const description =
  "Nido, Infant Community, Casa 단계별 몬테소리 교육과 부모 코칭을 통해 아이의 결정적 시기에 맞는 환경 구성을 안내합니다."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/programs/",
  },
  openGraph: {
    title,
    description,
    url: "/programs",
    images: ["/images/edu-rooms/TalkMedia_i_88239f1cd4c2.jpeg.jpeg"],
  },
}

export default function ProgramsPage() {
  return <ProgramsClient />
}
