import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SiteIcon from '@/components/ui/SiteIcon';

export const metadata: Metadata = {
  title: 'About Narpavi Homecare',
  description: 'Learn about Narpavi Homecare, our mission, vision, values, and commitment to safe, dignified, family-centred home healthcare.',
  alternates: { canonical: 'https://www.narpavihomecare.com/about' },
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
    icon: 'Real-time smartphone',
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

const MISSION_VISION_DIFFERENCES = [
  {
    mission: 'Refers to the means of achieving the goal',
    missionIcon: 'Mission goal',
    vision: 'Denotes the overarching goal that the company wants to achieve in the future',
    visionIcon: 'Vision future goal',
  },
  {
    mission: 'Is focused on the how',
    missionIcon: 'Innovation idea',
    vision: 'Is the description of the why',
    visionIcon: 'Question purpose',
  },
  {
    mission: 'Is to inform the employees',
    missionIcon: 'Employee report',
    vision: 'Is to motivate the employees',
    visionIcon: 'Motivate success',
  },
  {
    mission: 'Is usually bigger than the vision',
    missionIcon: 'Expand more',
    vision: 'Is usually smaller',
    visionIcon: 'Collapse focus',
  },
  {
    mission: 'Is to be used as management tool',
    missionIcon: 'Caregiver management',
    vision: 'Not to be used for the daily operation',
    visionIcon: 'Daily operation report',
  },
];

const CARE_APPROACH = [
  {
    title: 'Understand the Need',
    description: 'We begin by understanding the health condition, daily challenges, family concerns, preferred schedule, and home setup.',
    icon: 'Assessment report',
  },
  {
    title: 'Create the Care Plan',
    description: 'The care scope is matched to required assistance, clinical oversight, communication needs, and realistic family expectations.',
    icon: 'Personalized plan',
  },
  {
    title: 'Support the Family',
    description: 'Care is strengthened through routine updates, supervisor coordination, feedback, and escalation whenever attention is required.',
    icon: 'Family communication',
  },
];

const CARE_SCOPE = [
  {
    title: 'Home Nursing Care',
    description: 'Structured nursing and daily care support for recovery, chronic needs, and higher-dependency routines.',
    href: '/home-nursing-care',
    icon: 'Home nursing care',
  },
  {
    title: 'Baby Care',
    description: 'Professional newborn, mother, feeding, sleep, and family support in familiar home surroundings.',
    href: '/baby-care',
    icon: 'Baby care',
  },
  {
    title: 'Elder Care',
    description: 'Dignified senior support for companionship, mobility, safety, recovery, and everyday wellbeing.',
    href: '/elder-care',
    icon: 'Elder care',
  },
  {
    title: 'Medical Equipment',
    description: 'Home-use medical equipment options that help families create a safer and better-supported care setup.',
    href: '/medical-equipment',
    icon: 'Medical equipment',
  },
];

const CARE_STANDARDS = [
  {
    title: 'Care matched to the person',
    description: 'Support is shaped around condition, routine, dependency, preferences, and the home environment.',
    icon: 'Personalized care plan',
  },
  {
    title: 'Visible family communication',
    description: 'Families stay informed through observations, updates, feedback, and timely escalation.',
    icon: 'Family updates',
  },
  {
    title: 'Safety-led daily routines',
    description: 'Hygiene, risk awareness, responsible monitoring, and clear boundaries guide everyday care.',
    icon: 'Safety shield',
  },
  {
    title: 'Ongoing care coordination',
    description: 'Care plans can be reviewed as health needs, recovery progress, or family expectations change.',
    icon: 'Care monitoring',
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
                <Link href="#about-services" className="btn btn--outline btn--lg">
                  Explore Our Care
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
              <h2>Our Vision and Mission</h2>
              <p>The purpose behind our home healthcare and wellness solutions for individuals, families, and caregivers.</p>
            </div>
            <div className="about-v2-purpose__grid">
              <article className="about-v2-purpose__card about-v2-purpose__card--vision">
                <div className="about-v2-purpose__top">
                  <div className="about-v2-purpose__icon"><SiteIcon name="Vision better outcome" size={32} /></div>
                  <span>01 / Our Vision</span>
                </div>
                <h3>Become a global leader in affordable home healthcare and wellness solutions.</h3>
                <p>
                  To become a global leader in providing the best affordable home healthcare and wellness solutions to every individual in society.
                </p>
                <div className="about-v2-purpose__accent" aria-hidden="true" />
              </article>
              <article className="about-v2-purpose__card about-v2-purpose__card--mission">
                <div className="about-v2-purpose__top">
                  <div className="about-v2-purpose__icon"><SiteIcon name="Mission care" size={32} /></div>
                  <span>02 / Our Mission</span>
                </div>
                <h3>Deliver high-quality healthcare at home for every section of society.</h3>
                <p>
                  To deliver high-quality healthcare at home through a wide range of services, clinical excellence, advanced process and technology, and continuous innovation. We are committed to affordable, personalized services with compassion that help patients heal at home while uplifting our dedicated caregivers.
                </p>
                <div className="about-v2-purpose__accent" aria-hidden="true" />
              </article>
            </div>

            <div className="about-v2-mission-vision" aria-label="Difference between mission and vision statement">
              <div className="about-v2-mission-vision__intro">
                <span className="section-kicker">Mission vs Vision</span>
                <h3>Difference between Mission &amp; Vision Statement</h3>
              </div>
              <div className="about-v2-mission-vision__board">
                <div className="about-v2-mission-vision__head about-v2-mission-vision__head--mission">
                  <div><SiteIcon name="Mission target" size={42} /></div>
                  <strong>Mission</strong>
                </div>
                <div className="about-v2-mission-vision__vs">vs</div>
                <div className="about-v2-mission-vision__head about-v2-mission-vision__head--vision">
                  <div><SiteIcon name="Vision eye" size={42} /></div>
                  <strong>Vision</strong>
                </div>

                {MISSION_VISION_DIFFERENCES.map((item, index) => (
                  <div className="about-v2-mission-vision__row" key={item.mission}>
                    <div className="about-v2-mission-vision__cell about-v2-mission-vision__cell--mission">
                      <SiteIcon name={item.missionIcon} size={31} />
                      <p>{item.mission}</p>
                    </div>
                    <div className="about-v2-mission-vision__marker">
                      <span>{index + 1}</span>
                    </div>
                    <div className="about-v2-mission-vision__cell about-v2-mission-vision__cell--vision">
                      <SiteIcon name={item.visionIcon} size={31} />
                      <p>{item.vision}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section about-v2-services" id="about-services">
          <div className="container">
            <div className="about-v2-services__heading">
              <div>
                <span className="section-kicker">Our care ecosystem</span>
                <h2>Support for Different Stages of Life and Recovery</h2>
              </div>
              <p>One home healthcare partner, with care pathways designed around different people, needs, and levels of support.</p>
            </div>
            <div className="about-v2-services__grid">
              {CARE_SCOPE.map((service, index) => (
                <Link
                  href={service.href}
                  className={`about-v2-service about-v2-service--${index + 1}`}
                  key={service.title}
                  style={{ '--about-order': index } as CSSProperties}
                >
                  <div className="about-v2-service__icon"><SiteIcon name={service.icon} size={29} /></div>
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="about-v2-service__link">Explore care <SiteIcon name="Arrow" size={17} /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-v2-values">
          <div className="container">
            <div className="section__header about-v2-section-header">
              <span className="section-kicker">Core values</span>
              <h2>Values You Can Feel in Everyday Care</h2>
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
        </section>

        <section className="section about-v2-approach">
          <div className="container">
            <div className="section__header about-v2-section-header">
              <span className="section-kicker">Our care approach</span>
              <h2>From First Conversation to Ongoing Support</h2>
              <p>A practical care journey that stays visible, coordinated, and centred on the person receiving support.</p>
            </div>
            <div className="about-v2-approach__journey">
              <div className="about-v2-approach__line" aria-hidden="true"><span /></div>
              {CARE_APPROACH.map((item, index) => (
                <article className={`about-v2-approach__step about-v2-approach__step--${index + 1}`} key={item.title}>
                  <div className="about-v2-approach__marker">
                    <SiteIcon name={item.icon} size={27} />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="about-v2-approach__card">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-v2-standards">
          <div className="container about-v2-standards__grid">
            <div className="about-v2-standards__intro">
              <span className="section-kicker">Our care promise</span>
              <h2>Professional Structure with a Compassionate Presence</h2>
              <p>Good care should feel safe and organized without becoming impersonal. These standards keep both sides of care working together.</p>
              <Link href="/contact" className="btn btn--white btn--lg">
                Talk to Our Care Team <SiteIcon name="Arrow" size={18} />
              </Link>
            </div>
            <div className="about-v2-standards__list">
              {CARE_STANDARDS.map((item, index) => (
                <article key={item.title}>
                  <div><SiteIcon name={item.icon} size={24} /></div>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
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
