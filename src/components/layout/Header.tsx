'use client';
import { useState, useEffect, useMemo, type KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, Phone, Search, ShoppingCart, X } from 'lucide-react';
import { BRAND, NAV_ITEMS } from '@/lib/constants';
import { getSearchResults } from '@/lib/search';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  const trimmedSearchQuery = searchQuery.trim();
  const searchSuggestions = useMemo(
    () => (trimmedSearchQuery ? getSearchResults(trimmedSearchQuery, 6) : []),
    [trimmedSearchQuery],
  );
  const showSearchSuggestions = searchFocused && trimmedSearchQuery.length > 0 && searchSuggestions.length > 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenMobileSection(null);
  };

  const closeSearchSuggestions = () => {
    setSearchFocused(false);
    setActiveSuggestion(-1);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showSearchSuggestions) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSuggestion((current) => (current + 1) % searchSuggestions.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSuggestion((current) => (current <= 0 ? searchSuggestions.length - 1 : current - 1));
      return;
    }

    if (event.key === 'Escape') {
      closeSearchSuggestions();
      return;
    }

    if (event.key === 'Enter' && activeSuggestion >= 0) {
      event.preventDefault();
      window.location.href = searchSuggestions[activeSuggestion].href;
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`} id="site-header">
        <div className="container header__main">
          <Link href="/" className="header__logo" id="logo">
            <span className="header__logo-stage">
              <Image
                src="/images/logo-header.png"
                alt={BRAND.name}
                width={260}
                height={62}
                priority
                className="header__logo-img"
              />
              <span className="header__logo-scan" aria-hidden="true" />
              <span className="header__logo-pulse" aria-hidden="true" />
            </span>
          </Link>
          <form
            className="header__search"
            role="search"
            action="/search"
            method="get"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) closeSearchSuggestions();
            }}
          >
            <Search size={18} aria-hidden="true" />
            <input
              name="q"
              type="search"
              role="combobox"
              placeholder="Search services, equipment..."
              aria-label="Search services and equipment"
              aria-autocomplete="list"
              aria-controls="header-search-suggestions"
              aria-activedescendant={activeSuggestion >= 0 ? `header-search-suggestion-${activeSuggestion}` : undefined}
              aria-expanded={showSearchSuggestions}
              aria-haspopup="listbox"
              autoComplete="off"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setActiveSuggestion(-1);
              }}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={handleSearchKeyDown}
            />
            <button type="submit" aria-label="Search">
              <Search size={17} />
            </button>
            {showSearchSuggestions && (
              <div className="header__suggestions" id="header-search-suggestions" role="listbox">
                {searchSuggestions.map((suggestion, index) => (
                  <Link
                    href={suggestion.href}
                    key={`${suggestion.type}-${suggestion.href}-${suggestion.title}`}
                    id={`header-search-suggestion-${index}`}
                    className={`header__suggestion ${index === activeSuggestion ? 'header__suggestion--active' : ''}`}
                    role="option"
                    aria-selected={index === activeSuggestion}
                    onMouseEnter={() => setActiveSuggestion(index)}
                    onClick={closeSearchSuggestions}
                  >
                    <span>{suggestion.type}</span>
                    <strong>{suggestion.title}</strong>
                    <small>{suggestion.excerpt}</small>
                  </Link>
                ))}
              </div>
            )}
          </form>
          <div className="header__actions">
            <a href={BRAND.phoneHref} className="header__phone" aria-label={`Call ${BRAND.phoneFormatted}`}>
              <Phone size={18} />
              <span>{BRAND.phoneFormatted}</span>
            </a>
            <Link href="/medical-equipment" className="header__cart" aria-label="Cart">
              <ShoppingCart size={21} />
              <span className="header__cart-count">0</span>
            </Link>
            <button className="mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu" id="mobile-menu-toggle">
              <Menu size={26} />
            </button>
          </div>
        </div>
        <div className="header__menu-row">
          <div className="container header__menu-inner">
            <nav className="nav" id="main-nav">
              {NAV_ITEMS.map((item, i) => (
                <div key={i} className={`nav__item ${('children' in item && item.children) ? 'nav__item--has-children' : ''}`}>
                  <Link href={item.href}>
                    {item.label}
                    {('children' in item && item.children) && <ChevronDown className="nav__chevron" size={14} />}
                  </Link>
                  {('children' in item && item.children) && (
                    <div className={`nav__dropdown ${item.children.length > 7 ? 'nav__dropdown--grid' : ''}`}>
                      {item.children.map((child, j) => (
                        <Link key={j} href={child.href} className={('highlight' in child && child.highlight) ? 'highlight' : ''}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <Link href="/contact" className="btn btn--primary btn--sm header__cta-desktop" id="header-cta">
              Book Care Assessment
            </Link>
          </div>
        </div>
      </header>

      {mobileOpen && <div className="mobile-nav__overlay mobile-nav__overlay--open" onClick={closeMobileMenu} />}
      <div className={`mobile-nav ${mobileOpen ? 'mobile-nav--open' : ''}`} id="mobile-nav">
        <div className="mobile-nav__header">
          <Link href="/" className="mobile-nav__logo" onClick={closeMobileMenu}>
            <span className="header__logo-stage">
              <Image
                src="/images/logo-header.png"
                alt={BRAND.name}
                width={220}
                height={53}
                className="mobile-nav__logo-img"
              />
              <span className="header__logo-scan" aria-hidden="true" />
              <span className="header__logo-pulse" aria-hidden="true" />
            </span>
          </Link>
          <button className="mobile-nav__close" onClick={closeMobileMenu} aria-label="Close menu"><X size={21} /></button>
        </div>
        <div className="mobile-nav__links">
          {NAV_ITEMS.map((item, i) => (
            <div key={i} className="mobile-nav__group">
              {('children' in item && item.children) ? (
                <>
                  <div className="mobile-nav__row">
                    <Link href={item.href} onClick={closeMobileMenu}>{item.label}</Link>
                    <button
                      className="mobile-nav__sub-toggle"
                      onClick={() => setOpenMobileSection(openMobileSection === item.label ? null : item.label)}
                      aria-expanded={openMobileSection === item.label}
                      aria-label={`Toggle ${item.label} menu`}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                  <div className={`mobile-nav__sub ${openMobileSection === item.label ? 'mobile-nav__sub--open' : ''}`}>
                  {item.children.map((child, j) => (
                    <Link key={j} href={child.href} onClick={closeMobileMenu}>
                      {child.label}
                    </Link>
                  ))}
                  </div>
                </>
              ) : (
                <Link href={item.href} onClick={closeMobileMenu}>{item.label}</Link>
              )}
            </div>
          ))}
          <div className="mobile-nav__cta">
            <Link href="/contact" className="btn btn--primary" onClick={closeMobileMenu}>
              Book Care Assessment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
