import { Metadata } from "next"
import { notFound } from "next/navigation"
import ExperienceClient from "@/features/experience/ExperienceClient"
import { MATERIALS, getMaterial } from "@/features/experience/materials"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd } from "@/lib/structured-data"
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
    title: `교구 체험 — ${m.name}`,
    description: m.metaDescription,
    path: `/experience/${m.slug}/`,
  })
}

export default async function ExperienceScenePage({ params }: Props) {
  const { material } = await params
  const m = getMaterial(material)
  if (!m) notFound()

  const breadcrumb = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "교구 체험", path: "/experience/" },
    { name: m.name, path: `/experience/${m.slug}/` },
  ])

  return (
    <>
      <JsonLd data={breadcrumb} />
      <ExperienceClient material={m.slug} />
    </>
  )
}
