import { NAV_ITEMS } from '@/lib/constants';
import { BABY_CARE_PACKAGES } from '@/lib/babyCareData';
import { ELDER_CARE_PACKAGES } from '@/lib/elderCareData';
import { ADVANCE_NURSING_PACKAGES } from '@/lib/advanceNursingCareData';
import { SPECIALTY_NURSING_PACKAGES } from '@/lib/specialtyNursingCareData';
import { ICU_AT_HOME_PACKAGES } from '@/lib/icuAtHomeData';
import { CARE_PACKAGES } from '@/lib/packages';
import { EQUIPMENT_ITEMS } from '@/lib/equipment';
import { BLOG_POSTS } from '@/lib/blogs';
import { BABY_CARE_BLOG_ARTICLES } from '@/lib/babyCareBlogs';
import { ADVANCE_NURSING_BLOG_ARTICLES } from '@/lib/advanceNursingCareBlogs';
import { SPECIALTY_NURSING_BLOG_ARTICLES } from '@/lib/specialtyNursingCareBlogs';
import { HOME_NURSING_BLOG_ARTICLES } from '@/lib/homeNursingCareBlogs';
import sitePages from '@/lib/generated/site-search.json';

export interface SearchResult {
  title: string;
  excerpt: string;
  href: string;
  type: string;
  keywords: string;
}

export type SearchSuggestion = Omit<SearchResult, 'keywords'>;

// This index is consumed on the server. Only matching summaries go to the browser.
function contentText(value: unknown): string {
  if (typeof value === 'string') return /^(?:\/|https?:|#)/.test(value) ? '' : value;
  if (Array.isArray(value)) return value.map(contentText).join(' ');
  if (!value || typeof value !== 'object') return '';
  return Object.entries(value)
    .filter(([key]) => !/^(id|slug|image|imageAlt|icon|color|gradient|href|url|fileUrl|date|readTime)$/.test(key))
    .map(([, item]) => contentText(item)).join(' ');
}

const articles = new Map([
  ...BABY_CARE_BLOG_ARTICLES,
  ...ADVANCE_NURSING_BLOG_ARTICLES,
  ...SPECIALTY_NURSING_BLOG_ARTICLES,
  ...HOME_NURSING_BLOG_ARTICLES,
].map(article => [article.slug, article]));

const entries: SearchResult[] = [
  ...NAV_ITEMS.flatMap(item => [
    { title: item.label, excerpt: `Explore ${item.label.toLowerCase()} at Narpavi Homecare.`, href: item.href, type: 'Page', keywords: item.label },
    ...('children' in item ? item.children.map(child => ({
      title: child.label, excerpt: `Learn about ${child.label.toLowerCase()} at home.`, href: child.href, type: 'Service', keywords: `${item.label} ${child.label}`,
    })) : []),
  ]),
  ...BABY_CARE_PACKAGES.map(item => ({
    title: item.name, excerpt: item.tagline, href: `/baby-care#package-${item.id}`, type: 'Care Package', keywords: contentText(item),
  })),
  ...ELDER_CARE_PACKAGES.map(item => ({
    title: item.name, excerpt: item.tagline, href: `/elder-care#package-${item.id}`, type: 'Care Package', keywords: contentText(item),
  })),
  ...CARE_PACKAGES.map(item => ({
    title: item.name, excerpt: item.tagline, href: `/basic-nursing-care#package-${item.id}`, type: 'Care Package', keywords: contentText(item),
  })),
  ...ADVANCE_NURSING_PACKAGES.map(item => ({
    title: item.name, excerpt: item.tagline, href: `/home-nursing-care/advance-nursing-care#package-${item.id}`, type: 'Care Package', keywords: contentText(item),
  })),
  ...SPECIALTY_NURSING_PACKAGES.map(item => ({
    title: item.name, excerpt: item.tagline, href: `/home-nursing-care/specialty-nursing-care#package-${item.id}`, type: 'Care Package', keywords: contentText(item),
  })),
  ...ICU_AT_HOME_PACKAGES.map(item => ({
    title: item.name,
    excerpt: item.fullTitle.includes(' - ') ? item.fullTitle.split(' - ')[1] : item.fullTitle,
    href: `/home-nursing-care/icu-at-home#package-${item.id}`,
    type: 'Care Package',
    keywords: contentText(item),
  })),
  ...EQUIPMENT_ITEMS.map(item => ({
    title: item.title, excerpt: item.desc, href: `/medical-equipment/${item.slug}`, type: 'Equipment', keywords: contentText(item),
  })),
  ...BLOG_POSTS.map(post => ({
    title: post.title, excerpt: post.excerpt, href: `/blog/${post.slug}`, type: 'Guide', keywords: contentText(articles.get(post.slug) ?? post),
  })),
  ...sitePages,
];

// Several menus and cards link to the same page. Suggest that destination once.
const byHref = new Map<string, SearchResult>();
for (const entry of entries) {
  const existing = byHref.get(entry.href);
  byHref.set(entry.href, existing ? {
    ...existing,
    excerpt: entry.excerpt.length > existing.excerpt.length ? entry.excerpt : existing.excerpt,
    keywords: `${existing.keywords} ${entry.title} ${entry.keywords}`,
  } : { ...entry });
}
export const SEARCH_RESULTS = [...byHref.values()];

const aliases: Record<string, string> = {
  nurse: 'nursing', nurses: 'nursing', caretaker: 'caregiver', caregivers: 'caregiver',
  elderly: 'elder', senior: 'elder', seniors: 'elder',
  job: 'career', jobs: 'career', careers: 'career', vacancy: 'career', vacancies: 'career',
  physio: 'physiotherapy', rehab: 'rehabilitation', wheelchairs: 'wheelchair',
  nany: 'nanny', nanies: 'nanny', nannies: 'nanny',
  ange: 'angel', anges: 'angel', angels: 'angel',
  carfe: 'care',
};
const stopWords = new Set(['a', 'an', 'the', 'at', 'in', 'for', 'of', 'to', 'and', 'with', 'me', 'near', 'please', 'i', 'need', 'want']);

function normalize(text: string) {
  return text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/&/g, ' and ').replace(/@/g, ' at ').replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim().split(/\s+/).map(word => aliases[word] ?? word).join(' ');
}

