// ...existing code...
"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function TrustedPartnership() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const points = [
    "Clear reporting",
    "Full handling transparency",
    "Dedicated collection planning",
    "Responsible reprocessing",
    "Circular reintegration opportunities"
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(".tp-image", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tp-grid", start: "top 85%" },
      })
      gsap.from(".tp-heading, .tp-paragraph", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
        stagger: 0.15,
        scrollTrigger: { trigger: ".tp-grid", start: "top 85%" },
      })
      const items = gsap.utils.toArray<HTMLElement>(".tp-item")
      gsap.set(items, { y: 20, opacity: 0 })
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".tp-grid", start: "top 85%" },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative">
      <div ref={containerRef} className="mx-auto max-w-[1600px] px-[2%] py-16">
        <div className="tp-grid grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="tp-image relative h-[480px] rounded-[2rem] overflow-hidden">
            <Image src="/service-3.svg" alt="Trusted partnership" fill className="object-cover" />
          </div>
          <div>
            <h3 className="tp-heading text-[#00333E] text-3xl sm:text-4xl font-[300]">Trusted Partnership Statement</h3>
            <p className="tp-paragraph mt-3 text-[#013138]">We support businesses in reducing plastic waste, adopting circular models, and meeting evolving sustainability expectations.</p>
            <ul className="mt-6">
              {points.map((p, i) => (
                <li key={p} className={`tp-item py-4 text-[#013138] ${i === 0 ? "border-t-0" : "border-t"} border-teal-200`}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

