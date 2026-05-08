import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Bharat Yatra Travels, our mission, vision, and the team behind the best travel agency in India. Serving travellers since 2009.',
  keywords: ['about us', 'travel agency history', 'bharat yatra travels team'],
  alternates: {
    canonical: 'https://www.bharatyatravels.com/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
