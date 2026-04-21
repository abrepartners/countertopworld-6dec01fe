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

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  clientType?: string;
  preferredLocation?: string;
  scope?: string;
  details?: string;
};

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
  if (!s) return { firstName: "Website Lead", lastName: undefined as string | undefined };
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
  else if (loc.includes("bryant") || loc.includes("little rock") || loc.includes("central")) {
    out.add("bryant-central-ar");
  }
  const ct = (p.clientType ?? "").toLowerCase();
  if (ct.includes("builder") || ct.includes("contractor")) out.add("builder");
  else if (ct.includes("designer") || ct.includes("architect")) out.add("designer");
  else out.add("retail");
  return [...out];
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return bad(405, "method not allowed");

  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) return bad(500, "server missing GHL_TOKEN or GHL_LOCATION_ID");

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
  const tags = tags_for(body);

  // Accumulate non-structured answers into the contact's notes field so they
  // surface alongside the contact in GHL's UI.
  const noteLines: string[] = [];
  if (body.clientType) noteLines.push(`Client type: ${body.clientType}`);
  if (body.preferredLocation) noteLines.push(`Preferred showroom: ${body.preferredLocation}`);
  if (body.scope) noteLines.push(`Project scope: ${body.scope}`);
  if (body.details) noteLines.push(`Details: ${body.details}`);

  const contactPayload: Record<string, unknown> = {
    locationId,
    firstName,
    source: "countertopworldar.com",
    tags,
  };
  if (lastName) contactPayload.lastName = lastName;
  if (body.email) contactPayload.email = body.email;
  if (body.phone) contactPayload.phone = body.phone;

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
      return ok({ ok: true, duplicate: true });
    }
    return bad(resp.status, `GHL error: ${text.slice(0, 300)}`);
  }

  // Best-effort note attach (don't fail the whole submission if this errors).
  if (noteLines.length) {
    try {
      const json = JSON.parse(text);
      const contactId = json?.contact?.id;
      if (contactId) {
        await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Version: GHL_VERSION,
          },
          body: JSON.stringify({ body: noteLines.join("\n") }),
        });
      }
    } catch {
      /* swallow — contact is created; note is bonus */
    }
  }

  return ok({ ok: true });
}
