import { Metadata } from "next"
import BenefitDetailClient from "./BenefitDetailClient"
import { getDictionary } from "@/lib/dictionaries"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd } from "@/lib/structured-data"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const dict = getDictionary("ko")
  const benefit = dict.benefits.items.find((item: { id: string }) => item.id === id)
  
  return {
    title: benefit?.title || "몬테소리 교육 장점 상세",
    description: benefit?.desc || "몬테소리 교육의 구체적인 장점에 대해 자세히 알아보세요.",
    alternates: {
      canonical: `/benefits/${id}`,
    },
    openGraph: {
      title: benefit?.title || "몬테소리 교육 장점 상세",
      description: benefit?.desc || "몬테소리 교육의 구체적인 장점에 대해 자세히 알아보세요.",
      url: `/benefits/${id}`,
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

export default async function Page({ params }: Props) {
  const { id } = await params
  const dict = getDictionary("ko")
  const benefit = dict.benefits.items.find((item: { id: string }) => item.id === id)
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "몬테소리 교육의 장점", path: "/benefits" },
    { name: benefit?.title || "장점 상세", path: `/benefits/${id}` },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <BenefitDetailClient id={id} />
    </>
  )
}
