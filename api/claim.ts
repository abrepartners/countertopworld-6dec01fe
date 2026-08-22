// Stone Visualizer — lead claim endpoint.
// Called when the customer submits name + phone to reveal their render.
// Creates the GHL contact (same rails as api/lead.ts), tags it for the
// visualizer pipeline, and texts the watermarked render to their phone.
// SMS delivery doubles as phone verification: a fake number gets nothing.
//
// Env (already configured in Vercel for api/lead.ts): GHL_TOKEN, GHL_LOCATION_ID
// Optional: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (hosts the image for SMS;
// without them the lead is still created, SMS is skipped gracefully).

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

function bad(status: number, error: string) {
  return new Response(JSON.stringify({ error }), { status, headers: { "Content-Type": "application/json" } });
}

async function hostImage(b64: string, id: string): Promise<string | null> {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const path = `renders/${id}.jpg`;
  const r = await fetch(`${url}/storage/v1/object/visualizer/${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "image/jpeg", "x-upsert": "true" },
    body: Buffer.from(b64, "base64"),
  });
  if (!r.ok) return null;
  return `${url}/storage/v1/object/public/visualizer/${path}`;
}

export async function POST(req: Request): Promise<Response> {
  if (req.method !== "POST") return bad(405, "POST only");
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) return bad(500, "server missing GHL_TOKEN or GHL_LOCATION_ID");

  let body: {
    first_name: string; phone: string; email?: string;
    surface: string; stone_name: string; render_b64: string; prediction_id: string;
  };
  try { body = await req.json(); } catch { return bad(400, "bad json"); }
  if (!body.first_name || !body.phone || !body.render_b64) return bad(400, "missing fields");

  const ghl = {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
  };

  try {
    // 1. Upsert contact with visualizer tags — lands in the same CW pipeline
    //    as website leads, filterable by tag.
    const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: "POST",
      headers: ghl,
      body: JSON.stringify({
        locationId,
        firstName: body.first_name,
        phone: body.phone,
        email: body.email || undefined,
        tags: ["visualizer", `viz-${body.surface}`, `viz-stone-${body.stone_name}`],
        source: "Stone Visualizer",
      }),
    });
    // A CRM failure must never block the customer's reveal — the render is
    // the product moment. Log it loudly; the lead payload is in the request
    // logs for manual recovery, and the GHL token issue surfaces in monitoring.
    let contact: { id: string } | null = null;
    if (contactRes.ok) {
      contact = (await contactRes.json()).contact;
    } else {
      console.error("GHL contact upsert failed:", contactRes.status, await contactRes.text().catch(() => ""),
        "lead:", JSON.stringify({ name: body.first_name, phone: body.phone, email: body.email, surface: body.surface, stone: body.stone_name }));
    }

    // 2. Host the watermarked image so SMS can carry it.
    const imageUrl = await hostImage(body.render_b64, body.prediction_id || `${Date.now()}`);

    // 3. Text the render. Failure here doesn't lose the lead — contact exists.
    let smsSent = false;
    if (imageUrl && contact) {
      const sms = await fetch(`${GHL_BASE}/conversations/messages`, {
        method: "POST",
        headers: ghl,
        body: JSON.stringify({
          type: "SMS",
          contactId: contact.id,
          message:
            `${body.first_name}, here's your space with ${body.stone_name} — from Countertop World. ` +
            `Ready to make it real? Reply here or call us. ${imageUrl}`,
        }),
      });
      smsSent = sms.ok;
    }

    return new Response(JSON.stringify({ ok: true, sms_sent: smsSent, lead_synced: !!contact, image_url: imageUrl }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return bad(502, String(e));
  }
}
