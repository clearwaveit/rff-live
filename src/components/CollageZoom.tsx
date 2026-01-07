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
      // We'll calculate scaling based on the viewport size vs the element size
      // But we need to use fixed values for calculations to avoid glitching during pin
      // Instead of relying on getBoundingClientRect() which changes during animation/pin,
      // we'll compute the target scale and translation relative to the viewport center.
      if (!mid) return { scale: 1, tx: 0, ty: 0 }
      
      const r = mid.getBoundingClientRect()
      // Calculate how much we need to scale to cover the screen
      const scaleX = window.innerWidth / r.width
      const scaleY = window.innerHeight / r.height
      const scale = Math.max(scaleX, scaleY) * 1.05 // slightly larger to ensure coverage
      
      // Calculate translation to center
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const tx = window.innerWidth / 2 - cx
      const ty = window.innerHeight / 2 - cy
      
      return { scale, tx, ty }
    }

    const ctx = gsap.context(() => {
      // We need to capture the initial state properly
      const initialCalc = calc()
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=150%", // Slightly reduced scroll distance for quicker effect
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      })

      // Phase 1: Scale up to full screen (0 to 1 of timeline)
      // We hide other tiles first
      tl.to(wrap.querySelectorAll(".tile:not(.mid)"), {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0)

      // We animate the middle tile to full screen
      tl.to(mid, {
        scale: initialCalc.scale,
        x: initialCalc.tx,
        y: initialCalc.ty,
        borderRadius: 0,
        zIndex: 50,
        duration: 1,
        ease: "power2.inOut",
        transformOrigin: "center center",
        onUpdate: function() {
           // Force recalculation on refresh/resize handled by ScrollTrigger invalidateOnRefresh
        }
      }, 0)
      
      // Ensure it stays at the end state
      tl.set(mid, {
         scale: initialCalc.scale,
         x: initialCalc.tx,
         y: initialCalc.ty
      })

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
