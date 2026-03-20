import Link from "next/link"

export default function Cta({
  href,
  label,
  tone = "dark",
  as = "link",
  btnRadius,
  arrowBg,
  btnBg,
  rightImage
}: {
  href: string
  label: string
  tone?: "dark" | "light"
  as?: "link" | "div"
  btnRadius?: string
  arrowBg?: string
  btnBg?: string
  rightImage?: string
}) {
  const isDark = tone === "dark"
  const mainBg = isDark ? "bg-[#222F30] text-white" : "bg-white text-[#0D0D0D] ring-1 ring-black/10"
  const accentBg = isDark ? "bg-[#CEF79E] text-[#0D0D0D]" : "bg-[#CEF79E] text-[#0D0D0D]"

  const Content = () => (
    <>
        <span className="style-main" style={{
          ...(btnRadius ? { borderRadius: btnRadius } : {}),
          ...(btnBg ? { background: btnBg } : {})
        }}>{label}</span>
        {rightImage && (
          <span className="cta-btn-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={rightImage} alt="" className="cta-btn-right-img" />
          </span>
        )}
        <span className="style-arrow" style={arrowBg ? { background: `url("${arrowBg}") no-repeat center / cover`, borderRadius: 0 } : undefined}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="" aria-hidden="true">
          <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        </span>
    </>
  )

  if (as === "div") {
    return (
      <div className="flex items-center gap-3">
        <div className="stylish-btn cursor-pointer">
          <Content />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href={href}
        aria-label="Go"
        className={`stylish-btn`}
      >
        <Content />
      </Link>
    </div>
  )
}
