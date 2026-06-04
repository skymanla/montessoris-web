import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "24시간 무료 AI 몬테소리 육아 상담소",
  description: "아이 떼쓰기, 언어 발달, 몬테소리 홈스쿨링 등 다양한 육아 고민을 AI 몬테소리 상담 비서와 실시간으로 나누고 해답을 찾으세요.",
  alternates: {
    canonical: "/counsel/",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CounselLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
