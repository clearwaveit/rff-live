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

export default function PlasticRecyclingPage() {
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
        <Image src="/banner-plastic.png" alt="Plastic Recycling" fill priority className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-[2%] pb-16">
          <h1 className="page-hero-title text-white text-3xl sm:text-5xl font-light tracking-tight">Plastic Recycling</h1>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
          <div className="max-w-[900px] mx-auto text-center">
            <p className="page-intro text-[#00272F] font-[300] text-[29px] sm:text-[38px] md:text-[45px] leading-[1.2] tracking-tight">
              Our end-to-end plastic recovery and recycling services are designed to r<span className="text-[#BCDFD8]">educe environmental impact, improve operational efficiency, and support a truly circular economy.
              </span>
            </p>
          </div>
        </div>
      </section>

      <LeafDivider className="my-4" />

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
          <h2 className="text-center text-[30px] md:text-[60px] font-light mb-16">
            Our process of <span className="text-[#579C9C] font-light">Transforming Plastic</span> <br />
            <span className="text-[#579C9C] font-light">Waste</span> into Valuable Resources
          </h2>
          <div className="process-grid mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="process-card relative overflow-hidden rounded-[12px] p-8 md:h-[439.39px] h-[300px] w-full md:w-[472.12px] flex flex-col justify-end group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute bottom-0 left-0 w-[472.12px] h-[439.39px] opacity-10 bg-[#BFD893]">
                <Image src="/vector-8.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="absolute top-20 right-10 w-32 h-32 opacity-80 z-10">
                <Image src="/vector-dark-flow.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="text-[#0D0D0D] text-[24px] md:text-[32px] font-[300] mb-auto">01 <span className="text-[#C2DDDD]">/ 05</span></div>
              <h3 className="text-[24px] md:text-[32px] text-[#013138] font-[400] mb-3">Collection and Sorting</h3>
              <p className="text-[#4E4E4E] text-[14px] md:text-[16px] leading-relaxed">We meticulously collect and sort plastic waste from various sources across the UK, including businesses, organisations, and local authorities.</p>
            </div>

            <div className="process-card relative overflow-hidden rounded-[12px] p-8 md:h-[439.39px] h-[300px] w-full md:w-[472.12px] flex flex-col justify-end group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute bottom-0 left-0 w-[472.12px] h-[439.39px] opacity-10 bg-[#BFD893]">
                <Image src="/vector-9.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="absolute top-20 right-10 w-32 h-32 opacity-80 z-10">
                <Image src="/vector-light-flow.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="text-[#0D0D0D] text-[24px] md:text-[32px] font-[300] mb-auto">02 <span className="text-[#C2DDDD]">/ 05</span></div>
              <h3 className="text-[24px] md:text-[32px] text-[#013138] font-[400] mb-3">Cleaning and Processing</h3>
              <p className="text-[#4E4E4E] text-[14px] md:text-[16px] leading-relaxed">The collected plastic undergoes a thorough cleaning and processing stage, removing any contaminants such as labels, adhesives, and other impurities.</p>
            </div>

            <div className="process-card relative overflow-hidden rounded-[12px] p-8 md:h-[439.39px] h-[300px] w-full md:w-[472.12px] flex flex-col justify-end group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute bottom-0 left-0 w-[472.12px] h-[439.39px] opacity-10 bg-[#BFD893]">
                <Image src="/vector-8.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="absolute top-20 right-10 w-32 h-32 opacity-80 z-10">
                <Image src="/vector-dark-flow.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="text-[#0D0D0D] text-[24px] md:text-[32px] font-[300] mb-auto">03 <span className="text-[#C2DDDD]">/ 05</span></div>
              <h3 className="text-[24px] md:text-[32px] text-[#013138] font-[400] mb-3">Shredding and Granulation</h3>
              <p className="text-[#4E4E4E] text-[14px] md:text-[16px] leading-relaxed">The cleaned plastic is then shredded into smaller pieces and granulated into a consistent size. This prepares the material for the pelletising stage, where it is transformed into recycled pellets.</p>
            </div>

            <div className="process-card relative overflow-hidden rounded-[12px] p-8 md:h-[439.39px] h-[300px] w-full flex flex-col justify-end group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute bottom-0 left-0 w-full h-[439.39px] opacity-10 bg-[#BFD893]">
                <Image src="/vector-9.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="absolute top-20 right-10 w-32 h-32 opacity-80 z-10">
                <Image src="/vector-light-flow.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="text-[#0D0D0D] text-[24px] md:text-[32px] font-[300] mb-auto">04 <span className="text-[#C2DDDD]">/ 05</span></div>
              <h3 className="text-[24px] md:text-[32px] text-[#013138] font-[400] mb-3">Pelletizing</h3>
              <p className="text-[#4E4E4E] text-[14px] md:text-[16px] leading-relaxed">The granulated plastic is fed into our state-of-the-art pelletising machines, where it is melted and extruded into uniform pellets. These recycled pellets are the building blocks for a wide range of new plastic products.</p>
            </div>

            <div className="process-card relative overflow-hidden rounded-[12px] p-8 md:h-[439.39px] h-[300px] w-full flex flex-col justify-end group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute bottom-0 left-0 w-full h-[439.39px] opacity-10 bg-[#BFD893]">
                <Image src="/vector-8.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="absolute top-20 right-10 w-32 h-32 opacity-80 z-10">
                <Image src="/vector-dark-flow.png" alt="Leaf" fill className="object-contain" />
              </div>
              <div className="text-[#0D0D0D] text-[24px] md:text-[32px] font-[300] mb-auto">05 <span className="text-[#C2DDDD]">/ 05</span></div>
              <h3 className="text-[24px] md:text-[32px] text-[#013138] font-[400] mb-3">Quality Control</h3>
              <p className="text-[#4E4E4E] text-[14px] md:text-[16px] leading-relaxed">Throughout the entire recycling process, we implement rigorous quality control measures to ensure that our recycled plastic products meet the highest industry standards. We conduct various tests to assess the properties of the recycled plastic, such as melt flow, impact resistance, and tensile strength.</p>
            </div>
          </div>


        </div>
      </section>

      <MaterialsList />

      <LeafDivider className="my-4" />

      <BenefitsSection title="Benefits Of Plastic Recycling For Businesses" img="/Rectangle 7.png" />

      <CustomSection title="Tailored Solutions for Reliable Collaborations" img="/Rectangle 8.png" />

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
    </main >
  )
}
