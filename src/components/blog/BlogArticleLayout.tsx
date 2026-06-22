import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { BLOG_POSTS } from '@/lib/blogs';
import { BRAND } from '@/lib/constants';

interface TocItem {
  id: string;
  label: string;
}

interface BlogArticleLayoutProps {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  readTime: string;
  children: ReactNode;
  toc: TocItem[];
}

export default function BlogArticleLayout({
  slug,
  title,
  image,
  imageAlt,
  readTime,
  children,
  toc,
}: BlogArticleLayoutProps) {
  const currentPost = BLOG_POSTS.find((post) => post.slug === slug);
  const relatedPosts = BLOG_POSTS.filter((post) => post.slug !== slug).slice(0, 3);
  const publishedDate = currentPost
    ? new Date(currentPost.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    : null;

  return (
    <article className="section blog-article" style={{ marginTop: 0 }}>
      <div className="container blog-article__container">
        <div className="blog-article__content">
          <header className="blog-article__hero">
            <div className="blog-article__meta">
              <span>By Narpavi Homecare Team</span>
              {publishedDate && <span>{publishedDate}</span>}
              <span>{readTime}</span>
            </div>
            <h1>{title}</h1>
            <div className="blog-article__image">
              <Image
                src={image}
                alt={imageAlt}
                width={960}
                height={520}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                priority
              />
            </div>
          </header>

          <div className="blog-article__body">
            {children}
          </div>
        </div>

        <aside className="blog-article__sidebar">
          <div className="blog-sidebar__stack">
            <div className="blog-sidebar__card">
              <div className="blog-sidebar__eyebrow">Table of Contents</div>
              <nav aria-label="Table of contents">
                <ul className="blog-toc">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="blog-toc__link">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="blog-sidebar__card">
              <div className="blog-sidebar__eyebrow">Related Articles</div>
              <div className="blog-related-list">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-related-item">
                    <strong>{post.title}</strong>
                    <span>{post.readTime}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="blog-sidebar__card blog-sidebar__card--cta">
              <div className="blog-sidebar__eyebrow">Need Help Fast?</div>
              <h3>Talk to our care team</h3>
              <p>Get the right home care plan, package advice, and fast onboarding support for your family.</p>
              <div className="blog-sidebar__actions">
                <Link href="/contact" className="btn btn--primary btn--sm">Book Care Assessment</Link>
                <a href={BRAND.phoneHref} className="btn btn--outline btn--sm">Call {BRAND.phone}</a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
