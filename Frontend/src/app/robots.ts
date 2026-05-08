import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin', 
        '/admin/', 
        '/_next/', 
        '/api/',
        '/forgot-password',
      ],
    },
    sitemap: 'https://www.bharatyatravels.com/sitemap.xml',
  }
}
