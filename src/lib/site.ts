export const siteConfig = {
  name: "몬테소리",
  alternateName: "montessoris.net",
  url: "https://montessoris.net",
  description:
    "0-6세 아이의 자율성, 집중력, 독립성을 돕는 몬테소리 교육 정보와 가이드. 24시간 언제든 물어볼 수 있는 안심 AI 육아 상담 비서를 만나보세요.",
  ogImage: "/images/edu-rooms/TalkMedia_i_88239f1cd4c2.jpeg.jpeg",
  locale: "ko_KR",
  language: "ko-KR",
  // 검색엔진 소유확인 토큰: 등록 후 발급받은 값을 채우면 자동으로 <meta>가 출력된다.
  verification: {
    google: "", // Google Search Console
    naver: "ca09bbfa2269181a0351ef541e4c00135b2265f5", // 네이버 서치어드바이저
  },
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}
