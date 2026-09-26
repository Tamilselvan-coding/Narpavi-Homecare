'use client';

import '@/styles/faq.css';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { type FAQ } from '@/lib/faqs';
import CTAForm from '@/components/ui/CTAForm';
import {
  Search,
  X,
  HelpCircle,
  ShieldCheck,
  Clock,
  Stethoscope,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  Layers,
  CalendarCheck,
  Check,
  Award,
  Sparkles,
} from 'lucide-react';

interface FAQCategory {
  id: string;
  name: string;
  ids: number[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'services',
    name: 'Care Scope & Services',
    ids: [1, 2, 3, 4, 12],
  },
  {
    id: 'caregivers',
    name: 'Caregiver Quality & Safety',
    ids: [6, 7, 8, 9],
  },
  {
    id: 'assessment',
    name: 'Assessment & Onboarding',
    ids: [5, 10, 11],
  },
  {
    id: 'shifts',
    name: 'Shifts & Home Setup',
    ids: [13, 14, 15],
  },
];

export default function FAQExperience({ faqs }: { faqs: FAQ[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<number | null>(1); // First item open by default

  const filteredFaqs = useMemo(() => {
    let result = faqs;

    // Filter by Category
    if (selectedCategory !== 'all') {
      const activeCat = FAQ_CATEGORIES.find((c) => c.id === selectedCategory);
      if (activeCat) {
        result = result.filter((item) => activeCat.ids.includes(item.id));
      }
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );
    }

    return result;
  }, [faqs, selectedCategory, searchQuery]);

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const expandAll = () => {
    // Open the first matching or keep track
    if (filteredFaqs.length > 0) {
      setOpenId(filteredFaqs[0].id);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="faq-pro">
        {/* ─── 1. HERO & SEARCH BAR ─── */}
        <section className="faq-pro-hero">
          <div className="container">
            <div className="faq-pro-hero__content">
              <div className="faq-pro-hero__badge">
                <HelpCircle size={15} className="faq-pro-hero__badge-icon" />
                <span>Knowledge Base &amp; FAQ Portal</span>
              </div>
              <h1 className="faq-pro-hero__title">
                Frequently Asked <span>Questions</span>
              </h1>
              <p className="faq-pro-hero__subtitle">
                Clear, transparent answers about Basic Nursing Care, clinical supervision, caregiver training, flexible shift options, and transparent pricing in Chennai.
              </p>

              {/* Interactive Search Field */}
              <div className="faq-pro-search">
                <Search size={20} className="faq-pro-search__icon" />
                <input
                  type="text"
                  placeholder="Search questions by keyword (e.g. vitals, hospital readmission, caregiver training, shifts...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="faq-pro-search__input"
                  aria-label="Search FAQs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="faq-pro-search__clear"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="faq-pro-categories" role="tablist" aria-label="FAQ Categories">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'all'}
                  className={`faq-pro-cat-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  <Layers size={14} />
                  <span>All Questions ({faqs.length})</span>
                </button>
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat.id}
                    className={`faq-pro-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.name} ({cat.ids.length})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. ACCORDION QUESTIONS LIST ─── */}
        <section className="faq-pro-content-section" id="faq-list-section">
          <div className="container">
            {/* Results Status Header */}
            <div className="faq-pro-status-bar">
              <span className="faq-pro-status-count">
                Showing <strong>{filteredFaqs.length}</strong> of {faqs.length} questions
                {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="faq-pro-status-reset"
                >
                  Reset Filter
                </button>
              )}
            </div>

            {/* Questions Grid / Accordion */}
            {filteredFaqs.length > 0 ? (
              <div className="faq-pro-list">
                {filteredFaqs.map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`faq-pro-card ${isOpen ? 'faq-pro-card--open' : ''}`}
                    >
                      <button
                        type="button"
                        className="faq-pro-card__header"
                        onClick={() => toggleItem(faq.id)}
                        aria-expanded={isOpen}
                        id={`faq-btn-${faq.id}`}
                        aria-controls={`faq-answer-${faq.id}`}
                      >
                        <div className="faq-pro-card__header-left">
                          <span className="faq-pro-card__num">
                            {String(faq.id).padStart(2, '0')}
                          </span>
                          <h3 className="faq-pro-card__question">{faq.question}</h3>
                        </div>
                        <span className="faq-pro-card__toggle-icon" aria-hidden="true">
                          <ChevronDown size={18} />
                        </span>
                      </button>

                      {isOpen && (
                        <div
                          id={`faq-answer-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-btn-${faq.id}`}
                          className="faq-pro-card__body"
                        >
                          <p className="faq-pro-card__answer">{faq.answer}</p>
                          <div className="faq-pro-card__footer">
                            <span className="faq-pro-card__hint">Need more clarification on this topic?</span>
                            <a
                              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi Narpavi Team, I have a question about: "${faq.question}"`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="faq-pro-card__wa-link"
                            >
                              <MessageCircle size={14} />
                              <span>Ask Care Coordinator on WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="faq-pro-empty">
                <HelpCircle size={48} className="faq-pro-empty__icon" />
                <h3>No matching questions found</h3>
                <p>We couldn&apos;t find any FAQs matching your query &ldquo;{searchQuery}&rdquo;. Our care team is available to answer your specific question directly.</p>
                <div className="faq-pro-empty__actions">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="btn btn--secondary"
                  >
                    View All Questions
                  </button>
                  <a
                    href={`tel:${BRAND.phone.replace(/\s+/g, '')}`}
                    className="btn btn--primary"
                  >
                    <Phone size={16} />
                    <span>Call Care Desk: {BRAND.phone}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 3. SPLIT CONSULTATION & ASSESSMENT FORM ─── */}
        <section className="faq-pro-consult-section" id="faq-cta-form">
          <div className="container">
            <div className="faq-pro-consult-grid">
              {/* Left Column: Reassurance & Quick Support */}
              <div className="faq-pro-consult-info">
                <span className="faq-pro-consult-tag">
                  <Sparkles size={14} /> Clinical Family Support
                </span>
                <h2>Still Have Questions About Home Healthcare?</h2>
                <p className="faq-pro-consult-lead">
                  Every patient&apos;s recovery path is unique. Speak directly with our clinical care managers in Chennai to design a safe, dignified, and customized home care plan.
                </p>

                {/* Direct Channel Cards */}
                <div className="faq-pro-channels">
                  <a
                    href={`tel:${BRAND.phone.replace(/\s+/g, '')}`}
                    className="faq-pro-channel"
                  >
                    <div className="faq-pro-channel__icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <small>Direct Care Desk</small>
                      <strong>{BRAND.phone}</strong>
                      <span>Instant nurse coordinator support</span>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi Narpavi Team, I would like to enquire about home healthcare services.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="faq-pro-channel"
                  >
                    <div className="faq-pro-channel__icon faq-pro-channel__icon--wa">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <small>WhatsApp Consultation</small>
                      <strong>Chat with Care Desk</strong>
                      <span>Quick message &amp; shift estimation</span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${BRAND.email}`}
                    className="faq-pro-channel"
                  >
                    <div className="faq-pro-channel__icon faq-pro-channel__icon--mail">
                      <Mail size={20} />
                    </div>
                    <div>
                      <small>Official Email Support</small>
                      <strong>{BRAND.email}</strong>
                      <span>Detailed medical report review</span>
                    </div>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="faq-pro-proof">
                  <div className="faq-pro-proof-item">
                    <Clock size={16} />
                    <span>24-48h Fast Setup</span>
                  </div>
                  <div className="faq-pro-proof-item">
                    <ShieldCheck size={16} />
                    <span>100% Background Verified</span>
                  </div>
                  <div className="faq-pro-proof-item">
                    <Stethoscope size={16} />
                    <span>Senior Nurse Oversight</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Assessment CTA Form */}
              <div className="faq-pro-consult-form-shell">
                <div className="faq-pro-form-header">
                  <div className="faq-pro-form-pulse" aria-hidden="true" />
                  <span>Free Initial Telephonic Assessment</span>
                </div>
                <CTAForm title="Book a Care Assessment" submitLabel="Submit Enquiry" />
                <p className="faq-pro-form-disclaimer">
                  <ShieldCheck size={15} /> Your health information is handled under strict medical confidentiality.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}