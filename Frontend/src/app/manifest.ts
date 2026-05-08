import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bharat Yatra Travels',
    short_name: 'Bharat Yatra',
    description: 'Premium Luxury Travel in India',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
