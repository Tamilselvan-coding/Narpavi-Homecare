import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FAQS } from '@/lib/faqs';
import { CARE_PACKAGE_NAMES } from '@/lib/packages';
import { DELIVERABLES } from '@/lib/deliverables';
import { WHO_WE_CARE_FOR } from '@/lib/whoWeCareFor';
import { BASIC_NURSING_CARE_BLOG_POSTS } from '@/lib/blogs';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import FAQAccordion from '@/components/sections/FAQAccordion';
import BasicCarePackageSelector from '@/components/sections/BasicCarePackageSelector';
import GatedDownloadResources from '@/components/sections/GatedDownloadResources';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';
import { getServiceSchema, getWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Professional Basic Nursing Care Service at Home in Chennai - Narpavi Homecare',
  description: 'Comprehensive Basic Nursing Care at Home from Narpavi Homecare for adults under 50 years of age who need non clinical support without invasive nursing procedures.',
  keywords: ['basic nursing care at home', 'home nursing care chennai', 'caregiver at home chennai', 'post surgery care'],
  alternates: { canonical: '/basic-nursing-care' },
};

const TRUST_POINTS = [
  { title: 'Verified & Background-Checked Caregivers', detail: 'ID proof and health screening before deployment.', icon: 'Verified caregiver' },
  { title: 'Doctor & Nurse-Led Overseeing', detail: 'Care plans reviewed and supervised by experienced clinicians.', icon: 'Doctor nurse care' },
  { title: 'Hospital Grade Hygiene Protocols', detail: 'WHO hand hygiene, infection control practices and PPE when needed.', icon: 'Infection hygiene' },
  { title: '24×7 Emergency Escalation', detail: 'On-call nurses & doctors to guide immediate action if health status changes.', icon: 'Emergency escalation' },
  { title: 'Transparent Reporting', detail: 'Daily care logs and instant incident reports for families including NRIs.', icon: 'Digital family report' },
];

const BASIC_CARE_WHO_WE_CARE_FOR = WHO_WE_CARE_FOR.filter((person) => person.title !== 'NRI Families Arranging Care');

