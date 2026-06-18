import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BRAND } from '@/lib/constants';
import {
  BABY_CARE_PACKAGE_NAMES,
  BABY_CARE_PACKAGES,
  getBabyCarePackage,
  getOtherBabyCarePackages,
  type BabyCarePackage,
} from '@/lib/babyCareData';
import { getServiceSchema, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import StructuredDataScript from '@/components/seo/StructuredDataScript';
import CTAForm from '@/components/ui/CTAForm';
import SiteIcon from '@/components/ui/SiteIcon';

interface PageProps {
  params: Promise<{ packageId: string }>;
}

function packageStyle(pkg: BabyCarePackage) {
  return {
    '--package-color': pkg.color,
    '--package-gradient': pkg.gradient,
  } as CSSProperties;
}

export function generateStaticParams() {
  return BABY_CARE_PACKAGES.map((pkg) => ({ packageId: pkg.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { packageId } = await params;
  const pkg = getBabyCarePackage(packageId);
  if (!pkg) return { title: 'Baby Care Package Not Found' };

  return {
    title: `${pkg.name} Baby Care in Chennai - Narpavi Homecare`,
    description: `${pkg.tagline}. ${pkg.summary}`,
    keywords: [
      `${pkg.name} baby care`,
      'baby care package chennai',
      'newborn care at home chennai',
      ...pkg.idealFor,
    ],
    alternates: { canonical: `https://www.narpavihomecare.com${pkg.href}` },
  };
}

export default async function BabyCarePackagePage({ params }: PageProps) {
  const { packageId } = await params;
  const pkg = getBabyCarePackage(packageId);
  if (!pkg) notFound();

  const otherPackages = getOtherBabyCarePackages(packageId);
  const schemas = [
    getWebPageSchema({
      title: `${pkg.name} Baby Care in Chennai`,
      description: `${pkg.tagline}. ${pkg.summary}`,
      path: pkg.href,
    }),
    getServiceSchema({
      name: `${pkg.name} Baby Care Package`,
      description: `${pkg.tagline}. ${pkg.idealFor.join(' ')}`,
      path: pkg.href,
      serviceType: 'Baby care package',
    }),
  ];

  return (
    <>
      <StructuredDataScript data={schemas} />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Baby Care', href: '/baby-care' },
        { label: pkg.name },
      ]} />

      <section className="elder-package-hero baby-package-hero" style={packageStyle(pkg)}>
        <div className="container elder-package-hero__grid">
          <div>
            <div className="elder-package-hero__badge">
              <SiteIcon name={pkg.icon} size={18} /> Baby Care Package
            </div>
            <h1>{pkg.name}</h1>
            <p>{pkg.tagline}. {pkg.summary}</p>
            <div className="elder-package-hero__actions">
              <a href={BRAND.phoneHref} className="btn btn--white btn--lg">
                <SiteIcon name="Phone" size={18} /> Call {BRAND.phone}
              </a>
              <a href="#baby-package-form" className="btn btn--outline btn--lg">
                Book This Package <SiteIcon name="Arrow" size={18} />
              </a>
            </div>
            <div className="elder-package-hero__facts">
              {pkg.facts.map((fact) => (
                <span key={fact}><SiteIcon name="Check" size={16} /> {fact}</span>
              ))}
            </div>
          </div>
          <div className="elder-package-hero__media">
            <Image src={pkg.image} alt={`${pkg.name} baby care support`} fill sizes="(max-width: 992px) 100vw, 40vw" priority />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container elder-detail-grid">
          <div>
            <span className="section-kicker">Highlights</span>
            <h2>Why Families Choose {pkg.name}</h2>
            <div className="elder-highlight-list elder-highlight-list--large">
              {pkg.highlights.map((item) => (
                <div className="elder-highlight-point" key={item.title} style={packageStyle(pkg)}>
                  <SiteIcon name="Check" size={19} />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="elder-detail-cta" id="baby-package-form" style={packageStyle(pkg)}>
            <CTAForm
              title={`Book ${pkg.name} - Baby Care`}
              packageName={pkg.name}
              packageOptions={BABY_CARE_PACKAGE_NAMES}
            />
          </aside>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Ideal for</span>
            <h2>Who This Package Helps Most</h2>
          </div>
          <div className="elder-best-for-grid">
            {pkg.idealFor.map((item) => (
              <div className="elder-best-for-card" key={item} style={packageStyle(pkg)}>
                <SiteIcon name={pkg.icon} size={25} />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Scope of service</span>
            <h2>What {pkg.name} Covers</h2>
            <p>The package can be adjusted after assessment, but this scope shows the core support families can expect.</p>
          </div>
          <div className="elder-scope-grid" style={packageStyle(pkg)}>
            {pkg.scope.map((item) => (
              <div className="elder-scope-row" key={item.category}>
                <strong>{item.category}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container elder-value-layout">
          <div>
            <span className="section-kicker">Value proposition</span>
            <h2>{pkg.costCue}</h2>
            <p>
              Narpavi Homecare keeps baby care practical: the right caregiver, clear routines, safe hygiene, family updates, and quick escalation when something needs attention.
            </p>
            <div className="elder-why-list">
              {pkg.whyChoose.map((item) => (
                <div className="elder-highlight-point" key={item} style={packageStyle(pkg)}>
                  <SiteIcon name="Check" size={18} />
                  <div>
                    <strong>{item}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="elder-value-card" style={packageStyle(pkg)}>
            <SiteIcon name="Family Communication Report" size={30} />
            <h3>Clear family reporting</h3>
            <p>Feeding, sleep, diaper, comfort, and escalation notes help parents stay close to the care routine every day.</p>
            <Link href="#baby-package-form" className="btn btn--white">Book {pkg.name}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section-kicker">Other packages</span>
            <h2>Explore Other Baby Care Packages</h2>
          </div>
          <div className="elder-other-packages">
            {otherPackages.map((other) => (
              <Link href={other.href} className="elder-other-package-card" key={other.id} style={packageStyle(other)}>
                <div className="elder-other-package-card__icon"><SiteIcon name={other.icon} size={22} /></div>
                <strong>{other.name}</strong>
                <p>{other.tagline}</p>
                <span>View details <SiteIcon name="Arrow" size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="container">
          <h2>Ready to Begin {pkg.name}?</h2>
          <p>Share your baby&apos;s age, mother recovery needs, location, and preferred shift. Our team will confirm the right care plan and next steps.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#baby-package-form" className="btn btn--white btn--lg">Book This Package</a>
            <a href={BRAND.phoneHref} className="btn btn--outline btn--lg" style={{ color: 'white', borderColor: 'white' }}>
              <SiteIcon name="Phone" size={18} /> {BRAND.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
