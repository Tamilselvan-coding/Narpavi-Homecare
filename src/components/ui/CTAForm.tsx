'use client';

import { useId } from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAFormProps {
  title?: string;
  packageName?: string;
  packageOptions?: string[];
}

export default function CTAForm({ title = 'Book Your Free Assessment', packageName, packageOptions }: CTAFormProps) {
  const formId = useId().replace(/:/g, '');
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
        <input type="tel" placeholder="Phone Number" id={`form-phone-${formId}`} name="phone" aria-label="Phone number" />
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
            {packageOptions?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ) : (
        packageName && <input type="hidden" name="packageName" value={packageName} />
      )}
      <button type="submit" className="btn btn--primary" id={`form-submit-${formId}`}>
        Book Free Assessment <ArrowRight size={17} />
      </button>
    </form>
  );
}
