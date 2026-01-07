"use client"

import Image from "next/image"
import Cta from "@/components/Cta"
import MaterialsList from "@/components/MaterialsList"
import Sustainability from "@/components/Sustainability"
import TailoredSolutions from "@/components/TailoredSolutions"
import BenefitsSection from "@/components/BenefitsSection"
import LeafDivider from "@/components/LeafDivider"
import AboutIntro from "@/components/AboutIntro"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CustomSection from "@/components/CustomSection"

export default function PelletAndCompoundsPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(".page-hero-title", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" })
      gsap.from(".page-intro", { y: 16, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.1 })

      const cards = gsap.utils.toArray<HTMLElement>(".process-card")
      gsap.set(cards, { y: 16, opacity: 0 })
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 85%",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen" ref={containerRef}>
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image src="/banner-pellets.png" alt="Pellet and Compounds" fill priority className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-[2%] pb-16">
          <h1 className="page-hero-title text-white text-4xl sm:text-6xl font-light tracking-tight">Pellet and Compounds</h1>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="page-intro text-[#00272F] font-[300] text-[29px] sm:text-[38px] md:text-[40px] leading-[1.2] tracking-tight">
              At Recycle for Future Ltd, we transform plastic waste into valuable recycled pellets and compounds, meeting client requirements while <span className="text-[#BCDFD8]">minimising environmental impact and supporting circular manufacturing.</span>
            </p>
          </div>
        </div>
      </section>

      <LeafDivider className="my-4" />

      <MaterialsList />

      <LeafDivider className="my-4" />

      <BenefitsSection 
        title="Benefits Of Pellet And Compounds For Businesses" 
        img="/Rectangle 7 (1).png" 
        intro="Plastic recycling delivers measurable benefits for businesses by supporting sustainability objectives while maintaining performance and reliability."
        bullets={[
          { label: "Affordable access to recycled materials", color: "#CFE9C6" },
          { label: "Lower environmental and carbon footprint", color: "#2A7E6E" },
          { label: "Improved brand and sustainability performance", color: "#6FBEC1" },
          { label: "Compliance with regulatory and industry standards", color: "#EAEFEA" }
        ]}
      />

      <CustomSection 
        title="Custom Blends for Trusted Partnerships" 
        img="/Rectangle 9.png" 
        paragraph="We work in partnership with our clients to develop customised recycled pellets and compounds, ensuring materials are tailored to specific applications, performance requirements, and production needs."
      />

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-12">
          <div className="rounded-[12px] md:h-[400px] bg-[#3B6060] text-white px-20 md:px-32 py-10 text-center">
            <h3 className="text-[32px] md:text-[64px] font-[300]">Join us in ensuring a sustainable <span className="text-[#BFD893]">future with our compliance</span></h3>
            <div className="mt-6 flex justify-center"><Cta href="/contact" label="LEARN MORE" tone="dark" /></div>
          </div>
        </div>
      </section>

      <AboutIntro
        badge="WHY US?"
        title="Our expertise in plastic recycling and commitment to sustainab"
        accent="ility make us the perfect partner for businesses in need of recycled materials."
        paragraph=""
        ctaLabel="CONTACT US"
        ctaHref="/contact"
        withWave={false}
      />
    </main>
  )
}
