declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function trackLead(data?: { eventId?: string; value?: number; currency?: string }) {
  if (typeof window === 'undefined') return;

  if (window.fbq) {
    // eventID lets Meta dedupe this browser Pixel Lead against the server-side
    // CAPI Lead fired from /api/lead with the same event_id.
    window.fbq('track', 'Lead', {}, data?.eventId ? { eventID: data.eventId } : undefined);
  }

  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      value: data?.value ?? 0,
      currency: data?.currency ?? 'USD',
    });
  }
}

// Fired when a booking is actually COMPLETED in the GHL calendar widget on
// /book (detected via the widget's `set-sticky-contacts` postMessage, which it
// sends to the parent page only from its submission-success handler).
//
// Lead is the primary signal — the Meta retail ads optimize to the pixel LEAD
// event. Schedule is kept as a secondary breadcrumb, now fired at the honest
// moment (booking completed, not page load), so the legacy ad set optimizing
// to SCHEDULE also starts receiving real signal until it is migrated to LEAD.
export function trackBookingComplete() {
  if (typeof window === 'undefined') return;

  if (window.fbq) {
    window.fbq('track', 'Lead');
    window.fbq('track', 'Schedule');
  }

  if (window.gtag) {
    window.gtag('event', 'generate_lead', { value: 0, currency: 'USD' });
    window.gtag('event', 'conversion', {
      send_to: 'AW-6873435929/booking',
    });
  }
}

export function trackViewContent(contentName?: string) {
  if (typeof window === 'undefined') return;

  if (window.fbq) {
    window.fbq('track', 'ViewContent', contentName ? { content_name: contentName } : undefined);
  }

  if (window.gtag) {
    window.gtag('event', 'view_item', contentName ? { item_name: contentName } : undefined);
  }
}
