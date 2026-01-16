"use client"

import { useLocale } from "@/components/LocaleContext"

export default function PrivacyClient() {
  const { dict, locale } = useLocale()

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">{dict.privacy.title}</h1>
        <div className="prose prose-stone max-w-none text-stone-600 space-y-6">
          {locale === "ko" ? (
            <>
              <p>본 개인정보처리방침은 몬테소리(이하 &apos;회사&apos;)가 운영하는 웹사이트 이용자의 개인정보를 보호하고 관련 법령을 준수하기 위해 수립되었습니다.</p>
              
              <h2 className="text-xl font-bold text-stone-800 mt-8">1. 수집하는 개인정보 항목</h2>
              <p>회사는 문의하기 서비스 제공을 위해 아래와 같은 개인정보를 수집할 수 있습니다.</p>
              <ul className="list-disc pl-5">
                <li>필수항목: 이름, 이메일 주소, 문의 내용</li>
              </ul>

              <h2 className="text-xl font-bold text-stone-800 mt-8">2. 개인정보의 수집 및 이용 목적</h2>
              <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
              <ul className="list-disc pl-5">
                <li>고객 문의에 대한 답변 및 상담 서비스 제공</li>
              </ul>

              <h2 className="text-xl font-bold text-stone-800 mt-8">3. 광고 및 쿠키 사용</h2>
              <p>본 사이트는 구글 애드센스(Google AdSense)를 통해 광고를 게재할 수 있습니다. 구글은 사용자의 웹사이트 방문 기록을 바탕으로 광고를 제공하기 위해 쿠키(Cookie)를 사용합니다.</p>
              <p>사용자는 구글 광고 설정 페이지를 방문하여 맞춤설정 광고를 해제할 수 있습니다.</p>

              <h2 className="text-xl font-bold text-stone-800 mt-8">4. 개인정보의 보유 및 이용기간</h2>
              <p>원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정 기간 보관합니다.</p>
            </>
          ) : (
            <>
              <p>This Privacy Policy describes how Montessori (&apos;we&apos;, &apos;us&apos;, or &apos;our&apos;) collects, uses, and shares your personal information when you visit our website.</p>
              
              <h2 className="text-xl font-bold text-stone-800 mt-8">1. Information We Collect</h2>
              <p>We may collect the following information when you use our contact form:</p>
              <ul className="list-disc pl-5">
                <li>Name, Email address, Message content</li>
              </ul>

              <h2 className="text-xl font-bold text-stone-800 mt-8">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5">
                <li>Respond to your inquiries and provide customer support</li>
              </ul>

              <h2 className="text-xl font-bold text-stone-800 mt-8">3. Advertising and Cookies</h2>
              <p>This website may use Google AdSense to serve ads. Google uses cookies to serve ads based on a user&apos;s prior visits to your website or other websites.</p>
              <p>Users may opt out of personalized advertising by visiting Google Ads Settings.</p>

              <h2 className="text-xl font-bold text-stone-800 mt-8">4. Data Retention</h2>
              <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
