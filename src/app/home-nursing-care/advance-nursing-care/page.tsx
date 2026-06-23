import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { FAQ } from '@/lib/faqs';
import { BRAND } from '@/lib/constants';
import { getFaqSchema, getItemListSchema, getServiceSchema, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import FAQAccordion from '@/components/sections/FAQAccordion';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'Advanced Nursing Care at Home in Chennai | IV & Infusion Support',
  description: 'Doctor-prescribed IV, infusion, recovery monitoring and oxygen support at home in Chennai, delivered by trained nursing professionals.',
  keywords: ['advanced nursing care chennai', 'IV therapy at home Chennai', 'infusion nurse Chennai', 'oxygen therapy at home'],
  alternates: { canonical: 'https://www.narpavihomecare.com/home-nursing-care/advance-nursing-care' },
};

type AdvancePackage = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  color: string;
  gradient: string;
  icon: string;
  idealFor: string[];
  highlights: Array<{ title: string; description?: string }>;
  costCue: string;
};

const PACKAGE_NAMES = ['IV Support Care', 'Infusion Plus Care', 'Recovery & Monitoring Care', 'OxyCare Support'];

const ADVANCE_PACKAGES: AdvancePackage[] = [
  {
    id: 'iv-support-care',
    name: 'IV Support Care',
    tagline: 'Short-term IV fluids & medications at home',
    image: '/images/advance-nursing-care/Pik 6.png',
    color: '#0A8F8F',
    gradient: 'linear-gradient(135deg, #065E5E 0%, #0A8F8F 56%, #0CB3B3 100%)',
    icon: 'IV infusion nursing',
    idealFor: ['Short courses of prescribed IV fluids or medication', 'Patients recovering from dehydration, fever or weakness', 'Families seeking a planned alternative to repeated hospital visits'],
    highlights: [
      { title: 'Prescribed IV therapy', description: 'Peripheral IV cannulation, fluids and IV antibiotics or IM injections only as ordered by the treating doctor.' },
      { title: 'Reaction watch', description: 'Vital signs are observed during the session and the family is alerted to any concern that needs escalation.' },
      { title: 'Clear session records', description: 'A simple digital log keeps medication timing, observations and family updates in one place.' },
    ],
    costCue: 'A focused option for one or a few planned IV sessions without an avoidable extended hospital stay.',
  },
  {
    id: 'infusion-plus-care',
    name: 'Infusion Plus Care',
    tagline: 'Long-term IV therapy with ongoing monitoring',
    image: '/images/advance-nursing-care/Pik 7.png',
    color: '#5B8DEF',
    gradient: 'linear-gradient(135deg, #315CA8 0%, #5B8DEF 56%, #8DB8FF 100%)',
    icon: 'Infusion therapy',
    idealFor: ['Long-term doctor-prescribed IV antibiotic therapy', 'Chronic conditions needing planned hydration, pain relief or infusion support', 'Autoimmune or rheumatology patients with routine prescribed drips'],
    highlights: [
      { title: 'Continuity across sessions', description: 'Nurses follow the prescribed care plan and maintain consistent session-to-session records.' },
      { title: 'Ongoing clinical observation', description: 'Vitals, comfort and treatment tolerance are monitored while your family receives regular updates.' },
      { title: 'Coordinated communication', description: 'The team helps keep your treatment schedule, observations and escalation notes organised.' },
    ],
    costCue: 'A structured at-home plan for recurring infusion needs with visible monitoring and communication.',
  },
  {
    id: 'recovery-monitoring-care',
    name: 'Recovery & Monitoring Care',
    tagline: 'Comprehensive IV care with close nurse supervision',
    image: '/images/advance-nursing-care/Pik 8.png',
    color: '#E56C45',
    gradient: 'linear-gradient(135deg, #B9442B 0%, #E56C45 54%, #F6A56B 100%)',
    icon: 'Recovery monitoring',
    idealFor: ['Post-surgical patients with a higher monitoring need', 'Palliative patients receiving doctor-prescribed comfort medicines', 'Chronic illness recovery with frequent infusions and close observation'],
    highlights: [
      { title: 'Extended recovery checks', description: 'The care plan can include BP, SpO2, pulse and other prescribed observations alongside medication support.' },
      { title: 'Escalation readiness', description: 'Changes that need clinical attention are documented and escalated according to the agreed care plan.' },
      { title: 'Comfort & daily support', description: 'Practical help with mobility, hydration, nutrition support and daily comfort can be planned for weakened patients.' },
    ],
    costCue: 'Higher-touch support for a recovery phase where close observation and clear communication matter.',
  },
  {
    id: 'oxycare-support',
    name: 'OxyCare Support',
    tagline: 'Safe oxygen & nebulization therapy at home',
    image: '/images/advance-nursing-care/Pik 9.png',
    color: '#7657D9',
    gradient: 'linear-gradient(135deg, #4933A5 0%, #7657D9 56%, #A28BEB 100%)',
    icon: 'Oxygen respiratory care',
    idealFor: ['Patients prescribed intermittent oxygen or nebulizer support', 'COPD or asthma patients needing planned respiratory support', 'Families who need safe oxygen-device guidance at home'],
    highlights: [
      { title: 'Equipment setup guidance', description: 'Support for prescribed oxygen concentrator setup and nebulizer administration as part of the care plan.' },
      { title: 'SpO2 & vital observation', description: 'Oxygen saturation and prescribed vitals are checked during supported sessions.' },
      { title: 'Family safety education', description: 'Families receive practical guidance on oxygen safety, fire precautions and when to seek urgent medical help.' },
    ],
    costCue: 'Planned respiratory support at home with safe setup, clear records and family guidance.',
  },
];

