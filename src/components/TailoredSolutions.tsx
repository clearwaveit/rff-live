"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function TailoredSolutions() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(".ts-image", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ts-grid", start: "top 85%" },
      })
      gsap.from(".ts-content", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: ".ts-grid", start: "top 85%" },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative">
      <div ref={containerRef} className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
        <div className="ts-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="ts-content order-2 md:order-1">
            <h3 className="text-[#00333E] text-3xl sm:text-4xl md:text-5xl font-[300] leading-tight">
              Tailored Solutions for <br />
              <span className="text-[#579C9C] italic">Reliable Collaborations</span>
            </h3>
            <p className="mt-6 text-[#696969] text-lg leading-relaxed font-light">
              Partnering with us helps businesses reduce plastic waste and embrace sustainable practices. 
              Our customized solutions align with your corporate goals and are crafted to create collaborations with you, ensuring the final product exceeds your expectations.
            </p>
            <p className="mt-4 text-[#696969] text-lg leading-relaxed font-light">
              Our quality services help ensure consistent recycled pellets with regular melt flow and density properties for your specific needs. Flexibility and clear communication, providing high-quality solutions tailored to your specific needs.
            </p>
          </div>
          <div className="ts-image relative h-[500px] w-full rounded-[2rem] overflow-hidden order-1 md:order-2">
            <Image 
              src="/Rectangle 9.png" 
              alt="Tailored Solutions" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}
