import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ICU_AT_HOME_HERO_TITLE,
  ICU_AT_HOME_SUMMARY,
  ICU_AT_HOME_WHO_INTRO,
  ICU_AT_HOME_WHO_HEADING,
  ICU_AT_HOME_WHO,
  ICU_AT_HOME_DELIVERABLES_HEADING,
  ICU_AT_HOME_DELIVERABLES_INTRO,
  ICU_AT_HOME_DELIVERABLES,
  ICU_AT_HOME_PACKAGES_HEADING,
  ICU_AT_HOME_PACKAGES_INTRO,
  ICU_AT_HOME_PACKAGES,
  ICU_AT_HOME_PACKAGE_NAMES,
  ICU_AT_HOME_TRUST_HEADING,
  ICU_AT_HOME_TRUST_INTRO,
  ICU_AT_HOME_TRUST_POINTS,
  ICU_AT_HOME_RESOURCE_COPY,
  ICU_AT_HOME_DOWNLOADS,
  ICU_AT_HOME_RESOURCE_GUIDE_TEXT,
  ICU_AT_HOME_RESOURCES,
  ICU_AT_HOME_FINAL_CTA,
  ICU_AT_HOME_FAQS,
} from '@/lib/icuAtHomeData';
import { getFaqSchema, getItemListSchema, getServiceSchema, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import FAQAccordion from '@/components/sections/FAQAccordion';
import GatedDownloadResources from '@/components/sections/GatedDownloadResources';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';
import IcuCarePackageSelector from '@/components/sections/IcuCarePackageSelector';

export const metadata: Metadata = {
  title: 'ICU @ Home in Chennai — Safe, Affordable & High-Grade Critical Care',
  description: 'Hospital-level intensive care at home with ICU-trained nurses, advanced monitoring, ventilators, and specialist remote supervision for a safe, affordable transition.',
  keywords: [
    'ICU at home Chennai',
    'home ICU setup Chennai',
    'critical care nursing at home',
    'ventilator care at home Chennai',
    'tracheostomy suctioning home',
    'step-down ICU home nursing'
  ],
  alternates: { canonical: 'https://www.narpavihomecare.com/home-nursing-care/icu-at-home' },
};

export default function ICUAtHomePage() {
  const path = '/home-nursing-care/icu-at-home';
  const schemas = [
    getWebPageSchema({ title: 'ICU @ Home in Chennai — Safe, Affordable & High-Grade', description: metadata.description ?? '', path }),
    getServiceSchema({ name: 'ICU Care at Home', description: metadata.description ?? '', path, serviceType: 'Ventilator support, cardiac monitoring, critical care nursing' }),
    getItemListSchema('ICU at Home Packages', ICU_AT_HOME_PACKAGES.map((pkg) => ({ name: pkg.name, path: `${path}#package-${pkg.id}` }))),
    getFaqSchema(ICU_AT_HOME_FAQS.slice(0, 6)),
  ];

  return (
    <>
      <StructuredDataScript data={schemas} />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Home Nursing Care', href: '/home-nursing-care' },
        { label: 'ICU at Home' },
      ]} />

      <main className="basic-care-v2">
        {/* Hero Section */}
        <section className="baby-hero" id="icu-at-home-form">
          <div className="container baby-hero__grid">
            <div className="baby-hero__content">
              <h1>ICU @ Home <span>in Chennai</span></h1>
              <p className="hero__subtitle" style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: '1.6', marginTop: '1rem', marginBottom: '2rem' }}>
                Safe, Affordable & High-Grade step-down & advanced critical care at home. Replicating clinical intensive care standards with ICU-trained nurses and specialist supervision.
              </p>
              <div className="baby-hero__actions">
                <a href="#basic-care-packages" className="btn btn--outline btn--lg">View Packages <SiteIcon name="Arrow" size={18} /></a>
              </div>
            </div>
            <div className="baby-hero__visual">
              <Image src="/images/icu-at-home/pik-1.png" alt="Hospital-grade ICU setup at home with advanced equipment" fill sizes="(max-width: 992px) 100vw, 42vw" priority style={{ objectFit: 'cover' }} />
            </div>
            <CTAForm title="Book ICU @ Home" packageOptions={ICU_AT_HOME_PACKAGE_NAMES} />
          </div>
        </section>

        {/* Summary Section */}
        <section className="section">
          <div className="container baby-summary">
            <div className="baby-image-panel">
              <Image src="/images/icu-at-home/pik-1.png" alt="ICU nurse checking vital stats in a homecare environment" fill sizes="(max-width: 992px) 100vw, 38vw" style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h2>{ICU_AT_HOME_SUMMARY.heading}</h2>
              <p>{ICU_AT_HOME_SUMMARY.body}</p>
              <Link href="#icu-at-home-form" className="btn btn--primary btn--lg">Book ICU @ Home <SiteIcon name="Arrow" size={18} /></Link>
            </div>
          </div>
        </section>

        {/* Who We Care For Section */}
        <section className="section basic-care-v2__who basic-care-v2__who-model">
          <div className="container">
            <div className="basic-care-v2__who-model-title"><h2>{ICU_AT_HOME_WHO_HEADING}</h2></div>
            <div className="basic-care-v2__who-model-intro">
              <div className="basic-care-v2__who-model-copy" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ textAlign: 'center', margin: 0 }}>
                  {ICU_AT_HOME_WHO_INTRO}
                </p>
              </div>
              <div className="basic-care-v2__who-model-image">
                <Image src="/images/icu-at-home/pik-4.png" alt="ICU demographic support group at home" fill sizes="(max-width: 768px) 100vw, 240px" style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="basic-care-v2__who-model-grid icu-who-grid">
              {ICU_AT_HOME_WHO.map((person) => {
                const [title, description] = person.text.includes(' - ')
                  ? person.text.split(' - ')
                  : [person.text, ''];

                return (
                  <article className="basic-care-v2__who-model-card" key={title} style={{ minHeight: '160px', padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="basic-care-v2__who-model-icon" style={{ marginBottom: '0.5rem' }}><SiteIcon name={person.icon} size={21} /></span>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', lineHeight: '1.4', margin: '0' }}>
                      {title}
                      <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)' }}>
                        {description ? ` - ${description}` : ''}
                      </span>
                    </h3>
                  </article>
                );
              })}
            </div>
            <div className="basic-care-v2__who-model-action">
              <Link href="#icu-at-home-form" className="btn btn--primary btn--lg">Book ICU @ Home</Link>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="section section--alt basic-care-v2__deliverables basic-care-v2__deliverables-model">
          <div className="container">
            <div className="basic-care-v2__deliverables-model-shell">
              <div className="basic-care-v2__deliverables-model-title"><h2>{ICU_AT_HOME_DELIVERABLES_HEADING}</h2></div>
              
              <div className="basic-care-v2__who-model-intro">
                <div className="basic-care-v2__who-model-copy" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ textAlign: 'center', margin: 0 }}>
                    {ICU_AT_HOME_DELIVERABLES_INTRO}
                  </p>
                </div>
                <div className="basic-care-v2__who-model-image">
                  <Image src="/images/icu-at-home/pik-6.png" alt="Clinical setup of home ICU deliverables" fill sizes="(max-width: 768px) 100vw, 240px" style={{ objectFit: 'cover' }} />
                </div>
              </div>

              <div className="basic-care-v2__deliverables-model-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {ICU_AT_HOME_DELIVERABLES.map((item, idx) => (
                  <article className="basic-care-v2__deliverables-model-card" key={idx} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '120px' }}>
                    <span className="basic-care-v2__deliverables-model-icon"><SiteIcon name={item.icon} size={22} /></span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{item.title}</h3>
                  </article>
                ))}
              </div>
              <div className="basic-care-v2__deliverables-model-action" style={{ marginTop: '3rem' }}>
                <Link href="#icu-at-home-form" className="btn btn--primary btn--lg">Book ICU @ Home</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Selector Section */}
        <section className="section" id="basic-care-packages">
          <div className="container">
            <div className="section__header basic-care-v2__packages-header">
              <h2>{ICU_AT_HOME_PACKAGES_HEADING}</h2>
              <p>{ICU_AT_HOME_PACKAGES_INTRO}</p>
            </div>
            <IcuCarePackageSelector />
          </div>
        </section>

        {/* Trust Section */}
        <section className="section section--alt baby-trust-section basic-care-v2__trust">
          <div className="container">
            <div className="section__header basic-care-v2__trust-header">
              <h2>{ICU_AT_HOME_TRUST_HEADING}</h2>
              <p>{ICU_AT_HOME_TRUST_INTRO}</p>
            </div>
            <div className="baby-trust-orbit icu-trust-orbit">
              <div className="baby-trust-visual">
                <span className="baby-trust-visual__ring" aria-hidden="true" />
                <div className="baby-trust-visual__image">
                  <Image src="/images/icu-at-home/pik-2.png" alt="Continuous remote tele-ICU setup in Chennai" fill sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 350px" style={{ objectFit: 'cover' }} />
                </div>
                <div className="baby-trust-visual__badge"><SiteIcon name="Safety shield" size={19} /><span>Replicated ICU standards</span></div>
              </div>
              {ICU_AT_HOME_TRUST_POINTS.map((item, index) => {
                const [title, description] = item.text.includes(' - ')
                  ? item.text.split(' - ')
                  : item.text.includes(': ')
                    ? item.text.split(': ')
                    : [item.text, ''];

                return (
                  <article className={`baby-trust-card baby-trust-card--${index + 1}`} key={title} style={{ '--baby-trust-order': index } as CSSProperties}>
                    <div className="baby-trust-card__icon"><SiteIcon name={item.icon} size={22} /></div>
                    <div><h3>{title}</h3><p>{description}</p></div>
                  </article>
                );
              })}
            </div>


            <div className="basic-care-v2__trust-action" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <Link href="#icu-at-home-form" className="btn btn--primary btn--lg">Book ICU @ Home</Link>
            </div>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="section section--alt" id="basic-care-faq">
          <div className="container">
            <div className="section__header">
              <h2>FAQs</h2>
            </div>
            <FAQAccordion faqs={ICU_AT_HOME_FAQS} />
          </div>
        </section>

        {/* Educational Resources / Blogs Section */}
        <section className="section basic-care-v2__blogs" id="basic-care-blogs">
          <div className="container">
            <GatedDownloadResources
              heading="Learn & Prepare — Free Resources for Families"
              intro={(
                <>
                  <p>{ICU_AT_HOME_RESOURCE_COPY}</p>
                </>
              )}
              image="/images/icu-at-home/pik-10.png"
              imageAlt="ICU at home guidebooks and setup checklists"
              modalDescription="Fill out these details to download your copy of the ICU at Home Guide."
              downloadFallbackName="icu-at-home-guide.pdf"
              downloadButtonLabel="Download Guide"
              downloads={ICU_AT_HOME_DOWNLOADS}
              resources={ICU_AT_HOME_RESOURCES}
            />

            {/* Custom CTA strip requested by user */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 500px', border: '1px solid #ff6b35', borderRadius: '12px', padding: '1.25rem 2rem', backgroundColor: '#fff' }}>
                <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.1rem', color: '#101010', fontWeight: 500 }}>
                  Plan safe ICU care at home with expert tips, cost insights, and safety checklists
                </p>
              </div>
              <div style={{ flex: '0 0 auto', minWidth: '260px' }}>
                <Link href="#icu-at-home-form" className="btn btn--primary btn--lg" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', minHeight: '60px', alignItems: 'center' }}>
                  Book ICU @ Home
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Strip */}
        <section className="cta-strip baby-final-cta">
          <div className="container baby-final-cta__grid">
            <div>
              <h2>{ICU_AT_HOME_FINAL_CTA.heading}</h2>
              <p>{ICU_AT_HOME_FINAL_CTA.body} {ICU_AT_HOME_FINAL_CTA.note}</p>
              <div className="cta-strip__badges">
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Ventilator Care</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Cardiac Monitoring</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> ICU Bed & Air Mattress</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> ICU-Trained Nurses</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Tele-ICU Dashboard</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Emergency Backup</span>
              </div>
            </div>
            <CTAForm title="Book ICU @ Home" packageOptions={ICU_AT_HOME_PACKAGE_NAMES} />
          </div>
        </section>
      </main>
    </>
  );
}
