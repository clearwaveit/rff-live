import type { Metadata } from "next"
import NewsroomClient from "./NewsroomClient"

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Latest news, insights, and updates from Recycle for Future Ltd. Stay informed about the plastic recycling industry and our company developments.",
  keywords: ["Recycling News", "Plastic Industry Insights", "Recycle for Future News", "Sustainability Blog"],
}

export default function NewsroomPage() {
  return <NewsroomClient />
}
