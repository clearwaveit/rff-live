"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function MaterialsList() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".material-row")
      gsap.set(rows, { y: 20, opacity: 0 })
      gsap.to(rows, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%"
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const items = [
    {
      code: "HDPE",
      name: "High-Density Polyethylene",
      desc: "Commonly used in milk bottles, detergent containers, and rigid packaging for strong, durable applications.",
      tint: "#9ED5BF"
    },
    {
      code: "LDPE",
      name: "Low-Density Polyethylene",
      desc: "Typically found in films, carrier bags, and flexible packaging where moisture resistance is essential.",
      tint: "#CFE9C6"
    },
    {
      code: "PP",
      name: "Polypropylene",
      desc: "Widely used in caps, closures, automotive components, and reusable containers due to its heat resistance.",
      tint: "#DDE9C2"
    },
    {
      code: "PET",
      name: "Polyethylene Terephthalate",
      desc: "Often used for drinks bottles and food packaging, valued for clarity, strength, and lightweight performance.",
      tint: "#CBE3D0"
    },
    {
      code: "PS",
      name: "Polystyrene",
      desc: "Common in protective packaging and food-service items, lightweight and suited to rigid moulded formats.",
      tint: "#D9E2C2"
    },
    {
      code: "HIPS",
      name: "High Impact Polystyrene",
      desc: "A tougher form of polystyrene used in fridge liners, food packaging, and consumer product housings.",
      tint: "#CBE9DB"
    },
    {
      code: "PVC",
      name: "Polyvinyl Chloride",
      desc: "Used in construction and industrial products such as pipes, profiles, and cable insulation for durability.",
      tint: "#CBE3D0"
    },
    {
      code: "ABS",
      name: "Acrylonitrile Butadiene Styrene",
      desc: "Found in appliances, electronics, and automotive parts where impact strength and stability are required.",
      tint: "#D9E2C2"
    }
  ]

  const handleTabClick = (i: number) => {
    setActiveTab(i)
    setActiveIndex(activeIndex === i ? null : i)
  }

  return (
    <section className="relative">
      <div ref={ref} className="mx-auto max-w-6xl px-[2%] py-16 lg:py-24">
        <h2 className="text-3xl sm:text-4xl font-light text-[#00333E] font-rubik">
          <span className="italic font-normal text-[#579C9C]">Materials We Recycle</span> <br className="hidden sm:block" />
          and Return to Life
        </h2>
        <p className="mt-4 max-w-2xl text-[#696969] text-lg font-light">
          We support a wide spectrum of commercial plastics, ensuring secure handling and responsible reprocessing.
        </p>

        {/* Tabs - scroll on mobile, equal width from md up */}
        <div className="mt-10 border-b-2 border-teal-200 overflow-x-auto">
          <div className="flex min-w-0 gap-2 md:flex-wrap md:min-w-full">
            {items.map((it, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(i)}
                className={`material-row flex-shrink-0 md:flex-1 md:min-w-0 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors rounded-t-lg whitespace-nowrap ${
                  activeTab === i
                    ? "bg-[#222F30] text-white -mb-0.5 border border-teal-200 border-b-2 border-b-white"
                    : "bg-gray-100 text-[#00333E] hover:bg-gray-200"
                }`}
              >
                {it.code}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion list - responsive padding and typography */}
        <div className="border border-teal-200 border-t-0 rounded-b-[1rem] overflow-hidden bg-white shadow-sm">
          <ul>
            {items.map((it, i) => {
              const isActive = activeIndex === i
              return (
                <li key={i} className="material-row">
                  <button
                    onClick={() => {
                      setActiveTab(i)
                      setActiveIndex(isActive ? null : i)
                    }}
                    className={`w-full text-left px-4 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5 border-t border-teal-200 first:border-t-0 transition-all duration-300
                      ${isActive ? "bg-[#222F30] text-white" : "hover:bg-gray-50 text-[#00333E]"}
                    `}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <span className={`inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-sm flex-shrink-0 ${isActive ? "bg-green-400" : "bg-[#00333E]"}`} />
                        <span className="font-bold uppercase tracking-wide min-w-[3rem] sm:w-16 text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px]">{it.code}</span>
                      </div>
                      <span className={`text-[11px] sm:text-[12px] md:text-[18px] leading-tight sm:leading-normal ${isActive ? "text-gray-300" : "text-[#5D7E83]"}`}>
                        ({it.name})
                      </span>
                    </div>

                    <div className={`grid transition-all duration-300 ${isActive ? "grid-rows-[1fr] mt-2 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        {it.desc ? (
                          <p className="text-xs sm:text-sm leading-relaxed text-gray-300 pl-4 sm:pl-6 md:pl-7 pt-0.5 break-words">
                            {it.desc}
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm leading-relaxed text-gray-300 pl-4 sm:pl-6 md:pl-7 pt-0.5 break-words">
                            Widely used in various industrial and consumer applications.
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
