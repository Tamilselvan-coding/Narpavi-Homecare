import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { FAQS } from '@/lib/faqs';
import { CARE_PACKAGE_NAMES, CARE_PACKAGES, type CarePackage } from '@/lib/packages';
import { DELIVERABLES } from '@/lib/deliverables';
import { WHO_WE_CARE_FOR } from '@/lib/whoWeCareFor';
import { BLOG_POSTS } from '@/lib/blogs';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import FAQAccordion from '@/components/sections/FAQAccordion';
import GatedDownloadResources from '@/components/sections/GatedDownloadResources';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';
import { getServiceSchema, getWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Basic Nursing Care at Home - Narpavi Homecare',
  description: 'Expert basic nursing care services at home. ADL support, vital monitoring, mobility aid and medication reminders with nurse supervision.',
  keywords: ['basic nursing care at home', 'home nursing care chennai', 'caregiver at home chennai', 'post surgery care'],
  alternates: { canonical: '/basic-nursing-care' },
};

const TRUST_POINTS = [
  { title: 'Verified & Background-Checked Caregivers', detail: 'ID proof and health screening before deployment.', icon: 'Verified caregiver' },
  { title: 'Doctor & Nurse-Led Overseeing', detail: 'Care plans reviewed and supervised by experienced clinicians.', icon: 'Doctor nurse care' },
  { title: 'Hospital Grade Hygiene Protocols', detail: 'WHO hand hygiene, infection control practices and PPE when needed.', icon: 'Infection hygiene' },
  { title: '24x7 Emergency Escalation', detail: 'On-call nurses and doctors to guide immediate action if health status changes.', icon: 'Emergency escalation' },
  { title: 'Transparent Reporting', detail: 'Daily care logs and instant incident reports for families including NRIs.', icon: 'Digital family report' },
  { title: 'Personalised Care Plan', detail: 'Care is matched to recovery needs, mobility level and the family routine.', icon: 'Personalized care plan' },
];

function packageStyle(pkg: CarePackage) {
  return { '--package-color': pkg.color, '--package-gradient': pkg.gradient } as CSSProperties;
}

