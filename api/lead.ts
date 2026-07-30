// Vercel serverless function: /api/lead
//
// Takes the contact form submission from the CW website and creates a
// tagged contact in GoHighLevel. From there, the Retail pipeline picks
// them up and the Moraware↔GHL bridge sees them on the next cycle.
//
// Env vars (set in Vercel project settings):
//   GHL_TOKEN          — CW's Private Integration Token (starts with "pit-")
//   GHL_LOCATION_ID    — CW's GHL sub-account ID

export const config = { runtime: "edge" };

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

// Trade leads (builders + designers) get an opportunity created directly in the
// Builder/Developer (B2B) pipeline at the "Application Submitted" stage, so they
// land in the pipeline the moment they submit — no GHL workflow dependency.
// Retail leads are intentionally left to their existing routing.
const B2B_PIPELINE_ID = "qAut5nAhTBoUgssaG9Oa";
const B2B_APPLICATION_STAGE_ID = "2ab67d94-219f-40e6-92f6-d5d928b56f21";

// Meta Conversions API (server-side Pixel). The pixel ID defaults to the CW
// pixel; the access token is read from env and the whole thing no-ops without
// it, so this ships dormant until META_CAPI_TOKEN is set in Vercel.
const META_PIXEL_ID = process.env.META_PIXEL_ID || "792842851522941";
const META_API_VERSION = "v21.0";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  clientType?: string;
  preferredLocation?: string;
  scope?: string;
  details?: string;
  // City landing page the lead came from (set by CityPageLayout forms).
  source_city?: string;
  // Marketing attribution — forwarded from the website's attribution capture.
  // These feed GHL's native Google Ads integration for offline conversions.
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  ttclid?: string;
  msclkid?: string;
  li_fat_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_path?: string;
  // Meta test_event_code — when present, routes the CAPI event to the Test
  // Events tab tagged as a test (not counted as a real conversion). Used only
  // by the lead-pipeline smoke test; real leads never send this.
  test_event_code?: string;
};

const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
  "li_fat_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "landing_path",
] as const;

