"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

const defaultItems = [
  {
    icon: "/images/testi-root.png",
    title: "Clear Reporting & Material Traceability",
    desc: "Full visibility at every stage of the recycling process, ensuring traceable and accountable material handling.",
  },
  {
    icon: "/images/testi-root.png",
    title: "Full Handling Transparency",
    desc: "Complete openness in how your materials are managed, from collection to processing, fostering trust and confidence.",
  },
  {
    icon: "/images/testi-root.png",
    title: "Dedicated Collection Planning",
    desc: "Tailored collection strategies to meet your unique operational needs and sustainability goals, ensuring seamless logistics.",
  },
  {
    icon: "/images/testi-root.png",
    title: "Responsible Reprocessing",
    desc: "Expert reprocessing methods that preserve material quality, reduce waste, and contribute to a more sustainable production cycle.",
  },
]

export default function CircleFeatures({
  items = defaultItems,
  className = "",
}: {
  items?: { icon: string; title: string; desc: string }[]
  className?: string
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const totalItems = items.length

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalItems * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * totalItems),
            totalItems - 1
          )
          if (index !== activeRef.current) {
            // Fade out current content
            gsap.to(`.cf-content-${activeRef.current}`, {
              opacity: 0,
              y: -20,
              duration: 0.3,
            })
            // Fade in new content
            gsap.to(`.cf-content-${index}`, {
              opacity: 1,
              y: 0,
              duration: 0.3,
            })
            activeRef.current = index
            setActive(index)
          }
        },
      })

      // Set initial states: first visible, rest hidden
      items.forEach((_, i) => {
        if (i === 0) {
          gsap.set(`.cf-content-${i}`, { opacity: 1, y: 0 })
        } else {
          gsap.set(`.cf-content-${i}`, { opacity: 0, y: 20 })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [items.length])

  // Arrow positions: top, right, bottom, left
  const arrowPositions = [
    { top: "0%", left: "50%", transform: "translate(-50%, -50%) rotate(0deg)" },
    { top: "50%", right: "0%", transform: "translate(50%, -50%) rotate(90deg)" },
    { bottom: "0%", left: "50%", transform: "translate(-50%, 50%) rotate(180deg)" },
    { top: "50%", left: "0%", transform: "translate(-50%, -50%) rotate(270deg)" },
  ]

  return (
    <section ref={sectionRef} className={`relative bg-[#FAF8F6] ${className}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          {/* Dotted circle */}
          <div className="cf-circle cf-circle-outer" />

          {/* 4 Arrow indicators */}
          {arrowPositions.map((pos, i) => (
            <div
              key={i}
              className={`cf-arrow ${i === active ? "cf-arrow--active" : ""}`}
              style={pos as React.CSSProperties}
            >
              <Image
                src="/images/polygon.png"
                alt=""
                width={i === active ? 16 : 14}
                height={i === active ? 16 : 14}
                className="transition-all duration-300"
              />
            </div>
          ))}

          {/* Center content - stacked, fade in/out */}
          <div className="cf-center">
            {items.map((item, i) => (
              <div key={i} className={`cf-content cf-content-${i}`} style={{ position: i === 0 ? "relative" : "absolute" }}>
                <div className="cf-content-icon">
                  <Image src={item.icon} alt="" width={36} height={36} />
                </div>
                <h3 className="cf-content-title">{item.title}</h3>
                <p className="cf-content-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
