import { useCallback, useRef, useState } from "react";
import { SLABS, SURFACES, type Slab, type SurfaceId } from "../data/slabs";

// ─── Stone Visualizer ────────────────────────────────────────────────
// Upload a room photo → tap a surface → pick a stone → lead gate →
// AI render, texted to the customer. Zero typing about the design.

type Step = "upload" | "surface" | "stone" | "generate" | "reveal";

interface Captured { b64: string; w: number; h: number; preview: string }

async function fileToCaptured(file: File, maxPx = 1600): Promise<Captured> {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxPx / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  c.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
  const dataUrl = c.toDataURL("image/jpeg", 0.88);
  return { b64: dataUrl.split(",")[1], w, h, preview: dataUrl };
}

async function watermark(renderB64: string): Promise<string> {
  const img = new Image();
  img.src = `data:image/jpeg;base64,${renderB64}`;
  await img.decode();
  const c = document.createElement("canvas");
  c.width = img.width; c.height = img.height;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const pad = Math.round(img.width * 0.018);
  const size = Math.max(18, Math.round(img.width * 0.02));
  ctx.font = `600 ${size}px Inter, system-ui, sans-serif`;
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  const text = "COUNTERTOP WORLD  ·  countertopworld.com";
  ctx.fillStyle = "rgba(13,13,13,0.55)";
  const tw = ctx.measureText(text).width;
  ctx.fillRect(img.width - tw - pad * 2.2, img.height - size - pad * 2, tw + pad * 1.6, size + pad * 1.2);
  ctx.fillStyle = "#C9A96E";
  ctx.fillText(text, img.width - pad * 1.4, img.height - pad * 1.4);
  return c.toDataURL("image/jpeg", 0.92).split(",")[1];
}

const stepIndex: Record<Step, number> = { upload: 0, surface: 1, stone: 2, generate: 3, reveal: 4 };

