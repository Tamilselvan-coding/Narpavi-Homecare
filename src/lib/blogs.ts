import { BABY_CARE_BLOG_POSTS, BABY_CARE_BLOG_ARTICLES } from '@/lib/babyCareBlogs';
import { ADVANCE_NURSING_BLOG_POSTS, ADVANCE_NURSING_BLOG_ARTICLES } from '@/lib/advanceNursingCareBlogs';
import { SPECIALTY_NURSING_BLOG_ARTICLES } from '@/lib/specialtyNursingCareBlogs';
import { HOME_NURSING_BLOG_ARTICLES } from '@/lib/homeNursingCareBlogs';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
  keywords: string[];
  category: string;
  categoryBadge: string;
  targetHref: string;
  targetLabel: string;
}

export interface BlogServiceMapping {
  targetHref: string;
  targetLabel: string;
  category: string;
  categoryBadge: string;
}

export function getBlogServiceMapping(slug: string, keywords: string[] = [], title: string = ''): BlogServiceMapping {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();
  const k = keywords.join(' ').toLowerCase();

  // 1. Baby & Mother Care
  if (
    s.includes('baby') ||
    s.includes('newborn') ||
    s.includes('twin') ||
    s.includes('mother') ||
    t.includes('baby') ||
    t.includes('newborn') ||
    k.includes('baby') ||
    k.includes('newborn')
  ) {
    return {
      targetHref: '/baby-care',
      targetLabel: 'Baby Care Services',
      category: 'baby-care',
      categoryBadge: 'Baby & Mother Care',
    };
  }

  // 2. Advance Nursing / IV Therapy
  if (
    s.includes('advance') ||
    s.includes('iv-') ||
    s.includes('iv-therapy') ||
    s.includes('iv-drips') ||
    s.includes('iv-antibiotics') ||
    t.includes('iv therapy') ||
    k.includes('iv therapy')
  ) {
    return {
      targetHref: '/home-nursing-care/advance-nursing-care',
      targetLabel: 'Advance Nursing Care',
      category: 'advance-nursing',
      categoryBadge: 'Advance Nursing Care',
    };
  }

  // 3. Specialty Care (Tracheostomy, PEG/NG tube, Colostomy, Bedsores)
  if (
    s.includes('tracheostomy') ||
    s.includes('peg-ng') ||
    s.includes('colostomy') ||
    s.includes('bedsore') ||
    s.includes('specialty') ||
    t.includes('tracheostomy') ||
    t.includes('tube feeding') ||
    t.includes('colostomy')
  ) {
    return {
      targetHref: '/home-nursing-care/specialty-nursing-care',
      targetLabel: 'Specialty Nursing Care',
      category: 'specialty-nursing',
      categoryBadge: 'Specialty Nursing',
    };
  }

  // 4. ICU at Home
  if (s.includes('icu') || t.includes('icu')) {
    return {
      targetHref: '/home-nursing-care/icu-at-home',
      targetLabel: 'ICU @ Home Care',
      category: 'icu-care',
      categoryBadge: 'ICU @ Home',
    };
  }

  // 5. Palliative & End-of-Life Care
  if (s.includes('palliative') || s.includes('end-of-life')) {
    return {
      targetHref: '/home-nursing-care/end-of-life-care',
      targetLabel: 'Palliative & Comfort Care',
      category: 'elder-palliative',
      categoryBadge: 'Palliative Care',
    };
  }

  // 6. Elderly Care
  if (s.includes('elderly') || s.includes('elder') || s.includes('dementia') || t.includes('elderly') || t.includes('elder')) {
    return {
      targetHref: '/elder-care',
      targetLabel: 'Elder Care Services',
      category: 'elder-care',
      categoryBadge: 'Elder Care',
    };
  }

  // 7. Basic Nursing Care / Post-Hospital Recovery
  return {
    targetHref: '/basic-nursing-care',
    targetLabel: 'Basic Nursing Care',
    category: 'basic-nursing',
    categoryBadge: 'Basic Nursing Care',
  };
}

export const SPECIALTY_NURSING_BLOG_POSTS: BlogPost[] = SPECIALTY_NURSING_BLOG_ARTICLES.map((article) => {
  const mapping = getBlogServiceMapping(article.slug, article.keywords, article.title);
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    readTime: article.readTime,
    date: article.date,
    keywords: article.keywords,
    category: mapping.category,
    categoryBadge: mapping.categoryBadge,
    targetHref: mapping.targetHref,
    targetLabel: mapping.targetLabel,
  };
});

