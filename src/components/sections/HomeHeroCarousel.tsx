'use client';

import { useState, useEffect, type CSSProperties } from 'react';
import Image from 'next/image';
import { BadgeCheck, CheckCircle2, Sparkles } from 'lucide-react';
import styles from '@/app/home.module.css';

export interface HeroBannerItem {
  kicker: string;
  heading: string;
  highlight: string;
  copy: string;
  image: string;
  alt: string;
  usps: string[];
  metric: string;
  accent: string;
  accentRgb: string;
  accentSoft: string;
}

export default function HomeHeroCarousel({ banners }: { banners: HeroBannerItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      const nextIndex = (activeIndex + 1) % banners.length;
      // The first image stays mounted and already loaded when the cycle wraps.
      if (nextIndex === 0) setActiveIndex(0);
      else setPendingIndex(nextIndex);
    }, 5500);
    return () => clearInterval(timer);
  }, [activeIndex, banners.length]);

  return (
    <div className={`container ${styles.heroCarousel}`} aria-label="Main page service banners">
      {banners.map((banner, index) => {
        const isActive = activeIndex === index;
        return (
          <article
            className={styles.heroSlide}
            key={banner.heading}
            style={{
              '--banner-accent': banner.accent,
              '--banner-accent-rgb': banner.accentRgb,
              '--banner-soft': banner.accentSoft,
              opacity: isActive ? 1 : 0,
              visibility: isActive ? 'visible' : 'hidden',
              pointerEvents: isActive ? 'auto' : 'none',
              zIndex: isActive ? 2 : 1,
              transition: 'opacity 0.6s ease, transform 0.6s ease, visibility 0.6s ease',
              transform: isActive ? 'translateX(0)' : 'translateX(16px)',
              animation: 'none',
            } as CSSProperties}
          >
            <div className={styles.heroContent}>
              <span className={styles.heroEyebrow}>
                <Sparkles size={16} />
                {banner.kicker}
              </span>
              <h1>
                {banner.heading} <span>{banner.highlight}</span>
              </h1>
              <p className={styles.heroLead}>{banner.copy}</p>
              <ul className={styles.heroUsps} aria-label={`${banner.heading} USPs`}>
                {banner.usps.map((usp) => (
                  <li key={usp}>
                    <span className={styles.heroUspIcon}>
                      <CheckCircle2 size={18} />
                    </span>
                    <span>{usp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroImage}>
                {/* Hidden slides overlap the viewport: lazy loading alone still
                    downloads every banner during the first paint. */}
                {(index === 0 || isActive || pendingIndex === index) && (
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    loading="eager"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    onLoad={() => {
                      if (pendingIndex === index) {
                        setActiveIndex(index);
                        setPendingIndex(null);
                      }
                    }}
                    sizes="(max-width: 640px) calc(100vw - 56px), (max-width: 1100px) 584px, (max-width: 1240px) 44vw, 532px"
                  />
                )}
                <div className={styles.heroImageBadge}>
                  <BadgeCheck size={18} />
                  <span>{banner.metric}</span>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}