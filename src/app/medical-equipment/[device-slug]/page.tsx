import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BRAND } from '@/lib/constants';
import { EQUIPMENT_ITEMS, getEquipmentItem, getRelatedEquipment } from '@/lib/equipment';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

const TRUST_ITEMS = [
  { title: 'Sanitized', copy: 'Clean handling before delivery', icon: 'Sanitized Equipment' },
  { title: 'Delivered', copy: 'Setup support across Chennai', icon: 'Fast Delivery' },
  { title: 'Guided', copy: 'Usage explanation for families', icon: 'Professional Support' },
  { title: 'Flexible', copy: 'Rental or purchase options', icon: 'Flexible Schedule' },
];

const PROCESS = [
  { title: 'Call or Enquire', copy: 'Share patient need, prescription details if any, and location.' },
  { title: 'Match the Device', copy: 'We suggest available model options and required accessories.' },
  { title: 'Deliver Home', copy: 'Device is dispatched after cleaning and basic checks.' },
  { title: 'Support After Setup', copy: 'Reach us for refill, replacement, accessory or usage help.' },
];

interface PageProps {
  params: Promise<{ 'device-slug': string }>;
}

export function generateStaticParams() {
  return EQUIPMENT_ITEMS.map((item) => ({
    'device-slug': item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'device-slug': deviceSlug } = await params;
  const data = getEquipmentItem(deviceSlug);
  if (!data) return { title: 'Product Not Found' };

  return {
    title: `${data.shortTitle} — Narpavi Homecare`,
    description: data.metaDesc,
    keywords: data.keywords,
    alternates: { canonical: `https://www.narpavihomecare.com/medical-equipment/${deviceSlug}` },
  };
}

export default async function DeviceDetailPage({ params }: PageProps) {
  const { 'device-slug': deviceSlug } = await params;
  const data = getEquipmentItem(deviceSlug);
  if (!data) notFound();

  const related = getRelatedEquipment(deviceSlug);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Medical Equipment', href: '/medical-equipment' }, { label: data.shortTitle }]} />

      <section className="equipment-detail-hero">
        <div className="container equipment-detail-hero__grid">
          <div>
            <div className="equipment-hero__eyebrow">
              <SiteIcon name={data.shortTitle} size={17} /> {data.category}
            </div>
            <h1 className="equipment-hero__title">
              {data.title} <span>at Home</span>
            </h1>
            <p className="equipment-hero__copy">{data.desc}</p>
            <div className="equipment-hero__actions">
              <a href={BRAND.phoneHref} className="btn btn--secondary btn--lg">
                <SiteIcon name="Phone" size={18} /> Call {BRAND.phone}
              </a>
              <Link href="/contact" className="btn btn--primary btn--lg">
                Check Availability <SiteIcon name="Arrow" size={18} />
              </Link>
            </div>
            <div className="equipment-hero__facts">
              <span><SiteIcon name="Check" size={16} /> Rent or buy</span>
              <span><SiteIcon name="Check" size={16} /> Setup guidance</span>
              <span><SiteIcon name="Check" size={16} /> Chennai support</span>
            </div>
          </div>
          <div className="equipment-detail-hero__media">
            <Image src={data.image} alt={`${data.shortTitle} home care support`} fill sizes="(max-width: 992px) 100vw, 42vw" />
            <div className="equipment-detail-hero__media-card">
              <span><SiteIcon name={data.shortTitle} size={24} /></span>
              <div>
                <strong>{data.shortTitle}</strong>
                <small>{data.category} for home recovery</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="equipment-trust-strip" aria-label={`${data.shortTitle} service assurances`}>
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

      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Details</span>
            <h2>{data.shortTitle} Options & Features</h2>
            <p>Clear information for families before they book or rent equipment for home care.</p>
          </div>

          <div className="equipment-info-grid">
            <div className="equipment-panel">
              <h3 className="equipment-panel__heading">
                <span><SiteIcon name="Options Available" size={22} /></span>
                Options Available
              </h3>
              <ul className="equipment-check-list">
                {data.options.map((item) => (
                  <li key={item}><SiteIcon name="Check" size={18} /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="equipment-panel">
              <h3 className="equipment-panel__heading">
                <span><SiteIcon name="Key Features" size={22} /></span>
                Key Features
              </h3>
              <ul className="equipment-check-list">
                {data.features.map((item) => (
                  <li key={item}><SiteIcon name="Check" size={18} /> {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="equipment-info-grid">
            <div className="equipment-panel">
              <h3 className="equipment-panel__heading">
                <span><SiteIcon name="Use Cases" size={22} /></span>
                Best Used For
              </h3>
              <ul className="equipment-check-list">
                {data.useCases.map((item) => (
                  <li key={item}><SiteIcon name="Check" size={18} /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="equipment-price-banner">
              <div className="equipment-price-banner__icon">
                <SiteIcon name="Pricing" size={25} />
              </div>
              <div>
                <strong>Pricing & Availability</strong>
                <p>{data.pricingHint}</p>
              </div>
              <Link href="/contact" className="btn btn--white btn--sm">Enquire</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Booking flow</span>
            <h2>How We Arrange {data.shortTitle}</h2>
            <p>Designed for quick family decision-making and urgent home recovery requirements.</p>
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

      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Related equipment</span>
            <h2>Other Equipment Families Ask For</h2>
          </div>
          <div className="equipment-related-grid">
            {related.map((item) => (
              <Link href={`/medical-equipment/${item.slug}`} className="equipment-related-card" key={item.slug}>
                <div className="equipment-related-card__icon"><SiteIcon name={item.shortTitle} size={24} /></div>
                <div>
                  <strong>{item.shortTitle}</strong>
                  <small>{item.category}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container equipment-final-cta">
          <div>
            <span className="section-kicker">Need help choosing?</span>
            <h2 style={{ color: 'white' }}>Ask Narpavi before you rent equipment.</h2>
            <p className="equipment-final-cta__copy">
              Tell us the patient condition, doctor advice and expected rental duration. We will guide you toward the right equipment category and accessories.
            </p>
          </div>
          <CTAForm title={`Enquire for ${data.shortTitle}`} />
        </div>
      </section>
    </>
  );
}
