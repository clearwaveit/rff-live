// ...
"use client"

import Image from "next/image"
import Cta from "@/components/Cta"
import SustainabilityMarquee from "@/components/Sustainability"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LeafDivider from "@/components/LeafDivider"

export default function SustainabilityPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(".page-hero-title", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" })
      gsap.from(".page-intro", { y: 16, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.1 })

      // First grid: image and content
      gsap.from(".sust-image", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sust-grid", start: "top 85%" },
      })
      gsap.from(".sust-content", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: { trigger: ".sust-grid", start: "top 85%" },
      })

      const features = gsap.utils.toArray<HTMLElement>(".feature-item")
      gsap.set(features, { y: 12, opacity: 0 })
      gsap.to(features, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".sust-content", start: "top 80%" },
      })

      // Final features block
      gsap.from(".sust-features-image", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sust-features", start: "top 85%" },
      })
      gsap.from(".sust-features .p-10", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: { trigger: ".sust-features", start: "top 85%" },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen" ref={containerRef}>
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image src="/banner-sustainable.png" alt="Sustainability" fill priority className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-[2%] pb-16">
          <h1 className="page-hero-title text-white text-3xl sm:text-5xl font-light tracking-tight">Sustainability</h1>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
          <div className="max-w-[900px] mx-auto text-center">
            <p className="page-intro text-[#00272F] font-[300] text-[29px] sm:text-[38px] md:text-[40px] leading-[1.4] tracking-tight">
              We maintain a Zero Landfill Policy, ensuring plastics are retained within reco<span className="text-[#BCDFD8]">very pathways rather than disposed of, protecting natural environments and preventing loss of valuable material.</span>
            </p>
          </div>
        </div>
      </section>

      <LeafDivider className="my-4" />

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16">
          <div className="sust-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="sust-content">
              <h3 className="text-[#00333E] text-3xl sm:text-4xl font-[300]">Enhanced Sustainability Impact Through Circular Plastic Recovery</h3>
              <ul className="mt-6 space-y-3">
                {[
                  "Least to Landfill",
                  "Resource Preservation",
                  "Lower Carbon Output",
                  "Protective Natural Environments"
                ].map((p) => (
                  <li key={p} className="feature-item py-3 border-t first:border-t-0 border-teal-200 text-[#013138]">{p}</li>
                ))}
              </ul>
              <div className="mt-8"><Cta href="/contact" label="DISCOVER MORE" tone="dark" /></div>
            </div>
            <div className="sust-image relative h-[600px] overflow-hidden">
              <Image src="/Rectangle 7 (4).png" alt="Sustainability impact" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      <SustainabilityMarquee />

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-8">
          <div className="rounded-[12px] bg-[#EEF6F6] overflow-hidden relative">
            <div className="about-values grid grid-cols-1 md:grid-cols-2 items-start py-12 md:py-16 px-8 md:px-16">
              <div className="flex flex-col gap-6 w-full">
                <span className="inline-flex w-fit items-center gap-2 rounded-[8px] bg-white px-3 py-1.5 text-[12px] font-medium text-[#024D5D] uppercase tracking-wide">
                  Our Story
                </span>
                <div className="space-y-4">
                  <ul className="flex flex-col gap-8">
                    <li>Energy Efficiency <br />
                      <span className="text-[16px] text-[#4E4E4E]">Reduced energy demand through efficient systems and continuous optimisation.</span>
                    </li>
                    <li>Waste Reduction <br />
                      <span className="text-[16px] text-[#4E4E4E]">Material kept in circulation via reuse, separation, and by-product recovery.</span>
                    </li>
                    <li>Emissions Management <br />
                      <span className="text-[16px] text-[#4E4E4E]">Ongoing monitoring and reduction of greenhouse outputs across handling and processing.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hidden md:block relative h-[280px]">
                <img src="/vector-6.png" alt="" className="absolute top-2 right-[56px] w-[270px] h-auto" />
                <img src="/Vector-5.png" alt="" className="absolute top-0 right-[50px] w-[280px] h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

