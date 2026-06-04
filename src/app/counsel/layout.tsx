import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "몬테소리 상담",
  description: "몬테소리 교육에 대한 상담 대화 페이지입니다.",
  alternates: {
    canonical: "/counsel/",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function CounselLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
