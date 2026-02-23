"use client"

import Link from "next/link"
import Image from "next/image"
import Cta from "@/components/Cta"
import { useEffect, useRef, useState } from "react"
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
  title: string
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
        <div className="service-card-image relative h-[588.58px] overflow-hidden">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover"
          />
          {/* Icon Overlay - centered */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cover bg-center bg-no-repeat opacity-60"
            style={{ backgroundImage: `url("${icon}")` }}
          ></div>
          {/* Badge positioned at bottom-left of image */}
          <div className="absolute bottom-4 left-10">
            <span className="badge-wrap text-[#024D5D]">
              {badge}
            </span>
          </div>
        </div>
        {/* Content Section */}
        <div className="service-card-content px-10 pb-20 pt-5 flex flex-col flex-grow">
          <h3 className="text-[28px] lg:text-[32px] font-semibold text-gray-900 leading-tight">{title}</h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#696969] flex-grow">{desc}</p>
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
      <span className="leading-tight text-[30px] sm:text-[40px] md:text-[60px] font-light">Recycling services suited <br /> for every industry across the UK</span>
    </>
  ),
  layout = "row",
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
  services?: {
    badge: string
    title: string
    desc: string
    img: string
    icon: string
    bg: string
    href: string
  }[]
}) {
  const containerRef = useRef<HTMLElement | null>(null)
  const pinnedRef = useRef<HTMLDivElement | null>(null)
  const [activeService, setActiveService] = useState(0)
  const activeServiceRef = useRef(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
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

      if (layout === "row") {
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
        ScrollTrigger.create({
          trigger: pinnedRef.current,
          start: "center center",
          end: `+=${totalServices * 100}%`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * totalServices),
              totalServices - 1
            )
            if (index !== activeServiceRef.current) {
              activeServiceRef.current = index
              setActiveService(index)
            }
          }
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [layout, services.length])

  const active = services[activeService]

  return (
    <section ref={containerRef} className="relative">
      <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
        <h2 className="text-center heading-2 mb-100">
          {heading}
        </h2>

        {/* Row Layout - for Services Pages */}
        {layout === "row" && (
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
        )}

        {/* Pinned Layout - Two Column Interactive (for Home Page) */}
        {layout === "pinned" && (
          <div ref={pinnedRef} className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 pointer-events-none">
            {/* Left - Service Names */}
            <div className={`${active.bg} flex flex-col items-center px-8 py-10 lg:px-10 lg:py-12 rounded-[23px]`}>
              <div className="self-center mb-8">
                <span className="badge-wrap badge-wrap--services">
                  <span className="badge-wrap__dot" aria-hidden />
                  {active.badge}
                </span>
              </div>
              <div className="flex flex-col items-center gap-3 my-auto">
                {services.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveService(index)}
                    className={`pointer-events-auto text-left text-xl lg:text-2xl transition-all duration-300 ${
                      activeService === index
                        ? "font-normal text-[#00333E]"
                        : "font-normal text-[#00333E]/40 hover:text-[#00333E]/60"
                    }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Image with Content Overlay */}
            <div className="relative rounded-[23px] overflow-hidden h-full min-h-[600px]">
              <Image
                src={active.img}
                alt={active.title}
                fill
                className="object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50" />
              {/* Icon Overlay */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cover bg-center bg-no-repeat opacity-40"
                style={{ backgroundImage: `url("${active.icon}")` }}
              />
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <h3 className="text-2xl lg:text-3xl font-normal text-white mb-3">{active.title}</h3>
                <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-xl">{active.desc}</p>
                <div className="mt-5 service-pinned-cta pointer-events-auto">
                  <Cta href={active.href} label="LEARN MORE" tone="light" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </section>
  )
}
