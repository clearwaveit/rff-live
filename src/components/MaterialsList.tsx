"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function MaterialsList() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

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

  return (
    <section className="relative">
      <div ref={ref} className="mx-auto max-w-[1600px] px-[2%] py-16 lg:py-24">
        <h2 className="text-3xl sm:text-4xl font-light text-[#00333E] font-rubik">
          <span className="italic font-normal text-[#579C9C]">Materials We Recycle</span> <br className="hidden sm:block"/>
          and Return to Life
        </h2>
        <p className="mt-4 max-w-2xl text-[#696969] text-lg font-light">
          We support a wide spectrum of commercial plastics, ensuring secure handling and responsible reprocessing.
        </p>

        <div className="mt-10 border border-teal-200 rounded-[1rem] overflow-hidden bg-white shadow-sm">
          <ul>
            {items.map((it, i) => {
              const isActive = activeIndex === i
              return (
                <li key={i} className="material-row">
                  <button 
                    onClick={() => setActiveIndex(isActive ? null : i)}
                    className={`w-full text-left px-6 py-5 border-t border-teal-200 first:border-t-0 transition-all duration-300
                      ${isActive ? "bg-[#222F30] text-white" : "hover:bg-gray-50 text-[#00333E]"}
                    `}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-4">
                        <span className={`inline-block h-2 w-2 rounded-sm ${isActive ? "bg-green-400" : "bg-[#00333E]"}`} />
                        <span className="font-bold uppercase tracking-wide w-16">{it.code}</span>
                      </div>
                      <span className={`text-sm sm:text-base ${isActive ? "text-gray-300" : "text-[#5D7E83]"}`}>
                        ({it.name})
                      </span>
                    </div>
                    
                    <div className={`grid transition-all duration-300 ${isActive ? "grid-rows-[1fr] mt-2 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        {it.desc ? (
                          <p className="text-sm leading-relaxed text-gray-300 pl-7 sm:pl-[5.5rem]">
                            {it.desc}
                          </p>
                        ) : (
                          <p className="text-sm leading-relaxed text-gray-300 pl-7 sm:pl-[5.5rem]">
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
