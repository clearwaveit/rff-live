import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Recycle for Future Ltd, our mission to drive circular plastic solutions, and our commitment to environmental responsibility and excellence in recycling.",
  keywords: ["About Recycle for Future", "Plastic Recycling Mission", "Circular Economy UK", "Sustainable Plastic Solutions"],
}

export default function AboutPage() {
  return <AboutClient />
}
