"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function CollageZoom() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const midRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mid = midRef.current
    const wrap = sectionRef.current
    if (!mid || !wrap) return

    const calc = () => {
      const r = mid.getBoundingClientRect()
      const scaleX = window.innerWidth / r.width
      const scaleY = window.innerHeight / r.height
      const scale = Math.max(scaleX, scaleY)
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const tx = window.innerWidth / 2 - cx
      const ty = window.innerHeight / 2 - cy
      return { scale, tx, ty }
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=200%", // Extended scroll distance for full effect
          pin: true,
          scrub: 1, // Smoother scrub
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      })

      // Phase 1: Scale up to full screen (0 to 0.4 of timeline)
      tl.to(wrap.querySelectorAll(".tile:not(.mid)"), {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.out"
      }, 0)

      tl.to(mid, {
        scale: () => calc().scale,
        x: () => calc().tx,
        y: () => calc().ty,
        borderRadius: 0,
        zIndex: 50,
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "center center"
      }, 0)

      // Phase 2: Hold at full screen (0.4 to 0.6 of timeline - extra 1-2% scroll feel)
      tl.to(mid, {
        scale: () => calc().scale,
        x: () => calc().tx,
        y: () => calc().ty,
        duration: 0.2,
        ease: "none"
      }, 0.4)

      // Phase 3: Scale back down smoothly (0.6 to 1.0 of timeline)
      tl.to(mid, {
        scale: 1,
        x: 0,
        y: 0,
        borderRadius: "0.8rem",
        zIndex: 1,
        duration: 0.4,
        ease: "power2.inOut",
        transformOrigin: "center center"
      }, 0.6)

      // Phase 3: Bring other tiles back smoothly
      tl.to(wrap.querySelectorAll(".tile:not(.mid)"), {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0.6)
    }, wrap)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section className="relative w-full">
      <div ref={sectionRef} className="w-full py-16 college-top-space">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-6">
              <div className="tile relative rounded-[0.8rem] overflow-hidden h-315 sm:h-72 md:h-85">
                <Image src="/image-1.png" alt="" fill className="object-cover" />
              </div>
              <div className="tile relative rounded-[0.8rem] overflow-hidden h-315 sm:h-72">
                <Image src="/image-2.png" alt="" fill className="object-cover" />
              </div>
              <div className="tile relative rounded-[0.8rem] overflow-hidden h-157 sm:h-56">
                <Image src="/image-3.png" alt="" fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="tile relative rounded-[0.8rem] overflow-hidden h-315 sm:h-72 md:h-85">
                <Image src="/image-4.png" alt="" fill className="object-cover" />
              </div>
              <div ref={midRef} className="mid tile relative rounded-[0.8rem] overflow-hidden h-315 sm:h-72 md:h-85 will-change-transform">
                <Image src="/image-5.png" alt="" fill className="object-cover" />
              </div>
              <div className="tile relative rounded-[0.8rem] overflow-hidden h-157 sm:h-72 md:h-85">
                <Image src="/image-6.png" alt="" fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="tile relative rounded-[0.8rem] overflow-hidden h-315 sm:h-96 md:h-[500px]">
                <Image src="/image-7.png" alt="" fill className="object-cover" />
              </div>
              <div className="tile relative rounded-[0.8rem] overflow-hidden h-157 sm:h-72 md:h-85">
                <Image src="/image-8.png" alt="" fill className="object-cover" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
