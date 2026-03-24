"use client"

import Link from "next/link"
import Image from "next/image"
import Cta from "@/components/Cta"
import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/* ServiceCard - Row Layout (for Services Pages) */
function ServiceCardRow({
  badge,
  title,
  desc,
  img,
  bg,
  href,
  icon
}: {
  badge: string
  title: React.ReactNode
  desc: string
  img: string
  bg: string
  href: string
  icon: string
}) {
  return (
    <Link
      href={href}
      className="service-card-item block rounded-[1.25rem] ring-1 ring-black/5 shadow-[0px_0px_34.6px_0px_rgba(200,200,200,0.25)] overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
    >
      <div className="service-card-wrap flex flex-col h-full">
        {/* Image Section with Badge Overlay */}
        <div className="service-card-image relative h-[260px] sm:h-[360px] lg:h-[588.58px] overflow-hidden">
          <Image
            src={img}
            alt={typeof title === "string" ? title : ""}
            fill
            className="object-cover"
          />
          {/* Icon Overlay - centered */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px] bg-cover bg-center bg-no-repeat opacity-60"
            style={{ backgroundImage: `url("${icon}")` }}
          ></div>
          {/* Badge positioned at bottom-left of image */}
          <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-10">
            <span className="badge-wrap text-[#024D5D]">
              {badge}
            </span>
          </div>
        </div>
        {/* Content Section */}
        <div className="service-card-content px-5 sm:px-8 lg:px-10 pb-12 lg:pb-20 pt-5 flex flex-col flex-grow">
          <h3 className="text-[22px] lg:text-[26px] font-[700] text-gray-900 leading-tight">{title}</h3>
          <p className="mt-4 text-[15px] leading-[25px] font-[400] text-[#00272F] flex-grow">{desc}</p>
          <div className="mt-6">
            <Cta href={href} label="LEARN MORE" tone="light" as="div" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ServicesHighlight({
  heading = (
    <>
      <span className="leading-[48px] text-[30px] sm:text-[40px] md:text-[48px] font-[700]">Recycling services suited <br /> for every industry across the UK</span>
    </>
  ),
  layout = "row",
  pinnedHeading = "We believe that making plastic recycling valuable will reshape its global economic impact.",
  pinnedSubheading = "Expert polymer processes delivering dependable raw materials for modern industrial applications.",
  features = [
    { title: "Polymer Expertise", desc: "Recycling services suited for various industry across the UK" },
    { title: "Precision at Every Stage", desc: "Technical workflows ensure optimal handling of different polymer characteristics" },
  ],
  ctaBtnRadius,
  ctaArrowBg,
  ctaBtnBg,
  rightImage,
  services = [
    {
      badge: "OUR SERVICES",
      title: "Plastic Recycling",
      desc: "End-to-end recycling solutions for a wide range of plastics, converting waste into high-quality recycled pellets through efficient, compliant processes.",
      img: "/service-1.png",
      icon: "/green-leaf.png",
      bg: "bg-[#EAF8D5]",
      href: "/services/plastic-recycling"
    },
    {
      badge: "OUR SERVICES",
      title: "Compounding",
      desc: "Production of recycled plastic pellets and custom compounds tailored to performance, quality, and sustainability requirements.",
      img: "/service-2.png",
      icon: "/leaf-2.png",
      bg: "bg-[#EAF8D5]",
      href: "/services/pellet-and-compounds"
    },
    {
      badge: "OUR SERVICES",
      title: "Toll Processing",
      desc: "Flexible toll processing services including granulating, pelletising, compounding, and material testing using state-of-the-art facilities.",
      img: "/service-3.png",
      icon: "/leaf-3.png",
      bg: "bg-[#EAF8D5]",
      href: "/services/toll-processing"
    }
  ]
}: {
  heading?: React.ReactNode
  layout?: "row" | "pinned"
  pinnedHeading?: string
  pinnedSubheading?: string
  features?: { title: string; desc: string }[]
  services?: {
    badge: string
    title: React.ReactNode
    desc: string
    img: string
    icon: string
    bg: string
    href: string
  }[]
  ctaBtnRadius?: string
  ctaArrowBg?: string
  ctaBtnBg?: string
  rightImage?: string
}) {
  const containerRef = useRef<HTMLElement | null>(null)
  const pinnedRef = useRef<HTMLDivElement | null>(null)
  const [activeService, setActiveService] = useState(0)
  const activeServiceRef = useRef(0)

  // Helper to extract plain text from a React node (strings, numbers,
  // fragments, elements). Used so tab labels remain plain single-line text
  // even when slide titles use JSX (e.g. with <br/>).
  const titleToPlainString = (node: React.ReactNode): string => {
    if (node == null) return ""
    if (typeof node === "string" || typeof node === "number") return String(node)
    // Handle explicit <br/> elements and other React elements by returning a single space
    if (React.isValidElement(node)) {
      const type = (node as any).type
      if (type === "br" || type === "br") return " "
      const child = (node as any).props?.children
      return titleToPlainString(child)
    }
    if (Array.isArray(node)) {
      // join children with single spaces, trimming to avoid accidental concatenation
      const parts = node.map((n) => titleToPlainString(n)).map((s) => s.trim()).filter(Boolean)
      return parts.join(" ").replace(/\s+/g, " ")
    }
    return ""
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (layout === "row") {
        // Heading Animation
        gsap.from(".heading-2", {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".heading-2",
            start: "top 85%"
          }
        })

        const serviceCards = document.querySelectorAll(".service-card-item")
        serviceCards.forEach((card, index) => {
          gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".services-row-container",
              start: "top 80%"
            }
          })
        })
      }

      if (layout === "pinned" && pinnedRef.current) {
        const totalServices = services.length
        const slides = gsap.utils.toArray<HTMLElement>(".sp-slide")
        const tabs = gsap.utils.toArray<HTMLElement>(".sp-tab")

        // Position slides far apart (off-screen right)
        const gap = 120 // px gap between slides
        slides.forEach((slide, i) => {
          if (i === 0) {
            gsap.set(slide, { x: 0, position: "relative" })
          } else {
            const offset = i * (pinnedRef.current!.offsetWidth + gap)
            gsap.set(slide, { x: offset, position: "absolute", top: 0, left: 0, width: "100%" })
          }
        })

        // Total horizontal distance to travel
        const totalDistance = (totalServices - 1) * (pinnedRef.current.offsetWidth + gap)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinnedRef.current,
            start: "top top",
            end: `+=${totalServices * 120}%`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.5,
            onUpdate: (self) => {
              const index = Math.min(
                Math.floor(self.progress * totalServices),
                totalServices - 1
              )
              if (index !== activeServiceRef.current) {
                activeServiceRef.current = index
                setActiveService(index)
              }
              tabs.forEach((tab, i) => {
                tab.classList.toggle("sp-tab--active", i === index)
              })
            }
          }
        })

        // Smooth continuous slide — all slides move left together
        tl.to(slides, {
          x: `-=${totalDistance}`,
          duration: 1,
          ease: "none",
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [layout, services.length])

  return (
    <section ref={containerRef} className="relative">
      {/* Row Layout - for Services Pages */}
      {layout === "row" && (
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-[2%] py-12 sm:py-16 lg:py-24">
          <h2 className="text-center heading-2 mb-100">
            {heading}
          </h2>
          <div className="mt-12 services-row-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCardRow
                key={index}
                badge={service.badge}
                title={service.title}
                desc={service.desc}
                img={service.img}
                icon={service.icon}
                bg={service.bg}
                href={service.href}
              />
            ))}
          </div>
        </div>
      )}

      {/* Pinned Layout - Scroll-driven (for Home Page) */}
      {layout === "pinned" && (
        <div className="sp-section">
          {/* Top area — scrolls away normally */}
          <div className="mx-auto w-auto md:max-w-[1024px] lg:max-w-[1240px] xl:max-w-[1440px] 2xl:max-w-[1440px] px-4 sm:px-6 md:px-[2%]">
            {/* Background text */}
            <div className="sp-bg-text">
              <span>SERVICES</span>
            </div>

            {/* Main heading */}
            <div className="sp-heading">
              <h2>{pinnedHeading}</h2>
              <p>{pinnedSubheading}</p>
            </div>

            {/* Features row */}
            <div className="sp-features md:pt-[250px] md:pb-[100px]">
              {features.map((f, i) => (
                <div key={i} className="sp-feature">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pinned area — tabs stick to top, slides in center */}
          <div ref={pinnedRef} className="sp-pinned-area relative overflow-visible">
            {/* Leaves pattern behind slides */}
            <div
              className="absolute left-0 w-full h-[72px] pointer-events-none z-0 bg-repeat-x bg-center bg-contain"
              style={{ backgroundImage: 'url("/border_new.png")', bottom: "150px" }}
            />
            <div className="mx-auto w-full md:max-w-[1024px] lg:max-w-[1240px] xl:max-w-[1440px] 2xl:max-w-[1440px] px-4 sm:px-6 md:px-[2%]">
              {/* Tabs */}
              {/*
                Use a responsive flex row that prevents wrapping on medium+ viewports
                so long titles stay on a single line. On small screens allow
                horizontal scroll (overflow-x-auto) so tabs remain accessible.
              */}
              <div className="sp-tabs flex flex-row flex-wrap md:flex-nowrap gap-4 overflow-x-auto md:overflow-visible">
                {services.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`sp-tab ${i === 0 ? "sp-tab--active" : ""} whitespace-nowrap`}
                    title={titleToPlainString(s.title)}
                  >
                    <span className="sp-tab-dot" />
                    {titleToPlainString(s.title)}
                  </button>
                ))}
              </div>

              {/* Slides */}
              <div className="sp-slides">
                {services.map((s, i) => (
                  <div
                    key={i}
                    className="sp-slide"
                    style={{ position: i === 0 ? "relative" : "absolute", top: 0, left: 0, width: "100%" }}
                  >
                    <div className="sp-slide-left">
                      <h3 className="sp-slide-title">{s.title}</h3>
                      <p className="sp-slide-desc">{s.desc}</p>
                      <Cta href={s.href} label="DETAILS HERE" tone="light" btnRadius={ctaBtnRadius} arrowBg={ctaArrowBg} btnBg={ctaBtnBg} rightImage={rightImage} />
                    </div>
                    <div className="sp-slide-right" style={i === 1 ? { maxWidth: "470px" } : undefined}>
                      <Image
                        src={s.img}
                        alt={typeof s.title === "string" ? s.title : ""}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-cover"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
