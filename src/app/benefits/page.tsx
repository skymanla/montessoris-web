import { Metadata } from "next"
import BenefitsClient from "@/features/benefits/BenefitsClient"

const title = "몬테소리 교육 효과와 장점"
const description =
  "몬테소리 교육이 자율성, 독립심, 집중력, 사회성, 문제 해결력 발달에 어떤 도움을 주는지 구체적으로 알아보세요."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/benefits/",
  },
  openGraph: {
    title,
    description,
    url: "/benefits",
    images: ["/images/edu-rooms/TalkMedia_i_88239f1cd4c2.jpeg.jpeg"],
  },
}

export default function BenefitsPage() {
  return <BenefitsClient />
}
