// ...existing code...
"use client"

import Image from "next/image"
import Cta from "@/components/Cta"
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
      gsap.from(".benefits-image", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".benefits-grid", start: "top 85%" },
      })
      gsap.from(".benefits-content", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: { trigger: ".benefits-grid", start: "top 85%" },
      })
      const items = gsap.utils.toArray<HTMLElement>(".benefit-item")
      gsap.set(items, { y: 12, opacity: 0 })
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".benefits-content", start: "top 85%" },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative">
      <div ref={containerRef} className="mx-auto max-w-[1600px] px-[2%] py-16">
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
    </section>
  )
}

