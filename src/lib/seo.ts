import { BRAND } from '@/lib/constants';
import type { FAQ } from '@/lib/faqs';

interface ServiceSchemaOptions {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}

interface WebPageSchemaOptions {
  title: string;
  description: string;
  path: string;
}

interface ItemListEntry {
  name: string;
  path: string;
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${BRAND.url}#organization`,
    name: BRAND.name,
    url: BRAND.url,
    telephone: BRAND.phoneHref.replace('tel:', ''),
    email: BRAND.email,
    foundingDate: `${BRAND.foundedYear}`,
    description: 'Professional home healthcare services including basic nursing care, elder care, ICU at home, baby care, and medical equipment support.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: BRAND.phoneHref.replace('tel:', ''),
        email: BRAND.email,
        areaServed: 'Chennai',
        availableLanguage: ['English', 'Tamil'],
      },
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BRAND.url}#local-business`,
    name: BRAND.name,
    url: BRAND.url,
    telephone: BRAND.phoneHref.replace('tel:', ''),
    email: BRAND.email,
    image: `${BRAND.url}/images/logo.png`,
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '$$',
    areaServed: ['Chennai'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BRAND.url}#website`,
    url: BRAND.url,
    name: BRAND.name,
    description: 'Home healthcare and nursing care services.',
    publisher: {
      '@id': `${BRAND.url}#organization`,
    },
    inLanguage: 'en-IN',
  };
}

export function getWebPageSchema({ title, description, path }: WebPageSchemaOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BRAND.url}${path}#webpage`,
    url: `${BRAND.url}${path}`,
    name: title,
    description,
    isPartOf: {
      '@id': `${BRAND.url}#website`,
    },
    about: {
      '@id': `${BRAND.url}#organization`,
    },
    inLanguage: 'en-IN',
  };
}

export function getServiceSchema({ name, description, path, serviceType }: ServiceSchemaOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BRAND.url}${path}#service`,
    name,
    description,
    serviceType: serviceType ?? name,
    provider: {
      '@id': `${BRAND.url}#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Chennai',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BRAND.url}${path}`,
      servicePhone: BRAND.phoneHref.replace('tel:', ''),
    },
    audience: {
      '@type': 'PeopleAudience',
      geographicArea: {
        '@type': 'City',
        name: 'Chennai',
      },
    },
    url: `${BRAND.url}${path}`,
  };
}

export function getFaqSchema(faqs: Pick<FAQ, 'question' | 'answer'>[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getItemListSchema(name: string, items: ItemListEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${BRAND.url}${item.path}`,
    })),
  };
}
