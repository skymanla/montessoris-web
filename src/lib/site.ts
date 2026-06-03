export const siteConfig = {
  name: "몬테소리스",
  alternateName: "Montessori",
  url: "https://montessoris.net",
  description:
    "0-6세 아이의 자율성, 집중력, 생활 독립성을 돕는 몬테소리 교육 정보와 부모 코칭 가이드를 제공합니다.",
  ogImage: "/images/edu-rooms/TalkMedia_i_88239f1cd4c2.jpeg.jpeg",
  locale: "ko_KR",
  language: "ko-KR",
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}
