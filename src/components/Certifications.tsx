"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export default function Certifications() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Title
      gsap.from(".heading-cer", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".heading-cer",
          start: "top 85%"
        }
      })
      
      // Logos
      gsap.from(".logo-box", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".logos-wrap",
          start: "top 85%"
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const logos = [
    "/images/logo-1.png",
    "/images/logo-2.png",
    "/images/logo-3.png",
    "/images/logo-4.png",
    "/images/logo-5.png",
  ];

  return (
    <section ref={sectionRef} className="relative">
      <div className="mx-auto max-w-[1600px] px-[2%] py-20">
        <h2 className="heading-about heading-cer"><span className="accent">Certifications</span> & Accreditations</h2>
        <p className="mt-6 text-center text-[#696969] text-lg max-w-3xl mx-auto">
          Our operations follow strict quality, environmental, and compliance standards, ensuring confidence, transparency, and reliability across all recycling processes.
        </p>
      </div>
      <div className="logos-wrap">
      {logos.map((src, i) => (
        <div
          key={i}
          className="logo-box" style={{ backgroundImage: `url("${src}")` }} >
        </div>
      ))}
    </div>
    </section>
  )
}
