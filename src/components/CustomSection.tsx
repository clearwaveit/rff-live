// ...existing code...
"use client"

import Image from "next/image"
import Cta from "@/components/Cta"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function CustomSection({ title, img }: { title: string; img: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(".custom-image", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".custom-grid", start: "top 85%" },
      })
      gsap.from(".custom-content", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: { trigger: ".custom-grid", start: "top 85%" },
      })
      const items = gsap.utils.toArray<HTMLElement>(".custom-item")
      gsap.set(items, { y: 12, opacity: 0 })
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".custom-content", start: "top 85%" },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const bullets = [
    { label: "Affordable Resources", color: "#CFE9C6" },
    { label: "Lowered Ecological Footprint", color: "#2A7E6E" },
    { label: "Improved Brand Reputation", color: "#6FBEC1" },
    { label: "Adherence to Regulations", color: "#EAEFEA" }
  ]

  return (
    <section className="relative my-20">
      <div ref={containerRef} className="mx-auto py-16 bg-[#EEF6F6]">
        <div className="custom-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="custom-content mx-auto max-w-[700px]">
            <h3 className="text-[#00333E] text-3xl sm:text-[60px] font-[300] leading-tight">{title}</h3>
            <p className="mt-3 text-[18px] text-[#5D7E83]">Partnering with us helps businesses reduce plastic waste and embrace sustainable practices. Our custom blends of recycled plastics and additives are crafted in close collaboration with you, ensuring the final product exceeds your expectations. This careful compounding process combines recycled materials with targeted additives to enhance properties like color, strength, flexibility, and UV resistance, providing high-quality solutions tailored to your specific needs.</p>
          </div>
          <div className="custom-image rounded-l-[12px] relative h-[827px] overflow-hidden">
            <Image src={img} alt={title} fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

