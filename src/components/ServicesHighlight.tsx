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

export default function ServicesHighlight() {
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
          Recycling <span className="accent">Services suited</span> <br />
          <span className="accent">for every</span> industry across UK
        </h2>
        <div className="mt-12 pinned_gallery">
          <div className="pinned_image">
            <ServiceCard
              badge="OUR SERVICES"
              title="Plastic Recycling"
              desc="We specialise in processing post-industrial and post-consumer plastic waste, including HDPE, LDPE, HIPS, PS and ABS. Our state-of-the-art facility ensures precision at every stage, from sorting and cleaning to shredding and extrusion."
              img="/service-1.png"
              icon="/green-leaf.png"
              bg="bg-[#EAF8D5]"
              href="/services/plastic-recycling"
            />
          </div>
          <div className="pinned_image">
            <ServiceCard
              badge="OUR SERVICES"
              title="Pellet and Compounds"
              desc="We offer recycled pellets in various grades, colours, and melt flows to meet your production needs. Our custom compounding services allow us to tailor properties with additives, colourants, and stabilisers to your exact specifications."
              img="/service-2.png"
              icon="/leaf-2.png"
              bg="bg-[#EAF8D5]"
              href="/services/pellet-and-compounds"
            />
          </div>
          <div className="pinned_image z_100 last-pin-block">
            <ServiceCard
              badge="OUR SERVICES"
              title="Toll Processing"
              desc="For businesses lacking in-house capacity, we provide flexible toll processing services including granulating, regrinding, and compounding. Whether a one-off project or ongoing partnership, we adapt quickly to your requirements."
              img="/service-3.png"
              icon="/leaf-3.png"
              bg="bg-[#EAF8D5]"
              href="/services/toll-processing"
            />
          </div>
        </div>
      </div>

    </section>
  )
}
