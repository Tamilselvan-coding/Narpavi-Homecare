import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import { BRAND } from '@/lib/constants';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'Contact Us — Book Care Assessment',
  description: `Book a professional nursing care assessment. Get professional home healthcare started within 24-48 hours. Call ${BRAND.phone}.`,
  alternates: { canonical: 'https://www.narpavihomecare.com/contact' },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
      <section className="section" id="contact-page" style={{ marginTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h1 style={{ marginBottom: '1.25rem' }}>Get in Touch</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Ready to start safe, personalized Basic Nursing Care? Fill out the form or reach us directly.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="trust-card">
                  <div className="trust-card__icon"><SiteIcon name="Phone" /></div>
                  <div><h4>Call Us</h4><p><a href={BRAND.phoneHref} style={{ color: 'var(--primary)', fontWeight: 600 }}>{BRAND.phoneFormatted}</a></p></div>
                </div>
                <div className="trust-card">
                  <div className="trust-card__icon"><SiteIcon name="WhatsApp" /></div>
                  <div><h4>WhatsApp</h4><p><a href={BRAND.whatsapp} target="_blank" rel="noopener" style={{ color: 'var(--primary)', fontWeight: 600 }}>Chat with us</a></p></div>
                </div>
                <div className="trust-card">
                  <div className="trust-card__icon"><SiteIcon name="Location" /></div>
                  <div><h4>Location</h4><p>{BRAND.address}</p></div>
                </div>
              </div>
            </div>
            <CTAForm title="Book Your Nursing Care Assessment" />
          </div>
        </div>
      </section>
    </>
  );
}
