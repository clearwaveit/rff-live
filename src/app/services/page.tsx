import type { Metadata } from "next"
import ServicesClient from "./ServicesClient"

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore our comprehensive plastic recycling services including Plastic Recycling, Pellet and Compounds, and Toll Processing. We help businesses manage plastic waste responsibly.",
  keywords: ["Plastic Recycling Services", "Recycling Solutions UK", "Pelletising Services", "Compounding Services", "Plastic Waste Management"],
}

export default function ServicesPage() {
  return <ServicesClient />
}
