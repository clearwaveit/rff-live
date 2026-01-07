"use client"

import Image from "next/image"
import Cta from "@/components/Cta"
import TrustedPartnership from "@/components/TrustedPartnership"
import AboutIntro from "@/components/AboutIntro"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import EmbeddedPartner from "@/components/EmbeddedPartner"

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(".page-hero-title", { y: 24, opacity: 0, duration: 1, ease: "power3.out" })

      gsap.from(".about-image", {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-image", start: "top 85%" },
      })

      gsap.from(".about-values .p-10", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-values", start: "top 85%" },
      })
      gsap.from(".about-values-image", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: ".about-values", start: "top 85%" },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen" ref={containerRef}>
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image src="/banner-service.png" alt="About Us" fill priority className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-[2%] pb-16">
          <h1 className="page-hero-title text-white text-4xl sm:text-6xl font-light tracking-tight">About Us</h1>
        </div>
      </section>

      <AboutIntro
        badge="ABOUT US"
        title="Combining synthetic biology, chemistry, and AI into an"
        accent="engine of discovery."
        paragraph="Our platform enables precise, dynamic control of biological targets and pathways, generating high-fidelity datasets that, combined with advanced AI, unlock systematic exploration of previously inaccessible chemical space."
        ctaHref="/contact"
        ctaLabel="LEARN MORE"
        withWave={true}
      />

      <section className="relative bg-white">
        <div className="mx-auto max-w-[1600px] py-16 md:py-48">
          <div className="flex flex-col md:flex-row gap-8 md:gap-48 items-start">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-2 rounded-[7.73px] bg-[#F5F5F5] px-3 py-1.5 text-[14px] font-[400] text-[#024D5D] uppercase tracking-wide">
                Our Mission
              </span>
            </div>
            <div className="flex-1 max-w-full">
              <p className="text-[28px] md:text-[45.15px] leading-[1.5] font-[300] text-[#00272F] tracking-normal">
                We work to divert plastic from landfill and the natural environment, reintroducing it into productive use. <span className="font-light">Our goal is to reduce reliance on virgin mat</span><span className="font-light text-[#579C9C]">erials and support businesses in adopting recycled plastics with confidence and clarity.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-screen">
        <div className="bg-img-house absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 px-4">
          <span className="inline-flex items-center gap-2 rounded-[7px] bg-white/90 px-3 py-1.5 text-[12px] font-medium text-[#024D5D] uppercase tracking-wide mb-4">
            <span className="inline-block h-3 w-3 rounded-sm bg-[#C0D790]" />
            Our Commitment
          </span>
          <p className="text-center text-white text-[14px] md:text-[18px] font-light leading-[1.6] max-w-[600px]">
            We support UK businesses by sourcing and processing<br className="hidden md:block" />
            material domestically, reinforcing local industry,<br className="hidden md:block" />
            creating skilled employment, and contributing directly<br className="hidden md:block" />
            to national circularity goals.
          </p>
        </div>
      </section>

      <section className="relative my-28">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
          <div className="flex flex-col items-center text-center max-w-[850px] mx-auto">
            <span className="inline-flex items-center gap-2 rounded-[7px] bg-[#F5F5F5] px-3 py-1.5 text-[12px] font-medium text-[#579C9C] uppercase tracking-wide mb-8">
              Our Values
            </span>
            <h2 className="text-[36px] md:text-[52px] leading-[1.2] font-light text-[#00272F] mb-6">
              We prioritize Responsibility and<br className="hidden md:block" /> Excellence in <span className="text-[#579C9C]">Recycling.</span>
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#4E4E4E] font-normal leading-relaxed max-w-[750px] mb-8">
              Environmental responsibility, transparency, and continuous improvement guide our approach. We prioritise efficient material use, honest communication, and strong customer partnerships built on trust and shared sustainability outcomes.
            </p>
            <Cta href="/contact" label="LEARN MORE" tone="dark" />
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-8">
          <div className="rounded-[12px] bg-[#EEF6F6] overflow-hidden relative">
            <div className="about-values grid grid-cols-1 md:grid-cols-2 items-start py-12 md:py-16 px-8 md:px-16">
              <div className="flex flex-col gap-6 w-full">
                <span className="inline-flex w-fit items-center gap-2 rounded-[8px] bg-white px-3 py-1.5 text-[12px] font-medium text-[#024D5D] uppercase tracking-wide">
                  Our Story
                </span>
                <div className="space-y-4">
                  <h3 className="text-[#00272F] text-[24px] md:text-[32px] font-normal leading-tight">Pioneering Sustainable Plastic Recycling</h3>
                  <p className="text-[#4E4E4E] text-[14px] md:text-[16px] font-normal leading-relaxed">Founded with the aim of advancing recycling practices, Recycle for Future has grown from a small operation into a leading UK plastic recovery and reprocessing provider. Today, our facilities and team are dedicated to delivering reliable, modern materials management for a circular economy.</p>
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

      <EmbeddedPartner />
    </main>
  )
}