function bad(status: number, error: string) {
  return new Response(JSON.stringify({ ok: false, error }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function ok(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Split a "First Last" string safely.
function split_name(full: string | undefined) {
  const s = (full ?? "").trim();
  if (!s)
    return {
      firstName: "Website Lead",
      lastName: undefined as string | undefined,
    };
  const parts = s.split(/\s+/);
  return {
    firstName: parts[0]!,
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : undefined,
  };
}

// Derive tags from the form selections so GHL routing + the review workflow
// target the right pipeline / location.
function tags_for(p: LeadPayload): string[] {
  const out = new Set<string>(["source:website"]);
  const loc = (p.preferredLocation ?? "").toLowerCase();
  if (loc.includes("roger") || loc.includes("nwa")) out.add("rogers-nwa");
  else if (
    loc.includes("bryant") ||
    loc.includes("little rock") ||
    loc.includes("central")
  ) {
    out.add("bryant-central-ar");
  }
  const ct = (p.clientType ?? "").toLowerCase();
  if (ct.includes("builder") || ct.includes("contractor")) out.add("builder");
  else if (ct.includes("designer") || ct.includes("architect"))
    out.add("designer");
  else out.add("retail");

  // Attribution-derived tags — makes it easy to filter GHL contact lists by paid
  // source for Customer Match audience sync + reporting.
  if (p.gclid || p.gbraid || p.wbraid) out.add("source:google-ads");
  if (p.fbclid) out.add("source:meta-ads");
  if (p.ttclid) out.add("source:tiktok-ads");
  if (p.msclkid) out.add("source:bing-ads");
  if (p.utm_source) out.add(`utm:${p.utm_source.toLowerCase()}`);
  if (p.utm_campaign) out.add(`campaign:${p.utm_campaign.toLowerCase()}`);
  // City landing page — lets GHL contact lists filter leads by service area.
  if (p.source_city) out.add(`city:${p.source_city.toLowerCase()}`);

  return [...out];
}

// SHA-256 hex digest — Meta requires email/phone hashed before they leave the
// server. crypto.subtle is available in the Vercel edge runtime.
async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Normalize to digits with a country code (CW is US) for Meta phone hashing.
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 10 ? "1" + digits : digits;
}

function getCookie(
  cookieHeader: string | null,
  name: string,
): string | undefined {
  if (!cookieHeader) return undefined;
  const m = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]!) : undefined;
}

// Best-effort server-side Meta Conversions API "Lead". Firing this from the
// server means every lead is captured regardless of browser tag timing or ad
// blockers (the old client-only Pixel "rarely fired" the Lead event). The
// client Pixel sends the SAME event_id so Meta dedupes the pair. No-op without
// META_CAPI_TOKEN, and never throws — the lead submission must not depend on it.
async function fireMetaLead(
  req: Request,
  body: LeadPayload,
  eventId: string,
): Promise<void> {
  const capiToken = process.env.META_CAPI_TOKEN;
  if (!capiToken) return; // dormant until the token is added in Vercel
  try {
    const cookieHeader = req.headers.get("cookie");
    const nowMs = Date.now();
    const user_data: Record<string, unknown> = {};
    if (body.email)
      user_data.em = [await sha256Hex(body.email.trim().toLowerCase())];
    if (body.phone)
      user_data.ph = [await sha256Hex(normalizePhone(body.phone))];
    const fbp = getCookie(cookieHeader, "_fbp");
    if (fbp) user_data.fbp = fbp;
    const fbc =
      getCookie(cookieHeader, "_fbc") ||
      (body.fbclid ? `fb.1.${nowMs}.${body.fbclid}` : undefined);
    if (fbc) user_data.fbc = fbc;
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (ip) user_data.client_ip_address = ip;
    const ua = req.headers.get("user-agent");
    if (ua) user_data.client_user_agent = ua;
    const sourceUrl =
      req.headers.get("referer") ||
      `https://countertopworldar.com${body.landing_path || "/"}`;

    await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${capiToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: "Lead",
              event_time: Math.floor(nowMs / 1000),
              event_id: eventId,
              action_source: "website",
              event_source_url: sourceUrl,
              user_data,
            },
          ],
          // Only set when the smoke test passes it — tags the event as a test
          // in Meta's Test Events tool so it isn't counted as a real conversion.
          ...(body.test_event_code
            ? { test_event_code: body.test_event_code }
            : {}),
        }),
      },
    );
  } catch {
    /* swallow — CAPI is best-effort, never blocks the lead */
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return bad(405, "method not allowed");

  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId)
    return bad(500, "server missing GHL_TOKEN or GHL_LOCATION_ID");

  let body: LeadPayload;
  try {
    // Accept JSON or FormData transparently — the form posts as FormData today
    // but we may switch to JSON from other surfaces later.
    const ct = req.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      body = (await req.json()) as LeadPayload;
    } else {
      const fd = await req.formData();
      body = Object.fromEntries(fd.entries()) as LeadPayload;
    }
  } catch {
    return bad(400, "invalid request body");
  }

  const { firstName, lastName } = split_name(body.name);
  // Shared id for client Pixel <-> server CAPI dedupe; returned to the client.
  const eventId = crypto.randomUUID();
  const tags = tags_for(body);

  // Accumulate non-structured answers into the contact's notes field so they
  // surface alongside the contact in GHL's UI.
  const noteLines: string[] = [];
  if (body.clientType) noteLines.push(`Client type: ${body.clientType}`);
  if (body.preferredLocation)
    noteLines.push(`Preferred showroom: ${body.preferredLocation}`);
  if (body.source_city) noteLines.push(`Source city: ${body.source_city}`);
  if (body.scope) noteLines.push(`Project scope: ${body.scope}`);
  if (body.details) noteLines.push(`Details: ${body.details}`);

  // Attribution section in notes — always human-readable, never lost even if
  // a custom field mapping drifts.
  const attrLines: string[] = [];
  for (const key of ATTRIBUTION_KEYS) {
    const val = body[key];
    if (val) attrLines.push(`  ${key}: ${val}`);
  }
  if (attrLines.length) {
    noteLines.push("");
    noteLines.push("— Marketing attribution —");
    noteLines.push(...attrLines);
  }

  // customFields payload uses GHL's field-key format. If fields with these keys
  // exist in the CW location (gclid, utm_source, etc.), GHL auto-maps them;
  // if not, this array is silently ignored and the attribution still lives in
  // notes + tags above. One-time setup: GHL → Settings → Custom Fields → create
  // each as text type (see tracking-setup.md Phase 5).
  const customFields: Array<{ key: string; field_value: string }> = [];
  for (const key of ATTRIBUTION_KEYS) {
    const val = body[key];
    if (val) customFields.push({ key, field_value: val });
  }

  const contactPayload: Record<string, unknown> = {
    locationId,
    firstName,
    source: "countertopworldar.com",
    tags,
  };
  if (lastName) contactPayload.lastName = lastName;
  if (body.email) contactPayload.email = body.email;
  if (body.phone) contactPayload.phone = body.phone;
  if (customFields.length) contactPayload.customFields = customFields;

  const resp = await fetch(`${GHL_BASE}/contacts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      Version: GHL_VERSION,
    },
    body: JSON.stringify(contactPayload),
  });

  const text = await resp.text();
  if (!resp.ok) {
    // GHL returns 400 for duplicates — not an error the user should see. Treat
    // as success so the form UX moves forward, but log the condition.
    if (resp.status === 400 && text.toLowerCase().includes("duplicate")) {
      await fireMetaLead(req, body, eventId);
      return ok({ ok: true, duplicate: true, event_id: eventId });
    }
    return bad(resp.status, `GHL error: ${text.slice(0, 300)}`);
  }

  // Pull the new contact's id once for the downstream best-effort calls.
  let contactId: string | undefined;
  try {
    contactId = JSON.parse(text)?.contact?.id;
  } catch {
    /* contact created but body unparseable — skip the bonus calls below */
  }

  // Best-effort note attach (don't fail the whole submission if this errors).
  if (contactId && noteLines.length) {
    try {
      await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Version: GHL_VERSION,
        },
        body: JSON.stringify({ body: noteLines.join("\n") }),
      });
    } catch {
      /* swallow — contact is created; note is bonus */
    }
  }

  // Trade routing: builders + designers go straight into the B2B pipeline as an
  // open opportunity at "Application Submitted", the moment they submit. Retail
  // leads are left to their existing routing. Best-effort — never blocks the form.
  const ctLower = (body.clientType ?? "").toLowerCase();
  const isTrade =
    ctLower.includes("builder") ||
    ctLower.includes("contractor") ||
    ctLower.includes("designer") ||
    ctLower.includes("architect");
  if (contactId && isTrade) {
    const oppName =
      [firstName, lastName].filter(Boolean).join(" ") + ` — ${body.clientType}`;
    try {
      await fetch(`${GHL_BASE}/opportunities/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Version: GHL_VERSION,
        },
        body: JSON.stringify({
          pipelineId: B2B_PIPELINE_ID,
          pipelineStageId: B2B_APPLICATION_STAGE_ID,
          locationId,
          contactId,
          name: oppName,
          status: "open",
        }),
      });
    } catch {
      /* swallow — contact + tags exist; opportunity is best-effort */
    }
  }

  await fireMetaLead(req, body, eventId);
  return ok({ ok: true, event_id: eventId });
}
