"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Cta from "@/components/Cta"

export default function EmbeddedPartner({ className = "", noBottomPadding = false }: { className?: string; noBottomPadding?: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Image
      gsap.from(".p-image-block", {
        x: -50,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".p-image-block",
          start: "top 80%"
        }
      })

      // Text Content
      gsap.from(".heading-embed", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".heading-embed",
          start: "top 85%"
        }
      })

      gsap.from(".heading-embed + p", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".heading-embed",
          start: "top 85%"
        }
      })

      // List Items
      gsap.from(".divide-y > div", {
        x: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".divide-y",
          start: "top 85%"
        }
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef}>
      <div className={`mx-auto pt-8 sm:pt-10 lg:pt-14 ${noBottomPadding ? "pb-0" : "pb-12 sm:pb-16 lg:pb-24"} ${className}`}>
        <div className="grid lg:grid-cols-2 items-center sec-bg gap-6 lg:gap-8">
          <div className="p-image-block embed-image-col">
            <div className="embed-image-wrap relative round-cornor overflow-hidden h-[240px] sm:h-[420px] md:h-[500px] lg:h-[660px] w-full">
              <Image src="/emb-partner-2.png" alt="Partner" fill className="object-cover" />
              {/* <div className="image-dots" style={{ backgroundImage: `url("images/img-dots.png")` }}></div> */}
            </div>
          </div>
          <div className="px-4 sm:px-6 md:px-8 lg:pl-16 lg:pr-20">
            <h2 className="heading-embed text-[#013138]">An embedded partner for your recycling <span>journey towards a greener future</span></h2>
            <p className="mt-5 sm:mt-7 max-w-2xl leading-relaxed text-[#013138] text-base sm:text-lg font-[400]">We work alongside businesses to reduce plastic waste, meet sustainability objectives, and integrate recycled materials into their operations with confidence.</p>
            <div className="mt-8 sm:mt-11 divide-y divide-gray-200">
              {["Clear reporting and material traceability", "Full handling transparency", "Dedicated collection planning", "Responsible reprocessing", "Circular reintegration opportunities"].map((item) => (
                <div key={item} className="py-4 sm:py-5">
                  <div className="text-[#013138] text-sm sm:text-base font-[400]">{item}</div>
                </div>
              ))}
            </div>
            {/* <div className="mt-11">
              <Cta href="#" label="Work With Us" tone="dark" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
