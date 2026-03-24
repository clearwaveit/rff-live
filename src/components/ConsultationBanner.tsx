import Image from "next/image"
import Link from "next/link"

export default function ConsultationBanner({ className = "" }: { className?: string }) {
  return (
    <section className={`mx-auto max-w-[1600px] px-4 sm:px-6 md:px-[2%] ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 bg-[#D4F2A1] rounded-[9px] px-24 py-5 sm:py-6">
        <div className="flex items-center gap-4">
          <Image src="/images/value-1.png" alt="icon" width={45} height={43} />
          <div className="flex flex-col gap-2">
            <h3 className="text-[#31312F] text-lg sm:text-[29px] font-bold">Avail experts consultation</h3>
            <p className="text-[#31312F] text-sm sm:text-[15px] font-[400] mt-1">Unlock the potential of plastic waste through expert recycling solutions.</p>
          </div>
        </div>
        <Link
          href="/contact"
          className="shrink-0 bg-[#222F30] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#1a2324] transition-colors"
        >
          Speak to Our Team
        </Link>
      </div>
    </section>
  )
}
