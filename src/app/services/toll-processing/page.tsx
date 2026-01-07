import type { Metadata } from "next"
import TollProcessingClient from "./TollProcessingClient"

export const metadata: Metadata = {
  title: "Toll Processing",
  description: "Expert toll processing services including granulation, pelletising, and compounding of plastic waste. We convert your scrap into reusable materials.",
  keywords: ["Toll Processing Services", "Plastic Granulation", "Contract Recycling", "Material Testing", "Plastic Compounding"],
}

export default function TollProcessingPage() {
  return <TollProcessingClient />
}
