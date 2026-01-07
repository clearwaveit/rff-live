"use client"

export default function LeafDivider({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`w-full h-[102px] bg-repeat-x bg-center bg-contain ${className}`}
      style={{ backgroundImage: 'url("/border.png")' }}
    />
  )
}
