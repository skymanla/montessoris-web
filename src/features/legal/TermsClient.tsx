import { DEFAULT_LOCALE, getDefaultDictionary } from "@/lib/dictionaries"

const dict = getDefaultDictionary()
const locale = DEFAULT_LOCALE

export default function TermsClient() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">{dict.terms.title}</h1>
        <div className="prose prose-stone max-w-none text-stone-600 space-y-6">
          {locale === "ko" ? (
            <>
              <p>본 이용약관은 몬테소리(이하 &apos;회사&apos;)가 제공하는 웹사이트 서비스의 이용조건 및 절차 등에 관한 사항을 규정함을 목적으로 합니다.</p>
              
              <h2 className="text-xl font-bold text-stone-800 mt-8">1. 서비스 이용</h2>
              <p>이용자는 본 약관 및 관련 법령을 준수하여 서비스를 이용해야 합니다. 회사는 정보 제공을 목적으로 웹사이트를 운영합니다.</p>

              <h2 className="text-xl font-bold text-stone-800 mt-8">2. 저작권</h2>
              <p>본 웹사이트에 게재된 모든 콘텐츠(텍스트, 이미지, 디자인 등)에 대한 저작권은 회사에 있으며, 사전 승인 없이 무단으로 복제하거나 배포할 수 없습니다.</p>

              <h2 className="text-xl font-bold text-stone-800 mt-8">3. 책임의 제한</h2>
              <p>회사는 웹사이트에서 제공되는 정보의 정확성을 기하기 위해 노력하나, 정보의 완전성이나 적시성에 대해 보증하지 않습니다. 이용자는 본인의 판단하에 정보를 이용해야 합니다.</p>
            </>
          ) : (
            <>
              <p>These Terms of Service govern your use of our website provided by Montessori.</p>
              
              <h2 className="text-xl font-bold text-stone-800 mt-8">1. Use of Service</h2>
              <p>Users must use the service in compliance with these terms and applicable laws. The website is operated for informational purposes.</p>

              <h2 className="text-xl font-bold text-stone-800 mt-8">2. Intellectual Property</h2>
              <p>All content on this website (text, images, design, etc.) is the property of Montessori and may not be reproduced or distributed without prior written consent.</p>

              <h2 className="text-xl font-bold text-stone-800 mt-8">3. Limitation of Liability</h2>
              <p>While we strive to ensure the accuracy of the information provided, we do not guarantee its completeness or timeliness. Users use the information at their own risk.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
