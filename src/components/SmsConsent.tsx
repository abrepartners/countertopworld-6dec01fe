import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * SMS / A2P opt-in consent CHECKBOX shown at the point of phone-number
 * collection on every lead and booking form. Its own checkbox, unchecked by
 * default, not bundled with any other agreement. The label states the message
 * types (appointment, account, and marketing) per TCR requirements, plus
 * frequency, rates, STOP/HELP keywords, and links to the Privacy Policy and
 * SMS Terms (opened in a new tab so a user mid-form does not lose their input).
 */
export default function SmsConsent({ className = '' }: { className?: string }) {
  const [checked, setChecked] = useState(false);
  const linkClass =
    'text-stone-gold hover:text-stone-gold-light underline underline-offset-2 transition-colors';
  return (
    <label
      className={`flex items-start gap-2.5 text-[12px] text-cool-gray/70 font-light leading-relaxed cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        name="sms_consent"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="mt-[3px] h-4 w-4 flex-shrink-0 accent-stone-gold cursor-pointer"
      />
      <span>
        By checking this box and submitting, I agree to receive SMS text messages from Countertop
        World LLC at the number provided (appointment, account, and marketing messages). Msg frequency
        varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. See{' '}
        <Link to="/privacy-policy" className={linkClass} target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link to="/sms-terms" className={linkClass} target="_blank" rel="noopener noreferrer">
          SMS Terms
        </Link>
        .
      </span>
    </label>
  );
}
