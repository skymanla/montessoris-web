import TermsClient from "@/features/legal/TermsClient"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "이용약관",
  description: "몬테소리 웹사이트의 이용약관입니다. 서비스 이용 조건 및 저작권 관련 사항을 확인하실 수 있습니다.",
  path: "/terms/",
})

export default function TermsPage() {
  return <TermsClient />
}
