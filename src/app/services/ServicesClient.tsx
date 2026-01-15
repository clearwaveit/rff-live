"use client"

import Image from "next/image"
import ServicesHighlight from "@/components/ServicesHighlight"
import MaterialsList from "@/components/MaterialsList"
import Cta from "@/components/Cta"
import LeafDivider from "@/components/LeafDivider"
import AboutIntro from "@/components/AboutIntro"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image src="/banner-service.png" alt="Services" fill priority className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-[2%] pb-16">
          <h1 className="text-white text-4xl sm:text-6xl font-light tracking-tight">Our Services</h1>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[#00272F] font-[300] text-[29px] sm:text-[38px] md:text-[45px] leading-[1.2] tracking-tight">
              At Recycle for Future Ltd, we provide a comprehensive range of plastic recycling services designed to help businesses manage plastic waste responsibly. <span className="text-[#9ED5BF]">Our services support circular economy objectives while delivering reliable, compliant, and commercially viable outcomes for UK organisations.</span>
            </p>
          </div>
        </div>
      </section>

      <LeafDivider className="my-4" />

      <ServicesHighlight 
        services={[
          {
            badge: "OUR SERVICES",
            title: "Plastic Recycling",
            desc: "We specialise in processing post-industrial and post-consumer plastic waste, including HDPE, LDPE, HIPS, PP, PS and ABS. Our state-of-the-art facility ensures precision at every stage, from sorting and cleaning to shredding and extrusion.",
            img: "/service-1.png",
            icon: "/green-leaf.png",
            bg: "bg-[#EAF8D5]",
            href: "/services/plastic-recycling"
          },
          {
            badge: "OUR SERVICES",
            title: "Pellets and Compounds",
            desc: "Supply of recycled plastic pellets and custom compounds developed to meet specific quality, performance, and sustainability requirements.",
            img: "/service-2.png",
            icon: "/leaf-2.png",
            bg: "bg-[#EAF8D5]",
            href: "/services/pellet-and-compounds"
          },
          {
            badge: "OUR SERVICES",
            title: "Toll Processing",
            desc: "Flexible toll processing services for businesses requiring plastic granulation, pelletising, compounding, or material testing without in-house capability.",
            img: "/service-3.png",
            icon: "/leaf-3.png",
            bg: "bg-[#EAF8D5]",
            href: "/services/toll-processing"
          }
        ]}
      />
      
      <LeafDivider className="my-4" />
      
      <MaterialsList />
      
      <LeafDivider className="my-4" />
      
      <AboutIntro 
        badge="WHY US?"
        title="At Recycle for Future Ltd, we help businesses "
        accent="embrace sustainability and support a circular economy. Our quality services make us the ideal partner for your plastic recycling needs."
        paragraph=""
        ctaLabel="CONTACT US"
        ctaHref="/contact"
        withWave={false}
      />
    </main>
  )
}
