"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Cta from "@/components/Cta"
import Image from "next/image"
export default function AboutIntro({
  badge,
  title,
  accent,
  paragraph,
  ctaHref,
  ctaLabel,
  withWave,
  className = "",
  badgeSize,
  titleSize
}: {
  badge?: string
  title?: React.ReactNode
  accent?: string
  paragraph?: string
  ctaHref?: string
  ctaLabel?: string
  withWave?: boolean
  className?: string
  badgeSize?: string
  titleSize?: string
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const hRef = useRef<HTMLHeadingElement | null>(null)
  const pRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(hRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
        }
      })
      gsap.from(pRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
        }
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={`relative ${className}`}>
      <div ref={wrapRef} className="mx-auto max-w-[1600px] px-6 sm:px-10 md:px-[4%] lg:px-[2%] py-12 sm:py-16 lg:py-24">
        {badge && (
          <div className="abt-text">
            <span style={badgeSize ? { fontSize: badgeSize } : undefined}>{badge}</span>
          </div>
        )}
        <div className="heading-abt-wrap">
          {(title || accent) && (
            <h2 ref={hRef} className="heading-about text-[20px] sm:text-[26px] md:text-[36px] lg:text-[42px] xl:text-[48px]" style={titleSize ? { fontSize: titleSize, lineHeight: 1.6 } : undefined}>
              {title}{accent && <span className="accent">{accent}</span>}
            </h2>
          )}
          {paragraph && (
            <p ref={pRef}>
              {paragraph.split(/\n/).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          )}
          {ctaHref && ctaLabel && (
            <div className="mt-12 sm:mt-16 lg:mt-20 btn-center">
              <Cta href={ctaHref} label={ctaLabel} tone="dark" />
            </div>
          )}
        </div>
      </div>
      {/* {withWave && (
        <div className="bottom-border" style={{ backgroundImage: `url("border.png")` }}>
        </div>
      )} */}
    </section>
  )
}
