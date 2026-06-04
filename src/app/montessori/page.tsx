import { Metadata } from "next"
import MontessoriClient from "@/features/montessori/MontessoriClient"

const title = "몬테소리 교육이란? 철학과 준비된 환경"
const description =
  "마리아 몬테소리의 교육 철학, 준비된 환경, 아이 중심 관찰, 교사의 역할을 부모가 이해하기 쉽게 정리했습니다."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/montessori/",
  },
  openGraph: {
    title,
    description,
    url: "/montessori",
    images: ["/images/edu-rooms/TalkMedia_i_88239f1cd4c2.jpeg.jpeg"],
  },
}

export default function MontessoriPage() {
  return <MontessoriClient />
}
