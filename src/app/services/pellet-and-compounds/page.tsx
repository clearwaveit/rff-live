import type { Metadata } from "next"
import PelletAndCompoundsClient from "./PelletAndCompoundsClient"

export const metadata: Metadata = {
  title: "Pellet and Compounds",
  description: "High-quality recycled plastic pellets and custom compounds tailored to your specific performance and sustainability requirements.",
  keywords: ["Recycled Pellets", "Plastic Compounds", "Custom Plastic Blends", "Sustainable Materials"],
}

export default function PelletAndCompoundsPage() {
  return <PelletAndCompoundsClient />
}
