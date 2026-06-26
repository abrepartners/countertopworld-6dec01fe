import { Link } from 'react-router-dom';

/**
 * SMS / A2P consent disclosure shown at the point of phone-number collection on
 * every lead and booking form. Required for AT&T / Office@Hand 10DLC approval:
 * it states the message types, frequency, that message & data rates may apply,
 * the STOP/HELP keywords, that consent is not a condition of purchase, and links
 * to the Privacy Policy + SMS Terms.
 *
 * Passive disclosure (consent is implied by submitting the form), matching the
 * model already used in the footer and on the booking page. The Privacy Policy /
 * SMS Terms links open in a new tab so a user mid-form does not lose entered data.
 */
export default function SmsConsent({ className = '' }: { className?: string }) {
  const linkClass =
    'text-stone-gold hover:text-stone-gold-light underline underline-offset-2 transition-colors';
  return (
    <p className={`text-[12px] text-cool-gray/70 font-light leading-relaxed ${className}`}>
      By providing your phone number, you agree to receive SMS text messages from Countertop World
      LLC about your inquiry, appointments, quotes, and service updates. Message frequency varies.
      Message &amp; data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a
      condition of purchase. See our{' '}
      <Link to="/privacy" className={linkClass} target="_blank" rel="noopener noreferrer">
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link to="/sms-terms" className={linkClass} target="_blank" rel="noopener noreferrer">
        SMS Terms
      </Link>
      .
    </p>
  );
}
