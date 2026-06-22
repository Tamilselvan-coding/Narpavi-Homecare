import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { EQUIPMENT_ITEMS } from '@/lib/equipment';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'Medical Equipment Rental & Sales — Narpavi Homecare',
  description: 'Rent or buy hospital-grade medical equipment at home. BiPAP, CPAP, oxygen cylinders, hospital beds, monitors, wheelchairs and more.',
  keywords: ['medical equipment rental chennai', 'buy medical equipment home', 'bipap rental chennai', 'hospital bed rental'],
  alternates: { canonical: 'https://www.narpavihomecare.com/medical-equipment' },
};

const TRUST_ITEMS = [
  { title: 'Sanitized Devices', copy: 'Cleaned and checked before dispatch', icon: 'Sanitized Equipment' },
  { title: 'Home Delivery', copy: 'Fast setup coordination across Chennai', icon: 'Fast Delivery' },
  { title: 'Usage Guidance', copy: 'Technician demo for family and caregivers', icon: 'Professional Support' },
  { title: 'Flexible Plans', copy: 'Rental and purchase options available', icon: 'Flexible Schedule' },
];

const PROCESS = [
  { title: 'Share Requirement', copy: 'Tell us the device, patient condition and location.' },
  { title: 'Confirm Availability', copy: 'Our team checks model, rental duration and accessories.' },
  { title: 'Deliver & Setup', copy: 'Equipment is delivered with basic usage guidance.' },
  { title: 'Ongoing Support', copy: 'Get help for replacement, refill or accessory needs.' },
];

export default function MedicalEquipmentHub() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Medical Equipment' }]} />

      <section className="equipment-hub-hero">
        <div className="container equipment-hub-hero__grid">
          <div>
            <div className="equipment-hero__eyebrow">
              <SiteIcon name="Medical Equipment" size={17} /> Home Recovery Equipment
            </div>
            <h1 className="equipment-hero__title">
              Medical Equipment <span>Rental & Sales</span>
            </h1>
            <p className="equipment-hero__copy">
              Rent or buy hospital-grade devices for safe home recovery. We help families arrange respiratory support, patient monitoring, hospital cots, mobility aids and bedside care equipment with clean delivery and setup guidance.
            </p>
            <div className="equipment-hero__actions">
              <a href={BRAND.phoneHref} className="btn btn--secondary btn--lg">
                <SiteIcon name="Phone" size={18} /> Call {BRAND.phone}
              </a>
              <Link href="/contact" className="btn btn--primary btn--lg">
                Request Equipment <SiteIcon name="Arrow" size={18} />
              </Link>
            </div>
            <div className="equipment-hero__facts">
              <span><SiteIcon name="Check" size={16} /> Rental & purchase</span>
              <span><SiteIcon name="Check" size={16} /> Chennai delivery</span>
              <span><SiteIcon name="Check" size={16} /> Technician guidance</span>
            </div>
          </div>
          <CTAForm title="Inquire for Medical Equipment" />
        </div>
      </section>

      <section className="equipment-trust-strip" aria-label="Medical equipment assurances">
        <div className="container equipment-trust-strip__grid">
          {TRUST_ITEMS.map((item) => (
            <div className="equipment-trust-strip__item" key={item.title}>
              <SiteIcon name={item.icon} size={25} />
              <div>
                <strong>{item.title}</strong>
                <small>{item.copy}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="equipment-catalog">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Product catalogue</span>
            <h2>Choose Equipment by Care Need</h2>
            <p>Every menu item now opens a dedicated landing page with options, use cases, key features and enquiry form.</p>
          </div>
          <div className="equipment-catalog-grid">
            {EQUIPMENT_ITEMS.map((eq) => (
              <Link href={`/medical-equipment/${eq.slug}`} className="equipment-catalog-card" key={eq.slug}>
                <div className="equipment-catalog-card__icon">
                  <SiteIcon name={eq.shortTitle} size={30} />
                </div>
                <span>{eq.category}</span>
                <h3>{eq.shortTitle}</h3>
                <p>{eq.desc}</p>
                <strong>View landing page <SiteIcon name="Arrow" size={16} /></strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Simple process</span>
            <h2>How Equipment Booking Works</h2>
            <p>Quick coordination for urgent home care needs without confusing back-and-forth.</p>
          </div>
          <div className="equipment-process-grid">
            {PROCESS.map((step, index) => (
              <div className="equipment-process-card" key={step.title}>
                <div className="equipment-process-card__number">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="container">
          <h2>Need Equipment Today?</h2>
          <p>Call Narpavi Homecare and our team will help you pick the correct device, rental duration and delivery plan.</p>
          <div className="equipment-hero__actions equipment-hero__actions--center">
            <a href={BRAND.phoneHref} className="btn btn--white btn--lg">
              <SiteIcon name="Phone" size={18} /> {BRAND.phone}
            </a>
            <Link href="/contact" className="btn btn--outline btn--lg equipment-cta-outline">
              Send Enquiry <SiteIcon name="Arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
