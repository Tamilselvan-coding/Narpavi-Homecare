'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { handleAnchorClick } from '@/lib/anchorNavigation';

export default function ScrollEnhancements() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleAnchorClick, true);
    return () => document.removeEventListener('click', handleAnchorClick, true);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top ${showTop ? 'scroll-top--show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
      aria-label="Scroll to top"
    >
      <ArrowUp size={21} />
    </button>
  );
}
