import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BRAND } from '@/lib/constants';
import {
  ADVANCE_NURSING_FRAMEWORK,
  ADVANCE_NURSING_PACKAGE_NAMES,
  ADVANCE_NURSING_PACKAGES,
  ADVANCE_NURSING_SAFETY,
  getAdvanceNursingPackage,
  getOtherAdvanceNursingPackages,
  type AdvanceNursingPackage,
} from '@/lib/advanceNursingCareData';
import { getServiceSchema, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

type PageProps = { params: Promise<{ packageId: string }> };

const packagePath = (id: string) => `/home-nursing-care/advance-nursing-care/${id}`;

function packageStyle(pkg: AdvanceNursingPackage) {
  return { '--package-color': pkg.color, '--package-gradient': pkg.gradient } as CSSProperties;
}

export function generateStaticParams() {
  return ADVANCE_NURSING_PACKAGES.map((pkg) => ({ packageId: pkg.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pkg = getAdvanceNursingPackage((await params).packageId);
  if (!pkg) return { title: 'Advanced Nursing Care Package Not Found' };
  return {
    title: `${pkg.name} | Advanced Nursing Care - Narpavi Homecare`,
    description: `${pkg.tagline}. ${pkg.costCue}`,
    alternates: { canonical: `https://www.narpavihomecare.com${packagePath(pkg.id)}` },
  };
}

export default async function AdvanceNursingPackagePage({ params }: PageProps) {
  const pkg = getAdvanceNursingPackage((await params).packageId);
  if (!pkg) notFound();

  const path = packagePath(pkg.id);
  const otherPackages = getOtherAdvanceNursingPackages(pkg.id);
  const schemas = [
    getWebPageSchema({ title: `${pkg.name} | Advanced Nursing Care`, description: `${pkg.tagline}. ${pkg.costCue}`, path }),
    getServiceSchema({ name: pkg.name, description: pkg.scope.join('. '), path, serviceType: 'Advanced nursing care package' }),
  ];

  return (
    <>
      <StructuredDataScript data={schemas} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Home Nursing Care', href: '/home-nursing-care' }, { label: 'Advance Nursing Care', href: '/home-nursing-care/advance-nursing-care' }, { label: pkg.name }]} />

      <section className="elder-package-hero" style={packageStyle(pkg)}>
        <div className="container elder-package-hero__grid">
          <div>
            <div className="elder-package-hero__badge"><SiteIcon name={pkg.icon} size={18} /> Advance Nursing Care Package</div>
            <h1>{pkg.name}</h1>
            <p>{pkg.tagline}</p>
            <div className="elder-package-hero__actions">
              <a href={BRAND.phoneHref} className="btn btn--white btn--lg"><SiteIcon name="Phone" size={18} /> Call {BRAND.phone}</a>
              <a href="#advance-package-form" className="btn btn--outline btn--lg">Book This Package <SiteIcon name="Arrow" size={18} /></a>
            </div>
          </div>
          <div className="elder-package-hero__media"><Image src={pkg.image} alt={`${pkg.name} Advanced Nursing Care`} fill sizes="(max-width: 992px) 100vw, 40vw" priority /></div>
        </div>
      </section>

      <section className="section">
        <div className="container elder-detail-grid">
          <div>
            <span className="section-kicker">Scope of Service</span>
            <h2>What {pkg.name} Includes</h2>
            <div className="elder-highlight-list elder-highlight-list--large">
              {pkg.scope.map((item) => <div className="elder-highlight-point" key={item} style={packageStyle(pkg)}><SiteIcon name="Check" size={19} /><div><strong>{item}</strong></div></div>)}
            </div>
          </div>
          <aside className="elder-detail-cta" id="advance-package-form" style={packageStyle(pkg)}><CTAForm title={`Book ${pkg.name}`} packageName={pkg.name} packageOptions={ADVANCE_NURSING_PACKAGE_NAMES} /></aside>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__header"><span className="section-kicker">Best for</span><h2>Who This Package Helps Most</h2></div>
          <div className="elder-best-for-grid">
            {pkg.bestFor.map((item) => <article className="elder-best-for-card" key={item} style={packageStyle(pkg)}><SiteIcon name={pkg.icon} size={25} /><p>{item}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header"><span className="section-kicker">Complete care</span><h2>Support Around Every Clinical Visit</h2><p>Each package can be planned around the patient’s prescription, current condition, home setting and family communication needs.</p></div>
          <div className="elder-deliverables-grid">
            {ADVANCE_NURSING_FRAMEWORK.map((item) => <article className="elder-deliverable-card" key={item} style={packageStyle(pkg)}><SiteIcon name={item} size={25} /><h3>{item}</h3></article>)}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container elder-value-layout">
          <div>
            <span className="section-kicker">Care-plan value</span>
            <h2>{pkg.costCue}</h2>
            <p>Our care team helps families plan the appropriate clinical support, keep care records organised and understand the next steps if the patient’s needs change.</p>
            <div className="elder-why-list">
              {ADVANCE_NURSING_SAFETY.map((item) => <div className="elder-highlight-point" key={item} style={packageStyle(pkg)}><SiteIcon name="Check" size={18} /><div><strong>{item}</strong></div></div>)}
            </div>
          </div>
          <div className="elder-value-card" style={packageStyle(pkg)}><SiteIcon name="Digital report" size={30} /><h3>Family updates</h3><p>Digital records, updates and escalation notes help families stay informed during the planned course of care.</p><a href="#advance-package-form" className="btn btn--white">Book Now</a></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header"><span className="section-kicker">Other packages</span><h2>Explore Other Advance Nursing Packages</h2></div>
          <div className="elder-other-packages">
            {otherPackages.map((other) => <Link href={packagePath(other.id)} className="elder-other-package-card" key={other.id} style={packageStyle(other)}><div className="elder-other-package-card__icon"><SiteIcon name={other.icon} size={22} /></div><strong>{other.name}</strong><p>{other.tagline}</p><span>View details <SiteIcon name="Arrow" size={15} /></span></Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
