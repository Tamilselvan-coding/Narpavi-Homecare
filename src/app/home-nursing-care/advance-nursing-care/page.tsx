import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { FAQ } from '@/lib/faqs';
import { 
  ADVANCE_NURSING_DOWNLOADS, 
  ADVANCE_NURSING_RESOURCES,
  ADVANCE_NURSING_PACKAGES,
  ADVANCE_NURSING_PACKAGE_NAMES
} from '@/lib/advanceNursingCareData';
import { getFaqSchema, getItemListSchema, getServiceSchema, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import FAQAccordion from '@/components/sections/FAQAccordion';
import GatedDownloadResources from '@/components/sections/GatedDownloadResources';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';
import AdvanceCarePackageSelector from '@/components/sections/AdvanceCarePackageSelector';

export const metadata: Metadata = {
  title: 'Advanced Nursing Care at Home in Chennai | IV & Infusion Support',
  description: 'Doctor-prescribed IV, infusion, recovery monitoring and oxygen support at home in Chennai, delivered by trained nursing professionals.',
  keywords: ['advanced nursing care chennai', 'IV therapy at home Chennai', 'infusion nurse Chennai', 'oxygen therapy at home'],
  alternates: { canonical: 'https://www.narpavihomecare.com/home-nursing-care/advance-nursing-care' },
};

const ADVANCE_WHO_WE_HELP = [
  {
    title: 'Post-Surgical IV Support',
    description: 'Patients discharged earlier than expected but still need IV antibiotics, fluids or pain relief.',
    icon: 'Post hospital recovery',
  },
  {
    title: 'Long-Term IV Antibiotic Therapy',
    description: 'For infections like UTI, bone/joint infections, pneumonia, and prolonged IV antibiotics.',
    icon: 'IV infusion nursing',
  },
  {
    title: 'Dehydration & Electrolyte Correction',
    description: 'Gastroenteritis, viral fever or heat stroke can leave adults dehydrated.',
    icon: 'Dehydration hydration',
  },
  {
    title: 'Chronic Illness Flare-Ups',
    description: 'Provides hydration or medication support during chronic condition flare-ups.',
    icon: 'Chronic care routine',
  },
  {
    title: 'Autoimmune & Rheumatology Therapy',
    description: 'Support for adults on biologics or steroid drips.',
    icon: 'Infusion therapy',
  },
  {
    title: 'Cancer Supportive IV Care',
    description: 'IV pain relief, anti-nausea therapy or hydration support.',
    icon: 'Palliative comfort',
  },
  {
    title: 'Palliative Comfort IV Support',
    description: 'Comfort care, nausea relief, or hydration.',
    icon: 'Comfort care',
  },
  {
    title: 'Neurology, Stroke & Cardiac Recovery',
    description: 'Observations and recovery monitoring as ordered by the doctor.',
    icon: 'Recovery mobility support',
  },
  {
    title: 'Busy Professionals Post-Illness',
    description: 'Young adults recovering from viral illness receiving fluids or pain relief.',
    icon: 'Active caregiver',
  },
];

const ADVANCE_DELIVERABLES = [
  {
    icon: 'Daily living support',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '80px', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>Daily Living Assistance</h3>
      </div>
    ),
  },
  {
    icon: 'IV infusion nursing',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '80px', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>Clinical IV &amp; Infusion</h3>
      </div>
    ),
  },
  {
    icon: 'Vital monitoring',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '80px', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>Health Monitoring &amp; Early Warning</h3>
      </div>
    ),
  },
  {
    icon: 'Doctor supervision',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '80px', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>Professional Supervising</h3>
      </div>
    ),
  },
  {
    icon: 'Infection safety',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '80px', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>Infection Prevention &amp; Home Safety</h3>
      </div>
    ),
  },
  {
    icon: 'Digital report',
    content: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '80px', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>Reporting &amp; Transparency</h3>
      </div>
    ),
  },
];

