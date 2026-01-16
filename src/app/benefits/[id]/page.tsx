import { Metadata } from "next"
import BenefitDetailClient from "./BenefitDetailClient"
import { getDictionary } from "@/lib/dictionaries"

type Props = {
  params: { id: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const dict = getDictionary("ko")
  const benefit = dict.benefits.items.find((item: { id: string }) => item.id === params.id)
  
  return {
    title: `${benefit?.title || "장점 상세"} | Montessori`,
    description: benefit?.desc || "몬테소리 교육의 구체적인 장점에 대해 자세히 알아보세요.",
  }
}

export function generateStaticParams() {
  const dict = getDictionary("ko")
  return dict.benefits.items.map((item: { id: string }) => ({
    id: item.id,
  }))
}

export default function Page({ params }: Props) {
  return <BenefitDetailClient id={params.id} />
}
