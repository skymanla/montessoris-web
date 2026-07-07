import { absoluteUrl, siteConfig } from "@/lib/site"
import type { PostData } from "@/lib/posts"
import type { DefinitionEntry, FaqItem } from "@/lib/definitions"

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

// 정의형 페이지의 핵심 용어를 schema.org DefinedTerm으로 노출 —
// AI가 정의 답변을 하나의 엔티티로 신뢰·연결하도록 돕는다.
export function definedTermJsonLd(entry: DefinitionEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${entry.url}#definedterm`,
    name: entry.term,
    description: entry.shortDef,
    url: entry.url,
    inLanguage: siteConfig.language,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": `${siteConfig.url}/#montessori-glossary`,
      name: "몬테소리 용어 사전",
      url: absoluteUrl("/montessori/"),
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
    },
  }
}

type FaqJsonLdItem = FaqItem | { question: string; answer: string }

function normalizeFaqItem(item: FaqJsonLdItem) {
  if ("q" in item) {
    return { question: item.q, answer: item.a }
  }
  return item
}

// 페이지 하단 FAQ 블록(DefinitionFaq) 또는 교구/상담 FAQ와 대응하는 FAQPage 스키마.
export function faqPageJsonLd(faq: FaqJsonLdItem[], path?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(path ? { "@id": `${absoluteUrl(path)}#faq` } : {}),
    inLanguage: siteConfig.language,
    mainEntity: faq.map((item) => {
      const normalized = normalizeFaqItem(item)
      return {
        "@type": "Question",
        name: normalized.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: normalized.answer,
        },
      }
    }),
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
