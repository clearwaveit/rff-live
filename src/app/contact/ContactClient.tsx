"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" })
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        setStatus('success')
        setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" })
        window.alert("Thank you! Your message has been sent successfully.")
      } else {
        setStatus('error')
        window.alert("Failed to send message. Please try again later.")
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
      window.alert("An error occurred. Please try again.")
    } finally {
      setStatus('idle')
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(".contact-title-anim", { y: 24, opacity: 0, duration: 1, ease: "power3.out" })
      
      const fields = gsap.utils.toArray<HTMLElement>(".contact-field-anim")
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
    <main className="min-h-screen pt-32" ref={containerRef}>
      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="w-full max-w-xl">
              <div className="contact-title-anim mb-12">
                <h1 className="text-[#00272F] text-[60px] md:text-[80px] font-light leading-none mb-6">Contact Us</h1>
                <p className="text-[#696969] text-[18px] md:text-[20px] font-light leading-relaxed max-w-lg">
                  We greatly appreciate your interest and will get back to you quickly when you contact us.
                </p>
              </div>

              <form onSubmit={submit} className="contact-form space-y-6">
                <div className="contact-field-anim">
                  <input 
                    value={form.firstName} 
                    onChange={(e) => update("firstName", e.target.value)} 
                    placeholder="Full Name" 
                    className="w-full rounded-[14px] bg-[#F5F5F5] border border-transparent focus:border-[#D4F2A1] px-6 py-4 outline-none text-[#00272F] placeholder:text-[#696969] transition-all" 
                  />
                </div>
                
                <div className="contact-field-anim">
                  <input 
                    value={form.email} 
                    onChange={(e) => update("email", e.target.value)} 
                    type="email" 
                    placeholder="Email" 
                    className="w-full rounded-[14px] bg-[#F5F5F5] border border-transparent focus:border-[#D4F2A1] px-6 py-4 outline-none text-[#00272F] placeholder:text-[#696969] transition-all" 
                  />
                </div>

                <div className="contact-field-anim">
                  <input 
                    value={form.phone} 
                    onChange={(e) => update("phone", e.target.value)} 
                    placeholder="Phone Number" 
                    className="w-full rounded-[14px] bg-[#F5F5F5] border border-transparent focus:border-[#D4F2A1] px-6 py-4 outline-none text-[#00272F] placeholder:text-[#696969] transition-all" 
                  />
                </div>

                <div className="contact-field-anim">
                  <textarea 
                    value={form.message} 
                    onChange={(e) => update("message", e.target.value)} 
                    placeholder="Message" 
                    rows={6} 
                    className="w-full rounded-[14px] bg-[#F5F5F5] border border-transparent focus:border-[#D4F2A1] px-6 py-4 outline-none text-[#00272F] placeholder:text-[#696969] transition-all resize-none" 
                  />
                </div>

                <div className="contact-field-anim flex justify-end items-center gap-4 mt-8">
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="stylish-btn group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="style-main bg-[#274646] text-white group-hover:bg-[#1a3030] transition-colors">
                      {status === 'loading' ? 'Sending...' : 'Submit'}
                    </span>
                    <span className="style-arrow bg-[#D4F2A1] flex items-center justify-center w-[50px] h-[50px] rounded-full transition-all group-hover:bg-[#274646]">
                      <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-white">
                        <path d="M22.2793 12.1669H2.05864" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors"/>
                        <path d="M13.1797 3.06934L22.279 12.1686L13.1797 21.2679" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>

            <div className="contact-info relative rounded-[2rem] bg-[#3B6060] text-white p-10 lg:p-16 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url(/images/img-dots.png)', backgroundSize: '20px' }}></div>
              
              {/* Decorative Circle (Simulated with SVG) */}
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
                  <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className="relative z-10 space-y-12">
                {/* Address */}
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#D4F2A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#D4F2A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#D4F2A1] text-lg font-light uppercase tracking-wide mb-4">Address</h3>
                    <address className="not-italic text-white/90 text-[16px] md:text-[18px] leading-8 font-light">
                      Recycle For Future Ltd.<br />
                      Jhumat House<br />
                      160 London Road<br />
                      Barking<br />
                      Essex<br />
                      IG11 8BB
                    </address>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.402C21.1468 21.5902 20.9046 21.7336 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.92C16.7428 21.5857 13.787 20.5342 11.19 18.85C8.77382 17.2436 6.72533 15.1951 5.11997 12.7799C3.43398 10.1805 2.38456 7.22167 2.05297 4.14399C2.02796 3.86657 2.06117 3.58711 2.1504 3.32328C2.23963 3.05946 2.38293 2.81717 2.57099 2.6119C2.75905 2.40664 2.98778 2.24296 3.24286 2.13143C3.49793 2.01991 3.7738 1.96307 4.05297 1.96399H7.05297C7.53594 1.95995 8.00351 2.13289 8.36725 2.45012C8.73099 2.76735 8.96919 3.20986 9.03697 3.69499C9.16335 4.6533 9.39798 5.59296 9.73697 6.49599C9.87229 6.85392 9.89974 7.24283 9.81604 7.61603C9.73234 7.98923 9.54101 8.33104 9.26497 8.59999L7.99497 9.86999C9.42198 12.3824 11.5056 14.466 14.018 15.893L15.288 14.623C15.5569 14.347 15.8987 14.1556 16.2719 14.0719C16.6451 13.9882 17.034 14.0157 17.392 14.151C18.295 14.49 19.2347 14.7246 20.193 14.851C20.6835 14.9202 21.1302 15.1654 21.4468 15.5398C21.7634 15.9142 21.9312 16.3956 21.92 16.89V16.92Z" stroke="#D4F2A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#D4F2A1] text-lg font-light uppercase tracking-wide mb-4">Phone</h3>
                    <p className="text-white/90 text-[16px] md:text-[18px] leading-8 font-light">
                      020 8214 1353
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#D4F2A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="#D4F2A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#D4F2A1] text-lg font-light uppercase tracking-wide mb-4">Email</h3>
                    <a href="mailto:info@recycleforfuture.com" className="text-white/90 text-[16px] md:text-[18px] leading-8 font-light hover:text-[#D4F2A1] transition-colors">
                      info@recycleforfuture.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] pb-16">
          <div className="contact-map rounded-[2rem] overflow-hidden ring-1 ring-black/5 relative h-[600px] bg-[#E5E3DF]">
            <iframe 
              title="Map" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.554236043423!2d0.08868197668697663!3d51.5397449718208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a63a5628557b%3A0x6b77207604602f3!2sRecycle%20For%20Future%20Ltd!5e0!3m2!1sen!2suk!4v1709825421234!5m2!1sen!2suk" 
              className="w-full h-full border-0" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* Overlay to prevent scroll zoom until clicked/interacted with, if needed, though Google Maps embed handles this via Ctrl+Scroll usually. 
                For stricter control, we can rely on the embed's default behavior or overlay a pointer-events-none div that enables on click. 
                Standard embed behavior requires Ctrl+Scroll to zoom, which solves the "scroll down" issue. */}
          </div>
        </div>
      </section>
    </main>
  )
}

