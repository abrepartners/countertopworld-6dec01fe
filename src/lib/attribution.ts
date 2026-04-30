// First-touch marketing attribution capture.
// Runs once on initial site load, persists to sessionStorage for the session.
// GHL calendar iframes read the stored params and append them to the booking URL,
// which GHL captures as contact custom fields — powering Google Ads offline conversion
// import (via GCLID) and campaign attribution reporting.

const STORAGE_KEY = 'cw_attribution_v1';

const CAPTURED_PARAMS = [
  // Google / Meta / platform click IDs
  'gclid',       // Google Ads click ID — required for offline conversions
  'gbraid',      // Google iOS 14+ fallback
  'wbraid',      // Google Android fallback
  'fbclid',      // Meta / Facebook click ID
  'ttclid',      // TikTok click ID
  'msclkid',     // Microsoft / Bing click ID
  'li_fat_id',   // LinkedIn click ID
  // UTM standard
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

type Attribution = Partial<Record<(typeof CAPTURED_PARAMS)[number] | 'first_ref' | 'first_ts', string>>;

function safeParse(raw: string | null): Attribution {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Attribution;
  } catch {
    return {};
  }
}

/**
 * Capture first-touch attribution from URL + referrer. Idempotent — only writes
 * if storage is empty (preserves original source on subsequent page loads).
 * Run this at the top of main.tsx.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = safeParse(sessionStorage.getItem(STORAGE_KEY));
    if (existing.first_ts) return; // already captured this session

    const params = new URLSearchParams(window.location.search);
    const captured: Attribution = {};

    for (const key of CAPTURED_PARAMS) {
      const val = params.get(key);
      if (val) captured[key] = val;
    }

    // Record referrer if it's from a different origin
    const ref = document.referrer;
    if (ref) {
      try {
        const refHost = new URL(ref).host;
        if (refHost && refHost !== window.location.host) {
          captured.first_ref = refHost;
        }
      } catch {
        // malformed referrer, ignore
      }
    }

    captured.first_ts = new Date().toISOString();

    // Only persist if we actually captured something useful (any param OR a referrer)
    const hasPayload = Object.keys(captured).some((k) => k !== 'first_ts');
    if (hasPayload) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    }
  } catch {
    // storage might be blocked (incognito + strict mode); fail silently
  }
}

/**
 * Read stored attribution for forwarding to iframes / form posts.
 */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    return safeParse(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return {};
  }
}

/**
 * Build a URL query string from stored attribution, ready to append to a URL.
 * Returns empty string if no attribution captured.
 * Example output: "gclid=abc123&utm_source=google&utm_medium=cpc"
 */
export function attributionToQueryString(): string {
  const attr = getAttribution();
  const parts: string[] = [];
  for (const [key, val] of Object.entries(attr)) {
    if (key === 'first_ts' || key === 'first_ref') continue; // internal-only
    if (val) parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
  }
  return parts.join('&');
}

/**
 * Append stored attribution params to a target URL. Preserves any existing query.
 */
export function appendAttributionToUrl(url: string): string {
  const qs = attributionToQueryString();
  if (!qs) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}${qs}`;
}
