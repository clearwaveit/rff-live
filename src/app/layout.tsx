import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Rubik } from "next/font/google"

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"]
})

export const metadata: Metadata = {
  title: {
    template: "%s | Recycle for Future",
    default: "Recycle for Future - Sustainable Plastic Recycling Solutions",
  },
  description:
    "Recycle for Future Ltd provides expert plastic recycling services, including toll processing, pelletising, and compounding, to support a circular economy in the UK.",
  keywords: [
    "Plastic Recycling",
    "Recycle for Future",
    "Sustainable Manufacturing",
    "Circular Economy",
    "Plastic Waste Management",
    "UK Recycling",
    "Recycled Pellets",
    "Toll Processing",
  ],
  openGraph: {
    title: "Recycle for Future - Sustainable Plastic Recycling Solutions",
    description:
      "Recycle for Future Ltd provides expert plastic recycling services, including toll processing, pelletising, and compounding, to support a circular economy in the UK.",
    url: "https://recycleforfuture.com",
    siteName: "Recycle for Future",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Recycle for Future Logo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
