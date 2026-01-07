"use client"
import Image from "next/image";
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Logo from "@/components/Logo"
import FullScreenMenu from "./FullScreenMenu"
import { usePathname } from "next/navigation"

export default function Header() {
  const navRef = useRef<HTMLDivElement | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  const isContactPage = pathname === "/contact"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determine if scrolled (for background color)
      if (currentScrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine visibility (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled || isContactPage ? 'bg-[#579C9C]' : ''} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto max-w-[1600px] px-[2%] flex items-center justify-between">
          <div className="header-inner">
            <Link href="/contact" className="stylish-btn">
              <span className="style-main">Contact us</span>
              <span className="style-arrow">
                <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.2793 12.1669H2.05864" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.1797 3.06934L22.279 12.1686L13.1797 21.2679" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
            <div className="logo-block">
                <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="icon"
                  width={247}
                  height={35}
                />
                </Link>    
            </div>
            <div className="menu-box cursor-pointer" onClick={toggleMenu}>
              <Image
                  src="/images/menu.png"
                  alt="icon"
                  width={28}
                  height={13}
                />
              <span>Menu</span>
            </div>  
          </div>
          {}
          <div ref={navRef} className="bg-white/90 backdrop-blur rounded-2xl shadow-sm px-2 py-2 flex items-center gap-1 hide">
            <Link href="/about" className="px-4 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100">About Us</Link>
            <Link href="/services" className="px-4 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100">Services</Link>
            <Link href="/sustainability" className="px-4 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100">Sustainability</Link>
            {/* <Link href="/newsroom" className="px-4 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100">Newsroom</Link> */}
            <Link href="/contact" className="ml-1 px-4 py-2 rounded-md text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800">Contact Us</Link>
          </div>
          
        </div>
      </header>
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
