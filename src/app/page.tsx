import Hero from "@/components/Hero"
import AboutIntro from "@/components/AboutIntro"
import LeafDivider from "@/components/LeafDivider"
import ServicesHighlight from "@/components/ServicesHighlight"
import Certifications from "@/components/Certifications"
import EmbeddedPartner from "@/components/EmbeddedPartner"
import VideoShowcase from "@/components/VideoShowcase"
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
    <main className="min-h-screen main-home">
      <Hero />
      <AboutIntro
        badge="ABOUT US"
        title={<>Driving circular plastic solutions<br />through expertise, technology, and responsibility</>}
        accent=""
        paragraph={`Recycle for Future Ltd is a UK-based plastic recycling specialist helping businesses responsibly manage plastic waste. We transform post-industrial and post-consumer plastics into high-quality recycled materials, reducing reliance on virgin plastics and supporting sustainable manufacturing across the UK.

        With over 10 years of industry experience, we deliver compliant, reliable, and commercially viable recycling solutions for organisations of all sizes.`}
        ctaLabel="Learn More About Us"
      />
      <LeafDivider className="my-4" />
      <ServicesHighlight
        layout="pinned"
        // heading={
        //   <>
        //     Recycling services suited for every industry across the UK
        //   </>
        // }
        services={[
          {
            badge: "OUR SERVICES",
            title: "Plastic Recycling",
            desc: "We specialise in processing post-industrial and post-consumer plastic waste, including HDPE, LDPE, HIPS, PP, PS and ABS. Our state-of-the-art facility ensures precision at every stage, from sorting and cleaning to shredding and extrusion.",
            img: "/service-1-new.png",
            icon: "/green-leaf.png",
            bg: "bg-[#d2ede6]",
            href: "/services/plastic-recycling"
          },
          {
            badge: "OUR SERVICES",
            title: "Compounding",
            desc: "Production of recycled plastic pellets and custom compounds tailored to performance, quality, and sustainability requirements.",
            img: "/service-2-new.png",
            icon: "/leaf-2.png",
            bg: "bg-[#d9f1db]",
            href: "/services/pellet-and-compounds"
          },
          {
            badge: "OUR SERVICES",
            title: "Toll Processing",
            desc: "Flexible toll processing services including granulating, pelletising, compounding, and material testing using state-of-the-art facilities.",
            img: "/service-3-new.png",
            icon: "/leaf-3.png",
            bg: "bg-[#e8eedf]",
            href: "/services/toll-processing"
          }
        ]}
      />
      {/* <Certifications /> */}
      <EmbeddedPartner className="mb-0" noBottomPadding />
      <VideoShowcase />
      <Sustainability />
      {/* <CollageZoom /> */}
      {/* <NewsInsights /> */}
    </main>
  )
}
