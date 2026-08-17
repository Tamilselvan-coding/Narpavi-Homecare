import Link from 'next/link';

import { ChevronRight } from 'lucide-react';
import RouteVisualBanner from './RouteVisualBanner';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.narpavihomecare.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="breadcrumbs-anchor">
        <div className="breadcrumbs">
          <div className="container">
            <ol className="breadcrumbs__list">
              {items.map((item, i) => (
                <li key={i} className="breadcrumbs__item">
                  {i > 0 && <span className="breadcrumbs__sep"><ChevronRight size={14} /></span>}
                  {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <RouteVisualBanner />
    </>
  );
}
