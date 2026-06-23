import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import { BRAND } from '@/lib/constants';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'Contact Us — Book Care Assessment',
  description: `Book a professional nursing care assessment. Get professional home healthcare started within 24–48 hours. Call ${BRAND.phone}.`,
  alternates: { canonical: 'https://www.narpavihomecare.com/contact' },
};

const contactOptions = [
  {
    icon: 'Phone',
    label: 'Call our care desk',
    value: BRAND.phoneFormatted,
    detail: 'Talk to a care coordinator for immediate guidance.',
    href: BRAND.phoneHref,
    external: false,
  },
  {
    icon: 'WhatsApp',
    label: 'Message on WhatsApp',
    value: 'Start a quick conversation',
    detail: 'Share your care requirement whenever it is convenient.',
    href: BRAND.whatsapp,
    external: true,
  },
  {
    icon: 'Email',
    label: 'Write to our team',
    value: BRAND.email,
    detail: 'Useful for detailed enquiries and partnership requests.',
    href: `mailto:${BRAND.email}`,
    external: false,
  },
] as const;

const careJourney = [
  {
    number: '01',
    icon: 'Phone',
    title: 'Tell us what you need',
    copy: 'Share the patient’s needs, preferred timing, location and the kind of support you are exploring.',
  },
  {
    number: '02',
    icon: 'Nursing',
    title: 'Get a thoughtful assessment',
    copy: 'Our coordinator helps identify the right level of nursing care and the practical next steps.',
  },
  {
    number: '03',
    icon: 'Calendar',
    title: 'Plan care with confidence',
    copy: 'We work with you on a suitable start date, schedule and clear communication for your family.',
  },
] as const;

const supportAreas = [
  { icon: 'Nursing', title: 'Nursing care at home', copy: 'Professional support for clinical and recovery needs at home.' },
  { icon: 'Elder', title: 'Elder care', copy: 'Reliable day-to-day assistance and compassionate companionship.' },
  { icon: 'Baby', title: 'Mother & baby care', copy: 'Support for newborn routines and postnatal recovery.' },
  { icon: 'ICU', title: 'Advanced & ICU care', copy: 'Help coordinating higher-acuity care and equipment needs.' },
  { icon: 'Equipment', title: 'Medical equipment', copy: 'Guidance for equipment enquiries, rentals and home setup.' },
  { icon: 'Family', title: 'Family support', copy: 'Clear updates and practical help for families near or far.' },
] as const;

