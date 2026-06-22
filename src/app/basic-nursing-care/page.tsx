import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { FAQS } from '@/lib/faqs';
import { CARE_PACKAGE_NAMES, CARE_PACKAGES } from '@/lib/packages';
import { DELIVERABLES } from '@/lib/deliverables';
import { WHO_WE_CARE_FOR } from '@/lib/whoWeCareFor';
import { BLOG_POSTS } from '@/lib/blogs';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import FAQAccordion from '@/components/sections/FAQAccordion';
import CTAForm from '@/components/ui/CTAForm';
import ImageSlider from '@/components/sections/ImageSlider';
import SiteIcon from '@/components/ui/SiteIcon';
import { getServiceSchema, getWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Basic Nursing Care at Home — Narpavi Homecare',
  description: 'Expert basic nursing care services at home. ADL support, vital monitoring, mobility aid & medication reminders. Nurse-supervised. Starts within 24-48 hrs.',
  keywords: ['basic nursing care at home', 'home nursing care chennai', 'caregiver at home chennai', 'post surgery care'],
  alternates: { canonical: '/basic-nursing-care' },
};

const BNC_BANNERS = [
  '/images/banner-1a.webp',
  '/images/banner-1b.webp',
];

export default function BasicNursingCarePage() {
  const pageSchemas = [
    getWebPageSchema({
      title: 'Basic Nursing Care at Home',
      description: 'Basic Nursing Care at home with ADL support, recovery supervision, hygiene support, vital monitoring, and family updates.',
      path: '/basic-nursing-care',
    }),
    getServiceSchema({
      name: 'Basic Nursing Care at Home',
      description: 'Structured, nurse-supervised basic nursing care for post-surgery recovery, chronic illness support, hygiene, mobility, and monitoring at home.',
      path: '/basic-nursing-care',
      serviceType: 'Basic nursing care service',
    }),
  ];

  return (
    <>
      <StructuredDataScript data={pageSchemas} />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Home Nursing Care', href: '/home-nursing-care' },
        { label: 'Basic Nursing Care' },
      ]} />

      {/* SECTION 1: Hero + CTA Form */}
      <section className="hero" id="bnc-hero" style={{ marginTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div className="hero__content">
              <div className="hero__badge"><SiteIcon name="Star Rating" size={16} /> #1 Basic Nursing Care</div>
              <h1 className="hero__title">
                Professional <span>Basic Nursing Care</span> Service at Home
              </h1>
              <p className="hero__subtitle">
                Comprehensive Basic Nursing Care at Home — structured, safety-focused non-clinical support for adults recovering, living with chronic illness, or needing reliable home assistance.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', height: '240px', marginBottom: '2rem' }}>
                <ImageSlider images={BNC_BANNERS} alt="Basic Nursing Care Banners" />
              </div>
              <div className="hero__cta-group">
                <a href={BRAND.phoneHref} className="btn btn--secondary btn--lg"><SiteIcon name="Phone" size={18} /> Call {BRAND.phone}</a>
                <a href={BRAND.whatsapp} className="btn btn--outline btn--lg" target="_blank" rel="noopener"><SiteIcon name="WhatsApp" size={18} /> WhatsApp Us</a>
              </div>
            </div>
            <CTAForm title="Book Your Basic Nursing Care Assessment" packageOptions={CARE_PACKAGE_NAMES} />
          </div>
        </div>
      </section>

      {/* SECTION 2: Executive Summary (Pik 1) */}
      <section className="section" id="bnc-summary">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <Image src="/images/pik-1.jpeg" alt="Basic Nursing Care from Narpavi Homecare" width={500} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
            </div>
            <div>
              <h2 style={{ marginBottom: '1.25rem' }}>Basic Nursing Care from Narpavi Homecare</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Basic Nursing Care from Narpavi Homecare is more than just help with daily chores — it&apos;s a structured, safety-focused non-clinical support system for adults under 50 years of age, who are recovering, living with chronic illness, or need reliable home assistance without any invasive nursing procedures.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Every plan is built to preserve independence, reduce readmissions and keep families informed in real time.
              </p>
              <Link href="/contact" className="btn btn--primary btn--lg" id="bnc-summary-cta">
                Book Your Basic Nursing Care Assessment <SiteIcon name="Arrow" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Why Choose Us / Safety (Pik 2) */}
      <section className="section section--alt" id="bnc-safety">
        <div className="container">
          <div className="section__header">
            <h2>Your Loved One&apos;s Safety Is Our Priority</h2>
            <p>At Narpavi Homecare, we understand that inviting a caregiver into your home requires complete trust, so we follow strict protocols to keep adults safe during recovery or long-term support.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div className="trust-grid" style={{ gridTemplateColumns: '1fr' }}>
              {[
                { icon: '✅', title: 'Verified & Background-Checked Caregivers', desc: 'ID proof and health screening before deployment.' },
                { icon: '🩺', title: 'Doctor & Nurse-Led Overseeing', desc: 'Care plans reviewed and supervised by experienced clinicians.' },
                { icon: '🧽', title: 'Hospital Grade Hygiene Protocols', desc: 'WHO hand hygiene, infection control practices and PPE when needed.' },
                { icon: '🚨', title: '24x7 Emergency Escalation', desc: 'On-call nurses & doctors to guide immediate action if health status changes.' },
                { icon: '📋', title: 'Transparent Reporting', desc: 'Daily care logs and instant incident reports for families including NRIs.' },
              ].map((t, i) => (
                <div key={i} className="trust-card">
                  <div className="trust-card__icon"><SiteIcon name={t.title} /></div>
                  <div>
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <Image src="/images/pik-2.jpg" alt="Safety First Protocols at Narpavi" width={400} height={500} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Who Needs BNC (Pik 3 & Pik 4) */}
      <section className="section" id="bnc-who">
        <div className="container">
          <div className="section__header" style={{ marginBottom: '3rem' }}>
            <h2>Who Needs Basic Nursing Care at Home?</h2>
          </div>

          {/* Group 1 (Pik 3) */}
          <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <Image src="/images/pik-3.jpg" alt="Seniors and adults needing assistance" width={400} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
            </div>
            <div className="care-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {WHO_WE_CARE_FOR.slice(0, 4).map((cat, i) => (
                <div key={i} className="care-card" style={{ height: '100%' }}>
                  <div className="care-card__icon"><SiteIcon name={cat.title} size={28} /></div>
                  <div>
                    <h4>{cat.title}</h4>
                    <p>{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2 (Pik 4) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div className="care-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {WHO_WE_CARE_FOR.slice(4).map((cat, i) => (
                <div key={i} className="care-card" style={{ height: '100%' }}>
                  <div className="care-card__icon"><SiteIcon name={cat.title} size={28} /></div>
                  <div>
                    <h4>{cat.title}</h4>
                    <p>{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <Image src="/images/pik-4.png" alt="Bedridden and limited mobility support" width={400} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
            </div>
          </div>

          <div className="text-center mt-4">
            <Link href="/contact" className="btn btn--primary btn--lg">Book a Care Consultation <SiteIcon name="Arrow" size={18} /></Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: Deliverables (Pik 5 & Pik 6) */}
      <section className="section section--alt" id="bnc-deliverables">
        <div className="container">
          <div className="section__header" style={{ marginBottom: '3rem' }}>
            <h2>Comprehensive Basic Nursing Care Deliverables</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '2rem' }}>
            {/* Left deliverables + Pik 5 */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem', height: '200px', position: 'relative' }}>
                <Image src="/images/pik-5.jpeg" alt="Personal care and nutrition support" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {DELIVERABLES.slice(0, 4).map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                    <div className="deliverable-inline__icon"><SiteIcon name={d.title} size={23} /></div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '0.15rem' }}>{d.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{d.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right deliverables + Pik 6 */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem', height: '200px', position: 'relative' }}>
                <Image src="/images/pik-6.jpeg" alt="Companionship and hygiene support" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {DELIVERABLES.slice(4).map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                    <div className="deliverable-inline__icon"><SiteIcon name={d.title} size={23} /></div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '0.15rem' }}>{d.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{d.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-4" style={{ maxWidth: '700px', margin: '2rem auto 0' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Peace of mind comes from knowing your loved one is cared for by trained professionals who follow proven healthcare safety standards — while keeping you informed every day.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: Care Packages (Pik 7, 8, 9, 10) */}
      <section className="section" id="bnc-packages">
        <div className="container">
          <div className="section__header">
            <h2>Packages Designed for Every Recovery & Mobility Need</h2>
            <p>We offer four Basic Nursing Care plans to match each person&apos;s mobility level and support requirement. Choose the care plan that best fits your loved one&apos;s health stage and independence level.</p>
          </div>
          <div className="packages-grid">
            {CARE_PACKAGES.map(pkg => (
              <div key={pkg.id} className="package-card" id={`package-${pkg.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="package-card__header" style={{ background: pkg.gradient }}>
                  <div className="package-card__name">{pkg.name}</div>
                  <div className="package-card__tagline">{pkg.tagline}</div>
                </div>
                <div style={{ position: 'relative', width: '100%', height: '160px', overflow: 'hidden' }}>
                  <Image src={pkg.image} alt={pkg.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="package-card__body" style={{ flexGrow: 1 }}>
                  <div className="package-card__best-for">
                    <h4>Best For</h4>
                    <ul>
                      {pkg.bestFor.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                  <details style={{ cursor: 'pointer' }}>
                    <summary style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>View Scope of Service</summary>
                    <ul style={{ marginTop: '0.5rem' }}>
                      {pkg.scope.map((s, i) => (
                        <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', paddingLeft: '0' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>{s.category}:</strong> {s.detail}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
                <div className="package-card__footer">
                  <p className="package-card__cost">{pkg.costCue}</p>
                  <div className="package-card__actions">
                    <Link href={pkg.href} className="btn btn--outline btn--sm">View Details</Link>
                    <Link href={`${pkg.href}#basic-package-form`} className="btn btn--primary btn--sm">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="section section--alt" id="bnc-faq">
        <div className="container">
          <div className="section__header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about Basic Nursing Care at Home.</p>
          </div>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      {/* SECTION 8: Blogs & Guide (Pik 11, 12, 13, 14, 15) */}
      <section className="section" id="bnc-blogs">
        <div className="container">
          <div className="section__header">
            <h2>Blogs & Download Free Basic Nursing Care Guide</h2>
            <p>We believe informed families make better care decisions. Read, download, and share these resources to feel confident about arranging safe, comfortable home care.</p>
          </div>

          {/* Downloadable Guide Card (Pik 11) */}
          <div style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem', border: '2px solid rgba(10,143,143,0.15)', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '150px', height: '200px', flexShrink: 0, borderRadius: 'var(--radius-sm)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <Image src="/images/pik-11.png" alt="How to Choose the Right Basic Nursing Care Plan Guide Cover" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>📥 Free Guide: How to Choose the Right Basic Nursing Care Plan</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>A step-by-step guide to help you evaluate your loved one&apos;s needs, compare care plans, and choose a reliable service.</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/resources/how-to-choose-nursing-care-plan" className="btn btn--primary">Download Guide</Link>
                <Link href="/contact" className="btn btn--outline">Book Care Consultation</Link>
              </div>
            </div>
          </div>

          {/* Blog Cards */}
          <div className="grid-4">
            {BLOG_POSTS.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card__image">
                  <Image src={post.image} alt={post.title} width={400} height={200} style={{ objectFit: 'cover' }} />
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">{post.readTime}</div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Final CTA Strip */}
      <section className="cta-strip" id="bnc-cta-final">
        <div className="container">
          <h2>Ready to Start Safe, Reliable Basic Nursing Care at Home?</h2>
          <p>Your recovery or daily care doesn&apos;t need to be complicated. Narpavi Homecare makes it easy to begin safe, personalized Basic Nursing Care — with trained caregivers, nurse supervision, and real-time updates.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--white btn--lg">Book an Expert Care Assessment</Link>
            <a href={BRAND.phoneHref} className="btn btn--outline btn--lg" style={{ color: 'white', borderColor: 'white' }}><SiteIcon name="Phone" size={18} /> {BRAND.phone}</a>
          </div>
          <div className="cta-strip__badges">
            <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Fast Onboarding</span>
            <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Verified Caregivers</span>
            <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> 24x7 Emergency Support</span>
            <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Transparent Pricing</span>
          </div>
        </div>
      </section>
    </>
  );
}
