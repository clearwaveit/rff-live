"use client"

import Link from "next/link"
import Image from "next/image"
import Cta from "@/components/Cta"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

function ServiceCard({
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
      className={`block rounded-[1rem] service-list ring-1 ring-black/5 shadow-[0px_0px_34.6px_0px_rgba(200,200,200,0.25)] overflow-hidden crd_block bg-white hover:shadow-lg transition-shadow duration-300`}
    >
      <div className="service-wrap">
        <div className="service-content">
          <div className="mb-4">
            <span className="badge-wrap">
              {badge}
            </span>
          </div>
          <h3 className="heading-service mt-6">{title}</h3>
          <p className="mt-5 max-w-xl leading-relaxed text-[#696969]">{desc}</p>
          <div className="mt-6">
            <Cta href={href} label="LEARN MORE" tone="light" as="div" />
          </div>
        </div>
        <div className="service-image-box" style={{ backgroundImage: `url("${img}")` }}>
          <div className="icon-box" style={{ backgroundImage: `url("${icon}")` }}></div>
        </div>
      </div>
    </Link>
  )
}

export default function ServicesHighlight({
  heading = (
    <>
      Recycling <span className="accent">services suited</span> <br />
      <span className="accent">for every</span> industry across the UK
    </>
  ),
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
      title: "Pellets and Compounds",
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

      const w = document.documentElement.clientWidth || window.innerWidth

      if (w >= 480) {
        const pinnedGallery = document.querySelector(".pinned_gallery")

        if (pinnedGallery) {
          const pinnedImages = pinnedGallery.querySelectorAll(".pinned_image")

          pinnedImages.forEach((pImage, i, arr) => {
            if (i < arr.length - 1) {
              const durationMultiplier = arr.length - i - 1
              ScrollTrigger.create({
                trigger: pImage as HTMLElement,
                start: function () {
                  const cardBlock = (pImage as HTMLElement).querySelector(".crd_block") as HTMLElement
                  if (cardBlock) {
                    const centerPin =
                      (window.innerHeight - cardBlock.offsetHeight) / 2
                    return "top +=" + centerPin
                  }
                  return "top top"
                },
                end: function () {
                  const durationHeight = (pImage as HTMLElement).offsetHeight * durationMultiplier
                  return "+=" + durationHeight
                },
                pin: true,
                pinSpacing: false,
                scrub: true,
                animation: gsap.to((pImage as HTMLElement).querySelector(".crd_block"), {
                  scale: 0.6,
                  opacity: 0,
                  zIndex: 0,
                  duration: 1,
                  // delay: 0.1
                }),
              })
            }
          })
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative">
      <div className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
        <h2 className="text-center heading-2 mb-100">
          {heading}
        </h2>
        <div className="mt-12 pinned_gallery">
          {services.map((service, index) => (
            <div key={index} className={`pinned_image ${index === services.length - 1 ? 'z_100 last-pin-block' : ''}`}>
              <ServiceCard
                badge={service.badge}
                title={service.title}
                desc={service.desc}
                img={service.img}
                icon={service.icon}
                bg={service.bg}
                href={service.href}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
