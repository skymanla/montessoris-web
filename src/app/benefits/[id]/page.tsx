import { Metadata } from "next"
import BenefitDetailClient from "./BenefitDetailClient"
import { getDictionary } from "@/lib/dictionaries"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd } from "@/lib/structured-data"

type Props = {
  params: { id: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const dict = getDictionary("ko")
  const benefit = dict.benefits.items.find((item: { id: string }) => item.id === params.id)
  
  return {
    title: benefit?.title || "몬테소리 교육 장점 상세",
    description: benefit?.desc || "몬테소리 교육의 구체적인 장점에 대해 자세히 알아보세요.",
    alternates: {
      canonical: `/benefits/${params.id}`,
    },
    openGraph: {
      title: benefit?.title || "몬테소리 교육 장점 상세",
      description: benefit?.desc || "몬테소리 교육의 구체적인 장점에 대해 자세히 알아보세요.",
      url: `/benefits/${params.id}`,
      images: ["/images/edu-rooms/TalkMedia_i_88239f1cd4c2.jpeg.jpeg"],
    },
  }
}

export function generateStaticParams() {
  const dict = getDictionary("ko")
  return dict.benefits.items.map((item: { id: string }) => ({
    id: item.id,
  }))
}

export default function Page({ params }: Props) {
  const dict = getDictionary("ko")
  const benefit = dict.benefits.items.find((item: { id: string }) => item.id === params.id)
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "몬테소리 교육의 장점", path: "/benefits" },
    { name: benefit?.title || "장점 상세", path: `/benefits/${params.id}` },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <BenefitDetailClient id={params.id} />
    </>
  )
}
