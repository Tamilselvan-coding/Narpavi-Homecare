'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, ShoppingCart, User, X, Mail, ShieldCheck } from 'lucide-react';
import { BRAND, NAV_ITEMS } from '@/lib/constants';

import { getUserCartItems } from '@/lib/cart';
import { getAdminSession } from '@/lib/adminSession';
import HeaderSearch from '@/components/layout/HeaderSearch';

// Open webmail directly so the header CTA works without a configured mail app.
const emailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(BRAND.email)}`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminDashboardHref, setAdminDashboardHref] = useState('/sales/dashboard');

  useEffect(() => {
    const updateCount = () => setCartCount(getUserCartItems().length);
    const checkAdminSession = () => {
      if (typeof window !== 'undefined') {
        const session = getAdminSession();
        setIsAdminLoggedIn(!!session);
        if (session) {
          try {
            const role = session.role;
            setAdminDashboardHref(role === 'ADMIN' || role === 'MANAGER' ? '/admin/dashboard' : '/sales/dashboard');
          } catch {
            setAdminDashboardHref('/sales/dashboard');
          }
        }
      }
    };

    updateCount();
    checkAdminSession();

    window.addEventListener('narpavi:cart-updated', updateCount);
    window.addEventListener('narpavi:user-session-changed', updateCount);
    window.addEventListener('narpavi:admin-session-changed', checkAdminSession);
    window.addEventListener('storage', () => {
      updateCount();
      checkAdminSession();
    });

    return () => {
      window.removeEventListener('narpavi:cart-updated', updateCount);
      window.removeEventListener('narpavi:user-session-changed', updateCount);
      window.removeEventListener('narpavi:admin-session-changed', checkAdminSession);
      window.removeEventListener('storage', checkAdminSession);
    };
  }, []);

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

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`} id="site-header">
        <div className="container header__main">
          <Link href="/" className="header__logo" id="logo">
            <span className="header__logo-stage">
              <Image
                src="/images/logo-header.png"
                alt={BRAND.name}
                width={180}
                height={43}
                loading="eager"
                className="header__logo-img"
              />
            </span>
          </Link>
          <HeaderSearch />
          <div className="header__actions">
            <Link href="/cart" className="header__cart" aria-label={`View Cart (${cartCount} saved items)`}>
              <ShoppingCart size={21} />
              <span className="header__cart-count">{cartCount}</span>
            </Link>
            {isAdminLoggedIn ? (
              <Link href={adminDashboardHref} className="header__login-btn" aria-label="Admin Dashboard" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                <ShieldCheck size={19} />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link href="/admin/login" className="header__login-btn" aria-label="Admin Login">
                <User size={19} />
                <span>Login</span>
              </Link>
            )}
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
            <a
              href={emailComposeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn--email-pill header__cta-desktop"
              id="header-cta"
              title={`Email ${BRAND.email} in Gmail (opens in a new tab)`}
              aria-label={`Email ${BRAND.email} in Gmail (opens in a new tab)`}
            >
              <Mail size={18} /> Email
            </a>
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
                width={170}
                height={40}
                className="mobile-nav__logo-img"
              />
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
            <a
              href={emailComposeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn--email-pill"
              onClick={closeMobileMenu}
              title={`Email ${BRAND.email} in Gmail (opens in a new tab)`}
              aria-label={`Email ${BRAND.email} in Gmail (opens in a new tab)`}
            >
              <Mail size={18} /> Email
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
