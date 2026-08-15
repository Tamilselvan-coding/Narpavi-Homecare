'use client';

import { useState, useRef, type CSSProperties, type FormEvent } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Car,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  Handshake,
  Heart,
  HeartHandshake,
  Loader2,
  Shield,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
  Upload,
  Users,
  UtensilsCrossed,
  X,
} from 'lucide-react';

/* ─── DATA TYPES ─── */

interface JobOpening {
  id: string;
  title: string;
  responsibility: string;
  qualification: string;
  experience: string;
  age: string;
  gender: string;
  image: string;
  category: 'care-provider' | 'resource-partner';
}

interface EmploymentModel {
  type: string;
  definition: string;
  description: string;
  tagline: string;
  icon: React.ReactNode;
}

interface Benefit {
  title: string;
  tagline: string;
  description: string;
  image: string;
}

interface CultureValue {
  title: string;
  description: string;
  icon: React.ReactNode;
}

/* ─── HERO BANNER SLIDES — same carousel system as the home page hero
   (see src/app/page.tsx HERO_BANNERS / home.module.css .hero): a pure CSS
   keyframe cross-fade, no dots/arrows/JS timer. ─── */

interface CareerHeroBanner {
  kicker: string;
  heading: string;
  highlight: string;
  copy: string;
  image: string;
  alt: string;
  usps: string[];
  metric: string;
  accent: string;
  accentRgb: string;
  accentSoft: string;
}

const CAREER_HERO_BANNERS: CareerHeroBanner[] = [
  {
    kicker: 'Grow With Us',
    heading: 'Physiotherapist &',
    highlight: 'Rehabilitation Experts',
    copy: 'Build a rewarding career while bringing comfort and healing to home — hands-on growth for physiotherapy and rehabilitation professionals.',
    image: '/images/career/banner/bpic-2.webp',
    alt: 'Physiotherapist guiding a patient through rehabilitation at home',
    usps: ['Hands-On Mentorship', 'Structured Growth Path', 'Real Patient Exposure'],
    metric: 'Careers built in physiotherapy & rehab',
    accent: '#009A9F',
    accentRgb: '0, 154, 159',
    accentSoft: '#E6F8F8',
  },
  {
    kicker: 'Join Narpavi',
    heading: 'One of the Fastest-Growing',
    highlight: 'Home Healthcare Teams',
    copy: 'The best place to showcase your talent and skills — every caregiver and nurse here is treated with dignity and respect.',
    image: '/images/career/banner/bpic-8.webp',
    alt: 'Narpavi Homecare healthcare team',
    usps: ['Respect & Recognition', 'Dignified Workplace', 'Fast-Growing Organization'],
    metric: 'Every caregiver treated with dignity',
    accent: '#FF784B',
    accentRgb: '255, 120, 75',
    accentSoft: '#FFF1EA',
  },
  {
    kicker: 'Welcome Smart Talents',
    heading: 'Nurses, Physicians &',
    highlight: 'Rehab Specialists',
    copy: 'Growth-oriented careers with regular training and upskilling opportunities for every healthcare role we hire.',
    image: '/images/career/banner/bpic-9.webp',
    alt: 'Narpavi nurse ready for home healthcare duty',
    usps: ['Regular Upskilling', 'Growth-Oriented Roles', 'Multi-Disciplinary Teams'],
    metric: 'Training & upskilling, built in',
    accent: '#3A8E55',
    accentRgb: '58, 142, 85',
    accentSoft: '#EDF8EF',
  },
  {
    kicker: 'Welcome Freshers & Internship',
    heading: 'Build Your Career From',
    highlight: 'Day One',
    copy: 'We believe in continuously training and upgrading starters — building confidence and excellence in every fresher and intern.',
    image: '/images/career/banner/bpic-14.webp',
    alt: 'Narpavi fresher training programme',
    usps: ['Food & Accommodation', 'Transportation Allowance', 'Senior Handholding'],
    metric: 'Shadowing with real patients',
    accent: '#4763B8',
    accentRgb: '71, 99, 184',
    accentSoft: '#EEF2FF',
  },
];

/* ─── JOB OPENINGS DATA (exact content from Version 3 document) ─── */

