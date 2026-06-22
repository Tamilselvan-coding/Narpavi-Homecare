import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
  title: 'Elder Care Services - Narpavi Homecare',
  description: 'Professional elder care services with senior companionship, post-hospital recovery, dementia support, bedridden care, nurse oversight, and daily family updates.',
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
      title: 'Elder Care Services',
      description: 'Nurse-supervised elder care for senior companionship, post-hospital recovery, dementia support, chronic illness routines, and bedridden comfort care.',
      path: '/elder-care',
    }),
    getServiceSchema({
      name: 'Elder Care Services',
      description: 'Safe, dignified, personalized elder care at home with verified caregivers, nurse oversight, family updates, and package-based care plans.',
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

      <section className="elder-main-hero" id="elder-care-hero">
        <div className="container elder-main-hero__grid">
          <div className="elder-main-hero__content">
            <div className="hero__badge">
              <SiteIcon name="Elder Care" size={16} /> Trusted Elder Care
            </div>
            <h1 className="hero__title">
              Professional <span>Elder Care Services</span> at Home
            </h1>
            <p className="hero__subtitle">
              Safe, dignified, and personalized support that helps seniors remain comfortable, connected, and cared for in familiar surroundings.
            </p>
            <div className="elder-main-hero__actions">
              <a href="#elder-packages" className="btn btn--outline btn--lg">
                View Packages <SiteIcon name="Arrow" size={18} />
              </a>
            </div>
          </div>
          <div className="elder-main-hero__visual">
            <Image
              src="/images/elder-care/pik-1.png"
              alt="Professional elder care support at home"
              fill
              sizes="(max-width: 992px) 100vw, 34vw"
              priority
            />
          </div>
          <CTAForm title="Book Elder Care Assessment" packageOptions={ELDER_CARE_PACKAGE_NAMES} />
        </div>
      </section>

      <section className="section" id="elder-summary">
        <div className="container elder-summary-grid">
          <div className="elder-image-panel">
            <Image
              src="/images/elder-care/pik-3.png"
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
              Book Your Elder Care Assessment <SiteIcon name="Arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--alt elder-trust-section" id="elder-safety">
        <div className="container elder-orbit-shell">
          <div className="section__header elder-orbit-header">
            <span className="section-kicker">Safety and trust</span>
            <h2>Your Parent&apos;s Safety Stays Visible Every Day</h2>
            <p>Every elder care plan is built around practical prevention, respectful support, and transparent family communication.</p>
          </div>

          <div className="elder-trust-orbit">
            <div className="elder-orbit-visual elder-orbit-visual--trust">
              <span className="elder-orbit-visual__ring" aria-hidden="true" />
              <div className="elder-orbit-visual__image">
                <Image
                  src="/images/elder-care/pik-2.jpg"
                  alt="Senior safety and nurse-led care oversight"
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 350px"
                />
              </div>
              <div className="elder-orbit-visual__badge">
                <SiteIcon name="Safety shield" size={19} />
                <span>Visible safety and family updates</span>
              </div>
            </div>

            {ELDER_CARE_SAFETY_POINTS.map((item, index) => (
              <article
                className={`elder-orbit-card elder-trust-card--${index + 1}`}
                key={item.title}
                style={{ '--elder-orbit-order': index } as CSSProperties}
              >
                <div className="elder-orbit-card__icon"><SiteIcon name={item.icon} size={22} /></div>
                <div>
                  <span className="elder-orbit-card__eyebrow">Safety {String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section elder-who-section" id="elder-who-needs">
        <div className="container elder-orbit-shell">
          <div className="section__header elder-orbit-header">
            <span className="section-kicker">Who needs elder care</span>
            <h2>Support for Every Senior Care Situation</h2>
            <p>Care plans adapt to the senior&apos;s independence, recovery needs, health routines, cognition, mobility, and family support.</p>
          </div>

          <div className="elder-who-orbit">
            <div className="elder-orbit-visual elder-orbit-visual--who">
              <span className="elder-orbit-visual__ring" aria-hidden="true" />
              <div className="elder-orbit-visual__image">
                <Image
                  src="/images/elder-care/pik-4.png"
                  alt="Personalized support for different senior care situations"
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 350px"
                />
              </div>
              <div className="elder-orbit-visual__badge">
                <SiteIcon name="Elder companion" size={19} />
                <span>Care matched to each senior</span>
              </div>
            </div>

            {ELDER_CARE_WHO_NEEDS.map((item, index) => (
              <article
                className={`elder-orbit-card elder-who-card--${index + 1}`}
                key={item.title}
                style={{ '--elder-orbit-order': index } as CSSProperties}
              >
                <div className="elder-orbit-card__icon"><SiteIcon name={item.icon} size={22} /></div>
                <div>
                  <span className="elder-orbit-card__eyebrow">Support {String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
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

      <section className="section section--alt elder-deliverables-section" id="elder-deliverables">
        <div className="container elder-orbit-shell">
          <div className="section__header elder-orbit-header">
            <span className="section-kicker">What is included</span>
            <h2>Comprehensive Elder Care Deliverables</h2>
            <p>Families receive practical support, visible reporting, and calm routines that protect dignity at home.</p>
          </div>

          <div className="elder-deliverables-orbit">
            <div className="elder-orbit-visual elder-orbit-visual--deliverables">
              <span className="elder-orbit-visual__ring" aria-hidden="true" />
              <div className="elder-orbit-visual__image">
                <Image
                  src="/images/elder-care/pik-5.png"
                  alt="Comprehensive elder care support at home"
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 350px"
                />
              </div>
              <div className="elder-orbit-visual__badge">
                <SiteIcon name="Family care report" size={19} />
                <span>Complete daily care support</span>
              </div>
            </div>

            {ELDER_CARE_DELIVERABLES.map((item, index) => (
              <article
                className={`elder-orbit-card elder-deliverable-orbit-card--${index + 1}`}
                key={item.title}
                style={{ '--elder-orbit-order': index } as CSSProperties}
              >
                <div className="elder-orbit-card__icon"><SiteIcon name={item.icon} size={22} /></div>
                <div>
                  <span className="elder-orbit-card__eyebrow">Care {String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section elder-journey-section" id="elder-onboarding">
        <div className="container">
          <div className="section__header elder-journey__header">
            <span className="section-kicker">How it works</span>
            <h2>A Clear Care Journey for Families</h2>
            <p>From understanding the need to reviewing ongoing care, every stage stays practical, visible, and family-friendly.</p>
          </div>

          <div className="elder-journey">
            <div className="elder-journey__track" aria-hidden="true">
              <span />
            </div>
            {ELDER_CARE_ONBOARDING_STEPS.map((step, index) => (
              <article
                className={`elder-journey__step elder-journey__step--${index + 1}`}
                key={step.title}
                style={{ '--journey-order': index } as CSSProperties}
              >
                <div className="elder-journey__milestone">
                  <div className="elder-journey__number">{String(index + 1).padStart(2, '0')}</div>
                  <SiteIcon
                    name={index === 0 ? 'Assessment report' : index === 1 ? 'Personalized care plan' : index === 2 ? 'Verified caregiver' : index === 3 ? 'Home care' : 'Monitoring report'}
                    size={23}
                  />
                </div>
                <div className="elder-journey__card">
                  <span>{step.timeline}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="elder-faq">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">FAQs</span>
            <h2>Elder Care Questions Families Ask</h2>
            <p>Clear answers for families arranging safe care for parents and grandparents.</p>
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

      <section className="section elder-components-section" id="elder-components">
        <div className="container elder-components-shell">
          <div className="section__header elder-components-header">
            <span className="section-kicker">Complete care components</span>
            <h2>Everything Elder Care Can Cover</h2>
            <p>Each care plan is assembled from these practical components based on the senior&apos;s condition, dependency level, and family expectations.</p>
            <div className="elder-components-summary">
              <span><strong>{ELDER_CARE_COMPONENTS.length}</strong> essential care areas</span>
              <span><SiteIcon name="Personalized care plan" size={18} /> One personalized plan</span>
            </div>
          </div>
          <div className="elder-components-grid">
            {ELDER_CARE_COMPONENTS.map((item, index) => (
              <article
                className={`elder-component-card elder-component-card--${index + 1}`}
                key={item.title}
                style={{ '--component-order': index } as CSSProperties}
              >
                <div className="elder-component-card__top">
                  <div className="elder-component-card__icon">
                    <SiteIcon name={item.icon} size={30} />
                  </div>
                  <div className="elder-component-card__number">{String(index + 1).padStart(2, '0')}</div>
                </div>
                <span className="elder-component-card__label">Care area</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="elder-component-card__line" aria-hidden="true" />
              </article>
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
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Professional assessment</span>
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
