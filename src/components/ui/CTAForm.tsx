'use client';

import { type FormEvent, useId, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

const COUNTRY_CODES = [
  { country: 'India', code: '+91' },
  { country: 'Afghanistan', code: '+93' },
  { country: 'Albania', code: '+355' },
  { country: 'Algeria', code: '+213' },
  { country: 'American Samoa', code: '+1-684' },
  { country: 'Andorra', code: '+376' },
  { country: 'Angola', code: '+244' },
  { country: 'Anguilla', code: '+1-264' },
  { country: 'Antigua and Barbuda', code: '+1-268' },
  { country: 'Argentina', code: '+54' },
  { country: 'Armenia', code: '+374' },
  { country: 'Aruba', code: '+297' },
  { country: 'Australia', code: '+61' },
  { country: 'Austria', code: '+43' },
  { country: 'Azerbaijan', code: '+994' },
  { country: 'Bahamas', code: '+1-242' },
  { country: 'Bahrain', code: '+973' },
  { country: 'Bangladesh', code: '+880' },
  { country: 'Barbados', code: '+1-246' },
  { country: 'Belarus', code: '+375' },
  { country: 'Belgium', code: '+32' },
  { country: 'Belize', code: '+501' },
  { country: 'Benin', code: '+229' },
  { country: 'Bermuda', code: '+1-441' },
  { country: 'Bhutan', code: '+975' },
  { country: 'Bolivia', code: '+591' },
  { country: 'Bosnia and Herzegovina', code: '+387' },
  { country: 'Botswana', code: '+267' },
  { country: 'Brazil', code: '+55' },
  { country: 'British Virgin Islands', code: '+1-284' },
  { country: 'Brunei', code: '+673' },
  { country: 'Bulgaria', code: '+359' },
  { country: 'Burkina Faso', code: '+226' },
  { country: 'Burundi', code: '+257' },
  { country: 'Cambodia', code: '+855' },
  { country: 'Cameroon', code: '+237' },
  { country: 'Canada', code: '+1' },
  { country: 'Cape Verde', code: '+238' },
  { country: 'Cayman Islands', code: '+1-345' },
  { country: 'Central African Republic', code: '+236' },
  { country: 'Chad', code: '+235' },
  { country: 'Chile', code: '+56' },
  { country: 'China', code: '+86' },
  { country: 'Colombia', code: '+57' },
  { country: 'Comoros', code: '+269' },
  { country: 'Congo', code: '+242' },
  { country: 'Cook Islands', code: '+682' },
  { country: 'Costa Rica', code: '+506' },
  { country: 'Croatia', code: '+385' },
  { country: 'Cuba', code: '+53' },
  { country: 'Curacao', code: '+599' },
  { country: 'Cyprus', code: '+357' },
  { country: 'Czech Republic', code: '+420' },
  { country: 'Democratic Republic of Congo', code: '+243' },
  { country: 'Denmark', code: '+45' },
  { country: 'Djibouti', code: '+253' },
  { country: 'Dominica', code: '+1-767' },
  { country: 'Dominican Republic', code: '+1-809' },
  { country: 'Ecuador', code: '+593' },
  { country: 'Egypt', code: '+20' },
  { country: 'El Salvador', code: '+503' },
  { country: 'Equatorial Guinea', code: '+240' },
  { country: 'Eritrea', code: '+291' },
  { country: 'Estonia', code: '+372' },
  { country: 'Eswatini', code: '+268' },
  { country: 'Ethiopia', code: '+251' },
  { country: 'Falkland Islands', code: '+500' },
  { country: 'Faroe Islands', code: '+298' },
  { country: 'Fiji', code: '+679' },
  { country: 'Finland', code: '+358' },
  { country: 'France', code: '+33' },
  { country: 'French Guiana', code: '+594' },
  { country: 'French Polynesia', code: '+689' },
  { country: 'Gabon', code: '+241' },
  { country: 'Gambia', code: '+220' },
  { country: 'Georgia', code: '+995' },
  { country: 'Germany', code: '+49' },
  { country: 'Ghana', code: '+233' },
  { country: 'Gibraltar', code: '+350' },
  { country: 'Greece', code: '+30' },
  { country: 'Greenland', code: '+299' },
  { country: 'Grenada', code: '+1-473' },
  { country: 'Guadeloupe', code: '+590' },
  { country: 'Guam', code: '+1-671' },
  { country: 'Guatemala', code: '+502' },
  { country: 'Guernsey', code: '+44-1481' },
  { country: 'Guinea', code: '+224' },
  { country: 'Guinea-Bissau', code: '+245' },
  { country: 'Guyana', code: '+592' },
  { country: 'Haiti', code: '+509' },
  { country: 'Honduras', code: '+504' },
  { country: 'Hong Kong', code: '+852' },
  { country: 'Hungary', code: '+36' },
  { country: 'Iceland', code: '+354' },
  { country: 'Indonesia', code: '+62' },
  { country: 'Iran', code: '+98' },
  { country: 'Iraq', code: '+964' },
  { country: 'Ireland', code: '+353' },
  { country: 'Isle of Man', code: '+44-1624' },
  { country: 'Israel', code: '+972' },
  { country: 'Italy', code: '+39' },
  { country: 'Ivory Coast', code: '+225' },
  { country: 'Jamaica', code: '+1-876' },
  { country: 'Japan', code: '+81' },
  { country: 'Jersey', code: '+44-1534' },
  { country: 'Jordan', code: '+962' },
  { country: 'Kazakhstan', code: '+7' },
  { country: 'Kenya', code: '+254' },
  { country: 'Kiribati', code: '+686' },
  { country: 'Kosovo', code: '+383' },
  { country: 'Kuwait', code: '+965' },
  { country: 'Kyrgyzstan', code: '+996' },
  { country: 'Laos', code: '+856' },
  { country: 'Latvia', code: '+371' },
  { country: 'Lebanon', code: '+961' },
  { country: 'Lesotho', code: '+266' },
  { country: 'Liberia', code: '+231' },
  { country: 'Libya', code: '+218' },
  { country: 'Liechtenstein', code: '+423' },
  { country: 'Lithuania', code: '+370' },
  { country: 'Luxembourg', code: '+352' },
  { country: 'Macau', code: '+853' },
  { country: 'Madagascar', code: '+261' },
  { country: 'Malawi', code: '+265' },
  { country: 'Malaysia', code: '+60' },
  { country: 'Maldives', code: '+960' },
  { country: 'Mali', code: '+223' },
  { country: 'Malta', code: '+356' },
  { country: 'Marshall Islands', code: '+692' },
  { country: 'Martinique', code: '+596' },
  { country: 'Mauritania', code: '+222' },
  { country: 'Mauritius', code: '+230' },
  { country: 'Mayotte', code: '+262' },
  { country: 'Mexico', code: '+52' },
  { country: 'Micronesia', code: '+691' },
  { country: 'Moldova', code: '+373' },
  { country: 'Monaco', code: '+377' },
  { country: 'Mongolia', code: '+976' },
  { country: 'Montenegro', code: '+382' },
  { country: 'Montserrat', code: '+1-664' },
  { country: 'Morocco', code: '+212' },
  { country: 'Mozambique', code: '+258' },
  { country: 'Myanmar', code: '+95' },
  { country: 'Namibia', code: '+264' },
  { country: 'Nauru', code: '+674' },
  { country: 'Nepal', code: '+977' },
  { country: 'Netherlands', code: '+31' },
  { country: 'New Caledonia', code: '+687' },
  { country: 'New Zealand', code: '+64' },
  { country: 'Nicaragua', code: '+505' },
  { country: 'Niger', code: '+227' },
  { country: 'Nigeria', code: '+234' },
  { country: 'Niue', code: '+683' },
  { country: 'North Korea', code: '+850' },
  { country: 'North Macedonia', code: '+389' },
  { country: 'Northern Mariana Islands', code: '+1-670' },
  { country: 'Norway', code: '+47' },
  { country: 'Oman', code: '+968' },
  { country: 'Pakistan', code: '+92' },
  { country: 'Palau', code: '+680' },
  { country: 'Palestine', code: '+970' },
  { country: 'Panama', code: '+507' },
  { country: 'Papua New Guinea', code: '+675' },
  { country: 'Paraguay', code: '+595' },
  { country: 'Peru', code: '+51' },
  { country: 'Philippines', code: '+63' },
  { country: 'Poland', code: '+48' },
  { country: 'Portugal', code: '+351' },
  { country: 'Puerto Rico', code: '+1-787' },
  { country: 'Qatar', code: '+974' },
  { country: 'Reunion', code: '+262' },
  { country: 'Romania', code: '+40' },
  { country: 'Russia', code: '+7' },
  { country: 'Rwanda', code: '+250' },
  { country: 'Saint Barthelemy', code: '+590' },
  { country: 'Saint Helena', code: '+290' },
  { country: 'Saint Kitts and Nevis', code: '+1-869' },
  { country: 'Saint Lucia', code: '+1-758' },
  { country: 'Saint Martin', code: '+590' },
  { country: 'Saint Pierre and Miquelon', code: '+508' },
  { country: 'Saint Vincent and the Grenadines', code: '+1-784' },
  { country: 'Samoa', code: '+685' },
  { country: 'San Marino', code: '+378' },
  { country: 'Sao Tome and Principe', code: '+239' },
  { country: 'Saudi Arabia', code: '+966' },
  { country: 'Senegal', code: '+221' },
  { country: 'Serbia', code: '+381' },
  { country: 'Seychelles', code: '+248' },
  { country: 'Sierra Leone', code: '+232' },
  { country: 'Singapore', code: '+65' },
  { country: 'Sint Maarten', code: '+1-721' },
  { country: 'Slovakia', code: '+421' },
  { country: 'Slovenia', code: '+386' },
  { country: 'Solomon Islands', code: '+677' },
  { country: 'Somalia', code: '+252' },
  { country: 'South Africa', code: '+27' },
  { country: 'South Korea', code: '+82' },
  { country: 'South Sudan', code: '+211' },
  { country: 'Spain', code: '+34' },
  { country: 'Sri Lanka', code: '+94' },
  { country: 'Sudan', code: '+249' },
  { country: 'Suriname', code: '+597' },
  { country: 'Sweden', code: '+46' },
  { country: 'Switzerland', code: '+41' },
  { country: 'Syria', code: '+963' },
  { country: 'Taiwan', code: '+886' },
  { country: 'Tajikistan', code: '+992' },
  { country: 'Tanzania', code: '+255' },
  { country: 'Thailand', code: '+66' },
  { country: 'Timor-Leste', code: '+670' },
  { country: 'Togo', code: '+228' },
  { country: 'Tokelau', code: '+690' },
  { country: 'Tonga', code: '+676' },
  { country: 'Trinidad and Tobago', code: '+1-868' },
  { country: 'Tunisia', code: '+216' },
  { country: 'Turkey', code: '+90' },
  { country: 'Turkmenistan', code: '+993' },
  { country: 'Turks and Caicos Islands', code: '+1-649' },
  { country: 'Tuvalu', code: '+688' },
  { country: 'Uganda', code: '+256' },
  { country: 'Ukraine', code: '+380' },
  { country: 'United Arab Emirates', code: '+971' },
  { country: 'United Kingdom', code: '+44' },
  { country: 'United States', code: '+1' },
  { country: 'Uruguay', code: '+598' },
  { country: 'Uzbekistan', code: '+998' },
  { country: 'Vanuatu', code: '+678' },
  { country: 'Vatican City', code: '+379' },
  { country: 'Venezuela', code: '+58' },
  { country: 'Vietnam', code: '+84' },
  { country: 'Wallis and Futuna', code: '+681' },
  { country: 'Western Sahara', code: '+212' },
  { country: 'Yemen', code: '+967' },
  { country: 'Zambia', code: '+260' },
  { country: 'Zimbabwe', code: '+263' },
];

interface CTAFormProps {
  title?: string;
  packageName?: string;
  packageOptions?: string[];
  enquiryFor?: string;
}

const PATH_ENQUIRY_LABELS: Array<[RegExp, string]> = [
  [/^\/basic-nursing-care\/?$/, 'Basic Nursing Care'],
  [/^\/baby-care(?:\/.*)?$/, 'Baby Care'],
  [/^\/elder-care(?:\/.*)?$/, 'Elder Care'],
  [/^\/medical-equipment\/?$/, 'Medical Equipment'],
  [/^\/home-nursing-care\/patient-assistant-care\/?$/, 'Patient Assistant Care'],
  [/^\/home-nursing-care\/advance-nursing-care(?:\/.*)?$/, 'Advance Nursing Care'],
  [/^\/home-nursing-care\/specialty-nursing-care\/?$/, 'Specialty Nursing Care'],
  [/^\/home-nursing-care\/icu-at-home\/?$/, 'ICU at Home'],
  [/^\/home-nursing-care\/end-of-life-care\/?$/, 'End of Life Care'],
  [/^\/home-nursing-care\/baby-care\/?$/, 'Baby Care'],
  [/^\/home-nursing-care\/?$/, 'Home Nursing Care'],
  [/^\/contact\/?$/, 'Care Assessment'],
];

function titleToEnquiryLabel(title: string) {
  const normalized = title
    .replace(/\s+/g, ' ')
    .replace(/^(book|enquire|inquire)\s+(your|a|an)?\s*/i, '')
    .replace(/\s+(assessment|consultation)$/i, '')
    .replace(/^for\s+/i, '')
    .trim();

  return normalized && !/^care$/i.test(normalized) ? normalized : '';
}

function pathToEnquiryLabel(pathname: string | null) {
  if (!pathname) return '';

  const matchingLabel = PATH_ENQUIRY_LABELS.find(([pattern]) => pattern.test(pathname))?.[1];
  if (matchingLabel) return matchingLabel;

  const slug = pathname.split('/').filter(Boolean).at(-1);
  if (!slug) return '';

  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function CTAForm({
  title = 'Book Your Care Assessment',
  packageName,
  packageOptions,
  enquiryFor,
}: CTAFormProps) {
  const formId = useId().replace(/:/g, '');
  const pathname = usePathname();
  const [selectedPackage, setSelectedPackage] = useState(packageName ?? '');
  const [submittedEnquiry, setSubmittedEnquiry] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const customizeOption = 'Customize';
  const packageSelectOptions = packageOptions?.some((option) => option.toLowerCase() === customizeOption.toLowerCase())
    ? packageOptions
    : [...(packageOptions ?? []), customizeOption];
  const showPackageSelect = Boolean(packageOptions?.length);
  const baseEnquiryLabel = useMemo(() => {
    const titleLabel = titleToEnquiryLabel(title);
    return enquiryFor || packageName || pathToEnquiryLabel(pathname) || titleLabel || 'Care Assessment';
  }, [enquiryFor, packageName, pathname, title]);
  const selectedEnquiryLabel = selectedPackage.toLowerCase() === customizeOption.toLowerCase()
    ? `${baseEnquiryLabel} - ${customizeOption}`
    : selectedPackage;
  const activeEnquiryLabel = selectedEnquiryLabel || baseEnquiryLabel;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const countryCode = String(formData.get('countryCode') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      countryCode,
      phone,
      phoneFull: `${countryCode} ${phone}`.trim(),
      city: String(formData.get('city') ?? '').trim(),
      packageName: String(formData.get('packageName') ?? '').trim(),
      enquiryFor: activeEnquiryLabel,
      sourcePath: pathname ?? '',
      submittedAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    setSubmitError('');
    setSubmittedEnquiry(null);

    try {
      const response = await fetch('/api/care-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Unable to submit enquiry');
      }

      setSubmittedEnquiry(activeEnquiryLabel);
      form.reset();
      setSelectedPackage(packageName ?? '');
    } catch {
      setSubmitError('Unable to submit right now. Please call us or try again shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="cta-form" id={`cta-form-${formId}`} onSubmit={handleSubmit}>
      <h3>{title}</h3>
      <div className="elder-package-badge cta-form__enquiry-badge" aria-label={`Enquiring about ${activeEnquiryLabel}`}>
        Enquiring about: <strong>{activeEnquiryLabel}</strong>
      </div>
      <input type="hidden" name="enquiryFor" value={activeEnquiryLabel} />
      <input type="hidden" name="sourcePath" value={pathname ?? ''} />
      <div className="cta-form__field">
        <input type="text" placeholder="Your Name" id={`form-name-${formId}`} name="name" aria-label="Your name" required />
      </div>
      <div className="cta-form__field">
        <div className="cta-form__phone">
          <select
            id={`form-country-code-${formId}`}
            name="countryCode"
            aria-label="Country calling code"
            autoComplete="tel-country-code"
            defaultValue="+91"
          >
            {COUNTRY_CODES.map(({ country, code }) => (
              <option key={`${country}-${code}`} value={code}>
                {country} ({code})
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Phone Number"
            id={`form-phone-${formId}`}
            name="phone"
            aria-label="Phone number"
            autoComplete="tel-national"
            inputMode="tel"
            required
          />
        </div>
      </div>
      <div className="cta-form__field">
        <input type="text" placeholder="City / Location" id={`form-city-${formId}`} name="city" aria-label="City" required />
      </div>
      {showPackageSelect ? (
        <div className="cta-form__field">
          <select
            id={`form-package-${formId}`}
            name="packageName"
            aria-label="Select care package"
            value={selectedPackage}
            onChange={(event) => setSelectedPackage(event.target.value)}
            required
          >
            <option value="" disabled>Select Care Package</option>
            {packageSelectOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ) : (
        packageName && <input type="hidden" name="packageName" value={packageName} />
      )}
      <button type="submit" className="btn btn--primary" id={`form-submit-${formId}`} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Book Care Assessment'} <ArrowRight size={17} />
      </button>
      {submittedEnquiry && (
        <p className="cta-form__status" role="status" aria-live="polite">
          Enquiry for <strong>{submittedEnquiry}</strong> submitted. Our team will contact you shortly.
        </p>
      )}
      {submitError && (
        <p className="cta-form__status cta-form__status--error" role="alert">
          {submitError}
        </p>
      )}
    </form>
  );
}
