'use client';

import { useId } from 'react';
import { ArrowRight } from 'lucide-react';

const COUNTRY_CODES = [
  '+91',
  '+1',
  '+44',
  '+971',
  '+966',
  '+65',
  '+60',
  '+61',
  '+974',
  '+968',
  '+965',
  '+973',
];

interface CTAFormProps {
  title?: string;
  packageName?: string;
  packageOptions?: string[];
}

export default function CTAForm({ title = 'Book Your Care Assessment', packageName, packageOptions }: CTAFormProps) {
  const formId = useId().replace(/:/g, '');
  const customizeOption = 'Customize';
  const packageSelectOptions = packageOptions?.some((option) => option.toLowerCase() === customizeOption.toLowerCase())
    ? packageOptions
    : [...(packageOptions ?? []), customizeOption];
  const showPackageSelect = Boolean(packageOptions?.length);

  return (
    <form className="cta-form" id={`cta-form-${formId}`} onSubmit={(event) => event.preventDefault()}>
      <h3>{title}</h3>
      {packageName && !showPackageSelect && (
        <div className="elder-package-badge" aria-label={`Enquiring about ${packageName}`}>
          Enquiring about: <strong>{packageName}</strong>
        </div>
      )}
      <div className="cta-form__field">
        <input type="text" placeholder="Your Name" id={`form-name-${formId}`} name="name" aria-label="Your name" />
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
            {COUNTRY_CODES.map((code) => (
              <option key={code} value={code}>
                {code}
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
          />
        </div>
      </div>
      <div className="cta-form__field">
        <input type="text" placeholder="City / Location" id={`form-city-${formId}`} name="city" aria-label="City" />
      </div>
      {showPackageSelect ? (
        <div className="cta-form__field">
          <select
            id={`form-package-${formId}`}
            name="packageName"
            aria-label="Select care package"
            defaultValue={packageName ?? ''}
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
      <button type="submit" className="btn btn--primary" id={`form-submit-${formId}`}>
        Book Care Assessment <ArrowRight size={17} />
      </button>
    </form>
  );
}