const ADVANCE_TRUST_POINTS = [
  {
    title: 'Verified & Background Checked Nurses',
    icon: 'Verified nurse',
  },
  {
    title: 'Doctor-Led Clinical supervision & physicians as needed',
    icon: 'Doctor supervision',
  },
  {
    title: '24×7 Emergency Backup & Hospital Referral',
    icon: 'Emergency escalation',
  },
  {
    title: 'Customized & Flexible Care Package',
    icon: 'Personalized care package',
  },
  {
    title: 'Strict Aseptic & Hand Hygiene Protocols',
    icon: 'Infection safety',
  },
  {
    title: 'Daily Logs & Digital Updates',
    icon: 'Digital family report',
  },
  {
    title: 'Proven Experience Across Chennai',
    icon: 'Safety shield',
  },
  {
    title: 'Affordable & Transparent Pricing',
    icon: 'Affordable care',
  },
];

const ADVANCE_FAQS: FAQ[] = [
  {
    id: 1,
    question: 'What is Advanced Nursing Care at Home?',
    answer: 'Advanced Nursing Care is a step above basic caregiving — it includes IV therapy, infusion management, and clinical monitoring for patients who are medically stable but need skilled nursing support outside the hospital.',
  },
  {
    id: 2,
    question: 'Who should consider Advanced Nursing Care?',
    answer: 'Patients needing IV antibiotics, fluids, pain medication, or post-surgical infusion support; those with chronic illness flare-ups; cancer patients needing comfort IV care; or anyone advised by their doctor to continue IV treatment at home.',
  },
  {
    id: 3,
    question: 'How is this different from Basic Care or ICU-at-Home?',
    answer: 'Basic Care is for personal help and vitals only. Advanced Care adds IV/IM injections, hydration, and infusion safety. ICU-at-Home is for ventilators, tracheostomy, and multi-monitor ICU care.',
  },
  {
    id: 4,
    question: 'Are your nurses qualified to give IV therapy?',
    answer: 'Yes. All Narpavi Homecare nurses are IV-certified, background-checked, and supervised by senior nurses and doctors.',
  },
  {
    id: 5,
    question: 'How safe is IV therapy at home?',
    answer: 'Very safe when done by trained nurses. We use aseptic technique, WHO hand hygiene protocols, and sterile equipment. There is also a 24×7 emergency escalation plan.',
  },
  {
    id: 6,
    question: 'Can IV therapy at home reduce hospital infection risk?',
    answer: 'Yes. Avoiding a prolonged hospital stay reduces exposure to hospital-acquired infections and supports faster healing at home.',
  },
  {
    id: 7,
    question: 'How much does IV therapy at home cost in Chennai?',
    answer: 'Single IV sessions start at ₹800 - ₹1,200; 8–12 hr nurse shifts range from ₹1,500 – ₹1,700; 24 hr care is ₹2,500 – ₹3,000/day. This is usually 40–60% cheaper than hospital admission.',
  },
  {
    id: 8,
    question: 'Do you provide equipment like IV stands or oxygen?',
    answer: 'Yes, we arrange IV stands, infusion sets, oxygen concentrators, nebulizers and other essentials if needed.',
  },
  {
    id: 9,
    question: 'What if my patient’s condition worsens?',
    answer: 'We have rapid escalation protocols — our nurses alert doctors, start first-line stabilisation, and help arrange safe hospital transfer if required.',
  },
  {
    id: 10,
    question: 'Can families monitor care remotely?',
    answer: 'Yes. We provide digital daily logs and WhatsApp updates (ideal for NRI families) with vitals, medication records and incident alerts.',
  },
  {
    id: 11,
    question: 'How quickly can services start?',
    answer: 'Usually within 24–48 hours of assessment and doctor’s prescription verification.',
  },
  {
    id: 12,
    question: 'Is doctor oversight included?',
    answer: 'Yes. Doctor-guided protocols, tele-review and weekly supervision ensure care meets clinical standards.',
  },
  {
    id: 13,
    question: 'Do you help after hospital discharge?',
    answer: 'Absolutely. We specialise in smooth transition from hospital to home, including IV antibiotics, pain management and vitals monitoring.',
  },
  {
    id: 14,
    question: 'Can we upgrade to Specialty or ICU Care if needed?',
    answer: 'Yes. We provide a seamless upgrade path — from Advanced to Specialty Care (tracheostomy, feeding tubes) or full ICU-at-Home.',
  },
  {
    id: 15,
    question: 'Do you provide palliative IV comfort care?',
    answer: 'Yes. We offer end-of-life comfort infusions, hydration, and pain relief with compassion and dignity.',
  },
  {
    id: 16,
    question: 'What precautions are taken to prevent infection?',
    answer: 'Strict hand hygiene, sterile IV setup, safe sharps disposal, surface sanitisation and single-use consumables whenever possible.',
  },
  {
    id: 17,
    question: 'Can you handle multiple daily IV doses?',
    answer: 'Yes. We schedule timed visits or longer shifts to cover multiple antibiotic or fluid infusions.',
  },
  {
    id: 18,
    question: 'What locations in Chennai do you serve?',
    answer: 'We cover Anna Nagar, OMR, Velachery, Tambaram, ECR, Adyar, T Nagar, Porur, and across Greater Chennai.',
  },
  {
    id: 19,
    question: 'Do you support insurance or reimbursement?',
    answer: 'We provide detailed invoices and medical documentation to help you claim from insurance or corporate reimbursement (coverage depends on policy).',
  },
  {
    id: 20,
    question: 'How do I book Advanced Nursing Care with Narpavi Homecare?',
    answer: 'Call 9600002303 or fill our Request Free Assessment form online. We\'ll schedule a nurse assessment, create a personalized plan, and start care within 24-48 hours.',
  },
];

