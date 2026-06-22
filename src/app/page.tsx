import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';
import { BLOG_POSTS } from '@/lib/blogs';
import HeroSlider from '@/components/sections/HeroSlider';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import SiteIcon from '@/components/ui/SiteIcon';
import { getFaqSchema, getItemListSchema, getWebPageSchema } from '@/lib/seo';

const FEATURED_SERVICES = [
  { title: 'Basic Nursing Care', image: '/images/pik-4.png', href: '/basic-nursing-care', copy: 'Daily living, mobility, hygiene and recovery support.', action: 'Enquire Now' },
  { title: 'Elder Care', image: '/images/pik-1.jpeg', href: '/elder-care', copy: 'Safe, dignified support for parents and senior family members.', action: 'Enquire Now' },
  { title: 'Patient Assistant Care', image: '/images/pik-3.jpg', href: '/home-nursing-care/patient-assistant-care', copy: 'Reliable companionship and personal assistance at home.', action: 'Book Now' },
  { title: 'Advanced Nursing', image: '/images/pik-9.png', href: '/home-nursing-care/advance-nursing-care', copy: 'Skilled clinical procedures under professional oversight.', action: 'Enquire Now' },
  { title: 'ICU at Home', image: '/images/pik-12.png', href: '/home-nursing-care/icu-at-home', copy: 'High-dependency nursing and critical care coordination.', action: 'Enquire Now' },
  { title: 'Palliative Support', image: '/images/pik-14.png', href: '/home-nursing-care/end-of-life-care', copy: 'Comfort-focused bedside care with dignity and compassion.', action: 'Book Now' },
];

const CARE_TAILORED = [
  { title: 'ICU at Home', href: '/home-nursing-care/icu-at-home' },
  { title: 'Nurse at Home', href: '/home-nursing-care' },
  { title: 'Elder Care', href: '/elder-care' },
  { title: 'Baby Care', href: '/baby-care' },
  { title: 'Medical Equipment', href: '/medical-equipment' },
  { title: 'Patient Assistant', href: '/home-nursing-care/patient-assistant-care' },
  { title: 'Palliative Support', href: '/home-nursing-care/end-of-life-care' },
  { title: 'Advanced Nursing', href: '/home-nursing-care/advance-nursing-care' },
];

const HOME_AI_FAQS = [
  {
    question: 'How quickly can home healthcare start?',
    answer: 'Most Narpavi Homecare services can begin within 24 to 48 hours after your family completes a care assessment and confirms the care plan.',
  },
  {
    question: 'Which home care service is best after hospital discharge?',
    answer: 'Basic Nursing Care is ideal for mobility support, hygiene help, feeding assistance, and recovery supervision, while Advanced Nursing Care is better when clinical procedures are also needed.',
  },
  {
    question: 'Do you provide updates for families living outside Chennai or abroad?',
    answer: 'Yes. We share regular WhatsApp updates, care notes, and escalation alerts so NRI families can stay informed in real time.',
  },
  {
    question: 'Can I arrange ICU support or medical equipment at home through one provider?',
    answer: 'Yes. Narpavi Homecare offers ICU at Home support, nursing services, caregiver support, and medical equipment coordination under one care journey.',
  },
  {
    question: 'How do I know whether to choose elder care, nursing care, or patient assistant care?',
    answer: 'Our team reviews mobility, medical needs, recovery goals, and daily living support requirements before recommending the right service path for your loved one.',
  },
  {
    question: 'Is home healthcare safer than a long hospital stay for recovery?',
    answer: 'For many families, home care reduces infection exposure, improves emotional comfort, and keeps recovery structured with dedicated one-to-one support.',
  },
];

const CARE_JOURNEYS = [
  {
    title: 'Need daily recovery help after surgery?',
    copy: 'Choose Basic Nursing Care for hygiene support, mobility assistance, vitals checks, and family updates during recovery.',
    href: '/basic-nursing-care',
    label: 'Explore Basic Nursing Care',
  },
  {
    title: 'Need a nurse for clinical procedures at home?',
    copy: 'Choose Home Nursing Care or Advance Nursing when injections, wound care, IV support, or close clinical supervision are required.',
    href: '/home-nursing-care',
    label: 'View Nursing Services',
  },
  {
    title: 'Need safer support for an ageing parent?',
    copy: 'Choose Elder Care for fall prevention, companionship, medication reminders, and dignified help with daily routines.',
    href: '/elder-care',
    label: 'See Elder Care',
  },
  {
    title: 'Need oxygen, cots, monitors, or respiratory devices?',
    copy: 'Choose Medical Equipment support for fast setup of recovery essentials at home.',
    href: '/medical-equipment',
    label: 'Browse Equipment',
  },
];

