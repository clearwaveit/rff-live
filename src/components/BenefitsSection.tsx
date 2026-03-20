"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const DEFAULT_BENEFITS = [
  { title: "Reduced reliance on virgin plastic materials", description: "" },
  { title: "Lower environmental impact and landfill diversion", description: "" },
  { title: "Improved sustainability performance for your business", description: "" },
  { title: "Consistent, high-quality recycled output", description: "" }
]

export default function BenefitsSection({
  title,
  img,
  intro = "Plastic recycling offers numerous benefits that positively impact the environment, the economy, and society.",
  highlightText,
  benefits = DEFAULT_BENEFITS
}: {
  title: string
  img: string
  intro?: string
  highlightText?: string
  benefits?: { title: string; description: string }[]
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(".benefits-new-title", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      })
      gsap.from(".benefits-new-intro", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      })
      const items = gsap.utils.toArray<HTMLElement>(".benefit-card-new")
      gsap.set(items, { y: 12, opacity: 0 })
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const titleParts = highlightText
    ? (() => {
      const i = title.indexOf(highlightText)
      if (i === -1) return { before: title, highlight: "", after: "" }
      return {
        before: title.slice(0, i).trimEnd(),
        highlight: highlightText,
        after: title.slice(i + highlightText.length).trimStart()
      }
    })()
    : (() => {
      const forMatch = title.match(/\s+[Ff]or\s+/)
      if (!forMatch) return { before: title, highlight: "", after: "" }
      const idx = title.search(/\s+[Ff]or\s+/)
      const before = title.slice(0, idx).trimEnd()
      const rest = title.slice(idx).trimStart()
      return { before: "", highlight: before, after: rest }
    })()

  // ——— NEW design: two-column layout, title + intro + CTA left, 2x2 benefit cards right ———
  return (
    <section className="relative bg-white">
      <div ref={containerRef} className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-[2%] py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <h3 className="benefits-new-title text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-[300] leading-tight text-[#2C3E50]">
              {titleParts.before && <span>{titleParts.before} </span>}
              {titleParts.highlight && (
                <span className="text-[#60B6A8]">{titleParts.highlight}</span>
              )}
              {titleParts.after && <span> {titleParts.after}</span>}
            </h3>
            <p className="benefits-new-intro mt-4 sm:mt-6 text-[#5D7E83] text-sm sm:text-base md:text-lg">
              {intro}
            </p>
            <div className="mt-6 sm:mt-10 flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[50px] bg-[#345B53] text-white font-medium uppercase tracking-wide px-6 py-3.5 text-sm hover:opacity-90 transition-opacity"
              >
                CONTACT US
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D0F0B9] text-[#2C3E50] hover:opacity-90 transition-opacity"
                aria-label="Contact us"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
          {/* 2x2 grid same as desktop on all screens; card size + text scale by breakpoint */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-3">
            {benefits.map((b, i) => {
              const roundClass =
                i === 0
                  ? "rounded-tl-none rounded-bl-[28px] sm:rounded-bl-[38px] lg:rounded-bl-[50.98px] rounded-tr-[28px] sm:rounded-tr-[38px] lg:rounded-tr-[50.98px] rounded-br-none"
                  : i === 1
                    ? "rounded-tr-none rounded-br-[28px] sm:rounded-br-[38px] lg:rounded-br-[50.98px] rounded-tl-[28px] sm:rounded-tl-[38px] lg:rounded-tl-[50.98px] rounded-bl-none"
                    : i === 2
                      ? "rounded-bl-none rounded-tl-[28px] sm:rounded-tl-[38px] lg:rounded-tl-[50.98px] rounded-tr-none rounded-br-[28px] sm:rounded-br-[38px] lg:rounded-br-[50.98px]"
                      : "rounded-br-none rounded-tr-[28px] sm:rounded-tr-[38px] lg:rounded-tr-[50.98px] rounded-tl-none rounded-bl-[28px] sm:rounded-bl-[38px] lg:rounded-bl-[50.98px]"
              return (
                <div
                  key={b.title}
                  className={`benefit-card-new flex flex-col justify-between ${roundClass} bg-[#BCDFD8] p-3 sm:p-4 md:p-5 lg:p-6 min-h-[100px] sm:min-h-[130px] md:min-h-[155px] lg:h-[188px] min-w-0 aspect-[1.4] sm:aspect-[1.5] lg:aspect-auto`}
                >
                  <h4 className="text-[#2C3E50] font-normal text-[13px] sm:text-[15px] md:text-[18px] lg:text-[22px] leading-tight">
                    {b.title}
                  </h4>
                  <p className="mt-1 sm:mt-2 text-[#2C3E50] text-[11px] sm:text-xs md:text-sm opacity-90">
                    {b.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )

  /* ——— PURANA design (centered, bullet list, CTA + circle) ———
  return (
    <div ref={containerRef} className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="benefits-new-title text-[32px] sm:text-[40px] lg:text-[48px] font-[300] leading-tight">
          <span className="whitespace-nowrap">
            <span className="italic text-[#60B6A8]">{titleLine1Rest}</span>
            {titleLine1LastWord && <span className="font-normal not-italic text-black">{titleLine1LastWord}</span>}
          </span>
          {titleLine2 && (
            <>
              <br />
              <span className="font-normal not-italic text-black">{titleLine2}</span>
            </>
          )}
        </h3>
        <p className="benefits-new-intro mt-6 text-left text-[#5D7E83] text-base sm:text-lg">{intro}</p>
        <ul className="mt-6 text-left space-y-4">
          {bullets.map((b) => (
            <li key={b.label} className="benefit-item-new flex items-center gap-4">
              <span className="inline-block h-2 w-2 flex-shrink-0 rounded-sm bg-[#D3D3D3]" />
              <span className="text-[#2C3E50]">{b.label}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex items-center justify-start gap-3">
          <Link href="/contact" className="...">CONTACT US</Link>
          <span className="inline-flex h-12 w-12 ... rounded-full bg-[#D0F0B9]">...</span>
        </div>
      </div>
    </div>
  )
  ——— */
}
