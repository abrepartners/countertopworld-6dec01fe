import { useCallback, useEffect, useRef, useState } from "react";
import { SLABS, SURFACES, type Slab, type SurfaceId } from "../data/slabs";

// ─── Stone Visualizer ────────────────────────────────────────────────
// Upload a room photo → tap a surface → pick a stone → lead gate →
// AI render, before/after reveal. Mobile-first, every step reversible.
// Typography/spacing follow the CW design system (Cormorant display,
// Inter body, mono eyebrows, rounded-[6px] actions).

type Step = "upload" | "surface" | "stone" | "generate" | "reveal";
const STEP_ORDER: Step[] = ["upload", "surface", "stone", "generate", "reveal"];

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
  ctx.textAlign = "right"; ctx.textBaseline = "bottom";
  const text = "COUNTERTOP WORLD  ·  countertopworldar.com";
  ctx.fillStyle = "rgba(13,13,13,0.55)";
  const tw = ctx.measureText(text).width;
  ctx.fillRect(img.width - tw - pad * 2.2, img.height - size - pad * 2, tw + pad * 1.6, size + pad * 1.2);
  ctx.fillStyle = "#C9A96E";
  ctx.fillText(text, img.width - pad * 1.4, img.height - pad * 1.4);
  return c.toDataURL("image/jpeg", 0.92).split(",")[1];
}

function errText(e: unknown): string {
  if (typeof e === "string") return e;
  if (e instanceof Error) return e.message;
  try { return JSON.stringify(e); } catch { return "something went wrong"; }
}

