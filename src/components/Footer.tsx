"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer className="mt-0 w-full">
      <div className="rounded-none bg-footer w-full">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 md:px-[2%]">
          {/* Top Section: Heading + Newsletter */}
          <div className="footer-top">
            <div className="footer-top-left">
              <h2 className="footer-heading">Embrace Efficiency</h2>
              <p className="footer-subtext">
                Less hassle, more sustainability. Our focus<br />
                is on delivering seamless, sustainable<br />
                solutions for your business.
              </p>
            </div>
            <div className="newsletter-box">
              <p>Join our newsletter to keep up to date with us!</p>
              <div className="mt-5">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border px-6 py-3.5 outline-none"
                />
              </div>
              <div className="mt-4">
                <button className="stylish-btn">
                  <span className="style-main">SUBSCRIBE</span>
                  <span className="style-arrow">
                    <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.2793 12.1669H2.05864" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.1797 3.06934L22.279 12.1686L13.1797 21.2679" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="footer-links">
            <div>
              <h3 className="footer-link-heading">WHO WE ARE</h3>
              <ul className="footer-link-list">
                <li><Link href="/about">Our Story</Link></li>
                <li><Link href="/about#mission">Mission &amp; Values</Link></li>
                <li><Link href="/certifications">Certifications</Link></li>
                <li><Link href="/about#reach">UK Presence &amp; Global Reach</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-link-heading">SERVICES</h3>
              <ul className="footer-link-list">
                <li><Link href="/services/plastic-recycling">Plastic Scrap Sourcing</Link></li>
                <li><Link href="/services/pellet-and-compounds">Material Processing</Link></li>
                <li><Link href="/services/toll-processing">Manufacturing Through Partners</Link></li>
                <li><Link href="/services">Export &amp; Logistics Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-link-heading">MORE</h3>
              <ul className="footer-link-list">
                <li><Link href="/industries">Industries</Link></li>
                <li><Link href="/quality">Quality Assurance</Link></li>
                <li><Link href="/sustainability">Sustainability</Link></li>
                <li><Link href="/process">Our Process</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-link-heading">CONTACT US</h3>
              <ul className="footer-contact-list">
                <li>
                  <span className="footer-contact-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#ffffff"/></svg>
                  </span>
                  <span>Recycle For Future Ltd. Jhumat 160 London</span>
                </li>
                <li>
                  <span className="footer-contact-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" fill="#ffffff"/></svg>
                  </span>
                  <span>020 8214 1353</span>
                </li>
                <li>
                  <span className="footer-contact-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#ffffff"/></svg>
                  </span>
                  <span>info@recycleforfuture.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Big Logo */}
          <div className="footer-big-logo">
            <Image
              src="/images/footer-logo-new.png"
              alt="Recycle For Future"
              width={1200}
              height={200}
              className="w-full h-auto"
            />
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <span>Sensei © 2026 All rights reserved</span>
            <span>Privacy policy</span>
            <span>Terms &amp; Conditions</span>
            <span>Funding</span>
            <span>Shaped by Onda</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
