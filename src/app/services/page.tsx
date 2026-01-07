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
          <h1 className="text-white text-3xl sm:text-5xl font-light tracking-tight">Our Services</h1>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[#00272F] font-[300] text-[29px] sm:text-[38px] md:text-[45px] leading-[1.2] tracking-tight">
              At Recycle for Future Ltd, we help businesses manage plastic waste responsibly, transforming it <br className="hidden md:block" />
              <span className="text-[#9ED5BF]">into a valuable resource that supports the circular economy and minimizes environmental impact.</span>
            </p>
          </div>
        </div>
      </section>

      <LeafDivider className="my-4" />

      <ServicesHighlight />
      
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
