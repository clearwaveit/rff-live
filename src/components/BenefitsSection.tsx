"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function BenefitsSection({
  title,
  img,
  intro = "Plastic recycling offers numerous benefits that positively impact the environment, the economy, and society.",
  bullets = [
    { label: "Affordable Resources", color: "#CFE9C6" },
    { label: "Lowered Ecological Footprint", color: "#2A7E6E" },
    { label: "Improved Brand Reputation", color: "#6FBEC1" },
    { label: "Adherence to Regulations", color: "#EAEFEA" }
  ]
}: {
  title: string
  img: string
  intro?: string
  bullets?: { label: string; color: string }[]
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(".benefits-new-title", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      })
      gsap.from(".benefits-new-intro", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      })
      const items = gsap.utils.toArray<HTMLElement>(".benefit-item-new")
      gsap.set(items, { y: 12, opacity: 0 })
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const forMatch = title.match(/\s+[Ff]or\s+/)
  const titleParts = forMatch
    ? title.split(/\s+[Ff]or\s+/).map((s) => s.trim())
    : [title, ""]
  const titleLine1Rest = titleParts.length > 1 ? titleParts[0] : title
  const titleLine1LastWord = titleParts.length > 1 ? " For" : ""
  const titleLine2 = titleParts.length > 1 ? titleParts[1] : ""

  return (
    <section className="relative">
      <div ref={containerRef} className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
        {/* New design - screenshot style: centered title, left-aligned content, grey bullets, CTA + arrow circle */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="benefits-new-title text-[32px] sm:text-[40px] lg:text-[48px] font-[300] leading-tight">
            <span className="whitespace-nowrap">
              <span className="italic text-[#60B6A8]">{titleLine1Rest}</span>
              {titleLine1LastWord && <span className="font-normal not-italic text-black">{titleLine1LastWord}</span>}
            </span>
            {titleLine2 && (
              <>
                <br />
                <span className="font-normal not-italic text-black">{titleLine2}</span>
              </>
            )}
          </h3>
          <p className="benefits-new-intro mt-6 text-left text-[#5D7E83] text-base sm:text-lg">
            {intro}
          </p>
          <ul className="mt-6 text-left space-y-4">
            {bullets.map((b) => (
              <li key={b.label} className="benefit-item-new flex items-center gap-4">
                <span className="inline-block h-2 w-2 flex-shrink-0 rounded-sm bg-[#D3D3D3]" />
                <span className="text-[#2C3E50]">{b.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center justify-start gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[50px] bg-[#345B53] text-white font-medium uppercase tracking-wide px-6 py-3.5 text-sm hover:opacity-90 transition-opacity"
            >
              CONTACT US
            </Link>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D0F0B9] text-[#2C3E50]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Existing design - commented out
      <div ref={containerRef} className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
        <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="benefits-image relative h-[600px] rounded-[12px] overflow-hidden">
            <Image src={img} alt={title} fill className="object-cover" />
          </div>
          <div className="benefits-content">
            <h3 className="text-[#00333E] text-3xl sm:text-4xl font-[300] leading-tight">{title}</h3>
            <p className="mt-3 text-[#5D7E83]">{intro}</p>
            <ul className="mt-6 space-y-3">
              {bullets.map((b) => (
                <li key={b.label} className="benefit-item flex items-center gap-4">
                  <span className="inline-block h-5 w-10 rounded-full" style={{ backgroundColor: b.color }} />
                  <span className="text-[#013138]">{b.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8"><Cta href="/contact" label="CONTACT US" tone="dark" /></div>
          </div>
        </div>
      </div>
      */}
    </section>
  )
}
