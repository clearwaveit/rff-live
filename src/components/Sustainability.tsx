"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Sustainability() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(".heading-sustainability", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".heading-sustainability",
          start: "top 90%"
        }
      })
      
      gsap.from(".marquee-track", {
        opacity: 0,
        duration: 1.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: ".heading-sustainability",
          start: "top 90%"
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const phrases = [
    "Committed to Responsible Sourcing",
    "Helping Brands Meet Sustainability Targets",
    "Driving Circular Economy"
  ]

  return (
    <section ref={sectionRef} className="relative w-full">
        <h2 className="heading-sustainability text-center">SUSTAINABILITY</h2>
        <div className="mt-5 overflow-hidden w-full">
          <div className="marquee-track">
            <div className="marquee-content">
              {phrases.map((p, i) => (
                <span key={i} className="phrase">{p}<span className="sep">•</span></span>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {phrases.map((p, i) => (
                <span key={`d-${i}`} className="phrase">{p}<span className="sep">•</span></span>
              ))}
            </div>
          </div>
        </div>
    </section>
  )
}
