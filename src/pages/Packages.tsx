import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Ruler,
  Scissors,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { applyPageHead } from '../lib/pageHead';

// ─────────────────────────────────────────────────────────────────────────────
// PACKAGE PRICING — starting points. David confirms final prices before launch.
// Anchors researched from NWA + national competitors (2026-04-21).
// Edit the three `priceFrom` values below to update site-wide.
// ─────────────────────────────────────────────────────────────────────────────

type Tier = {
  id: 'entry' | 'signature' | 'premium';
  name: string;
  priceFrom: string;
  tagline: string;
  squareFeet: string;
  includes: string[];
  bestFor: string;
  recommended?: boolean;
};

type Tier_ = Tier & { sfOverage: string };

const TIERS: Tier_[] = [
  {
    id: 'entry',
    name: 'Entry',
    priceFrom: '$2,899',
    tagline: 'The honest starting point.',
    squareFeet: '60 sq ft installed',
    sfOverage: '+ $65 per SF over 60',
    includes: [
      'In-stock quartz or granite',
      'Laser-templated to 1/16 inch',
      'Stainless steel undermount sink',
      'Standard eased edge profile',
      'Digital vein-matched seams',
      'Installation by our crew',
      '1-year craftsmanship warranty',
    ],
    bestFor: 'A cleaner kitchen or bath refresh. Same fabrication, honest price, zero outsourcing.',
  },
  {
    id: 'signature',
    name: 'Signature',
    priceFrom: '$3,499',
    tagline: 'Upgraded where it matters.',
    squareFeet: '60 sq ft installed',
    sfOverage: '+ $80 per SF over 60',
    includes: [
      'Premium stone tier — exotic quartz, quartzite, or granite',
      'Laser-templated to 1/16 inch',
      'Stainless steel undermount sink',
      'Upgraded edge — bullnose, beveled, or ogee',
      'Digital vein-matched seams',
      'Sasso-Lux finish — polished, honed, or leathered',
      'Installation by our crew',
      '1-year craftsmanship warranty',
    ],
    bestFor: 'A full kitchen reset. The middle rung most of Arkansas picks.',
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    priceFrom: '$4,999',
    tagline: 'Built for a lifetime.',
    squareFeet: '60 sq ft installed',
    sfOverage: '+ $110 per SF over 60',
    includes: [
      'Hand-selected exotic stone — marble, high-grade quartzite, statement slabs',
      'Laser-templated to 1/16 inch',
      'Composite sink (upgrade from stainless)',
      'Mitered edge or waterfall detail',
      'Digital vein-matched seams across every joint',
      'Sasso-Lux finish — polished, honed, or leathered',
      'Installation by our crew',
      '10-year craftsmanship warranty — included',
    ],
    bestFor: 'The forever kitchen. Every option, every finish, every machine in our shop.',
  },
];

type AddOn = {
  name: string;
  price: string;
  description?: string;
  scope?: string; // e.g. "Entry & Signature only" — appears as small note
  exclusive?: boolean; // badge for Sasso-Lux-only items
};

const ADDONS: AddOn[] = [
  { name: 'Upgraded Edge',           price: '$299',  description: 'Ogee, bullnose, or beveled' },
  { name: 'Mitered Edge',            price: '$599',  description: 'Clean 45° mitered corner — Signature tier and up' },
  { name: 'Waterfall Edge',          price: '$899',  description: 'Full island waterfall on one or both sides' },
  { name: 'Composite Sink',          price: '$299',  description: 'Upgrade from stainless undermount' },
  { name: 'Double-Bowl Stainless',   price: '$199',  description: '60/40 or 50/50 undermount' },
  { name: 'Extra Sink Cutout',       price: '$149',  description: 'Each additional cutout after the first' },
  { name: 'Backsplash Prep Cut',     price: '$199',  description: 'Squared and ready for your tile installer' },
  { name: 'Honed Finish',            price: '$399',  description: 'Matte, tactile, glare-free. Only on a Sasso-Lux.', exclusive: true },
  { name: 'Leathered Finish',        price: '$399',  description: 'Textured organic surface. Only on a Sasso-Lux.', exclusive: true },
  { name: '10-Year Craftsmanship Warranty', price: '$499', description: 'Extended coverage from our in-house crew — not a subcontractor promise.', scope: 'Entry & Signature only — included in Premium' },
  { name: 'Rush Install',            price: '$299',  description: 'Cut the install window from 7 days to 5' },
  { name: 'Slab Reservation',        price: '$99',   description: 'Hold any slab in the showroom for 30 days with your name on it' },
];

