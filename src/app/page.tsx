import Hero from "@/components/Hero"
import AboutIntro from "@/components/AboutIntro"
import ServicesHighlight from "@/components/ServicesHighlight"
import Certifications from "@/components/Certifications"
import EmbeddedPartner from "@/components/EmbeddedPartner"
import Sustainability from "@/components/Sustainability"
import CollageZoom from "@/components/CollageZoom"
import NewsInsights from "@/components/NewsInsights"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutIntro />
      <ServicesHighlight />
      <Certifications />
      <EmbeddedPartner />
      <Sustainability />
      <CollageZoom />
      <NewsInsights />
    </main>
  )
}
