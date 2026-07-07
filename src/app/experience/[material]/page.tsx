import { Metadata } from "next"
import { notFound } from "next/navigation"
import ExperienceClient from "@/features/experience/ExperienceClient"
import { MATERIALS, getMaterial } from "@/features/experience/materials"
import JsonLd from "@/components/JsonLd"
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  learningResourceJsonLd,
} from "@/lib/structured-data"
import { createPageMetadata } from "@/lib/metadata"

type Props = { params: Promise<{ material: string }> }

export function generateStaticParams() {
  return MATERIALS.map((m) => ({ material: m.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { material } = await params
  const m = getMaterial(material)
  if (!m) return {}
  return createPageMetadata({
    title: `몬테소리 ${m.name} 사용법 — 3D 교구 체험`,
    description: m.metaDescription,
    path: `/experience/${m.slug}/`,
    keywords: m.guide.keywords,
  })
}

export default async function ExperienceScenePage({ params }: Props) {
  const { material } = await params
  const m = getMaterial(material)
  if (!m) notFound()

  const structuredData = [
    breadcrumbJsonLd([
      { name: "홈", path: "/" },
      { name: "교구 체험", path: "/experience/" },
      { name: m.name, path: `/experience/${m.slug}/` },
    ]),
    learningResourceJsonLd({
      name: `몬테소리 ${m.name} 사용법`,
      description: m.guide.definition,
      path: `/experience/${m.slug}/`,
      age: m.age,
      keywords: m.guide.keywords,
    }),
    faqPageJsonLd(m.guide.faqs),
  ]

  return (
    <>
      <JsonLd data={structuredData} />
      <ExperienceClient material={m.slug} />
    </>
  )
}