const jobOpenings: JobOpening[] = [
  {
    id: 'intern-trainee',
    title: 'Internship / Project Trainee / Trainee',
    responsibility: 'To conduct Market survey / Viability study / Product development / Customer Survey / Market expansion study, To develop tech solutions / process / AI tools / recruitment / market engagement, forming new digital marketing team',
    qualification: 'Minimum Bachelor Degree — Degree completed or final year students',
    experience: 'Fresher with commitment and confidence',
    age: 'Above 19 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-3.png',
    category: 'care-provider',
  },
  {
    id: 'patient-care-assistant',
    title: 'Patient Care Assistant / Care Taker',
    responsibility: 'Patient Care and Execution of Non clinical care plan and deliverables.',
    qualification: 'Minimum successfully completed skill development programs related to Healthcare / Patient Care / Homecare / Patient Assistant / Paramedics / Lab Technician',
    experience: 'Minimum one year in Patient Care services in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-4.png',
    category: 'care-provider',
  },
  {
    id: 'home-healthcare-nurse',
    title: 'Home Healthcare Nurse',
    responsibility: 'Patient Care and Execution of Nursing care plan and deliverables.',
    qualification: 'Minimum ANM / GNM / B.Sc (Nursing)',
    experience: 'Minimum one year in Patient Care services in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-5.png',
    category: 'care-provider',
  },
  {
    id: 'home-healthcare-physician',
    title: 'Home Healthcare Physician',
    responsibility: 'Patient Health Care and Execution of Nursing care plan and deliverables.',
    qualification: 'Minimum MBBS or Equivalent, recognized by MCI',
    experience: 'Minimum one year in Patient Care treatment in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-5b.png',
    category: 'care-provider',
  },
  {
    id: 'home-healthcare-physiotherapist',
    title: 'Home Healthcare Physiotherapist',
    responsibility: 'Patient Health Care and Execution of Physiotherapy care plan and deliverables.',
    qualification: 'Minimum BPT',
    experience: 'Minimum one year in Patient Care treatment in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-8.png',
    category: 'care-provider',
  },
  {
    id: 'rehabilitation-expert',
    title: 'Rehabilitation Expert',
    responsibility: 'Patient Health Care and Execution of Rehabilitation Care plan and deliverables.',
    qualification: 'Minimum BPT / Dietician / psychologist / Councilor / Physician / speech therapist etc',
    experience: 'Minimum one year in Rehabilitation Care treatment in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-9.png',
    category: 'care-provider',
  },
  {
    id: 'nursing-supervisor',
    title: 'Home Healthcare Nursing Supervisor',
    responsibility: 'Supervising and Guiding team of nurses, Patient Health Care and Execution of Nursing care plan and deliverables, process and documentation',
    qualification: 'Minimum GNM / B.Sc (Nursing)',
    experience: 'Minimum 5 year in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-10.png',
    category: 'care-provider',
  },
  {
    id: 'nursing-educator',
    title: 'Home Healthcare Nursing Educator',
    responsibility: 'Training, Supervising and Guiding team of nurses in Patient Health Care and Execution of Nursing care plan and deliverables, process and documentation',
    qualification: 'Minimum GNM / B.Sc (Nursing)',
    experience: 'Minimum 5 year in hospital or Homecare',
    age: 'Above 20 Years',
    gender: 'Female',
    image: '/images/career/pic-11.png',
    category: 'care-provider',
  },
  {
    id: 'bio-medical-engineer',
    title: 'Bio Medical Engineer – Field Service',
    responsibility: 'Install, trouble shoot, service medical equipment at patient home. Retrieve, service, maintain stocks.',
    qualification: 'Minimum Diploma / BE',
    experience: 'Fresher / Minimum 1 year medical equipment industry',
    age: 'Above 20 Years',
    gender: 'Male',
    image: '/images/career/pic-12.png',
    category: 'care-provider',
  },
  {
    id: 'customer-service-delivery',
    title: 'Customer Service Delivery',
    responsibility: 'Manage daily patient care operations, execution of process, care provider deployment, monitor, measure and control patient care performance',
    qualification: 'Minimum Diploma / BE / GNM / B.Sc (Nursing)',
    experience: 'Fresher / Minimum 1 year Healthcare Industry',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-13.png',
    category: 'care-provider',
  },
  {
    id: 'client-relationship-manager',
    title: 'Client Relationship Manager',
    responsibility: 'Identify, convert and acquire clients requiring our services. Develop relationship with major hospitals / business sources. Acquire accounts and generate revenue, market expansion, product launching',
    qualification: 'Minimum Diploma / BE / GNM / B.Sc (Nursing)',
    experience: 'Fresher / Minimum 1 year medical equipment industry',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-14.png',
    category: 'care-provider',
  },
  {
    id: 'hr-team',
    title: 'Human Resource Team – Executive / Manager',
    responsibility: 'Recruitment — Care Providers — Homecare Nurses / Physician / Physiotherapist / Lab Technician / Rehabilitation expert. Experts in Sales / Marketing / Accounts / HR / Operations',
    qualification: 'Minimum Bachelor Degree',
    experience: 'Fresher / Minimum 1 year in HR',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-15.png',
    category: 'care-provider',
  },
  {
    id: 'sales-team',
    title: 'Sales Team – Field Executive / Manager',
    responsibility: 'Client Acquisition, Revenue generation, Business tie up, Account manager',
    qualification: 'Minimum Bachelor Degree',
    experience: 'Fresher / Minimum 1 year in Retail sales / Corporate sales / B2B / B2C — healthcare exposure is an added advantage',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-16.png',
    category: 'care-provider',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing – Executive / Manager',
    responsibility: 'Client acquisition through digital marketing — Social media promotions / create and run media ads / generate qualified leads, experts in design ad collaterals, managing postings etc',
    qualification: 'Minimum Bachelor Degree',
    experience: 'Fresher / Minimum 1 year in Digital Marketing',
    age: 'Above 20 Years',
    gender: 'Male / Female',
    image: '/images/career/pic-17.png',
    category: 'care-provider',
  },
  {
    id: 'resource-partner',
    title: 'Resource Partner – Care Provider / Medical Equipment etc',
    responsibility: 'To provide resources and services in — Recruitment, Care provider supply, medical equipment, Training, Sales & Marketing, accounts, due diligence, client acquisition, finance & accounts etc',
    qualification: 'Individual or entity, registered, existing and running, having physical presence and having expertise in the field selected',
    experience: 'Minimum 1 years in select field',
    age: '',
    gender: '',
    image: '/images/career/pic-18.png',
    category: 'resource-partner',
  },
];

