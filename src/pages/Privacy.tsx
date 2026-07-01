import { useEffect } from "react";
import { applyPageHead } from "../lib/pageHead";
import LegalPageLayout from "../components/LegalPageLayout";

const LAST_UPDATED = "June 26, 2026";

export default function Privacy() {
  useEffect(() => {
    return applyPageHead({
      title: "Privacy Policy | Countertop World",
      description:
        "How Countertop World LLC collects, uses, and protects your information, including our SMS / text messaging practices. We never share your SMS consent or mobile information with third parties for marketing.",
      path: "/privacy-policy",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ],
    });
  }, []);

  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle={
        <p className="text-[13px] text-cool-gray font-light">
          Last updated: {LAST_UPDATED}
        </p>
      }
    >
      <main className="max-w-[760px] mx-auto px-6 py-16 text-[15px] text-cool-gray font-light leading-relaxed [&_h2]:font-display [&_h2]:text-vein-white [&_h2]:font-light [&_h2]:tracking-tight [&_h2]:text-[clamp(1.3rem,3vw,1.7rem)] [&_h2]:mt-14 [&_h2]:mb-4 [&_h3]:text-vein-white [&_h3]:font-medium [&_h3]:text-[16px] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_strong]:text-vein-white [&_strong]:font-medium [&_a]:text-stone-gold [&_a:hover]:text-stone-gold-light [&_a]:transition-colors">
        <p>
          This Privacy Policy explains how Countertop World LLC ("Countertop
          World," "we," "us," or "our") collects, uses, and shares information
          when you visit our website, contact us, or use our services. By using
          our website or providing us your information, you agree to the
          practices described here.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect information you give us directly and information collected
          automatically:
        </p>
        <ul>
          <li>
            <strong>Information you provide:</strong> your name, mobile phone
            number, email address, company name, and the project details you
            submit through a form, by phone, or in person.
          </li>
          <li>
            <strong>Information collected automatically:</strong> basic device
            and usage data, plus marketing attribution such as referral source,
            UTM parameters, and ad click identifiers (for example Google's
            GCLID), which help us understand how visitors find us.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>Respond to your inquiries and provide estimates and quotes.</li>
          <li>
            Schedule and confirm showroom visits, appointments, and
            installations.
          </li>
          <li>Send order, project, and service updates.</li>
          <li>Provide customer support and follow-up.</li>
          <li>Operate, measure, and improve our website and marketing.</li>
        </ul>

        <h2>Text Messaging (SMS) Privacy</h2>
        <p>
          When you provide your mobile number to Countertop World LLC (through a
          form on our website, in person, or by replying to a message) we may
          send you SMS text messages related to your project, appointment,
          quote, or account.
        </p>
        <p>
          <strong>What we collect:</strong> Your name, mobile phone number, and
          the information you submit through our forms (such as project details,
          address, and email).
        </p>
        <p>
          <strong>How we use it:</strong> To send appointment reminders, quote
          and order updates, customer-service replies, and occasional marketing
          messages about our products and services.
        </p>
        <p>
          <strong>Who we share it with:</strong> We do not sell your personal
          information. We share it only with the service providers that help us
          operate (for example, our scheduling and messaging platform), and only
          as needed to deliver these services.
        </p>
        <p>
          SMS consent is not shared with third parties or affiliates. Your
          mobile opt-in and consent to receive text messages will never be
          shared with or sold to any third party or affiliate for their
          marketing purposes.
        </p>
        <p>
          You can opt out of text messages at any time by replying STOP. For
          help, reply HELP or contact us at{" "}
          <a href="mailto:contact@countertopworldar.com">
            contact@countertopworldar.com
          </a>{" "}
          or <a href="tel:+15014818117">501-481-8117</a>.
        </p>

        <h2>Cookies &amp; Analytics</h2>
        <p>
          We use cookies and similar technologies to operate the site, remember
          your preferences, and measure performance. We also use analytics and
          advertising tools (such as Google and Meta) to understand site usage
          and the effectiveness of our marketing. You can control cookies
          through your browser settings.
        </p>

        <h2>How We Share Information</h2>
        <p>
          We share information only with service providers that help us run our
          business, such as our CRM, scheduling, hosting, analytics, and SMS
          providers, and only as needed to deliver the services you've
          requested. We may also disclose information when required by law or to
          protect our rights. As stated above,{" "}
          <strong>
            we do not share, sell, or rent your SMS consent or mobile
            information to third parties for their marketing purposes.
          </strong>
        </p>

        <h2>Your Choices &amp; Rights</h2>
        <ul>
          <li>
            Reply STOP to any text message to opt out of SMS at any time, or
            HELP for assistance.
          </li>
          <li>
            Unsubscribe from marketing emails using the link in any email.
          </li>
          <li>
            Request access to, correction of, or deletion of your information by
            contacting us.
          </li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We use reasonable administrative, technical, and physical safeguards
          to protect your information. No method of transmission or storage is
          completely secure, so we cannot guarantee absolute security.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our website and services are intended for adults. We do not knowingly
          collect personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we
          will revise the "Last updated" date above. Material changes will be
          reflected on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about this policy or your information? Contact Countertop
          World LLC at{" "}
          <a href="mailto:contact@countertopworldar.com">
            contact@countertopworldar.com
          </a>
          , or call our Bryant showroom at{" "}
          <a href="tel:+15014818117">(501) 481-8117</a> or our Rogers showroom
          at <a href="tel:+14799009119">(479) 900-9119</a>.
        </p>
      </main>
    </LegalPageLayout>
  );
}
