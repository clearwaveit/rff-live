"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const VIDEOS = [
  { src: "/video/new-section-v-1.mp4" },
  { src: "/video/new-section-v-2.mp4" },
  { src: "/video/new-section-v-3.mp4" },
]

const SLIDES = [
  {
    subtitle: "80%",
    title: "Less Energy",
    description: "Recycled plastic can use up to 80% less energy than producing virgin plastic",
  },
  {
    subtitle: "2 Tonnes",
    title: "carbon Saved",
    description: "Every tonne of plastic recycled can save up to 2 tonnes of carbon emissions",
  },
  {
    subtitle: "",
    title: "Landfill Reduction",
    description: "Plastic recycling helps divert millions of tonnes of waste from landfill every year",
  },
]

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const videoLayersRef = useRef<(HTMLDivElement | null)[]>([])
  const contentWrapRef = useRef<HTMLDivElement>(null)
  const contentSlidesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const viewport = viewportRef.current
    const videoLayers = videoLayersRef.current.filter(Boolean) as HTMLDivElement[]
    const contentWrap = contentWrapRef.current
    const contentSlides = contentSlidesRef.current.filter(Boolean)
    if (!section || !viewport || !videoLayers.length || !contentWrap || contentSlides.length === 0) return

    const totalSlides = VIDEOS.length
    const scrollVhPerSlide = 120
    const totalScrollVh = totalSlides * scrollVhPerSlide

    videoLayers.forEach((layer, i) => gsap.set(layer, { opacity: i === 0 ? 1 : 0 }))
    contentSlides.forEach((slide, i) => gsap.set(slide, { opacity: i === 0 ? 1 : 0 }))

    // Scroll: first video fades out → second fades in (with content), then third fades in (with content)
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${totalScrollVh}vh`,
      pin: viewport,
      pinSpacing: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress
        // Scroll map: video 1 hold → crossfade → video 2 zyada hold → crossfade → video 3
        const HOLD_1 = 0.12       // 0–12%: video 1 full
        const CROSS_1_2 = 0.18   // 12–30%: crossfade 1→2
        const HOLD_2 = 0.38     // 30–68%: video 2 full (zyada scroll taake nazar aaye)
        const CROSS_2_3 = 0.18   // 68–86%: crossfade 2→3
        // 86–100%: video 3 full

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

        let v1: number, v2: number, v3: number
        if (q <= 1 / 3) {
          v1 = 1
          v2 = 0
          v3 = 0
        } else if (q <= 2 / 3) {
          const t = (q - 1 / 3) * 3
          v1 = 1 - t
          v2 = t
          v3 = 0
        } else {
          const t = (q - 2 / 3) * 3
          v1 = 0
          v2 = 1 - t
          v3 = t
        }
        gsap.set(videoLayers[0], { opacity: v1 })
        gsap.set(videoLayers[1], { opacity: v2 })
        gsap.set(videoLayers[2], { opacity: v3 })
        contentSlides.forEach((slide, i) => {
          const op = i === 0 ? v1 : i === 1 ? v2 : v3
          gsap.set(slide, { opacity: op })
        })
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
        {/* 3 videos stacked: fade out/in with scroll */}
        {VIDEOS.map((video, i) => (
          <div
            key={video.src}
            ref={(el) => {
              if (el) videoLayersRef.current[i] = el
            }}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <video
              src={video.src}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        ))}

        {/* Overlay content: centered, one slide per video */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 sm:px-6"
          ref={contentWrapRef}
        >
          <div className="relative w-full max-w-3xl mx-auto text-center min-h-[280px] sm:min-h-[320px]">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) contentSlidesRef.current[i] = el
                }}
                className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <span className="text-sm sm:text-base font-medium tracking-widest text-white/90 uppercase mb-3">
                  {slide.subtitle}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-4 md:mb-6">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