/* ─── EMPLOYMENT MODELS DATA ─── */

const employmentModels: EmploymentModel[] = [
  {
    type: 'Full-Time Employment',
    definition: 'A stable, long-term opportunity with fixed monthly pay and structured schedules.',
    description: 'Full-time employees enjoy steady income, consistent work hours, and ongoing career development support.',
    tagline: 'Secure. Stable. Steady Growth.',
    icon: <Shield size={28} />,
  },
  {
    type: 'Contractual Employment',
    definition: 'Flexible, project-based roles with higher daily pay and freedom to choose assignment duration.',
    description: 'Ideal for those seeking short-term or rotational roles with strong earning potential and flexibility.',
    tagline: 'Work on your terms — earn more with every day you care.',
    icon: <FileText size={28} />,
  },
  {
    type: 'Empowered Resource Model (Flexible Work Plan)',
    definition: 'A premium model offering higher pay and total freedom in choosing shifts, patients, and service areas.',
    description: 'Designed for skilled caregivers who prefer autonomy and flexibility while earning top-tier compensation.',
    tagline: 'Your skills, your schedule — premium pay on your terms.',
    icon: <Star size={28} />,
  },
  {
    type: 'Internship Program',
    definition: 'A short-term learning opportunity integrated with academic curriculum requirements.',
    description: 'Offers free coaching, real-world exposure, and mentoring. High-performing interns may receive job offers.',
    tagline: 'Learn, grow, and begin your healthcare journey.',
    icon: <GraduationCap size={28} />,
  },
  {
    type: 'Trainee Program',
    definition: 'A transitional program for fresh graduates to gain hands-on clinical and homecare experience.',
    description: 'Provides practical training, nominal stipend, and assured employment upon successful completion.',
    tagline: 'Bridge the gap between learning and earning.',
    icon: <BookOpen size={28} />,
  },
];

/* ─── BENEFITS DATA (Section 4) ─── */

