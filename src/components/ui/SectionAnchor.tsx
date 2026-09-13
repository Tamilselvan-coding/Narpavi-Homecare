'use client';

import type { ReactNode } from 'react';

export default function SectionAnchor({
  href,
  className,
  children,
}: {
  href: `#${string}`;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        const section = document.getElementById(href.slice(1));
        const header = document.getElementById('site-header');
        if (section && header) {
          section.style.scrollMarginTop = `${Math.ceil(header.getBoundingClientRect().height) + 12}px`;
        }
      }}
    >
      {children}
    </a>
  );
}
