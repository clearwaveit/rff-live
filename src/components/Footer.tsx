"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-[1600px] px-[2%]">
        <div className="rounded-[0.8rem] bg-footer text-teal-50">
          <div className="footer-logo-wrap">
            <div className="footer-logo-box">
              <Link href="/">
                <Image
                  src="/images/footer-logo.svg"
                  alt="RFF"
                  width={145}
                  height={146}
                  />
              </Link>
            </div>
            <div className="newsletter-box">
              <p>Join our newsletter to keep up to date with us!</p>
              <div className="mt-7 flex items-center gap-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-teal-700 px-6 py-3 outline-none placeholder-teal-200 text-teal-50"
                />
                <button className="stylish-btn"><span className="style-main">Subscribe</span>
              <span className="style-arrow">
                <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.2793 12.1669H2.05864" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.1797 3.06934L22.279 12.1686L13.1797 21.2679" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span></button>
              </div>
            </div>
          </div>
          <hr className="my-8 border-teal-700" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium">Who We Are</h3>
              <ul className="mt-4 space-y-2 text-teal-50">
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Mission & Values</a></li>
                <li><a href="#" className="hover:text-white">Certifications</a></li>
                <li><a href="#" className="hover:text-white">UK Presence & Global Reach</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Services</h3>
              <ul className="mt-4 space-y-2 text-teal-50">
                <li><a href="#" className="hover:text-white">Plastic Scrap Sourcing</a></li>
                <li><a href="#" className="hover:text-white">Material Processing</a></li>
                <li><a href="#" className="hover:text-white">Manufacturing Through Partners</a></li>
                <li><a href="#" className="hover:text-white">Export & Logistics Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">More</h3>
              <ul className="mt-4 space-y-2 text-teal-50">
                <li><a href="#" className="hover:text-white">Industries</a></li>
                <li><a href="#" className="hover:text-white">Quality Assurance</a></li>
                <li><a href="#" className="hover:text-white">Sustainability</a></li>
                <li><a href="#" className="hover:text-white">Our Process</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-8 border-teal-700" />
          <p className="text-center text-sm text-teal-50">© 2025 Recycle For Future Ltd. | All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