const benefits: Benefit[] = [
  {
    title: 'Training & Development',
    tagline: 'Learn today, lead tomorrow.',
    description: 'We provide structured training and hands-on workshops to help you deliver safe, skilled, and compassionate care.',
    image: '/images/career/pic-19.jpg',
  },
  {
    title: 'Skill Upgradation',
    tagline: 'Sharpen your skills, expand your horizons.',
    description: 'From advanced nursing techniques to modern homecare practices, we ensure you stay ahead in your profession.',
    image: '/images/career/pic-20.png',
  },
  {
    title: 'Empowerment & Dignity',
    tagline: 'Your dignity, our promise.',
    description: 'We believe every nurse and caregiver deserves recognition, respect, and the confidence to deliver care with pride.',
    image: '/images/career/pic-7.png',
  },
  {
    title: 'Safe & Respectable Work Environment',
    tagline: 'A workplace built on care — for patients and for our caregivers.',
    description: 'We maintain a culture of safety, trust, and mutual respect so you can focus on what you do best: caring.',
    image: '/images/career/pic-22.jpg',
  },
  {
    title: 'Flexible Working Shifts',
    tagline: 'Your time, your choice.',
    description: 'Choose shifts that suit your lifestyle, ensuring balance between your personal and professional life.',
    image: '/images/career/pic-23.png',
  },
  {
    title: 'Welfare Benefits',
    tagline: 'Because caring for you is as important as caring for patients.',
    description: 'Our benefits and welfare programs are designed to support your well-being, security, and future growth.',
    image: '/images/career/pic-24.png',
  },
];

/* ─── CULTURE DATA (Section 5) ─── */

const cultureValues: CultureValue[] = [
  {
    title: 'Growth-Oriented',
    description: 'Regular training and upskilling opportunities to get promotions to next level of position and earning capacity',
    icon: <TrendingUp size={32} />,
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible shifts designed around your needs',
    icon: <Clock size={32} />,
  },
  {
    title: 'Supportive Community',
    description: 'A team that stands by you, always.',
    icon: <Users size={32} />,
  },
  {
    title: 'Respect & Recognition',
    description: 'Every Caregiver / Nurse is treated with dignity',
    icon: <Heart size={32} />,
  },
];

/* ─── ROLES LIST ─── */

const rolesList = [
  'Care Givers',
  'Patient Care Assistant',
  'Nurse',
  'Senior Nurse',
  'Nursing Supervisor',
  'Care Manager',
  'Physiotherapists',
  'Rehabilitation Expert',
  'Wellness Coach',
  'Bio Medical Engineer (BDE)',
  'Lab Technician',
  'Guest Relationship Manager (GRM)',
  'Talents in HR, Operations, Tele Sales, Digital Marketing, Accounts',
];

/* ─── EDUCATION OPTIONS ─── */

const educationOptions = [
  'ANM',
  'GNM',
  'B.Sc (Nursing)',
  'MBBS',
  'BPT',
  'Diploma',
  'BE / B.Tech',
  'Bachelor Degree',
  'Master Degree',
  'Other',
];

/* ─── EXPERIENCE OPTIONS ─── */

const experienceOptions = [
  'Fresher',
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  'More than 5 years',
];

/* ─── COMPONENT ─── */

