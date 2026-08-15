'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Loader2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Upload,
  UsersRound,
} from 'lucide-react';

type JoinTrack = 'partner' | 'candidate';

const partnerBenefits = [
  'Dedicated relationship support',
  'Transparent referral coordination',
  'Flexible collaboration models',
];

const candidateBenefits = [
  'Fair assignments and flexible shifts',
  'Training and supervisor guidance',
  'Growth across multiple care levels',
];

export default function JoinUsExperience() {
  const [activeTrack, setActiveTrack] = useState<JoinTrack>('candidate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const handlePartnerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      contactName: String(formData.get('contactName') ?? '').trim(),
      organization: String(formData.get('organization') ?? '').trim(),
      partnerType: String(formData.get('partnerType') ?? '').trim(),
      countryCode: String(formData.get('countryCode') ?? '+91').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      location: String(formData.get('location') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
      sourcePath: typeof window !== 'undefined' ? window.location.pathname : '/join-us',
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/join-us/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.ok !== false) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your partner enquiry has been submitted successfully. Our team will contact you shortly.',
        });
        (event.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Unable to submit partner enquiry. Please check required fields.',
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

  const handleCandidateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    formData.append('sourcePath', typeof window !== 'undefined' ? window.location.pathname : '/join-us');
    formData.append('submittedAt', new Date().toISOString());

    try {
      const response = await fetch('/api/join-us/candidate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.ok !== false) {
        setSubmitStatus({
          type: 'success',
          message: 'Application received! Thank you for applying to Narpavi Homecare. Our recruitment team will review your profile.',
        });
        formElement.reset();
        setSelectedFileName('');
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Unable to submit candidate application. Please verify your entries.',
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

  return (
    <div className="join-page">
      <section className="join-hero">
        <div className="join-hero__glow join-hero__glow--one" />
        <div className="join-hero__glow join-hero__glow--two" />
        <div className="container join-hero__grid">
          <div className="join-hero__content">
            <span className="join-eyebrow"><Sparkles size={16} /> Grow with Narpavi</span>
            <h1>Two ways to create a meaningful healthcare impact</h1>
            <p>
              Build a trusted care partnership with us, or begin your next career
              chapter as a nurse, caregiver, or patient care professional.
            </p>
            <div className="join-hero__actions">
              <button
                type="button"
                className="btn btn--secondary btn--lg"
                onClick={() => {
                  setActiveTrack('partner');
                  setSubmitStatus(null);
                  document.getElementById('join-application')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Handshake size={18} /> Become a Partner
              </button>
              <button
                type="button"
                className="btn btn--primary btn--lg"
                onClick={() => {
                  setActiveTrack('candidate');
                  setSubmitStatus(null);
                  document.getElementById('join-application')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <BriefcaseBusiness size={18} /> Apply as Candidate
              </button>
            </div>
            <div className="join-hero__proof">
              <span><ShieldCheck size={17} /> Trusted care network</span>
              <span><UsersRound size={17} /> Supportive team</span>
              <span><BadgeCheck size={17} /> Clear onboarding</span>
            </div>
          </div>

          <div className="join-hero__visual">
            <div className="join-hero__image">
              <Image
                src="/images/join-us-hero.png"
                alt="Narpavi healthcare candidate and professional partner collaborating"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 52vw"
              />
            </div>
            <div className="join-hero__floating join-hero__floating--partner">
              <span><Handshake size={19} /></span>
              <div><strong>Partner Network</strong><small>Grow care access together</small></div>
            </div>
            <div className="join-hero__floating join-hero__floating--candidate">
              <span><Stethoscope size={19} /></span>
              <div><strong>Healthcare Careers</strong><small>Structured home nursing roles</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="join-tracks">
        <div className="container">
          <div className="join-tracks__header">
            <h2>Select your engagement path</h2>
            <p>Whether you represent an institution or are looking for your next clinical or caregiving role, we welcome your application.</p>
          </div>

          <div className="join-tracks__grid">
            <article className={`join-track-card ${activeTrack === 'partner' ? 'join-track-card--active' : ''}`}>
              <div className="join-track-card__icon"><Building2 size={26} /></div>
              <div className="join-track-card__content">
                <span className="join-track-card__tag">Institutional & Professional</span>
                <h3>Partner with Narpavi</h3>
                <p>Hospitals, clinics, corporates, insurance providers, NGOs, and referral partners looking to expand patient care continuity.</p>
                <ul>
                  {partnerBenefits.map((item) => (
                    <li key={item}><Check size={16} /> {item}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className={`btn ${activeTrack === 'partner' ? 'btn--secondary' : 'btn--outline'}`}
                onClick={() => {
                  setActiveTrack('partner');
                  setSubmitStatus(null);
                  document.getElementById('join-application')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {activeTrack === 'partner' ? 'Selected' : 'Choose Partner Track'}
              </button>
            </article>

            <article className={`join-track-card ${activeTrack === 'candidate' ? 'join-track-card--active' : ''}`}>
              <div className="join-track-card__icon"><GraduationCap size={26} /></div>
              <div className="join-track-card__content">
                <span className="join-track-card__tag">Nurses & Caregivers</span>
                <h3>Work as Care Professional</h3>
                <p>Nurses (ANM / GNM / B.Sc), patient care assistants, trained caregivers, and physiotherapists seeking structured home nursing opportunities.</p>
                <ul>
                  {candidateBenefits.map((item) => (
                    <li key={item}><Check size={16} /> {item}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className={`btn ${activeTrack === 'candidate' ? 'btn--primary' : 'btn--outline'}`}
                onClick={() => {
                  setActiveTrack('candidate');
                  setSubmitStatus(null);
                  document.getElementById('join-application')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {activeTrack === 'candidate' ? 'Selected' : 'Choose Candidate Track'}
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="join-application" id="join-application">
        <div className="container join-application__grid">
          <div className="join-application-intro">
            <span className="join-application-intro__icon">
              {activeTrack === 'partner' ? <Building2 size={30} /> : <GraduationCap size={30} />}
            </span>
            <span className="join-eyebrow">
              {activeTrack === 'partner' ? 'Partnership enquiry' : 'Candidate application'}
            </span>
            <h2>
              {activeTrack === 'partner'
                ? 'Let us build a stronger care ecosystem together'
                : 'Take the next step in your care career'}
            </h2>
            <p>
              {activeTrack === 'partner'
                ? 'Tell us about your organization and collaboration idea. Our partnership team will understand the opportunity and plan the next conversation.'
                : 'Share your role, experience, preferred shift, and location. Our recruitment team can then match you with suitable care opportunities.'}
            </p>
            <div className="join-application-intro__steps">
              <div><span>1</span><p><strong>Submit details</strong><small>Complete the short application</small></p></div>
              <div><span>2</span><p><strong>Team review</strong><small>We evaluate the right fit</small></p></div>
              <div><span>3</span><p><strong>Connect & onboard</strong><small>Discuss the next steps</small></p></div>
            </div>
          </div>

          <div className={`join-form-card join-form-card--${activeTrack}`}>
            <div className="join-form-card__header">
              <span>{activeTrack === 'partner' ? <HeartHandshake size={22} /> : <BriefcaseBusiness size={22} />}</span>
              <div>
                <small>{activeTrack === 'partner' ? 'PARTNER WITH US' : 'WORK WITH US'}</small>
                <h3>{activeTrack === 'partner' ? 'Partner Enquiry Form' : 'Candidate Application Form'}</h3>
              </div>
            </div>

            {submitStatus && (
              <div
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: submitStatus.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                  color: submitStatus.type === 'success' ? '#065F46' : '#991B1B',
                  border: `1px solid ${submitStatus.type === 'success' ? '#A7F3D0' : '#FCA5A5'}`,
                }}
              >
                {submitStatus.type === 'success' ? <CheckCircle2 size={20} /> : <ShieldCheck size={20} />}
                <span style={{ fontSize: '0.925rem', fontWeight: 500 }}>{submitStatus.message}</span>
              </div>
            )}

            {activeTrack === 'partner' ? (
              <form className="join-form" onSubmit={handlePartnerSubmit}>
                <div className="join-form__grid">
                  <label>
                    <span>Contact Person</span>
                    <input name="contactName" type="text" placeholder="Your full name" required />
                  </label>
                  <label>
                    <span>Organization Name</span>
                    <input name="organization" type="text" placeholder="Company / institution" required />
                  </label>
                  <label>
                    <span>Partner Type</span>
                    <select name="partnerType" defaultValue="" required>
                      <option value="" disabled>Select partner type</option>
                      <option>Hospital / Clinic</option>
                      <option>Doctor / Healthcare Professional</option>
                      <option>Corporate / Insurance</option>
                      <option>NGO / Community Organization</option>
                      <option>Pharmacy / Medical Equipment</option>
                      <option>Referral / Service Partner</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label>
                    <span>Phone Number</span>
                    <div className="join-form__phone">
                      <select name="countryCode" aria-label="Country code" defaultValue="+91">
                        <option>+91</option><option>+1</option><option>+44</option>
                        <option>+971</option><option>+65</option>
                      </select>
                      <input name="phone" type="tel" inputMode="tel" placeholder="Phone number" required />
                    </div>
                  </label>
                  <label>
                    <span>Business Email</span>
                    <input name="email" type="email" placeholder="name@company.com" required />
                  </label>
                  <label>
                    <span>City / Service Area</span>
                    <input name="location" type="text" placeholder="City or operating area" required />
                  </label>
                </div>
                <label>
                  <span>How would you like to partner?</span>
                  <textarea name="message" rows={4} placeholder="Briefly describe your partnership idea or requirement" />
                </label>
                <button type="submit" className="btn btn--secondary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Submitting... <Loader2 className="animate-spin" size={17} /></>
                  ) : (
                    <>Submit Partner Enquiry <ArrowRight size={17} /></>
                  )}
                </button>
              </form>
            ) : (
              <form className="join-form" onSubmit={handleCandidateSubmit}>
                <div className="join-form__grid">
                  <label>
                    <span>Full Name</span>
                    <input name="name" type="text" placeholder="Your full name" required />
                  </label>
                  <label>
                    <span>Phone Number</span>
                    <div className="join-form__phone">
                      <select name="countryCode" aria-label="Country code" defaultValue="+91">
                        <option>+91</option><option>+1</option><option>+44</option>
                        <option>+971</option><option>+65</option>
                      </select>
                      <input name="phone" type="tel" inputMode="tel" placeholder="Phone number" required />
                    </div>
                  </label>
                  <label>
                    <span>Email Address</span>
                    <input name="email" type="email" placeholder="you@example.com" required />
                  </label>
                  <label>
                    <span>Applying For</span>
                    <select name="role" defaultValue="" required>
                      <option value="" disabled>Select a role</option>
                      <option>Trained Caregiver</option>
                      <option>Patient Care Assistant</option>
                      <option>ANM / GNM Nurse</option>
                      <option>B.Sc Nursing Graduate</option>
                      <option>Physiotherapist</option>
                      <option>Fresher / Training Applicant</option>
                    </select>
                  </label>
                  <label>
                    <span>Experience</span>
                    <select name="experience" defaultValue="" required>
                      <option value="" disabled>Select experience</option>
                      <option>Fresher</option>
                      <option>Less than 1 year</option>
                      <option>1–3 years</option>
                      <option>3–5 years</option>
                      <option>More than 5 years</option>
                    </select>
                  </label>
                  <label>
                    <span>Preferred Shift</span>
                    <select name="shift" defaultValue="">
                      <option value="" disabled>Select preferred shift</option>
                      <option>4 Hours</option>
                      <option>8 Hours</option>
                      <option>12 Hours</option>
                      <option>24 Hours</option>
                      <option>Live-In</option>
                      <option>Flexible</option>
                    </select>
                  </label>
                  <label>
                    <span>Current Location</span>
                    <input name="location" type="text" placeholder="Area / city" required />
                  </label>
                  <label className="join-form__upload">
                    <span>Resume / CV <small>(optional)</small></span>
                    <span className="join-form__upload-control">
                      <Upload size={18} /> {selectedFileName || 'Choose file'}
                      <input
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSelectedFileName(e.target.files[0].name);
                          }
                        }}
                      />
                    </span>
                  </label>
                </div>
                <label>
                  <span>Tell us briefly about yourself</span>
                  <textarea name="message" rows={4} placeholder="Your skills, availability, or preferred work area" />
                </label>
                <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Submitting... <Loader2 className="animate-spin" size={17} /></>
                  ) : (
                    <>Submit Candidate Application <ArrowRight size={17} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="join-trust">
        <div className="container join-trust__grid">
          <article><span><ShieldCheck size={24} /></span><h3>Clear Process</h3><p>Simple review and transparent next steps.</p></article>
          <article><span><UsersRound size={24} /></span><h3>Human Support</h3><p>A real team guides every application.</p></article>
          <article><span><MapPin size={24} /></span><h3>Local Opportunities</h3><p>Care and partnership options across service areas.</p></article>
          <article><span><BadgeCheck size={24} /></span><h3>Quality First</h3><p>Professional standards for every collaboration.</p></article>
        </div>
      </section>
    </div>
  );
}
