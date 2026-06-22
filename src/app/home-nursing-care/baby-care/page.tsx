import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  BABY_CARE_BENEFITS,
  BABY_CARE_DELIVERABLES,
  BABY_CARE_DOWNLOADS,
  BABY_CARE_FAQS,
  BABY_CARE_PACKAGE_NAMES,
  BABY_CARE_PACKAGES,
  BABY_CARE_RESOURCES,
  BABY_CARE_TRUST_POINTS,
  BABY_CARE_WHO,
  type BabyCarePackage,
} from '@/lib/babyCareData';
import { getFaqSchema, getItemListSchema, getServiceSchema, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import FAQAccordion from '@/components/sections/FAQAccordion';
import GatedDownloadResources from '@/components/sections/GatedDownloadResources';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'Expert New Born Baby Care at Home - Narpavi Homecare',
  description: 'Professional baby care at home for newborn routines, feeding, hygiene, night care, mother recovery, twin care and NICU-level support.',
  keywords: [
    'baby care at home chennai',
    'newborn baby care',
    'postnatal mother care',
    'night baby care chennai',
    'premature baby care at home',
  ],
  alternates: { canonical: 'https://www.narpavihomecare.com/baby-care' },
};

function packageStyle(pkg: BabyCarePackage) {
  return {
    '--package-color': pkg.color,
    '--package-gradient': pkg.gradient,
  } as CSSProperties;
}

