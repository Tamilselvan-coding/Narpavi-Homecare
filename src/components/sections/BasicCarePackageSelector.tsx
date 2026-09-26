'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import { CARE_PACKAGES, type CarePackage } from '@/lib/packages';
import { usePackageSelectorHash } from '@/lib/usePackageSelectorHash';
import SiteIcon from '@/components/ui/SiteIcon';

function packageStyle(pkg: CarePackage) {
  return {
    '--package-color': pkg.color,
    '--package-gradient': pkg.gradient,
  } as CSSProperties;
}

export default function BasicCarePackageSelector() {
  const { selectedPackage, setSelectedPackageId } = usePackageSelectorHash(CARE_PACKAGES);

  if (!selectedPackage) return null;

  const handleBookNow = (packageName: string) => {
    window.dispatchEvent(new CustomEvent('narpavi:select-package', { detail: { packageName } }));
    document.getElementById('basic-care-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      document.querySelector<HTMLInputElement>('#basic-care-form .cta-form input[name="name"]')?.focus({ preventScroll: true });
    }, 450);
  };

  return (
    <div className="elder-packages-layout" id="basic-care-packages-selector">
      <aside className="elder-sidebar" aria-label="Basic Nursing Care package navigation">
        <h3>Basic CarePackages</h3>
        {CARE_PACKAGES.map((pkg) => {
          const isSelected = pkg.id === selectedPackage.id;

          return (
            <button
              type="button"
              id={`tab-${pkg.id}`}
              className={`elder-sidebar__link basic-care-package-selector__tab${isSelected ? ' is-active' : ''}`}
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
          className="elder-package-card basic-care-package-card"
          id={`package-${selectedPackage.id}`}
          key={selectedPackage.id}
          style={packageStyle(selectedPackage)}
        >
          <div className="basic-care-package-card__top">
            <div className="basic-care-package-card__title">
              <span><SiteIcon name={selectedPackage.icon} size={24} /></span>
              <h3>{selectedPackage.name} <small>{selectedPackage.tagline}</small></h3>
            </div>
            <button type="button" className="btn btn--primary btn--sm" onClick={() => handleBookNow(selectedPackage.name)}>Book Now</button>
          </div>
          <div className="basic-care-package-card__best">
            <div className="basic-care-package-card__best-label">Best For</div>
            <ul>
              {selectedPackage.bestFor.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="basic-care-package-card__media">
              <Image src={selectedPackage.image} alt={`${selectedPackage.name} Basic Nursing Care package`} fill sizes="(max-width: 992px) 100vw, 220px" />
            </div>
          </div>
          <div className="basic-care-package-card__details">
            <div className="basic-care-package-card__scope">
              <h4>Scope of Service:</h4>
              <div className="basic-care-package-card__scope-list">
                {selectedPackage.scope.map((item) => (
                  <div className="basic-care-package-card__scope-row" key={item.category}>
                    <SiteIcon name="Check" size={17} />
                    <p><strong>{item.category}</strong> - {item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="basic-care-package-card__cue">
              <span><SiteIcon name="Cost benefit cue" size={28} /></span>
              <h4>Cost &amp; Benefit Cue</h4>
              <p>{selectedPackage.costCue}</p>
            </aside>
          </div>
        </article>
      </div>
    </div>
  );
}
