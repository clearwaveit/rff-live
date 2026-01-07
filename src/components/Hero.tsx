"use client"

import Image from "next/image"
import { gsap } from "gsap"
import { useEffect, useRef } from "react"
import Logo from "@/components/Logo"

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const motifRef = useRef<HTMLDivElement | null>(null)
  const logoCenterRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context((self) => {
      if (!reduceMotion) {
        // intro sequence replaced by overlay slide-up implementation below
        const tlIntro = gsap.timeline({ defaults: { ease: "power4.out" } })
        // initial states: overlay covers screen, content hidden
        gsap.set(overlayRef.current, { yPercent: 0 })
        gsap.set(logoCenterRef.current, { autoAlpha: 0, scale: 0.92 })
        gsap.set(motifRef.current, { autoAlpha: 0 })

        // logo intro: fade/scale in, hold ~2s, then slide overlay up to reveal banner
        tlIntro
          .to(logoCenterRef.current, { autoAlpha: 1, scale: 1, duration: 0.8 })
          .to({}, { duration: 2.0 })
          .to(overlayRef.current, { yPercent: -100, duration: 1.0 })
          // reveal headline and CTA underneath
          .from(titleRef.current, { y: 60, scale: 0.98, autoAlpha: 0, duration: 0.9 }, "-=0.3")
          .from(ctaRef.current, { y: 24, autoAlpha: 0, duration: 0.7 }, "-=0.4")
          .to(motifRef.current, { autoAlpha: 1, duration: 0.4 }, "-=0.2")

        // allow skipping intro on user interaction
        const skipIntro = () => tlIntro.progress(1)
        window.addEventListener("wheel", skipIntro, { once: true })
        window.addEventListener("touchstart", skipIntro, { once: true })
        window.addEventListener("keydown", skipIntro, { once: true })
        // cleanup
        self.add(() => {
          window.removeEventListener("wheel", skipIntro)
          window.removeEventListener("touchstart", skipIntro)
          window.removeEventListener("keydown", skipIntro)
        })
        // no video playback needed (solid background)

        if (motifRef.current) {
          const leaves = gsap.utils.toArray<HTMLElement>(".motif-leaf")
          if (leaves.length) {
            gsap.to(leaves, { y: -8, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.12 })
            gsap.to(leaves, { rotateZ: 2, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: { each: 0.12, from: "center" } })
          } else {
            gsap.to(motifRef.current, { y: -6, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" })
          }
        }

        mm.add(
          {
            isDesktop: "(min-width: 1024px)",
            isTablet: "(min-width: 768px) and (max-width: 1023px)",
            isMobile: "(max-width: 767px)",
          },
          (context) => {
            const conditions = (context as any).conditions
            if (conditions?.isMobile) {
              gsap.set(titleRef.current, { scale: 0.98 })
            }
          }
        )
      } else {
        // Reduced motion: fade-only
        gsap.set(overlayRef.current, { autoAlpha: 0 })
        gsap.from(titleRef.current, { autoAlpha: 0, duration: 0.6 })
        gsap.from(ctaRef.current, { autoAlpha: 0, duration: 0.6, delay: 0.2 })
      }
    }, rootRef)

    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  return (

    <section ref={rootRef} data-hero className="relative min-h-[100vh] overflow-hidden">
      {/* Solid background layer replaces video */}
      <div className="absolute inset-0 -z-10 bg-green-700 hide" />
      {/* Loading overlay that slides up to reveal banner */}
      <div ref={overlayRef} className="absolute inset-0 z-30 bg-green-700 text-white flex items-center justify-center hide">
        <div ref={logoCenterRef} className="scale-100">
          <Logo />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-[2%] pt-24 pb-20 hide">
        <h1 ref={titleRef} data-headline className="heading-hero max-w-5xl">
          Leading Plastic Recycling Specialists in the UK
        </h1>
        <div ref={ctaRef} data-cta className="mt-8 flex items-center gap-3">
          <a href="#" className="stylish-btn">
            <span className="style-main">Discover Our Platform</span>
            <span className="style-arrow">
              <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.2793 12.1669H2.05864" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.1797 3.06934L22.279 12.1686L13.1797 21.2679" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <div ref={motifRef} data-motif className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative grid grid-cols-2 gap-3 opacity-60 md:opacity-80">
            <Image src="/green-leaf.png" alt="Leaf motif" width={220} height={220} priority className="motif-leaf w-[140px] h-[140px] md:w-[220px] md:h-[220px] rotate-0" />
            <Image src="/green-leaf.png" alt="Leaf motif" width={220} height={220} priority className="motif-leaf w-[140px] h-[140px] md:w-[220px] md:h-[220px] rotate-90" />
            <Image src="/green-leaf.png" alt="Leaf motif" width={220} height={220} priority className="motif-leaf w-[140px] h-[140px] md:w-[220px] md:h-[220px] -rotate-90" />
            <Image src="/green-leaf.png" alt="Leaf motif" width={220} height={220} priority className="motif-leaf w-[140px] h-[140px] md:w-[220px] md:h-[220px] rotate-180" />
          </div>
        </div>
      </div>
      <div className="video-block">
        <video
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/banner-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hm-banner-content">
          <div className="mx-auto max-w-[1600px] hm-banner-content-wrap px-[2%]">
            <h1>Leading Plastic <span>Recycling Specialists</span> in the UK</h1>
            <a href="#" className="stylish-btn">
              <span className="style-main">Discover Our Platform</span>
              <span className="style-arrow">
                <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.2793 12.1669H2.05864" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.1797 3.06934L22.279 12.1686L13.1797 21.2679" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <p>
              <Image
                src="/images/leaf.svg"
                alt="icon"
                width={45}
                height={43}
              />
              Recycle For Future Ltd. has 20 years in-house experience in the recycling industry. We are ISO 9001: 2015 and ISO 14001:2015 registered.</p>
            <div className="round-block">
              <Image
                src="/images/round.png"
                alt="icon"
                width={124}
                height={125}
              />
              <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4551 1.25C10.4551 0.559644 9.89543 3.01764e-08 9.20508 0C8.51472 -3.01764e-08 7.95508 0.559644 7.95508 1.25L9.20508 1.25L10.4551 1.25ZM8.32119 22.1339C8.80935 22.622 9.60081 22.622 10.089 22.1339L18.0439 14.1789C18.5321 13.6908 18.5321 12.8993 18.0439 12.4112C17.5558 11.923 16.7643 11.923 16.2761 12.4112L9.20508 19.4822L2.13401 12.4112C1.64585 11.923 0.854398 11.923 0.366243 12.4112C-0.121913 12.8993 -0.121913 13.6908 0.366243 14.1789L8.32119 22.1339ZM9.20508 1.25L7.95508 1.25L7.95508 21.25L9.20508 21.25L10.4551 21.25L10.4551 1.25L9.20508 1.25Z" fill="white" />
              </svg>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
