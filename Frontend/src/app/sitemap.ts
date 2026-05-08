import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.bharatyatravels.com'
  
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/packages',
    '/car-rental',
    '/blog',
    '/privacy-policy',
    '/terms-of-service',
    '/testimonials',
    '/services',
    '/corporate-booking',
    '/holiday-packages',
    '/honeymoon-tours',
    '/custom-itineraries',
    '/travel-insurance',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic routes (Packages)
  // We attempt to fetch packages to include them in the sitemap.
  // Fallback to static routes only if the API is down or rate-limited.
  let packageRoutes: any[] = []
  try {
    const res = await fetch('https://api.bharatyatravels.com/api/packages', {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    if (res.ok) {
      const packages = await res.json()
      packageRoutes = packages.map((pkg: any) => ({
        url: `${baseUrl}/packages/${pkg.slug || pkg.id}`,
        lastModified: new Date(pkg.updated_at || pkg.created_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch packages for sitemap:', error)
  }

  return [
    ...staticRoutes,
    ...packageRoutes,
  ]
}
