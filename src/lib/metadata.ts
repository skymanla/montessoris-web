import type { Metadata } from "next"
import { absoluteUrl, siteConfig } from "./site"

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  image?: string
  openGraph?: NonNullable<Metadata["openGraph"]>
  robots?: Metadata["robots"]
}

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  openGraph,
  robots,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
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
