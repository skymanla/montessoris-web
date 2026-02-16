import { Metadata } from "next"
import ContactClient from "@/features/contact/ContactClient"

export const metadata: Metadata = {
  title: "문의하기 | Montessori",
  description: "몬테소리 교육 프로그램에 대해 궁금하신 점이 있으시면 언제든 문의해 주세요.",
}

export default function ContactPage() {
  return <ContactClient />
}
