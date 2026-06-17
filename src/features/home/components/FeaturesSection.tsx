import Link from "next/link"
import { getDefaultDictionary } from "@/lib/dictionaries"
import { Section, Container } from "@/components/layout/Layout"

const dict = getDefaultDictionary()

export function FeaturesSection() {
  const features = [
    {
      title: dict.why.feature1_title,
      description: dict.why.feature1_desc,
      icon: "🎓"
    },
    {
      title: dict.why.feature2_title,
      description: dict.why.feature2_desc,
      icon: "🌱"
    },
    {
      title: dict.why.feature3_title,
      description: dict.why.feature3_desc,
      icon: "👨‍👩‍👧"
    }
  ]

  return (
    <Section background="white" id="about" className="py-20 lg:py-32">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">{dict.why.title}</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            {dict.why.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-stone-50 hover:bg-white border border-stone-100 hover:border-stone-200 transition-all hover:shadow-lg group flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed mb-6">{feature.description}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-stone-200/40">
                {idx === 0 && (
                  <Link href="/montessori" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4e7a66] hover:text-[#3c6150] transition-colors group/link">
                    정통 교육 기준 알아보기
                    <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                  </Link>
                )}
                {idx === 1 && (
                  <Link href="/programs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4e7a66] hover:text-[#3c6150] transition-colors group/link">
                    연령별 프로그램 정보
                    <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                  </Link>
                )}
                {idx === 2 && (
                  <Link href="/benefits" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4e7a66] hover:text-[#3c6150] transition-colors group/link">
                    부모 코칭 혜택 보기
                    <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
