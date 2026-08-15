'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BABY_CARE_PACKAGES, type BabyCarePackage } from '@/lib/babyCareData';
import SiteIcon from '@/components/ui/SiteIcon';

function packageStyle(pkg: BabyCarePackage) {
  return {
    '--package-color': pkg.color,
    '--package-gradient': pkg.gradient,
  } as CSSProperties;
}

export default function BabyCarePackageSelector() {
  const [selectedPackageId, setSelectedPackageId] = useState(BABY_CARE_PACKAGES[0]?.id ?? '');
  const selectedPackage = BABY_CARE_PACKAGES.find((pkg) => pkg.id === selectedPackageId) ?? BABY_CARE_PACKAGES[0];

  const handleBookNow = (packageName: string) => {
    window.dispatchEvent(new CustomEvent('narpavi:select-package', { detail: { packageName } }));
    const formEl = document.getElementById('baby-care-form') || document.getElementById('hero-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.setTimeout(() => {
      document.querySelector<HTMLInputElement>('#baby-care-form .cta-form input[name="name"], #hero-form .cta-form input[name="name"]')?.focus({ preventScroll: true });
    }, 450);
  };

  return (
    <div className="elder-packages-layout">
      <aside className="elder-sidebar" aria-label="Baby care package navigation">
        <h3>Packages</h3>
        {BABY_CARE_PACKAGES.map((pkg) => {
          const isSelected = pkg.id === selectedPackage.id;

          return (
            <button
              type="button"
              className={`elder-sidebar__link baby-package-selector__tab${isSelected ? ' is-active' : ''}`}
              key={pkg.id}
              style={packageStyle(pkg)}
              aria-pressed={isSelected}
              onClick={() => setSelectedPackageId(pkg.id)}
            >
              <span><SiteIcon name={pkg.icon} size={19} /></span>
              <strong>{pkg.name}</strong>
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
                alt={`${selectedPackage.name} baby care package`}
                fill
                sizes="(max-width: 992px) 100vw, 28vw"
              />
            </div>
            <div>
              <h4>Ideal For</h4>
              <div className="elder-tag-list">
                {selectedPackage.idealFor.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="elder-highlight-list">
                {selectedPackage.highlights.map((item) => (
                  <div className="elder-highlight-point" key={item.title}>
                    <SiteIcon name="Check" size={18} />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="elder-package-card__actions">
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  onClick={() => handleBookNow(selectedPackage.name)}
                >
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
