"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type AccordionItem = {
  code: string
  title: string
  subtitle: string
  performance: string[]
}

type TabData = {
  code: string
  title: string
  description: string[]
  carbonPerformance: { heading: string; text: string }
  technicalSpecsTitle: string
  accordionItems: AccordionItem[]
}

const TABS_DATA: TabData[] = [
  {
    code: "PP",
    title: "PP (Recycled Polypropylene)",
    description: [
      "Polypropylene (PP) is a durable, high-performance thermoplastic widely used across multiple industries due to its strength, versatility, and processing efficiency.",
      "Our recycled PP pellets provide a cost-effective alternative to virgin polymers while maintaining comparable mechanical and processing properties. Designed for manufacturers requiring consistency and reliability, our grades support both general-purpose and specialist applications.",
      "Through advanced polyolefin purification technology, we clean and separate polypropylene waste streams sourced from automotive and electronic feedstock. The material is then precision-compounded into high-quality recycled pellets tailored to your performance requirements.",
      "We also develop custom PP grades, engineered to meet specific melt flow, mechanical, and application-based specifications."
    ],
    carbonPerformance: {
      heading: "Carbon Performance",
      text: "Independent Life Cycle Assessment (LCA), benchmarked against PlasticsEurope ECO-Profiles for virgin polymers, confirms that our recycled PP grades deliver up to 80% lower carbon footprint compared to virgin polypropylene."
    },
    technicalSpecsTitle: "Technical Specifications - PP",
    accordionItems: [
      {
        code: "PP-HM-2540",
        title: "PP-HM-2540",
        subtitle: "Post-consumer recycled PP copolymer with high flow characteristics, ideal for injection moulding.",
        performance: ["Fast cycle times", "MFI: 25–40", "Recycled content: 95%", "Colours: Black, Light Grey"]
      },
      {
        code: "PP-MM-1015",
        title: "PP-MM-1015",
        subtitle: "Post-consumer recycled PP copolymer with enhanced flow properties for general injection moulding.",
        performance: ["MFI: 10-15", "Carbon savings: up to 80%", "Colours: Black, Light Grey"]
      },
      {
        code: "PP-LM-0408",
        title: "PP-LM-0408",
        subtitle: "Post-consumer recycled PP copolymer with controlled flow properties for general moulding applications.",
        performance: ["MFI: 4-8", "Carbon savings: up to 80%", "Colours: Black, Grey"]
      },
      {
        code: "PP-BG-0408",
        title: "PP-BG-0408",
        subtitle: "Post-consumer recycled PP copolymer suitable for general and budget-grade injection moulding.",
        performance: ["MFI: 4-8", "PE Content: ±30%", "Carbon savings: up to 80%",  "Colours: Natural, White"]
      } 
    ]
  },
  {
    code: "FPP",
    title: "FPP - Mineral & Glass Filled Polypropylene",
    description: [
      "Our standard 20% mineral-filled polypropylene (FPP) grade combines industry-leading stiffness with balanced tensile and impact strength.",
      "We also manufacture 20% and 30% glass-filled PP grades, delivering enhanced rigidity for structural applications.",
      "Recycle For Future offers the technical capability to develop bespoke recycled FPP grades, tailored to specific melt flow, filler content, and impact performance requirements."

    ],
    carbonPerformance: {
      heading: "Carbon Performance",
      text: "Independent LCA benchmarking confirms our FPP grades achieve up to 80% lower carbon footprint compared to virgin equivalents."
    },
    technicalSpecsTitle: "Technical Specifications - FPP",
    accordionItems: [
      {
        code: "PP-MF-20 (20% Mineral Filled)",
        title: "PP-MF-20 (20% Mineral Filled)",
        subtitle: "Post-consumer recycled 20% mineral-filled PP for high rigidity injection moulding applications.",
        performance: ["Colour: Standard Black (Ref 90/04)", "Deep Black (Ref 90/05)"]
      },
      {
        code: "PP-MF-15 (15% Mineral Filled)",
        title: "PP-MF-15 (15% Mineral Filled)",
        subtitle: "Post-consumer recycled 15% mineral-filled PP copolymer with balanced stiffness and impact strength. Particularly suited for automotive and general injection moulding.",
        performance: ["Colour: Standard Black (Ref 90/04)", "Deep Black (Ref 90/05)"]
      }
    ]
  },
  {
    code: "HDPE-INJ",
    title: "HDPE-INJ – High Density Polyethylene (Injection Grade)",
    description: [
      "Post-consumer recycled fractional melt HDPE suitable for injection moulding.",
      "Our HDPE feedstock is primarily derived from Automotive Shredder Residue (ASR) fuel system components. Due to source characteristics, certain application limitations may apply. Please contact our technical team for suitability guidance."
    ],
    carbonPerformance: {
      heading: "",
      text: ""
    },
    technicalSpecsTitle: "Technical Specifications - HDPE-INJ",
    accordionItems: [
      {
        code: "HDPE-INJ-08",
        title: "HDPE-INJ-08",
        subtitle: "High flow HDPE for thin-walled and fast-cycle injection moulding.",
        performance: ["MFI: 8-12", "Colours: Black, Grey"]
      }
    ]
  },
  {
    code: "HDPE-BM",
    title: "HDPE-BM – High Density Polyethylene (Blow Moulding Grade)",
    description: [
      "Post-consumer recycled fractional melt HDPE suitable for blow moulding applications. Please contact our team for application suitability."
    ],
    carbonPerformance: {
      heading: "",
      text: ""
    },
    technicalSpecsTitle: "Technical Specifications - HDPE-BM",
    accordionItems: [
      {
        code: "HDPE-BM-04",
        title: "HDPE-BM-04",
        subtitle: "",
        performance: ["MFI: 0.4–1", "Colours: Black, Grey, Blue"]
      }
    ]
  },
  {
    code: "LDPE",
    title: "LDPE – Natural",
    description: [
      "Post-consumer recycled fractional melt LDPE suitable for general processing applications.",
      "Material characteristics may vary depending on feedstock origin. Please contact our team for application suitability."
    ],
    carbonPerformance: {
      heading: "",
      text: ""
    },
    technicalSpecsTitle: "Technical Specifications - LDPE",
    accordionItems: [
      {
        code: "LDPE",
        title: "LDPE",
        subtitle: "",
        performance: ["MFI: 4–8", "Colours: Natural, Honey"]
      }
    ]
  },
  {
    code: "LDPE",
    title: "LDPE – Jazz",
    description: [
      "Post-consumer recycled fractional melt LDPE suitable for general processing applications."
    ],
    carbonPerformance: {
      heading: "",
      text: ""
    },
    technicalSpecsTitle: "Technical Specifications - LDPE",
    accordionItems: [
      {
        code: "LDPE",
        title: "LDPE",
        subtitle: "",
        performance: ["MFI: 4–1", "Colours: Black, Self-Colour, Grey"]
      }
    ]
  },
  {
    code: "HIPS",
    title: "HIPS – High Impact Polystyrene",
    description: [
      "Our recycled High Impact Polystyrene (HIPS) is manufactured from post-consumer waste streams and provides a commercially viable alternative to virgin polystyrene.",
      "We supply a range of recycled HIPS grades and can develop custom specifications tailored to meet specific processing and performance requirements.",

    ],
    carbonPerformance: {
      heading: "Carbon Performance",
      text: "Independent LCA analysis confirms our recycled PS grades deliver up to 75% lower carbon footprint compared to virgin equivalents."
    },
    technicalSpecsTitle: "Technical Specifications - HIPS",
    accordionItems: [
      {
        code: "HIPS 3122",
        title: "HIPS 3122",
        subtitle: "Post-consumer recycled impact-modified polystyrene for general injection moulding applications.",
        performance: ["Colour: Standard Black"]
      }
    ]
  },
]

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  )
}

