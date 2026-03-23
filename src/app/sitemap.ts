import type { MetadataRoute } from 'next'
import { fetchPublicProjects } from '@/lib/public-api'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '/',
    '/about',
    '/services',
    '/services/construction',
    '/services/design-consulting',
    '/services/supervision',
    '/services/project-management',
    '/services/bidding-consulting',
    '/projects',
    '/contact',
    '/store'
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/services') || route === '/projects' ? 0.9 : 0.8,
    lastModified: new Date()
  }))

  const projects = await fetchPublicProjects()

  const projectEntries: MetadataRoute.Sitemap = (projects || [])
    .filter((project) => Boolean(project.slug))
    .map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      changeFrequency: 'weekly',
      priority: project.isFeatured ? 0.9 : 0.8,
      lastModified: new Date(project.updatedAt || project.createdAt || project.startDate)
    }))

  return [...staticEntries, ...projectEntries]
}