export default function CareerPageExperience() {
  /* State */
  const [activeCategory, setActiveCategory] = useState<'care-provider' | 'resource-partner'>('care-provider');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const jobsGridRef = useRef<HTMLDivElement>(null);

  /* Pick a track from the overlapping circles, then jump to its openings */
  const selectCategory = (category: JobOpening['category']) => {
    setActiveCategory(category);
    jobsGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* Open apply modal */
  const openApplyModal = (job: JobOpening) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setSubmitStatus(null);
    setSelectedFileName('');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setSubmitStatus(null);
    document.body.style.overflow = '';
  };

  /* Form submission */
  const handleApplySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    formData.append('position', selectedJob?.title ?? '');
    formData.append('category', selectedJob?.category ?? '');
    formData.append('sourcePath', typeof window !== 'undefined' ? window.location.pathname : '/join-us');
    formData.append('submittedAt', new Date().toISOString());

    const endpoint = selectedJob?.category === 'resource-partner'
      ? '/api/join-us/partner'
      : '/api/join-us/candidate';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.ok !== false) {
        setSubmitStatus({
          type: 'success',
          message: selectedJob?.category === 'resource-partner'
            ? 'Thank you! Your partner enquiry has been submitted successfully. Our team will contact you shortly.'
            : 'Application received! Thank you for applying to Narpavi Homecare. Our recruitment team will review your profile.',
        });
        formElement.reset();
        setSelectedFileName('');
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Unable to submit. Please check required fields and try again.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Filtered jobs */
  const filteredJobs = jobOpenings.filter((j) => j.category === activeCategory);

  return (
    <div className="career-page">

      {/* ═══════════════════════════════════════════════════
          SECTION 1 — HERO BANNER (same design language as the home page hero)
          ═══════════════════════════════════════════════════ */}
      <section className="career-hero" aria-label="Career page hero banners">
        <div className="career-hero__glow" aria-hidden="true" />
        <div className="container career-hero__carousel">
          {CAREER_HERO_BANNERS.map((banner, index) => (
            <article
              className="career-hero__slide"
              key={banner.heading}
              style={
                {
                  '--slide-delay': `${(index - CAREER_HERO_BANNERS.length) * 5}s`,
                  '--banner-accent': banner.accent,
                  '--banner-accent-rgb': banner.accentRgb,
                  '--banner-soft': banner.accentSoft,
                } as CSSProperties
              }
            >
              <div className="career-hero__content">
                <span className="career-hero__eyebrow">
                  <Sparkles size={16} />
                  {banner.kicker}
                </span>
                <h1 className="career-hero__title">
                  {banner.heading} <span>{banner.highlight}</span>
                </h1>
                <p className="career-hero__lead">{banner.copy}</p>
                <ul className="career-hero__usps" aria-label={`${banner.heading} highlights`}>
                  {banner.usps.map((usp) => (
                    <li key={usp}>
                      <span className="career-hero__usp-icon">
                        <CheckCircle2 size={18} />
                      </span>
                      <span>{usp}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn btn--primary career-hero__cta"
                  onClick={() => jobsGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  Explore Openings <ArrowRight size={17} />
                </button>
              </div>

              <div className="career-hero__visual">
                <div className="career-hero__image">
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="career-hero__image-badge">
                    <BadgeCheck size={18} />
                    <span>{banner.metric}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — EXECUTIVE SUMMARY
          ═══════════════════════════════════════════════════ */}
      <section className="career-summary">
        <div className="container">
          <div className="career-summary__block">
            <div className="career-summary__text">
              <span className="career-eyebrow"><Sparkles size={16} /> About Our Mission</span>
              <p>
                At Narpavi Homecare, we believe that compassionate healthcare professionals are the true heartbeat of healthcare. Our mission is to bring best-quality care into the comfort of homes, and we are continuously looking for dedicated healthcare professionals — Doctors, Nurses, Patient care assistants, Physiotherapists, Rehabilitation experts, Wellness Coaches, Bio Medical Engineers, Lab Technicians, paramedical professionals, HR Expertise, Guest Relationship and Business Management professionals to join our growing team.
              </p>
            </div>
            <div className="career-summary__image">
              <Image
                src="/images/career/pic-1.png"
                alt="Narpavi Homecare team of healthcare professionals"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </div>

          <div className="career-summary__block career-summary__block--reverse">
            <div className="career-summary__text">
              <p>
                With Narpavi, you&apos;re not just taking a job — you&apos;re very much part of a family that values empathy, professionalism, and continuous learning. Together, We make a real difference in the lives of patients and their families every single day.
              </p>
              <p>
                We leverage our strong Training strength to create excellent healthcare professional of you, if you have right attitude, passion for service, open to learn and energy to excel, share your profile at given mail id mentioning position title.
              </p>
            </div>
            <div className="career-summary__image">
              <Image
                src="/images/career/pic-2.png"
                alt="Narpavi Homecare nurses celebrating together"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* Roles we're hiring for */}
          {/* <div className="career-summary__roles">
            <h2>Positions We&apos;re Hiring For</h2>
            <div className="career-summary__roles-grid">
              {rolesList.map((role) => (
                <span key={role} className="career-role-tag">
                  <Check size={14} /> {role}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — JOB OPENINGS
          ═══════════════════════════════════════════════════ */}
      <section className="career-jobs" id="career-openings">
        <div className="container">
          <div className="career-jobs__header">
            {/* <span className="career-eyebrow"><BriefcaseBusiness size={16} /> Open Positions</span> */}
            <h2>Excellent Opportunity to Join Our Humble Journey in Serving the Society</h2>
            <p>Choose your path and explore opportunities that match your skills and passion.</p>
          </div>

          {/* Two tracks, one journey — interlocked orbs */}
          <div className="career-venn">
            <button
              type="button"
              className={`career-venn__orb career-venn__orb--partner ${
                activeCategory === 'resource-partner' ? 'career-venn__orb--active' : ''
              }`}
              onClick={() => selectCategory('resource-partner')}
              aria-label="Explore Resource Partner opportunities"
            >
              <span className="career-venn__media">
                <Image src="/images/career/pic-18.png" alt="" fill sizes="300px" />
              </span>
              <span className="career-venn__scrim" aria-hidden="true" />
              <span className="career-venn__content">
                <span className="career-venn__kicker">
                  <Handshake size={14} /> Partner With Us
                </span>
                <span className="career-venn__title">Resource Partner</span>
                <span className="career-venn__apply">
                  Apply <ArrowRight size={14} />
                </span>
              </span>
            </button>

            <div className="career-venn__orb career-venn__orb--core">
              <span className="career-venn__ring" aria-hidden="true" />
              <span className="career-venn__core-inner">
                <Image
                  src="/images/logo.png"
                  alt="Narpavi Homecare"
                  width={150}
                  height={58}
                  className="career-venn__logo"
                />
                <span className="career-venn__core-tag">
                  <HeartHandshake size={13} /> One Journey
                </span>
              </span>
            </div>

            <button
              type="button"
              className={`career-venn__orb career-venn__orb--provider ${
                activeCategory === 'care-provider' ? 'career-venn__orb--active' : ''
              }`}
              onClick={() => selectCategory('care-provider')}
              aria-label="Explore Care Provider opportunities"
            >
              <span className="career-venn__media">
                <Image src="/images/career/pic-5.png" alt="" fill sizes="300px" />
              </span>
              <span className="career-venn__scrim" aria-hidden="true" />
              <span className="career-venn__content">
                <span className="career-venn__kicker">
                  <Stethoscope size={14} /> Join Our Team
                </span>
                <span className="career-venn__title">Care Provider</span>
                <span className="career-venn__apply">
                  Apply <ArrowRight size={14} />
                </span>
              </span>
            </button>
          </div>

          {/* Category Tabs */}
          {/* <div className="career-jobs__tabs" ref={jobsTabsRef}>
            <button
              className={`career-jobs__tab ${activeCategory === 'care-provider' ? 'career-jobs__tab--active' : ''}`}
              onClick={() => setActiveCategory('care-provider')}
            >
              <Stethoscope size={18} /> Care Provider — Healthcare Professionals
            </button>
            <button
              className={`career-jobs__tab ${activeCategory === 'resource-partner' ? 'career-jobs__tab--active' : ''}`}
              onClick={() => setActiveCategory('resource-partner')}
            >
              <Handshake size={18} /> Resource Partner
            </button>
          </div> */}

          {/* Job Cards Grid */}
          <div className="career-jobs__grid" ref={jobsGridRef}>
            {filteredJobs.map((job) => (
              <article key={job.id} className="career-job-card">
                <div className="career-job-card__image">
                  <Image
                    src={job.image}
                    alt={job.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                  <div className="career-job-card__overlay">
                    <span className="career-job-card__badge">
                      {job.category === 'resource-partner' ? 'Partner' : 'Hiring'}
                    </span>
                  </div>
                </div>
                <div className="career-job-card__body">
                  <h3>{job.title}</h3>
                  <div className="career-job-card__details">
                    <p><strong>Responsibility:</strong> {job.responsibility}</p>
                    <p><strong>Qualification:</strong> {job.qualification}</p>
                    <p><strong>Experience:</strong> {job.experience}</p>
                    {job.age && <p><strong>Age:</strong> {job.age} &nbsp;|&nbsp; <strong>Gender:</strong> {job.gender}</p>}
                  </div>
                  <button
                    className="btn btn--primary career-job-card__apply"
                    onClick={() => openApplyModal(job)}
                  >
                    Apply Now <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4 — WORKING WITH NARPAVI (Benefits)
          ═══════════════════════════════════════════════════ */}
      <section className="career-benefits">
        <div className="container">
          <div className="career-benefits__header">
            <span className="career-eyebrow"><HeartHandshake size={16} /> Why Join Us</span>
            <h2>Working with Narpavi</h2>
            <p>
              At Narpavi Homecare, we know that great care begins with empowered healthcare professionals. We are committed to creating a workplace where you can learn, grow, feel respected, and make a lasting difference.
            </p>
          </div>

          <div className="career-benefits__grid">
            {benefits.map((benefit, i) => (
              <article key={i} className="career-benefit-card">
                <div className="career-benefit-card__image">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                </div>
                <div className="career-benefit-card__content">
                  <h3>{benefit.title}</h3>
                  <span className="career-benefit-card__tagline">&ldquo;{benefit.tagline}&rdquo;</span>
                  <p>{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5 — OUR CULTURE
          ═══════════════════════════════════════════════════ */}
      <section className="career-culture">
        <div className="container">
          <div className="career-culture__header">
            <span className="career-eyebrow"><Heart size={16} /> Our Values</span>
            <h2>Our Culture</h2>
          </div>
          <div className="career-culture__grid">
            {cultureValues.map((val, i) => (
              <article key={i} className="career-culture-card">
                <span className="career-culture-card__icon">{val.icon}</span>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6 — EMPLOYMENT MODELS
          ═══════════════════════════════════════════════════ */}
      <section className="career-models">
        <div className="container">
          <div className="career-models__header">
            <span className="career-eyebrow"><BadgeCheck size={16} /> Employment Models</span>
            <h2>💼 Employment Models at Narpavi Homecare</h2>
            <p>
              At Narpavi Homecare, we value the diverse needs and aspirations of healthcare professionals. Whether you seek stability, flexibility, or growth, we offer employment models that help you build a meaningful and rewarding career as per your goals and lifestyle — your way.
            </p>
          </div>

          <div className="career-models__grid">
            {employmentModels.map((model, i) => (
              <article
                key={i}
                className={`career-model-card ${model.type.includes('Empowered') ? 'career-model-card--highlighted' : ''}`}
              >
                {model.type.includes('Empowered') && (
                  <span className="career-model-card__premium">★ Premium Model</span>
                )}
                <span className="career-model-card__icon">{model.icon}</span>
                <h3>{model.type}</h3>
                <p className="career-model-card__definition">{model.definition}</p>
                <p className="career-model-card__description">{model.description}</p>
                <span className="career-model-card__tagline">&ldquo;{model.tagline}&rdquo;</span>
              </article>
            ))}
          </div>

          <div className="career-models__cta">
            <button
              className="btn btn--primary btn--lg"
              onClick={() => {
                document.getElementById('career-openings')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Register with us to join next batch <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          APPLY NOW MODAL
          ═══════════════════════════════════════════════════ */}
      {isModalOpen && selectedJob && (
        <div className="career-modal" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="career-modal__content">
            <button className="career-modal__close" onClick={closeModal} aria-label="Close modal">
              <X size={24} />
            </button>

            <div className="career-modal__header">
              <div className="career-modal__header-image">
                <Image
                  src={selectedJob.image}
                  alt={selectedJob.title}
                  fill
                  sizes="120px"
                />
              </div>
              <div>
                <small>{selectedJob.category === 'resource-partner' ? 'PARTNER WITH US' : 'APPLY NOW'}</small>
                <h3>{selectedJob.title}</h3>
              </div>
            </div>

            {submitStatus && (
              <div
                className={`career-modal__status career-modal__status--${submitStatus.type}`}
              >
                {submitStatus.type === 'success' ? <CheckCircle2 size={20} /> : <Shield size={20} />}
                <span>{submitStatus.message}</span>
              </div>
            )}

            <form className="career-form" onSubmit={handleApplySubmit}>
              <div className="career-form__grid">
                <label>
                  <span>Name</span>
                  <input name="name" type="text" placeholder="Your full name" required />
                </label>

                <label>
                  <span>Profession</span>
                  <input name="profession" type="text" placeholder="Your profession / role" required />
                </label>

                <label>
                  <span>Mobile Number</span>
                  <input name="phone" type="tel" inputMode="tel" placeholder="Mobile number" required />
                </label>

                {selectedJob.category !== 'resource-partner' && (
                  <label>
                    <span>Education</span>
                    <select name="education" defaultValue="" required>
                      <option value="" disabled>Select education</option>
                      {educationOptions.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                )}

                <label>
                  <span>Experience</span>
                  <select name="experience" defaultValue="" required>
                    <option value="" disabled>Select experience</option>
                    {experienceOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </label>

                <label className="career-form__upload">
                  <span>{selectedJob.category === 'resource-partner' ? 'Attach Profile' : 'Attach Resume'}</span>
                  <span className="career-form__upload-control">
                    <Upload size={18} /> {selectedFileName || 'Choose file'}
                    <input
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </span>
                </label>
              </div>

              <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Submitting... <Loader2 className="animate-spin" size={17} /></>
                ) : (
                  <>Apply <ArrowRight size={17} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