export default function Visualizer() {
  const [step, setStep] = useState<Step>("upload");
  const [room, setRoom] = useState<Captured | null>(null);
  const [surface, setSurface] = useState<SurfaceId | null>(null);
  const [slab, setSlab] = useState<Slab | null>(null);
  const [customStone, setCustomStone] = useState<Captured | null>(null);
  const [render, setRender] = useState<{ b64: string; wm: string; predictionId: string } | null>(null);
  const [phase, setPhase] = useState<"idle" | "rendering" | "claiming" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [slider, setSlider] = useState(50);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const roomInput = useRef<HTMLInputElement>(null);
  const stoneInput = useRef<HTMLInputElement>(null);

  const stoneName = slab ? slab.description : "stone from a photo taken at the yard";
  const stoneB64 = customStone ? customStone.b64 : null;

  const startRender = useCallback(async () => {
    if (!room || !surface || (!slab && !customStone)) return;
    setPhase("rendering");
    setErrMsg("");
    try {
      let sb64 = stoneB64;
      if (!sb64 && slab) {
        const resp = await fetch(slab.image);
        const blob = await resp.blob();
        sb64 = (await fileToCaptured(new File([blob], "slab.jpg", { type: "image/jpeg" }), 1200)).b64;
      }
      const r = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_b64: room.b64, stone_b64: sb64, stone_name: stoneName,
          surface, room_w: room.w, room_h: room.h,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "render failed");
      const wm = await watermark(j.render_b64);
      setRender({ b64: j.render_b64, wm, predictionId: j.prediction_id });
      setPhase("idle");
    } catch (e) {
      setPhase("error");
      setErrMsg(String(e instanceof Error ? e.message : e));
    }
  }, [room, surface, slab, customStone, stoneB64, stoneName]);

  const claim = useCallback(async () => {
    if (!render || !firstName || !phone) return;
    setPhase("claiming");
    try {
      const r = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName, phone, email: email || undefined,
          surface, stone_name: slab?.name || "custom stone",
          render_b64: render.wm, prediction_id: render.predictionId,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "something went wrong");
      setImageUrl(j.image_url || null);
      setPhase("idle");
      setStep("reveal");
    } catch (e) {
      setPhase("error");
      setErrMsg(String(e instanceof Error ? e.message : e));
    }
  }, [render, firstName, phone, email, surface, slab]);

  return (
    <div className="min-h-screen bg-obsidian text-vein-white">
      <div className="max-w-3xl mx-auto px-5 py-10 md:py-16">
        <p className="text-stone-gold tracking-[0.25em] text-xs uppercase mb-3">Countertop World</p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-2">See it in your home.</h1>
        <p className="text-cool-gray mb-8 md:mb-12">Snap a photo, pick a stone, see your remodel — free, in about 30 seconds.</p>

        {/* progress */}
        <div className="flex gap-1.5 mb-10">
          {(["upload", "surface", "stone", "generate", "reveal"] as Step[]).map((s) => (
            <div key={s} className={`h-[3px] flex-1 rounded-full ${stepIndex[step] >= stepIndex[s] ? "bg-stone-gold" : "bg-elevated"}`} />
          ))}
        </div>

        {step === "upload" && (
          <section>
            <h2 className="text-xl font-medium mb-4">Your space</h2>
            <button
              onClick={() => roomInput.current?.click()}
              className="w-full aspect-[3/2] rounded-[12px] border border-dashed border-stone-gold/35 bg-granite hover:bg-elevated transition-colors flex flex-col items-center justify-center gap-3"
            >
              <span className="text-stone-gold text-4xl leading-none">+</span>
              <span className="text-cool-gray text-sm">Take a photo or choose from your library</span>
            </button>
            <input ref={roomInput} type="file" accept="image/*" className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) { setRoom(await fileToCaptured(f)); setStep("surface"); }
              }} />
          </section>
        )}

        {step === "surface" && room && (
          <section>
            <div className="rounded-[12px] overflow-hidden border border-stone-gold/10 mb-6">
              <img src={room.preview} alt="Your space" className="w-full" />
            </div>
            <h2 className="text-xl font-medium mb-4">What are we transforming?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SURFACES.map((s) => (
                <button key={s.id}
                  onClick={() => { setSurface(s.id); setStep("stone"); }}
                  className="rounded-[12px] bg-granite border border-stone-gold/10 hover:border-stone-gold/35 p-5 text-left transition-colors">
                  <span className="block font-medium">{s.label}</span>
                  <span className="block text-cool-gray text-xs mt-1">{s.hint}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === "stone" && (
          <section>
            <h2 className="text-xl font-medium mb-4">Pick your stone</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {SLABS.map((s) => (
                <button key={s.id}
                  onClick={() => { setSlab(s); setCustomStone(null); setStep("generate"); }}
                  className="group rounded-[12px] overflow-hidden bg-granite border border-stone-gold/10 hover:border-stone-gold/40 text-left transition-colors">
                  <div className="aspect-square overflow-hidden">
                    <img src={s.image} alt={s.name} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                  </div>
                  <span className="block px-3 py-2.5 text-sm">{s.name}</span>
                </button>
              ))}
            </div>
            <button onClick={() => stoneInput.current?.click()}
              className="w-full rounded-[12px] border border-dashed border-stone-gold/35 bg-granite hover:bg-elevated transition-colors py-4 text-sm text-cool-gray">
              Saw one you loved at the yard? Upload your photo of it
            </button>
            <input ref={stoneInput} type="file" accept="image/*" className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) { setCustomStone(await fileToCaptured(f, 1200)); setSlab(null); setStep("generate"); }
              }} />
          </section>
        )}

        {step === "generate" && (
          <section>
            {phase !== "rendering" && !render && (
              <div className="text-center py-6">
                <p className="text-cool-gray mb-6">
                  {slab ? slab.name : "Your stone"} · {SURFACES.find((s) => s.id === surface)?.label}
                </p>
                <button onClick={startRender}
                  className="bg-stone-gold text-obsidian font-semibold rounded-full px-10 py-4 hover:bg-stone-gold/90 transition-colors">
                  Generate my remodel
                </button>
              </div>
            )}

            {(phase === "rendering" || render) && (
              <div>
                {phase === "rendering" && (
                  <div className="flex items-center gap-3 mb-8 text-cool-gray text-sm">
                    <span className="inline-block w-2 h-2 rounded-full bg-stone-gold animate-pulse" />
                    Cutting your stone… about 30 seconds
                  </div>
                )}
                {render && <p className="text-stone-gold text-sm mb-6">Your remodel is ready.</p>}
                <div className="rounded-[12px] bg-granite border border-stone-gold/20 p-6 md:p-8">
                  <h3 className="text-lg font-medium mb-1">See your new space — free</h3>
                  <p className="text-cool-gray text-sm mb-6">We'll text your image to your phone so it's yours to keep.</p>
                  <div className="space-y-3">
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name"
                      className="w-full rounded-[8px] bg-obsidian border border-stone-gold/20 focus:border-stone-gold outline-none px-4 py-3 text-vein-white placeholder:text-cool-gray/60" />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile number" type="tel"
                      className="w-full rounded-[8px] bg-obsidian border border-stone-gold/20 focus:border-stone-gold outline-none px-4 py-3 text-vein-white placeholder:text-cool-gray/60" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" type="email"
                      className="w-full rounded-[8px] bg-obsidian border border-stone-gold/20 focus:border-stone-gold outline-none px-4 py-3 text-vein-white placeholder:text-cool-gray/60" />
                    <button onClick={claim} disabled={!render || !firstName || !phone || phase === "claiming"}
                      className="w-full bg-stone-gold text-obsidian font-semibold rounded-[8px] py-3.5 disabled:opacity-40 hover:bg-stone-gold/90 transition-all">
                      {phase === "claiming" ? "Unlocking…" : render ? "Show me my remodel" : "Waiting on your render…"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {phase === "error" && (
              <div className="mt-6 rounded-[8px] border border-red-400/30 bg-red-400/5 p-4 text-sm">
                <p className="mb-2">That didn't work: {errMsg}</p>
                <button onClick={render ? claim : startRender} className="text-stone-gold underline">Try again</button>
              </div>
            )}
          </section>
        )}

        {step === "reveal" && render && room && (
          <section>
            <h2 className="text-xl font-medium mb-4">Before &amp; after</h2>
            <div className="relative rounded-[12px] overflow-hidden border border-stone-gold/20 select-none">
              <img src={`data:image/jpeg;base64,${render.wm}`} alt="After" className="w-full block" />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${slider}%` }}>
                <img src={room.preview} alt="Before" className="w-full block h-full object-cover" style={{ width: `${10000 / slider}%`, maxWidth: "none" }} />
              </div>
              <div className="absolute top-0 bottom-0 w-[2px] bg-stone-gold" style={{ left: `${slider}%` }} />
            </div>
            <input type="range" min={2} max={98} value={slider} onChange={(e) => setSlider(Number(e.target.value))}
              className="w-full mt-4 accent-[#C9A96E]" />
            <p className="text-cool-gray/70 text-xs mt-2">AI visualization — actual slab may vary.</p>
            <div className="flex flex-col md:flex-row gap-3 mt-6">
              <a href={`data:image/jpeg;base64,${render.wm}`} download="my-remodel-countertop-world.jpg"
                className="flex-1 text-center rounded-full border border-stone-gold/40 text-stone-gold py-3.5 hover:bg-stone-gold/10 transition-colors">
                Download
              </a>
              <a href="/book" className="flex-1 text-center rounded-full bg-stone-gold text-obsidian font-semibold py-3.5 hover:bg-stone-gold/90 transition-colors">
                Start my quote
              </a>
            </div>
            {imageUrl && <p className="text-cool-gray text-sm mt-4">We also texted it to your phone.</p>}
          </section>
        )}
      </div>
    </div>
  );
}
