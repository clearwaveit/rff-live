"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type SlideContent = {
  subtitle: string
  title: React.ReactNode
  description: string
}

const ITEMS: { src: string; content: SlideContent }[] = [
  {
    src: "/video/new-section-v-1.mp4",
    content: {
      subtitle: "",
      title: (
        <>
          80% <br /> <span className="font-normal">Less Energy</span>
        </>
      ),
      description:
        "Recycled plastic can use up to 80% less energy than producing virgin plastic",
    },
  },
  {
    src: "/video/new-section-v-2.mp4",
    content: {
      subtitle: "",
      title: (
        <>
          2 Tonnes <br /> <span className="font-normal">carbon Saved</span>
        </>
      ),
      description:
        "Every tonne of plastic recycled can save up to 2 tonnes of carbon emissions",
    },
  },
  {
    src: "/video/new-section-v-3.mp4",
    content: {
      subtitle: "",
      title: (
        <>
          Landfill
          <br />
          <span className="font-normal">Reduction</span>
        </>
      ),
      description:
        "Plastic recycling helps divert millions of tonnes of waste from landfill every year",
    },
  },
]

// Increase this to make user scroll more before the whole sequence ends
const SCROLL_VH_PER_PHASE = 520
const TOTAL_SCROLL_VH = ITEMS.length * SCROLL_VH_PER_PHASE

// Intro and phase timings
const INTRO_PHASE = 0.08

// Make transitions longer so they do not feel instant
const HOLD_1 = 0.14
const CROSS_1_2 = 0.22
const HOLD_2 = 0.14
const CROSS_2_3 = 0.22

