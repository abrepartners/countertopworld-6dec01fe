import { useEffect } from "react";
import { Link } from "react-router-dom";
import { applyPageHead } from "../lib/pageHead";
import LegalPageLayout from "../components/LegalPageLayout";

const TERMS = [
  {
    title: "Program description.",
    body: "Countertop World LLC sends SMS messages for appointment scheduling and reminders, quotes, order and installation updates, and customer service replies.",
  },
  {
    title: "Opt-in.",
    body: "You opt in by giving us your mobile number on a form, by phone, or in person and agreeing to receive texts. Consent is not a condition of any purchase.",
  },
  {
    title: "Message frequency.",
    body: "Message frequency varies based on your interaction with us.",
  },
  {
    title: "Cost.",
    body: "Message & data rates may apply, depending on your mobile carrier and plan.",
  },
  {
    title: "Opt-out.",
    body: "Reply STOP at any time to cancel. You'll receive one confirmation message and no further texts unless you opt back in.",
  },
  {
    title: "Help.",
    body: "Reply HELP for assistance, or contact us at (501) 481-8117 / info@countertopworldar.com.",
  },
  {
    title: "Privacy.",
    privacyLink: true,
  },
  {
    title: "Carriers.",
    body: "Carriers are not liable for delayed or undelivered messages.",
  },
];

export default function SmsTerms() {
  useEffect(() => {
    return applyPageHead({
      title: "SMS Terms & Conditions | Countertop World",
      description:
        "Countertop World LLC SMS Terms & Conditions: message types, frequency, message & data rates, STOP/HELP keywords, and how we protect your mobile information.",
      path: "/sms-terms",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "SMS Terms", path: "/sms-terms" },
      ],
    });
  }, []);

  return (
    <LegalPageLayout
      title={<>SMS Terms &amp; Conditions</>}
      subtitle={
        <p className="text-[14px] text-cool-gray font-light max-w-[560px] mx-auto">
          Countertop World LLC. How our text messaging program works.
        </p>
      }
    >
      <main className="max-w-[760px] mx-auto px-6 py-16">
        <ol className="space-y-7 list-none p-0 m-0 counter-reset">
          {TERMS.map((t, i) => (
            <li key={t.title} className="flex gap-5">
              <span
                className="font-display text-[22px] font-light text-stone-gold/40 leading-none w-8 flex-shrink-0 pt-0.5"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="text-[15px] text-cool-gray font-light leading-relaxed">
                <span className="text-vein-white font-medium">{t.title}</span>{" "}
                {t.privacyLink ? (
                  <>
                    Your mobile information is handled per our{" "}
                    <Link
                      to="/privacy"
                      className="text-stone-gold hover:text-stone-gold-light underline underline-offset-2 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    .{" "}
                    <span className="text-vein-white">
                      We do not share your SMS consent or mobile information
                      with third parties for their marketing.
                    </span>
                  </>
                ) : (
                  t.body
                )}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-14 text-[13px] text-cool-gray/70 font-light leading-relaxed border-t border-stone-gold/10 pt-8">
          By providing your number you agree to receive SMS from Countertop
          World LLC. Msg &amp; data rates may apply. Msg frequency varies. Reply
          STOP to cancel, HELP for help.
        </p>
      </main>
    </LegalPageLayout>
  );
}
