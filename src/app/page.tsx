import { Metadata } from "next"
import HomeClient from "@/features/home/HomeClient"
import { getLatestPostsData } from "@/lib/posts"
import JsonLd from "@/components/JsonLd"
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data"

const title = "몬테소리스 | AMS 몬테소리 유아교육과 부모 코칭"
const description =
  "0-6세 아이의 자율성, 집중력, 생활 독립성을 키우는 몬테소리 교육 정보와 가정 실천 가이드를 제공합니다."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    images: ["/images/edu-rooms/TalkMedia_i_88239f1cd4c2.jpeg.jpeg"],
  },
}

export default function Home() {
  const latestPosts = getLatestPostsData(3)
  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <HomeClient latestPosts={latestPosts} />
    </>
  )
}
