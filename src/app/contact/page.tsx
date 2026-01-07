"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" })
  const containerRef = useRef<HTMLDivElement | null>(null)

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    window.alert("Thank you! We will get back to you shortly.")
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(".contact-hero-title", { y: 24, opacity: 0, duration: 1, ease: "power3.out" })
      gsap.from(".contact-hero-sub", { y: 16, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 })

      const fields = gsap.utils.toArray<HTMLElement>(".contact-field")
      gsap.set(fields, { y: 12, opacity: 0 })
      gsap.to(fields, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
      })

      gsap.from(".contact-info", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-info", start: "top 85%" },
      })

      gsap.from(".contact-map", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-map", start: "top 85%" },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen" ref={containerRef}>
      <section className="relative min-h-[40vh] overflow-hidden">
        <Image src="/hero-bg.svg" alt="Contact" fill priority className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-[2%] pb-16">
          <h1 className="contact-hero-title text-white text-3xl sm:text-5xl font-light tracking-tight">Contact Us</h1>
          <p className="contact-hero-sub mt-4 max-w-2xl text-teal-50 text-sm sm:text-base">We greatly appreciate your interest and will get back to you quickly when you contact us.</p>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <form onSubmit={submit} className="contact-form space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Last Name" className="contact-field rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none" />
                <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="First Name" className="contact-field rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none" />
              </div>
              <input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" placeholder="Email" className="contact-field w-full rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none" />
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone Number" className="contact-field w-full rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none" />
              <textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Message" rows={5} className="contact-field w-full rounded-xl bg-white ring-1 ring-black/10 px-4 py-3 outline-none" />
              <div className="flex items-center gap-3">
                <button type="submit" className="contact-field rounded-xl bg-gray-900 text-white px-6 py-3 text-sm font-medium">SUBMIT</button>
                <a href="mailto:info@recycleforfuture.com" aria-label="Email" className="contact-field inline-flex items-center justify-center h-10 w-10 rounded-lg bg-[#A7E26E] text-[#0D0D0D]">→</a>
              </div>
            </form>

            <div className="contact-info rounded-[2rem] bg-teal-900 text-teal-50 p-8 lg:p-10">
              <ul className="space-y-4 text-sm">
                <li className="font-medium">Address</li>
                <li>Recycle For Future Ltd.</li>
                <li>Jhumat House</li>
                <li>160 London Road</li>
                <li>Barking</li>
                <li>Essex</li>
                <li>IG11 8BB</li>
                <li className="mt-6 font-medium">Phone</li>
                <li>020 8214 1353</li>
                <li className="mt-6 font-medium">Email</li>
                <li>
                  <a href="mailto:info@recycleforfuture.com" className="underline">info@recycleforfuture.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] pb-16">
          <div className="contact-map rounded-[2rem] overflow-hidden ring-1 ring-black/5">
            <iframe title="Map" src="https://www.openstreetmap.org/export/embed.html?bbox=-0.096%2C51.526%2C0.129%2C51.620&layer=mapnik" className="w-full h-[420px]"></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}

