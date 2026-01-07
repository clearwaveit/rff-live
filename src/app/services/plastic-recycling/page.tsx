import type { Metadata } from "next"
import PlasticRecyclingClient from "./PlasticRecyclingClient"

export const metadata: Metadata = {
  title: "Plastic Recycling Services",
  description: "End-to-end plastic recycling solutions converting post-industrial and post-consumer waste into high-quality recycled materials.",
  keywords: ["Plastic Recycling Process", "Waste Sorting", "Shredding and Granulation", "Plastic Cleaning", "Recycled Material"],
}

export default function PlasticRecyclingPage() {
  return <PlasticRecyclingClient />
}
