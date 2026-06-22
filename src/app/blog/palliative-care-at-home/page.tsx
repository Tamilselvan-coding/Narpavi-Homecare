import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';
import SiteIcon from '@/components/ui/SiteIcon';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Palliative Care at Home â€” Comfort & Dignity for Loved Ones',
  description: 'Professional palliative care at home. Comfort-focused support with daily family updates. Dignity-first approach for your loved ones.',
  keywords: ['palliative care at home chennai', 'home palliative care', 'comfort care at home', 'dignified care at home'],
  alternates: { canonical: 'https://www.narpavihomecare.com/blog/palliative-care-at-home' },
};

const TOC_ITEMS = [
  { id: 'what-palliative-care-means', label: 'What palliative care means' },
  { id: 'non-clinical-support', label: 'Non-clinical support we provide' },
  { id: 'when-to-consider-palliative', label: 'When to consider home palliative care' },
  { id: 'choose-package', label: 'Choosing the right package' },
  { id: 'why-families-choose-us', label: 'Why families choose Narpavi' },
];

export default function PalliativeCareAtHome() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Palliative Care at Home' }]} />

      <BlogArticleLayout
        slug="palliative-care-at-home"
        title="Palliative Care at Home â€” Comfort & Dignity for Loved Ones"
        image="/images/pik-14.png"
        imageAlt="Palliative care at home"
        readTime="6 min read"
        toc={TOC_ITEMS}
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '1.5rem' }}>
          Facing a life-limiting illness can be overwhelming for the person and the family. Palliative care at home focuses on comfort, dignity, and emotional well-being rather than aggressive hospital treatment. With Basic Nursing Care support, families can ensure their loved ones spend this stage with peace and respect.
        </p>

        <h2 id="what-palliative-care-means" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>What Palliative Care Really Means</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '1.5rem' }}>
          Palliative care is about comfort, presence, and quality of life. It doesn&apos;t mean giving up hope. It means shifting the focus from cure to relief of discomfort, emotional connection, and meaningful time with family.
        </p>

        <h2 id="non-clinical-support" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Non-Clinical Palliative Support We Provide</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { title: 'Gentle Personal Care', desc: 'Bed baths, hygiene, skin care, and repositioning to prevent discomfort.' },
            { title: 'Companionship & Emotional Presence', desc: 'A calm, caring presence to reduce loneliness and anxiety.' },
            { title: 'Nutrition & Hydration Support', desc: 'Feeding assistance, hydration reminders, and comfort-focused meals.' },
            { title: 'Safe & Dignified Environment', desc: 'Fall prevention, clean surroundings, and gentle transfers if needed.' },
            { title: 'Family Communication & Updates', desc: 'Daily logs, WhatsApp updates, and immediate escalation if health declines.' },
          ].map((item) => (
            <div key={item.title} className="trust-card">
              <div className="trust-card__icon"><SiteIcon name={item.title} /></div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 id="when-to-consider-palliative" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>When to Consider Home Palliative Care</h2>
        <ul style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '2', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li style={{ listStyle: 'disc' }}>Patient is bedridden and not receiving curative treatment.</li>
          <li style={{ listStyle: 'disc' }}>Frequent hospital trips are burdensome or stressful.</li>
          <li style={{ listStyle: 'disc' }}>Family wants peaceful, dignified time together at home.</li>
          <li style={{ listStyle: 'disc' }}>No invasive medical support is required such as ventilators, IV therapy, or complex symptom management.</li>
        </ul>

        <div style={{ background: 'var(--accent-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.5rem', marginBottom: '2rem', borderLeft: '4px solid var(--accent)' }}>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            <strong>Note:</strong> If your loved one needs IV infusions, tube feeding, or complex pain management, you may need to upgrade to Advanced or Specialty Care.
          </p>
        </div>

        <h2 id="choose-package" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Choosing the Right Package</h2>
        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Comfort Plus</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Complete bedside assistance, hygiene, repositioning, feeding, daily logs, and family updates.</p>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Caring Hands</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>If there is still some mobility, this gives hands-on help plus comfort routines.</p>
          </div>
        </div>

        <h2 id="why-families-choose-us" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Why Families Choose Narpavi Homecare</h2>
        <ul style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '2', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li style={{ listStyle: 'disc' }}>Trained palliative caregivers with compassion and emotional resilience.</li>
          <li style={{ listStyle: 'disc' }}>Daily family communication, even for NRI families.</li>
          <li style={{ listStyle: 'disc' }}>Emergency escalation plan if the condition suddenly worsens.</li>
          <li style={{ listStyle: 'disc' }}>Doctor and nurse oversight to ensure safe and dignified care at home.</li>
        </ul>

        <div style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius-lg)', padding: '2rem', marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>Final Takeaway</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Palliative care at home allows families to prioritise comfort, love, and meaningful moments without the stress of hospital visits. With Narpavi Homecare&apos;s Comfort Plus plan, your loved one receives dignified, attentive care and your family gets peace of mind.
          </p>
        </div>

        <div className="cta-strip" style={{ borderRadius: 'var(--radius-lg)', marginTop: '2rem' }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Need Palliative Care at Home?</h3>
          <p style={{ opacity: 0.9 }}>Call {BRAND.phone} or request a palliative care assessment to create a personalised home care plan.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link href="/contact" className="btn btn--white">Book Care Assessment</Link>
            <a href={BRAND.phoneHref} className="btn btn--outline" style={{ color: 'white', borderColor: 'white' }}>Call {BRAND.phone}</a>
          </div>
        </div>
      </BlogArticleLayout>
    </>
  );
}
