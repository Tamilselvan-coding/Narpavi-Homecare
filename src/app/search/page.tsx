import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { getSearchResults, type SearchResult } from '@/lib/search';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL || 'http://localhost:8085';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search Narpavi Homecare services, care packages, equipment and care guides.',
  alternates: { canonical: 'https://www.narpavihomecare.com/search' },
};

interface SearchPageProps {
  searchParams?: Promise<{ q?: string }>;
}

async function fetchSearchResults(query: string, limit: number): Promise<SearchResult[]> {
  try {
    const response = await fetch(
      `${BACKEND_API_BASE_URL}/api/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      { cache: 'no-store' }
    );
    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        return data.results.map((r: { title: string; excerpt: string; href: string; type: string }) => ({
          title: r.title,
          excerpt: r.excerpt,
          href: r.href,
          type: r.type,
          keywords: '',
        }));
      }
    }
  } catch (err) {
    console.warn('Backend search API unreachable, using local index fallback:', err);
  }

  return getSearchResults(query, limit);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params?.q?.trim() ?? '';
  const results = await fetchSearchResults(query, query ? 12 : 8);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />

      <section className="search-page">
        <div className="container">
          <div className="search-page__header">
            <span className="section-kicker">Search</span>
            <h1>{query ? `Search results for "${query}"` : 'Search Narpavi Homecare'}</h1>
            <p>Find services, care packages, equipment, FAQs and care guides by keyword.</p>
          </div>

          <form className="search-page__form" action="/search" method="get" role="search">
            <Search size={20} aria-hidden="true" />
            <input
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Try oxygen, nursing, elder care, cot, wheelchair..."
              aria-label="Search keyword"
              autoFocus
            />
            <button type="submit" className="btn btn--primary">
              Search
            </button>
          </form>

          {query && (
            <p className="search-page__count">
              {results.length > 0 ? `${results.length} matching result${results.length === 1 ? '' : 's'} found.` : 'No matching results found.'}
            </p>
          )}

          {results.length > 0 ? (
            <div className="search-results">
              {results.map((result) => (
                <Link className="search-result" href={result.href} key={`${result.type}-${result.href}-${result.title}`}>
                  <span>{result.type}</span>
                  <h2>{result.title}</h2>
                  <p>{result.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="search-empty">
              <h2>Need help finding the right care?</h2>
              <p>Try another keyword or contact our team. We can guide you to the correct service or equipment option.</p>
              <Link href="/contact" className="btn btn--primary">
                Contact Narpavi Homecare
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
