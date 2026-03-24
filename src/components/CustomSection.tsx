// ...existing code...
"use client"

import Image from "next/image"
import Cta from "@/components/Cta"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function CustomSection({ title, img, paragraph }: { title: string; img: string; paragraph?: string }) {
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

  return (
    <section className="relative">
      <div ref={containerRef} className="mx-auto px-4 sm:px-6 md:px-[2%] py-12 sm:py-16 lg:py-24 bg-[#EEF6F6]">
        <div className="custom-grid grid grid-cols-1 md:grid-cols-1 gap-8 sm:gap-12 items-center">
          <div className="custom-content mx-auto max-w-[794px] w-full text-center">
            <h3 className="text-[#00333E] text-[28px] sm:text-[32px] md:text-[48px] lg:text-[48px] font-[700] leading-[58px]">{title}</h3>
            <p className="mt-3 sm:text-lg text-[#00272F] text-sm md:text-[26px] font-[400] leading-[36px]">{paragraph}</p>
          </div>
          {/* <div className="custom-image rounded-l-[12px] relative h-[827px] overflow-hidden">
            <Image src={img} alt={title} fill className="object-cover" />
          </div> */}
        </div>
      </div>
    </section>
  )
}

