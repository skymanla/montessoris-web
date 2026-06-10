import MontessoriClient from "@/features/montessori/MontessoriClient"
import { createPageMetadata } from "@/lib/metadata"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/structured-data"

const title = "몬테소리 교육이란? 철학과 준비된 환경"
const description =
  "마리아 몬테소리의 교육 철학, 준비된 환경, 아이 중심 관찰, 교사의 역할을 부모가 이해하기 쉽게 정리했습니다."

export const metadata = createPageMetadata({ title, description, path: "/montessori/" })

export default function MontessoriPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: title, description, path: "/montessori/" }),
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "몬테소리 교육이란?", path: "/montessori/" },
          ]),
        ]}
      />
      <MontessoriClient />
    </>
  )
}
