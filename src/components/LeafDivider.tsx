"use client"

import Image from "next/image"

export default function LeafDivider({ className = "", variant = "border" }: { className?: string; variant?: "border" | "leaves" }) {
  const baseClass = `relative z-20 ${className}`

  if (variant === "leaves") {
    return (
      <div className={`flex items-center justify-center gap-2 ${baseClass}`}>
        <Image src="/vector-26.png" alt="" width={80} height={50} />
        <Image src="/vector-8.png" alt="" width={80} height={50} />
      </div>
    )
  }

  return (
    <div
      className={`w-full h-[102px] bg-repeat-x bg-center bg-contain ${baseClass}`}
      style={{ backgroundImage: 'url("/border.png")' }}
    />
  )
}