const MACHINES = [
  {
    name: 'LPI Raptor',
    role: 'Laser template',
    count: 1,
    description: 'Scans your kitchen at home to one-sixteenth of an inch. No paper, no pencil marks, no guesswork.',
    icon: Ruler,
    image: '/process/raptor.webp', // placeholder — not yet in repo, falls back to icon block
  },
  {
    name: 'Park Industries SABER JET',
    role: 'CNC water jet',
    count: 1,
    description: 'High-pressure water cuts the slab with zero thermal shock. Clean cuts, no micro-fractures, any stone.',
    icon: Scissors,
    image: '/process/saber.jpg',
  },
  {
    name: 'Park Industries TITAN',
    role: 'CNC router',
    count: 4,
    description: 'Four on the floor. Shapes edges, sink cutouts, and detail work in parallel — four slabs in progress at once.',
    icon: Scissors,
    image: '/process/titan.jpg',
  },
  {
    name: 'Sasso-Lux K-Lux',
    role: 'Edge + finish',
    count: 1,
    description: 'The only Sasso-Lux in Arkansas. Polished, honed, or leathered on any slab.',
    icon: Sparkles,
    image: '/process/sasso-lux.webp',
  },
];

const TOTAL_MACHINE_COUNT = MACHINES.reduce((sum, m) => sum + m.count, 0); // 7

const TIMELINE = [
  { day: 'Day 1', title: 'Walk the slab', detail: 'Visit Bryant or Rogers. Pick the exact stone you will live with.' },
  { day: 'Day 2', title: 'Laser template', detail: 'Our LPI Raptor scans your space at home to 1/16 inch.' },
  { day: 'Day 3–4', title: 'Cut and shape', detail: 'SABER JET water-cuts the slab, then the four TITAN routers handle edges and cutouts.' },
  { day: 'Day 5', title: 'Finish + edge', detail: 'Sasso-Lux profiles the edge and runs the finish.' },
  { day: 'Day 6', title: 'Seam match', detail: 'Vein alignment across every joint, done before install.' },
  { day: 'Day 7', title: 'Install', detail: 'Our crew sets it, seals it, and walks you through care.' },
];

const INCLUDED_IN_EVERY = [
  'Free in-home measure with the LPI Raptor',
  'Every fabrication step under our Arkansas roof',
  'No subcontractors, no outsourced cuts',
  'Digital vein-matching on every seam',
  'Installation by our in-house crew',
  'Bryant & Rogers showroom access',
  '4.4★ · 109+ verified reviews · BBB A+ accredited',
];

const NOT_INCLUDED = [
  'Plumbing disconnect and reconnect',
  'Tear-out and haul-away of existing countertops',
  'Backsplash installation',
  'Electrical work or cabinet modification',
];

const FAQ = [
  {
    q: 'Can I customize a package?',
    a: 'Yes. Every package is a starting point — add square footage, extra sink cutouts, or an upgraded edge and we will quote the exact price at the in-home measure. The number you see is the "starting at" for the base spec.',
  },
  {
    q: 'How long does the whole process take?',
    a: 'Seven days from slab selection to installed counter. Most shops in Arkansas take three to four weeks because they outsource steps. We do every step under one roof.',
  },
  {
    q: 'What makes the Sasso-Lux a big deal?',
    a: 'The Sasso-Lux K-Lux is the only one in Arkansas. It lets us finish any slab polished, honed, or leathered — most fabricators in the state can only offer polished. Honed and leathered change how your counter reads in a space, and they are only available here.',
  },
  {
    q: 'Do you offer financing?',
    a: 'Yes. Financing options are discussed during the free in-home measure.',
  },
  {
    q: 'What if my kitchen needs more than 60 square feet?',
    a: 'Most kitchens do. The 60 sq ft baseline is the package anchor — additional square footage is quoted at the measure based on the stone tier you pick. No hidden fees, just straightforward per-foot pricing.',
  },
  {
    q: 'Where are your showrooms?',
    a: 'Two Arkansas locations: 26096 Interstate 30, Bryant, AR 72022 and 1706 Commerce Dr, Rogers, AR 72756. Open Monday through Saturday.',
  },
];

