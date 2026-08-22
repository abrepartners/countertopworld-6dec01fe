// Stone Visualizer — render endpoint.
// Takes a room photo + stone reference (base64), runs the validated
// nano-banana-pro material swap on Replicate, returns the render URL.
//
// Env (Vercel): REPLICATE_API_TOKEN
//
// The pipeline settings here are locked decisions validated 2026-08-22
// (see STONE-SWAP-SYSTEM.md in the ops folder):
//  - aspect_ratio computed explicitly; "match_input_image" crops photos wrong
//  - stone described in words improves fidelity; description comes from the slab library

const REPLICATE = "https://api.replicate.com/v1";
const MODEL = "google/nano-banana-pro";

const SURFACE_PHRASES: Record<string, string> = {
  countertop: "kitchen countertops (all counter surfaces, including any island)",
  island: "kitchen island countertop only, leaving all other counters unchanged",
  vanity: "bathroom vanity countertop (including its backsplash lip if present)",
  backsplash: "backsplash wall area between the countertops and the upper cabinets",
  shower: "shower walls",
  fireplace: "fireplace surround",
};

const RATIOS: Record<string, number> = {
  "1:1": 1, "2:3": 2 / 3, "3:2": 1.5, "3:4": 0.75, "4:3": 4 / 3,
  "4:5": 0.8, "5:4": 1.25, "9:16": 9 / 16, "16:9": 16 / 9, "21:9": 21 / 9,
};

function nearestRatio(w: number, h: number): string {
  const r = w / h;
  return Object.keys(RATIOS).reduce((best, k) =>
    Math.abs(RATIOS[k] - r) < Math.abs(RATIOS[best] - r) ? k : best, "3:2");
}

async function uploadToReplicate(b64: string, token: string): Promise<string> {
  const bytes = Buffer.from(b64, "base64");
  const form = new FormData();
  form.append("content", new Blob([bytes], { type: "image/jpeg" }), "input.jpg");
  const r = await fetch(`${REPLICATE}/files`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!r.ok) throw new Error(`file upload failed: ${r.status}`);
  const j = await r.json();
  return j.urls.get;
}

export async function POST(req: Request): Promise<Response> {
  if (req.method !== "POST")
    return new Response(JSON.stringify({ error: "POST only" }), { status: 405 });

  const token = process.env.REPLICATE_API_TOKEN;
  if (!token)
    return new Response(JSON.stringify({ error: "server missing REPLICATE_API_TOKEN" }), { status: 500 });

  let body: {
    room_b64: string; stone_b64: string; stone_name: string;
    surface: string; room_w: number; room_h: number;
  };
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: "bad json" }), { status: 400 });
  }

  const surface = SURFACE_PHRASES[body.surface];
  if (!surface || !body.room_b64 || !body.stone_b64)
    return new Response(JSON.stringify({ error: "missing fields" }), { status: 400 });

  try {
    const [roomUrl, stoneUrl] = await Promise.all([
      uploadToReplicate(body.room_b64, token),
      uploadToReplicate(body.stone_b64, token),
    ]);

    const prompt =
      `Replace the ${surface} in the first image with the ${body.stone_name || "stone material"} ` +
      `shown in the second image. Keep the exact same camera angle, room layout, cabinets, appliances, ` +
      `fixtures, lighting, reflections, and every other detail completely unchanged. The new material ` +
      `must follow the surface's perspective and scale realistically, with a natural polished finish.`;

    const create = await fetch(`${REPLICATE}/models/${MODEL}/predictions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: "wait=60",
      },
      body: JSON.stringify({
        input: {
          prompt,
          image_input: [roomUrl, stoneUrl],
          aspect_ratio: nearestRatio(body.room_w || 3, body.room_h || 2),
          output_format: "jpg",
          resolution: "2K",
        },
      }),
    });
    let pred = await create.json();

    // Poll if the sync window elapsed before completion.
    let tries = 0;
    while (!["succeeded", "failed", "canceled"].includes(pred.status) && tries < 40) {
      await new Promise((r) => setTimeout(r, 3000));
      pred = await (await fetch(`${REPLICATE}/predictions/${pred.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })).json();
      tries++;
    }
    if (pred.status !== "succeeded")
      return new Response(JSON.stringify({ error: pred.error || "render failed" }), { status: 502 });

    const out = Array.isArray(pred.output) ? pred.output[0] : pred.output;

    // Fetch the image server-side and hand bytes to the client — replicate
    // delivery URLs expire, and the client needs pixels for watermarking anyway.
    const img = await fetch(out, { headers: { Authorization: `Bearer ${token}` } });
    const buf = Buffer.from(await img.arrayBuffer());
    return new Response(JSON.stringify({
      render_b64: buf.toString("base64"),
      prediction_id: pred.id,
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 502 });
  }
}