export const HOME_NURSING_BLOG_POSTS: BlogPost[] = HOME_NURSING_BLOG_ARTICLES.map((article) => {
  const mapping = getBlogServiceMapping(article.slug, article.keywords, article.title);
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    readTime: article.readTime,
    date: article.date,
    keywords: article.keywords,
    category: mapping.category,
    categoryBadge: mapping.categoryBadge,
    targetHref: mapping.targetHref,
    targetLabel: mapping.targetLabel,
  };
});

export const RAW_BABY_POSTS: BlogPost[] = BABY_CARE_BLOG_POSTS.map((article) => {
  const mapping = getBlogServiceMapping(article.slug, article.keywords, article.title);
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    readTime: article.readTime,
    date: article.date,
    keywords: article.keywords,
    category: mapping.category,
    categoryBadge: mapping.categoryBadge,
    targetHref: mapping.targetHref,
    targetLabel: mapping.targetLabel,
  };
});

export const RAW_ADVANCE_POSTS: BlogPost[] = ADVANCE_NURSING_BLOG_POSTS.map((article) => {
  const mapping = getBlogServiceMapping(article.slug, article.keywords, article.title);
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    readTime: article.readTime,
    date: article.date,
    keywords: article.keywords,
    category: mapping.category,
    categoryBadge: mapping.categoryBadge,
    targetHref: mapping.targetHref,
    targetLabel: mapping.targetLabel,
  };
});

export const BASIC_NURSING_CARE_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'palliative-care-at-home',
    title: 'Palliative Care at Home — Comfort & Dignity for Loved Ones',
    excerpt: 'Facing a life-limiting illness can be overwhelming — for the person and the family. Palliative care at home focuses on comfort, dignity, and emotional well-being rather than aggressive hospital treatment.',
    image: '/images/pik-14.png',
    readTime: '6 min read',
    date: '2025-01-15',
    keywords: ['palliative care at home chennai', 'home palliative care'],
    category: 'elder-palliative',
    categoryBadge: 'Palliative Care',
    targetHref: '/home-nursing-care/end-of-life-care',
    targetLabel: 'Palliative & Comfort Care',
  },
  {
    slug: 'post-hospital-recovery-at-home',
    title: 'Post-Hospital Recovery at Home – How a Caregiver Can Help',
    excerpt: 'Recovering from surgery or illness is often faster and more comfortable at home. A professional caregiver can play a vital role in making recovery smoother.',
    image: '/images/pik-15.png',
    readTime: '5 min read',
    date: '2025-01-20',
    keywords: ['post hospital recovery at home', 'home recovery care'],
    category: 'basic-nursing',
    categoryBadge: 'Basic Nursing Care',
    targetHref: '/basic-nursing-care',
    targetLabel: 'Basic Nursing Care',
  },
  {
    slug: 'post-surgery-recovery-at-home',
    title: 'Post-Surgery Recovery for Adults at Home — Safety & Comfort Tips',
    excerpt: 'Recovering after surgery doesn’t have to mean a long hospital stay. With the right Basic Nursing Care at home, you can heal faster, reduce infection risk, and stay comfortable.',
    image: '/images/pik-12.png',
    readTime: '7 min read',
    date: '2025-02-01',
    keywords: ['post surgery recovery at home', 'caregiver after surgery'],
    category: 'basic-nursing',
    categoryBadge: 'Basic Nursing Care',
    targetHref: '/basic-nursing-care',
    targetLabel: 'Basic Nursing Care',
  },
  {
    slug: 'what-does-a-basic-nursing-care-caregiver-do',
    title: 'What Does a Patient Care Assistant Do? A Complete Guide for Families',
    excerpt: 'When a loved one needs extra support at home, a Basic Nursing Care Caregiver (BNC) can make all the difference in recovery, daily comfort, and family peace of mind.',
    image: '/images/pik-13.jpeg',
    readTime: '5 min read',
    date: '2025-02-10',
    keywords: ['patient care assistant', 'basic nursing care caregiver'],
    category: 'basic-nursing',
    categoryBadge: 'Basic Nursing Care',
    targetHref: '/basic-nursing-care',
    targetLabel: 'Basic Nursing Care',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  ...BASIC_NURSING_CARE_BLOG_POSTS,
  ...RAW_ADVANCE_POSTS,
  ...RAW_BABY_POSTS,
  ...SPECIALTY_NURSING_BLOG_POSTS,
  ...HOME_NURSING_BLOG_POSTS,
];