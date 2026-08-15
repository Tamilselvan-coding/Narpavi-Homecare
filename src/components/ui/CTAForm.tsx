'use client';

import { type FormEvent, useEffect, useId, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AlertCircle, ArrowRight, CalendarClock, CheckCircle2, ShoppingCart, X } from 'lucide-react';
import { addToCart } from '@/lib/cart';

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
  submitLabel?: string;
  packageName?: string;
  packageOptions?: string[];
  enquiryFor?: string;
  defaultConsultationType?: string;
  showCartButton?: boolean;
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

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateValue(value: string) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDateDisplay(value: string) {
  const date = parseDateValue(value);
  if (!date) return '';
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function monthLabel(date: Date) {
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

function getMonthDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  return [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: totalDays }, (_, index) => new Date(year, month, index + 1)),
  ];
}

export default function CTAForm({
  title = 'Book Your Free Consultation',
  submitLabel = 'Book Now',
  packageName,
  packageOptions,
  enquiryFor,
  defaultConsultationType,
  showCartButton,
}: CTAFormProps) {
  const formId = useId().replace(/:/g, '');
  const pathname = usePathname();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [selectedPackage, setSelectedPackage] = useState(packageName ?? '');
  const [serviceStartDate, setServiceStartDate] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePickerPlacement, setDatePickerPlacement] = useState<'bottom' | 'top'>('bottom');
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [submittedEnquiry, setSubmittedEnquiry] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const customizeOption = 'Customize';
  const packageSelectOptions = useMemo(() => (
    packageOptions?.some((option) => option.toLowerCase() === customizeOption.toLowerCase())
      ? packageOptions
      : [...(packageOptions ?? []), customizeOption]
  ), [packageOptions]);
  const showPackageSelect = Boolean(packageOptions?.length);
  const baseEnquiryLabel = useMemo(() => {
    const titleLabel = titleToEnquiryLabel(title);
    return enquiryFor || packageName || pathToEnquiryLabel(pathname) || titleLabel || 'Care Assessment';
  }, [enquiryFor, packageName, pathname, title]);
  const selectedEnquiryLabel = selectedPackage.toLowerCase() === customizeOption.toLowerCase()
    ? `${baseEnquiryLabel} - ${customizeOption}`
    : selectedPackage;
  const activeEnquiryLabel = selectedEnquiryLabel || baseEnquiryLabel;

  useEffect(() => {
    const handlePackageSelect = (event: Event) => {
      if (!showPackageSelect) return;

      const packageNameFromEvent = (event as CustomEvent<{ packageName?: string }>).detail?.packageName;
      if (!packageNameFromEvent) return;

      const matchingPackage = packageSelectOptions.find((option) => option.toLowerCase() === packageNameFromEvent.toLowerCase());
      setSelectedPackage(matchingPackage ?? packageNameFromEvent);
    };

    window.addEventListener('narpavi:select-package', handlePackageSelect);
    return () => window.removeEventListener('narpavi:select-package', handlePackageSelect);
  }, [packageSelectOptions, showPackageSelect]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!datePickerRef.current?.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const calendarDays = useMemo(() => getMonthDays(visibleMonth), [visibleMonth]);
  const selectedDateLabel = serviceStartDate ? formatDateDisplay(serviceStartDate) : 'Select Service Start Date';

  const toggleDatePicker = () => {
    const rect = datePickerRef.current?.getBoundingClientRect();
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom;
      setDatePickerPlacement(spaceBelow < 390 && rect.top > spaceBelow ? 'top' : 'bottom');
    }
    setIsDatePickerOpen((isOpen) => !isOpen);
  };

  const changeMonth = (direction: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  };

  const selectServiceDate = (date: Date) => {
    setServiceStartDate(toDateValue(date));
    setIsDatePickerOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const countryCode = String(formData.get('countryCode') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const consultationType = String(formData.get('consultationType') ?? 'Free Expert Consultation').trim();
    const rawPackage = String(formData.get('packageName') ?? '').trim();

    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      countryCode,
      phone,
      phoneFull: `${countryCode} ${phone}`.trim(),
      city: String(formData.get('city') ?? '').trim(),
      serviceStartDate: String(formData.get('serviceStartDate') ?? '').trim(),
      packageName: rawPackage || consultationType,
      consultationType,
      enquiryFor: `${activeEnquiryLabel} (${consultationType})`,
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
      setServiceStartDate('');
    } catch {
      setSubmitError('Unable to submit right now. Please try again shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const countryCode = String(formData.get('countryCode') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();

    addToCart({
      title: activeEnquiryLabel,
      name: String(formData.get('name') ?? '').trim(),
      phoneFull: `${countryCode} ${phone}`.trim(),
      city: String(formData.get('city') ?? '').trim(),
      serviceStartDate: String(formData.get('serviceStartDate') ?? '').trim(),
      packageName: String(formData.get('packageName') ?? '').trim(),
      enquiryFor: activeEnquiryLabel,
      sourcePath: pathname ?? '',
    });

    router.push('/cart');
  };

  const initialConsultationType = defaultConsultationType || (pathname === '/home-nursing-care' ? 'Free Expert Consultation' : 'Care Assessment');
  const shouldShowCartButton = showCartButton ?? (pathname !== '/home-nursing-care');

  return (
      <form className="cta-form" id={`cta-form-${formId}`} ref={formRef} onSubmit={handleSubmit}>
        <h3>{title}</h3>
        <input type="hidden" name="enquiryFor" value={activeEnquiryLabel} />
        <input type="hidden" name="sourcePath" value={pathname ?? ''} />
        {pathname === '/home-nursing-care' && (
          <div className="cta-form__field">
            <select
              id={`form-consultation-type-${formId}`}
              name="consultationType"
              aria-label="Select consultation type"
              defaultValue="Free Expert Consultation"
              style={{
                fontWeight: 700,
                color: '#0a8f8f',
                borderColor: 'rgba(10, 143, 143, 0.4)',
                background: '#f0fdfa',
              }}
            >
              <option value="Free Expert Consultation">Free Expert Consultation</option>
            </select>
          </div>
        )}
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
            placeholder="Mobile Number"
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
      <div className="cta-form__field">
        <label className="cta-form__date-label" htmlFor={`form-service-start-date-${formId}`}>Service Start Date</label>
        <input type="hidden" id={`form-service-start-date-${formId}`} name="serviceStartDate" value={serviceStartDate} />
        <div className="cta-form__date-picker" ref={datePickerRef}>
          <button
            type="button"
            className={`cta-form__date-trigger${serviceStartDate ? '' : ' is-placeholder'}`}
            aria-haspopup="dialog"
            aria-expanded={isDatePickerOpen}
            onClick={toggleDatePicker}
          >
            <span>{selectedDateLabel}</span>
            <CalendarClock size={18} />
          </button>
          {isDatePickerOpen && (
            <div className={`cta-form__date-popover${datePickerPlacement === 'top' ? ' is-above' : ''}`} role="dialog" aria-label="Choose service start date">
              <div className="cta-form__date-nav">
                <button type="button" onClick={() => changeMonth(-1)}>Prev</button>
                <strong>{monthLabel(visibleMonth)}</strong>
                <button type="button" onClick={() => changeMonth(1)}>Next</button>
              </div>
              <div className="cta-form__date-weekdays" aria-hidden="true">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}
              </div>
              <div className="cta-form__date-grid">
                {calendarDays.map((date, index) => {
                  const dateValue = date ? toDateValue(date) : `blank-${index}`;
                  const isSelected = Boolean(date && dateValue === serviceStartDate);

                  return date ? (
                    <button
                      type="button"
                      className={`cta-form__date-day${isSelected ? ' is-selected' : ''}`}
                      key={dateValue}
                      aria-pressed={isSelected}
                      onClick={() => selectServiceDate(date)}
                    >
                      {date.getDate()}
                    </button>
                  ) : (
                    <span className="cta-form__date-empty" key={dateValue} />
                  );
                })}
              </div>
            </div>
          )}
        </div>
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
      <div className="cta-form__actions">
        <button type="submit" className="btn btn--primary" id={`form-submit-${formId}`} disabled={isSubmitting} style={shouldShowCartButton ? {} : { width: '100%', justifyContent: 'center' }}>
          {isSubmitting ? 'Submitting...' : (submitLabel.length > 12 ? 'Book Now' : submitLabel)} <ArrowRight size={16} />
        </button>
        {shouldShowCartButton && (
          <button type="button" className="btn btn--secondary cta-form__cart-btn" onClick={handleAddToCart}>
            <ShoppingCart size={16} /> Add to Cart
          </button>
        )}
      </div>
      {submittedEnquiry && (
        <div className="cta-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="cta-popup-title">
          <div className="cta-popup-backdrop" onClick={() => setSubmittedEnquiry(null)} />
          <div className="cta-popup-card">
            <button
              type="button"
              className="cta-popup-close"
              aria-label="Close message"
              onClick={() => setSubmittedEnquiry(null)}
            >
              <X size={20} />
            </button>
            <div className="cta-popup-icon">
              <CheckCircle2 size={44} />
            </div>
            <h3 id="cta-popup-title">Enquiry Submitted!</h3>
            <p className="cta-popup-message">
              Thank you for choosing Narpavi Homecare. Your enquiry for{' '}
              <strong>{submittedEnquiry}</strong> has been received. Our expert care team will contact you shortly.
            </p>
            <div className="cta-popup-actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setSubmittedEnquiry(null)}
              >
                Okay, Got it
              </button>
            </div>
          </div>
        </div>
      )}
      {submitError && (
        <div className="cta-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="cta-popup-error-title">
          <div className="cta-popup-backdrop" onClick={() => setSubmitError('')} />
          <div className="cta-popup-card cta-popup-card--error">
            <button
              type="button"
              className="cta-popup-close"
              aria-label="Close error message"
              onClick={() => setSubmitError('')}
            >
              <X size={20} />
            </button>
            <div className="cta-popup-icon cta-popup-icon--error">
              <AlertCircle size={44} />
            </div>
            <h3 id="cta-popup-error-title">Submission Issue</h3>
            <p className="cta-popup-message">{submitError}</p>
            <div className="cta-popup-actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setSubmitError('')}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
