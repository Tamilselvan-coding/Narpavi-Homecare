'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ELDER_CARE_PACKAGES, type ElderCarePackage } from '@/lib/elderCareData';
import SiteIcon from '@/components/ui/SiteIcon';

function packageStyle(pkg: ElderCarePackage) {
  return {
    '--package-color': pkg.color,
    '--package-gradient': pkg.gradient,
  } as CSSProperties;
}

export default function ElderCarePackageSelector() {
  const [selectedPackageId, setSelectedPackageId] = useState(ELDER_CARE_PACKAGES[0]?.id ?? '');
  const selectedPackage = ELDER_CARE_PACKAGES.find((pkg) => pkg.id === selectedPackageId) ?? ELDER_CARE_PACKAGES[0];

  const handleBookNow = (packageName: string) => {
    window.dispatchEvent(new CustomEvent('narpavi:select-package', { detail: { packageName } }));
    const formEl = document.getElementById('elder-care-hero') || document.getElementById('hero-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.setTimeout(() => {
      document.querySelector<HTMLInputElement>('#elder-care-hero .cta-form input[name="name"], #hero-form .cta-form input[name="name"]')?.focus({ preventScroll: true });
    }, 450);
  };

  return (
    <div className="elder-packages-layout">
      <aside className="elder-sidebar" aria-label="Elder care package navigation">
        <h3>Packages</h3>
        {ELDER_CARE_PACKAGES.map((pkg) => {
          const isSelected = pkg.id === selectedPackage.id;

          return (
            <button
              type="button"
              className={`elder-sidebar__link elder-package-selector__tab${isSelected ? ' is-active' : ''}`}
              key={pkg.id}
              style={packageStyle(pkg)}
              aria-pressed={isSelected}
              onClick={() => setSelectedPackageId(pkg.id)}
            >
              <span><SiteIcon name={pkg.icon} size={19} /></span>
              <strong>{pkg.name}</strong>
              <small>{pkg.tagline}</small>
            </button>
          );
        })}
      </aside>

      <div className="elder-package-list" aria-live="polite">
        <article
          className="elder-package-card"
          id={`package-${selectedPackage.id}`}
          key={selectedPackage.id}
          style={packageStyle(selectedPackage)}
        >
          <div className="elder-package-card__header">
            <div>
              <h3>{selectedPackage.name}</h3>
              <p>{selectedPackage.tagline}</p>
            </div>
          </div>
          <div className="elder-package-card__body">
            <div className="elder-package-card__media">
              <Image
                src={selectedPackage.image}
                alt={`${selectedPackage.name} elder care package`}
                fill
                sizes="(max-width: 992px) 320px, 340px"
              />
            </div>
            <div>
              <div className="elder-package-summary-grid">
                <div className="elder-package-summary-block">
                  <h4>Ideal For Seniors</h4>
                  <div className="elder-tag-list">
                    {selectedPackage.bestFor.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
                <div className="elder-package-summary-block">
                  <h4>Solutions</h4>
                  <div className="elder-package-solution-list">
                    {selectedPackage.highlights.map((item) => (
                      <span key={item.title}>
                        <SiteIcon name="Check" size={15} />
                        {item.title}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="elder-package-summary-block">
                  <h4>Scope of Service</h4>
                  <div className="elder-package-scope-list">
                    {selectedPackage.scope.map((item) => <span key={item.category}>{item.category}</span>)}
                  </div>
                </div>
              </div>
              <div className="elder-package-card__actions">
                <button type="button" className="btn btn--primary btn--sm" onClick={() => handleBookNow(selectedPackage.name)}>
                  Book {selectedPackage.name}
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