export default function MaterialsList() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0)

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

  const currentTab = TABS_DATA[activeTab]
  const accordionItems = currentTab?.accordionItems ?? []

  const handleTabClick = (i: number) => {
    setActiveTab(i)
    setOpenAccordionIndex(0)
  }

  const handleAccordionClick = (index: number) => {
    setOpenAccordionIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="relative bg-[#ffffff]">
      <div ref={ref} className="mx-auto max-w-7xl px-[2%] pt-16 lg:pt-24">
        <div className="py-16">

        <h2 className="text-center text-3xl sm:text-[60px] font-light text-[#00333E] font-rubik">
          <span className="font-light">Our Recycled Polymer Grades</span>
        </h2>
        <p className="text-center mt-4 mb-10 max-w-5xl mx-auto text-[#696969] text-lg font-light">
          Recycle For Future supplies high-performance recycled polymers engineered for demanding industrial applications. Our materials deliver commercial efficiency, technical reliability, and measurable carbon reduction — without compromising processing performance.

        </p>
        </div>

        {/* Tabs - below 1024: horizontal scroll, no wrap; 1024+: centered wrap */}
        <div className="flex justify-center max-lg:overflow-x-auto max-lg:overflow-y-hidden max-lg:justify-start">
          <div className="flex min-w-0 gap-4 flex-wrap lg:flex-wrap max-lg:flex-nowrap max-lg:w-max">
            {TABS_DATA.map((tab, i) => (
              <button
                key={tab.code}
                onClick={() => handleTabClick(i)}
                className={`material-row flex-shrink-0 min-w-[126px] max-h-[52px] w-auto px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-[18px] font-normal uppercase tracking-wide transition-colors rounded-t-[8px] whitespace-nowrap ${activeTab === i
                    ? "bg-[#518383] text-white -mb-0.5 z-10 max-h-none"
                    : "bg-[#F6F4EE] text-[#00333E] hover:bg-[#E8EDE4]"
                  }`}
              >
                {tab.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content + Accordion - full width, light bg */}
      <div className="w-full bg-[#F6F4EE] -mt-px pt-8 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-[2%]">
          {/* Main content for active tab */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#518383] mb-4">{currentTab.title}</h3>
          <div className="material-row bg-[#ffffff] p-12 mb-10 text-[#00333E] rounded-[8px]">
            <div className="space-y-4 text-[#4a4a4a] font-normal leading-relaxed max-w-6xl">
              {currentTab.description.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-xl sm:text-2xl font-normal text-[#3B6060] mb-2">{currentTab.carbonPerformance.heading}</h4>
              <p className="text-[#4a4a4a] leading-relaxed max-w-6xl">{currentTab.carbonPerformance.text}</p>
            </div>

          </div>
          <h4 className="text-xl sm:text-2xl font-normal text-[#3B6060] mt-10 mb-4">{currentTab.technicalSpecsTitle}</h4>

          {/* Accordion list - screenshot style */}
          <ul className="border border-[#E0E5E2] rounded-[8px] overflow-hidden">
            {accordionItems.map((item, i) => {
              const isOpen = openAccordionIndex === i
              const isFirst = i === 0
              const isLast = i === accordionItems.length - 1
              return (
                <li key={item.code} className={`material-row overflow-hidden ${isOpen ? (isFirst ? "rounded-t rounded-[8px] rounded-b-none" : isLast ? "rounded-[8px] rounded-t-none" : "") : ""}`}>
                  <div className={`${isOpen ? "bg-[#3B6060]" : ""}`}>
                    <button
                      onClick={() => handleAccordionClick(i)}
                      className={`w-full text-left px-5 py-4 sm:px-6 sm:py-6 transition-all duration-300 flex items-center justify-between gap-4 ${isOpen
                          ? `bg-[#3B6060] text-white`
                          : `bg-white text-[#00333E] hover:bg-[#F0F4F2] ${!isLast ? "border-b border-[#E0E5E2]" : ""}`
                        }`}
                    >
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-normal text-lg sm:text-xl">{item.title}</span>
                        {isOpen && (
                          <span className="text-sm font-normal text-white/90">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                      <span className="flex-shrink-0">
                        {isOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-[#00333E]" />}
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className={`overflow-hidden ${isOpen ? "pb-6 px-6" : ""}`}>
                        <div className={`${isOpen ? "bg-[#FFFFFF17] rounded-[8px]" : ""} text-white px-5 py-4 sm:px-6 sm:py-5`}>
                          <p className="font-normal text-[#ffffff] text-sm sm:text-base text mb-2">Performance:</p>
                          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 list-disc list-inside text-sm sm:text-base font-light text-white/95">
                            {item.performance.map((point, j) => (
                              <li key={j}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
