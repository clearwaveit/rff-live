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
  const gridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const applyPinnedScroll = () => {
        const rows = Math.ceil(cards.length / 2)
        const gridEl = gridRef.current
        const wrapEl = wrapRef.current
        if (!gridEl || !wrapEl) return

        // total scrollable distance inside the pinned area
        const gridHeight = gridEl.scrollHeight
        const viewH = window.innerHeight
        const distance = Math.max(0, gridHeight - viewH)

        // if nothing to scroll, don't create a pin
        if (distance <= 0) return

        const tl = gsap.timeline({ defaults: { ease: 'power1.out' } })

        // For each logical row (two cards share the same .quality-row-N class)
        // compute the translate value that centers that row in the viewport.
        const rowTargets: number[] = []
        for (let r = 1; r <= rows; r++) {
          const elems = Array.from(gridEl.querySelectorAll(`.quality-row-${r}`)) as HTMLElement[]
          if (!elems.length) {
            rowTargets.push(0)
            continue
          }

          // compute bounding box that contains all elements of the row
          const tops = elems.map((el) => el.offsetTop)
          const bottoms = elems.map((el) => el.offsetTop + el.offsetHeight)
          const rowTop = Math.min(...tops)
          const rowBottom = Math.max(...bottoms)
          const rowCenter = (rowTop + rowBottom) / 2

          // translate needed to bring rowCenter to viewport center (viewH/2)
          const translateY = Math.round(viewH / 2 - rowCenter)
          rowTargets.push(translateY)
        }

        // initial state: hide all rows and ensure grid at y:0
        gsap.set(gridEl, { y: 0 })
        for (let r = 1; r <= rows; r++) {
          gsap.set(Array.from(gridEl.querySelectorAll(`.quality-row-${r}`)), { autoAlpha: 0 })
        }

        // Build timeline: for each row, move grid so that row is centered, fade it in,
        // hold, then fade out (except last row). When the first row begins fading
        // in we will fade out the heading/badge so they do not overlap the cards.
        const headingEl = wrapEl.querySelector('h2') as HTMLElement | null
        const badgeEl = wrapEl.querySelector('.quality-bg-text') as HTMLElement | null
        const headerTargets: Element[] = []
        if (headingEl) headerTargets.push(headingEl)
        if (badgeEl) headerTargets.push(badgeEl)

        for (let r = 1; r <= rows; r++) {
          const elems = Array.from(gridEl.querySelectorAll(`.quality-row-${r}`)) as HTMLElement[]
          const targetY = rowTargets[r - 1]

          // move grid to position where this row is centered
          // longer durations for all rows so each gets more scroll time
          const isFirst = r === 1
          const isSecond = r === 2
          const isLast = r === rows
          const translateDur = isFirst ? 2 : isSecond ? 1.6 : 1.4
          const fadeDur = isFirst ? 1.2 : isSecond ? 0.85 : 0.8
          // last row: short hold so scroll after it is minimal and next section comes sooner
          const holdDur = isLast ? 0.22 : isFirst ? 1.4 : 1
          const fadeOutDur = isFirst ? 1.1 : isSecond ? 0.7 : 0.6

          tl.to(gridEl, { y: targetY, duration: translateDur }, '+=0')

          // when the first row begins to fade in, fade out header/badge concurrently
          if (r === 1 && headerTargets.length) {
            tl.to(headerTargets, { y: -120, autoAlpha: 0, duration: Math.min(0.6, fadeDur) }, '<')
          }

          // fade the row's cards in
          if (elems.length) tl.to(elems, { autoAlpha: 1, stagger: 0.08, duration: fadeDur }, '<')

          // small hold so it's readable
          tl.to({}, { duration: holdDur })

          // fade out unless last
          if (r !== rows && elems.length) {
            tl.to(elems, { autoAlpha: 0, stagger: 0.05, duration: fadeOutDur })
          }
        }

        // Pin as soon as this section reaches the top of the viewport so the
        // content above scrolls away; ensure the wrapper sits above previous
        // content so rows visually overlap/hide it.
        // Pin scroll distance. Total pin-spacer height = content height + endPx; keep endPx lower to reduce total.
        const endPx = 800
        gsap.set(wrapEl, { zIndex: 20 })

        ScrollTrigger.create({
          trigger: wrapEl,
          start: 'top top',
          end: `+=${endPx}`,
          scrub: true,
          pin: wrapEl,
          pinSpacing: true,
          animation: tl,
        })
      }

      // Only pin/animate on desktop to avoid bad mobile UX
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': function () {
          applyPinnedScroll()
        },
        '(max-width: 1023px)': function () {
          // no pin on small screens; ensure grid is at natural position
          if (gridRef.current) gsap.set(gridRef.current, { clearProps: 'all' })
        },
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
        <div ref={gridRef} className="quality-grid">
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
