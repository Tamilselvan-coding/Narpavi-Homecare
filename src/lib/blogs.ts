export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
  keywords: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'palliative-care-at-home',
    title: 'Palliative Care at Home — Comfort & Dignity for Loved Ones',
    excerpt: 'Professional palliative care at home. Comfort-focused support with daily family updates.',
    image: '/images/pik-14.png',
    readTime: '6 min read',
    date: '2025-01-15',
    keywords: ['palliative care at home chennai', 'home palliative care'],
  },
  {
    slug: 'post-hospital-recovery-at-home',
    title: 'Post-Hospital Recovery at Home — How a Caregiver Can Help',
    excerpt: 'Learn how a trained caregiver supports wound care, medication management, mobility and nutrition.',
    image: '/images/pik-15.png',
    readTime: '5 min read',
    date: '2025-01-20',
    keywords: ['post hospital recovery at home', 'home recovery care'],
  },
  {
    slug: 'post-surgery-recovery-at-home',
    title: 'Post-Surgery Recovery for Adults at Home — Safety & Comfort Tips',
    excerpt: 'Essential tips for safe post-surgery recovery at home. ADLs, safe mobility, vital checks.',
    image: '/images/pik-12.png',
    readTime: '7 min read',
    date: '2025-02-01',
    keywords: ['post surgery recovery at home', 'caregiver after surgery'],
  },
  {
    slug: 'what-does-a-basic-nursing-care-caregiver-do',
    title: 'What Does a Basic Nursing Care Caregiver Do? A Complete Guide for Families',
    excerpt: 'A complete guide explaining the roles, responsibilities and benefits of hiring a BNC caregiver.',
    image: '/images/pik-13.jpeg',
    readTime: '5 min read',
    date: '2025-02-10',
    keywords: ['patient care assistant', 'basic nursing care caregiver'],
  },
];
