import { Metadata } from "next"
import BenefitDetailClient from "./BenefitDetailClient"
import { getDefaultDictionary } from "@/lib/dictionaries"
import JsonLd from "@/components/JsonLd"
import {
  breadcrumbJsonLd,
  definedTermJsonLd,
  faqPageJsonLd,
} from "@/lib/structured-data"
import { getDefinition } from "@/lib/definitions"
import { createPageMetadata } from "@/lib/metadata"

const dict = getDefaultDictionary()

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const benefit = dict.benefits.items.find((item: { id: string }) => item.id === id)
  const title = benefit?.title || "몬테소리 교육 장점 상세"
  const description = benefit?.desc || "몬테소리 교육의 구체적인 장점에 대해 자세히 알아보세요."
  
  return createPageMetadata({ title, description, path: `/benefits/${id}/` })
}

export function generateStaticParams() {
  return dict.benefits.items.map((item: { id: string }) => ({
    id: item.id,
  }))
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const benefit = dict.benefits.items.find((item: { id: string }) => item.id === id)
  const def = getDefinition(`benefits-${id}`)
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "몬테소리 교육의 장점", path: "/benefits/" },
    { name: benefit?.title || "장점 상세", path: `/benefits/${id}/` },
  ])

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema,
          ...(def
            ? [definedTermJsonLd(def), faqPageJsonLd(def.faq, `/benefits/${id}/`)]
            : []),
        ]}
      />
      <BenefitDetailClient id={id} />
    </>
  )
}
