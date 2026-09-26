'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { SearchSuggestion } from '@/lib/search';

type SearchResponse = {
  query: string;
  status: 'loading' | 'ready' | 'error';
  results: SearchSuggestion[];
};

export default function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const trimmedQuery = query.trim();
  const currentResponse = response?.query === trimmedQuery ? response : null;
  const suggestions = currentResponse?.results ?? [];
  const showDropdown = open && trimmedQuery.length > 0;
  const loading = !currentResponse || currentResponse.status === 'loading';
  const resultsHref = `/search?q=${encodeURIComponent(trimmedQuery)}`;

  useEffect(() => {
    if (!open || !trimmedQuery) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setResponse({ query: trimmedQuery, status: 'loading', results: [] });
      try {
        const result = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}&limit=6`, { signal: controller.signal });
        if (!result.ok) throw new Error('Search unavailable');
        const data: { results: SearchSuggestion[] } = await result.json();
        if (!controller.signal.aborted) setResponse({ query: trimmedQuery, status: 'ready', results: data.results });
      } catch {
        if (!controller.signal.aborted) setResponse({ query: trimmedQuery, status: 'error', results: [] });
      }
    }, 180);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [open, trimmedQuery]);

  function closeSuggestions() {
    setOpen(false);
    setActive(-1);
  }

  function selectSuggestion(href?: string) {
    closeSuggestions();
    setQuery('');

    if (href && href.includes('#') && typeof window !== 'undefined') {
      const [targetPath, hash] = href.split('#');
      const currentPath = window.location.pathname;
      const isSamePage =
        currentPath === targetPath ||
        (targetPath === '/baby-care' && currentPath === '/home-nursing-care/baby-care') ||
        (targetPath === '/home-nursing-care/baby-care' && currentPath === '/baby-care');

      if (isSamePage) {
        if (hash.startsWith('package-')) {
          const pkgId = hash.slice(8);
          window.dispatchEvent(new CustomEvent('narpavi:select-package-tab', { detail: { packageId: pkgId } }));
        }
        if (window.location.hash !== `#${hash}`) {
          window.history.pushState(null, '', href);
        }
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          const header = document.getElementById('site-header');
          targetEl.style.scrollMarginTop = `${Math.ceil(header?.getBoundingClientRect().height ?? 0) + 16}px`;
          targetEl.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
            block: 'start',
          });
        }
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSuggestions();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      if (!suggestions.length) return;
      const next = event.key === 'ArrowDown' ? (active + 1) % suggestions.length
        : active <= 0 ? suggestions.length - 1 : active - 1;
      setActive(next);
      optionRefs.current[next]?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter' && showDropdown && active >= 0 && suggestions[active]) {
      event.preventDefault();
      const targetHref = suggestions[active].href;
      router.push(targetHref);
      selectSuggestion(targetHref);
    }
  }

  return (
    <form
      className="header__search" role="search" action="/search" method="get"
      onSubmit={closeSuggestions}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeSuggestions();
      }}
    >
      <Search size={18} aria-hidden="true" />
      <input
        name="q" type="search" role="combobox" maxLength={160}
        placeholder="Search services, packages, guides..."
        aria-label="Search website content" aria-autocomplete="list" aria-haspopup="listbox"
        aria-controls={showDropdown ? 'header-search-suggestions' : undefined}
        aria-activedescendant={showDropdown && suggestions[active] ? `header-search-suggestion-${active}` : undefined}
        aria-expanded={showDropdown} autoComplete="off" value={query}
        onChange={event => { setQuery(event.target.value); setActive(-1); setOpen(true); }}
        onFocus={() => setOpen(true)} onKeyDown={handleKeyDown}
      />
      <button type="submit" aria-label="Search"><Search size={17} /></button>
      {showDropdown && (
        <div className="header__suggestions">
          <div id="header-search-suggestions" role="listbox" aria-label="Search suggestions" aria-busy={loading}>
            {suggestions.map((suggestion, index) => (
              <Link
                href={suggestion.href} key={suggestion.href} prefetch={false}
                ref={element => { optionRefs.current[index] = element; }}
                id={`header-search-suggestion-${index}`} role="option" aria-selected={index === active}
                className={`header__suggestion ${index === active ? 'header__suggestion--active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onMouseDown={event => { if (event.button === 0) event.preventDefault(); }}
                onClick={() => selectSuggestion(suggestion.href)}
              >
                <span>{suggestion.type}</span><strong>{suggestion.title}</strong><small>{suggestion.excerpt}</small>
              </Link>
            ))}
          </div>
          {loading && <p className="header__search-status" role="status">Searching the website…</p>}
          {currentResponse?.status === 'error' && <p className="header__search-status" role="status">Suggestions are unavailable. Press Enter to search.</p>}
          {currentResponse?.status === 'ready' && !suggestions.length && (
            <p className="header__search-status" role="status">No matching content. Try a service, package, equipment or guide name.</p>
          )}
          <Link className="header__search-all" href={resultsHref} prefetch={false} onClick={() => selectSuggestion(resultsHref)}>
            View all results for “{trimmedQuery}”
          </Link>
        </div>
      )}
    </form>
  );
}