export default function BasicNursingCarePage() {
  const schemas = [
    getWebPageSchema({ title: 'Basic Nursing Care at Home', description: 'Basic Nursing Care at home with ADL support, recovery supervision, hygiene support, vital monitoring, and family updates.', path: '/basic-nursing-care' }),
    getServiceSchema({ name: 'Basic Nursing Care at Home', description: 'Structured, nurse-supervised basic nursing care for post-surgery recovery, chronic illness support, hygiene, mobility, and monitoring at home.', path: '/basic-nursing-care', serviceType: 'Basic nursing care service' }),
  ];

  return (
    <>
      <StructuredDataScript data={schemas} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Home Nursing Care', href: '/home-nursing-care' }, { label: 'Basic Nursing Care' }]} />

      <main className="basic-care-v2">
        <section className="baby-hero" id="basic-care-form">
          <div className="container baby-hero__grid">
            <div className="baby-hero__content">
              <div className="hero__badge"><SiteIcon name="Basic Nursing Care" size={16} /> Professional Home Support</div>
              <h1>Professional <span>Basic Nursing Care</span> at Home</h1>
              <p>Structured, safety-focused non-clinical support for adults recovering from illness, living with chronic conditions, or needing reliable assistance with everyday life at home.</p>
              <div className="baby-hero__proof">
                <span><SiteIcon name="Check" size={16} /> Nurse-supervised</span>
                <span><SiteIcon name="Check" size={16} /> Verified caregivers</span>
                <span><SiteIcon name="Check" size={16} /> Daily family updates</span>
              </div>
              <div className="baby-hero__actions">
                <a href="#basic-care-packages" className="btn btn--outline btn--lg">Explore care packages <SiteIcon name="Arrow" size={18} /></a>
              </div>
            </div>
            <div className="baby-hero__visual"><Image src="/images/pik-1.jpeg" alt="Basic Nursing Care support at home" fill sizes="(max-width: 992px) 100vw, 42vw" priority /></div>
            <CTAForm title="Book Your Basic Nursing Care Assessment" packageOptions={CARE_PACKAGE_NAMES} />
          </div>
        </section>

        <section className="section">
          <div className="container baby-summary">
            <div className="baby-image-panel"><Image src="/images/pik-2.jpg" alt="Narpavi Basic Nursing Care support" fill sizes="(max-width: 992px) 100vw, 38vw" /></div>
            <div>
              <span className="section-kicker">Care that supports independence</span>
              <h2>More than help with daily chores</h2>
              <p>Basic Nursing Care from Narpavi Homecare is a structured, safety-focused non-clinical support system for adults who are recovering, living with chronic illness, or need reliable home assistance without invasive nursing procedures.</p>
              <p>Every plan is built to preserve independence, reduce avoidable readmissions and keep families informed in real time.</p>
              <Link href="#basic-care-form" className="btn btn--primary btn--lg">Book a Care Assessment <SiteIcon name="Arrow" size={18} /></Link>
            </div>
          </div>
        </section>

        <section className="section section--alt basic-care-v2__trust">
          <div className="container">
            <div className="section__header">
              <span className="section-kicker">Safety first</span>
              <h2>Your loved one&apos;s safety is our priority</h2>
              <p>Inviting a caregiver into your home requires trust. Our care approach is built around screening, hygiene, clear communication and support when circumstances change.</p>
            </div>
            <div className="baby-trust-orbit">
              <div className="baby-trust-visual">
                <span className="baby-trust-visual__ring" aria-hidden="true" />
                <div className="baby-trust-visual__image"><Image src="/images/pik-3.jpg" alt="Safe and compassionate basic nursing care" fill sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 350px" /></div>
                <div className="baby-trust-visual__badge"><SiteIcon name="Safety shield" size={19} /><span>Safety-led care at home</span></div>
              </div>
              {TRUST_POINTS.map((item, index) => (
                <article className={`baby-trust-card baby-trust-card--${index + 1}`} key={item.title} style={{ '--baby-trust-order': index } as CSSProperties}>
                  <div className="baby-trust-card__icon"><SiteIcon name={item.icon} size={22} /></div>
                  <div><span className="baby-trust-card__eyebrow">Trust {String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.detail}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section basic-care-v2__who">
          <div className="container">
            <div className="section__header"><span className="section-kicker">Who we care for</span><h2>Support for recovery, routine & mobility needs</h2><p>Our caregivers help adults and families navigate everyday care needs with dignity and a dependable routine.</p></div>
            <div className="basic-care-v2__who-grid">
              {WHO_WE_CARE_FOR.map((person, index) => (
                <article className="basic-care-v2__who-card" key={person.title} style={{ '--care-card-order': index } as CSSProperties}>
                  <div className="basic-care-v2__who-top">
                    <span className="basic-care-v2__who-icon"><SiteIcon name={person.title} size={24} /></span>
                    <span className="basic-care-v2__who-number">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <span className="basic-care-v2__who-label">Care need</span>
                  <h3>{person.title}</h3>
                  <p>{person.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt basic-care-v2__deliverables">
          <div className="container baby-deliverables">
            <div className="section__header baby-deliverables__header"><span className="section-kicker">Comprehensive support</span><h2>Basic Nursing Care deliverables</h2><p>From personal care and mobility support to vital checks and family communication, every visit follows a simple, visible care routine.</p></div>
            <div className="basic-care-v2__deliverables-grid">
              {DELIVERABLES.map((item, index) => (
                <article className="basic-care-v2__deliverable" key={item.title} style={{ '--deliverable-order': index } as CSSProperties}>
                  <div className="basic-care-v2__deliverable-top"><span className="basic-care-v2__deliverable-icon"><SiteIcon name={item.title} size={23} /></span><span className="basic-care-v2__deliverable-number">{String(index + 1).padStart(2, '0')}</span></div>
                  <div><span className="basic-care-v2__deliverable-label">Care essential</span><h3>{item.title}</h3><p>{item.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="basic-care-packages">
          <div className="container">
            <div className="section__header"><span className="section-kicker">Care packages</span><h2>Packages designed for every recovery & mobility need</h2><p>Choose the plan that best fits your loved one&apos;s health stage, mobility level and everyday support requirement.</p></div>
            <div className="elder-packages-layout">
              <aside className="elder-sidebar" aria-label="Basic Nursing Care package navigation">
                <h3>Packages</h3>
                {CARE_PACKAGES.map((pkg) => <a href={`#package-${pkg.id}`} className="elder-sidebar__link" key={pkg.id} style={packageStyle(pkg)}><span><SiteIcon name={pkg.icon} size={19} /></span><strong>{pkg.name}</strong><small>{pkg.tagline}</small></a>)}
              </aside>
              <div className="elder-package-list">
                {CARE_PACKAGES.map((pkg) => (
                  <article className="elder-package-card" id={`package-${pkg.id}`} key={pkg.id} style={packageStyle(pkg)}>
                    <div className="elder-package-card__header"><div><div className="elder-package-card__icon"><SiteIcon name={pkg.icon} size={24} /></div><h3>{pkg.name}</h3><p>{pkg.tagline}</p></div><Link href={pkg.href} className="btn btn--white btn--sm">View Details <SiteIcon name="Arrow" size={16} /></Link></div>
                    <div className="elder-package-card__body"><div className="elder-package-card__media"><Image src={pkg.image} alt={`${pkg.name} Basic Nursing Care package`} fill sizes="(max-width: 992px) 100vw, 28vw" /></div><div><h4>Best for</h4><div className="elder-tag-list">{pkg.bestFor.map((item) => <span key={item}>{item}</span>)}</div><div className="elder-highlight-list">{pkg.highlights.map((item) => <div className="elder-highlight-point" key={item.title}><SiteIcon name="Check" size={18} /><div><strong>{item.title}</strong><p>{item.description}</p></div></div>)}</div><p className="elder-package-card__cue"><strong>Care-plan note:</strong> {pkg.costCue}</p><div className="elder-package-card__actions"><Link href={pkg.href} className="btn btn--outline btn--sm">Explore Package</Link><Link href={`${pkg.href}#basic-package-form`} className="btn btn--primary btn--sm">Book Now</Link></div></div></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--alt" id="basic-care-faq"><div className="container"><div className="section__header"><span className="section-kicker">FAQs</span><h2>Frequently asked questions</h2><p>Everything families need to know about arranging Basic Nursing Care at home.</p></div><FAQAccordion faqs={FAQS} /></div></section>

        <section className="section basic-care-v2__blogs" id="basic-care-blogs">
          <div className="container">
            <GatedDownloadResources
              heading="Blogs & Download Free Basic Nursing Care Guide"
              intro={(
                <>
                  <p>We believe informed families make better care decisions. Our guide and expert articles help you compare care levels, understand safety standards, and prepare for dependable support at home.</p>
                  <p>It&apos;s a <strong>must-have resource</strong> for families considering Basic Nursing Care.</p>
                </>
              )}
              image="/images/pik-11.png"
              imageAlt="Basic Nursing Care planning guide"
              modalDescription="Fill these details to download the Basic Nursing Care guide."
              downloadFallbackName="basic-nursing-care-guide.docx"
              downloads={[
                {
                  title: 'How to Choose the Right Basic Nursing Care Plan',
                  fileUrl: '/downloads/basic-nursing-care/how-to-choose-basic-nursing-care-plan.docx',
                },
              ]}
              resources={BLOG_POSTS.map((post) => ({
                title: post.title,
                excerpt: post.excerpt,
                image: post.image,
                href: `/blog/${post.slug}`,
              }))}
            />
          </div>
        </section>

        <section className="cta-strip baby-final-cta"><div className="container baby-final-cta__grid"><div><h2>Ready to start safe, reliable Basic Nursing Care at home?</h2><p>Tell us about the recovery, mobility or routine support your family needs. We will help you select an appropriate package and plan the next steps.</p><div className="cta-strip__badges"><span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Fast onboarding</span><span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Verified caregivers</span><span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Family updates</span></div></div><CTAForm title="Book Basic Nursing Care Consultation" packageOptions={CARE_PACKAGE_NAMES} /></div></section>
      </main>
    </>
  );
}
