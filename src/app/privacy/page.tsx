import PrivacyClient from "@/features/legal/PrivacyClient"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "개인정보처리방침",
  description: "몬테소리 웹사이트의 개인정보처리방침입니다. 수집하는 개인정보 항목, 이용 목적 및 광고 쿠키 사용에 대해 안내해 드립니다.",
  path: "/privacy/",
})

export default function PrivacyPage() {
  return <PrivacyClient />
}