const HOLD_3 = Math.max(
  0,
  1 - (INTRO_PHASE + HOLD_1 + CROSS_1_2 + HOLD_2 + CROSS_2_3)
)

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const whiteBgRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoLayersRef = useRef<(HTMLDivElement | null)[]>([])
  const contentSlidesRef = useRef<(HTMLDivElement | null)[]>([])
  const thirdOverlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const wrapper = wrapperRef.current
    const viewport = viewportRef.current
    const whiteBg = whiteBgRef.current
    const videoContainer = videoContainerRef.current
    const thirdOverlay = thirdOverlayRef.current

    const videoLayers = videoLayersRef.current.filter(Boolean) as HTMLDivElement[]
    const contentSlides = contentSlidesRef.current.filter(Boolean) as HTMLDivElement[]

    if (
      !section ||
      !wrapper ||
      !viewport ||
      !whiteBg ||
      !videoContainer ||
      !thirdOverlay ||
      videoLayers.length !== ITEMS.length ||
      contentSlides.length !== ITEMS.length
    ) {
      return
    }

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(whiteBg, { opacity: 0 })
      gsap.set(videoContainer, { scale: 1 })

      gsap.set(videoLayers[0], { opacity: 1, yPercent: 0 })
      gsap.set(videoLayers[1], { opacity: 0, yPercent: 100 })
      gsap.set(videoLayers[2], { opacity: 0, yPercent: 100 })

      gsap.set(contentSlides[0], { opacity: 1, yPercent: 0 })
      gsap.set(contentSlides[1], { opacity: 0, yPercent: 100 })
      gsap.set(contentSlides[2], { opacity: 0, yPercent: 100 })

      gsap.set(thirdOverlay, { opacity: 0 })

      videoLayers.forEach((layer) => {
        gsap.set(layer, { willChange: "transform, opacity" })
      })

      contentSlides.forEach((slide) => {
        gsap.set(slide, { willChange: "transform, opacity" })
      })

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${TOTAL_SCROLL_VH}vh`,
        pin: wrapper,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress

          // Smooth linear feel
          const ease = (t: number) => t

          // Intro animation
          if (p <= INTRO_PHASE) {
            const t = p / INTRO_PHASE
            const smooth = t * t * (3 - 2 * t)

            gsap.set(whiteBg, { opacity: smooth })
            gsap.set(videoContainer, { scale: 1 - 0.04 * smooth })

            gsap.set(videoLayers[0], { opacity: 1, yPercent: 0 })
            gsap.set(videoLayers[1], { opacity: 0, yPercent: 100 })
            gsap.set(videoLayers[2], { opacity: 0, yPercent: 100 })

            gsap.set(contentSlides[0], { opacity: 1, yPercent: 0 })
            gsap.set(contentSlides[1], { opacity: 0, yPercent: 100 })
            gsap.set(contentSlides[2], { opacity: 0, yPercent: 100 })

            gsap.set(thirdOverlay, { opacity: 0 })
            return
          }

          gsap.set(whiteBg, { opacity: 1 })
          gsap.set(videoContainer, { scale: 0.96 })

          // Remap after intro
          const pMapped = (p - INTRO_PHASE) / (1 - INTRO_PHASE)

          const a1 = HOLD_1
          const b1 = a1 + CROSS_1_2
          const c1 = b1 + HOLD_2
          const d1 = c1 + CROSS_2_3
          const e1 = d1 + HOLD_3

          let q = 0

          if (pMapped <= a1) {
            q = 0
          } else if (pMapped <= b1) {
            const t = (pMapped - a1) / CROSS_1_2
            q = (1 / 3) * ease(t)
          } else if (pMapped <= c1) {
            q = 1 / 3
          } else if (pMapped <= d1) {
            const t = (pMapped - c1) / CROSS_2_3
            q = 1 / 3 + (1 / 3) * ease(t)
          } else if (pMapped <= e1) {
            q = 2 / 3
          } else {
            q = 1
          }

          let v1 = 0
          let v2 = 0
          let v3 = 0

          let y1 = 0
          let y2 = 100
          let y3 = 100

          // Transition 1 -> 2
          if (q < 1 / 3) {
            const t = ease(q * 3)

            v1 = 1 - t
            v2 = t
            v3 = 0

            y1 = 0
            y2 = 100 - t * 100
            y3 = 100
          }
          // Transition 2 -> 3
          else if (q < 2 / 3) {
            const t = ease((q - 1 / 3) * 3)

            v1 = 0
            v2 = 1 - t
            v3 = t

            y1 = 0
            y2 = 0
            y3 = 100 - t * 100
          }
          // Final hold on third
          else {
            v1 = 0
            v2 = 0
            v3 = 1

            y1 = 0
            y2 = 0
            y3 = 0
          }

          gsap.set(videoLayers[0], { opacity: v1, yPercent: y1 })
          gsap.set(videoLayers[1], { opacity: v2, yPercent: y2 })
          gsap.set(videoLayers[2], { opacity: v3, yPercent: y3 })

          gsap.set(contentSlides[0], { opacity: v1, yPercent: y1 })
          gsap.set(contentSlides[1], { opacity: v2, yPercent: y2 })
          gsap.set(contentSlides[2], { opacity: v3, yPercent: y3 })

          // Overlay only with third video
          const overlayOpacity =
            q < 1 / 3 ? 0 : q < 2 / 3 ? (q - 1 / 3) * 3 : 1

          gsap.set(thirdOverlay, { opacity: overlayOpacity })
        },
      })

      return () => {
        trigger.kill()
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-hidden [width:100vw] [margin-left:calc(50%-50vw)] [max-width:100vw]"
    >
      <div
        ref={wrapperRef}
        className="md:min-h-screen flex items-center justify-center w-full"
      >
        <div
          ref={viewportRef}
          className="relative w-full h-screen sm:h-screen overflow-hidden bg-black"
        >
          <div
            ref={whiteBgRef}
            className="absolute inset-0 bg-white pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden
          />

          <div
            ref={videoContainerRef}
            className="absolute inset-0 w-full h-full origin-center overflow-hidden rounded-[10px]"
            style={{ zIndex: 1 }}
          >
            {ITEMS.map((item, i) => (
              <div
                key={item.src}
                ref={(el) => {
                  videoLayersRef.current[i] = el
                }}
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                style={{ zIndex: i + 1 }}
              >
                <video
                  src={item.src}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
            ))}

            <div
              ref={thirdOverlayRef}
              className="absolute inset-0 bg-black/50 pointer-events-none"
              style={{ zIndex: 5, opacity: 0 }}
              aria-hidden
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 sm:px-6 overflow-hidden w-full">
            <div className="relative w-full max-w-[1600px] mx-auto text-center min-h-[260px] sm:min-h-[300px] overflow-hidden">
              {ITEMS.map((item, i) => {
                const { subtitle, title, description } = item.content

                return (
                  <div
                    key={i}
                    ref={(el) => {
                      contentSlidesRef.current[i] = el
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center w-full"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    {subtitle && (
                      <span className="text-sm sm:text-base font-medium tracking-widest text-white/90 uppercase mb-3">
                        {subtitle}
                      </span>
                    )}

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-4 md:mb-6">
                      {title}
                    </h2>

                    <p className="w-full text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                      {description}
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
