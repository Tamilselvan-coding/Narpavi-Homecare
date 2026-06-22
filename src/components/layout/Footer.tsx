import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import SiteIcon from '@/components/ui/SiteIcon';

const NURSING_LINKS = [
  { label: 'Baby Care', href: '/baby-care' },
  { label: 'Basic Nursing Care', href: '/basic-nursing-care' },
  { label: 'Advance Nursing Care', href: '/home-nursing-care/advance-nursing-care' },
  { label: 'Specialty Nursing Care', href: '/home-nursing-care/specialty-nursing-care' },
  { label: 'ICU @ Home', href: '/home-nursing-care/icu-at-home' },
  { label: 'Patient Assistant', href: '/home-nursing-care/patient-assistant-care' },
];

const QUICK_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Elder Care', href: '/elder-care' },
  { label: 'Medical Equipment', href: '/medical-equipment' },
  { label: 'Blogs', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Join Us', href: '/join-us' },
];

export default function Footer() {
  return (
    <footer className="premium-footer" id="site-footer">
      {/* Top CTA band */}
      <div className="premium-footer__cta">
        <div className="container premium-footer__cta-inner">
          <div className="premium-footer__cta-text">
            <h3>Need Home Healthcare Support?</h3>
            <p>Schedule an expert care assessment and start care within 24{'\u2013'}48 hours.</p>
          </div>
          <div className="premium-footer__cta-actions">
            <Link href="/contact" className="btn btn--white btn--lg">
              Book Care Assessment <SiteIcon name="Arrow" size={18} />
            </Link>
            <a href={BRAND.phoneHref} className="premium-footer__phone-btn">
              <SiteIcon name="Phone" size={18} /> {BRAND.phoneFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="premium-footer__main">
        <div className="container">
          <div className="premium-footer__grid">
            {/* Brand column */}
            <div className="premium-footer__brand">
              <h3 className="premium-footer__logo">
                Narpavi <span>Homecare</span>
              </h3>
              <p className="premium-footer__tagline">
                Professional home healthcare. Nurse-supervised, doctor-overseen care for your loved ones {'\u2014'} safe, dignified and compassionate.
              </p>
              <div className="premium-footer__social">
                <a href={BRAND.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp" className="premium-footer__social-btn premium-footer__social-btn--wa">
                  <SiteIcon name="WhatsApp" size={20} />
                </a>
                <a href={BRAND.phoneHref} aria-label="Call us" className="premium-footer__social-btn">
                  <SiteIcon name="Phone" size={20} />
                </a>
                <a href={'mailto:' + BRAND.email} aria-label="Email us" className="premium-footer__social-btn">
                  <SiteIcon name="Email" size={20} />
                </a>
              </div>
            </div>

            {/* Nursing links */}
            <div className="premium-footer__col">
              <h4>Home Nursing</h4>
              <ul>
                {NURSING_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <SiteIcon name="Arrow" size={12} /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className="premium-footer__col">
              <h4>Quick Links</h4>
              <ul>
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <SiteIcon name="Arrow" size={12} /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="premium-footer__col premium-footer__contact">
              <h4>Get In Touch</h4>
              <div className="premium-footer__contact-card">
                <div className="premium-footer__contact-row">
                  <div className="premium-footer__contact-icon">
                    <SiteIcon name="Phone" size={18} />
                  </div>
                  <div>
                    <small>Call Us</small>
                    <a href={BRAND.phoneHref}>{BRAND.phoneFormatted}</a>
                  </div>
                </div>
                <div className="premium-footer__contact-row">
                  <div className="premium-footer__contact-icon">
                    <SiteIcon name="Email" size={18} />
                  </div>
                  <div>
                    <small>Email</small>
                    <a href={'mailto:' + BRAND.email}>{BRAND.email}</a>
                  </div>
                </div>
                <div className="premium-footer__contact-row">
                  <div className="premium-footer__contact-icon">
                    <SiteIcon name="Location" size={18} />
                  </div>
                  <div>
                    <small>Location</small>
                    <span>{BRAND.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="premium-footer__bottom">
        <div className="container premium-footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div className="premium-footer__bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="premium-footer__dot">&bull;</span>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
