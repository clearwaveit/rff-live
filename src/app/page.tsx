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
import ConsultationBanner from "@/components/ConsultationBanner"
import QualitySection from "@/components/QualitySection"
import CircleFeatures from "@/components/CircleFeatures"
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
        badge="ABOUT"
        title={<>Driving circular plastic solutions through <br/> expertise, technology, and responsibility</>}
        accent=""
        paragraph={`We transform post-industrial and post-consumer plastics into\nhigh-quality recycled materials, reducing reliance on virgin\nplastics and supporting sustainable manufacturing across the UK.`}
        // ctaLabel="Learn More About Us"
      />
      <LeafDivider variant="leaves" />
      <ServicesHighlight
        layout="pinned"
        ctaBtnRadius="10px 0 0 12px"
        rightImage="/images/btn-right.png"
        ctaArrowBg="/images/arrow_bg_new.png"
        ctaBtnBg="#222F30"
        // heading={
        //   <>
        //     Recycling services suited for every industry across the UK
        //   </>
        // }
        services={[
          {
            badge: "OUR SERVICES",
            title: (
              <>
                Plastic<br />Recycling
              </>
            ),
            desc: "We specialise in processing post-industrial and post-consumer plastic waste, including HDPE, LDPE, HIPS, PP, PS and ABS. Our state-of-the-art facility ensures precision at every stage, from sorting and cleaning to shredding and extrusion.",
            img: "/service-1-new2.png",
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
      <ConsultationBanner className="py-8 sm:py-[150px]" />
      <QualitySection />
      {/* <Certifications /> */}
      {/* <EmbeddedPartner className="mb-0" noBottomPadding /> */}
      <AboutIntro
        className=""
        badge="ENVIRONMENT"
        badgeSize="160px"
        titleSize="26px"
        title={<>At Recycle for Future , environmental responsibility shapes every stage of the recycling process. A strict zero-landfill approach ensures plastics are retained within recovery pathways, preserving valuable resources and preventing unnecessary environmental impact. Through circular processing systems and responsible sourcing practices, waste materials are transformed into long-term industrial value while supporting the transition towards more sustainable manufacturing.</>}
        fontWeight="400"
      />
      <CircleFeatures />
      <VideoShowcase />
      {/* <Sustainability /> */}
      {/* <CollageZoom /> */}
      {/* <NewsInsights /> */}
    </main>
  )
}
