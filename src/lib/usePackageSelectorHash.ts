'use client';

import { useEffect, useState, useCallback } from 'react';

export function usePackageSelectorHash<T extends { id: string }>(
  packages: readonly T[] | T[],
  defaultId?: string
) {
  const getPackageFromHash = useCallback(
    (hash: string) => {
      const raw = hash.replace(/^#/, '');
      if (!raw) return null;
      const targetId = raw.startsWith('package-') ? raw.slice(8) : raw;
      return packages.find(
        (pkg) => pkg.id === targetId || pkg.id.toLowerCase() === targetId.toLowerCase()
      );
    },
    [packages]
  );

  const [selectedPackageId, setSelectedPackageId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const raw = window.location.hash.replace(/^#/, '');
      if (raw) {
        const targetId = raw.startsWith('package-') ? raw.slice(8) : raw;
        const matched = packages.find(
          (pkg) => pkg.id === targetId || pkg.id.toLowerCase() === targetId.toLowerCase()
        );
        if (matched) return matched.id;
      }
    }
    return defaultId || packages[0]?.id || '';
  });

  const scrollToPackage = useCallback((pkgId: string) => {
    const attemptScroll = () => {
      const el =
        document.getElementById(`package-${pkgId}`) ||
        document.getElementById(`tab-${pkgId}`) ||
        document.getElementById('baby-care-packages') ||
        document.getElementById('elder-packages') ||
        document.getElementById('basic-care-packages');
      if (el) {
        const header = document.getElementById('site-header');
        const offset = Math.ceil(header?.getBoundingClientRect().height ?? 0) + 16;
        el.style.scrollMarginTop = `${offset}px`;
        el.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        });
        return true;
      }
      return false;
    };

    if (!attemptScroll()) {
      window.setTimeout(attemptScroll, 60);
      window.setTimeout(attemptScroll, 220);
    }
  }, []);

  const selectPackage = useCallback(
    (pkgId: string, updateUrl = true) => {
      setSelectedPackageId(pkgId);
      if (updateUrl && typeof window !== 'undefined') {
        const targetHash = `#package-${pkgId}`;
        if (window.location.hash !== targetHash) {
          window.history.replaceState(null, '', targetHash);
        }
      }
      scrollToPackage(pkgId);
    },
    [scrollToPackage]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Scroll if a package was matched on initial mount
    const initialMatched = getPackageFromHash(window.location.hash);
    if (initialMatched) {
      window.setTimeout(() => scrollToPackage(initialMatched.id), 120);
    }

    // Listen for hashchange
    const onHashChange = () => {
      const matched = getPackageFromHash(window.location.hash);
      if (matched) {
        setSelectedPackageId(matched.id);
        scrollToPackage(matched.id);
      }
    };

    // Listen for custom event from header search or programmatic links
    const onCustomSelect = (e: Event) => {
      const ce = e as CustomEvent<{ packageId?: string }>;
      const pkgId = ce.detail?.packageId;
      if (pkgId) {
        const matched = packages.find(
          (pkg) => pkg.id === pkgId || pkg.id.toLowerCase() === pkgId.toLowerCase()
        );
        if (matched) {
          setSelectedPackageId(matched.id);
          scrollToPackage(matched.id);
        }
      }
    };

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('narpavi:select-package-tab', onCustomSelect);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('narpavi:select-package-tab', onCustomSelect);
    };
  }, [packages, getPackageFromHash, scrollToPackage]);

  const selectedPackage = packages.find((pkg) => pkg.id === selectedPackageId) || packages[0];

  return {
    selectedPackageId,
    selectedPackage: selectedPackage as T,
    setSelectedPackageId: selectPackage,
  };
}
