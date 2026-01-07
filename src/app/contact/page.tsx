import type { Metadata } from "next"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Recycle for Future Ltd. Contact us for inquiries about our plastic recycling services, location details, or to discuss partnership opportunities.",
  keywords: ["Contact Recycle for Future", "Recycling Enquiries", "Plastic Recycling Contact", "London Road Barking Recycling"],
}

export default function ContactPage() {
  return <ContactClient />
}
