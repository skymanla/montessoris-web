import { PostData } from "@/lib/posts"
import { HeroSection } from "./components/HeroSection"
import { PhilosophySection } from "./components/PhilosophySection"
import { FeaturesSection } from "./components/FeaturesSection"
import { BlogPreviewSection } from "./components/BlogPreviewSection"

export default function HomeClient({ latestPosts }: { latestPosts: PostData[] }) {
  return (
    <div className="min-h-screen pt-16">
      <main>
        <HeroSection />
        <PhilosophySection />
        <FeaturesSection />
        <BlogPreviewSection latestPosts={latestPosts} />
      </main>
    </div>
  )
}
