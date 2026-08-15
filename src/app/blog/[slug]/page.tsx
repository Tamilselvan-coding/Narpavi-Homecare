import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';
import SiteIcon from '@/components/ui/SiteIcon';
import { BABY_CARE_BLOG_ARTICLES, getBabyCareBlogArticle } from '@/lib/babyCareBlogs';
import { ADVANCE_NURSING_BLOG_ARTICLES, getAdvanceNursingBlogArticle } from '@/lib/advanceNursingCareBlogs';
import { SPECIALTY_NURSING_BLOG_ARTICLES, getSpecialtyNursingBlogArticle } from '@/lib/specialtyNursingCareBlogs';
import { HOME_NURSING_BLOG_ARTICLES, getHomeNursingBlogArticle } from '@/lib/homeNursingCareBlogs';

import CTAForm from '@/components/ui/CTAForm';

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
  return getBabyCareBlogArticle(slug) ?? getAdvanceNursingBlogArticle(slug) ?? getSpecialtyNursingBlogArticle(slug) ?? getHomeNursingBlogArticle(slug);
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
    alternates: { canonical: `https://www.narpavihomecare.com/blog/${article.slug}` },
  };
}

export default async function BlogDetailPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  const serviceHref = 'serviceHref' in article && typeof article.serviceHref === 'string'
    ? article.serviceHref
    : '/home-nursing-care';
  const serviceLabel = 'serviceLabel' in article && typeof article.serviceLabel === 'string'
    ? article.serviceLabel
    : 'View Home Nursing Care';

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: article.title },
      ]} />

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
            <h2 id={section.id} style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>{section.title}</h2>
            {section.body?.map((paragraph) => (
              <p key={paragraph} style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                {paragraph}
              </p>
            ))}
            {section.points && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {section.points.map((point) => (
                  <div key={point.title} className="trust-card">
                    <div className="trust-card__icon"><SiteIcon name="Check" /></div>
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

        <div className="cta-strip" style={{ borderRadius: 'var(--radius-lg)', marginTop: '2rem' }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>{article.ctaTitle}</h3>
          <p style={{ opacity: 0.9 }}>{article.ctaText}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link href={serviceHref.includes('#') ? serviceHref : `${serviceHref}#cta-form`} className="btn btn--white">Book Care Assessment</Link>
            <Link href={serviceHref} className="btn btn--outline" style={{ color: 'white', borderColor: 'white' }}>{serviceLabel}</Link>
          </div>
        </div>
      </BlogArticleLayout>
    </>
  );
}
