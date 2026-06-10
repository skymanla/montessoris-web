import BenefitsClient from "@/features/benefits/BenefitsClient"
import { createPageMetadata } from "@/lib/metadata"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/structured-data"

const title = "몬테소리 교육 효과와 장점"
const description =
  "몬테소리 교육이 자율성, 독립심, 집중력, 사회성, 문제 해결력 발달에 어떤 도움을 주는지 구체적으로 알아보세요."

export const metadata = createPageMetadata({ title, description, path: "/benefits/" })

export default function BenefitsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: title, description, path: "/benefits/" }),
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "몬테소리 교육의 장점", path: "/benefits/" },
          ]),
        ]}
      />
      <BenefitsClient />
    </>
  )
}
