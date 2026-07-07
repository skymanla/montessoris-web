import type { Metadata } from "next"
import { absoluteUrl, siteConfig } from "./site"

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  image?: string
  keywords?: string[]
  openGraph?: NonNullable<Metadata["openGraph"]>
  robots?: Metadata["robots"]
}

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  keywords,
  openGraph,
  robots,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": "/rss.xml",
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      images: [image],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
    ...(robots ? { robots } : {}),
  }
}
