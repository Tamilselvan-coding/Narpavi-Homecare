'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BRAND, SOCIAL_URLS } from '@/lib/constants';
import {
  MapPin,
  ShieldCheck,
  Clock,
  Mail,
  MessageCircle,
  Award,
  Stethoscope,
  ChevronUp,
  Headphones,
  CalendarCheck,
} from 'lucide-react';

interface ChennaiZone {
  id: string;
  name: string;
  count: number;
  areas: string[];
}

const CHENNAI_ZONES: ChennaiZone[] = [
  {
    id: 'central',
    name: 'Central Chennai',
    count: 15,
    areas: [
      'Adyar', 'T. Nagar', 'Mylapore', 'Nungambakkam', 'Alwarpet',
      'Royapettah', 'Egmore', 'Kilpauk', 'Chetpet', 'Gopalapuram',
      'Triplicane', 'Kodambakkam', 'Teynampet', 'Thousand Lights', 'Choolaimedu'
    ],
  },
  {
    id: 'south',
    name: 'South & OMR / ECR',
    count: 20,
    areas: [
      'Velachery', 'Besant Nagar', 'Thiruvanmiyur', 'Guindy', 'Perungudi',
      'Thoraipakkam', 'Sholinganallur', 'Navalur', 'Siruseri', 'Medavakkam',
      'Pallikaranai', 'Madipakkam', 'Nanganallur', 'Tambaram', 'Chromepet',
      'Pallavaram', 'Neelankarai', 'Injambakkam', 'Palavakkam', 'Selaiyur'
    ],
  },
  {
    id: 'west',
    name: 'West Chennai',
    count: 14,
    areas: [
      'Anna Nagar', 'Vadapalani', 'Koyambedu', 'Ashok Nagar', 'KK Nagar',
      'Porur', 'Ramapuram', 'Valasaravakkam', 'Virugambakkam', 'Mogappair',
      'Ambattur', 'Poonamallee', 'Manapakkam', 'Iyyappanthangal'
    ],
  },
  {
    id: 'north',
    name: 'North & Suburbs',
    count: 12,
    areas: [
      'Perambur', 'Royapuram', 'Tondiarpet', 'Kolathur', 'Madhavaram',
      'Villivakkam', 'Sowcarpet', 'Vyasarpadi', 'Avadi', 'Pattabiram',
      'Guduvanchery', 'Kundrathur'
    ],
  },
];

const ALL_AREAS = Array.from(
  new Set(CHENNAI_ZONES.flatMap((z) => z.areas))
).sort();

/* ─── 5-COLUMN NAVIGATION STRUCTURE (EXACT HANDWRITTEN MODEL) ─── */

