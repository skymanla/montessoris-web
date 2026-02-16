"use client"

import ImageSlider from "@/components/ImageSlider"
import { useLocale } from "@/components/LocaleContext"
import { Section, Container } from "@/components/layout/Layout"

export function PhilosophySection() {
  const { dict } = useLocale()

  return (
    <Section background="stone" className="py-20 lg:py-32">
      <Container>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px]">
            <ImageSlider />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-6 tracking-tight">
              <span className="block text-lg text-stone-500 font-medium mb-2">{dict.philosophy.badge}</span>
              {dict.philosophy.title}
            </h2>
            <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
              <p>
                {dict.philosophy.p1}
              </p>
              <p>
                {dict.philosophy.p2}
              </p>
              <ul className="space-y-4 mt-4 text-base">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 mr-3 mt-1">✓</span>
                  <span>{dict.philosophy.feature1}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 mr-3 mt-1">✓</span>
                  <span>{dict.philosophy.feature2}</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-stone-200 text-stone-600 mr-3 mt-1">✓</span>
                  <span>{dict.philosophy.feature3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
