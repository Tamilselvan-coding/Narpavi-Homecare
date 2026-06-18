import { NAV_ITEMS } from '@/lib/constants';
import { BABY_CARE_PACKAGES } from '@/lib/babyCareData';
import { CARE_PACKAGES } from '@/lib/packages';
import { EQUIPMENT_ITEMS } from '@/lib/equipment';
import { BLOG_POSTS } from '@/lib/blogs';
import { FAQS } from '@/lib/faqs';

export interface SearchResult {
  title: string;
  excerpt: string;
  href: string;
  type: string;
  keywords: string;
}

const NAV_RESULTS: SearchResult[] = NAV_ITEMS.flatMap((item) => [
  {
    title: item.label,
    excerpt: `Explore ${item.label.toLowerCase()} support from Narpavi Homecare.`,
    href: item.href,
    type: 'Page',
    keywords: item.label,
  },
  ...('children' in item && item.children
    ? item.children.map((child) => ({
        title: child.label,
        excerpt: `Learn more about ${child.label.toLowerCase()} services at home.`,
        href: child.href,
        type: 'Service',
        keywords: `${item.label} ${child.label}`,
      }))
    : []),
]);

export const SEARCH_RESULTS: SearchResult[] = [
  ...NAV_RESULTS,
  ...CARE_PACKAGES.map((item) => ({
    title: item.name,
    excerpt: `${item.tagline}. ${item.costCue}`,
    href: item.href,
    type: 'Care Package',
    keywords: [
      item.name,
      item.tagline,
      item.bestFor.join(' '),
      item.scope.map((scope) => `${scope.category} ${scope.detail}`).join(' '),
    ].join(' '),
  })),
  ...BABY_CARE_PACKAGES.map((item) => ({
    title: `${item.name} Baby Care`,
    excerpt: `${item.tagline}. ${item.summary}`,
    href: item.href,
    type: 'Baby Care Package',
    keywords: [
      item.name,
      item.tagline,
      item.summary,
      item.idealFor.join(' '),
      item.scope.map((scope) => `${scope.category} ${scope.detail}`).join(' '),
    ].join(' '),
  })),
  ...EQUIPMENT_ITEMS.map((item) => ({
    title: item.title,
    excerpt: item.desc,
    href: `/medical-equipment/${item.slug}`,
    type: 'Equipment',
    keywords: [
      item.shortTitle,
      item.category,
      item.metaDesc,
      item.keywords.join(' '),
      item.options.join(' '),
      item.features.join(' '),
      item.useCases.join(' '),
    ].join(' '),
  })),
  ...BLOG_POSTS.map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    href: `/blog/${post.slug}`,
    type: 'Guide',
    keywords: [post.title, post.excerpt, post.keywords.join(' ')].join(' '),
  })),
  ...FAQS.map((faq) => ({
    title: faq.question,
    excerpt: faq.answer,
    href: '/faq',
    type: 'FAQ',
    keywords: `${faq.question} ${faq.answer}`,
  })),
];

function scoreResult(result: SearchResult, query: string) {
  const normalizedQuery = query.toLowerCase();
  const haystack = `${result.title} ${result.excerpt} ${result.type} ${result.keywords}`.toLowerCase();
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  let score = 0;

  if (result.title.toLowerCase().includes(normalizedQuery)) score += 12;
  if (haystack.includes(normalizedQuery)) score += 8;

  terms.forEach((term) => {
    if (result.title.toLowerCase().includes(term)) score += 5;
    if (haystack.includes(term)) score += 2;
  });

  return score;
}

export function getSearchResults(query: string, limit = 12) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return SEARCH_RESULTS.slice(0, limit);

  return SEARCH_RESULTS
    .map((result) => ({ result, score: scoreResult(result, normalizedQuery) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
    .slice(0, limit)
    .map((entry) => entry.result);
}
