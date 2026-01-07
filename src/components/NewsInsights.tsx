"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function NewsInsights() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".news-card")
      gsap.set(cards, { y: 24, opacity: 0 })
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const items = [
    {
      badge: "PUBLICATIONS",
      date: "AUGUST 14, 2025",
      text: "An engaging deep learning approach to formulate novel antibiotics from the foundation.",
      slug: "novel-antibiotics-design-with-deep-learning",
      bg: "bg-[#E0EFEF]",
      bgf: "#E0EFEF"
    },
    {
      badge: "PUBLICATIONS",
      date: "AUGUST 14, 2025",
      text: "An engaging deep learning approach to formulate novel antibiotics from the foundation.",
      slug: "novel-antibiotics-design-with-deep-learning",
      bg: "bg-[#E0EFEF]",
      bgf: "#E0EFEF"
    },
    {
      badge: "PUBLICATIONS",
      date: "AUGUST 14, 2025",
      text: "Conversation with Nobel Laureate David MacMillan.",
      slug: "conversation-with-nobel-laureate-david-macmillan",
      bg: "bg-[#E0EFEF]",
      bgf: "#E0EFEF"
    },
    {
      badge: "PUBLICATIONS",
      date: "AUGUST 14, 2025",
      text: "Conversation with Nobel Laureate David MacMillan.",
      slug: "conversation-with-nobel-laureate-david-macmillan",
      bg: "bg-[#E0EFEF]",
      bgf: "#E0EFEF"
    }
  ]

  return (
    <section className="relative">
      <div ref={sectionRef} className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
        <div className="heading-btn-block">
          <h3>News & <span className="accent">Insights</span></h3>
          <a href="#" className="stylish-btn">
              <span className="style-main">View All</span>
              <span className="style-arrow">
                <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.2793 12.1669H2.05864" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.1797 3.06934L22.279 12.1686L13.1797 21.2679" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <div key={i} className={`news-card relative ${it.bg}`} style={{ backgroundColor: it.bgf }}> 
              <div className="flex items-start justify-between">
                <span className="badge-wrap badge-wrap-2">
                  {it.badge}
                </span>
              </div>
              <p className="text-[1.05rem] leading-relaxed text-teal-900">{it.text}</p>
              <span className="date-txt">{it.date}</span>
              <div className="layer-fix" style={{ backgroundColor: it.bgf }}></div>
              <div className="layer-fix-1" style={{ backgroundColor: it.bgf }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
