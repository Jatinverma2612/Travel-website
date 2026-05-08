import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Bharat Yatra Travels. Call us, email us, or fill out the form to plan your dream India tour. We are here to help 24/7.',
  keywords: ['contact us', 'travel agency contact', 'customer support'],
  alternates: {
    canonical: 'https://www.bharatyatravels.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
