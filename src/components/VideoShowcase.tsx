"use client"

import { useEffect, useRef } from "react"
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
      title: (<>80% <br /> <span className="font-normal">Less Energy</span></>),
      description: "Recycled plastic can use up to 80% less energy than producing virgin plastic",
    },
  },
  {
    src: "/video/new-section-v-2.mp4",
    content: {
      subtitle: "",
      title: (<>2 Tonnes <br /> <span className="font-normal">carbon Saved</span></>),
      description: "Every tonne of plastic recycled can save up to 2 tonnes of carbon emissions",
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
      description: "Plastic recycling helps divert millions of tonnes of waste from landfill every year",
    },
  },
]

// Total scroll bara = second video ka delay (scroll amount) zyada ho
const SCROLL_VH_PER_PHASE = 420
const TOTAL_SCROLL_VH = ITEMS.length * SCROLL_VH_PER_PHASE

// Second video ke baad third aane se pehle zyada delay; third bhi smoothly slide (CROSS_2_3 bada)
const HOLD_1 = 0.08       // 8% = first video + content
const CROSS_1_2 = 0.10    // 10% = smooth 1→2 slide
const HOLD_2 = 0.56       // 56% = second video + content
const CROSS_2_3 = 0.16    // 16% = third video smoothly slide from bottom (instant nahi)
const HOLD_3 = 0.10       // 10% = third video + content

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const videoLayersRef = useRef<(HTMLDivElement | null)[]>([])
  const contentSlidesRef = useRef<(HTMLDivElement | null)[]>([])
  const thirdOverlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const viewport = viewportRef.current
    const videoLayers = videoLayersRef.current.filter(Boolean) as HTMLDivElement[]
    const contentSlides = contentSlidesRef.current.filter(Boolean) as HTMLDivElement[]
    if (!section || !viewport || videoLayers.length !== ITEMS.length || contentSlides.length !== ITEMS.length) return

    // First video visible; second/third start below viewport (slide up later)
    gsap.set(videoLayers[0], { opacity: 1, yPercent: 0 })
    gsap.set(videoLayers[1], { opacity: 0, yPercent: 100 })
    gsap.set(videoLayers[2], { opacity: 0, yPercent: 100 })
    contentSlides.forEach((slide, i) => {
      gsap.set(slide, { opacity: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : 100 })
    })
    if (thirdOverlayRef.current) gsap.set(thirdOverlayRef.current, { opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${TOTAL_SCROLL_VH}vh`,
      pin: viewport,
      pinSpacing: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress

        let q: number
        if (p <= HOLD_1) {
          q = 0
        } else if (p <= HOLD_1 + CROSS_1_2) {
          q = (1 / 3) * (p - HOLD_1) / CROSS_1_2
        } else if (p <= HOLD_1 + CROSS_1_2 + HOLD_2) {
          q = 1 / 3 + (1 / 3) * (p - HOLD_1 - CROSS_1_2) / HOLD_2
        } else if (p <= HOLD_1 + CROSS_1_2 + HOLD_2 + CROSS_2_3) {
          q = 2 / 3 + (1 / 3) * (p - HOLD_1 - CROSS_1_2 - HOLD_2) / CROSS_2_3
        } else {
          q = 1
        }

        const ease = (t: number) => t * t * (3 - 2 * t)
        let v1: number, v2: number, v3: number
        let y1: number, y2: number, y3: number // yPercent: 0 = in place, 100 = below
        if (q <= 1 / 3) {
          v1 = 1
          v2 = 0
          v3 = 0
          y1 = 0
          y2 = 100
          y3 = 100
        } else if (q <= 2 / 3) {
          const t = ease((q - 1 / 3) * 3)
          v1 = 1 - t
          v2 = t
          v3 = 0
          y1 = 0
          y2 = 100 - t * 100 // slide from bottom (100) to 0
          y3 = 100
        } else {
          const t = ease((q - 2 / 3) * 3)
          v1 = 0
          v2 = 1 - t
          v3 = t
          y1 = 0
          y2 = 0
          y3 = 100 - t * 100 // third slides from bottom to 0
        }
        gsap.set(videoLayers[0], { opacity: v1, yPercent: y1 })
        gsap.set(videoLayers[1], { opacity: v2, yPercent: y2 })
        gsap.set(videoLayers[2], { opacity: v3, yPercent: y3 })
        contentSlides.forEach((slide, i) => {
          const op = i === 0 ? v1 : i === 1 ? v2 : v3
          const y = i === 0 ? y1 : i === 1 ? y2 : y3
          gsap.set(slide, { opacity: op, yPercent: y })
        })
        if (thirdOverlayRef.current) gsap.set(thirdOverlayRef.current, { opacity: v3 })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-hidden [width:100vw] [margin-left:calc(50%-50vw)] [max-width:100vw]"
    >
      <div
        ref={viewportRef}
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        {/* Video layers */}
        {ITEMS.map((item, i) => (
          <div
            key={item.src}
            ref={(el) => {
              if (el) videoLayersRef.current[i] = el
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
            />
          </div>
        ))}

        {/* Overlay sirf third video par – content prominent ke liye */}
        <div
          ref={thirdOverlayRef}
          className="absolute inset-0 bg-black/50 pointer-events-none z-[5]"
          style={{ opacity: 0 }}
          aria-hidden
        />

        {/* Content overlay: one slide per video, slides up with its video */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 sm:px-6 overflow-hidden w-full">
          <div className="relative w-full max-w-[1600px] mx-auto text-center min-h-[260px] sm:min-h-[300px] overflow-hidden">
            {ITEMS.map((item, i) => {
              const { subtitle, title, description } = item.content
              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) contentSlidesRef.current[i] = el
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
    </section>
  )
}