export default function Visualizer() {
  const [step, setStepRaw] = useState<Step>("upload");
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
  const [smsQueued, setSmsQueued] = useState(false);
  const roomInput = useRef<HTMLInputElement>(null);
  const stoneInput = useRef<HTMLInputElement>(null);
  const renderJob = useRef(0); // discards stale renders after back-navigation

  // ── History-aware step navigation: phone/browser back steps backward
  // through the flow instead of leaving the page.
  const setStep = useCallback((s: Step, push = true) => {
    setStepRaw(s);
    if (push) window.history.pushState({ vizStep: s }, "");
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    window.history.replaceState({ vizStep: "upload" }, "");
    const onPop = (e: PopStateEvent) => {
      const s: Step = e.state?.vizStep && STEP_ORDER.includes(e.state.vizStep) ? e.state.vizStep : "upload";
      renderJob.current++;           // abandon any in-flight render
      setPhase("idle"); setErrMsg("");
      if (s !== "generate") setRender(null);
      setStepRaw(s);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const goBack = useCallback(() => window.history.back(), []);

  const startOver = useCallback(() => {
    renderJob.current++;
    setRoom(null); setSurface(null); setSlab(null); setCustomStone(null);
    setRender(null); setPhase("idle"); setErrMsg(""); setSlider(50); setSmsQueued(false);
    setStep("upload");
  }, [setStep]);

  const stoneName = slab ? slab.description : "stone material from the customer's photo";

  const startRender = useCallback(async () => {
    if (!room || !surface || (!slab && !customStone)) return;
    const job = ++renderJob.current;
    setPhase("rendering"); setErrMsg(""); setRender(null);
    try {
      let sb64 = customStone ? customStone.b64 : null;
      if (!sb64 && slab) {
        const blob = await (await fetch(slab.image)).blob();
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
      if (job !== renderJob.current) return; // user backed out — discard
      if (!r.ok) throw new Error(errText(j.error));
      const wm = await watermark(j.render_b64);
      setRender({ b64: j.render_b64, wm, predictionId: j.prediction_id });
      setPhase("idle");
    } catch (e) {
      if (job !== renderJob.current) return;
      setPhase("error"); setErrMsg(errText(e));
    }
  }, [room, surface, slab, customStone, stoneName]);

  const claim = useCallback(async () => {
    if (!render || !firstName.trim() || !phone.trim() || phase === "claiming") return;
    setPhase("claiming"); setErrMsg("");
    try {
      const r = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(), phone: phone.trim(), email: email.trim() || undefined,
          surface, stone_name: slab?.name || "custom stone",
          render_b64: render.wm, prediction_id: render.predictionId,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(errText(j.error));
      setSmsQueued(!!j.sms_sent);
      setPhase("idle");
      setStep("reveal");
    } catch (e) {
      setPhase("error"); setErrMsg(errText(e));
    }
  }, [render, firstName, phone, email, surface, slab, phase, setStep]);

  const BackLink = ({ label }: { label: string }) => (
    <button onClick={goBack}
      className="inline-flex items-center gap-2 font-mono text-[11px] text-cool-gray hover:text-stone-gold tracking-[3px] uppercase transition-colors duration-300 mb-6">
      <span aria-hidden>←</span> {label}
    </button>
  );

  const eyebrow = "font-mono text-[11px] text-stone-gold tracking-[4px] uppercase";
  const input = "w-full rounded-[6px] bg-obsidian border border-stone-gold/20 focus:border-stone-gold outline-none px-4 py-3.5 font-body text-[15px] text-vein-white placeholder:text-cool-gray/60 transition-colors duration-300";
  const cta = "inline-flex items-center justify-center rounded-[6px] text-[13px] font-medium tracking-wide bg-stone-gold text-obsidian hover:bg-stone-gold-light transition-all duration-500 disabled:opacity-40";

  return (
    <div className="min-h-screen bg-obsidian text-vein-white font-body">
      <div className="max-w-3xl mx-auto px-5 py-10 md:py-16">
        <p className={`${eyebrow} mb-5`}>Countertop World · Visualizer</p>
        <h1 className="font-display text-[clamp(2.2rem,6vw,3.5rem)] font-light tracking-tighter leading-[1.05] mb-3">
          See it in your home.
        </h1>
        <p className="text-cool-gray text-[15px] font-light leading-relaxed mb-8 md:mb-10">
          Snap a photo, pick a stone, see your remodel — free, in about 30 seconds.
        </p>

        <div className="flex gap-1.5 mb-10">
          {STEP_ORDER.map((s) => (
            <div key={s} className={`h-[2px] flex-1 ${STEP_ORDER.indexOf(step) >= STEP_ORDER.indexOf(s) ? "bg-stone-gold" : "bg-elevated"}`} />
          ))}
        </div>

        {step === "upload" && (
          <section>
            <h2 className="font-display text-[26px] font-light tracking-tight mb-5">Your space</h2>
            {room ? (
              <div>
                <div className="rounded-[12px] overflow-hidden border border-stone-gold/15 mb-5">
                  <img src={room.preview} alt="Your space" className="w-full brightness-[0.95]" />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <button onClick={() => setStep("surface")} className={`${cta} flex-1 py-3.5`}>Use this photo</button>
                  <button onClick={() => roomInput.current?.click()}
                    className="flex-1 rounded-[6px] border border-stone-gold/30 text-stone-gold text-[13px] font-medium tracking-wide py-3.5 hover:bg-stone-gold/10 transition-all duration-500">
                    Choose a different photo
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => roomInput.current?.click()}
                className="w-full aspect-[3/2] rounded-[12px] border border-dashed border-stone-gold/35 bg-granite hover:bg-elevated transition-colors duration-500 flex flex-col items-center justify-center gap-4">
                <span className="w-12 h-12 rounded-full bg-stone-gold/10 border border-stone-gold/25 flex items-center justify-center text-stone-gold text-2xl leading-none">+</span>
                <span className="text-cool-gray text-sm font-light">Take a photo or choose from your library</span>
              </button>
            )}
            <input ref={roomInput} type="file" accept="image/*" className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f) { setRoom(await fileToCaptured(f)); setStep("surface"); }
              }} />
          </section>
        )}

        {step === "surface" && room && (
          <section>
            <BackLink label="Photo" />
            <div className="rounded-[12px] overflow-hidden border border-stone-gold/15 mb-6">
              <img src={room.preview} alt="Your space" className="w-full brightness-[0.95]" />
            </div>
            <h2 className="font-display text-[26px] font-light tracking-tight mb-5">What are we transforming?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SURFACES.map((s) => (
                <button key={s.id}
                  onClick={() => { setSurface(s.id); setStep("stone"); }}
                  className={`rounded-[8px] border p-5 text-left transition-all duration-500 ${surface === s.id ? "bg-stone-gold/10 border-stone-gold/50" : "bg-granite border-stone-gold/10 hover:border-stone-gold/35"}`}>
                  <span className="block text-[15px] font-medium">{s.label}</span>
                  <span className="block text-cool-gray text-xs font-light mt-1">{s.hint}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === "stone" && (
          <section>
            <BackLink label="Surface" />
            <h2 className="font-display text-[26px] font-light tracking-tight mb-5">Pick your stone</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {SLABS.map((s) => (
                <button key={s.id}
                  onClick={() => { setSlab(s); setCustomStone(null); setStep("generate"); }}
                  className="group rounded-[8px] overflow-hidden bg-granite border border-stone-gold/10 hover:border-stone-gold/40 text-left transition-all duration-500">
                  <div className="aspect-square overflow-hidden">
                    <img src={s.image} alt={s.name} loading="lazy"
                      className="w-full h-full object-cover brightness-[0.9] group-hover:brightness-100 group-hover:scale-[1.04] transition-all duration-700" />
                  </div>
                  <span className="block px-3 py-2.5 font-display text-[15px] font-medium tracking-tight">{s.name}</span>
                </button>
              ))}
            </div>
            <button onClick={() => stoneInput.current?.click()}
              className="w-full rounded-[8px] border border-dashed border-stone-gold/35 bg-granite hover:bg-elevated transition-colors duration-500 py-4 text-[13px] text-cool-gray font-light">
              Saw one you loved at the yard? Upload your photo of it
            </button>
            <input ref={stoneInput} type="file" accept="image/*" className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f) { setCustomStone(await fileToCaptured(f, 1200)); setSlab(null); setStep("generate"); }
              }} />
          </section>
        )}

        {step === "generate" && (
          <section>
            <BackLink label="Stone" />
            <p className={`${eyebrow} mb-2`}>{slab ? slab.name : "Your stone"} · {SURFACES.find((s) => s.id === surface)?.label}</p>

            {phase !== "rendering" && !render && (
              <div className="py-4">
                <h2 className="font-display text-[26px] font-light tracking-tight mb-6">Ready when you are.</h2>
                <button onClick={startRender} className={`${cta} w-full md:w-auto px-10 py-4`}>Generate my remodel</button>
              </div>
            )}

            {(phase === "rendering" || render) && (
              <div className="mt-4">
                {phase === "rendering" ? (
                  <div className="flex items-center gap-3 mb-8 text-cool-gray text-sm font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-gold animate-pulse" />
                    Cutting your stone… about 30 seconds
                  </div>
                ) : (
                  <p className="font-mono text-[11px] text-stone-gold tracking-[3px] uppercase mb-6">Your remodel is ready</p>
                )}
                <div className="rounded-[12px] bg-granite border border-stone-gold/20 p-6 md:p-8">
                  <h3 className="font-display text-[22px] font-light tracking-tight mb-1">See your new space — free</h3>
                  <p className="text-cool-gray text-sm font-light mb-6">We'll text your image to your phone so it's yours to keep.</p>
                  <div className="space-y-3">
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" autoComplete="given-name" className={input} />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile number" type="tel" autoComplete="tel" className={input} />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" type="email" autoComplete="email" className={input} />
                    <button onClick={claim} disabled={!render || !firstName.trim() || !phone.trim() || phase === "claiming"}
                      className={`${cta} w-full py-3.5`}>
                      {phase === "claiming" ? "Unlocking…" : render ? "Show me my remodel" : "Waiting on your render…"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {phase === "error" && (
              <div className="mt-6 rounded-[8px] border border-red-400/30 bg-red-400/5 p-4 text-sm font-light">
                <p className="mb-2">That didn't work — {errMsg}</p>
                <button onClick={render ? claim : startRender} className="text-stone-gold underline underline-offset-4">Try again</button>
              </div>
            )}
          </section>
        )}

        {step === "reveal" && render && room && (
          <section>
            <h2 className="font-display text-[26px] font-light tracking-tight mb-5">Before &amp; after</h2>
            <div className="relative rounded-[12px] overflow-hidden border border-stone-gold/20 select-none">
              <img src={`data:image/jpeg;base64,${render.wm}`} alt="After" className="w-full block" />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${slider}%` }}>
                <img src={room.preview} alt="Before" className="w-full block h-full object-cover" style={{ width: `${10000 / slider}%`, maxWidth: "none" }} />
              </div>
              <div className="absolute top-0 bottom-0 w-[2px] bg-stone-gold" style={{ left: `${slider}%` }} />
            </div>
            <input type="range" min={2} max={98} value={slider} onChange={(e) => setSlider(Number(e.target.value))}
              className="w-full mt-4 accent-[#C9A96E]" aria-label="Compare before and after" />
            <p className="font-mono text-[10px] text-cool-gray/70 tracking-[3px] uppercase mt-2">AI visualization — actual slab may vary</p>
            <div className="flex flex-col md:flex-row gap-3 mt-6">
              <a href={`data:image/jpeg;base64,${render.wm}`} download="my-remodel-countertop-world.jpg"
                className="flex-1 text-center rounded-[6px] border border-stone-gold/40 text-stone-gold text-[13px] font-medium tracking-wide py-3.5 hover:bg-stone-gold/10 transition-all duration-500">
                Download
              </a>
              <a href="/book" className={`${cta} flex-1 py-3.5`}>Start my quote</a>
            </div>
            <div className="flex items-center justify-between mt-5">
              <button onClick={() => { setSlab(null); setCustomStone(null); setRender(null); setStep("stone"); }}
                className="font-mono text-[11px] text-cool-gray hover:text-stone-gold tracking-[3px] uppercase transition-colors duration-300">
                ← Try another stone
              </button>
              <button onClick={startOver}
                className="font-mono text-[11px] text-cool-gray hover:text-stone-gold tracking-[3px] uppercase transition-colors duration-300">
                Start over
              </button>
            </div>
            {smsQueued && <p className="text-cool-gray text-sm font-light mt-4">We also texted it to your phone.</p>}
          </section>
        )}
      </div>
    </div>
  );
}