export default function AdvanceNursingCarePage() {
  const path = '/home-nursing-care/advance-nursing-care';
  const schemas = [
    getWebPageSchema({ title: 'Advanced Nursing Care at Home in Chennai', description: metadata.description ?? '', path }),
    getServiceSchema({ name: 'Advanced Nursing Care at Home', description: metadata.description ?? '', path, serviceType: 'IV, infusion and advanced nursing care at home' }),
    getItemListSchema('Advanced Nursing Care Packages', ADVANCE_NURSING_PACKAGES.map((pkg) => ({ name: pkg.name, path: `${path}#package-${pkg.id}` }))),
    getFaqSchema(ADVANCE_FAQS.slice(0, 6)),
  ];

  return (
    <>
      <StructuredDataScript data={schemas} />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Home Nursing Care', href: '/home-nursing-care' },
        { label: 'Advance Nursing Care' },
      ]} />

      <main className="basic-care-v2">
        <section className="baby-hero" id="advance-nursing-form">
          <div className="container baby-hero__grid">
            <div className="baby-hero__content">
              <h1>Advance Nursing Care at Home - <span>Safe IV &amp; Infusion Therapy</span></h1>
              <div className="baby-hero__actions">
                <a href="#basic-care-packages" className="btn btn--outline btn--lg">View Packages <SiteIcon name="Arrow" size={18} /></a>
              </div>
            </div>
            <div className="baby-hero__visual">
              <Image src="/images/advance-nursing-care/Pik 1.png" alt="Nurse providing IV support to a patient at home" fill sizes="(max-width: 992px) 100vw, 42vw" priority style={{ objectFit: 'cover' }} />
            </div>
            <CTAForm title="Book Advanced Nursing Care" packageOptions={ADVANCE_NURSING_PACKAGE_NAMES} />
          </div>
        </section>

        <section className="section">
          <div className="container baby-summary">
            <div className="baby-image-panel">
              <Image src="/images/advance-nursing-care/Pik 3.png" alt="Advanced nursing and infusion support at home" fill sizes="(max-width: 992px) 100vw, 38vw" style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h2>Expert IV &amp; Injection Care at Home — Safe, Supervised &amp; Affordable</h2>
              <p>
                Recover safely and confidently with Advance Nursing Care at Home in Chennai, the ideal solution for patients who need more than basic daily support but not yet ICU level care. Our verified, IV-certified nurses deliver hospital-grade IV therapy, fluid replacement, antibiotics and injection administration right where you feel most comfortable, your home.
              </p>
              <p>
                Every plan is built to preserve independence, reduce readmissions and keep families informed in real time.
              </p>
              <Link href="#advance-nursing-form" className="btn btn--primary btn--lg">Book Advanced Nursing Care <SiteIcon name="Arrow" size={18} /></Link>
            </div>
          </div>
        </section>

        <section className="section basic-care-v2__who basic-care-v2__who-model">
          <div className="container">
            <div className="basic-care-v2__who-model-title"><h2>Designed for Patients Who Need More Than Basic Nursing</h2></div>
            <div className="basic-care-v2__who-model-intro">
              <div className="basic-care-v2__who-model-copy" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p>
                  Our service is the ideal for those who are medically stable but require IV therapy, injections or infusion support at home. Here are the people with, we help most
                </p>
              </div>
              <div className="basic-care-v2__who-model-image">
                <Image src="/images/advance-nursing-care/Pik 4.png" alt="Advanced nursing care support at home in Chennai" fill sizes="(max-width: 768px) 100vw, 240px" style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="basic-care-v2__who-model-grid">
              {ADVANCE_WHO_WE_HELP.map((person) => (
                <article className="basic-care-v2__who-model-card" key={person.title} style={{ minHeight: '160px', padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span className="basic-care-v2__who-model-icon" style={{ marginBottom: '0.5rem' }}><SiteIcon name={person.icon} size={21} /></span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', lineHeight: '1.4', margin: '0' }}>
                    {person.title}
                    <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)' }}>
                      {person.description ? ` - ${person.description}` : ' -'}
                    </span>
                  </h3>
                </article>
              ))}
            </div>
            <div className="basic-care-v2__who-model-action">
              <Link href="#advance-nursing-form" className="btn btn--primary btn--lg">Book Advanced Nursing Care</Link>
            </div>
          </div>
        </section>

        <section className="section section--alt basic-care-v2__deliverables basic-care-v2__deliverables-model">
          <div className="container">
            <div className="basic-care-v2__deliverables-model-shell">
              <div className="basic-care-v2__deliverables-model-title"><h2>We Deliver Everything You Need for Safe IV &amp; Infusion Care</h2></div>
              
              <div className="basic-care-v2__who-model-intro">
                <div className="basic-care-v2__who-model-copy" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p>
                    Advanced Nursing Care from <strong>Narpavi Homecare</strong> is more than just IV therapy - it&apos;s a <strong>complete, hospital-grade service framework</strong> designed to keep patients safe, comfortable and well-monitored at home
                  </p>
                </div>
                <div className="basic-care-v2__who-model-image">
                  <Image src="/images/advance-nursing-care/Pik 5.jpeg" alt="Advanced Nursing Care Deliverables" fill sizes="(max-width: 768px) 100vw, 240px" style={{ objectFit: 'cover' }} />
                </div>
              </div>

              <div className="basic-care-v2__deliverables-model-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {ADVANCE_DELIVERABLES.map((item, idx) => (
                  <article className="basic-care-v2__deliverables-model-card" key={idx}>
                    <span className="basic-care-v2__deliverables-model-icon"><SiteIcon name={item.icon} size={22} /></span>
                    {item.content}
                  </article>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', border: '1px solid #FFC107', borderRadius: '8px', padding: '1rem 1.5rem', backgroundColor: '#FFFDF5', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                  Advanced nursing care in Chennai: IV therapy at home, infusion support, doctor supervised nursing, NRI friendly care.
                </p>
              </div>

              <div className="basic-care-v2__deliverables-model-action" style={{ marginTop: '2rem' }}>
                <Link href="#advance-nursing-form" className="btn btn--primary btn--lg">Book Advanced Nursing Care</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="basic-care-packages">
          <div className="container">
            <div className="section__header basic-care-v2__packages-header">
              <h2>Choose the Right  Advance Nursing Care Package  </h2>
              <p>
               Every recovery journey is different. That’s why Narpavi Advance Nursing Care offers four carefully designed packages from basic IV Support to  a full Oxygen Care 
              </p>
            </div>
            <AdvanceCarePackageSelector />
          </div>
        </section>

        <section className="section section--alt baby-trust-section basic-care-v2__trust">
          <div className="container">
            <div className="section__header basic-care-v2__trust-header">
              <h2>Why Families Trust Narpavi Homecare for Advanced Nursing Care</h2>
              <p>
                Choosing an IV or infusion service at home is not just about convenience, it&apos;s about safety, skill and reliable clinical backup. At Narpavi Homecare, every Advanced Nursing Care plan is built with strict safety standards and hospital-grade protocols so you can focus on healing with peace of mind.
              </p>
            </div>
            <div className="baby-trust-orbit basic-care-v2__trust-orbit">
              <div className="baby-trust-visual">
                <span className="baby-trust-visual__ring" aria-hidden="true" />
                <div className="baby-trust-visual__image">
                  <Image src="/images/advance-nursing-care/Pik 2.jpg" alt="Doctor and nurse supporting a patient receiving IV therapy" fill sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 350px" style={{ objectFit: 'cover' }} />
                </div>
                <div className="baby-trust-visual__badge"><SiteIcon name="Safety shield" size={19} /><span>Safety-led care at home</span></div>
              </div>
              {ADVANCE_TRUST_POINTS.map((item, index) => (
                <article className={`baby-trust-card baby-trust-card--${index + 1}`} key={item.title} style={{ '--baby-trust-order': index } as CSSProperties}>
                  <div className="baby-trust-card__icon"><SiteIcon name={item.icon} size={22} /></div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexGrow: 1, paddingLeft: '0.5rem', width: '100%' }}>
                    <h3 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, lineHeight: '1.4', textAlign: 'center', width: '100%' }}>{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', border: '1px solid #FFC107', borderRadius: '8px', padding: '1rem 1.5rem', backgroundColor: '#FFFDF5', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                Lower infection risk, safe escalation plan and complete transparency make our Advanced Nursing Care the smart alternative to prolonged hospital stays.
              </p>
            </div>

            <div className="basic-care-v2__trust-action" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <Link href="#advance-nursing-form" className="btn btn--primary btn--lg">Book Advanced Nursing Care</Link>
            </div>
          </div>
        </section>

        <section className="section section--alt" id="basic-care-faq">
          <div className="container">
            <div className="section__header">
              <h2>FAQs</h2>
            </div>
            <FAQAccordion faqs={ADVANCE_FAQS} />
          </div>
        </section>

        <section className="section basic-care-v2__blogs" id="basic-care-blogs">
          <div className="container">
            <GatedDownloadResources
              heading="Blogs &amp; Download Free Advanced Nursing Care Guide"
              intro={(
                <>
                  <p>Families planning IV therapy, infusion support or recovery monitoring at home need clear preparation. These guides explain safety checks, home setup, cost awareness, family reporting and when to escalate care.</p>
                  <p>Read, download, and share these resources to feel confident about arranging safe, comfortable home care.</p>
                </>
              )}
              image="/images/advance-nursing-care/Pik 14.jpg"
              imageAlt="Advanced Nursing Care planning guide"
              modalDescription="Fill these details to download the Advanced Nursing Care guide."
              downloadFallbackName="advanced-nursing-care-guide.pdf"
              downloadButtonLabel="Download Guide"
              downloads={ADVANCE_NURSING_DOWNLOADS}
              resources={ADVANCE_NURSING_RESOURCES}
            />
          </div>
        </section>

        <section className="cta-strip baby-final-cta">
          <div className="container baby-final-cta__grid">
            <div>
              <h2>Plan Safe IV &amp; Infusion Support at Home</h2>
              <p>Avoid extra hospital bills and infection risk - let our doctor-supervised IV-certified nurses care for your loved one at home. Every care plan is nurse-supervised and doctor-guided, ensuring safe medication administration, early complication detection and 24×7 emergency escalation if health changes. Families, especially NRIs, receive digital daily logs, vitals tracking and instant WhatsApp updates for complete transparency.</p>
              <div className="cta-strip__badges">
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> IV therapy at home</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Infusion support</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Doctor supervised nursing</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> NRI friendly care</span>
              </div>
            </div>
            <CTAForm title="Book Advanced Nursing Care" packageOptions={ADVANCE_NURSING_PACKAGE_NAMES} />
          </div>
        </section>
      </main>
    </>
  );
}
