import type { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTAForm from '@/components/ui/CTAForm';
import FAQAccordion from '@/components/sections/FAQAccordion';
import GatedDownloadResources from '@/components/sections/GatedDownloadResources';
import SiteIcon from '@/components/ui/SiteIcon';
import styles from './patient-assistant-care.module.css';

export const metadata: Metadata = {
  title: 'Patient Care Assistant Services | Narpavi Homecare',
  description: 'Trained, verified Patient Care Assistants for elder care, post-hospital recovery and daily living support at home.',
  alternates: { canonical: 'https://www.nhlcare.com/home-nursing-care/patient-assistant-care' },
};

const root = '/images/patient-assistant-care/';

const people = [
  'Elderly individuals needing daily assistance or companionship',
  'Old-age homes & assisted living facilities – outsourcing daily care staff',
  'Post-hospital patients recovering from surgeries, injuries, or illnesses',
  'Bedridden patients who require round-the-clock monitoring and care',
  'Patients with chronic illness such as cancer, Parkinson’s, or neurological disorders',
  'NRIs seeking reliable care for their parents in India',
  'Corporate HR departments and insurance companies – bundled home care plans',
  'Hospitals & rehab centers – referral tie-ups for post-discharge patients',
];

const deliverables = [
  ['Daily Personal Care Assistance', 'Support with bathing, grooming, dressing, toileting and comfortable daily routines.', 'Personal care'],
  ['Nutrition Support', 'Meal preparation, feeding support and hydration assistance suited to the patient’s routine.', 'Nutrition'],
  ['Medication Support', 'Timely medication reminders and support in following the prescribed care plan.', 'Medication'],
  ['Companionship & Emotional Support', 'A caring presence, conversation and reassurance that help patients feel secure at home.', 'Companion Care'],
  ['Home Safety & Hygiene', 'A clean, organised and safer everyday environment focused on comfort and dignity.', 'Safety shield'],
  ['Emergency Response', 'Basic first-aid awareness and prompt escalation to family and emergency services when required.', 'Emergency'],
];

const reasonGroups = [
  {
    image: 'Pic 6.jpg',
    imagePosition: 'right',
    items: [
      {
        title: 'Police-Verified & Medically Fit Caregivers',
        description: 'Your family’s safety is our top priority.',
      },
      {
        title: 'Trained & Certified Staff',
        description: 'All PCAs undergo professional home health care training.',
      },
    ],
  },
  {
    image: 'Pic 7.png',
    imagePosition: 'left',
    items: [
      {
        title: '24×7 Supervision & Support',
        description: 'Regular home visits and performance checks.',
      },
      {
        title: 'Transparent Communication',
        description: 'Daily updates, digital reports, and video calls for families.',
      },
    ],
  },
  {
    image: 'Pic 8.jpg',
    imagePosition: 'right',
    items: [
      {
        title: 'Flexible & Affordable Plans',
        description: 'From a few hours a day to 24×7 live-in care.',
      },
      {
        title: 'Replacement Guarantee',
        description: 'Immediate caregiver replacement if required.',
      },
    ],
  },
];

const faqPairs = [
  ['What is a Patient Care Assistant (PCA) and how are they different from nurses?', 'A Patient Care Assistant (PCA) is a trained caregiver who assists patients with daily living activities such as bathing, feeding, mobility, and companionship. Unlike nurses, PCAs do not perform clinical or medical procedures, but work under guidance from healthcare professionals to ensure comfort and safety.'],
  ['What services does your home health care include?', 'We provide elder care, post-hospital recovery, dementia and Alzheimer’s care, palliative care, bedridden patient care, and daily living assistance.'],
  ['Are your caregivers trained and verified?', 'Yes. All our caregivers are professionally trained in patient handling and hygiene. They are police-verified and medically fit before deployment.'],
  ['Do you provide 24-hour live-in caregivers?', 'Yes, we provide both 12-hour shifts and 24-hour live-in caregivers based on your family’s needs.'],
  ['Can your caregivers handle bedridden patients?', 'Absolutely. Our caregivers are trained in repositioning, hygiene maintenance, feeding, and monitoring bedridden patients.'],
  ['Do you offer dementia and Alzheimer’s care?', 'Yes, we have specially trained caregivers who provide gentle, structured, and safe care for patients with memory-related conditions.'],
  ['Will the same caregiver stay with my loved one every day?', 'Yes, as far as possible we assign the same caregiver to maintain consistency, unless a replacement is requested or required.'],
  ['How do you match a caregiver to a patient?', 'We consider the patient’s health condition, language preference, gender preference, and personality to find the best match.'],
  ['How do I book a Patient Care Assistant?', 'You can call, WhatsApp, or fill out our online enquiry form. Our care manager will understand your needs and recommend the right service.'],
  ['What is the minimum service duration I can book?', 'Our minimum booking is generally 12 hours per day, but we also provide part-time or hourly care based on availability.'],
  ['Do you provide caregivers for short-term needs like post-surgery recovery?', 'Yes. We offer both short-term and long-term home care packages.'],
  ['How much does home care cost?', 'Prices depend on the service type, location, and patient needs. We offer competitive rates with transparent pricing.'],
  ['Do you offer monthly packages or hourly rates?', 'Yes. We provide flexible monthly, weekly, and daily packages tailored to your requirements.'],
  ['What payment modes do you accept?', 'We accept bank transfers, UPI, cheque, and cash payments.'],
  ['Are your caregivers police-verified?', 'Yes. We ensure all our caregivers have undergone police verification and background checks.'],
  ['How do you ensure quality of care?', 'Our supervisors conduct regular home visits, collect feedback from families, and provide ongoing caregiver training.'],
  ['What happens if I am not satisfied with the caregiver?', 'We offer an immediate replacement to ensure your satisfaction.'],
  ['How do you handle emergencies?', 'Our caregivers are trained in basic first aid and emergency response. In critical cases, they immediately alert the family and emergency services.'],
  ['Is there a replacement guarantee if my caregiver cannot come?', 'Yes. We provide quick replacements in case of absenteeism or unavailability.'],
  ['Can you provide male or female caregivers as per preference?', 'Yes. We try to accommodate gender preferences whenever possible.'],
  ['Do you provide caregivers who can cook or help with household chores?', 'Yes, if requested, we can provide caregivers who also assist with light meal preparation and simple household tasks.'],
  ['Can your caregivers travel with patients for appointments?', 'Yes, we can arrange caregivers to accompany patients for doctor visits or personal outings.'],
  ['Do you have caregivers for night duty only?', 'Yes. We offer both night duty and day duty caregivers.'],
  ['Do you serve patients outside metro cities?', 'Yes. We serve many tier-2 cities and towns, depending on caregiver availability.']
];

const faqs = faqPairs.map(([question, answer], id) => ({ id, question, answer }));

const PCA_DOWNLOADS = [
  {
    title: 'Download Free Patient Care Assistant & Caregiver Guide',
    fileUrl: '/downloads/patient-care-assistant-guide.pdf',
  },
];

const PCA_RESOURCES = [
  {
    title: 'What Does a Patient Care Assistant Do? A Complete Guide for Families',
    excerpt: 'When a loved one needs extra support at home, a Patient Care Assistant (PCA) can make all the difference.',
    image: root + 'Blog Pic 10.png',
    href: '/blog/what-does-a-basic-nursing-care-caregiver-do',
  },
  {
    title: '10 Signs Your Elderly Parent May Need Professional Care at Home',
    excerpt: 'Many families struggle to decide when to bring in professional help for elderly parents.',
    image: root + 'Blog Pic 15.png',
    href: '/blog/what-does-a-basic-nursing-care-caregiver-do',
  },
  {
    title: 'Post-Hospital Recovery at Home – How a Caregiver Can Help',
    excerpt: 'Recovering from surgery or illness is often faster and more comfortable at home with structured caregiver support.',
    image: root + 'Blog Pic 16.jpg',
    href: '/blog/post-hospital-recovery-at-home',
  },
];

export default function PatientAssistantCarePage() {
  return (
    <main className={`basic-care-v2 ${styles.page}`}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Home Nursing Care', href: '/home-nursing-care' },
          { label: 'Patient Assistant Care' },
        ]}
      />

      <section className={`baby-hero ${styles.hero}`} id="patient-assistant-form">
        <div className="container">
          <div className={`baby-hero__grid ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={styles.heroEyebrow}>Narpavi Homecare</span>
              <h1>
                Compassionate <em>Patient Care Taker</em> You Can Rely On
              </h1>
              <p>
                Professional, dependable support that helps your loved one live safely, comfortably and with dignity at home.
              </p>
              <a className="btn btn--secondary btn--lg" href="#patient-assistant-form">
                Book Patient Care Assistant Now <SiteIcon name="Arrow" size={18} />
              </a>
            </div>
            <div className={`baby-hero__visual ${styles.heroImage}`}>
              <Image
                src={root + 'Pic 1.jpg'}
                alt="Compassionate patient care assistant at home"
                fill
                priority
                sizes="(max-width: 992px) 100vw, 42vw"
              />
            </div>
            <CTAForm title="Book Patient Care Assistant" />
          </div>
        </div>
      </section>

     

      <section className={`section section--alt ${styles.who}`}>
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Who we care for</span>
            <h2>Everyday Support for Comfort, Safety & Independence</h2>
            {/* <p>
              For those who require a caretaker to support daily routines, maintain hygiene, personal comfort and safety,
              and help them feel independent and secure.
            </p> */}
          </div>
          <div className={styles.whoLayout}>
            <div className={styles.whoVisuals}>
              <div className={styles.whoImage}>
                <Image
                  src={root + 'Pic 3.png'}
                  alt="People who benefit from patient care assistant services"
                  fill
                  sizes="(max-width:992px) 100vw, 40vw"
                />
              </div>
              <div className={styles.whoInset}>
                <Image
                  src={root + 'Pic 4.png'}
                  alt="Patient assistant supporting recovery at home"
                  fill
                  sizes="(max-width:992px) 42vw, 16vw"
                />
              </div>
            </div>
            <div className={styles.whoGrid}>
              {people.map((x) => (
                <article key={x}>
                  <SiteIcon name="Check" size={18} />
                  <p>{x}</p>
                </article>
              ))}
            </div>
          </div>
          <div className={styles.center}>
            <a href="#patient-assistant-form" className="btn btn--primary">
              Book Patient Care Assistant Now
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header" style={{ maxWidth: '980px' }}>
            <span className="section-kicker">What we deliver</span>
            <h2>Patient-Centered Care at Home</h2>
            <p style={{ maxWidth: '940px', margin: '0 auto', textAlign: 'center' }}>
              To provide world-class patient-centered care at home, maintaining dignity and independence.
              <br />
              Our Patient Care Assistant program includes these non-clinical deliverables.
            </p>
          </div>
          <div className={styles.delivery}>
            <div className={styles.deliveryImage}>
              <Image
                src={root + 'Pic 5.jpg'}
                alt="Patient assistant care deliverables"
                fill
                sizes="(max-width:992px) 100vw, 38vw"
              />
            </div>
            <div className={styles.deliveryGrid}>
              {deliverables.map(([t, d, i]) => (
                <article key={t}>
                  <div>
                    <SiteIcon name={i} size={24} />
                  </div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </div>
          <div className={styles.center}>
            <a href="#patient-assistant-form" className="btn btn--primary">
              Book a Patient Care Assistant Now
            </a>
          </div>
        </div>
      </section>
       <section className="section">
        <div className={`container baby-summary ${styles.split}`}>
          <div className={`baby-image-panel ${styles.photo}`}>
            <Image
              src={root + 'Pic 2.png'}
              alt="Trusted patient care assistant services"
              fill
              sizes="(max-width: 992px) 100vw, 45vw"
            />
          </div>
          <div>
            {/* <span className="section-kicker">Trusted home support</span> */}
            <h2>Trusted Patient Care Assistants Services in Tamil Nadu</h2>
            <p>
              At Narpavi Homecare, we bring compassionate, professional, and affordable home health care right to your
              doorstep. Our Patient Care Assistants (PCAs) and Home Health Care Assistants are trained, verified, and
              experienced caregivers who provide personalized support to your loved ones, ensuring comfort, dignity, and
              safety at all times.
            </p>
            <p>
              Whether it’s elder care assistant services, post-hospital recovery care, bedridden patient care, or
              specialised nursing attendant services, we are here to make home the best place for healing and living.
            </p>
            <p>
              This is an end-to-end caretaker non-clinical service for people who do not require clinical procedures, or
              who already have professional nursing services but require additional support.
            </p>
            <a href="#patient-assistant-form" className="btn btn--primary">
              Book Patient Care Assistant Now
            </a>
          </div>
        </div>
      </section>

      <section className={`section section--alt ${styles.why}`} id="pca-why">
        <div className="container">
          <div className="section__header" style={{ maxWidth: '980px' }}>
            <span className="section-kicker">Why choose us</span>
            <h2>Trusted Hands, Caring Hearts</h2>
            {/* <p>Support when you can’t be there.</p> */}
          </div>

          <div className={styles.reasonZigzag}>
            {reasonGroups.map((group) => (
              <div
                key={group.image}
                className={`${styles.reasonRow} ${group.imagePosition === 'left' ? styles.reasonRowReverse : ''}`}
              >
                <div className={styles.reasonCards}>
                  {group.items.map((item) => (
                    <article key={item.title} className={styles.reasonCard}>
                      <div className={styles.reasonCardHeader}>
                        <SiteIcon name="Check" size={20} />
                        <h3>{item.title}</h3>
                      </div>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>

                <div className={styles.reasonVisual}>
                  <Image
                    src={root + group.image}
                    alt="Patient care assistant service quality"
                    fill
                    sizes="(max-width: 860px) 100vw, 35vw"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.center}>
            <a href="#patient-assistant-form" className="btn btn--primary">
              Book Patient Care Assistant Now
            </a>
          </div>
        </div>
      </section>

      

      <section className="section">
        <div className={`container ${styles.benefit}`}>
          <div className={styles.benefitImage}>
            <Image
              src={root + 'Pic 9.png'}
              alt="Benefits of patient care assistant services"
              fill
              sizes="(max-width:992px) 100vw, 45vw"
            />
          </div>
          <div>
            {/* <span className="section-kicker">Benefits</span> */}
            <h2>What Is the Benefit of a Patient Care Assistant?</h2>
            <div className={styles.benefitList}>
              {[
                'Affordable, Transparent Tariff Solutions',
                'Parents Care for NRI, Remote Family',
                'Family-focused, stay-in duty',
                'Upgradable, flexible, easy updates',
                'Customized Care Plan for long-term service requirement',
              ].map((x) => (
                <div key={x}>
                  <SiteIcon name="Check" size={19} />
                  {x}
                </div>
              ))}
            </div>
            {/* <a href="#patient-assistant-form" className="btn btn--primary">
              Talk to Our Care Manager
            </a> */}
          </div>
        </div>
      </section>

      <section className={`section section--alt ${styles.faq}`}>
        <div className="container">
          <div className="section__header">
            {/* <span className="section-kicker">FAQ</span> */}
            <h2>Frequently Asked Questions</h2>
            {/* <p>Everything families commonly ask about Patient Care Assistant services.</p> */}
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <section className="section" id="pca-resources">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Resources</span>
            <h2>Blogs and Educative Materials</h2>
            {/* <p>
              Helpful guides for families planning patient care assistant support, recovery care, and daily living
              assistance at home.
            </p> */}
          </div>

          <GatedDownloadResources
            heading="Blogs & Download Free Patient Care Assistant Guide"
            intro={(
              <>
                <p>
                  Not sure which care plan is right for your loved one? Our <strong>expert-written guide</strong> helps
                  you understand <strong>care levels, daily assistance routines, and questions to ask before choosing a caregiver.</strong>
                </p>
                <p>
                  It&apos;s a <strong>must-have resource</strong> for families looking for safe and reliable home care support.
                </p>
              </>
            )}
            image={root + 'Pic 2.png'}
            imageAlt="Patient Care Assistant educative guide"
            modalDescription="Fill these details to download the Patient Care Assistant guide."
            downloadFallbackName="patient-care-assistant-guide.pdf"
            downloadButtonLabel="Download Guide"
            downloads={PCA_DOWNLOADS}
            resources={PCA_RESOURCES}
          />
        </div>
      </section>

      <section className="cta-strip">
        <div className={`container ${styles.final}`}>
          <div>
            <h2>Find the Right Patient Care Assistant Today</h2>
            <p>
              Tell us about your loved one’s needs and our care manager will guide you to a safe, compassionate care plan.
            </p>
          </div>
          <CTAForm title="Book Patient Care Assistant" />
        </div>
      </section>
    </main>
  );
}