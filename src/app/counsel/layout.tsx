import { createPageMetadata } from "@/lib/metadata"
import JsonLd from "@/components/JsonLd"
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "@/lib/structured-data"

const title = "24시간 무료 AI 몬테소리 육아 상담소"
const description =
  "아이 떼쓰기, 언어 발달, 스크린 타임, 집에서 하는 몬테소리 놀이가 막막할 때 24시간 무료 AI 몬테소리 육아 상담으로 차분히 풀어보세요."
const faqs = [
  {
    question: "AI 몬테소리 육아 상담은 어떤 질문에 답하나요?",
    answer:
      "아이의 떼쓰기, 언어 발달, 스크린 타임, 집 안 환경, 몬테소리 교구 선택처럼 엄마 마음이 자꾸 걸리는 고민을 함께 풀어볼 수 있어요.",
  },
  {
    question: "상담은 무료로 이용할 수 있나요?",
    answer:
      "네. 늦은 밤에도, 아이 낮잠 시간에도 편하게 질문해 보세요. 아이 나이와 지금 상황에 맞춰 오늘 해볼 수 있는 작은 방법부터 같이 찾아드립니다.",
  },
  {
    question: "몬테소리 교구 선택도 물어볼 수 있나요?",
    answer:
      "그럼요. 분홍탑, 갈색계단, 숫자막대를 지금 꺼내도 좋을지, 집에 있는 물건으로 어떻게 대신 놀아줄 수 있을지 편하게 물어보세요.",
  },
]

export const metadata = createPageMetadata({
  title,
  description,
  path: "/counsel/",
  keywords: [
    "24시간 무료 AI 몬테소리 육아 상담",
    "AI 육아 상담",
    "몬테소리 육아 상담",
    "무료 육아 상담",
    "몬테소리 홈스쿨링",
    "몬테소리 교구 상담",
  ],
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
          faqPageJsonLd(faqs),
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
