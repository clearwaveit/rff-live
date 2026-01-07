import Hero from "@/components/Hero"
import AboutIntro from "@/components/AboutIntro"
import ServicesHighlight from "@/components/ServicesHighlight"
import Certifications from "@/components/Certifications"
import EmbeddedPartner from "@/components/EmbeddedPartner"
import Sustainability from "@/components/Sustainability"
import CollageZoom from "@/components/CollageZoom"
import NewsInsights from "@/components/NewsInsights"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description: "Leading UK plastic recycling specialist transforming waste into high-quality recycled materials. We offer plastic recycling, pellets, compounds, and toll processing services.",
  keywords: ["Plastic Recycling UK", "Recycled Plastic Pellets", "Plastic Waste Solutions", "Industrial Plastic Recycling"],
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutIntro 
        badge="ABOUT US"
        title="Driving circular plastic solutions through "
        accent="expertise, technology, and responsibility"
        paragraph={`Recycle for Future Ltd is a UK-based plastic recycling specialist helping businesses responsibly manage plastic waste. We transform post-industrial and post-consumer plastics into high-quality recycled materials, reducing reliance on virgin plastics and supporting sustainable manufacturing across the UK.

With over 20 years of industry experience, we deliver compliant, reliable, and commercially viable recycling solutions for organisations of all sizes.`}
        ctaLabel="Learn More About Us"
      />
      <ServicesHighlight 
        heading={
          <>
            Recycling services suited for every industry across the UK
          </>
        }
        services={[
          {
            badge: "OUR SERVICES",
            title: "Plastic Recycling",
            desc: "End-to-end recycling solutions for a wide range of plastics, converting waste into high-quality recycled pellets through efficient, compliant processes.",
            img: "/service-1.png",
            icon: "/green-leaf.png",
            bg: "bg-[#EAF8D5]",
            href: "/services/plastic-recycling"
          },
          {
            badge: "OUR SERVICES",
            title: "Pellets and Compounds",
            desc: "Production of recycled plastic pellets and custom compounds tailored to performance, quality, and sustainability requirements.",
            img: "/service-2.png",
            icon: "/leaf-2.png",
            bg: "bg-[#EAF8D5]",
            href: "/services/pellet-and-compounds"
          },
          {
            badge: "OUR SERVICES",
            title: "Toll Processing",
            desc: "Flexible toll processing services including granulating, pelletising, compounding, and material testing using state-of-the-art facilities.",
            img: "/service-3.png",
            icon: "/leaf-3.png",
            bg: "bg-[#EAF8D5]",
            href: "/services/toll-processing"
          }
        ]}
      />
      <Certifications />
      <EmbeddedPartner />
      <Sustainability />
      <CollageZoom />
      {/* <NewsInsights /> */}
    </main>
  )
}
