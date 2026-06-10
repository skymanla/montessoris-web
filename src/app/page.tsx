import HomeClient from "@/features/home/HomeClient"
import { getLatestPostsData } from "@/lib/posts"
import JsonLd from "@/components/JsonLd"
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data"
import { createPageMetadata } from "@/lib/metadata"

const title = "몬테소리 | 24H 무료 AI 육아 상담 & 몬테소리 가이드"
const description =
  "0-6세 아이의 자율성, 집중력, 독립성을 키우는 몬테소리 교육 정보와 가이드. 24시간 언제든 물어볼 수 있는 안심 AI 육아 상담 비서를 만나보세요."

export const metadata = createPageMetadata({ title, description, path: "/" })

export default function Home() {
  const latestPosts = getLatestPostsData(3)
  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <HomeClient latestPosts={latestPosts} />
    </>
  )
}
