import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { BLOG_POSTS } from '@/lib/blogs';
import BlogListingExperience from '@/components/sections/BlogListingExperience';

export const metadata: Metadata = {
  title: 'Care Guides & Clinical Insights — Home Healthcare Blog | Narpavi',
  description: 'Expert guides on baby care, basic nursing, post-surgery recovery, IV therapy, ICU at home, and elder care from Narpavi Homecare in Chennai.',
  alternates: { canonical: 'https://www.nhlcare.com/blog' },
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
      <BlogListingExperience posts={BLOG_POSTS} />
    </>
  );
}