export default function Packages() {
  useEffect(() => {
    const cleanup = applyPageHead({
      title: 'Countertop Packages — Entry, Signature, Premium | Countertop World',
      description:
        'Three honest countertop packages. 40 sq ft installed, laser-templated to 1/16 inch, fabricated under our Arkansas roof. Bryant & Rogers, AR.',
      path: '/packages',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Packages', path: '/packages' },
      ],
    });

    const faqScript = document.createElement('script');
    faqScript.id = 'faq-schema';
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
    document.head.appendChild(faqScript);

    return () => { cleanup(); faqScript.remove(); };
  }, []);

  return (
    <>
    <main className="bg-obsidian text-vein-white min-h-screen">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-cool-gray hover:text-stone-gold transition-colors"
        >
          <ArrowLeft size={16} />
          Back home
        </Link>
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="max-w-4xl">
          <div className="text-stone-gold text-xs font-bold tracking-[4px] uppercase mb-6">
            Countertop Packages
          </div>
          <h1 className="text-[48px] md:text-[72px] font-black leading-[1.02] uppercase tracking-tight mb-8">
            Seven Machines.
            <br />
            <span className="text-stone-gold">Seven Days.</span>
            <br />
            One Roof.
          </h1>
          <p className="text-[18px] md:text-[20px] text-vein-white/75 leading-relaxed max-w-2xl mb-10">
            Three honest countertop packages — every step under our Arkansas roof. Laser-templated
            to one-sixteenth of an inch, cut on our CNC machines, finished on the only Sasso-Lux in
            the state.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-3 bg-stone-gold text-obsidian px-8 py-4 font-bold text-sm tracking-[2px] uppercase hover:bg-stone-gold/90 transition-colors"
          >
            Schedule a Free In-Home Measure
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* THREE PACKAGES */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-gold/15">
        <div className="mb-14">
          <div className="text-stone-gold text-xs font-bold tracking-[4px] uppercase mb-4">
            The Three Packages
          </div>
          <h2 className="text-[32px] md:text-[44px] font-black uppercase leading-tight max-w-3xl">
            One baseline. Three tiers. No shell prices.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col p-8 border transition-all ${
                tier.recommended
                  ? 'border-stone-gold bg-stone-gold/5'
                  : 'border-stone-gold/20 bg-white/[0.02]'
              } hover:border-stone-gold`}
            >
              {tier.recommended && (
                <div className="absolute -top-3 left-8 bg-stone-gold text-obsidian text-[10px] font-black tracking-[3px] uppercase px-3 py-1">
                  Most Picked
                </div>
              )}
              <div className="text-stone-gold text-[11px] font-bold tracking-[3px] uppercase mb-3">
                {tier.name}
              </div>
              <div className="text-cool-gray text-[10px] uppercase tracking-[3px] font-bold mb-1">
                Starting at
              </div>
              <div className="text-[40px] font-black tracking-tight mb-1">
                {tier.priceFrom}
              </div>
              <div className="text-cool-gray text-[11px] uppercase tracking-wider mb-2">
                {tier.squareFeet}
              </div>
              <div className="text-stone-gold/70 text-[10px] uppercase tracking-wider mb-5 font-mono">
                {tier.sfOverage}
              </div>
              <div className="text-vein-white text-[16px] font-semibold leading-snug mb-6">
                {tier.tagline}
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-vein-white/80 leading-relaxed">
                    <Check size={16} className="text-stone-gold shrink-0 mt-[2px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-5 border-t border-stone-gold/15 mb-6">
                <div className="text-cool-gray text-[11px] uppercase tracking-wider mb-2">
                  Best for
                </div>
                <div className="text-vein-white/75 text-[13px] leading-relaxed">
                  {tier.bestFor}
                </div>
              </div>
              <Link
                to="/book"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-xs tracking-[2px] uppercase transition-colors ${
                  tier.recommended
                    ? 'bg-stone-gold text-obsidian hover:bg-stone-gold/90'
                    : 'border border-stone-gold text-stone-gold hover:bg-stone-gold hover:text-obsidian'
                }`}
              >
                Get My Price
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-cool-gray text-[13px] max-w-3xl mx-auto">
          Every price starts at 60 sq ft — the Arkansas kitchen average. Per-SF overage is published
          per tier. Final quote comes from the free in-home measure with our LPI Raptor.
        </p>
      </section>

      {/* SHOWCASE — featured 4th tier, separate treatment */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-gold/15">
        <div className="border border-stone-gold/40 bg-gradient-to-br from-stone-gold/[0.04] to-transparent rounded-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left — text */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="text-stone-gold text-[10px] font-black tracking-[4px] uppercase">
                  By Invitation
                </span>
                <span className="text-cool-gray text-[10px] tracking-[2px] uppercase font-mono">
                  1 Arkansas kitchen per month
                </span>
              </div>
              <div className="text-stone-gold text-xs font-bold tracking-[4px] uppercase mb-4">
                The Showcase
              </div>
              <div className="text-cool-gray text-[11px] uppercase tracking-[3px] font-bold mb-1">
                Starting at
              </div>
              <div className="text-[64px] md:text-[80px] font-black leading-none tracking-tight mb-2">
                $24,999
              </div>
              <div className="text-cool-gray text-[14px] uppercase tracking-wider mb-8">
                The forever-kitchen package · all-inclusive
              </div>
              <p className="text-vein-white/80 text-[15px] leading-relaxed mb-8">
                The full-scope kitchen statement piece. Hand-selected exotic stone, book-matched
                slabs, a waterfall or mitered edge on your statement feature, full-height
                backsplash in the same stone, bathroom vanities, and concierge install. Reserved
                for one Arkansas kitchen per month because of the sourcing and bench time required.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  '150 sq ft hand-selected exotic stone',
                  'Book-matched slab engineering · invisible seams',
                  'Waterfall or mitered edge — your choice',
                  'Full-height backsplash in matching stone',
                  'Master + powder room vanities included',
                  'White-glove install · daily cleanup · end-of-day walk-through',
                  'Lifetime craftsmanship warranty',
                  'Annual re-seal service for 5 years',
                  'Personal slab yard trip with David',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-vein-white/85 leading-relaxed">
                    <Check size={16} className="text-stone-gold shrink-0 mt-[3px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                className="inline-flex items-center gap-3 bg-stone-gold text-obsidian px-7 py-3 font-bold text-xs tracking-[2px] uppercase hover:bg-stone-gold/90 transition-colors self-start"
              >
                Apply for a Showcase Slot
                <ArrowRight size={14} />
              </Link>
              <p className="mt-4 text-cool-gray text-[11px] italic">
                Every Showcase project starts with a 30-minute qualification call with David
                before the slab yard trip is scheduled.
              </p>
            </div>
            {/* Right — hero image */}
            <div className="relative min-h-[400px] md:min-h-0 bg-obsidian">
              <img
                src="/materials/insp/qt-fusion-statement.webp"
                alt="Showcase kitchen with exotic quartzite waterfall island"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 to-transparent" />
              <div className="absolute bottom-8 right-8 text-right">
                <div className="text-vein-white text-[11px] uppercase tracking-[3px] font-bold mb-1">
                  Featured Stone
                </div>
                <div className="text-stone-gold text-[14px] font-black uppercase tracking-wider">
                  Calacatta Oro · Patagonia · Crystallo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADD-ON MENU */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-gold/15">
        <div className="mb-12">
          <div className="text-stone-gold text-xs font-bold tracking-[4px] uppercase mb-4">
            Add-Ons
          </div>
          <h2 className="text-[32px] md:text-[44px] font-black uppercase leading-tight max-w-3xl mb-5">
            Customize the package to your kitchen.
          </h2>
          <p className="text-vein-white/70 text-[16px] leading-relaxed max-w-2xl">
            Flat menu pricing. Pick what you want at the in-home measure — every add-on is
            additive to the package base, no bundled hidden markups.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-0 max-w-5xl">
          {ADDONS.map((a) => (
            <div
              key={a.name}
              className="flex items-start justify-between gap-6 py-5 border-b border-stone-gold/10"
            >
              <div className="flex-grow">
                <div className="flex items-baseline gap-3 mb-1">
                  <h4 className="text-[15px] font-bold text-vein-white uppercase tracking-tight">
                    {a.name}
                  </h4>
                  {a.exclusive && (
                    <span className="text-[9px] font-black tracking-[2px] text-obsidian bg-stone-gold px-2 py-[1px] rounded">
                      SASSO-LUX ONLY
                    </span>
                  )}
                </div>
                {a.description && (
                  <p className="text-[13px] text-vein-white/65 leading-relaxed">
                    {a.description}
                  </p>
                )}
                {a.scope && (
                  <p className="text-[11px] text-stone-gold/60 italic mt-1 font-mono">
                    {a.scope}
                  </p>
                )}
              </div>
              <div className="text-stone-gold font-black text-[18px] font-mono whitespace-nowrap">
                {a.price}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-cool-gray text-[13px] max-w-3xl mx-auto italic">
          The honed and leathered finish upgrades are only possible on a Sasso-Lux machine — and
          ours is the only one in Arkansas. Most competitors can't offer these at any price.
        </p>
      </section>

      {/* SEVEN MACHINES */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-gold/15">
        <div className="mb-14">
          <div className="text-stone-gold text-xs font-bold tracking-[4px] uppercase mb-4">
            The Seven Machines
          </div>
          <h2 className="text-[32px] md:text-[44px] font-black uppercase leading-tight max-w-3xl mb-5">
            Most shops in Arkansas use one. We run seven.
          </h2>
          <p className="text-vein-white/70 text-[16px] leading-relaxed max-w-2xl">
            Four types of machines, {TOTAL_MACHINE_COUNT} on the floor. Templating, water-cutting,
            routing, finishing — every step happens on a machine we own, under our own roof.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MACHINES.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.name}
                className="flex flex-col border border-stone-gold/20 bg-white/[0.02] overflow-hidden hover:border-stone-gold/60 transition-colors"
              >
                <div className="aspect-[4/3] bg-obsidian relative overflow-hidden">
                  <img
                    src={m.image}
                    alt={`${m.name} at Countertop World`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If image not present, hide and show icon placeholder
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      const parent = img.parentElement;
                      if (parent && !parent.querySelector('.icon-fallback')) {
                        const div = document.createElement('div');
                        div.className = 'icon-fallback absolute inset-0 flex items-center justify-center';
                        div.innerHTML = '<div class="text-stone-gold/40"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="18" height="12" rx="1"/></svg></div>';
                        parent.appendChild(div);
                      }
                    }}
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center justify-between gap-2 text-stone-gold text-[10px] font-bold tracking-[2px] uppercase mb-2">
                    <span className="flex items-center gap-2">
                      <Icon size={12} />
                      {m.role}
                    </span>
                    {m.count > 1 && (
                      <span className="bg-stone-gold text-obsidian px-2 py-[2px] rounded text-[9px] font-black">
                        ×{m.count}
                      </span>
                    )}
                  </div>
                  <div className="text-vein-white font-bold text-[15px] uppercase tracking-tight leading-tight mb-3">
                    {m.name}
                  </div>
                  <div className="text-vein-white/65 text-[13px] leading-relaxed">
                    {m.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEVEN DAY TIMELINE */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-gold/15">
        <div className="mb-14">
          <div className="text-stone-gold text-xs font-bold tracking-[4px] uppercase mb-4">
            The Seven Days
          </div>
          <h2 className="text-[32px] md:text-[44px] font-black uppercase leading-tight max-w-3xl">
            Slab to installed in one week.
          </h2>
          <p className="text-vein-white/70 text-[16px] leading-relaxed max-w-2xl mt-5">
            Most shops take three to four weeks because they outsource steps. We take seven days
            because we do not.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TIMELINE.map((t, i) => (
            <div
              key={i}
              className="border border-stone-gold/20 bg-white/[0.02] p-5 hover:border-stone-gold/60 transition-colors"
            >
              <div className="text-stone-gold text-[10px] font-bold tracking-[2px] uppercase mb-3">
                {t.day}
              </div>
              <div className="text-vein-white font-bold text-[15px] uppercase tracking-tight leading-tight mb-2">
                {t.title}
              </div>
              <div className="text-vein-white/60 text-[12px] leading-relaxed">
                {t.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALWAYS INCLUDED */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-gold/15">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="text-stone-gold text-xs font-bold tracking-[4px] uppercase mb-4">
              Always Included
            </div>
            <h3 className="text-[24px] md:text-[32px] font-black uppercase leading-tight mb-8">
              In every package.
            </h3>
            <ul className="space-y-4">
              {INCLUDED_IN_EVERY.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] text-vein-white/85 leading-relaxed"
                >
                  <Check size={18} className="text-stone-gold shrink-0 mt-[3px]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-cool-gray text-xs font-bold tracking-[4px] uppercase mb-4">
              Not Included
            </div>
            <h3 className="text-[24px] md:text-[32px] font-black uppercase leading-tight mb-8 text-cool-gray">
              Your GC or plumber handles.
            </h3>
            <ul className="space-y-4">
              {NOT_INCLUDED.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] text-cool-gray leading-relaxed"
                >
                  <span className="text-cool-gray/60 mt-[2px]">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-vein-white/60 text-[13px] leading-relaxed italic">
              We keep the scope clean so your price stays honest. If you need a full-service GC, we
              refer trusted Arkansas partners at the measure.
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-gold/15">
        <div className="text-center mb-10">
          <div className="text-stone-gold text-xs font-bold tracking-[4px] uppercase mb-4">
            Arkansas Trust
          </div>
          <h3 className="text-[28px] md:text-[40px] font-black uppercase leading-tight max-w-3xl mx-auto">
            109+ verified reviews. BBB A+. Zero outsourcing.
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-8 border border-stone-gold/20 bg-white/[0.02]">
            <div className="text-stone-gold text-[52px] font-black leading-none mb-2">4.4★</div>
            <div className="text-vein-white/70 text-[13px] uppercase tracking-widest">
              Google Reviews
            </div>
          </div>
          <div className="text-center p-8 border border-stone-gold/20 bg-white/[0.02]">
            <div className="text-stone-gold text-[52px] font-black leading-none mb-2">A+</div>
            <div className="text-vein-white/70 text-[13px] uppercase tracking-widest">
              BBB Accredited
            </div>
          </div>
          <div className="text-center p-8 border border-stone-gold/20 bg-white/[0.02]">
            <div className="text-stone-gold text-[52px] font-black leading-none mb-2">1,000+</div>
            <div className="text-vein-white/70 text-[13px] uppercase tracking-widest">
              Slabs On Floor
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-stone-gold/15">
        <div className="mb-10">
          <div className="text-stone-gold text-xs font-bold tracking-[4px] uppercase mb-4">
            Common Questions
          </div>
          <h3 className="text-[28px] md:text-[36px] font-black uppercase leading-tight">
            Before the measure.
          </h3>
        </div>
        <div className="space-y-6">
          {FAQ.map((item, i) => (
            <div key={i} className="border-b border-stone-gold/15 pb-6">
              <div className="text-vein-white font-bold text-[16px] mb-3">{item.q}</div>
              <div className="text-vein-white/70 text-[14px] leading-relaxed">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center border-t border-stone-gold/15">
        <div className="text-stone-gold text-xs font-bold tracking-[4px] uppercase mb-6">
          Ready to Start
        </div>
        <h3 className="text-[36px] md:text-[52px] font-black uppercase leading-[1.05] mb-6">
          Seven machines.
          <br />
          <span className="text-stone-gold">Seven days.</span>
          <br />
          One roof.
        </h3>
        <p className="text-vein-white/70 text-[17px] leading-relaxed max-w-xl mx-auto mb-10">
          Book a free in-home measure with the LPI Raptor. We bring the laser to your kitchen —
          you bring a tape measure and a coffee.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-3 bg-stone-gold text-obsidian px-8 py-4 font-bold text-sm tracking-[2px] uppercase hover:bg-stone-gold/90 transition-colors"
          >
            Schedule In-Home Measure
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/stones/quartzite"
            className="inline-flex items-center gap-3 border border-stone-gold/40 text-vein-white px-8 py-4 font-bold text-sm tracking-[2px] uppercase hover:border-stone-gold hover:text-stone-gold transition-colors"
          >
            Browse the Stones
            <Wrench size={18} />
          </Link>
        </div>
        <p className="mt-12 text-cool-gray text-[13px]">
          Two showrooms · Bryant, AR · Rogers, AR · Open M–Sat
        </p>
      </section>
    </main>
    <SiteFooter />
    </>
  );
}
