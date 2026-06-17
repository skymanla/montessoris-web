import { PostData } from "@/lib/posts"
import { HeroSection } from "./components/HeroSection"
import { CounselMockupSection } from "./components/CounselMockupSection"
import { PhilosophySection } from "./components/PhilosophySection"
import { FeaturesSection } from "./components/FeaturesSection"
import { BlogPreviewSection } from "./components/BlogPreviewSection"

export default function HomeClient({ latestPosts }: { latestPosts: PostData[] }) {
  return (
    <div className="min-h-screen pt-16">
      <main>
        <HeroSection />
        <CounselMockupSection />
        <PhilosophySection />
        <FeaturesSection />
        <BlogPreviewSection latestPosts={latestPosts} />
      </main>
    </div>
  )
}
