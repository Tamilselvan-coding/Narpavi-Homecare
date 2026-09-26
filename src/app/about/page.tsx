import '@/styles/about.css';
import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'About Narpavi Homecare',
  description: 'Learn about Narpavi Homecare, our mission, vision, values, and commitment to safe, dignified, family-centred home healthcare.',
  alternates: { canonical: 'https://www.nhlcare.com/about' },
};

const ABOUT_VALUES = [
  {
    title: 'Compassion',
    description: 'We care for every patient with empathy, dignity, and warmth, just like family.',
    icon: 'Compassion support',
  },
  {
    title: 'Transparency & Integrity',
    description: 'We act with honesty, transparency, and accountability in every relationship, with clear communication about care plans, progress, and costs.',
    icon: 'Transparent report',
  },
  {
    title: 'Affordability',
    description: 'We are committed to transparent, reasonable pricing that makes advanced home healthcare accessible to more families.',
    icon: 'Home support',
  },
  {
    title: 'Excellence & Standards',
    description: 'We maintain high clinical protocols, quality benchmarks, safety practices, and professional standards.',
    icon: 'Nurse clinical professional',
  },
  {
    title: 'Evidence-Based Practice',
    description: 'We deliver treatments and care plans based on scientific evidence and best clinical practices for safer, better outcomes.',
    icon: 'Clinical report',
  },
  {
    title: 'Inclusivity',
    description: 'We believe quality healthcare is a right, not a privilege, and aim to reach people from every walk of life.',
    icon: 'Family people involvement',
  },
  {
    title: 'Respect',
    description: 'We honor the dignity, privacy, and individual choices of every patient, family, and staff member.',
    icon: 'Dignity care',
  },
  {
    title: 'Innovation',
    description: 'We embrace new technologies and approaches to deliver safer, more efficient home care, enhance patient experiences, and support caregivers.',
    icon: 'Innovation idea',
  },
  {
    title: 'Teamwork',
    description: 'We believe strong collaboration among caregivers, patients, families, and medical professionals leads to the best outcomes.',
    icon: 'Family involvement',
  },
  {
    title: 'Caregiver Empowerment',
    description: 'We support and uplift caregivers through fair compensation, skill development, and opportunities to grow.',
    icon: 'Caregiver user',
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />

      <main className="about-v2" id="about-page">
        <section className="about-v2-hero">
          <div className="container about-v2-hero__grid">
            <div className="about-v2-hero__content">
              <div className="about-v2-hero__eyebrow">
                <SiteIcon name="Compassion care" size={18} />
                <span>About Narpavi Homecare</span>
              </div>
              <h1>Care that feels <span>professional, personal, and close to home.</span></h1>
              <p>
                We bring caregivers, nurses, thoughtful care planning, and clear family communication together so people can receive dependable support in the place they know best.
              </p>
              <div className="about-v2-hero__actions">
                <Link href="/contact" className="btn btn--primary btn--lg">
                  Book Care Assessment <SiteIcon name="Arrow" size={18} />
                </Link>
              </div>
              <div className="about-v2-hero__proof">
                <span><SiteIcon name="Safety shield" size={18} /> Safety-led routines</span>
                <span><SiteIcon name="Personalized care plan" size={18} /> Personalized plans</span>
                <span><SiteIcon name="Family updates" size={18} /> Clear family updates</span>
              </div>
            </div>

            <div className="about-v2-hero__visual" aria-label="Narpavi home healthcare services">
              <div className="about-v2-hero__image about-v2-hero__image--main">
                <Image
                  src="/images/pik-1.jpeg"
                  alt="Narpavi caregiver supporting a senior at home"
                  fill
                  sizes="(max-width: 900px) 88vw, 36vw"
                  priority
                />
              </div>
              <div className="about-v2-hero__image about-v2-hero__image--baby">
                <Image
                  src="/images/baby-care/pik-1.png"
                  alt="Narpavi baby care support at home"
                  fill
                  sizes="(max-width: 600px) 34vw, 180px"
                />
              </div>
              <div className="about-v2-hero__floating about-v2-hero__floating--care">
                <SiteIcon name="Home healthcare" size={23} />
                <div><strong>Care at home</strong><span>Comfort with structure</span></div>
              </div>
              <div className="about-v2-hero__floating about-v2-hero__floating--family">
                <SiteIcon name="Family communication" size={22} />
                <div><strong>Family connected</strong><span>Clear, timely updates</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-v2-trust" aria-label="Our care commitments">
          <div className="container about-v2-trust__grid">
            <div><SiteIcon name="Personalized care plan" size={25} /><span><strong>Personalized</strong> care planning</span></div>
            <div><SiteIcon name="Nurse clinical oversight" size={25} /><span><strong>Professional</strong> care guidance</span></div>
            <div><SiteIcon name="Family updates" size={25} /><span><strong>Transparent</strong> communication</span></div>
            <div><SiteIcon name="Home support" size={25} /><span><strong>Familiar</strong> home comfort</span></div>
          </div>
        </section>

        <section className="section about-v2-story">
          <div className="container about-v2-story__grid">
            <div className="about-v2-story__visual">
              <div className="about-v2-story__image">
                <Image
                  src="/images/elder-care/pik-3.png"
                  alt="Compassionate caregiver assisting a senior with daily care"
                  fill
                  sizes="(max-width: 900px) 92vw, 43vw"
                />
              </div>
              <div className="about-v2-story__note">
                <SiteIcon name="Dignity comfort care" size={25} />
                <p>Care should support the person—not take away their voice, routine, or dignity.</p>
              </div>
              <span className="about-v2-story__shape" aria-hidden="true" />
            </div>

            <div className="about-v2-story__content">
              <span className="section-kicker">Who we are</span>
              <h2>Built Around the Reality of Family Care</h2>
              <p className="about-v2-story__lead">
                Choosing care for a parent, recovering adult, newborn, or medically dependent family member can feel overwhelming. Families need more than a person to complete tasks—they need a dependable care partner.
              </p>
              <p>
                Narpavi Homecare makes professional home healthcare easier to understand and arrange by connecting assessment, caregiver matching, care guidance, daily observations, family updates, and escalation support.
              </p>
              <div className="about-v2-story__pillars">
                <div><SiteIcon name="Dignity care" size={22} /><span><strong>Dignity</strong> in every interaction</span></div>
                <div><SiteIcon name="Safety shield" size={22} /><span><strong>Safety</strong> in everyday routines</span></div>
                <div><SiteIcon name="Family communication" size={22} /><span><strong>Clarity</strong> for every family</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section about-v2-purpose">
          <div className="container">
            <div className="section__header about-v2-section-header">
              <span className="section-kicker">Our purpose</span>
              <h2>Our Mission, Vision &amp; Core Values</h2>
              <p>The purpose, future direction, and values behind our home healthcare and wellness solutions.</p>
            </div>
            <div className="about-v2-purpose__grid">
              <article className="about-v2-purpose__card about-v2-purpose__card--mission">
                <div className="about-v2-purpose__top">
                  <div className="about-v2-purpose__icon"><SiteIcon name="Mission care" size={32} /></div>
                  <span>01 / Our Mission</span>
                </div>
                <h3>Deliver compassionate, high-quality home healthcare with clinical standards.</h3>
                <p>
                  We bring nursing, caregiving, equipment coordination, clear processes and family communication together so patients can heal safely at home. Our mission is to make care accessible, compassionate and accountable while supporting caregivers with dignity and growth.
                </p>
                <div className="about-v2-purpose__accent" aria-hidden="true" />
              </article>
              <article className="about-v2-purpose__card about-v2-purpose__card--vision">
                <div className="about-v2-purpose__top">
                  <div className="about-v2-purpose__icon"><SiteIcon name="Vision better outcome" size={32} /></div>
                  <span>02 / Our Vision</span>
                </div>
                <h3>Become a trusted leader in affordable home healthcare and wellness.</h3>
                <p>
                  We aim to make reliable home healthcare and wellness support available to every family that needs it. Our vision is to grow as a trusted leader known for affordability, clinical discipline, innovation and human care across communities.
                </p>
                <div className="about-v2-purpose__accent" aria-hidden="true" />
              </article>
            </div>

            <div className="about-v2-values__panel">
              <div className="about-v2-values__intro">
                <span className="section-kicker">Core values</span>
                <h3>Values You Can Feel in Everyday Care</h3>
                <p>These core values shape every care plan, family conversation, caregiving decision, and service relationship.</p>
              </div>
              <div className="about-v2-values__grid">
                {ABOUT_VALUES.map((value, index) => (
                  <article
                    className={`about-v2-value about-v2-value--${index + 1}`}
                    key={value.title}
                    style={{ '--about-order': index } as CSSProperties}
                  >
                    <div className="about-v2-value__top">
                      <div className="about-v2-value__icon"><SiteIcon name={value.icon} size={27} /></div>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-v2-final">
          <div className="container about-v2-final__inner">
            <div className="about-v2-final__icon"><SiteIcon name="Home compassion care" size={34} /></div>
            <div>
              <span>Let&apos;s plan the right care together</span>
              <h2>Bring Professional Care Home with Confidence</h2>
              <p>Tell us about your family&apos;s needs, schedule, and expectations. We will help you understand the suitable next step.</p>
            </div>
            <Link href="/contact" className="btn btn--primary btn--lg">
              Get in Touch <SiteIcon name="Arrow" size={18} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
