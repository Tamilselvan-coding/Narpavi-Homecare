import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import SiteIcon from '@/components/ui/SiteIcon';

const SERVICE_TAGS = [
  { label: 'Home Nursing Care', href: '/home-nursing-care' },
  { label: 'Basic Nursing Care', href: '/basic-nursing-care' },
  { label: 'Patient Assistant Care', href: '/home-nursing-care/patient-assistant-care' },
  { label: 'Advance Nursing Care', href: '/home-nursing-care/advance-nursing-care' },
  { label: 'Specialty Nursing Care', href: '/home-nursing-care/specialty-nursing-care' },
  { label: 'ICU @ Home', href: '/home-nursing-care/icu-at-home' },
  { label: 'Baby Care', href: '/baby-care' },
  { label: 'Elder Care', href: '/elder-care' },
  { label: 'Medical Equipment', href: '/medical-equipment' },
];

const FOOTER_COLUMNS = [
  {
    title: 'Narpavi Homecare',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Narpavi', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Join Us', href: '/join-us' },
      { label: 'FAQs', href: '/faq' },
    ],
  },
  {
    title: 'Home Nursing Care',
    links: [
      { label: 'Home Nursing Care', href: '/home-nursing-care' },
      { label: 'Patient Assistant Care', href: '/home-nursing-care/patient-assistant-care' },
      { label: 'Basic Nursing Care', href: '/basic-nursing-care' },
      { label: 'Advance Nursing Care', href: '/home-nursing-care/advance-nursing-care' },
      { label: 'Specialty Nursing Care', href: '/home-nursing-care/specialty-nursing-care' },
      { label: 'ICU @ Home', href: '/home-nursing-care/icu-at-home' },
      { label: 'End-of-Life Care', href: '/home-nursing-care/end-of-life-care' },
    ],
  },
  {
    title: 'Family Care',
    links: [
      { label: 'Baby Care', href: '/baby-care' },
      { label: 'Baby Care at Home', href: '/home-nursing-care/baby-care' },
      { label: 'Elder Care', href: '/elder-care' },
      { label: 'Care Assessment', href: '/contact' },
    ],
  },
  {
    title: 'Medical Equipment',
    links: [
      { label: 'Medical Equipment', href: '/medical-equipment' },
      { label: 'Respiratory Equipment', href: '/medical-equipment/respiratory-equipment' },
      { label: 'Monitors', href: '/medical-equipment/monitors' },
      { label: 'Ventilators', href: '/medical-equipment/ventilators' },
      { label: 'Oxygen Cylinder', href: '/medical-equipment/oxygen-cylinder' },
      { label: 'Hospital COT', href: '/medical-equipment/hospital-cot' },
      { label: 'Mobility Equipment', href: '/medical-equipment/mobility-equipment' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'How to Choose Nursing Care Plan', href: '/resources/how-to-choose-nursing-care-plan' },
      { label: 'Search Services', href: '/search' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const CARE_ENQUIRY_LINKS = [
  { label: BRAND.email, href: `mailto:${BRAND.email}`, external: true },
  { label: BRAND.address, href: '/contact' },
  { label: 'Nursing care at home', href: '/home-nursing-care' },
  { label: 'Elder care', href: '/elder-care' },
  { label: 'Mother & baby care', href: '/baby-care' },
  { label: 'Advanced & ICU care', href: '/home-nursing-care/icu-at-home' },
  { label: 'Medical equipment', href: '/medical-equipment' },
];

const POLICY_LINKS = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'FAQ', href: '/faq' },
];

const SOCIAL_LINKS = [
  { label: 'Email', href: 'mailto:' + BRAND.email, icon: 'Email', external: false },
];

export default function Footer() {
  return (
    <footer className="premium-footer" id="site-footer">
      <div className="premium-footer__service-strip">
        <div className="container">
          <div className="premium-footer__service-heading">
            <span aria-hidden="true" />
            <h2>Care tailored for your family needs</h2>
            <span aria-hidden="true" />
          </div>
          <div className="premium-footer__service-tags" aria-label="Popular home healthcare services">
            {SERVICE_TAGS.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="premium-footer__main">
        <div className="container">
          <div className="premium-footer__content">
            <div className="premium-footer__columns">
              {FOOTER_COLUMNS.map((column) => (
                <nav className="premium-footer__col" aria-label={column.title} key={column.title}>
                  <h4>{column.title}</h4>
                  <ul>
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.label}`}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            <div className="premium-footer__actions" aria-label="Footer contact actions">
              <a href={`mailto:${BRAND.email}`} className="premium-footer__action-btn">
                <SiteIcon name="Email" size={16} /> {BRAND.email}
              </a>
              <Link href="/join-us" className="premium-footer__action-btn">
                Join Our Care Team
              </Link>
              <div className="premium-footer__social">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    href={link.href}
                    key={link.label}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener' : undefined}
                    aria-label={link.label}
                  >
                    <SiteIcon name={link.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="premium-footer__contact">
            <strong>CARE ENQUIRIES:</strong>
            <div>
              {CARE_ENQUIRY_LINKS.map((link) =>
                link.external ? (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="premium-footer__bottom">
            <div className="premium-footer__bottom-links">
              {POLICY_LINKS.map((link) => (
                <Link href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </div>
            <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
