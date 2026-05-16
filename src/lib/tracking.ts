declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function trackLead(data?: { value?: number; currency?: string }) {
  if (typeof window === 'undefined') return;

  if (window.fbq) {
    window.fbq('track', 'Lead');
  }

  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      value: data?.value ?? 0,
      currency: data?.currency ?? 'USD',
    });
  }
}

export function trackBooking() {
  if (typeof window === 'undefined') return;

  if (window.fbq) {
    window.fbq('track', 'Schedule');
  }

  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-6873435929/booking',
    });
  }
}
