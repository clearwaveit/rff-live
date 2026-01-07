"use client"

import Cta from "@/components/Cta"

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="text-[15vw] font-bold leading-none text-[#00272F] whitespace-nowrap">
          WHY US?
        </span>
      </div>

      <div className="relative mx-auto max-w-4xl px-[5%] text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-[#00333E]">
          At Recycle for Future Ltd, we help businesses{" "}
          <span className="text-[#9ED5BF]">embrace sustainability and support a circular economy.</span>{" "}
          <span className="text-[#9ED5BF]">Our quality services make us the ideal partner for your plastic recycling needs.</span>
        </h2>
        <div className="mt-12 flex justify-center">
          <Cta href="/contact" label="CONTACT US" tone="dark" />
        </div>
      </div>
    </section>
  )
}
