"use client"
import Image from "next/image";
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
// import Logo from "@/components/Logo"
// import FullScreenMenu from "./FullScreenMenu"
import { usePathname } from "next/navigation"

export default function Header() {
  const navRef = useRef<HTMLDivElement | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const pathname = usePathname()
  const isContactPage = pathname === "/contact"

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }


  useEffect(() => {
    // Body is the scroll container (not window) due to CSS setup
    let lastScrollY = document.body.scrollTop
    let rafId: number

    const checkScroll = () => {
      const currentScrollY = document.body.scrollTop

      if (currentScrollY !== lastScrollY) {
        // Scroll UP (going towards top) - Show header
        if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        }
        // Scroll DOWN (going towards bottom) - Hide header (only after 50px)
        else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false)
        }

        setIsScrolled(currentScrollY > 50)
        lastScrollY = currentScrollY
      }

      rafId = requestAnimationFrame(checkScroll)
    }

    rafId = requestAnimationFrame(checkScroll)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <header style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }} className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${isScrolled || isContactPage ? 'bg-[#579C9C]' : ''}`}>
        <div className="mx-auto max-w-[1600px] px-4 md:px-[2%] py-3 flex items-center justify-between">
          {/* Logo - Left Side */}
          <div className="logo-block flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={247}
                height={35}
                className="w-[150px] md:w-[180px] xl:w-[247px] h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links - Hidden on mobile/tablet */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-8">
            <Link href="/" className={`text-white text-sm 2xl:text-base font-medium hover:opacity-80 transition-opacity pb-1 whitespace-nowrap ${pathname === '/' ? 'border-b-2 border-white' : ''}`}>Home</Link>
            <Link href="/about" className={`text-white text-sm 2xl:text-base font-medium hover:opacity-80 transition-opacity pb-1 whitespace-nowrap ${pathname === '/about' ? 'border-b-2 border-white' : ''}`}>About Us</Link>
            <Link href="/services" className={`text-white text-sm 2xl:text-base font-medium hover:opacity-80 transition-opacity pb-1 whitespace-nowrap ${pathname === '/services' ? 'border-b-2 border-white' : ''}`}>Services</Link>
            <Link href="/sustainability" className={`text-white text-sm 2xl:text-base font-medium hover:opacity-80 transition-opacity pb-1 whitespace-nowrap ${pathname === '/sustainability' ? 'border-b-2 border-white' : ''}`}>Sustainability</Link>

            {/* Contact Us Button */}
            <Link href="/contact" className="stylish-btn flex-shrink-0">
              <span className="style-main">Contact us</span>
              <span className="style-arrow">
                <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.2793 12.1669H2.05864" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.1797 3.06934L22.279 12.1686L13.1797 21.2679" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle - Visible on mobile/tablet */}
          <button
            className="xl:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu - Full Screen */}
      <div className={`fixed inset-0 w-full h-full bg-[#579C9C] z-50 xl:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button
            onClick={closeMobileMenu}
            className="w-10 h-10 flex items-center justify-center text-white"
            aria-label="Close menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-[calc(100%-80px)] gap-8">
          <Link href="/" onClick={closeMobileMenu} className={`text-white text-2xl font-medium hover:opacity-80 transition-opacity ${pathname === '/' ? 'border-b-2 border-white pb-1' : ''}`}>Home</Link>
          <Link href="/about" onClick={closeMobileMenu} className={`text-white text-2xl font-medium hover:opacity-80 transition-opacity ${pathname === '/about' ? 'border-b-2 border-white pb-1' : ''}`}>About Us</Link>
          <Link href="/services" onClick={closeMobileMenu} className={`text-white text-2xl font-medium hover:opacity-80 transition-opacity ${pathname === '/services' ? 'border-b-2 border-white pb-1' : ''}`}>Services</Link>
          <Link href="/sustainability" onClick={closeMobileMenu} className={`text-white text-2xl font-medium hover:opacity-80 transition-opacity ${pathname === '/sustainability' ? 'border-b-2 border-white pb-1' : ''}`}>Sustainability</Link>

          {/* Contact Us Button */}
          <Link href="/contact" onClick={closeMobileMenu} className="stylish-btn mt-6">
            <span className="style-main">Contact us</span>
            <span className="style-arrow">
              <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.2793 12.1669H2.05864" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.1797 3.06934L22.279 12.1686L13.1797 21.2679" stroke="#0D0D0D" strokeWidth="1.34121" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </nav>
      </div>

      {/* <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> */}
    </>
  )
}
