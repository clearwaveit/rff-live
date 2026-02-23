"use client"

import type { ReactNode } from "react"
import { useEffect, useRef, useState, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const DESKTOP_CARD_WIDTH = 559
const DESKTOP_OVERLAP = 279

/** Responsive: card width and overlap per breakpoint so mobile/tablet same layout as desktop */
function getCardDimensions(width: number): { cardWidth: number; overlap: number } {
  if (width >= 1024) return { cardWidth: DESKTOP_CARD_WIDTH, overlap: DESKTOP_OVERLAP }
  if (width >= 768) return { cardWidth: 400, overlap: 200 }
  if (width >= 640) return { cardWidth: 320, overlap: 160 }
  return { cardWidth: 280, overlap: 140 }
}

/** Per-card layout: above = dotted line ke upar; marginLeft = is card se pehle gap (0 = first, negative = overlap) */
export type HowItWorksCardLayout = {
  above: boolean
  marginLeft?: number
}

export type HowItWorksStep = {
  number: string
  title: string
  description: string
}

/** Same responsive scale as other section titles (CustomSection, .heading-2): short or long titles both use this. */
const SECTION_TITLE_CLASS = "text-[28px] sm:text-[32px] md:text-[48px] lg:text-[60px] font-light leading-tight"

type HowItWorksProps = {
  title?: ReactNode
  steps: HowItWorksStep[]
  cardLayout?: HowItWorksCardLayout[]
  className?: string
  /** Optional: override title styles only when needed; otherwise section title uses consistent scale. */
  titleClassName?: string
}

const DEFAULT_TITLE = "How it Works"
const SCROLL_VH_DESKTOP = 700
/** Choti screens par zyada scroll – guaranteed poora left move */
const SCROLL_VH_TABLET = 1800
const SCROLL_VH_MOBILE = 2800
const END_PADDING_PX = 80

function getTrackWidthPx(
  steps: HowItWorksStep[],
  layout: HowItWorksCardLayout[] | undefined,
  cardWidth: number,
  overlap: number
): number {
  let w = cardWidth
  for (let i = 1; i < steps.length; i++) {
    const custom = layout?.[i]?.marginLeft
    const ml = custom !== undefined ? custom * (overlap / DESKTOP_OVERLAP) : -overlap
    w += cardWidth + ml
  }
  return w
}

function getCardLayout(steps: HowItWorksStep[], index: number, layout?: HowItWorksCardLayout[]): HowItWorksCardLayout {
  if (layout && layout[index] != null) return layout[index]
  return {
    above: index % 2 === 1,
    marginLeft: index === 0 ? 0 : -DESKTOP_OVERLAP,
  }
}

export default function HowItWorks({ title = DEFAULT_TITLE, steps, cardLayout, className = "", titleClassName }: HowItWorksProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardLayoutRef = useRef(cardLayout)
  cardLayoutRef.current = cardLayout

  const [windowSize, setWindowSize] = useState(() =>
    typeof window !== "undefined" ? { w: window.innerWidth, h: window.innerHeight } : { w: 1024, h: 768 }
  )
  const dimensions = useMemo(() => getCardDimensions(windowSize.w), [windowSize.w])
  const trackWidthPx = useMemo(
    () => getTrackWidthPx(steps, cardLayout, dimensions.cardWidth, dimensions.overlap),
    [steps.length, cardLayout, dimensions.cardWidth, dimensions.overlap]
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    const onResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !viewport || !track) return

    let st: ScrollTrigger | undefined
    const setup = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1024
      const dims = getCardDimensions(w)
      const scrollVh = w >= 1024 ? SCROLL_VH_DESKTOP : w >= 768 ? SCROLL_VH_TABLET : SCROLL_VH_MOBILE

      const vw = viewport.offsetWidth
      const tw = track.scrollWidth
      const maxX = Math.min(0, vw - tw - END_PADDING_PX)

      if (st) st.kill()
      gsap.set(track, { x: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollVh}vh`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      tl.to(track, { x: maxX, ease: "none", duration: 1 })
      st = tl.scrollTrigger
    }

    const raf = requestAnimationFrame(() => {
      setup()
      ScrollTrigger.refresh()
    })

    const onResizeRefresh = () => {
      gsap.set(track, { x: 0 })
      requestAnimationFrame(setup)
      ScrollTrigger.refresh()
    }
    window.addEventListener("resize", onResizeRefresh)

    return () => {
      cancelAnimationFrame(raf)
      if (st) st.kill()
      window.removeEventListener("resize", onResizeRefresh)
    }
  }, [steps.length])

  return (
    <section
      ref={sectionRef}
      className={`relative z-30 overflow-hidden min-h-screen flex flex-col justify-center py-12 md:py-16 lg:py-24 ${className}`}
      style={{
        background: "linear-gradient(107.43deg, #284D4D 58.74%, #5DB3B3 138.65%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[2400px] w-full px-4 sm:px-[2%] lg:px-8 pointer-events-none" ref={pinRef}>
        <h2 className={`w-auto max-w-[1000px] mx-auto text-center text-white mb-8 md:mb-12 lg:mb-16 pointer-events-auto ${titleClassName ?? SECTION_TITLE_CLASS}`}>
          {title}
        </h2>

        <div className="relative w-full pointer-events-none">
          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden min-h-[380px] md:min-h-[420px] lg:min-h-[450px] flex items-center pointer-events-none"
          >
            {/* Dotted line – visible on all breakpoints like desktop */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-[1] pointer-events-none rounded-full text-[#BCDFD8]"
              style={{ height: 6, width: "100%" }}
              aria-hidden
            >
              <div
                className="h-full w-full opacity-90"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.95) 3.31px, transparent 3.31px)",
                  backgroundSize: "14px 6.62px",
                }}
              />
            </div>

            {/* Track: horizontal row on all breakpoints, scroll moves left */}
            <div
              ref={trackRef}
              className="relative z-10 flex flex-row items-center flex-nowrap min-h-[380px] md:min-h-[400px] lg:min-h-[500px] will-change-transform flex-shrink-0 pointer-events-none"
              style={{ minWidth: trackWidthPx }}
            >
              {steps.map((step, i) => {
                const layout = getCardLayout(steps, i, cardLayout)
                const customMl = layout.marginLeft
                const marginLeft = i === 0 ? 0 : (customMl !== undefined ? customMl * (dimensions.overlap / DESKTOP_OVERLAP) : -dimensions.overlap)
                return (
                  <div
                    key={i}
                    className={`how-it-works-card flex-shrink-0 rounded-tl-[50.98px] rounded-br-[50.98px] px-4 py-5 sm:px-5 sm:py-6 md:px-6 md:py-8 bg-[#518383] text-white shadow-lg pointer-events-auto ${layout.above ? "self-start" : "self-end"}`}
                    style={{ width: dimensions.cardWidth, marginLeft: i > 0 ? marginLeft : undefined }}
                  >
                    <h3 className="text-white text-base sm:text-lg md:text-xl font-medium mb-2">
                      <span className="opacity-90">{step.number}.</span> {step.title}
                    </h3>
                    <p className="text-white/95 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
