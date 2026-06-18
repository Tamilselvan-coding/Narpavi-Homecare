import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import {
  ELDER_CARE_COMPONENTS,
  ELDER_CARE_DELIVERABLES,
  ELDER_CARE_DOWNLOADS,
  ELDER_CARE_FAQS,
  ELDER_CARE_ONBOARDING_STEPS,
  ELDER_CARE_PACKAGES,
  ELDER_CARE_RESOURCES,
  ELDER_CARE_SAFETY_POINTS,
  ELDER_CARE_WHO_NEEDS,
  type ElderCarePackage,
} from '@/lib/elderCareData';
import { getFaqSchema, getItemListSchema, getServiceSchema, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import FAQAccordion from '@/components/sections/FAQAccordion';
import GatedDownloadResources from '@/components/sections/GatedDownloadResources';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'Elder Care Services in Chennai - Narpavi Homecare',
  description: 'Professional elder care services in Chennai with senior companionship, post-hospital recovery, dementia support, bedridden care, nurse oversight, and daily family updates.',
  keywords: ['elder care services chennai', 'senior care at home chennai', 'home care for elderly parents', 'dementia care at home chennai', 'NRI parent care chennai'],
  alternates: { canonical: 'https://www.narpavihomecare.com/elder-care' },
};

function packageStyle(pkg: ElderCarePackage) {
  return {
    '--package-color': pkg.color,
    '--package-gradient': pkg.gradient,
  } as CSSProperties;
}

const ELDER_CARE_PACKAGE_NAMES = ELDER_CARE_PACKAGES.map((pkg) => pkg.name);

