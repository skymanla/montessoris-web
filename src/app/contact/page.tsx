import ContactClient from "@/features/contact/ContactClient"
import { createPageMetadata } from "@/lib/metadata"

const title = "몬테소리 교육 문의"
const description =
  "몬테소리 교육 프로그램, 부모 코칭, 가정 내 준비된 환경 구성에 대한 문의를 남겨주세요."

export const metadata = createPageMetadata({
  title,
  description,
  path: "/contact/",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
})

export default function ContactPage() {
  return <ContactClient />
}
