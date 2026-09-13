'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { SPECIALTY_NURSING_PACKAGES, type SpecialtyNursingPackage } from '@/lib/specialtyNursingCareData';
import SiteIcon from '@/components/ui/SiteIcon';

function packageStyle(pkg: SpecialtyNursingPackage) {
  return {
    '--package-color': pkg.color,
    '--package-gradient': pkg.gradient,
  } as CSSProperties;
}

export default function SpecialtyCarePackageSelector() {
  const [selectedPackageId, setSelectedPackageId] = useState(SPECIALTY_NURSING_PACKAGES[0]?.id ?? '');
  const selectedPackage = SPECIALTY_NURSING_PACKAGES.find((pkg) => pkg.id === selectedPackageId) ?? SPECIALTY_NURSING_PACKAGES[0];

  if (!selectedPackage) return null;

  const handleBookNow = (packageName: string) => {
    window.dispatchEvent(new CustomEvent('narpavi:select-package', { detail: { packageName } }));
    document.getElementById('specialty-nursing-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      document.querySelector<HTMLInputElement>('#specialty-nursing-form .cta-form input[name="name"]')?.focus({ preventScroll: true });
    }, 450);
  };

  return (
    <div className="elder-packages-layout">
      <aside className="elder-sidebar" aria-label="Specialty Nursing Care package navigation">
        <h3>Speciality Nursing Care Packages</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {SPECIALTY_NURSING_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedPackage.id;

            return (
              <button
                type="button"
                className={`elder-sidebar__link basic-care-package-selector__tab${isSelected ? ' is-active' : ''}`}
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
        </div>
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
              <Image src={selectedPackage.image} alt={`${selectedPackage.name} Specialty Nursing Care package`} fill sizes="(max-width: 992px) 100vw, 220px" style={{ objectFit: 'cover' }} />
            </div>
          </div>

          <div className="basic-care-package-card__details">
            {/* Row 1 Box: Scope of Service & Equipment Covered */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', backgroundColor: '#fff', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                {/* Card 1: Scope of Service */}
                <div>
                  <h4 style={{ color: 'var(--package-color)', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Scope of Service:</h4>
                  <div className="basic-care-package-card__scope-list">
                    {selectedPackage.scope.map((item) => (
                      <div className="basic-care-package-card__scope-row" key={item}>
                        <SiteIcon name="Check" size={17} />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 2: Equipment Covered */}
                <div>
                  <h4 style={{ color: 'var(--package-color)', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Equipment Covered:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {selectedPackage.equipment.map((item) => (
                      <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--package-color)', flexShrink: 0, marginTop: '0.15rem' }}><SiteIcon name="Check" size={15} /></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 Box: Cost & Benefit Cue & Add-ons / Optional Upgrades */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', backgroundColor: '#fff', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                {/* Card 3: Cost & Benefit Cue */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--package-color)' }}><SiteIcon name="Cost benefit cue" size={24} /></span>
                    <h4 style={{ color: 'var(--package-color)', margin: 0, fontSize: '1rem', fontWeight: 600 }}>Cost &amp; Benefit Cue:</h4>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>{selectedPackage.costCue}</p>
                </div>

                {/* Card 4: Add-ons / Optional Upgrades */}
                <div>
                  <h4 style={{ color: 'var(--package-color)', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Add-ons / Optional Upgrades:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {selectedPackage.upgrades.map((item) => (
                      <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--package-color)', flexShrink: 0, marginTop: '0.15rem' }}><SiteIcon name="Check" size={15} /></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


          </div>
        </article>
      </div>
    </div>
  );
}