export default function ElderCarePage() {
  const pageSchemas = [
    getWebPageSchema({
      title: 'Elder Care Services in Chennai',
      description: 'Nurse-supervised elder care in Chennai for senior companionship, post-hospital recovery, dementia support, chronic illness routines, and bedridden comfort care.',
      path: '/elder-care',
    }),
    getServiceSchema({
      name: 'Elder Care Services in Chennai',
      description: 'Safe, dignified, personalized elder care at home in Chennai with verified caregivers, nurse oversight, family updates, and package-based care plans.',
      path: '/elder-care',
      serviceType: 'Elder care at home',
    }),
    getItemListSchema('Elder Care Packages', ELDER_CARE_PACKAGES.map((pkg) => ({ name: pkg.name, path: pkg.href }))),
    getFaqSchema(ELDER_CARE_FAQS),
  ];

  return (
    <>
      <StructuredDataScript data={pageSchemas} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Elder Care' }]} />

      <section className="hero elder-main-hero" id="elder-care-hero" style={{ marginTop: 0 }}>
        <div className="container elder-main-hero__grid">
          <div className="hero__content">
            <div className="hero__badge">
              <SiteIcon name="Elder Care" size={16} /> Trusted Elder Care in Chennai
            </div>
            <h1 className="hero__title">
              Professional <span>Elder Care Services</span> in Chennai
            </h1>
            <p className="hero__subtitle">
              Safe, dignified, and personalized support for your loved ones - trusted by families and NRIs across Chennai.
            </p>
            <div className="elder-hero__proof">
              <span><SiteIcon name="Verified Caregivers" size={16} /> Verified caregivers</span>
              <span><SiteIcon name="Nurse Oversight" size={16} /> Nurse oversight</span>
              <span><SiteIcon name="Family Updates" size={16} /> Daily updates</span>
            </div>
            <div className="hero__cta-group">
              <a href={BRAND.phoneHref} className="btn btn--secondary btn--lg">
                <SiteIcon name="Phone" size={18} /> Call {BRAND.phone}
              </a>
              <a href="#elder-care-booking" className="btn btn--primary btn--lg">
                Book Assessment <SiteIcon name="Arrow" size={18} />
              </a>
            </div>
          </div>
          <CTAForm title="Book Elder Care Assessment" packageOptions={ELDER_CARE_PACKAGE_NAMES} />
        </div>
      </section>

      <section className="section" id="elder-summary">
        <div className="container elder-summary-grid">
          <div className="elder-image-panel">
            <Image
              src="/images/elder-care/pik-1.png"
              alt="Elder care from Narpavi Homecare"
              fill
              sizes="(max-width: 992px) 100vw, 42vw"
              priority
            />
          </div>
          <div>
            <span className="section-kicker">Executive summary</span>
            <h2>Elder Care from Narpavi Homecare</h2>
            <p>
              Narpavi Homecare provides structured elder care at home for families who want safety, dignity, and dependable daily support without moving their loved one away from familiar surroundings.
            </p>
            <p>
              Our care model combines verified caregivers, nurse-led oversight, hygiene protocols, daily reporting, and clear emergency escalation for Chennai families and NRIs caring for parents from a distance.
            </p>
            <Link href="#elder-care-booking" className="btn btn--primary btn--lg">
              Book Your Free Elder Care Assessment <SiteIcon name="Arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="elder-safety">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Safety and trust</span>
            <h2>Your Parent&apos;s Safety Stays Visible Every Day</h2>
            <p>Every elder care plan is built around practical prevention, respectful support, and transparent family communication.</p>
          </div>

          <div className="elder-safety-layout">
            <div className="elder-safety-grid">
              {ELDER_CARE_SAFETY_POINTS.map((item) => (
                <div className="trust-card" key={item.title}>
                  <div className="trust-card__icon"><SiteIcon name={item.icon} /></div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="elder-image-panel elder-image-panel--compact">
              <Image
                src="/images/elder-care/pik-2.jpg"
                alt="Senior safety and nurse-led care oversight"
                fill
                sizes="(max-width: 992px) 100vw, 34vw"
              />
            </div>
          </div>

          <div className="elder-who-block">
            <div className="section__header">
              <span className="section-kicker">Who needs elder care</span>
              <h2>Support for Every Senior Care Situation</h2>
            </div>
            <div className="elder-who-grid">
              {ELDER_CARE_WHO_NEEDS.map((item) => (
                <div className="care-card" key={item.title}>
                  <div className="care-card__icon"><SiteIcon name={item.icon} size={28} /></div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="elder-packages">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Elder care packages</span>
            <h2>Choose the Right Level of Support</h2>
            <p>Four senior-specific packages help families match daily support to independence, recovery, cognitive needs, or full bedside care.</p>
          </div>

          <div className="elder-packages-layout">
            <aside className="elder-sidebar" aria-label="Elder care package navigation">
              <h3>Packages</h3>
              {ELDER_CARE_PACKAGES.map((pkg) => (
                <a href={`#package-${pkg.id}`} className="elder-sidebar__link" key={pkg.id} style={packageStyle(pkg)}>
                  <span><SiteIcon name={pkg.icon} size={19} /></span>
                  <strong>{pkg.name}</strong>
                  <small>{pkg.tagline}</small>
                </a>
              ))}
            </aside>

            <div className="elder-package-list">
              {ELDER_CARE_PACKAGES.map((pkg) => (
                <article className="elder-package-card" id={`package-${pkg.id}`} key={pkg.id} style={packageStyle(pkg)}>
                  <div className="elder-package-card__header">
                    <div>
                      <div className="elder-package-card__icon"><SiteIcon name={pkg.icon} size={24} /></div>
                      <h3>{pkg.name}</h3>
                      <p>{pkg.tagline}</p>
                    </div>
                    <Link href={pkg.href} className="btn btn--white btn--sm">
                      View Full Details <SiteIcon name="Arrow" size={16} />
                    </Link>
                  </div>
                  <div className="elder-package-card__body">
                    <div className="elder-package-card__media">
                      <Image src={pkg.image} alt={`${pkg.name} elder care package`} fill sizes="(max-width: 992px) 100vw, 28vw" />
                    </div>
                    <div>
                      <h4>Best For</h4>
                      <div className="elder-tag-list">
                        {pkg.bestFor.map((item) => <span key={item}>{item}</span>)}
                      </div>
                      <div className="elder-highlight-list">
                        {pkg.highlights.map((item) => (
                          <div className="elder-highlight-point" key={item.title}>
                            <SiteIcon name="Check" size={18} />
                            <div>
                              <strong>{item.title}</strong>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="elder-package-card__actions">
                        <Link href={pkg.href} className="btn btn--outline btn--sm">Explore Package</Link>
                        <Link href={`${pkg.href}#elder-package-form`} className="btn btn--primary btn--sm">Book Now</Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="elder-deliverables">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">What is included</span>
            <h2>Comprehensive Elder Care Deliverables</h2>
            <p>Families receive practical support, visible reporting, and calm routines that protect dignity at home.</p>
          </div>
          <div className="elder-deliverables-layout">
            <div className="elder-image-panel elder-image-panel--wide">
              <Image src="/images/elder-care/pik-5.png" alt="Elder care personal support at home" fill sizes="(max-width: 992px) 100vw, 38vw" />
            </div>
            <div className="elder-deliverables-grid">
              {ELDER_CARE_DELIVERABLES.map((item) => (
                <div className="elder-deliverable-card" key={item.title}>
                  <div><SiteIcon name={item.icon} size={22} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="elder-onboarding">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">How it works</span>
            <h2>Simple Onboarding for Families</h2>
            <p>From first call to ongoing monitoring, the process is designed to be clear, fast, and family-friendly.</p>
          </div>
          <div className="elder-timeline">
            {ELDER_CARE_ONBOARDING_STEPS.map((step, index) => (
              <div className="elder-timeline__item" key={step.title}>
                <div className="elder-timeline__number">{index + 1}</div>
                <span>{step.timeline}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="elder-faq">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">FAQs</span>
            <h2>Elder Care Questions Families Ask</h2>
            <p>Clear answers for families arranging safe care for parents and grandparents in Chennai.</p>
          </div>
          <FAQAccordion faqs={ELDER_CARE_FAQS} />
        </div>
      </section>

      <section className="section" id="elder-resources">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Resources</span>
            <h2>Blogs and Educative Materials</h2>
            <p>Helpful guides for families planning elder care, recovery support, chronic illness routines, and palliative comfort at home.</p>
          </div>

          <GatedDownloadResources downloads={ELDER_CARE_DOWNLOADS} resources={ELDER_CARE_RESOURCES} />
        </div>
      </section>

      <section className="section section--alt" id="elder-components">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Complete care components</span>
            <h2>Everything Elder Care Can Cover</h2>
            <p>Each care plan is assembled from these practical components based on the senior&apos;s condition, dependency level, and family expectations.</p>
          </div>
          <div className="elder-components-grid">
            {ELDER_CARE_COMPONENTS.map((item, index) => (
              <div className="elder-component-card" key={item.title}>
                <div className="elder-component-card__number">{String(index + 1).padStart(2, '0')}</div>
                <SiteIcon name={item.icon} size={26} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-strip" id="elder-care-booking">
        <div className="container elder-final-cta">
          <div>
            <h2>Ready to Start Safe Elder Care at Home?</h2>
            <p>Tell us your parent&apos;s condition, location, shift need, and family expectations. We will help you choose the right elder care package.</p>
            <div className="cta-strip__badges">
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Free assessment</span>
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Fast onboarding</span>
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> NRI family updates</span>
            </div>
          </div>
          <CTAForm title="Book Elder Care Assessment" packageOptions={ELDER_CARE_PACKAGE_NAMES} />
        </div>
      </section>
    </>
  );
}
