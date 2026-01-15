// ...existing code...
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

export default function TollProcessingPage() {
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
        <Image src="/banner-toll.png" alt="Toll Processing" fill priority className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-[2%] pb-16">
          <h1 className="page-hero-title text-white text-4xl sm:text-6xl font-light tracking-tight">Toll Processing</h1>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="page-intro text-[#00272F] font-[300] text-[29px] sm:text-[38px] md:text-[40px] leading-[1.2] tracking-tight">
              At Recycle for Future, we offer toll processing services that help bu<span className="text-[#BCDFD8]">sinesses convert plastic waste into reusable materials, supporting your sustainability goals.</span>
            </p>
          </div>
        </div>
      </section>

      <LeafDivider className="my-4" />

      <section className="relative">
        <div ref={containerRef} className="mx-auto max-w-[1600px] px-[2%] py-16">
          <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="benefits-image relative h-[600px] rounded-[12px] overflow-hidden">
              <Image src="/Rectangle 7 (2).png" alt="" fill className="object-cover" />
            </div>
            <div className="pe-[100px]">
              <h2 className="text-[60px]">What Is <br /><span className="text-[#BCDFD8]">Toll Processing?</span></h2>
              <p className="text-[18px] text-[#696969] font">Toll processing allows you to leverage our expertise and state-of-the-art facilities without the investment in your own equipment or the need to develop specialised in-house knowledge. We take your plastic waste and process it to your specifications, returning the recycled material to you for reuse in your operations or for sale to other companies.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
          <h2 className="text-center heading-2 mb-16">
            Toll processing services <span className="text-[#579C9C] font-light">to suit your specific needs</span>
          </h2>
          {/* First row - 2 cards */}
          <div className="process-grid mt-12 flex flex-col md:flex-row justify-between gap-6">
            <div className="process-card bg-[#3B6060] relative overflow-hidden rounded-[12px] p-8 md:h-[328px] h-[300px] w-full md:w-[calc(50%-12px)] flex flex-col justify-start group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute bottom-0 left-0 w-full h-[328px] bg-[#3B6060] opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out">
                <Image src="/vector-9.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="absolute bottom-10 right-10 w-40 h-40 opacity-80 z-10 flow-image-animate">
                <Image src="/vector-dark-flow.png" alt="Leaf" fill className="object-contain" />
              </div>
              <h3 className="text-[24px] md:text-[32px] text-[#ffffff] font-[400] mb-3">Granulating</h3>
              <p className="text-[#ffffff] text-[14px] md:text-[16px] leading-relaxed">We can granulate your plastic scrap into a consistent size, suitable for further processing or direct use in certain applications.</p>
            </div>
            <div className="process-card bg-[#3B6060] relative overflow-hidden rounded-[12px] p-8 md:h-[328px] h-[300px] w-full md:w-[calc(50%-12px)] flex flex-col justify-start group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute bottom-0 left-0 w-full h-[328px] bg-[#3B6060] opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out">
                <Image src="/vector-9.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="absolute bottom-10 right-10 w-40 h-40 opacity-80 z-10 flow-image-animate">
                <Image src="/vector-dark-flow.png" alt="Leaf" fill className="object-contain" />
              </div>
              <h3 className="text-[24px] md:text-[32px] text-[#ffffff] font-[400] mb-3">Pelletising</h3>
              <p className="text-[#ffffff] text-[14px] md:text-[16px] leading-relaxed">We can granulate your plastic scrap into a consistent size, suitable for further processing or direct use in certain applications.</p>
            </div>
          </div>

          {/* Second row - 2 cards */}
          <div className="process-grid mt-6 flex flex-col md:flex-row justify-between gap-6">
            <div className="process-card bg-[#3B6060] relative overflow-hidden rounded-[12px] p-8 md:h-[328px] h-[300px] w-full md:w-[calc(50%-12px)] flex flex-col justify-start group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute bottom-0 left-0 w-full h-[328px] bg-[#3B6060] opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out">
                <Image src="/vector-9.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="absolute bottom-10 right-10 w-40 h-40 opacity-80 z-10 flow-image-animate">
                <Image src="/vector-dark-flow.png" alt="Leaf" fill className="object-contain" />
              </div>
              <h3 className="text-[24px] md:text-[32px] text-[#ffffff] font-[400] mb-3">Compounding</h3>
              <p className="text-[#ffffff] text-[14px] md:text-[16px] leading-relaxed">We can compound your recycled plastic with additives and other materials to create custom compounds that meet your specific requirements.</p>
            </div>
            <div className="process-card bg-[#3B6060] relative overflow-hidden rounded-[12px] p-8 md:h-[328px] h-[300px] w-full md:w-[calc(50%-12px)] flex flex-col justify-start group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute bottom-0 left-0 w-full h-[328px] bg-[#3B6060] opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out">
                <Image src="/vector-9.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="absolute bottom-10 right-10 w-40 h-40 opacity-80 z-10 flow-image-animate">
                <Image src="/vector-dark-flow.png" alt="Leaf" fill className="object-contain" />
              </div>
              <h3 className="text-[24px] md:text-[32px] text-[#ffffff] font-[400] mb-3">Material Testing</h3>
              <p className="text-[#ffffff] text-[14px] md:text-[16px] leading-relaxed">We can conduct various tests on your recycled plastic to assess its properties and ensure its quality and suitability for your intended use.</p>
            </div>
          </div>
        </div>
      </section>

      <LeafDivider className="my-4" />

      <BenefitsSection title="Benefits Of Toll Processing For Businesses" img="/Rectangle 7 (3).png" />

      <CustomSection title="Custom Solutions for Dependable Partnerships" img="/Rectangle 10.png" />

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
