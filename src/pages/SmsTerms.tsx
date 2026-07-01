import { useEffect } from "react";
import { applyPageHead } from "../lib/pageHead";
import LegalPageLayout from "../components/LegalPageLayout";

export default function SmsTerms() {
  useEffect(() => {
    return applyPageHead({
      title: "SMS Terms of Service | Countertop World",
      description:
        "Countertop World LLC SMS Terms of Service: message types, frequency, message & data rates, STOP/HELP keywords, and how we protect your mobile information.",
      path: "/sms-terms",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "SMS Terms", path: "/sms-terms" },
      ],
    });
  }, []);

  return (
    <LegalPageLayout
      title={<>SMS Terms of Service</>}
      subtitle={
        <p className="text-[14px] text-cool-gray font-light max-w-[560px] mx-auto">
          Countertop World LLC. How our text messaging program works.
        </p>
      }
    >
      <main className="max-w-[760px] mx-auto px-6 py-16 text-[15px] text-cool-gray font-light leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_a]:text-stone-gold [&_a:hover]:text-stone-gold-light [&_a]:transition-colors">
        <p>
          By opting in to SMS from a web form or other medium, you agree to
          receive SMS text messages from Countertop World LLC. These may include
          appointment reminders, quote and order alerts, account notifications,
          customer-care messages, and marketing.
        </p>
        <ul>
          <li>Message frequency may vary.</li>
          <li>Message and data rates may apply.</li>
          <li>To opt out at any time, text STOP.</li>
          <li>
            For assistance, text HELP or visit{" "}
            <a href="https://countertopworldar.com/">
              https://countertopworldar.com/
            </a>
            .
          </li>
          <li>
            See our Privacy Policy at{" "}
            <a href="https://countertopworldar.com/privacy-policy">
              https://countertopworldar.com/privacy-policy
            </a>{" "}
            for how we handle your information.
          </li>
        </ul>
      </main>
    </LegalPageLayout>
  );
}
