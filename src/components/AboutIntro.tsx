"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Cta from "@/components/Cta"
import Image from "next/image"
export default function AboutIntro({
  badge = "",
  title = "Combining synthetic biology, chemistry, and AI into an ",
  accent = "engine of discovery.",
  paragraph = "Our platform enables precise, dynamic control of biological targets and pathways, generating high-fidelity datasets that, combined with advanced AI, unlock systematic exploration of previously inaccessible chemical space.",
  ctaHref = "#",
  ctaLabel = "MORE ABOUT RFF",
  withWave = true,
  className = ""
}: {
  badge?: string
  title?: string
  accent?: string
  paragraph?: string
  ctaHref?: string
  ctaLabel?: string
  withWave?: boolean
  className?: string
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const hRef = useRef<HTMLHeadingElement | null>(null)
  const pRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(hRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
        }
      })
      gsap.from(pRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
        }
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={`relative ${className}`}>
      <div ref={wrapRef} className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
        <div className="abt-text">
          <span>{badge}</span>
        </div>
        <div className="heading-abt-wrap">
          <h2 ref={hRef} className="heading-about">
            {title}<span className="accent">{accent}</span>
          </h2>
          <p ref={pRef}>
            {paragraph}
          </p>
          <div className="mt-8 btn-center">
            <Cta href={ctaHref} label={ctaLabel} tone="dark" />
          </div>
        </div>
      </div>
      {withWave && (
        <div className="bottom-border" style={{ backgroundImage: `url("border.png")` }}>
        </div>
      )}
    </section>
  )
}
