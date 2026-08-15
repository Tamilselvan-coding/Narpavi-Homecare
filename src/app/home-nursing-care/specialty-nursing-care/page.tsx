import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { FAQ } from '@/lib/faqs';
import { 
  SPECIALTY_NURSING_DOWNLOADS, 
  SPECIALTY_NURSING_RESOURCES,
  SPECIALTY_NURSING_PACKAGES,
  SPECIALTY_NURSING_PACKAGE_NAMES
} from '@/lib/specialtyNursingCareData';
import { getFaqSchema, getItemListSchema, getServiceSchema, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import FAQAccordion from '@/components/sections/FAQAccordion';
import GatedDownloadResources from '@/components/sections/GatedDownloadResources';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';
import SpecialtyCarePackageSelector from '@/components/sections/SpecialtyCarePackageSelector';

export const metadata: Metadata = {
  title: 'Specialty Nursing Care at Home in Chennai | Tracheostomy & Stoma Care',
  description: 'Doctor-guided advanced procedures at home in Chennai: Tracheostomy care, PEG/NG tube feeding, PICC & TPN infusions, wound care, peritoneal dialysis exchanges and oncology comfort care.',
  keywords: [
    'specialty nursing care chennai', 
    'tracheostomy care at home chennai', 
    'stoma care home nurse chennai', 
    'PICC line dressing at home', 
    'home tube feeding PEG care', 
    'wound care nursing chennai'
  ],
  alternates: { canonical: 'https://www.narpavihomecare.com/home-nursing-care/specialty-nursing-care' },
};

const SPECIALTY_WHO_WE_HELP = [
  {
    title: 'Patients in Post-ICU Step-Down care',
    description: 'Recently discharged ICU patients who still require one or two special nursing procedures while recovering at home',
    icon: 'ICU at Home',
  },
  {
    title: 'Patients in Long-Term Tube & Line Care',
    description: 'PEG/NG feeding, TPN administration or PICC/central line maintenance',
    icon: 'Tube & Nutrition',
  },
  {
    title: 'Patients with Complex Wound & Bedsore',
    description: 'pressure sores, diabetic foot ulcers, surgical wounds or chronic non-healing wounds.',
    icon: 'Wound & Skin Integrity',
  },
  {
    title: 'Patients require Dialysis & Renal Care Support',
    description: 'APD/APD peritoneal dialysis or preparing/post hemodialysis',
    icon: 'Renal / Dialysis',
  },
  {
    title: 'Patients require Colostomy / Ileostomy / Urostomy Care',
    description: 'patient adapting to life with a stoma - appliance change, skin protection, leakage prevention, peristomal skin monitoring, caregiver education and infection watch',
    icon: 'Stoma Care',
  },
  {
    title: 'Patients in Respiratory Support (BiPAP / CPAP & O\u2082)',
    description: 'BiPAP/CPAP setup & titration, oxygen therapy.',
    icon: 'Airway & Respiratory',
  },
  {
    title: 'Patients require Cancer & Oncology Support',
    description: 'pain relief, CVP/PICC/chemo port care, nutrition support.',
    icon: 'Oncology & Palliative',
  },
  {
    title: 'Patients in Chronic Illness & Palliative Care',
    description: 'Progressive neurological, cardiac or respiratory disease',
    icon: 'Palliative comfort',
  },
];

const SPECIALTY_DELIVERABLES = [
  {
    icon: 'Oncology & Palliative',
    content: (
      <>
        <h3>Oncology & Palliative</h3>
        <p><strong>Chemotherapy nursing support</strong> (hydration, antiemetics, analgesia), Port/PICC care, Symptom management & family education</p>
      </>
    ),
  },
  {
    icon: 'Airway & Respiratory',
    content: (
      <>
        <h3>Airway & Respiratory</h3>
        <p>Tracheostomy suction & stoma care, Inner cannula cleaning & tie change, &middot; Humidification & secretion management, <strong>BiPAP / CPAP setup & oxygen therapy titration</strong></p>
      </>
    ),
  },
  {
    icon: 'Stoma Care',
    content: (
      <>
        <h3>Stoma Care , Colostomy / Ileostomy / Urostomy care</h3>
        <p>Appliance change & skin barrier protection, Leakage prevention & infection watch, Peristomal skin protection & caregiver education</p>
      </>
    ),
  },
  {
    icon: 'IV & Line Care',
    content: (
      <>
        <h3>IV & Line Care - PICC & central line dressing/maintenance</h3>
        <p>Patency flushing, Non-cytotoxic IV medication & hydration, CLABSI prevention bundle</p>
      </>
    ),
  },
  {
    icon: 'Renal / Dialysis',
    content: (
      <>
        <h3>Renal / Dialysis</h3>
        <p><strong>Peritoneal dialysis (CAPD/APD) assistance</strong> &middot; Exit-site care & asepsis training, Pre/post hemodialysis vitals & access site watch</p>
      </>
    ),
  },
  {
    icon: 'Digital report',
    content: (
      <>
        <h3>Documentation & Transparency</h3>
        <p>Digital daily logs, WhatsApp updates & photo reporting (ideal for NRI families), Incident reports & weekly nurse supervisor review</p>
      </>
    ),
  },
  {
    icon: 'Vital monitoring',
    content: (
      <>
        <h3>Health Monitoring & Early Warning</h3>
        <p>Vitals (BP, SpO₂, pulse, temp), Complication watch (redness, swelling, fever, respiratory distress), Rapid escalation to doctors</p>
      </>
    ),
  },
  {
    icon: 'Tube & Nutrition',
    content: (
      <>
        <h3>Tube & Nutrition</h3>
        <p><strong>Ryle’s / NG tube feeding &middot; PEG / PEJ tube care & flushing &middot;</strong> Feed scheduling & aspiration prevention, <strong>Total Parenteral Nutrition (TPN) administration</strong></p>
      </>
    ),
  },
  {
    icon: 'Wound & Skin Integrity',
    content: (
      <>
        <h3>Wound & Skin Integrity</h3>
        <p><strong>Advanced wound & bedsore management</strong> (foam/alginate/hydrocolloid dressings), Offloading/turning plan, Infection monitoring & photo logs</p>
      </>
    ),
  },
];

const SPECIALTY_TRUST_POINTS = [
  {
    title: 'Doctor-Led Clinical Overseeing',
    description: 'Doctor-guided protocols, initial assessment, weekly supervisor reviews, and 24x7 doctor tele-consult options.',
    icon: 'Doctor supervision',
  },
  {
    title: 'High Standard Infection Control',
    description: 'WHO standard hand hygiene, aseptic dressing kits, sterile techniques, and routine infection audits.',
    icon: 'Infection safety',
  },
  {
    title: 'Real-Time Family & NRI Updates',
    description: 'Digital daily logs, WhatsApp progress reports, photo verification, and direct coordinator contact.',
    icon: 'Digital family report',
  },
  {
    title: 'Seamless Upgrade/Downgrade Path',
    description: 'Easily scale care from Advanced Care up to ICU at Home as the patient\'s recovery trajectory changes.',
    icon: 'Personalized care package',
  },
  {
    title: '24×7 Emergency Backup & Referral',
    description: 'Rapid escalation to treating doctors, first-line stabilization, and pre-mapped hospital referral support.',
    icon: 'Emergency escalation',
  },
  {
    title: 'Affordable & Transparent Pricing',
    description: 'Clearly stated package costs and optional add-ons, saving up to 50% compared to prolonged hospital stays.',
    icon: 'Affordable care',
  },
  {
    title: 'Proven Track Record in Chennai',
    description: 'Highly reviewed, verified clinical team trusted by families and NRI relatives across Chennai.',
    icon: 'Verified nurse',
  },
  {
    title: 'Verified & Skilled Nurses',
    description: 'Every nurse undergoes rigorous background checks, clinical skill testing, and specialized infection control training.',
    icon: 'Safety shield',
  },
];

const SPECIALTY_FAQS: FAQ[] = [
  {
    id: 1,
    question: 'What is Specialty Nursing Care at home?',
    answer: 'Specialty Nursing Care provides advanced, hospital-grade procedures at home — including tracheostomy care, PEG/NG feeding, PICC & TPN support, wound & bedsore management, BiPAP/CPAP setup, and oncology comfort care — all under doctor-led protocols and WHO infection control.',
  },
  {
    id: 2,
    question: 'Who needs Specialty Nursing Care instead of regular home nursing?',
    answer: 'Patients needing IV medications, complex tubes or stoma care, tracheostomy suction, TPN, chemotherapy support, or advanced wound care benefit from specialty nurses rather than basic caregivers.',
  },
  {
    id: 3,
    question: 'How soon can care begin after hospital discharge?',
    answer: 'Usually within 24 hours. We arrange assessment, supplies, and nurse deployment quickly to avoid unsafe gaps.',
  },
  {
    id: 4,
    question: 'Can tracheostomy care be safely managed at home?',
    answer: 'Yes. Our trained tracheostomy nurses use sterile suctioning, stoma cleaning, humidification, and emergency decannulation protocols with 24×7 doctor backup.',
  },
  {
    id: 5,
    question: 'How do you prevent infections in PICC lines or TPN therapy?',
    answer: 'We follow aseptic technique, WHO hand hygiene, sterile dressings, and CLABSI prevention bundles with daily site checks and digital alerts.',
  },
  {
    id: 6,
    question: 'What if a tube or line accidentally comes out?',
    answer: 'Our nurses follow an emergency escalation plan — secure the airway or line, notify the doctor, and coordinate safe hospital transfer if needed.',
  },
  {
    id: 7,
    question: 'What are your safety & hygiene standards?',
    answer: 'We use WHO 5 Moments of Hand Hygiene, sterile dressing kits, aseptic protocols, and routine infection audits.',
  },
  {
    id: 8,
    question: 'Do you provide equipment like suction machines, BiPAP or oxygen concentrators?',
    answer: 'Yes — we can source, install, and maintain suction machines, oxygen concentrators, BiPAP/CPAP, infusion pumps, and wound-care kits.',
  },
  {
    id: 9,
    question: 'What supplies do we need at home for Specialty Care?',
    answer: 'We’ll guide you on sterile kits, dressings, tube feeds, suction sets, oxygen therapy, and provide a checklist during assessment.',
  },
  {
    id: 10,
    question: 'What are your nurse qualifications?',
    answer: 'All nurses are IV-certified, trained in trach/PEG/PICC/wound/oncology care, background-checked, and doctor supervised.',
  },
  {
    id: 11,
    question: 'Will my existing doctor stay involved?',
    answer: 'Yes — we coordinate with your treating doctor for prescriptions, updates, and escalation.',
  },
  {
    id: 12,
    question: 'How often will a doctor review the case?',
    answer: 'Doctors review at onboarding, weekly, and whenever complications arise. Tele-consults are available 24×7.',
  },
  {
    id: 13,
    question: 'How do you ensure nurse reliability & safety at home?',
    answer: 'Every nurse goes through background verification, skill testing, infection control training, and regular supervision.',
  },
  {
    id: 14,
    question: 'Is this service suitable for NRI families managing loved ones remotely?',
    answer: 'Yes — we provide real-time WhatsApp updates, photo reports, incident alerts, and video reviews for peace of mind.',
  },
  {
    id: 15,
    question: 'How do you document and share care updates?',
    answer: 'We maintain digital logs, vitals tracking, wound photos, feed/infusion reports, and daily WhatsApp updates.',
  },
  {
    id: 16,
    question: 'How do you handle emergency situations?',
    answer: 'We have a 24×7 nurse hotline, doctor escalation, and pre-mapped hospital backup for airway, line, or infusion emergencies.',
  },
  {
    id: 17,
    question: 'Can we switch between care levels if my patient improves or worsens?',
    answer: 'Yes — we offer smooth upgrade/downgrade paths to Advanced Care or ICU at Home without re-hospitalisation.',
  },
  {
    id: 18,
    question: 'Can you support multiple conditions (e.g., tracheostomy + PEG + wound)?',
    answer: 'Yes — we design multi-procedure care plans and assign nurses skilled in each requirement.',
  },
  {
    id: 19,
    question: 'Do you help with diet & nutrition for tube-fed or TPN patients?',
    answer: 'Yes — our nurses work with dieticians for safe feeding schedules, flushes, and intolerance monitoring.',
  },
  {
    id: 20,
    question: 'Can Specialty Care help cancer & palliative patients?',
    answer: 'Absolutely — we offer pain & symptom relief, hydration, chemo port care, nutrition, and emotional support.',
  },
  {
    id: 21,
    question: 'Is your nursing care available 24/7?',
    answer: 'Yes, we provide flexible care options, including round-the-clock nursing coverage for complex medical needs.',
  },
  {
    id: 22,
    question: 'Do you provide training to family caregivers?',
    answer: 'Yes, our nurses actively train family members on basic suctioning, feeding techniques, and red-flag monitoring.',
  },
  {
    id: 23,
    question: 'How is your pricing structured?',
    answer: 'We offer transparent, all-inclusive pricing based on the procedures required. No hidden costs.',
  },
  {
    id: 24,
    question: 'Are your nurses trained for pain management & palliative comfort?',
    answer: 'Yes, they follow doctor-approved pain & symptom relief plans and support families emotionally.',
  },
  {
    id: 25,
    question: 'How do we book or get a quote for Specialty Nursing Care?',
    answer: 'Simply call 9600002303 or fill out our online request form. We offer a free initial assessment, transparent pricing, and a clear care plan before you commit.',
  },
];

export default function SpecialtyNursingCarePage() {
  const path = '/home-nursing-care/specialty-nursing-care';
  const schemas = [
    getWebPageSchema({ title: 'Specialty Nursing Care at Home in Chennai', description: metadata.description ?? '', path }),
    getServiceSchema({ name: 'Specialty Nursing Care at Home', description: metadata.description ?? '', path, serviceType: 'Tracheostomy, PEG feeding, stoma and PICC line nursing care' }),
    getItemListSchema('Specialty Nursing Care Packages', SPECIALTY_NURSING_PACKAGES.map((pkg) => ({ name: pkg.name, path: `${path}#package-${pkg.id}` }))),
    getFaqSchema(SPECIALTY_FAQS.slice(0, 6)),
  ];

  return (
    <>
      <StructuredDataScript data={schemas} />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Home Nursing Care', href: '/home-nursing-care' },
        { label: 'Specialty Nursing Care' },
      ]} />

      <main className="basic-care-v2">
        <section className="baby-hero" id="specialty-nursing-form">
          <div className="container baby-hero__grid">
            <div className="baby-hero__content">
              <h1>Specialty <span>Nursing Care</span> at Home</h1>
              <p className="hero__subtitle" style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: '1.6', marginTop: '1rem', marginBottom: '2rem' }}>
                Advanced clinical procedures at home — including tracheostomy care, PEG/NG feeding, PICC & TPN support, wound care, and peritoneal dialysis exchanges.
              </p>
              <div className="baby-hero__actions">
                <a href="#basic-care-packages" className="btn btn--outline btn--lg">View Packages <SiteIcon name="Arrow" size={18} /></a>
              </div>
            </div>
            <div className="baby-hero__visual">
              <Image src="/images/specialty-nursing-care/Pik 1.jpeg" alt="Specialty nursing care provider caring for a patient at home" fill sizes="(max-width: 992px) 100vw, 42vw" priority style={{ objectFit: 'cover' }} />
            </div>
            <CTAForm title="Book Specialty Nursing Care" packageOptions={SPECIALTY_NURSING_PACKAGE_NAMES} />
          </div>
        </section>

        <section className="section">
          <div className="container baby-summary">
            <div className="baby-image-panel">
              <Image src="/images/specialty-nursing-care/Pik 3.jpg" alt="Specialty nurse assisting patient with clinical support" fill sizes="(max-width: 992px) 100vw, 38vw" style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h2>What is Specialty Nursing Care at Home</h2>
              <p>
                Specialty Nursing Care is an advanced level of home care bridging the gap between basic nursing and ICU-level support. Designed for patients in stable recovery who require specific high-grade medical procedures, our service brings hospital-grade clinical care directly to your home. Procedures including tracheostomy maintenance, PEG/NG tube feeding, PICC/Central line care, advanced wound debridement, and peritoneal dialysis are all performed under doctor-led protocols with rigorous infection control standards.
              </p>
              <Link href="#specialty-nursing-form" className="btn btn--primary btn--lg">Book Specialty Nursing Care <SiteIcon name="Arrow" size={18} /></Link>
            </div>
          </div>
        </section>

        <section className="section basic-care-v2__who basic-care-v2__who-model">
          <div className="container">
            <div className="basic-care-v2__who-model-title"><h2>Who We Care For Under Specialty Nursing Care</h2></div>
            <div className="basic-care-v2__who-model-intro">
              <div className="basic-care-v2__who-model-copy">
                <p>
                  Specialty Nursing Care at Narpavi Homecare is built for patients who need advanced procedures at home - safe, supervised and hospital-grade.
                </p>
                <p>
                  Our specialized home nursing services in Chennai support patients transitioning from hospital ICU step-down wards or undergoing post-surgery recovery. By providing doctor-supervised care for tracheostomy, enteral feeding (PEG/NG tube), stoma management, and infusion therapy, we help families minimize re-hospitalization risks and ensure complete safety and comfort at home.
                </p>
              </div>
              <div className="basic-care-v2__who-model-image">
                <Image src="/images/specialty-nursing-care/Pik 4.jpeg" alt="Specialty nursing patient demographic" fill sizes="(max-width: 768px) 100vw, 240px" style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="basic-care-v2__who-model-grid">
              {SPECIALTY_WHO_WE_HELP.map((person) => (
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
              <Link href="#specialty-nursing-form" className="btn btn--primary btn--lg">Book Specialty Nursing Care</Link>
            </div>
          </div>
        </section>

        <section className="section section--alt basic-care-v2__deliverables basic-care-v2__deliverables-model">
          <div className="container">
            <div className="basic-care-v2__deliverables-model-shell">
              <div className="basic-care-v2__deliverables-model-title"><h2>What We Deliver in Comprehensive Specialty Nursing Care</h2></div>
              
              <div className="basic-care-v2__who-model-intro">
                <div className="basic-care-v2__who-model-copy" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ textAlign: 'center', margin: 0 }}>
                    Narpavi Homecare&apos;s Specialty Nursing Care in Chennai covers every advanced nursing procedure that families typically struggle to manage at home, all under doctor-guided protocols and High standard infection control.
                  </p>
                </div>
                <div className="basic-care-v2__who-model-image">
                  <Image src="/images/specialty-nursing-care/Pik 5.jpeg" alt="Specialty Nursing Care Equipment" fill sizes="(max-width: 768px) 100vw, 240px" style={{ objectFit: 'cover' }} />
                </div>
              </div>

              <div className="basic-care-v2__deliverables-model-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {SPECIALTY_DELIVERABLES.map((item, idx) => (
                  <article className="basic-care-v2__deliverables-model-card" key={idx}>
                    <span className="basic-care-v2__deliverables-model-icon"><SiteIcon name={item.icon} size={22} /></span>
                    {item.content}
                  </article>
                ))}
              </div>
              <div className="basic-care-v2__deliverables-model-action" style={{ marginTop: '3rem' }}>
                <Link href="#specialty-nursing-form" className="btn btn--primary btn--lg">Book Specialty Nursing Care</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="basic-care-packages">
          <div className="container">
            <div className="section__header basic-care-v2__packages-header">
              <h2>Packages Designed for Advanced Home Recovery & Specialty Procedures</h2>
              <p>
                We offer seven Specialty Nursing Care plans to match each person’s recovery trajectory.<br />
                Select the care plan that best fits your loved one’s health requirement, or ask our clinical team to guide you.
              </p>
            </div>
            <SpecialtyCarePackageSelector />
          </div>
        </section>

        <section className="section section--alt baby-trust-section basic-care-v2__trust">
          <div className="container">
            <div className="section__header basic-care-v2__trust-header">
              <h2>Why Families Trust Narpavi Homecare for Specialty Nursing Care</h2>
              <p>
                When you choose Narpavi Homecare for Specialty Nursing Care in Chennai, you&apos;re protected by a hospital grade safety net - without leaving home.
              </p>
            </div>
            <div className="baby-trust-orbit basic-care-v2__trust-orbit">
              <div className="baby-trust-visual">
                <span className="baby-trust-visual__ring" aria-hidden="true" />
                <div className="baby-trust-visual__image">
                  <Image src="/images/specialty-nursing-care/Pik 2.png" alt="Doctor and nurse reviewing clinical homecare report" fill sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 350px" style={{ objectFit: 'cover' }} />
                </div>
                <div className="baby-trust-visual__badge"><SiteIcon name="Safety shield" size={19} /><span>Hospital-grade safety at home</span></div>
              </div>
              {SPECIALTY_TRUST_POINTS.map((item, index) => (
                <article className={`baby-trust-card baby-trust-card--${index + 1}`} key={item.title} style={{ '--baby-trust-order': index } as CSSProperties}>
                  <div className="baby-trust-card__icon"><SiteIcon name={item.icon} size={22} /></div>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </article>
              ))}
            </div>

            <p className="basic-care-v2__deliverables-model-note" style={{ marginTop: '3rem', textAlign: 'center' }}>
              Peace of mind comes from knowing your loved one is cared for by trained professionals who follow proven healthcare safety standards &mdash; while keeping you informed every day.
            </p>
            <div className="basic-care-v2__trust-action" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <Link href="#specialty-nursing-form" className="btn btn--primary btn--lg">Book Specialty Nursing Care</Link>
            </div>
          </div>
        </section>

        <section className="section section--alt" id="basic-care-faq">
          <div className="container">
            <div className="section__header">
              <h2>FAQs</h2>
            </div>
            <FAQAccordion faqs={SPECIALTY_FAQS} />
          </div>
        </section>

        <section className="section basic-care-v2__blogs" id="basic-care-blogs">
          <div className="container">
            <GatedDownloadResources
              heading="Learn & Prepare — Free Resources for Families"
              intro={(
                <>
                  <p>We believe informed families make better care decisions. That&apos;s why Narpavi Homecare provides guides, expert tips and practical advice for anyone considering Specialty Nursing Care at home.</p>
                  <p>Read, download, and share these resources to feel confident about arranging safe, comfortable home care.</p>
                </>
              )}
              image="/images/specialty-nursing-care/Pik 14.jpeg"
              imageAlt="Specialty Nursing Care educational guides"
              modalDescription="Fill out these details to download your copy of the Specialty Care Guide."
              downloadFallbackName="specialty-nursing-care-guide.pdf"
              downloadButtonLabel="Download Guide"
              downloads={SPECIALTY_NURSING_DOWNLOADS}
              resources={SPECIALTY_NURSING_RESOURCES}
            />
          </div>
        </section>

        <section className="cta-strip baby-final-cta">
          <div className="container baby-final-cta__grid">
            <div>
              <h2>Start Safe, Specialist-Led Nursing Care at Home — Today</h2>
              <p>Book a free expert assessment for Fast onboarding | Verified caregivers | 24×7 emergency support | Transparent pricing</p>
              <div className="cta-strip__badges">
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Tracheostomy</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> PEG/NG Feeding</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> PICC & TPN</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Colostomy/Stoma</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Wound & Bedsore</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> BiPAP/CPAP</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Oncology Comfort</span>
                <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Dialysis Support</span>
              </div>
            </div>
            <CTAForm title="Book Specialty Nursing Care" packageOptions={SPECIALTY_NURSING_PACKAGE_NAMES} />
          </div>
        </section>
      </main>
    </>
  );
}