const BENEFITS = [
  {
    title: 'Clinical care in familiar surroundings',
    icon: 'Home clinical nursing',
    points: ['Doctor-prescribed therapy delivered at home', 'Less travel and waiting for stable patients', 'Comfort and reassurance in a familiar environment', 'Care planned around the patient’s routine'],
  },
  {
    title: 'Better visibility for families',
    icon: 'Family health updates',
    points: ['Daily logs and treatment observations', 'Clear communication around the care plan', 'Family updates for relatives living away', 'A documented escalation path when needed'],
  },
  {
    title: 'Support for recovery transitions',
    icon: 'Post hospital recovery',
    points: ['Post-discharge IV and medication support', 'Vitals and recovery observation', 'Mobility and comfort support when planned', 'Guidance on when higher-level care may be needed'],
  },
];

const DELIVERABLES = [
  { title: 'Clinical IV & infusion support', description: 'Prescribed IV fluids, antibiotics, injections and infusion therapy delivered by trained nursing professionals.', icon: 'IV infusion nursing' },
  { title: 'Health monitoring & early warning', description: 'Vitals and treatment tolerance are observed to help identify concerns that require timely escalation.', icon: 'Vital monitoring' },
  { title: 'Aseptic technique & home safety', description: 'Care is delivered with strict attention to hygiene, infection prevention and safe home practices.', icon: 'Infection safety' },
  { title: 'Doctor-guided coordination', description: 'The nursing plan follows the treating doctor’s prescription, with clear documentation for clinical communication.', icon: 'Doctor supervision' },
  { title: 'Comfort & daily-living assistance', description: 'When planned, support can include mobility, hydration, nutrition and comfort for patients regaining strength.', icon: 'Daily living support' },
  { title: 'Reporting & transparency', description: 'Digital care notes and family updates make it easier to follow treatment milestones and observations.', icon: 'Digital report' },
];

const WHO_WE_HELP = [
  'People recovering after surgery who still need prescribed IV medication, fluids or close observation',
  'Patients on longer IV antibiotic courses for infections such as UTI, pneumonia or bone and joint infections',
  'Adults recovering from dehydration, viral illness, fever or weakness who have a doctor-prescribed plan',
  'People receiving planned infusion support for chronic, autoimmune or rheumatology conditions',
  'Cardiac, stroke or neurology recovery patients who need nursing observation alongside their doctor’s plan',
  'Families arranging transparent, well-documented care for a loved one in Chennai from a distance',
];