export default function BasicNursingCarePage() {
  const schemas = [
    getWebPageSchema({ title: 'Professional Basic Nursing Care Service at Home in Chennai', description: 'Comprehensive Basic Nursing Care at Home from Narpavi Homecare for adults under 50 years of age who need non clinical support without invasive nursing procedures.', path: '/basic-nursing-care' }),
    getServiceSchema({ name: 'Professional Basic Nursing Care Service at Home in Chennai', description: 'Basic Nursing Care from Narpavi Homecare is a structured, safety-focused non clinical support system for adults under 50 years of age.', path: '/basic-nursing-care', serviceType: 'Basic nursing care service' }),
  ];

  return (
    <>
      <StructuredDataScript data={schemas} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Home Nursing Care', href: '/home-nursing-care' }, { label: 'Basic Nursing Care' }]} />

      <main className="basic-care-v2">
        <section className="baby-hero" id="basic-care-form">
          <div className="container baby-hero__grid">
            <div className="baby-hero__content">
              <h1>Professional <span>Basic Nursing Care Service</span> at Home in Chennai</h1>
              <div className="baby-hero__actions">
                {/* <a href="#basic-care-form" className="btn btn--outline btn--lg">Book Basic Nursing Care <SiteIcon name="Arrow" size={18} /></a> */}
                <a href="#basic-care-packages" className="btn btn--outline btn--lg">View Packages <SiteIcon name="Arrow" size={18} /></a>
              </div>
            </div>
            <div className="baby-hero__visual"><Image src="/images/pik 7.png" alt="Basic Nursing Care caregiver assisting a patient at home" fill sizes="(max-width: 992px) 100vw, 42vw" priority /></div>
            <CTAForm title="Book Basic Nursing Care" packageOptions={CARE_PACKAGE_NAMES} />
          </div>
        </section>

        <section className="section">
          <div className="container baby-summary">
            <div className="baby-image-panel"><Image src="/images/pik-1.jpeg" alt="Narpavi Basic Nursing Care support" fill sizes="(max-width: 992px) 100vw, 38vw" /></div>
            <div>
              <h2>Comprehensive Basic Nursing Care at Home</h2>
              <p>Basic Nursing Care from Narpavi Homecare is more than just help with daily chores, it&apos;s a structured, safety-focused non clinical support system for adults under 50 years of age, who are recovering, living with chronic illness, or need reliable home assistance without any invasive nursing procedures.</p>
              <p>Every plan is built to preserve independence, reduce readmissions and keep families informed in real time.</p>
              <Link href="#basic-care-form" className="btn btn--primary btn--lg">Book Basic Nursing Care <SiteIcon name="Arrow" size={18} /></Link>
            </div>
          </div>
        </section>

        <section className="section basic-care-v2__who basic-care-v2__who-model">
          <div className="container">
            <div className="basic-care-v2__who-model-title"><h2>Who Needs Basic Nursing Care at Home</h2></div>
            <div className="basic-care-v2__who-model-intro">
              <div className="basic-care-v2__who-model-copy">
                <p>
                  Basic Nursing Care from <strong>Narpavi Homecare</strong> is more than just help with daily chores, it&apos;s a <strong>structured, safety-focused non clinical support system</strong> for adults under 50 years of age, who are recovering, living with chronic illness, or need reliable home assistance without any invasive nursing procedures. Every plan is built to <strong>preserve independence, reduce readmissions and keep families in India / NRI families informed in real time.</strong>
                </p>
              </div>
              <div className="basic-care-v2__who-model-image">
                <Image src="/images/basic-nursing-care-hero-v2.png" alt="Basic Nursing Care support for recovery and mobility at home" fill sizes="(max-width: 768px) 100vw, 240px" />
              </div>
            </div>
            <div className="basic-care-v2__who-model-grid">
              {BASIC_CARE_WHO_WE_CARE_FOR.map((person) => (
                <article className="basic-care-v2__who-model-card" key={person.title}>
                  <span className="basic-care-v2__who-model-icon"><SiteIcon name={person.title} size={21} /></span>
                  <h3>{person.title}</h3>
                </article>
              ))}
            </div>
            <div className="basic-care-v2__who-model-action">
              <Link href="#basic-care-form" className="btn btn--primary btn--lg">Book Basic Nursing Care</Link>
            </div>
          </div>
        </section>

        <section className="section section--alt basic-care-v2__deliverables basic-care-v2__deliverables-model">
          <div className="container">
            <div className="basic-care-v2__deliverables-model-shell">
              <div className="basic-care-v2__deliverables-model-title"><h2>Comprehensive Basic Nursing Care Deliverables</h2></div>
              <div className="basic-care-v2__deliverables-model-grid">
                {DELIVERABLES.map((item) => (
                  <article className="basic-care-v2__deliverables-model-card" key={item.title}>
                    <span className="basic-care-v2__deliverables-model-icon"><SiteIcon name={item.title} size={22} /></span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
              <p className="basic-care-v2__deliverables-model-note">Peace of mind comes from knowing your loved one is cared for by trained professionals who follow proven healthcare safety standards &mdash; while keeping you informed every day.</p>
              <div className="basic-care-v2__deliverables-model-action">
                <Link href="#basic-care-form" className="btn btn--primary btn--lg">Book Basic Nursing Care</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--alt baby-trust-section basic-care-v2__trust">
          <div className="container">
            <div className="section__header basic-care-v2__trust-header">
              <h2>Your Loved One&apos;s Safety Is Our Priority</h2>
              <p>
                At Narpavi Homecare, We understand that inviting a caregiver into your home requires complete trust,<br />
                so we follow strict protocols to keep adults safe during recovery or long-term support.
              </p>
            </div>
            <div className="baby-trust-orbit">
              <div className="baby-trust-visual">
                <span className="baby-trust-visual__ring" aria-hidden="true" />
                <div className="baby-trust-visual__image"><Image src="/images/pik-2.jpg" alt="Safe and compassionate basic nursing care" fill sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 350px" /></div>
                <div className="baby-trust-visual__badge"><SiteIcon name="Safety shield" size={19} /><span>Safety-led care at home</span></div>
              </div>
              {TRUST_POINTS.map((item, index) => (
                <article className={`baby-trust-card baby-trust-card--${index + 1}`} key={item.title} style={{ '--baby-trust-order': index } as CSSProperties}>
                  <div className="baby-trust-card__icon"><SiteIcon name={item.icon} size={22} /></div>
                  <div><h3>{item.title}</h3><p>{item.detail}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="basic-care-packages">
          <div className="container">
            <div className="section__header basic-care-v2__packages-header">
              <h2>Packages Designed for Every Recovery & Mobility Need</h2>
              <p>
                We offer four Basic Nursing Care plans to match each person&apos;s mobility level and support requirement.<br />
                Choose the care plan that best fits your loved one&apos;s health stage and independence level or ask our team to help you select the right option.
              </p>
            </div>
            <BasicCarePackageSelector />
          </div>
        </section>

        <section className="section section--alt" id="basic-care-faq"><div className="container"><div className="section__header"><h2>FAQs</h2></div><FAQAccordion faqs={FAQS} /></div></section>

        <section className="section basic-care-v2__blogs" id="basic-care-blogs">
          <div className="container">
            <GatedDownloadResources
              heading="Blogs & Download Free Basic Nursing Care Guide"
              intro={(
                <>
                  <p>We believe informed families make better care decisions. That&apos;s why Narpavi Homecare provides guides, expert tips and practical advice for anyone considering Basic Patient Care at home.</p>
                  <p>Read, download, and share these resources to feel confident about arranging safe, comfortable home care.</p>
                </>
              )}
              image="/images/pik-11.png"
              imageAlt="Basic Nursing Care planning guide"
              modalDescription="Fill these details to download the Basic Nursing Care guide."
              downloadFallbackName="basic-nursing-care-guide.pdf"
              downloadButtonLabel="Download Guide"
              downloads={[
                {
                  title: 'Download Free Basic Nursing Care Guide',
                  fileUrl: '/downloads/basic-nursing-care/how-to-choose-basic-nursing-care-plan.pdf',
                },
              ]}
              resources={BASIC_NURSING_CARE_BLOG_POSTS.map((post) => ({
                title: post.title,
                excerpt: post.excerpt,
                image: post.image,
                href: `/blog/${post.slug}`,
              }))}
            />
          </div>
        </section>

        <section className="cta-strip baby-final-cta"><div className="container baby-final-cta__grid"><div><h2>Ready to Start Safe, Reliable Basic Nursing Care at Home?</h2><p>Your recovery or daily care doesn&apos;t need to be complicated. Narpavi Homecare makes it easy to begin safe, personalized Basic Nursing Care in Chennai — with trained caregivers, nurse supervision, and real-time updates.</p><p>Book a free expert assessment for Fast onboarding | Verified caregivers | 24×7 emergency support | Transparent pricing</p><div className="cta-strip__badges"><span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Fast onboarding</span><span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Verified caregivers</span><span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> 24×7 emergency support</span><span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Transparent pricing</span></div></div><CTAForm title="Book a free expert assessment" packageOptions={CARE_PACKAGE_NAMES} /></div></section>
      </main>
    </>
  );
}
