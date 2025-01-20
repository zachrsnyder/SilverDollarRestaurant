// tells web crawlers where to go!

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    // sitemap: 'https://yoursite.com/sitemap.xml'
  }
}