export const metadata: Metadata = {
  title: 'Home Healthcare Services',
  description: `Book trusted home healthcare with Narpavi Homecare. Compare nursing care, elder care, ICU at home, baby care, and medical equipment support. Call ${BRAND.phoneFormatted}.`,
  keywords: [
    'home healthcare chennai',
    'home nursing care chennai',
    'elder care at home chennai',
    'icu at home chennai',
    'medical equipment rental chennai',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Narpavi Homecare | Home Healthcare Services',
    description: 'Compare home nursing care, elder care, baby care, ICU at home, and medical equipment support.',
    url: BRAND.url,
    siteName: BRAND.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Narpavi Homecare | Home Healthcare Services',
    description: 'Trusted home healthcare with nursing care, elder care, ICU at home, and medical equipment support.',
  },
};

export default function HomePage() {
  const homeSchemas = [
    getWebPageSchema({
      title: 'Home Healthcare Services',
      description: 'Trusted home healthcare with nursing care, elder care, baby care, ICU at home, and medical equipment support.',
      path: '/',
    }),
    getFaqSchema(HOME_AI_FAQS),
    getItemListSchema(
      'Home healthcare services from Narpavi Homecare',
      FEATURED_SERVICES.map((service) => ({ name: service.title, path: service.href })),
    ),
  ];

  return (
    <>
      <StructuredDataScript data={homeSchemas} />

      {/* SECTION 1: Apollo-Style Hero Slider */}
      <HeroSlider />

      <section className="trust-ribbon" aria-label="Narpavi service assurances">
        <div className="container trust-ribbon__grid">
          <div><strong>24/7</strong><span>Nurse escalation</span></div>
          <div><strong>Verified</strong><span>Care professionals</span></div>
          <div><strong>Daily</strong><span>Family updates</span></div>
          <div><strong>Chennai</strong><span>Fast onboarding</span></div>
        </div>
      </section>

      <section className="home-service-strip" aria-label="Care tailored for your specific needs">
        <div className="home-service-strip__track">
          {[...CARE_TAILORED, ...CARE_TAILORED].map((item, index) => (
            <Link href={item.href} className="home-service-strip__item" key={`${item.title}-${index}`}>
              <SiteIcon name={item.title} size={19} />
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 2: What is Home Healthcare */}
      <section className="section" id="definition">
        <div className="container">
          <div className="section__header">
            <h2>What is Home Healthcare?</h2>
            <p>Professional medical and non-medical support delivered at your doorstep &mdash; bringing hospital-grade care to the comfort of your home.</p>
          </div>
          <div className="grid-3">
            <div className="card text-center">
              <div className="card__icon"><SiteIcon name="Comfort of Home" size={34} /></div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Comfort of Home</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Recover in familiar surroundings with family nearby. Better outcomes, fewer infections, and faster healing.</p>
            </div>
            <div className="card text-center">
              <div className="card__icon"><SiteIcon name="Professional Nursing Care" size={34} /></div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Professional Care</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Trained caregivers supervised by nurses and doctors. Every care plan is clinically designed and regularly reviewed.</p>
            </div>
            <div className="card text-center">
              <div className="card__icon"><SiteIcon name="Cost Effective Benefit" size={34} /></div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Cost Effective</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Up to 60% more affordable than hospital stays. Quality care without the financial burden of extended hospitalization.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="services">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Care at every stage</span>
            <h2>Explore Our Home Healthcare Services</h2>
            <p>Choose from non-clinical assistance, skilled nursing and high-dependency care based on your loved one&apos;s needs.</p>
          </div>
          <div className="service-image-grid">
            {FEATURED_SERVICES.map((service) => (
              <Link href={service.href} className="service-image-card" key={service.title}>
                <div className="service-image-card__media">
                  <Image src={service.image} alt={service.title} fill sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                  <span className="service-image-card__badge">{service.action}</span>
                </div>
                <div className="service-image-card__body">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <span>View service <SiteIcon name="Arrow" size={15} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="home-care-questions">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">AI-Friendly Answers</span>
            <h2>Quick Answers Families Search Before Booking Care</h2>
            <p>We answer real home care questions in plain language so families can compare options faster and choose the right support with confidence.</p>
          </div>
          <div className="ai-answer-grid">
            {HOME_AI_FAQS.map((faq) => (
              <article key={faq.question} className="ai-answer-card">
                <div className="ai-answer-card__icon">
                  <SiteIcon name={faq.question} size={20} />
                </div>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Benefits */}
      <section className="section section--alt" id="benefits">
        <div className="container">
          <div className="section__header">
            <h2>Benefits of Home Healthcare</h2>
            <p>Why thousands of families are choosing professional home care over hospitals and nursing homes.</p>
          </div>
          <div className="grid-4">
            {[
              { icon: '🛡️', title: 'Reduced Infection Risk', desc: 'Home environment minimizes hospital-acquired infections' },
              { icon: '❤️', title: 'Emotional Wellbeing', desc: 'Family proximity boosts recovery and mental health' },
              { icon: '📊', title: 'Personalized Care', desc: 'One-on-one attention with customized care plans' },
              { icon: '🔄', title: 'Fewer Readmissions', desc: 'Continuous monitoring prevents complications' },
              { icon: '👨‍👩‍👧', title: 'Family Involvement', desc: 'Loved ones actively participate in recovery' },
              { icon: '⏰', title: 'Flexible Scheduling', desc: '2-hour visits to 24/7 live-in care options' },
              { icon: '📱', title: 'Real-time Updates', desc: 'Daily care logs via WhatsApp for NRI families' },
              { icon: '🏆', title: 'Better Outcomes', desc: 'Studies show faster recovery at home' },
            ].map((b, i) => (
              <div key={i} className="card text-center" style={{ padding: '1.5rem' }}>
                <div className="card__icon"><SiteIcon name={b.title} size={30} /></div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.35rem' }}>{b.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="care-paths">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Intent Match</span>
            <h2>Choose the Right Care Path in One Glance</h2>
            <p>If you already know the problem, this helps you land on the right Narpavi service page without guessing.</p>
          </div>
          <div className="journey-grid">
            {CARE_JOURNEYS.map((journey) => (
              <Link key={journey.title} href={journey.href} className="journey-card">
                <div className="journey-card__badge">
                  <SiteIcon name={journey.title} size={18} />
                  Best match
                </div>
                <h3>{journey.title}</h3>
                <p>{journey.copy}</p>
                <span>{journey.label} <SiteIcon name="Arrow" size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Who We Care For */}
      <section className="section" id="who-we-care-for">
        <div className="container">
          <div className="section__header">
            <h2>Who We Care For</h2>
            <p>From post-surgery recovery to palliative support, we provide compassionate care for every stage of life.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: '🏥', title: 'Post-Surgery Patients', desc: 'Safe recovery at home after surgery with trained caregiver support' },
              { icon: '👴', title: 'Elderly Care', desc: 'Dignified daily living assistance for senior citizens' },
              { icon: '💊', title: 'Chronic Illness', desc: 'Structured support for diabetes, hypertension, and more' },
              { icon: '👶', title: 'Mother & Baby Care', desc: 'Postnatal support for new mothers and newborn babies' },
              { icon: '🕊️', title: 'Palliative Care', desc: 'Comfort-focused care preserving dignity and quality of life' },
              { icon: '🌍', title: 'NRI Families', desc: 'Trusted care for your loved ones with real-time WhatsApp updates' },
            ].map((c, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: '1rem' }}>
                <div className="card__icon card__icon--compact"><SiteIcon name={c.title} size={27} /></div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>{c.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Why Choose Narpavi */}
      <section className="section section--alt" id="why-choose">
        <div className="container">
          <div className="section__header">
            <h2>Why Choose Narpavi Homecare?</h2>
            <p>Your loved one&apos;s safety is our priority. Here&apos;s what sets us apart.</p>
          </div>
          <div className="trust-grid">
            {[
              { icon: '✅', title: 'Verified & Background-Checked', desc: 'ID proof, police verification, and health screening before deployment.' },
              { icon: '🩺', title: 'Doctor & Nurse-Led Overseeing', desc: 'Care plans reviewed and supervised by experienced clinicians.' },
              { icon: '🧽', title: 'Hospital Grade Hygiene', desc: 'WHO hand hygiene, infection control practices and PPE when needed.' },
              { icon: '🚨', title: '24x7 Emergency Escalation', desc: 'On-call nurses & doctors to guide immediate action if health changes.' },
              { icon: '📋', title: 'Transparent Reporting', desc: 'Daily care logs and instant incident reports for families including NRIs.' },
              { icon: '🔄', title: 'Easy Caregiver Replacement', desc: 'Not the right match? We quickly assign another professional at no extra cost.' },
            ].map((t, i) => (
              <div key={i} className="trust-card">
                <div className="trust-card__icon"><SiteIcon name={t.title} /></div>
                <div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Statistics */}
      <section className="section section--dark" id="statistics">
        <div className="container">
          <div className="stats">
            {[
              { number: '500+', label: 'Families Served' },
              { number: '50+', label: 'Trained Caregivers' },
              { number: '24/7', label: 'Emergency Support' },
              { number: '98%', label: 'Family Satisfaction' },
            ].map((s, i) => (
              <div key={i}>
                <div className="stat__number">{s.number}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Testimonials */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section__header">
            <h2>What Families Say</h2>
            <p>Real stories from families who trust Narpavi Homecare.</p>
          </div>
          <div className="grid-3">
            {[
              { name: 'Priya R.', role: 'Daughter, NRI in USA', text: 'Being thousands of miles away, I was worried about my father. Narpavi sends me daily WhatsApp updates. It feels like I am right there with him.', stars: 5 },
              { name: 'Suresh K.', role: 'Son, Chennai', text: 'After my mother surgery, we needed reliable home care. The caregiver was professional, punctual, and genuinely caring. Highly recommend!', stars: 5 },
              { name: 'Lakshmi M.', role: 'Wife, Chennai', text: 'My husband has been bedridden for months. Narpavi Comfort Plus plan gives him dignity and me peace of mind. The nurse supervision is excellent.', stars: 5 },
            ].map((t, i) => (
              <div key={i} className="card">
                <div className="rating-stars">
                  {Array.from({ length: t.stars }).map((_, star) => <SiteIcon key={star} name="Star Rating" size={17} />)}
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.95rem', lineHeight: '1.7' }}>&ldquo;{t.text}&rdquo;</p>
                <div>
                  <strong style={{ fontSize: '0.95rem' }}>{t.name}</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Blog Preview */}
      <section className="section section--alt" id="blog-preview">
        <div className="container">
          <div className="section__header">
            <h2>Expert Care Guides & Tips</h2>
            <p>Insights from our team to help you make informed care decisions.</p>
          </div>
          <div className="grid-4">
            {BLOG_POSTS.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card" id={`blog-${post.slug}`}>
                <div className="blog-card__image">
                  <Image src={post.image} alt={post.title} width={400} height={200} style={{ objectFit: 'cover' }} />
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">{post.readTime} &bull; {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/blog" className="btn btn--outline">View All Blog Posts <SiteIcon name="Arrow" size={17} /></Link>
          </div>
        </div>
      </section>

      {/* SECTION 9: CTA Strip */}
      <section className="cta-strip" id="cta-strip">
        <div className="container">
          <h2>Ready to Start Safe Home Healthcare?</h2>
          <p>Book an expert care assessment and get professional care started within 24-48 hours.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--white btn--lg" id="cta-book">Book Care Assessment</Link>
            <a href={BRAND.phoneHref} className="btn btn--outline btn--lg" style={{ color: 'white', borderColor: 'white' }} id="cta-call"><SiteIcon name="Phone" size={18} /> {BRAND.phone}</a>
          </div>
          <div className="cta-strip__badges">
            <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Fast Onboarding</span>
            <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Verified Caregivers</span>
            <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> 24x7 Emergency Support</span>
            <span className="cta-strip__badge"><SiteIcon name="Check" size={16} /> Transparent Pricing</span>
          </div>
        </div>
      </section>
    </>
  );
}