export default function BabyCarePage() {
  const schemas = [
    getWebPageSchema({
      title: 'Expert New Born Baby Care at Home',
      description: 'Professional newborn baby care at home with feeding support, hygiene routines, night care, mother recovery and NICU-level support.',
      path: '/baby-care',
    }),
    getServiceSchema({
      name: 'Baby Care at Home',
      description: 'Safe, hygienic and compassionate baby care at home for newborns, infants, postnatal mothers, twins and premature babies.',
      path: '/baby-care',
      serviceType: 'Baby care at home',
    }),
    getItemListSchema('Baby Care Packages', BABY_CARE_PACKAGES.map((pkg) => ({ name: pkg.name, path: pkg.href }))),
    getFaqSchema(BABY_CARE_FAQS),
  ];

  return (
    <>
      <StructuredDataScript data={schemas} />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Home Nursing Care', href: '/home-nursing-care' },
        { label: 'Baby Care' },
      ]} />

      <section className="baby-hero" id="baby-care-form">
        <div className="container baby-hero__grid">
          <div className="baby-hero__content">
            <div className="hero__badge"><SiteIcon name="Baby Care" size={16} /> Newborn & Mother Postnatal Support</div>
            <h1>Expert New Born <span>Baby Care</span> at Home</h1>
            <p>
              Professional baby care at home for newborn feeding, hygiene, sleep routines, mother recovery, twin care, and NICU-level support.
            </p>
            <div className="baby-hero__actions">
              <a href="#baby-care-packages" className="btn btn--outline btn--lg">View Packages <SiteIcon name="Arrow" size={18} /></a>
            </div>
          </div>
          <div className="baby-hero__visual">
            <Image src="/images/baby-care/pik-1.png" alt="Newborn baby care at home" fill sizes="(max-width: 992px) 100vw, 42vw" priority />
          </div>
          <CTAForm title="Book Baby Care Assessment" packageOptions={BABY_CARE_PACKAGE_NAMES} />
        </div>
      </section>

      <section className="section" id="baby-care-summary">
        <div className="container baby-summary">
          <div className="baby-image-panel">
            <Image src="/images/baby-care/pik-2.png" alt="Compassionate baby care at home" fill sizes="(max-width: 992px) 100vw, 38vw" />
          </div>
          <div>
            <span className="section-kicker">Compassionate Baby Care</span>
            <h2>Compassionate Baby Care at Home</h2>
            <p>
              Welcoming a newborn brings profound joy and equally profound adjustments. At Narpavi Homecare, we deliver professional baby care at home, providing nurturing support for both infants and new mothers.
            </p>
            <p>
              From newborn feeding and hygiene routines to postpartum recovery and NICU-level care, our caregivers and nurses help your family thrive in the comfort and safety of home.
            </p>
            <Link href="#baby-care-form" className="btn btn--primary btn--lg">Book a Baby Care Consultation <SiteIcon name="Arrow" size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="baby-care-benefits">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Benefits</span>
            <h2>Benefits of Taking Baby Care</h2>
            <p>Safe home support helps the mother recover, the baby settle into a healthy routine, and the family breathe a little easier.</p>
          </div>
          <div className="baby-benefit-grid">
            {BABY_CARE_BENEFITS.map((group) => (
              <article className="baby-benefit-card" key={group.title}>
                <div><SiteIcon name={group.icon} size={28} /></div>
                <h3>{group.title}</h3>
                <ul>
                  {group.points.map((point) => (
                    <li key={point}><SiteIcon name="Check" size={15} /> {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section baby-deliverables-section" id="baby-care-deliverables">
        <div className="container baby-deliverables">
          <div className="section__header baby-deliverables__header">
            <span className="section-kicker">Deliverables</span>
            <h2>Comprehensive Baby Care Deliverables</h2>
            <p>Every care plan is built around baby safety, mother comfort, routine stability, and clear family communication.</p>
          </div>

          <div className="baby-deliverables-orbit">
            <div className="baby-deliverables-visual">
              <span className="baby-deliverables-visual__ring" aria-hidden="true" />
              <div className="baby-deliverables-visual__image">
                <Image
                  src="/images/baby-care/pik-3.jpg"
                  alt="Baby care deliverables by trained caregiver"
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 340px"
                />
              </div>
              <div className="baby-deliverables-visual__badge">
                <SiteIcon name="Newborn baby care" size={19} />
                <span>Complete mother and baby support</span>
              </div>
            </div>

            {BABY_CARE_DELIVERABLES.map((item, index) => (
              <article
                className={`baby-deliverable-card baby-deliverable-card--${index + 1}`}
                key={item.title}
                style={{ '--baby-deliverable-order': index } as CSSProperties}
              >
                <div className="baby-deliverable-card__icon">
                  <SiteIcon name={item.icon} size={22} />
                </div>
                <div>
                  <span className="baby-deliverable-card__eyebrow">Care {String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt baby-who-section" id="baby-care-who">
        <div className="container baby-who">
          <div className="section__header baby-who__header">
            <span className="section-kicker">Who we care for</span>
            <h2>Support for Every Parent Stage</h2>
            <p>Every parent&apos;s needs are unique and change with their situation and stage of maternal life. These are the families we commonly support.</p>
          </div>

          <div className="baby-who-orbit">
            <div className="baby-who-visual">
              <span className="baby-who-visual__ring" aria-hidden="true" />
              <div className="baby-who-visual__image">
                <Image
                  src="/images/baby-care/pik-4.jpeg"
                  alt="Parents receiving newborn baby care support"
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 340px"
                />
              </div>
              <div className="baby-who-visual__badge">
                <SiteIcon name="Family baby care" size={19} />
                <span>Care that grows with your family</span>
              </div>
            </div>

            {BABY_CARE_WHO.map((item, index) => (
              <article
                className={`baby-who-card baby-who-card--${index + 1}`}
                key={item}
                style={{ '--baby-who-order': index } as CSSProperties}
              >
                <div className="baby-who-card__icon">
                  <SiteIcon name="Family baby care" size={20} />
                </div>
                <div>
                  <span className="baby-who-card__eyebrow">Support {String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="baby-care-packages">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Packages</span>
            <h2>Choose the Perfect Package for Your Baby</h2>
            <p>Every baby and mother has unique needs that change with time. These packages support newborns, infants and postnatal mothers with safe, hygienic and compassionate care at home.</p>
          </div>
          <div className="elder-packages-layout">
            <aside className="elder-sidebar" aria-label="Baby care package navigation">
              <h3>Packages</h3>
              {BABY_CARE_PACKAGES.map((pkg) => (
                <a href={`#package-${pkg.id}`} className="elder-sidebar__link" key={pkg.id} style={packageStyle(pkg)}>
                  <span><SiteIcon name={pkg.icon} size={19} /></span>
                  <strong>{pkg.name}</strong>
                  <small>{pkg.tagline}</small>
                </a>
              ))}
            </aside>

            <div className="elder-package-list">
              {BABY_CARE_PACKAGES.map((pkg) => (
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
                      <Image src={pkg.image} alt={`${pkg.name} baby care package`} fill sizes="(max-width: 992px) 100vw, 28vw" />
                    </div>
                    <div>
                      <h4>Ideal For</h4>
                      <div className="elder-tag-list">
                        {pkg.idealFor.map((item) => <span key={item}>{item}</span>)}
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
                        <Link href={`${pkg.href}#baby-package-form`} className="btn btn--primary btn--sm">Book Now</Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="text-center mt-4">
            <Link href="#baby-care-form" className="btn btn--secondary btn--lg">Enquire Now <SiteIcon name="Arrow" size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section section--alt baby-trust-section" id="baby-care-trust">
        <div className="container baby-trust">
          <div className="section__header baby-trust__header">
            <span className="section-kicker">Why families trust Narpavi</span>
            <h2>Your Baby&apos;s Safety Is Our Priority</h2>
            <p>Bringing someone into your home to care for your newborn is a big decision. Every Narpavi Homecare caregiver and nurse is vetted, trained, and supported by strict clinical standards.</p>
          </div>

          <div className="baby-trust-orbit">
            <div className="baby-trust-visual">
              <span className="baby-trust-visual__ring" aria-hidden="true" />
              <div className="baby-trust-visual__image">
                <Image
                  src="/images/baby-care/pik-5.png"
                  alt="Trusted baby care safety protocols"
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 350px"
                />
              </div>
              <div className="baby-trust-visual__badge">
                <SiteIcon name="Safety shield" size={19} />
                <span>Safety-led care at every step</span>
              </div>
            </div>

            {BABY_CARE_TRUST_POINTS.map((item, index) => (
              <article
                className={`baby-trust-card baby-trust-card--${index + 1}`}
                key={item.title}
                style={{ '--baby-trust-order': index } as CSSProperties}
              >
                <div className="baby-trust-card__icon">
                  <SiteIcon name={item.icon} size={22} />
                </div>
                <div>
                  <span className="baby-trust-card__eyebrow">Trust {String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="baby-care-faq">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">FAQs</span>
            <h2>Frequently Asked Questions</h2>
            <p>Clear answers about newborn care, overnight support, premature baby care, feeding, hygiene, and booking.</p>
          </div>
          <FAQAccordion faqs={BABY_CARE_FAQS} />
        </div>
      </section>

      <section className="section section--alt" id="baby-care-blogs">
        <div className="container">
          <GatedDownloadResources
            heading="Blogs & Helpful Guides for New Parents"
            intro={(
              <>
                <p>Becoming a parent comes with many questions. Our experts share practical tips and reliable information to help you feel confident at home.</p>
                <p>It&apos;s a <strong>must-have resource</strong> for families looking for safe and reliable Baby Care.</p>
              </>
            )}
            image="/images/baby-care/pik-11.png"
            imageAlt="Baby care guides for new parents"
            modalDescription="Fill these details to download the baby care guide."
            downloadFallbackName="baby-care-guide.docx"
            downloads={BABY_CARE_DOWNLOADS}
            resources={BABY_CARE_RESOURCES}
          />
        </div>
      </section>

      <section className="cta-strip baby-final-cta">
        <div className="container baby-final-cta__grid">
          <div>
            <h2>Ready to Give Your Baby the Safest Start at Home?</h2>
            <p>Professional baby care ranging from newborn essentials to advanced NICU-level support, planned around your baby&apos;s needs and family routine.</p>
            <div className="cta-strip__badges">
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Newborn routines</span>
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Night care</span>
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Mother recovery</span>
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> NICU-level support</span>
            </div>
          </div>
          <CTAForm title="Book Baby Care Consultation" packageOptions={BABY_CARE_PACKAGE_NAMES} />
        </div>
      </section>
    </>
  );
}
