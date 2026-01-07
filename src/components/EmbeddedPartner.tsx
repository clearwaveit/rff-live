"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Cta from "@/components/Cta"

export default function EmbeddedPartner() {
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
    <section ref={sectionRef} className="relative">
      <div className="mx-auto py-150">
        <div className="grid lg:grid-cols-12 gap-15 items-start sec-bg">
          <div className="lg:col-span-5 p-image-block">
            <div className="relative round-cornor overflow-hidden h-[900px]">
              <Image src="/emb-partner-2.png" alt="Partner" fill className="object-cover" />
              {/* <div className="image-dots" style={{ backgroundImage: `url("images/img-dots.png")` }}></div> */}
            </div>
          </div>
          <div className="lg:col-span-5">
            <h2 className="heading-embed text-[#013138]">An Embedded Partner for your recycling <span className="accent">journey towards a greener future</span></h2>
            <p className="mt-7 max-w-2xl leading-relaxed text-[#013138]">We believe you can’t promote a place without living it. Your ambassador visits regularly, meets your teams, listens to guests, and captures key moments—new spaces, seasonal rituals, meaningful details that define your experience.</p>
            <div className="mt-11 divide-y divide-gray-200">
              {["Packaging Manufacturers", "Retail & FMCG Brands", "Wholesalers & Distributors", "Govt. and Semi Government entities"].map((item) => (
                <div key={item} className="py-9">
                  <div className="text-[#013138]">{item}</div>
                </div>
              ))}
            </div>
            <div className="mt-11">
              <Cta href="#" label="DISCOVER MORE" tone="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