const TRUST_POINTS = [
  { title: 'Verified nursing professionals', description: 'Care is delivered by trained, background-checked nursing professionals selected for the planned clinical need.', icon: 'Verified nurse' },
  { title: 'Doctor-prescribed care plans', description: 'Medication, infusion and treatment steps follow the treating doctor’s instructions and agreed care plan.', icon: 'Doctor clinical plan' },
  { title: 'Strict hygiene practices', description: 'Aseptic technique, hand hygiene and safe disposal practices are central to every home visit.', icon: 'Infection hygiene safety' },
  { title: 'Early escalation protocol', description: 'The team records concerns and follows the agreed escalation route when the patient’s condition changes.', icon: 'Emergency escalation' },
  { title: 'Digital logs & family updates', description: 'Treatment observations and care updates help families stay informed, including those living abroad.', icon: 'Digital family report' },
  { title: 'Flexible package guidance', description: 'Care is matched to the prescribed treatment, patient stability, home setting and preferred schedule.', icon: 'Personalized care package' },
];

const ADVANCE_FAQS: FAQ[] = [
  {
    id: 1,
    question: 'What does Advanced Nursing Care at home include?',
    answer: 'Advanced Nursing Care supports doctor-prescribed IV therapy, infusion care, injections, clinical observations, post-discharge recovery support and, where appropriate, oxygen or nebulizer support. The exact services depend on the patient’s prescription and assessment.',
  },
  {
    id: 2,
    question: 'Can IV antibiotics or fluids be given at home?',
    answer: 'Yes, when they are prescribed by the treating doctor and the patient is suitable for home-based care. Our team reviews the requirement, home setting and monitoring needs before planning care.',
  },
  {
    id: 3,
    question: 'Who supervises the nursing care plan?',
    answer: 'The nursing team works from the treating doctor’s prescription and agreed care plan. Observations and concerns are documented so they can be escalated through the agreed clinical route when needed.',
  },
  {
    id: 4,
    question: 'Can families receive updates if they live outside Chennai or abroad?',
    answer: 'Yes. With the patient or family’s consent, we can share agreed care updates and digital logs so the wider family can stay informed about the planned treatment and observations.',
  },
  {
    id: 5,
    question: 'Is this service for emergencies?',
    answer: 'No. Advanced Nursing Care is a planned home-care service for medically stable patients. In a medical emergency, call your local emergency service or go to the nearest hospital immediately.',
  },
  {
    id: 6,
    question: 'How do I choose the right package?',
    answer: 'Tell us the doctor’s prescription, the patient’s current condition, location and preferred timing. Our care coordinator will help you understand which package best matches the planned level of support.',
  },
  {
    id: 7,
    question: 'How much does IV therapy at home cost in Chennai?',
    answer: 'Single IV sessions start at ₹800-1200; 8-12 hr nurse shifts range from ₹1,500-₹1700; 24 hr care is ₹2,500-₹3000/day. This is usually 40-60% cheaper than hospital admission.',
  },
  {
    id: 8,
    question: 'Do you provide equipment like IV stands or oxygen?',
    answer: 'Yes, we arrange IV stands, infusion sets, oxygen concentrators, nebulizers and other essentials if needed.',
  },
  {
    id: 9,
    question: 'What if my patient’s condition worsens?',
    answer: 'We have rapid escalation protocols - our nurses alert doctors, start first-line stabilisation, and help arrange safe hospital transfer if required.',
  },
  {
    id: 10,
    question: 'Can families monitor care remotely?',
    answer: 'Yes. We provide digital daily logs and WhatsApp updates (ideal for NRI families) with vitals, medication records and incident alerts.',
  },
  {
    id: 11,
    question: 'How quickly can services start?',
    answer: 'Usually within 24-48 hours of assessment and doctor’s prescription verification.',
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
    answer: 'Yes. We provide a seamless upgrade path - from Advanced to Specialty Care (tracheostomy, feeding tubes) or full ICU-at-Home.',
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
    answer: `Call ${BRAND.phoneFormatted} or fill our Request Free Assessment form online. We’ll schedule a nurse assessment, create a personalized plan, and start care within 24-48 hours.`,
  },
];

