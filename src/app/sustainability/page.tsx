import type { Metadata } from "next"
import SustainabilityClient from "./SustainabilityClient"

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Our commitment to a zero landfill policy and circular economy. Discover how Recycle for Future Ltd reduces environmental impact through plastic recovery.",
  keywords: ["Sustainability Policy", "Zero Landfill", "Circular Economy", "Environmental Responsibility", "Plastic Recovery"],
}

export default function SustainabilityPage() {
  return <SustainabilityClient />
}