const faqs = [
  {
    question: 'How soon can home care be arranged?',
    answer: 'After understanding your requirement, our team will guide you on the earliest suitable start date. Timelines can vary based on the care level, location and shift preference.',
  },
  {
    question: 'What should I share when I contact you?',
    answer: 'A short note on the patient’s need, location, preferred start date and expected shift is enough to begin. Our care coordinator will ask for any further details respectfully.',
  },
  {
    question: 'Can I enquire for medical equipment too?',
    answer: 'Yes. You can call, WhatsApp or use the assessment form to tell us the equipment you need. We will guide you on availability and the next steps.',
  },
  {
    question: 'Is this number for medical emergencies?',
    answer: 'No. For a medical emergency, please contact your local emergency service or go to the nearest hospital. Our team can help with planned home-care enquiries and coordination.',
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />

      <main className="contact-page">
        <section className="contact-hero">
          <div className="container contact-hero__grid">
            <div className="contact-hero__content">
              <div className="contact-hero__eyebrow">
                <span className="contact-hero__eyebrow-icon"><SiteIcon name="Companion" size={16} /></span>
                Care starts with a conversation
              </div>
              <h1>Let’s find the right care for your family.</h1>
              <p className="contact-hero__lead">
                Whether you are planning recovery support, looking after an elder, or arranging advanced care at home,
                our care coordinators are here to listen and guide you.
              </p>

              <div className="contact-hero__promises" aria-label="Care enquiry benefits">
                <span><SiteIcon name="Check" size={17} /> Personalised care guidance</span>
                <span><SiteIcon name="Check" size={17} /> Chennai-based support team</span>
                <span><SiteIcon name="Check" size={17} /> Clear next steps for your family</span>
              </div>

              <div className="contact-channel-list">
                {contactOptions.map((option) => (
                  <a
                    className="contact-channel"
                    href={option.href}
                    key={option.label}
                    target={option.external ? '_blank' : undefined}
                    rel={option.external ? 'noopener noreferrer' : undefined}
                  >
                    <span className="contact-channel__icon"><SiteIcon name={option.icon} size={22} /></span>
                    <span className="contact-channel__body">
                      <small>{option.label}</small>
                      <strong>{option.value}</strong>
                      <span>{option.detail}</span>
                    </span>
                    <SiteIcon name="Arrow" size={18} className="contact-channel__arrow" />
                  </a>
                ))}
              </div>

              <div className="contact-location">
                <SiteIcon name="Location" size={19} />
                <span><strong>Serving families from</strong> {BRAND.address}</span>
              </div>
            </div>

            <aside className="contact-form-shell" aria-label="Book a care assessment">
              <div className="contact-form-shell__top">
                <span className="contact-form-shell__pulse" aria-hidden="true" />
                Usually responds during care-desk hours
              </div>
              <CTAForm title="Book a Care Assessment" />
              <p className="contact-form-shell__note">
                <SiteIcon name="Shield" size={16} /> Your enquiry is handled with care and kept private.
              </p>
            </aside>
          </div>
        </section>

        <section className="contact-section contact-section--journey">
          <div className="container">
            <div className="contact-section-heading">
              <span className="section-kicker">Simple, supportive process</span>
              <h2>What happens after you reach out</h2>
              <p>There is no maze of forms or guesswork. We begin by understanding your family’s situation.</p>
            </div>
            <div className="contact-journey-grid">
              {careJourney.map((step) => (
                <article className="contact-journey-card" key={step.number}>
                  <span className="contact-journey-card__number">{step.number}</span>
                  <span className="contact-journey-card__icon"><SiteIcon name={step.icon} size={24} /></span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section contact-section--areas">
          <div className="container contact-areas__grid">
            <div className="contact-areas__intro">
              <span className="section-kicker">One team, many care needs</span>
              <h2>Tell us where you need support.</h2>
              <p>
                You do not need to know the exact service before getting in touch. Describe what is happening, and
                we will help you explore an appropriate care option.
              </p>
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
                <SiteIcon name="WhatsApp" size={18} /> Chat on WhatsApp
              </a>
            </div>
            <div className="contact-support-grid">
              {supportAreas.map((area) => (
                <article className="contact-support-card" key={area.title}>
                  <span className="contact-support-card__icon"><SiteIcon name={area.icon} size={22} /></span>
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section contact-faq">
          <div className="container contact-faq__grid">
            <div className="contact-faq__intro">
              <span className="section-kicker">Helpful before you call</span>
              <h2>Frequently asked questions</h2>
              <p>Still deciding? These quick answers make it easier to take the first step.</p>
              <a href={BRAND.phoneHref} className="contact-faq__call-link"><SiteIcon name="Phone" size={18} /> {BRAND.phoneFormatted}</a>
            </div>
            <div className="contact-faq__list">
              {faqs.map((faq) => (
                <details className="contact-faq__item" key={faq.question}>
                  <summary>{faq.question}<SiteIcon name="Plus" size={19} /></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-final-cta">
          <div className="container contact-final-cta__inner">
            <div>
              <span className="section-kicker">We’re ready when you are</span>
              <h2>A little clarity can make care feel lighter.</h2>
              <p>Call or message Narpavi Homecare to discuss the support your family needs.</p>
            </div>
            <div className="contact-final-cta__actions">
              <a href={BRAND.phoneHref} className="btn btn--white"><SiteIcon name="Phone" size={18} /> Call now</a>
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-final-cta__whatsapp">
                <SiteIcon name="WhatsApp" size={19} /> WhatsApp us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
