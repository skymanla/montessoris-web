import { Metadata } from "next"
import BenefitsClient from "./BenefitsClient"

export const metadata: Metadata = {
  title: "몬테소리 교육의 장점 | Montessori",
  description: "자율성, 독립심, 집중력, 사회성, 창의성 등 아이의 무한한 잠재력을 깨우는 몬테소리 교육의 특별한 장점을 알아보세요.",
}

export default function BenefitsPage() {
  return <BenefitsClient />
}
