import ProgramsClient from "@/features/programs/ProgramsClient"
import { createPageMetadata } from "@/lib/metadata"
import JsonLd from "@/components/JsonLd"
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/structured-data"

const title = "0-6세 몬테소리 프로그램과 부모 코칭"
const description =
  "Nido, Infant Community, Casa 단계별 몬테소리 교육과 부모 코칭을 통해 아이의 결정적 시기에 맞는 환경 구성을 안내합니다."

export const metadata = createPageMetadata({ title, description, path: "/programs/" })

export default function ProgramsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: title, description, path: "/programs/" }),
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "몬테소리 프로그램", path: "/programs/" },
          ]),
        ]}
      />
      <ProgramsClient />
    </>
  )
}
