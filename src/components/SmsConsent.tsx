import { Link } from "react-router-dom";

/**
 * SMS / A2P consent disclosure shown at the point of phone-number collection on
 * every lead and booking form. Required for AT&T / Office@Hand 10DLC approval:
 * it states the message types, frequency, that message & data rates may apply,
 * the STOP/HELP keywords, that consent is not a condition of purchase, and links
 * to the Privacy Policy + SMS Terms.
 *
 * - `asCheckbox` (default) renders an optional, unchecked checkbox whose label
 *   carries the disclosure. When checked it submits `sms_consent=yes` with the
 *   form, giving GHL an express-consent record. It is intentionally NOT required
 *   — "consent is not a condition of purchase."
 * - `asCheckbox={false}` renders the disclosure as a static note, for contexts
 *   where the phone number is collected inside an embedded widget (e.g. the GHL
 *   booking iframe) rather than a native input.
 */
export default function SmsConsent({
  idPrefix = "",
  asCheckbox = true,
}: {
  idPrefix?: string;
  asCheckbox?: boolean;
}) {
  const linkClass =
    "text-stone-gold hover:text-stone-gold-light underline underline-offset-2 transition-colors";

  const disclosure = (
    <>
      By {asCheckbox ? "checking this box and " : ""}providing your phone
      number, you agree to receive SMS text messages from Countertop World LLC
      about your inquiry, appointments, quotes, and service updates. Message
      frequency varies. Message &amp; data rates may apply. Reply STOP to opt
      out or HELP for help. Consent is not a condition of purchase. See our{" "}
      <Link to="/privacy" className={linkClass}>
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link to="/sms-terms" className={linkClass}>
        SMS Terms
      </Link>
      .
    </>
  );

  if (!asCheckbox) {
    return (
      <p className="text-[12px] text-cool-gray/70 font-light leading-relaxed">
        {disclosure}
      </p>
    );
  }

  const id = `${idPrefix}sms-consent`;
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 cursor-pointer text-[12px] text-cool-gray/70 font-light leading-relaxed"
    >
      <input
        id={id}
        name="sms_consent"
        type="checkbox"
        value="yes"
        className="mt-0.5 h-4 w-4 flex-shrink-0 accent-stone-gold cursor-pointer"
      />
      <span>{disclosure}</span>
    </label>
  );
}
