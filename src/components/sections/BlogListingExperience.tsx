'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';
import { type BlogPost } from '@/lib/blogs';
import { getCareFormHref } from '@/lib/careFormLinks';
import CTAForm from '@/components/ui/CTAForm';
import {
  Search,
  X,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
  Mail,
  ShieldCheck,
  Stethoscope,
  Layers,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';

interface BlogCategoryOption {
  id: string;
  name: string;
  iconName: string;
}

const CATEGORIES: BlogCategoryOption[] = [
  { id: 'all', name: 'All Articles', iconName: 'Layers' },
  { id: 'baby-care', name: 'Baby & Mother Care', iconName: 'Baby' },
  { id: 'basic-nursing', name: 'Basic Nursing & Recovery', iconName: 'Nursing' },
  { id: 'advance-nursing', name: 'Advance Nursing & IV', iconName: 'Syringe' },
  { id: 'specialty-nursing', name: 'Specialty & ICU Care', iconName: 'Stethoscope' },
  { id: 'elder-palliative', name: 'Elder & Palliative Care', iconName: 'Elder' },
];

export default function BlogListingExperience({ posts }: { posts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPosts = useMemo(() => {
    let result = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'specialty-nursing') {
        result = result.filter(
          (p) => p.category === 'specialty-nursing' || p.category === 'icu-care'
        );
      } else if (selectedCategory === 'elder-palliative') {
        result = result.filter(
          (p) => p.category === 'elder-palliative' || p.category === 'elder-care'
        );
      } else {
        result = result.filter((p) => p.category === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.toLowerCase().includes(q)) ||
          p.categoryBadge.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="blog-pro">
      {/* ─── 1. HERO SECTION & SEARCH ─── */}
      <section className="blog-pro-hero">
        <div className="container">
          <div className="blog-pro-hero__content">
            <div className="blog-pro-hero__badge">
              <BookOpen size={15} />
              <span>Healthcare Insights &amp; Clinical Guides</span>
            </div>
            <h1 className="blog-pro-hero__title">
              Expert Home Healthcare <span>Guides &amp; Advice</span>
            </h1>
            <p className="blog-pro-hero__subtitle">
              Evidence-based recovery tips, newborn care guidelines, caregiver best practices, and clinical advice from senior nurse coordinators in Chennai.
            </p>

            {/* Interactive Live Search Box */}
            <div className="blog-pro-search">
              <Search size={20} className="blog-pro-search__icon" />
              <input
                type="text"
                placeholder="Search articles by topic (e.g. newborn caregiver, tracheostomy, post-surgery recovery, IV therapy...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-pro-search__input"
                aria-label="Search blog articles"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="blog-pro-search__clear"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="blog-pro-categories" role="tablist" aria-label="Blog Categories">
              {CATEGORIES.map((cat) => {
                let count = posts.length;
                if (cat.id === 'baby-care') {
                  count = posts.filter((p) => p.category === 'baby-care').length;
                } else if (cat.id === 'basic-nursing') {
                  count = posts.filter((p) => p.category === 'basic-nursing').length;
                } else if (cat.id === 'advance-nursing') {
                  count = posts.filter((p) => p.category === 'advance-nursing').length;
                } else if (cat.id === 'specialty-nursing') {
                  count = posts.filter(
                    (p) => p.category === 'specialty-nursing' || p.category === 'icu-care'
                  ).length;
                } else if (cat.id === 'elder-palliative') {
                  count = posts.filter(
                    (p) => p.category === 'elder-palliative' || p.category === 'elder-care'
                  ).length;
                }

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat.id}
                    className={`blog-pro-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.name} ({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. ARTICLES LISTING ─── */}
      <section className="blog-pro-listing-section">
        <div className="container">
          {/* Status Bar */}
          <div className="blog-pro-status-bar">
            <span className="blog-pro-status-count">
              Showing <strong>{filteredPosts.length}</strong> of {posts.length} articles
              {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="blog-pro-status-reset"
              >
                Reset Search
              </button>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            <>
              {/* ─── FEATURED SPOTLIGHT ARTICLE ─── */}
              {featuredPost && (
                <div className="blog-pro-featured">
                  <div className="blog-pro-featured__media">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="blog-pro-featured__img"
                      priority
                    />
                    <span className="blog-pro-badge-pill">
                      {featuredPost.categoryBadge}
                    </span>
                  </div>

                  <div className="blog-pro-featured__content">
                    <div className="blog-pro-featured__tag">
                      <Sparkles size={13} /> Featured Care Guide
                    </div>

                    <div className="blog-pro-meta">
                      <span><Clock size={13} /> {featuredPost.readTime}</span>
                      <span>•</span>
                      <span><Calendar size={13} /> {featuredPost.date}</span>
                    </div>

                    <h2 className="blog-pro-featured__title">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="blog-pro-featured__excerpt">
                      {featuredPost.excerpt}
                    </p>

                    {/* DYNAMIC TOPIC-BASED SERVICE ACTIONS */}
                    <div className="blog-pro-featured__actions">
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="btn btn--secondary"
                      >
                        <span>Read Article</span>
                        <ArrowRight size={15} />
                      </Link>

                      <Link
                        href={getCareFormHref(featuredPost.targetHref)}
                        className="btn btn--primary"
                        title={`Book ${featuredPost.targetLabel} Assessment`}
                      >
                        <span>Book {featuredPost.targetLabel.replace(' Services', '').replace(' Care', '')} Assessment</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── GRID OF ARTICLES ─── */}
              {remainingPosts.length > 0 && (
                <div className="blog-pro-grid">
                  {remainingPosts.map((post) => {
                    const assessmentLink = getCareFormHref(post.targetHref);

                    return (
                      <article className="blog-pro-card" key={post.slug}>
                        <div className="blog-pro-card__media">
                          <Link href={`/blog/${post.slug}`} tabIndex={-1}>
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="blog-pro-card__img"
                            />
                          </Link>
                          <span className="blog-pro-card__category">
                            {post.categoryBadge}
                          </span>
                        </div>

                        <div className="blog-pro-card__body">
                          <div className="blog-pro-meta">
                            <span><Clock size={13} /> {post.readTime}</span>
                            <span>•</span>
                            <span><Calendar size={13} /> {post.date}</span>
                          </div>

                          <h3 className="blog-pro-card__title">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>

                          <p className="blog-pro-card__excerpt">
                            {post.excerpt}
                          </p>

                          <div className="blog-pro-card__footer">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="blog-pro-card__read-link"
                            >
                              <span>Read Guide</span>
                              <ArrowRight size={14} />
                            </Link>

                            <Link
                              href={assessmentLink}
                              className="blog-pro-card__service-badge"
                              title={`Go to ${post.targetLabel}`}
                            >
                              <span>Book Assessment</span>
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="blog-pro-empty">
              <BookOpen size={48} className="blog-pro-empty__icon" />
              <h3>No articles found</h3>
              <p>We couldn&apos;t find any articles matching your search query &ldquo;{searchQuery}&rdquo;. Try browsing all categories or reach out directly to our clinical care coordinator.</p>
              <div className="blog-pro-empty__actions">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="btn btn--secondary"
                >
                  View All Articles
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
      <section className="blog-pro-consult-section" id="blog-assessment-cta">
        <div className="container">
          <div className="blog-pro-consult-grid">
            {/* Left: Reassurance & Channels */}
            <div className="blog-pro-consult-info">
              <span className="blog-pro-consult-tag">
                <Sparkles size={14} /> Dedicated Clinical Care
              </span>
              <h2>Need Guidance Choosing the Right Level of Care?</h2>
              <p className="blog-pro-consult-lead">
                Every family situation is unique. Our Senior Nurse Coordinators in Chennai review medical reports, mobility levels, and family shift preferences to recommend the exact right care plan.
              </p>

              <div className="blog-pro-channels">
                <a
                  href={`tel:${BRAND.phone.replace(/\s+/g, '')}`}
                  className="blog-pro-channel"
                >
                  <div className="blog-pro-channel__icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <small>Direct Phone Assistance</small>
                    <strong>{BRAND.phone}</strong>
                    <span>Instant nurse coordinator advice</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi Narpavi Team, I read your care guide and need assistance with home healthcare.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-pro-channel"
                >
                  <div className="blog-pro-channel__icon blog-pro-channel__icon--wa">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <small>WhatsApp Consultation</small>
                    <strong>Chat with Care Desk</strong>
                    <span>Quick questions &amp; package selection</span>
                  </div>
                </a>

                <a
                  href={`mailto:${BRAND.email}`}
                  className="blog-pro-channel"
                >
                  <div className="blog-pro-channel__icon blog-pro-channel__icon--mail">
                    <Mail size={20} />
                  </div>
                  <div>
                    <small>Official Care Desk Email</small>
                    <strong>{BRAND.email}</strong>
                    <span>Send discharge summaries for review</span>
                  </div>
                </a>
              </div>

              <div className="blog-pro-proof">
                <div className="blog-pro-proof-item">
                  <Clock size={16} />
                  <span>24-48h Placement</span>
                </div>
                <div className="blog-pro-proof-item">
                  <ShieldCheck size={16} />
                  <span>100% Background Checked</span>
                </div>
                <div className="blog-pro-proof-item">
                  <Stethoscope size={16} />
                  <span>Clinical Oversight</span>
                </div>
              </div>
            </div>

            {/* Right: Assessment Form */}
            <div className="blog-pro-consult-form-shell">
              <div className="blog-pro-form-header">
                <div className="blog-pro-form-pulse" aria-hidden="true" />
                <span>Free Home Care Assessment</span>
              </div>
              <CTAForm title="Book a Care Assessment" submitLabel="Submit Enquiry" />
              <p className="blog-pro-form-disclaimer">
                <ShieldCheck size={15} /> Your medical information is handled with strict clinical privacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
