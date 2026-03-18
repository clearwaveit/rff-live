"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const defaultCards = [
  {
    icon: "/images/card-process-1.png",
    title: "Engineered for\nConsistent Performance",
    desc: "Advanced recycling processes delivering reliable, high-quality recycled polymers.",
  },
  {
    icon: "/images/card-benefits 1.png",
    title: "Quality Built Into\nEvery Pellet",
    desc: "Precision processing ensures dependable material performance across applications.",
  },
  {
    icon: "/images/card-flask-1.png",
    title: "Recycling Without\nCompromise",
    desc: "High standards maintained through controlled processing and rigorous testing.",
  },
  {
    icon: "/images/card-high-performance-1.png",
    title: "Material Performance\nAssured",
    desc: "Technically driven recycling enabling consistent and production-ready polymers.",
  },
  {
    icon: "/images/card-import-export-1.png",
    title: "Where Quality Meets\nCircularity",
    desc: "Recycled materials designed to meet demanding industrial specifications.",
  },
  {
    icon: "/images/card-result-1.png",
    title: "Reliable Materials,\nProven Results",
    desc: "Advanced processing & testing supporting consistent polymer performance.",
  },
]

export default function QualitySection({
  badge = "QUALITY",
  heading = "Quality built into every pellet through precision processing and rigorous material control at every stage.",
  cards = defaultCards,
  className = "",
}: {
  badge?: string
  heading?: string
  cards?: { icon: string; title: string; desc: string }[]
  className?: string
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      [1, 2, 3].forEach((row) => {
        gsap.from(`.quality-row-${row}`, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.quality-row-${row}`,
            start: "top 85%",
          },
        })
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={`relative ${className}`}>
      <div ref={wrapRef} className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-[2%] pb-16 sm:pb-20 lg:pb-28">
        {/* Background text */}
        <div className="quality-bg-text">
          <span>{badge}</span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-[#00272F] max-w-[1024px] mx-auto leading-tight mb-12 sm:mb-28">
          {heading}
        </h2>

        {/* Bento grid */}
        <div className="quality-grid">
          {cards.map((card, i) => (
            <div key={i} className={`quality-card quality-row-${Math.floor(i / 2) + 1}`}>
              <div className="quality-card-icon">
                <Image src={card.icon} alt="" width={50} height={50} />
              </div>
              <h4 className="quality-card-title">{card.title.split("\n").map((part, j, arr) => (
                <span key={j}>{part}{j < arr.length - 1 && <br />}</span>
              ))}</h4>
              <p className="quality-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