const ABOUT_LINKS = [
  { label: 'Leadership', href: '/about' },
  { label: 'Vision', href: '/about' },
  { label: 'Join Us', href: '/join-us' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
];

const OUR_SERVICES_LINKS = [
  { label: 'Home Nursing Care', href: '/home-nursing-care' },
  { label: 'Medical Equipment', href: '/medical-equipment' },
  { label: 'Health Visits', href: '/#health-visits' },
  { label: 'Rehabilitation', href: '/#rehabilitation' },
  { label: 'Wellness & Preventive Care', href: '/#wellness' },
  { label: 'Assisted Living', href: '/#assisted-living' },
];

const HOME_NURSING_LINKS = [
  { label: 'Baby Care', href: '/baby-care' },
  { label: 'Basic Care', href: '/basic-nursing-care' },
  { label: 'Advance Nursing Care', href: '/home-nursing-care/advance-nursing-care' },
  { label: 'Specialty Nursing Care', href: '/home-nursing-care/specialty-nursing-care' },
  { label: 'ICU @ Home', href: '/home-nursing-care/icu-at-home' },
  { label: 'Elder Care', href: '/elder-care' },
];

const MEDICAL_EQUIPMENT_LINKS = [
  { label: 'Respiratory', href: '/medical-equipment/respiratory-equipment' },
  { label: 'Monitor', href: '/medical-equipment/monitors' },
  { label: 'Ventilator', href: '/medical-equipment/ventilators' },
  { label: 'Mobility', href: '/medical-equipment/mobility-equipment' },
  { label: 'Pumps & DVT', href: '/medical-equipment/pumps-dvt' },
  { label: 'Hospital Cot', href: '/medical-equipment/hospital-cot' },
  { label: 'Medical Mattress', href: '/medical-equipment/medical-mattress' },
  { label: 'Suction Apparatus', href: '/medical-equipment/suction-machine' },
  { label: 'Masks & Accessories', href: '/medical-equipment/masks-accessories' },
  { label: 'Consumable Pack', href: '/medical-equipment' },
];

const TRUST_METRICS = [
  { icon: Clock, title: 'Ongoing Support', desc: 'Guidance as your needs change' },
  { icon: ShieldCheck, title: 'Safety & Comfort', desc: 'Your wellbeing comes first' },
  { icon: Stethoscope, title: 'Personalised Guidance', desc: 'Explore options that suit your needs' },
  { icon: Award, title: 'Family-Centred Care', desc: 'Support for every stage of life' },
];

const SOCIAL_LINKS = [
  { key: 'instagram', label: 'Instagram', path: '' },
  { key: 'facebook', label: 'Facebook', path: 'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.931-1.956 1.887v2.263h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z' },
  { key: 'twitter', label: 'Twitter / X', path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z' },
  { key: 'linkedin', label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z' },
] as const;

export default function Footer() {
  const [selectedZone, setSelectedZone] = useState<string>('all');

  const displayedAreas =
    selectedZone === 'all'
      ? ALL_AREAS
      : CHENNAI_ZONES.find((z) => z.id === selectedZone)?.areas || ALL_AREAS;

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${BRAND.url}#organization`,
    name: BRAND.name,
    url: BRAND.url,
    email: BRAND.email,
    telephone: BRAND.phone,
    foundingDate: `${BRAND.foundedYear}`,
    description:
      'Professional home healthcare and nursing care services across Chennai. Specializing in home nursing, elder care, ICU at home, baby care, and medical equipment rentals.',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Innova8Millenia, 2nd Floor, East Wing, RNZ, Millenia Tech Park, Campus 1A, OMR, Perungudi',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600096',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: 'Chennai',
    },
  };

  return (
    <footer
      className="seo-footer"
      id="site-footer"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/MedicalOrganization"
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* ─── 1. GREATER CHENNAI LOCATION NETWORK ─── */}
      <section className="seo-footer__loc-section" aria-label="Chennai Service Locations">
        <div className="container">
          <div className="seo-footer__loc-header">
            {/* <div className="seo-footer__badge">
              <MapPin size={13} />
              <span>Greater Chennai Service Coverage</span>
            </div> */}
            <h2 className="seo-footer__loc-title">
              Home Healthcare &amp; Nursing Services Across Chennai
            </h2>
            <p className="seo-footer__loc-desc">
              Prompt, nurse-supervised home care delivered directly to your doorstep in <strong>60+ neighborhoods</strong> across Central, South, West, North Chennai &amp; OMR/ECR corridors.
            </p>
          </div>

          {/* Zone Filter Tabs */}
          <div className="seo-footer__tabs" role="tablist" aria-label="Chennai Areas by Zone">
            <button
              type="button"
              role="tab"
              aria-selected={selectedZone === 'all'}
              className={`seo-footer__tab ${selectedZone === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedZone('all')}
            >
              All Chennai ({ALL_AREAS.length})
            </button>
            {CHENNAI_ZONES.map((zone) => (
              <button
                key={zone.id}
                type="button"
                role="tab"
                aria-selected={selectedZone === zone.id}
                className={`seo-footer__tab ${selectedZone === zone.id ? 'active' : ''}`}
                onClick={() => setSelectedZone(zone.id)}
              >
                {zone.name} ({zone.areas.length})
              </button>
            ))}
          </div>

          {/* Location Chips Grid */}
          <div className="seo-footer__grid" aria-label="Service Areas in Chennai">
            {displayedAreas.map((area) => (
              <Link
                key={area}
                href={`/contact?location=${encodeURIComponent(area)}#assessment-form`}
                className="seo-footer__chip"
                title={`Home Nursing & Healthcare in ${area}, Chennai`}
              >
                <span className="seo-footer__chip-dot" />
                <span>{area}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. HEALTHCARE GUIDANCE & SUPPORT ─── */}
      <section className="seo-footer__cta-section" aria-label="Home Healthcare Guidance & Support">
        <div className="container">
          <div className="seo-footer__cta-card">
            <div className="seo-footer__cta-info">
              <h3>Looking for the Right Home Healthcare Support?</h3>
              <p>
                Connect with the Narpavi team to explore our services, ask questions, and find support that suits you and your family. We’re here to help you take the next step with confidence.
              </p>
            </div>
            <div className="seo-footer__cta-actions">
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi Narpavi Team, I need home healthcare assistance in Chennai.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="seo-footer__btn seo-footer__btn--whatsapp"
                title="Chat with Care Manager on WhatsApp"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Care Desk</span>
              </a>
            </div>
          </div>

          {/* Shared care principles */}
          <div className="seo-footer__trust-grid">
            {TRUST_METRICS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div className="seo-footer__trust-item" key={idx}>
                  <div className="seo-footer__trust-icon-box">
                    <Icon size={20} />
                  </div>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. 5-COLUMN NAVIGATION (EXACT HANDWRITTEN BLUEPRINT) ─── */}
      <section className="seo-footer__nav-section" aria-label="Footer Navigation Links">
        <div className="container">
          <div className="seo-footer__nav-grid5">
            {/* Column 1: About */}
            <nav className="seo-footer__nav-col" aria-label="About Narpavi Homecare">
              <h4 className="seo-footer__col-heading">About</h4>
              <ul className="seo-footer__link-list">
                {ABOUT_LINKS.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="seo-footer__link">
                      <span className="seo-footer__link-bullet">›</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 2: Our Services */}
            <nav className="seo-footer__nav-col" aria-label="Our Care Services">
              <h4 className="seo-footer__col-heading">Our Services</h4>
              <ul className="seo-footer__link-list">
                {OUR_SERVICES_LINKS.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="seo-footer__link">
                      <span className="seo-footer__link-bullet">›</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 3: Home Nursing */}
            <nav className="seo-footer__nav-col" aria-label="Home Nursing Specialities">
              <h4 className="seo-footer__col-heading">Home Nursing</h4>
              <ul className="seo-footer__link-list">
                {HOME_NURSING_LINKS.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="seo-footer__link">
                      <span className="seo-footer__link-bullet">›</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 4: Medical Equipment */}
            <nav className="seo-footer__nav-col" aria-label="Medical Equipment Rentals & Supplies">
              <h4 className="seo-footer__col-heading">Medical Equipment</h4>
              <ul className="seo-footer__link-list">
                {MEDICAL_EQUIPMENT_LINKS.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="seo-footer__link">
                      <span className="seo-footer__link-bullet">›</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 5: Contact Us */}
            <div className="seo-footer__nav-col seo-footer__nav-col--contact" aria-label="Contact Us">
              <h4 className="seo-footer__col-heading">Contact Us</h4>

              {/* Section 1: For Booking & queries */}
              <div className="seo-footer__contact-card">
                <div className="seo-footer__contact-card-title">
                  <CalendarCheck size={14} className="seo-footer__contact-icon" />
                  <span>For Booking and queries</span>
                </div>
                <div className="seo-footer__contact-card-body">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(BRAND.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="seo-footer__contact-link"
                    aria-label={`Email ${BRAND.email} in Gmail (opens in a new tab)`}
                  >
                    <Mail size={13} />
                    <span>service@nhlcare.com</span>
                  </a>
                </div>
              </div>

              {/* Section 2: For Customer Support & Feedback */}
              <div className="seo-footer__contact-card">
                <div className="seo-footer__contact-card-title">
                  <Headphones size={14} className="seo-footer__contact-icon" />
                  <span>For Customer Support &amp; Feedback</span>
                </div>
                <div className="seo-footer__contact-card-body">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=care%40nhlcare.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="seo-footer__contact-link"
                    aria-label="Email care@nhlcare.com in Gmail (opens in a new tab)"
                  >
                    <Mail size={13} />
                    <span>care@nhlcare.com</span>
                  </a>
                </div>
              </div>

              <div className="seo-footer__socials" role="group" aria-label="Social media">
                {SOCIAL_LINKS.map((social) => {
                  const href = SOCIAL_URLS[social.key];
                  const icon = (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      {social.key === 'instagram' ? (
                        <>
                          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                          <circle cx="17.5" cy="6.5" r="1.2" />
                        </>
                      ) : <path d={social.path} />}
                    </svg>
                  );
                  return href ? (
                    <a key={social.key} href={href} className="seo-footer__social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (opens in a new tab)`} title={social.label}>
                      {icon}
                    </a>
                  ) : (
                    <span key={social.key} className="seo-footer__social-icon" role="img" aria-label={social.label} title={social.label}>
                      {icon}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. MEDICAL DISCLAIMER & BOTTOM LEGAL ─── */}
      <div className="seo-footer__bottom">
        <div className="container">
          <div className="seo-footer__disclaimer">
            <p>
              <strong>Medical Disclaimer:</strong> Information and services provided on this website are designed to support, not replace, the relationship that exists between a patient and their physician. In case of acute medical emergencies, please immediately visit your nearest emergency room or dial <strong>108</strong>.
            </p>
          </div>

          <div className="seo-footer__bottom-row">
            <div className="seo-footer__copyright">
              &copy; {new Date().getFullYear()} {BRAND.name} (Narpavi Homehealth &amp; Life Care Pvt Ltd). All rights reserved.
            </div>

            <div className="seo-footer__legal-links">
              <Link href="/privacy">Privacy Policy</Link>
              <span className="seo-footer__sep">•</span>
              <Link href="/terms">Terms of Service</Link>
              <span className="seo-footer__sep">•</span>
              <Link href="/faq">FAQs</Link>
              <span className="seo-footer__sep">•</span>
              <Link href="/about">About Us</Link>
              <span className="seo-footer__sep">•</span>
              <Link href="/contact">Contact</Link>
              <span className="seo-footer__sep">•</span>
              <Link href="/sitemap.xml" target="_blank">Sitemap</Link>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="seo-footer__back-to-top"
              aria-label="Back to top of page"
              title="Scroll to top"
            >
              <span>Top</span>
              <ChevronUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
