'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  GraduationCap,
  Handshake,
  HeartHandshake,
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              <div><strong>Care Careers</strong><small>Learn, serve and grow</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section join-paths" aria-labelledby="join-paths-title">
        <div className="container">
          <div className="join-section-heading">
            <span className="join-eyebrow">Choose your path</span>
            <h2 id="join-paths-title">How would you like to join us?</h2>
            <p>Select the option that best matches your goal. You can switch at any time.</p>
          </div>

          <div className="join-path-grid">
            <button
              type="button"
              className={`join-path-card join-path-card--partner ${activeTrack === 'partner' ? 'join-path-card--active' : ''}`}
              onClick={() => setActiveTrack('partner')}
              aria-pressed={activeTrack === 'partner'}
            >
              <div className="join-path-card__top">
                <span className="join-path-card__icon"><Handshake size={29} /></span>
                <span className="join-path-card__number">01</span>
              </div>
              <span className="join-path-card__label">For organizations & professionals</span>
              <h3>Become a Partner</h3>
              <p>
                Collaborate through referrals, healthcare services, institutional
                support, community outreach, or employee care programs.
              </p>
              <ul>
                {partnerBenefits.map((benefit) => (
                  <li key={benefit}><Check size={16} /> {benefit}</li>
                ))}
              </ul>
              <span className="join-path-card__link">Choose Partner Path <ArrowRight size={17} /></span>
            </button>

            <button
              type="button"
              className={`join-path-card join-path-card--candidate ${activeTrack === 'candidate' ? 'join-path-card--active' : ''}`}
              onClick={() => setActiveTrack('candidate')}
              aria-pressed={activeTrack === 'candidate'}
            >
              <div className="join-path-card__top">
                <span className="join-path-card__icon"><Stethoscope size={29} /></span>
                <span className="join-path-card__number">02</span>
              </div>
              <span className="join-path-card__label">For nurses & care professionals</span>
              <h3>Apply as a Candidate</h3>
              <p>
                Join as a nurse, trained caregiver, patient assistant, nursing
                graduate, or motivated fresher ready for care training.
              </p>
              <ul>
                {candidateBenefits.map((benefit) => (
                  <li key={benefit}><Check size={16} /> {benefit}</li>
                ))}
              </ul>
              <span className="join-path-card__link">Choose Candidate Path <ArrowRight size={17} /></span>
            </button>
          </div>
        </div>
      </section>

      <section className="section join-application-section" id="join-application">
        <div className="container join-application-layout">
          <div className={`join-application-intro join-application-intro--${activeTrack}`}>
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

            {activeTrack === 'partner' ? (
              <form className="join-form" onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn--secondary">
                  Submit Partner Enquiry <ArrowRight size={17} />
                </button>
              </form>
            ) : (
              <form className="join-form" onSubmit={handleSubmit}>
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
                      <Upload size={18} /> Choose file
                      <input name="resume" type="file" accept=".pdf,.doc,.docx" />
                    </span>
                  </label>
                </div>
                <label>
                  <span>Tell us briefly about yourself</span>
                  <textarea name="message" rows={4} placeholder="Your skills, availability, or preferred work area" />
                </label>
                <button type="submit" className="btn btn--primary">
                  Submit Candidate Application <ArrowRight size={17} />
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
