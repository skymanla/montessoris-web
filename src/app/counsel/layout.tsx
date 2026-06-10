import { createPageMetadata } from "@/lib/metadata"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/structured-data"

const title = "24시간 무료 AI 몬테소리 육아 상담소"
const description = "아이 떼쓰기, 언어 발달, 몬테소리 홈스쿨링 등 다양한 육아 고민을 AI 몬테소리 상담 비서와 실시간으로 나누고 해답을 찾으세요."

export const metadata = createPageMetadata({
  title,
  description,
  path: "/counsel/",
  robots: {
    index: true,
    follow: true,
  },
})

export default function CounselLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: title, description, path: "/counsel/" }),
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "AI 몬테소리 육아 상담", path: "/counsel/" },
          ]),
        ]}
      />
      {children}
    </>
  )
}
