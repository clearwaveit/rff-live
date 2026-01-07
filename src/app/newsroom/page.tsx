// ...
"use client"

import Image from "next/image"
import Cta from "@/components/Cta"
import { articles, getLatestArticles } from "@/data/news"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function NewsroomPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Hero title entrance
      gsap.from(".newsroom-hero-title", {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Featured card entrance
      gsap.from(".newsroom-feature-card", {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      })

      // Latest cards stagger on scroll
      const cards = gsap.utils.toArray<HTMLElement>(".news-card")
      gsap.set(cards, { y: 16, opacity: 0 })
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".newsroom-latest",
          start: "top 85%",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen" ref={containerRef}>
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image src="/banner-newsroom.png" alt="Newsroom" fill priority className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-[2%] pb-16">
          <h1 className="newsroom-hero-title text-white text-3xl sm:text-5xl font-light tracking-tight">Newsroom</h1>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="p-6 lg:p-8">
              <div className="newsroom-feature-card relative h-72 sm:h-80 md:h-96 rounded-[1.5rem] overflow-hidden ring-1 ring-black/5">
                <Image src={articles[0].image} alt={articles[0].title} fill className="object-cover" />
                <div className="absolute left-6 bottom-6">
                  <svg width="100" height="60" viewBox="0 0 100 60">
                    <g fill="#BFDFD7" opacity="0.95">
                      <path d="M0 30c0-17 14-17 17-17s17 0 17 17-14 17-17 17-17 0-17-17z" />
                      <path d="M40 30c0-17 14-17 17-17s17 0 17 17-14 17-17 17-17 0-17-17z" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-2 sm:px-4">
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 backdrop-blur px-3 py-1 text-xs font-semibold text-gray-700">
                  <span className="inline-block h-2 w-2 rounded-sm bg-green-500" />
                  {articles[0].category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-teal-900">{articles[0].title}</h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-[#013138]">{articles[0].excerpt}</p>
              <div className="mt-6">
                <Cta href={`/newsroom/${articles[0].slug}`} label="READ ARTICLE" tone="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative newsroom-latest">
        <div className="mx-auto max-w-[1600px] px-[2%] pb-16">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-semibold text-teal-800">Latest News</h3>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {getLatestArticles().map((n) => (
              <article key={n.slug} className="news-card rounded-[1.5rem] bg-white ring-1 ring-black/5 shadow-sm p-6">
                <div className="mb-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 backdrop-blur px-3 py-1 text-xs font-semibold text-gray-700">
                    <span className="inline-block h-2 w-2 rounded-sm bg-green-500" />
                    {n.category} · {n.date}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-[#0D0D0D]">{n.title}</h4>
                <div className="mt-4">
                  <Cta href={`/newsroom/${n.slug}`} label="READ MORE" tone="light" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
