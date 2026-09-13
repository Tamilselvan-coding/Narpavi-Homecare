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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [banners.length]);

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
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
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