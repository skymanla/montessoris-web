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
            <div key={idx} className="p-8 rounded-2xl bg-stone-50 hover:bg-white border border-stone-100 hover:border-stone-200 transition-all hover:shadow-lg group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
              <p className="text-stone-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
