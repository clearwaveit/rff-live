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
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    const cardEls = Array.from(grid.querySelectorAll<HTMLElement>(".quality-card"))
    if (!cardEls.length) return

  // initial state for all cards: start lower and smaller so they rise and scale up
  gsap.set(cardEls, { opacity: 0, scale: 0.9, y: 36, transformOrigin: "center center" })

    // determine how many rows there are based on classes like .quality-row-1
    const rowNums = cardEls
      .map((el) => {
        const m = el.className.match(/quality-row-(\d+)/)
        return m ? Number(m[1]) : null
      })
      .filter((n): n is number => n !== null)

    const maxRow = rowNums.length ? Math.max(...rowNums) : 0
    const createdTriggers: ScrollTrigger[] = []

    for (let r = 1; r <= maxRow; r++) {
      const rowEls = Array.from(grid.querySelectorAll<HTMLElement>(`.quality-row-${r}`))
      if (!rowEls.length) continue

      const anim = gsap.to(rowEls, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        // animate all cards in the same row together
        stagger: 0,
        ease: "power3.out",
        paused: true,
      })

      const st = ScrollTrigger.create({
        trigger: rowEls[0],
        start: "top 85%",
        animation: anim,
        // play when entering, reverse when leaving (so reverse behaves like forward)
        toggleActions: "play reverse play reverse",
      })

      createdTriggers.push(st)
    }

    return () => {
      createdTriggers.forEach((t) => t.kill())
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [cards.length])

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      <div className="mx-auto h-full max-w-[1600px] px-4 sm:px-6 md:px-[2%] pt-8 sm:pt-10 lg:pt-14 pb-[80px] sm:pb-100 lg:pb-[150px] flex flex-col">
        {/* Background text */}
        <div className="quality-bg-text">
          <span>{badge}</span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-[700] text-[#00272F] max-w-[1024px] mx-auto leading-[58px] mb-8 sm:mb-12 lg:mb-16">
          {heading}
        </h2>

        {/* Bento grid */}
        <div ref={gridRef} className="quality-grid flex-1 min-h-0">
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
