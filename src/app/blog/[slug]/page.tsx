import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, ShieldCheck, Sparkles } from 'lucide-react';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';
import SiteIcon from '@/components/ui/SiteIcon';
import { BABY_CARE_BLOG_ARTICLES, getBabyCareBlogArticle } from '@/lib/babyCareBlogs';
import { ADVANCE_NURSING_BLOG_ARTICLES, getAdvanceNursingBlogArticle } from '@/lib/advanceNursingCareBlogs';
import { SPECIALTY_NURSING_BLOG_ARTICLES, getSpecialtyNursingBlogArticle } from '@/lib/specialtyNursingCareBlogs';
import { HOME_NURSING_BLOG_ARTICLES, getHomeNursingBlogArticle } from '@/lib/homeNursingCareBlogs';
import { getBlogServiceMapping } from '@/lib/blogs';
import { getCareFormHref } from '@/lib/careFormLinks';

type BlogSlugPageProps = {
  params: Promise<{ slug: string }>;
};

const BLOG_ARTICLES = [
  ...BABY_CARE_BLOG_ARTICLES,
  ...ADVANCE_NURSING_BLOG_ARTICLES,
  ...SPECIALTY_NURSING_BLOG_ARTICLES,
  ...HOME_NURSING_BLOG_ARTICLES,
];

function getBlogArticle(slug: string) {
  return (
    getBabyCareBlogArticle(slug) ??
    getAdvanceNursingBlogArticle(slug) ??
    getSpecialtyNursingBlogArticle(slug) ??
    getHomeNursingBlogArticle(slug)
  );
}

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: `https://www.nhlcare.com/blog/${article.slug}` },
  };
}

export default async function BlogDetailPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  const mapping = getBlogServiceMapping(article.slug, article.keywords, article.title);

  const serviceHref =
    'serviceHref' in article && typeof article.serviceHref === 'string' && article.serviceHref
      ? article.serviceHref
      : mapping.targetHref;

  const serviceLabel =
    'serviceLabel' in article && typeof article.serviceLabel === 'string' && article.serviceLabel
      ? article.serviceLabel
      : `Explore ${mapping.targetLabel}`;

  const assessmentHref = getCareFormHref(serviceHref);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: article.title },
        ]}
      />

      <BlogArticleLayout
        slug={article.slug}
        title={article.title}
        image={article.image}
        imageAlt={article.imageAlt}
        readTime={article.readTime}
        toc={article.toc}
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '1.5rem' }}>
          {article.intro}
        </p>

        {article.sections.map((section) => (
          <section key={section.id}>
            <h2 id={section.id} style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>
              {section.title}
            </h2>
            {section.body?.map((paragraph) => (
              <p key={paragraph} style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                {paragraph}
              </p>
            ))}
            {section.points && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {section.points.map((point) => (
                  <div key={point.title} className="trust-card">
                    <div className="trust-card__icon">
                      <SiteIcon name="Check" />
                    </div>
                    <div>
                      <h4>{point.title}</h4>
                      <p>{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* ─── DYNAMIC TOPIC-BASED SERVICE CTA CARD ─── */}
        <div
          className="blog-detail-service-card"
          style={{
            background: 'linear-gradient(135deg, #021a24 0%, #032a33 100%)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            marginTop: '3rem',
            color: '#ffffff',
            border: '1px solid rgba(0, 154, 159, 0.3)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.9rem', background: 'rgba(0, 154, 159, 0.2)', border: '1px solid rgba(0, 154, 159, 0.4)', borderRadius: '999px', color: '#00d2da', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
            <Sparkles size={14} /> {mapping.categoryBadge}
          </div>
          <h3 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            {article.ctaTitle || `Need Professional ${mapping.targetLabel} at Home?`}
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.65, maxWidth: '650px', marginBottom: '1.8rem' }}>
            {article.ctaText || `Arrange safe, nurse-supervised home care in Chennai tailored to your family's routine. Onboarding within 24-48 hours with verified caregivers.`}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href={assessmentHref}
              className="btn btn--primary"
              style={{ background: '#FF784B', color: '#ffffff', borderColor: '#FF784B', fontWeight: 700, padding: '0.75rem 1.6rem', borderRadius: '10px' }}
            >
              <span>Book Care Assessment</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href={serviceHref}
              className="btn btn--outline"
              style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)', padding: '0.75rem 1.4rem', borderRadius: '10px' }}
            >
              <span>{serviceLabel}</span>
            </Link>
          </div>
        </div>
      </BlogArticleLayout>
    </>
  );
}
