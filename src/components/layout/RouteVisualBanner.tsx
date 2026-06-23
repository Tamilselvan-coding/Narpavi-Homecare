'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Phone } from 'lucide-react';
import { BRAND } from '@/lib/constants';

type VisualConfig = {
  image: string;
  eyebrow: string;
  title: string;
  copy: string;
};

const visualRoutes: Array<{ match: (path: string) => boolean; config: VisualConfig }> = [

  {
    match: (path) => path === '/contact',
    config: {
      image: '/images/pik-2.jpg',
      eyebrow: 'Speak with a care coordinator',
      title: 'Tell us what support your family needs',
      copy: 'A care assessment helps us recommend the right care level, shift and caregiver profile.',
    },
  },
  {
    match: (path) => path === '/join-us',
    config: {
      image: '/images/pik-6.jpeg',
      eyebrow: 'Build a meaningful care career',
      title: 'Join a team that supports its caregivers',
      copy: 'Training, supervisor access and fair work practices help our care teams deliver their best.',
    },
  },
  {
    match: (path) => path === '/faq',
    config: {
      image: '/images/pik-7.png',
      eyebrow: 'Clear answers for families',
      title: 'Plan home care with confidence',
      copy: 'Understand services, shifts, supervision, reporting and onboarding before care begins.',
    },
  },
  {
    match: (path) => path === '/elder-care',
    config: {
      image: '/images/pik-1.jpeg',
      eyebrow: 'Dignified support for seniors',
      title: 'Help parents stay safe and independent at home',
      copy: 'Daily living support, mobility assistance and family updates under nurse supervision.',
    },
  },
  {
    match: (path) => path.includes('patient-assistant-care') || path.includes('/services/active-assist'),
    config: {
      image: '/images/pik-4.png',
      eyebrow: 'Recovery and daily living support',
      title: 'A dependable helping hand for every routine',
      copy: 'Personal care, mobility, feeding assistance and companionship tailored to the patient.',
    },
  },
  {
    match: (path) => path.includes('baby-care'),
    config: {
      image: '/images/pik-11.png',
      eyebrow: 'Mother and baby support at home',
      title: 'Calm, attentive care for a new chapter',
      copy: 'Trained support for newborn routines, maternal comfort, hygiene and family confidence.',
    },
  },
  {
    match: (path) => path.includes('specialty-nursing-care'),
    config: {
      image: '/images/pik-15.png',
      eyebrow: 'Focused rehabilitation support',
      title: 'Specialized care built around the condition',
      copy: 'Structured nursing and rehabilitation support for neurological and complex recovery needs.',
    },
  },
  {
    match: (path) => path.includes('icu-at-home'),
    config: {
      image: '/images/pik-12.png',
      eyebrow: 'Critical care coordination at home',
      title: 'Continuous support for high-dependency patients',
      copy: 'Critical nursing, equipment coordination and rapid escalation under clinical supervision.',
    },
  },
  {
    match: (path) => path.includes('end-of-life-care') || path.includes('/services/comfort-plus'),
    config: {
      image: '/images/pik-14.png',
      eyebrow: 'Dignity-first comfort care',
      title: 'Gentle support for patients and families',
      copy: 'Comfort-focused bedside care, hygiene, companionship and coordinated family support.',
    },
  },
  {
    match: (path) => path.includes('/services/guided-living'),
    config: {
      image: '/images/pik-8.png',
      eyebrow: 'Steady support for everyday life',
      title: 'Structured care for long-term routines',
      copy: 'Consistent daily assistance for chronic conditions, mobility needs and family peace of mind.',
    },
  },
  {
    match: (path) => path.includes('/services/caring-hands'),
    config: {
      image: '/images/pik-13.jpeg',
      eyebrow: 'Complete support for limited mobility',
      title: 'Hands-on assistance delivered with patience',
      copy: 'Higher-support daily care for patients who need dependable help with movement and personal routines.',
    },
  },
  {
    match: (path) => path === '/privacy' || path === '/terms',
    config: {
      image: '/images/pik-5.jpeg',
      eyebrow: 'Transparent care practices',
      title: 'Clear policies for a trusted care relationship',
      copy: 'Review how Narpavi Homecare handles service expectations, privacy and communication.',
    },
  },
];

const routesWithPrimaryVisuals = new Set([
  '/',
  '/join-us',
  '/baby-care',
  '/basic-nursing-care',
  '/elder-care',
  '/home-nursing-care',
  '/home-nursing-care/baby-care',
  '/medical-equipment',
  '/blog',
  '/resources/how-to-choose-nursing-care-plan',
  '/services/active-assist',
  '/services/guided-living',
  '/services/caring-hands',
  '/services/comfort-plus',
]);

export default function RouteVisualBanner() {
  const pathname = usePathname();

  if (
    routesWithPrimaryVisuals.has(pathname)
    || pathname.startsWith('/baby-care/')
    || pathname.startsWith('/blog/')
    || pathname.startsWith('/medical-equipment/')
  ) return null;

  const visual = visualRoutes.find((entry) => entry.match(pathname))?.config;
  if (!visual) return null;

  return (
    <aside className="route-visual" aria-label="Narpavi care highlight">
      <div className="container route-visual__inner">
        <div className="route-visual__image">
          <Image src={visual.image} alt="Narpavi Homecare professional caregiver support" fill sizes="(max-width: 768px) 100vw, 38vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="route-visual__content">
          <span className="route-visual__eyebrow">{visual.eyebrow}</span>
          <h2>{visual.title}</h2>
          <p>{visual.copy}</p>
          <div className="route-visual__actions">
            <Link href="/contact" className="btn btn--primary btn--sm">Book Care Assessment <ArrowRight size={16} /></Link>
            <a href={BRAND.phoneHref} className="route-visual__phone"><Phone size={16} /> Call {BRAND.phoneFormatted}</a>
          </div>
        </div>
      </div>
    </aside>
  );
}
