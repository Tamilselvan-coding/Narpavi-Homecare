import type { MetadataRoute } from 'next';
import { BABY_CARE_PACKAGES } from '@/lib/babyCareData';
import { BLOG_POSTS } from '@/lib/blogs';
import { ELDER_CARE_PACKAGES } from '@/lib/elderCareData';
import { CARE_PACKAGES } from '@/lib/packages';
import { ADVANCE_NURSING_PACKAGES } from '@/lib/advanceNursingCareData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nhlcare.com';
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: baseUrl + '/baby-care', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...BABY_CARE_PACKAGES.map((pkg) => ({
      url: baseUrl + pkg.href,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    { url: baseUrl + '/basic-nursing-care', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...CARE_PACKAGES.map((pkg) => ({
      url: baseUrl + pkg.href,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    { url: baseUrl + '/elder-care', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...ELDER_CARE_PACKAGES.map((pkg) => ({
      url: baseUrl + pkg.href,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    { url: baseUrl + '/home-nursing-care', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/home-nursing-care/advance-nursing-care', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...ADVANCE_NURSING_PACKAGES.map((pkg) => ({
      url: baseUrl + '/home-nursing-care/advance-nursing-care/' + pkg.id,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    { url: baseUrl + '/home-nursing-care/specialty-nursing-care', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/home-nursing-care/icu-at-home', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/faq', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...BLOG_POSTS.map((post) => ({
      url: baseUrl + '/blog/' + post.slug,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: baseUrl + '/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: baseUrl + '/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
