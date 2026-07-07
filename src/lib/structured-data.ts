import { absoluteUrl, siteConfig } from "@/lib/site"
import type { PostData } from "@/lib/posts"

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: siteConfig.url,
  logo: absoluteUrl("/icon.svg"),
  image: absoluteUrl(siteConfig.ogImage),
  description: siteConfig.description,
  inLanguage: siteConfig.language,
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: siteConfig.url,
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
  inLanguage: siteConfig.language,
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: siteConfig.language,
  }
}

export function itemListJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqPageJsonLd(
  questions: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function learningResourceJsonLd({
  name,
  description,
  path,
  age,
  keywords,
}: {
  name: string
  description: string
  path: string
  age: string
  keywords?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: siteConfig.language,
    learningResourceType: "Interactive Montessori material guide",
    educationalUse: ["sensorial exploration", "home activity"],
    typicalAgeRange: age,
    keywords,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
  }
}

export function articleJsonLd(post: PostData) {
  const canonicalPath = `/blog/${post.id}/`

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(canonicalPath),
    url: absoluteUrl(canonicalPath),
    author: {
      "@id": `${siteConfig.url}/#organization`,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    image: absoluteUrl(post.image || siteConfig.ogImage),
    inLanguage: siteConfig.language,
  }
}