const index = SEARCH_RESULTS.map(result => {
  const title = normalize(result.title);
  const excerpt = normalize(result.excerpt);
  const words = [...new Set(normalize(`${title} ${excerpt} ${result.keywords}`).split(' '))];
  return { result, title, excerpt, words };
});

function hasWord(words: string[], term: string) {
  return words.some(word => word === term || (term.length >= 3 && (word.startsWith(term) || (word.length >= 4 && term.startsWith(word)))));
}

function scoreResult(entry: typeof index[number], query: string, terms: string[]) {
  // Require every meaningful word so "nursing jobs" does not return unrelated care pages.
  if (!terms.every(term => hasWord(entry.words, term))) return 0;
  const titleWords = entry.title.split(' ');
  let score = entry.title === query ? 120 : entry.title.includes(query) ? 70 : 0;
  for (const term of terms) {
    score += hasWord(titleWords, term) ? 15 : hasWord(entry.excerpt.split(' '), term) ? 5 : 1;
  }
  return score;
}

export function getSearchResults(query: string, limit = 12): SearchResult[] {
  const normalized = normalize(query.slice(0, 160));
  const terms = [...new Set(normalized.split(' ').filter(word => word && !stopWords.has(word)))];
  const count = Number.isFinite(limit) ? Math.min(30, Math.max(1, Math.floor(limit))) : 12;
  if (!terms.length) return normalized ? [] : SEARCH_RESULTS.slice(0, count);

  return index.map(entry => ({ result: entry.result, score: scoreResult(entry, normalized, terms) }))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
    .slice(0, count).map(entry => entry.result);
}
