"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer className="mt-0 w-full">
      <div className="footer-outer">
        <div className="footer-inner">
          {/* Top Section: Heading + Newsletter */}
          <div className="footer-top">
            <div className="footer-top-left">
              <h2 className="footer-heading">Embrace Efficiency</h2>
              <p className="footer-subtext">
                Less hassle, more sustainability. Our focus<br className="hidden sm:block" />
                is on delivering seamless, sustainable<br className="hidden sm:block" />
                solutions for your business.
              </p>
            </div>
            <div className="newsletter-box">
              <p>Join our newsletter to keep up to date with us!</p>
              <div className="newsletter-input-wrap">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
              </div>
              <div className="newsletter-actions">
                <button type="button" className="stylish-btn">
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
            <div className="footer-col">
              <h3 className="footer-link-heading">WHO WE ARE</h3>
              <ul className="footer-link-list">
              <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Mission &amp; Values</Link></li>
                <li><Link href="#">Our Story</Link></li>
                <li><Link href="#">Partners</Link></li>
                {/* <li><Link href="#">UK Presence &amp; Global Reach</Link></li> */}
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-link-heading">SERVICES</h3>
              <ul className="footer-link-list">
                <li><Link href="/services/plastic-recycling">Plastic Scrap Sourcing</Link></li>
                <li><Link href="/services/pellet-and-compounds">Compounding</Link></li>
                <li><Link href="/services/toll-processing">Toll Processing</Link></li>
                {/* <li><Link href="#">Export &amp; Logistics Support</Link></li> */}
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-link-heading">MORE</h3>
              <ul className="footer-link-list">
                <li><Link href="#">Industries</Link></li>
                <li><Link href="#">Quality Assurance</Link></li>
                <li><Link href="/sustainability">Sustainability</Link></li>
                <li><Link href="#">Stats</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-link-heading">CONTACT US</h3>
              <ul className="footer-contact-list">
                <li>
                  <span className="footer-contact-icon" aria-hidden>
                    <Image
                      src="/images/location-icon.png"
                      alt=""
                      width={14}
                      height={14}
                      className="footer-contact-icon-image"
                    />
                  </span>
                  <span className="footer-contact-text">Recycle For Future Ltd. 183 Fengate, Peterborough PE1 5BH, United Kingdom</span>
                </li>
                <li>
                  <span className="footer-contact-icon" aria-hidden>
                    <Image
                      src="/images/phone-icon.png"
                      alt=""
                      width={14}
                      height={14}
                      className="footer-contact-icon-image"
                    />
                  </span>
                  <a className="footer-contact-text" href="tel:+441733358807">
                    01733 358807
                  </a>
                </li>
                <li>
                  <span className="footer-contact-icon" aria-hidden>
                    <Image
                      src="/images/mail-icon.png"
                      alt=""
                      width={14}
                      height={14}
                      className="footer-contact-icon-image"
                    />
                  </span>
                  <a className="footer-contact-text" href="mailto:info@recycleforfuture.com">
                    info@recycleforfuture.com
                  </a>
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
            <span>Recycle For Future © 2026 All rights reserved</span>
            <div className="flex gap-4">
            <span><Link href="/privacy">Privacy policy</Link></span>
            <span><Link href="/terms">Terms &amp; Conditions</Link></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