function packageStyle(pkg: AdvancePackage) {
  return {
    '--package-color': pkg.color,
    '--package-gradient': pkg.gradient,
  } as CSSProperties;
}

export default function AdvanceNursingCarePage() {
  const path = '/home-nursing-care/advance-nursing-care';
  const schemas = [
    getWebPageSchema({ title: 'Advanced Nursing Care at Home in Chennai', description: metadata.description ?? '', path }),
    getServiceSchema({ name: 'Advanced Nursing Care at Home', description: metadata.description ?? '', path, serviceType: 'IV, infusion and advanced nursing care at home' }),
    getItemListSchema('Advanced Nursing Care Packages', ADVANCE_PACKAGES.map((pkg) => ({ name: pkg.name, path: `${path}#package-${pkg.id}` }))),
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

      <section className="baby-hero" id="advance-nursing-form">
        <div className="container baby-hero__grid">
          <div className="baby-hero__content">
            <div className="hero__badge"><SiteIcon name="Advanced Clinical Nursing" size={16} /> IV, Infusion & Recovery Support</div>
            <h1>Safe <span>Advanced Nursing Care</span> at Home</h1>
            <p>
              Doctor-prescribed IV therapy, infusion support, recovery monitoring and oxygen care delivered by trained nursing professionals in the comfort of home.
            </p>
            <div className="baby-hero__actions">
              <a href="#advance-nursing-packages" className="btn btn--outline btn--lg">Explore packages <SiteIcon name="Arrow" size={18} /></a>
            </div>
          </div>
          <div className="baby-hero__visual">
            <Image src="/images/advance-nursing-care/Pik 1.png" alt="Nurse providing IV support to a patient at home" fill sizes="(max-width: 992px) 100vw, 42vw" priority />
          </div>
          <CTAForm title="Book Advanced Nursing Assessment" packageOptions={PACKAGE_NAMES} />
        </div>
      </section>

      <section className="section" id="advance-nursing-summary">
        <div className="container baby-summary">
          <div className="baby-image-panel">
            <Image src="/images/advance-nursing-care/Pik 3.png" alt="Advanced nursing and infusion support at home" fill sizes="(max-width: 992px) 100vw, 38vw" />
          </div>
          <div>
            <span className="section-kicker">A calmer recovery at home</span>
            <h2>Advanced care for needs beyond basic nursing</h2>
            <p>
              Our service is the ideal for those who are medically stable but require IV therapy, injections or infusion support at home. Here are the people with, we help most.
            </p>
            <p>
              Advanced nursing care in Chennai - IV therapy at home, infusion support, doctor supervised nursing, NRI friendly care.
            </p>
            <Link href="#advance-nursing-form" className="btn btn--primary btn--lg">Book a clinical assessment <SiteIcon name="Arrow" size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="advance-nursing-benefits">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Why home-based advanced care</span>
            <h2>Care that balances clinical attention with home comfort</h2>
            <p>Our service is the ideal for those who are medically stable but require IV therapy, injections or infusion support at home. Here are the people with, we help most.</p>
          </div>
          <div className="baby-benefit-grid">
            {BENEFITS.map((benefit) => (
              <article className="baby-benefit-card" key={benefit.title}>
                <div><SiteIcon name={benefit.icon} size={28} /></div>
                <h3>{benefit.title}</h3>
                <ul>
                  {benefit.points.map((point) => <li key={point}><SiteIcon name="Check" size={15} /> {point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section baby-deliverables-section" id="advance-nursing-deliverables">
        <div className="container baby-deliverables">
          <div className="section__header baby-deliverables__header">
            <span className="section-kicker">What your care plan can include</span>
            <h2>Complete support for IV, infusion & recovery care</h2>
            <p>Advanced Nursing Care from Narpavi Homecare is more than just IV therapy - it's a complete, hospital-grade service framework designed to keep patients safe, comfortable and well-monitored at home.</p>
          </div>
          <div className="baby-deliverables-orbit">
            <div className="baby-deliverables-visual">
              <span className="baby-deliverables-visual__ring" aria-hidden="true" />
              <div className="baby-deliverables-visual__image">
                <Image src="/images/advance-nursing-care/Pik 5.jpeg" alt="Nurse providing monitored oxygen and infusion care at home" fill sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 340px" />
              </div>
              <div className="baby-deliverables-visual__badge"><SiteIcon name="Clinical nursing" size={19} /><span>Advanced nursing care in Chennai</span></div>
            </div>
            {DELIVERABLES.map((item, index) => (
              <article className={`baby-deliverable-card baby-deliverable-card--${index + 1}`} key={item.title} style={{ '--baby-deliverable-order': index } as CSSProperties}>
                <div className="baby-deliverable-card__icon"><SiteIcon name={item.icon} size={22} /></div>
                <div>
                  <span className="baby-deliverable-card__eyebrow">Care {String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  {item.description && <p>{item.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt baby-who-section" id="advance-nursing-who">
        <div className="container baby-who">
          <div className="section__header baby-who__header">
            <span className="section-kicker">Who we commonly support</span>
            <h2>For patients who need more than basic care</h2>
            <p>Our service is the ideal for those who are medically stable but require IV therapy, injections or infusion support at home. Here are the people with, we help most.</p>
          </div>
          <div className="baby-who-orbit">
            <div className="baby-who-visual">
              <span className="baby-who-visual__ring" aria-hidden="true" />
              <div className="baby-who-visual__image">
                <Image src="/images/advance-nursing-care/Pik 4.png" alt="Patient receiving professional nursing care at home" fill sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 340px" />
              </div>
              <div className="baby-who-visual__badge"><SiteIcon name="Family nursing care" size={19} /><span>Support for patients and families</span></div>
            </div>
            {WHO_WE_HELP.map((item, index) => (
              <article className={`baby-who-card baby-who-card--${index + 1}`} key={item} style={{ '--baby-who-order': index } as CSSProperties}>
                <div className="baby-who-card__icon"><SiteIcon name="Advanced nursing care" size={20} /></div>
                <div><span className="baby-who-card__eyebrow">Support {String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="advance-nursing-packages">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Packages</span>
            <h2>Choose the Right Advance Nursing Care Package</h2>
            <p>Every recovery journey is different. That's why Narpavi Advance Nursing Care offers four carefully designed packages from basic IV Support to a full Oxygen Care.</p>
          </div>
          <div className="elder-packages-layout">
            <aside className="elder-sidebar" aria-label="Advanced nursing care package navigation">
              <h3>Care packages</h3>
              {ADVANCE_PACKAGES.map((pkg) => (
                <a href={`#package-${pkg.id}`} className="elder-sidebar__link" key={pkg.id} style={packageStyle(pkg)}>
                  <span><SiteIcon name={pkg.icon} size={19} /></span><strong>{pkg.name}</strong><small>{pkg.tagline}</small>
                </a>
              ))}
            </aside>
            <div className="elder-package-list">
              {ADVANCE_PACKAGES.map((pkg) => (
                <article className="elder-package-card" id={`package-${pkg.id}`} key={pkg.id} style={packageStyle(pkg)}>
                  <div className="elder-package-card__header">
                    <div>
                      <div className="elder-package-card__icon"><SiteIcon name={pkg.icon} size={24} /></div>
                      <h3>{pkg.name}</h3><p>{pkg.tagline}</p>
                    </div>
                    <Link href={`/home-nursing-care/advance-nursing-care/${pkg.id}`} className="btn btn--white btn--sm">View Details <SiteIcon name="Arrow" size={16} /></Link>
                  </div>
                  <div className="elder-package-card__body">
                    <div className="elder-package-card__media">
                      <Image src={pkg.image} alt={`${pkg.name} advanced nursing care package`} fill sizes="(max-width: 992px) 100vw, 28vw" />
                    </div>
                    <div>
                      <h4>Best for</h4>
                      <div className="elder-tag-list">{pkg.idealFor.map((item) => <span key={item}>{item}</span>)}</div>
                      <div className="elder-highlight-list">
                        {pkg.highlights.map((item) => (
                          <div className="elder-highlight-point" key={item.title}>
                            <SiteIcon name="Check" size={18} /><div><strong>{item.title}</strong><p>{item.description}</p></div>
                          </div>
                        ))}
                      </div>
                      <p className="elder-package-card__cue"><strong>Care-plan note:</strong> {pkg.costCue}</p>
                      <div className="elder-package-card__actions"><Link href={`/home-nursing-care/advance-nursing-care/${pkg.id}`} className="btn btn--outline btn--sm">Explore Package</Link><a href={`/home-nursing-care/advance-nursing-care/${pkg.id}#advance-package-form`} className="btn btn--primary btn--sm">Book Now</a></div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="text-center mt-4"><a href="#advance-nursing-form" className="btn btn--secondary btn--lg">Talk to a care coordinator <SiteIcon name="Arrow" size={18} /></a></div>
        </div>
      </section>

      <section className="section section--alt baby-trust-section" id="advance-nursing-trust">
        <div className="container baby-trust">
          <div className="section__header baby-trust__header">
            <span className="section-kicker">Why families trust Narpavi</span>
            <h2>Safety, skill & clear communication at every step</h2>
            <p>Choosing an IV or infusion service at home is not just about convenience, it's about safety, skill and reliable clinical backup. At Narpavi Homecare, every Advanced Nursing Care plan is built with strict safety standards and hospital-grade protocols so you can focus on healing with peace of mind.</p>
          </div>
          <div className="baby-trust-orbit">
            <div className="baby-trust-visual">
              <span className="baby-trust-visual__ring" aria-hidden="true" />
              <div className="baby-trust-visual__image">
                <Image src="/images/advance-nursing-care/Pik 2.jpg" alt="Doctor and nurse supporting a patient receiving IV therapy" fill sizes="(max-width: 640px) 82vw, (max-width: 992px) 420px, 350px" />
              </div>
              <div className="baby-trust-visual__badge"><SiteIcon name="Safety shield" size={19} /><span>Proven Experience Across Chennai</span></div>
            </div>
            {TRUST_POINTS.map((item, index) => (
              <article className={`baby-trust-card baby-trust-card--${index + 1}`} key={item.title} style={{ '--baby-trust-order': index } as CSSProperties}>
                <div className="baby-trust-card__icon"><SiteIcon name={item.icon} size={22} /></div>
                <div><span className="baby-trust-card__eyebrow">Trust {String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="advance-nursing-faq">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">FAQs</span>
            <h2>Frequently asked questions</h2>
            <p>Clear answers on IV therapy, home infusion support, clinical oversight and booking Advanced Nursing Care in Chennai.</p>
          </div>
          <FAQAccordion faqs={ADVANCE_FAQS.slice(0, 6)} />
        </div>
      </section>

      <section className="cta-strip baby-final-cta">
        <div className="container baby-final-cta__grid">
          <div>
            <h2>Plan safe IV & infusion support at home.</h2>
            <p>Avoid extra hospital bills and infection risk - let our doctor-supervised IV-certified nurses care for your loved one at home. Every care plan is nurse-supervised and doctor-guided, ensuring safe medication administration, early complication detection and 24×7 emergency escalation if health changes. Families, especially NRIs, receive digital daily logs, vitals tracking and instant WhatsApp updates for complete transparency.</p>
            <div className="cta-strip__badges">
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> IV therapy at home</span>
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Infusion support</span>
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Doctor supervised nursing</span>
              <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> NRI friendly care</span>
            </div>
          </div>
          <CTAForm title="Book Advanced Nursing Assessment" packageOptions={PACKAGE_NAMES} />
        </div>
      </section>
    </>
  );
}
