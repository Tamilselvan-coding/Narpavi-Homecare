'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteIcon from '@/components/ui/SiteIcon';
import { BRAND } from '@/lib/constants';

interface HeroSlide {
  image: string;
  kicker: string;
  heading: string;
  headingHighlight: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
}

const SLIDES: HeroSlide[] = [
  {
    image: '/images/pik-1.jpeg',
    kicker: 'Trusted Home Healthcare',
    heading: 'Expert ',
    headingHighlight: 'Home Nursing Services',
    copy: 'Nurse-supervised, doctor-overseen care for your loved ones. From post-surgery recovery to palliative support — safe, dignified care at home.',
    ctaLabel: 'Book Care Assessment',
    ctaHref: '/contact',
  },
  {
    image: '/images/pik-4.png',
    kicker: 'Compassionate Senior Support',
    heading: 'Dignified ',
    headingHighlight: 'Elder Care at Home',
    copy: 'Professional caregivers providing daily assistance, mobility support, and companionship — so your parents feel safe, valued and cared for.',
    ctaLabel: 'Explore Elder Care',
    ctaHref: '/elder-care',
  },
  {
    image: '/images/pik-9.png',
    kicker: 'Critical Care at Your Doorstep',
    heading: 'Advanced ',
    headingHighlight: 'ICU Setup at Home',
    copy: 'High-dependency nursing with ventilator support, monitoring equipment and 24/7 clinical oversight — hospital-grade care in familiar surroundings.',
    ctaLabel: 'Get ICU at Home',
    ctaHref: '/home-nursing-care/icu-at-home',
  },
  {
    image: '/images/pik-6.jpeg',
    kicker: 'Postnatal & Newborn Support',
    heading: 'Caring ',
    headingHighlight: 'Baby & Mother Care',
    copy: 'Experienced caregivers for new mothers and newborns — breastfeeding guidance, baby bathing, and recovery support in the comfort of home.',
    ctaLabel: 'View Baby Care',
    ctaHref: '/baby-care',
  },
];

const SLIDE_DURATION = 5000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  const goToSlide = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="apollo-hero" id="hero" aria-label="Hero banner">
      {/* Decorative elements */}
      <div className="apollo-hero__decor apollo-hero__decor--ellipse" aria-hidden="true" />
      <div className="apollo-hero__decor apollo-hero__decor--ring" aria-hidden="true" />
      <div className="apollo-hero__decor apollo-hero__decor--ring2" aria-hidden="true" />
      <div className="apollo-hero__decor apollo-hero__decor--glow" aria-hidden="true" />
      <div className="apollo-hero__decor apollo-hero__decor--dots" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="apollo-hero__decor apollo-hero__decor--spiral" aria-hidden="true">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25 5C13.954 5 5 13.954 5 25s8.954 20 20 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M25 12C18.373 12 13 17.373 13 24s5.373 12 12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Slides */}
      <div className="apollo-hero__slides">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`apollo-hero__slide${i === index ? ' apollo-hero__slide--active' : ''}`}
          >
            {/* Left: Text */}
            <div className="apollo-hero__text">
              <div className="apollo-hero__kicker">
                <SiteIcon name="Trusted Home Healthcare" size={15} />
                {slide.kicker}
              </div>
              <h1 className="apollo-hero__heading">
                {slide.heading}
                <span>{slide.headingHighlight}</span>
              </h1>
              <p className="apollo-hero__copy">{slide.copy}</p>
              <div className="apollo-hero__actions">
                <Link href={slide.ctaHref} className="btn btn--primary btn--lg" id={`hero-cta-${i}`}>
                  {slide.ctaLabel} <SiteIcon name="Arrow" size={18} />
                </Link>
                <a href={BRAND.phoneHref} className="btn btn--outline btn--lg" id={`hero-phone-${i}`}>
                  <SiteIcon name="Phone" size={18} /> Call {BRAND.phone}
                </a>
              </div>
            </div>

            {/* Right: Image */}
            <div className="apollo-hero__media">
              <div className="apollo-hero__img-wrapper">
                <Image
                  src={slide.image}
                  alt={`${slide.headingHighlight} - Narpavi Homecare`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating info cards */}
              {i === index && (
                <>
                  <div className="apollo-hero__float apollo-hero__float--tl">
                    <SiteIcon name="Verified Caregivers" size={24} />
                    <div>
                      <strong>Verified Team</strong>
                      <small>Background checked</small>
                    </div>
                  </div>
                  <div className="apollo-hero__float apollo-hero__float--bl">
                    <SiteIcon name="24x7 Emergency" size={24} />
                    <div>
                      <strong>24/7 Support</strong>
                      <small>Fast escalation</small>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="apollo-hero__nav" aria-label="Slide navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`apollo-hero__dot${i === index ? ' apollo-hero__dot--active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
