"use client"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

interface MenuItem {
  label: string
  href: string
  subItems?: { label: string; href: string }[]
}

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { 
    label: "Services", 
    href: "/services",
  },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Contact Us", href: "/contact" },
]

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.set(menuRef.current, { visibility: "visible" })
        
        const tl = gsap.timeline()
        
        tl.to(bgRef.current, {
          y: "0%",
          duration: 0.8,
          ease: "power3.inOut"
        })
        .from(linksRef.current?.querySelectorAll('.menu-item') || [], {
          y: 50,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=0.4")
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(menuRef.current, { visibility: "hidden" })
          }
        })

        tl.to(linksRef.current?.querySelectorAll('.menu-item') || [], {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power3.in"
        })
        .to(bgRef.current, {
          y: "-100%",
          duration: 0.8,
          ease: "power3.inOut"
        }, "-=0.1")
      }
    })

    return () => ctx.revert()
  }, [isOpen])

  return (
    <div 
      ref={menuRef} 
      className="fixed inset-0 z-[100] invisible h-screen w-screen overflow-hidden"
    >
      <div 
        ref={bgRef} 
        className="absolute inset-0 bg-[#00272F] w-full h-full -translate-y-full overflow-y-auto"
      >
        <div className="relative w-full min-h-full flex flex-col">
          {/* Header area of the menu */}
          <div className="mx-auto max-w-[1600px] px-[2%] w-full flex items-center justify-between pt-[30px] flex-shrink-0">
            <Link href="/" onClick={onClose} className="block">
               <Image
                 src="/images/logo.png"
                 alt="RFF Logo"
                 width={247}
                 height={35}
                 className="w-40 md:w-[247px] h-auto"
               />
            </Link>
            
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-white group"
            >
              <span className="text-lg uppercase tracking-wider group-hover:text-[#BCDFD8] transition-colors">Close</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#00272F] transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                  <path d="M13 1L1 13M1 1L13 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex items-center justify-center py-10">
            <nav ref={linksRef} className="flex flex-col items-center gap-4 text-center">
              {menuItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center menu-item">
                  <Link 
                    href={item.href}
                    onClick={onClose}
                    className="group relative overflow-hidden inline-block"
                  >
                    <span className="block text-4xl md:text-6xl lg:text-7xl font-light text-white transition-transform duration-500 group-hover:-translate-y-full font-rubik">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 block text-4xl md:text-6xl lg:text-7xl font-light text-[#BCDFD8] translate-y-full transition-transform duration-500 group-hover:translate-y-0 font-rubik italic">
                      {item.label}
                    </span>
                  </Link>
                  
                  {item.subItems && (
                    <div className="mt-2 flex flex-col gap-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link 
                          key={subIndex}
                          href={subItem.href}
                          onClick={onClose}
                          className="text-lg md:text-xl text-white/60 hover:text-[#BCDFD8] transition-colors font-rubik font-light"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Footer of the menu */}
          <div className="pb-10 text-center text-white/40 text-sm flex-shrink-0">
            <p>&copy; {new Date().getFullYear()} RFF. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
