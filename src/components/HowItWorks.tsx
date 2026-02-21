"use client"

import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const CARD_WIDTH = 559
const DEFAULT_OVERLAP = 279

/** Per-card layout: above = dotted line ke upar; marginLeft = is card se pehle gap (0 = first, negative = overlap, 0 on rest = full gap) */
export type HowItWorksCardLayout = {
  above: boolean
  marginLeft?: number
}

export type HowItWorksStep = {
  number: string
  title: string
  description: string
}

type HowItWorksProps = {
  title?: ReactNode
  steps: HowItWorksStep[]
  /** Array length = steps.length. above + marginLeft per card; agar nahi diya to default: alternate above/below, overlap -279 */
  cardLayout?: HowItWorksCardLayout[]
  className?: string
  titleClassName?: string
}

const DEFAULT_TITLE = "How it Works"
/** Scroll distance – section tab tak pinned; cards horizontally move; last card full display ke baad hi section upar jayega */
const SCROLL_VH = 700
/** Last card ke right mein space taake wo clearly full visible ho */
const END_PADDING_PX = 80

function getTrackWidthPx(steps: HowItWorksStep[], layout?: HowItWorksCardLayout[]): number {
  let w = CARD_WIDTH
  for (let i = 1; i < steps.length; i++) {
    const ml = layout?.[i]?.marginLeft ?? -DEFAULT_OVERLAP
    w += CARD_WIDTH + ml
  }
  return w
}

function getCardLayout(steps: HowItWorksStep[], index: number, layout?: HowItWorksCardLayout[]): HowItWorksCardLayout {
  if (layout && layout[index] != null) return layout[index]
  return {
    above: index % 2 === 1,
    marginLeft: index === 0 ? 0 : -DEFAULT_OVERLAP,
  }
}

export default function HowItWorks({ title = DEFAULT_TITLE, steps, cardLayout, className = "", titleClassName = "" }: HowItWorksProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const trackWidthPx = getTrackWidthPx(steps, cardLayout)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !viewport || !track) return

    const getMaxX = () => {
      if (typeof window === "undefined" || window.innerWidth < 1024) return 0
      return Math.min(0, viewport.offsetWidth - trackWidthPx - END_PADDING_PX)
    }

    // Pura section pin: cards fully left hone tak next section overlap nahi karega, phir section upar jayega
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${SCROLL_VH}vh`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })

    tl.to(track, {
      x: () => getMaxX(),
      ease: "none",
      duration: 1,
    })

    const st = tl.scrollTrigger
    const onResize = () => {
      if (st && window.innerWidth >= 1024) {
        gsap.set(track, { x: 0 })
        ScrollTrigger.refresh()
      } else {
        gsap.set(track, { x: 0 })
      }
    }
    window.addEventListener("resize", onResize)
    ScrollTrigger.refresh()

    return () => {
      st?.kill()
      window.removeEventListener("resize", onResize)
    }
  }, [steps.length, trackWidthPx])

  return (
    <section
      ref={sectionRef}
      className={`relative z-30 overflow-hidden py-16 lg:py-24 ${className}`}
      style={{
        background: "linear-gradient(107.43deg, #284D4D 58.74%, #5DB3B3 138.65%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[2400px] px-[2%] lg:px-8 pointer-events-none" ref={pinRef}>
          <h2 className={`w-auto max-w-[1000px] mx-auto text-center font-light text-white mb-12 lg:mb-16 pointer-events-auto ${titleClassName || "text-[28px] md:text-[44px] lg:text-[90px]"}`}>
          {title}
        </h2>

        <div className="relative w-full pointer-events-none">
          {/* Viewport: fixed height so dotted line section ke bilkul midd mein */}
          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden lg:min-h-[450px] lg:flex lg:items-center pointer-events-none"
          >
            {/* Dotted line – full dots, 6.62px × 6.62px, middle vertically */}
            <div
              className="hidden lg:block absolute left-0 right-0 top-1/2 -translate-y-1/2 z-[1] pointer-events-none rounded-full text-[#BCDFD8]"
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

            {/* Track: min-width zyada so viewport se overflow; scroll par left move */}
            <div
              ref={trackRef}
              className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:flex-nowrap lg:min-h-[500px] will-change-transform flex-shrink-0 pointer-events-none"
              style={{ minWidth: trackWidthPx }}
            >
              {steps.map((step, i) => {
                const layout = getCardLayout(steps, i, cardLayout)
                const marginLeft = i === 0 ? 0 : (layout.marginLeft ?? -DEFAULT_OVERLAP)
                return (
                  <div
                    key={i}
                    className={`how-it-works-card w-full flex-shrink-0 rounded-tl-[50.98px] rounded-br-[50.98px] px-5 py-6 md:px-6 md:py-8 bg-[#518383] text-white shadow-lg lg:w-[559px] pointer-events-auto ${layout.above ? "lg:self-start position-absolute top-[200px] left-[200px]" : "lg:self-end"}`}
                    style={i > 0 ? { marginLeft } : undefined}
                  >
                    <h3 className="text-white text-lg md:text-xl font-medium mb-2">
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

          <div className="lg:hidden flex justify-center gap-2 mt-4 mb-2">
            {steps.map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/70" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
