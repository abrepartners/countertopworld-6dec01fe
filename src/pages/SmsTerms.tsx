import { useEffect } from "react";
import { Link } from "react-router-dom";
import { applyPageHead } from "../lib/pageHead";
import SiteFooter from "../components/SiteFooter";

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
    body: "Your mobile information is handled per our Privacy Policy. We do not share your SMS consent or mobile information with third parties for their marketing.",
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
        "Countertop World LLC SMS Terms & Conditions — message types, frequency, message & data rates, STOP/HELP keywords, and how we protect your mobile information.",
      path: "/sms-terms",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "SMS Terms", path: "/sms-terms" },
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-obsidian antialiased">
      <nav
        className="fixed top-0 inset-x-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10 px-6 h-14 flex items-center justify-between"
        aria-label="Site navigation"
      >
        <Link
          to="/"
          className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline"
        >
          Countertop World
        </Link>
        <Link
          to="/#materials"
          className="text-[13px] text-cool-gray hover:text-vein-white transition-colors no-underline"
        >
          Materials
        </Link>
      </nav>

      <header className="pt-24 pb-16 px-6 text-center bg-granite border-b border-stone-gold/10">
        <span className="inline-block font-mono text-[10px] tracking-[4px] uppercase text-stone-gold bg-stone-gold/10 border border-stone-gold/20 px-3.5 py-1 rounded-[6px] mb-4">
          Legal
        </span>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light tracking-tight text-vein-white mb-4">
          SMS Terms &amp; Conditions
        </h1>
        <p className="text-[14px] text-cool-gray font-light max-w-[560px] mx-auto">
          Countertop World LLC — how our text messaging program works.
        </p>
      </header>

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

      <SiteFooter />
    </div>
  );
}
