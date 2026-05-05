import { useEffect, useState, useCallback, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import {
  ArrowLeft, ArrowRight, Clock, Shield, Ruler, Star,
  PenTool, Phone, MapPin, ChevronDown, Gem, Palette, Eye,
} from 'lucide-react';
import { applyPageHead } from '../lib/pageHead';
import { getAttribution } from '../lib/attribution';
import { useReveal } from '../hooks/useReveal';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal(0.12);
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${delayClass} ${className}`}>{children}</div>;
}

function PillButton({ children, href, onClick, gold = false, size = 'default', className: extra = '', external }: {
  children: ReactNode; href?: string; onClick?: () => void; gold?: boolean; size?: 'default' | 'lg'; className?: string; external?: boolean;
}) {
  const sz = size === 'lg' ? 'px-8 py-3.5 text-[14px]' : 'px-6 py-3 text-[13px]';
  const base = `inline-flex items-center justify-center rounded-[6px] tracking-wide transition-all duration-500 border font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian ${sz}`;
  const outline = 'border-stone-gold/30 text-vein-white hover:bg-stone-gold hover:text-obsidian hover:border-stone-gold';
  const goldS = 'bg-stone-gold text-obsidian border-stone-gold hover:bg-stone-gold-light';
  const cls = `${base} ${gold ? goldS : outline} ${extra}`;
  if (href) return <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

function MarbleVeins() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none vein-animate" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M-50,200 Q200,180 400,320 T800,280 T1200,400 T1500,300" stroke="rgba(201,169,110,0.12)" strokeWidth="1" fill="none"/>
      <path d="M-50,400 Q300,350 500,500 T900,450 T1300,550 T1500,480" stroke="rgba(201,169,110,0.08)" strokeWidth="0.8" fill="none"/>
      <path d="M-50,600 Q250,580 450,650 T850,600 T1250,700 T1500,650" stroke="rgba(201,169,110,0.06)" strokeWidth="0.6" fill="none"/>
    </svg>
  );
}

const faqItems = [
  { q: 'Can I bring my clients to pick their slab in person?', a: 'Yes. We encourage it. Both showrooms have 1,000+ slabs on-site. Your clients can see full slabs, not just samples, and pick the exact piece that goes in their project. We are happy to coordinate around your schedule.' },
  { q: 'What finishes do you offer beyond polished?', a: 'We are the only shop in Arkansas with a Sasso-Lux finishing system. That gives us leathered, honed, brushed, and custom texture finishes in-house. Other fabricators have to outsource these or skip them entirely.' },
  { q: 'Do you work from architect specs and construction drawings?', a: 'Yes. Send us your drawings, material specs, and edge profiles. We review the spec, confirm material availability, and provide a detailed quote. We can also advise on material substitutions if a specified stone is unavailable.' },
  { q: 'What is your lead time for a typical residential project?', a: 'Two weeks from template to install for standard kitchen countertop projects. Complex projects with exotic materials or custom finishes may take longer. We provide a firm timeline before starting.' },
  { q: 'Can you vein-match across seams and waterfall edges?', a: 'Yes. We digitize slab veining patterns and use digital vein-matching software to align patterns across seams, miters, and waterfall edges. This is standard for our designer projects, not an upcharge.' },
  { q: 'What exotic or specialty stones do you carry?', a: 'We source globally. Current inventory typically includes Calacatta, Taj Mahal Quartzite, backlit Onyx, Patagonia Granite, Super White Quartzite, and other specialty stones. New shipments arrive weekly. Call ahead if you need a specific material.' },
  { q: 'Do you handle commercial and hospitality projects?', a: 'Yes. We fabricate and install for commercial kitchens, reception desks, bar tops, restaurant surfaces, and hotel vanities. Commercial projects get dedicated scheduling and a single point of contact.' },
];

export default function DesignersPage() {
  const [loaded, setLoaded] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [location, setLocation] = useState('Rogers');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { setLoaded(true); }, []);

  useEffect(() => {
    const cleanupHead = applyPageHead({
      title: 'Designer & Architect Countertop Fabrication in Arkansas | Countertop World',
      description: 'Stone countertop fabrication for designers and architects in Arkansas. Sasso-Lux finishes, digital vein-matching, exotic stone sourcing. Calacatta, Quartzite, Onyx, Marble. Bryant and Rogers showrooms.',
      path: '/designers',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Designers & Architects', path: '/designers' },
      ],
    });

    const existingFaq = document.getElementById('designers-faq-schema');
    if (existingFaq) existingFaq.remove();
    const faqScript = document.createElement('script');
    faqScript.id = 'designers-faq-schema';
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
    document.head.appendChild(faqScript);

    const existingSvc = document.getElementById('designers-service-schema');
    if (existingSvc) existingSvc.remove();
    const svcScript = document.createElement('script');
    svcScript.id = 'designers-service-schema';
    svcScript.type = 'application/ld+json';
    svcScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Designer & Architect Stone Fabrication',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Countertop World',
        address: [
          { '@type': 'PostalAddress', streetAddress: '26096 Interstate 30', addressLocality: 'Bryant', addressRegion: 'AR', postalCode: '72022' },
          { '@type': 'PostalAddress', streetAddress: '1706 Commerce Dr', addressLocality: 'Rogers', addressRegion: 'AR', postalCode: '72756' },
        ],
        telephone: ['(501) 481-8117', '(479) 900-9119'],
        url: 'https://countertopworldar.com/designers',
      },
      serviceType: 'Stone Countertop Fabrication and Installation',
      areaServed: { '@type': 'State', name: 'Arkansas' },
      description: 'Precision stone fabrication for designers and architects in Arkansas. Sasso-Lux finishing, digital vein-matching, exotic stone sourcing, and spec-to-install project coordination.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Designer Stone Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential Designer Countertop Fabrication' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Stone Fabrication and Installation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Stone Fabrication — Bookmatched Walls, Backlit Onyx, Specialty Edges' } },
        ],
      },
    });
    document.head.appendChild(svcScript);

    return () => {
      cleanupHead();
      faqScript.remove();
      svcScript.remove();
    };
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('clientType', 'Designer / Architect');
    formData.append('preferredLocation', location);
    const attr = getAttribution();
    for (const [k, v] of Object.entries(attr)) {
      if (v) formData.append(k, v);
    }
    formData.append('landing_path', window.location.pathname + window.location.search);
    fetch('/api/lead', { method: 'POST', body: formData })
      .then(() => { setFormStatus('success'); form.reset(); })
      .catch(() => { setFormStatus('success'); form.reset(); });
  }, [location]);

  const metrics = [
    { value: 'Only', label: 'Sasso-Lux in Arkansas' },
    { value: '1,000+', label: 'Slabs on Site' },
    { value: '2-Week', label: 'Template to Install' },
    { value: 'Global', label: 'Stone Sourcing' },
  ];

  const capabilities = [
    { Icon: Palette, title: 'Sasso-Lux finishes.', desc: 'Leathered, honed, brushed, and custom textures — all done in-house. Finishes your clients will notice that other Arkansas fabricators cannot offer.' },
    { Icon: Gem, title: 'Exotic stone sourcing.', desc: 'Calacatta, Taj Mahal Quartzite, backlit Onyx, Patagonia Granite. We source globally and stock stones you will not find at other shops in the state.' },
    { Icon: Eye, title: 'Digital vein-matching.', desc: 'We digitize slab veining and align patterns across seams, miters, and waterfall edges. The joints disappear. Standard on designer projects.' },
    { Icon: Shield, title: 'Spec-to-install management.', desc: 'One dedicated project manager from your initial spec review through final walkthrough. No chasing updates across multiple contacts.' },
  ];

  const services = [
    { Icon: Ruler, title: 'Residential Design', desc: 'Custom kitchens, master baths, fireplaces, and wet bars. Bring your client to pick the slab, and we execute your vision exactly as specified.' },
    { Icon: Star, title: 'Commercial & Hospitality', desc: 'Reception desks, restaurant surfaces, hotel vanities, bar tops. We handle commercial-scale projects with the same precision as residential.' },
    { Icon: PenTool, title: 'Custom Fabrication', desc: 'Bookmatched feature walls, backlit Onyx panels, integrated sinks, and specialty edge profiles. If you can spec it, we can fabricate it.' },
  ];

  const steps = [
    { num: '01', title: 'Send your spec.', desc: 'Drawings, material specs, edge profiles. We review and provide a detailed quote within 48 hours.' },
    { num: '02', title: 'Select the slab.', desc: 'Visit with your client. Pick the exact slab from 1,000+ in stock, or we source to your spec.' },
    { num: '03', title: 'We template.', desc: 'Laser-scanning captures every dimension. 30 minutes, millimeter precision.' },
    { num: '04', title: 'We fabricate.', desc: 'CNC cutting, Sasso-Lux finishing, digital vein-matching. Everything in-house.' },
    { num: '05', title: 'We install.', desc: 'Our crew handles installation and a final walkthrough with you and your client.' },
  ];

  const materials = [
    { name: 'Marble', tag: 'Calacatta & Carrara', link: '/stones/marble', img: '/materials/marble.webp' },
    { name: 'Quartzite', tag: 'Taj Mahal & Super White', link: '/stones/quartzite', img: '/materials/quartzite.webp' },
    { name: 'Soapstone & Onyx', tag: 'Backlit & Exotic', link: '/stones/soapstone-onyx', img: '/materials/onyx.webp' },
    { name: 'Natural Granite', tag: 'Patagonia & Galaxy', link: '/stones/natural-granite', img: '/materials/natural-granite.webp' },
    { name: 'Engineered Quartz', tag: 'Consistent & Durable', link: '/stones/engineered-quartz', img: '/materials/engineered-quartz.webp' },
    { name: 'Porcelain', tag: 'Ultra-Thin & Modern', link: '/stones/porcelain', img: '/materials/porcelain.webp' },
  ];

  const testimonials = [
    { text: "The pricing was great and they turned it around in just over a week. The quality of the stone and finish is truly exceptional.", cite: 'Design Professional' },
    { text: "Used David and Countertop World for four houses now. Best selection of slabs in Arkansas with great prices. Turnaround time is unmatched.", cite: 'Architect Partner, NWA' },
    { text: "Very professional and patient. Measurements were precise, and the staff was customer service oriented. We couldn't be happier.", cite: 'Interior Designer' },
  ];

  return (
    <div className="min-h-screen bg-obsidian antialiased">
      <nav className="fixed top-0 inset-x-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10 px-6 h-14 flex items-center justify-between" aria-label="Site navigation">
        <Link to="/" className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline">Countertop World</Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hidden md:flex items-center gap-1.5 text-[13px] text-cool-gray hover:text-vein-white transition-colors no-underline">
            <ArrowLeft size={16} /> Home
          </Link>
          <a href="#designer-contact" onClick={e => { e.preventDefault(); document.getElementById('designer-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-[6px] text-[12px] font-medium tracking-wide bg-stone-gold text-obsidian hover:bg-stone-gold-light transition-all duration-500">Start a project</a>
        </div>
      </nav>

      <main id="main-content">
        {/* ── HERO ── */}
        <section aria-labelledby="designer-hero-heading" className="relative min-h-[85vh] flex flex-col items-center justify-center pt-28 pb-0 px-6 overflow-hidden bg-obsidian">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,169,110,0.04) 0%, transparent 70%)' }} />
            <MarbleVeins />
          </div>
          <div className={`text-center max-w-4xl mx-auto z-10 flex flex-col items-center transition-all duration-[1200ms] ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-granite/80 backdrop-blur-sm border border-stone-gold/15 rounded-[6px] px-4 py-1.5 mb-10">
              <PenTool size={12} className="text-stone-gold" />
              <span className="font-mono text-[11px] text-cool-gray tracking-[3px] uppercase">Designers & Architects</span>
            </div>
            <h1 id="designer-hero-heading" className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light text-vein-white tracking-tighter leading-[1.05] mb-8">
              Designer countertop fabrication<br /><span className="font-semibold text-stone-gold">your clients expect.</span>
            </h1>
            <p className="text-[17px] md:text-[19px] text-cool-gray font-light leading-relaxed max-w-xl mb-10">
              We carry stones you will not find at other Arkansas shops — and finish them in ways other fabricators cannot. Your spec, executed exactly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <PillButton href="#designer-contact" gold size="lg">Start a project <ArrowRight size={14} className="ml-2" /></PillButton>
              <PillButton href="tel:+15014818117" size="lg"><Phone size={14} className="mr-2" /> (501) 481-8117</PillButton>
            </div>
          </div>
          <div className={`w-full max-w-[1440px] mt-16 mx-auto aspect-[21/9] overflow-hidden rounded-[12px] relative transition-all duration-[1500ms] delay-300 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <img src="/designers/hero-slab-selection.webp" alt="Designer and client selecting a Calacatta marble slab at Countertop World stone showroom in Arkansas" className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = '/materials/insp/aud-designers.webp'; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className={`w-full border-t border-stone-gold/15 bg-granite/50 mt-0 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8" aria-label="Key metrics">
              {metrics.map((m, i) => <div key={i} className="text-center"><div className="font-display text-[26px] md:text-[32px] font-light text-vein-white tracking-tight mb-1">{m.value}</div><div className="font-mono text-[10px] text-cool-gray tracking-[3px] uppercase">{m.label}</div></div>)}
            </div>
          </div>
        </section>

        {/* ── WHY DESIGNERS CHOOSE CW ── */}
        <Reveal>
          <section aria-labelledby="why-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-obsidian">
            <div className="max-w-[1440px] mx-auto">
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Why Designers Choose Us</p>
                <h2 id="why-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight leading-tight mb-6">Equipment and materials other shops do not have.</h2>
                <p className="text-[17px] text-cool-gray font-light leading-relaxed">We invested in finishing technology and stone sourcing so your designs are never limited by your fabricator.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {capabilities.map((b, i) => (
                  <Reveal key={i} delay={i + 1}>
                    <div className="bg-granite rounded-[12px] p-8 border border-stone-gold/10 hover:border-stone-gold/25 transition-all duration-500">
                      <div className="w-10 h-10 rounded-[8px] border border-stone-gold/15 bg-obsidian flex items-center justify-center mb-5">
                        <b.Icon size={18} className="text-stone-gold" />
                      </div>
                      <h3 className="text-[17px] text-vein-white font-medium tracking-tight mb-2">{b.title}</h3>
                      <p className="text-[14px] text-cool-gray font-light leading-relaxed">{b.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <p className="text-[13px] text-cool-gray/60 font-light mt-10">Working with builders? See our <Link to="/builders" className="text-stone-gold/80 hover:text-stone-gold transition-colors underline underline-offset-2">builder and contractor services</Link>.</p>
            </div>
          </section>
        </Reveal>

        {/* ── VEIN-MATCHED WATERFALL IMAGE BREAK ── */}
        <Reveal>
          <div className="relative">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
              <div className="aspect-[21/9] overflow-hidden rounded-[12px] border border-stone-gold/10">
                <img src="/designers/vein-matched-waterfall.webp" alt="Bookmatched Calacatta marble waterfall island with perfectly aligned vein patterns across the horizontal and vertical surfaces" className="w-full h-full object-cover brightness-[0.8]" loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/materials/insp/qz-waterfall-edge.webp'; }} />
              </div>
              <p className="text-center text-[12px] text-cool-gray/60 font-light mt-4 tracking-wide">Digital vein-matching across seams and waterfall edges. The joints disappear.</p>
            </div>
          </div>
        </Reveal>

        {/* ── SERVICES ── */}
        <Reveal>
          <section aria-labelledby="services-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-granite/50 border-y border-stone-gold/10">
            <div className="max-w-[1440px] mx-auto">
              <div className="text-center mb-16 md:mb-20">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Capabilities</p>
                <h2 id="services-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight">From residential to commercial. Your spec, our execution.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((s, i) => (
                  <Reveal key={i} delay={i + 1}>
                    <div className="bg-obsidian rounded-[12px] p-8 md:p-10 border border-stone-gold/10 hover:border-stone-gold/25 transition-all duration-500 h-full">
                      <div className="w-12 h-12 rounded-[8px] border border-stone-gold/15 bg-granite flex items-center justify-center mb-6">
                        <s.Icon size={22} className="text-stone-gold" />
                      </div>
                      <h3 className="font-display text-[20px] text-vein-white font-medium tracking-tight mb-3">{s.title}</h3>
                      <p className="text-[14px] text-cool-gray font-light leading-relaxed">{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── PROCESS ── */}
        <Reveal>
          <section aria-labelledby="process-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-obsidian">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6">
                <div>
                  <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">How It Works</p>
                  <h2 id="process-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight">From spec to install in 5 steps.</h2>
                </div>
                <p className="text-[14px] text-cool-gray font-light max-w-sm leading-relaxed">Every step happens in-house. One project manager coordinates your project from spec review to final walkthrough.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {steps.map((step, idx) => (
                  <Reveal key={idx} delay={idx + 1}>
                    <div className="relative p-6 md:p-8 border-t md:border-t-0 md:border-l first:border-t-0 first:md:border-l-0 border-stone-gold/10">
                      <span className="font-display text-[36px] font-light text-stone-gold/20 tracking-tight block mb-3" aria-hidden="true">{step.num}</span>
                      <h3 className="text-[15px] text-vein-white font-medium tracking-tight mb-2">{step.title}</h3>
                      <p className="text-[12px] text-cool-gray leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── SASSO-LUX FEATURE ── */}
        <Reveal>
          <div className="py-8 px-6 lg:px-10 bg-granite/30 border-y border-stone-gold/10">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-[12px] border border-stone-gold/10">
                <img src="/designers/leathered-finish-detail.webp" alt="Macro detail of a leathered quartzite surface showing tactile brushed texture under dramatic side lighting" className="w-full h-full object-cover brightness-[0.85]" loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/process/sasso-lux.webp'; }} />
              </div>
              <div className="py-8">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Exclusive Finishing</p>
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light text-vein-white tracking-tight leading-tight mb-6">The only Sasso-Lux<br />in Arkansas.</h3>
                <p className="text-[16px] text-cool-gray font-light leading-relaxed mb-6">
                  Leathered, honed, brushed — finishes that define a designer project. Our Sasso-Lux system produces tactile surfaces other fabricators have to outsource or skip entirely.
                </p>
                <p className="text-[16px] text-cool-gray font-light leading-relaxed">
                  Combined with CNC precision cutting and digital vein-matching, we execute specs that most Arkansas shops cannot attempt.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── TESTIMONIALS ── */}
        <Reveal>
          <section aria-labelledby="testimonials-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-obsidian">
            <div className="max-w-[1440px] mx-auto">
              <div className="text-center mb-16 md:mb-20">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">What Design Professionals Say</p>
                <h2 id="testimonials-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight">Trusted by designers across Arkansas.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <Reveal key={i} delay={i + 1}>
                    <blockquote className="bg-granite rounded-[12px] p-8 border border-stone-gold/10 h-full flex flex-col">
                      <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-stone-gold text-stone-gold" />)}</div>
                      <p className="text-[14px] text-cool-gray font-light leading-relaxed italic flex-1">"{t.text}"</p>
                      <cite className="text-[12px] text-stone-gold font-medium not-italic mt-4 block">{t.cite}</cite>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── MATERIALS GRID ── */}
        <Reveal>
          <section aria-labelledby="materials-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-granite/50 border-y border-stone-gold/10">
            <div className="max-w-[1440px] mx-auto">
              <div className="text-center mb-16 md:mb-20">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Materials</p>
                <h2 id="materials-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight mb-4">Stones your clients will not find elsewhere.</h2>
                <p className="text-[15px] text-cool-gray font-light max-w-md mx-auto">We source globally and stock 1,000+ slabs. New shipments arrive every week. Bring your client to pick in person.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-stone-gold/15 rounded-[12px] overflow-hidden">
                {materials.map((mat, idx) => (
                  <Link key={idx} to={mat.link} className="bg-granite group hover:bg-elevated transition-all duration-500 no-underline">
                    <div className="aspect-[4/3] overflow-hidden bg-obsidian">
                      <img src={mat.img} alt={mat.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out" />
                    </div>
                    <div className="p-5 md:p-6">
                      <span className="font-mono text-[9px] font-medium tracking-[3px] uppercase text-stone-gold">{mat.tag}</span>
                      <h3 className="text-[16px] text-vein-white font-medium tracking-tight mt-1 group-hover:translate-x-1 transition-transform duration-500">{mat.name}</h3>
                      <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-stone-gold/60 group-hover:text-stone-gold transition-colors duration-500">View guide <ArrowRight size={10} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── FAQ ── */}
        <Reveal>
          <section aria-labelledby="faq-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-obsidian">
            <div className="max-w-[800px] mx-auto">
              <div className="text-center mb-16">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Frequently Asked</p>
                <h2 id="faq-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight">Common designer questions.</h2>
              </div>
              <div>
                {faqItems.map((item, i) => (
                  <div key={i} className="border-b border-stone-gold/15">
                    <button
                      className="w-full text-left py-5 flex justify-between items-center gap-4 text-[15px] font-medium text-vein-white hover:text-stone-gold transition-colors"
                      aria-expanded={faqOpen === i}
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    >
                      {item.q}
                      <ChevronDown size={20} className={`text-cool-gray shrink-0 transition-transform duration-300 ${faqOpen === i ? 'rotate-180 text-stone-gold' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-400 ${faqOpen === i ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
                      <p className="text-[14px] text-cool-gray leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── CONTACT FORM ── */}
        <Reveal>
          <section id="designer-contact" aria-labelledby="contact-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-granite/30 border-t border-stone-gold/10">
            <div className="max-w-[800px] mx-auto">
              <div className="text-center mb-16">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Get Started</p>
                <h2 id="contact-heading" className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-vein-white tracking-tight leading-tight">Start a project with Countertop World.</h2>
              </div>
              {formStatus === 'success' ? (
                <div className="text-center py-16 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-stone-gold/10 border border-stone-gold/20 flex items-center justify-center mx-auto mb-6"><Star size={28} className="text-stone-gold" /></div>
                  <h3 className="font-display text-[28px] text-vein-white font-light tracking-tight mb-4">We will be in touch.</h3>
                  <p className="text-[16px] text-cool-gray font-light leading-relaxed max-w-md mx-auto mb-8">We have received your inquiry. David or a member of our team will follow up within one business day. In the meantime, feel free to call us directly.</p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <a href="tel:+15014818117" className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] text-[13px] font-medium border border-stone-gold/25 text-cool-gray hover:border-stone-gold/50 hover:text-vein-white transition-all duration-500"><Phone size={14} /> (501) 481-8117 Bryant</a>
                    <a href="tel:+14799009119" className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] text-[13px] font-medium border border-stone-gold/25 text-cool-gray hover:border-stone-gold/50 hover:text-vein-white transition-all duration-500"><Phone size={14} /> (479) 900-9119 Rogers</a>
                  </div>
                </div>
              ) : (
                <form ref={formRef} className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="bg-granite/60 rounded-[12px] border border-stone-gold/10 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <PenTool size={14} className="text-stone-gold" />
                      <span className="font-mono text-[10px] text-stone-gold tracking-[3px] uppercase font-medium">Designer / Architect</span>
                    </div>
                    <p className="text-[12px] text-cool-gray font-light">This form is pre-tagged for designer inquiries. You will receive a dedicated project manager and priority spec review.</p>
                  </div>
                  <fieldset className="flex flex-col gap-3 border-none p-0">
                    <legend className="text-[12px] text-cool-gray font-light tracking-wide">Preferred showroom:</legend>
                    <div className="flex gap-3" role="radiogroup">
                      {['Rogers', 'Bryant'].map((loc) => (
                        <button key={loc} type="button" role="radio" aria-checked={location === loc} onClick={() => setLocation(loc)}
                          className={`px-5 py-2.5 rounded-[6px] text-[13px] tracking-wide transition-all duration-500 border ${location === loc ? 'border-stone-gold bg-stone-gold text-obsidian' : 'border-stone-gold/20 text-cool-gray hover:border-stone-gold/40 hover:text-vein-white'}`}>
                          {loc === 'Rogers' ? 'Rogers / NWA' : 'Bryant / Little Rock'}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full"><label htmlFor="d-name" className="sr-only">Name</label><input id="d-name" name="name" type="text" placeholder="Name" required className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                    <div className="w-full"><label htmlFor="d-company" className="sr-only">Firm or company</label><input id="d-company" name="companyName" type="text" placeholder="Firm / Company" className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full"><label htmlFor="d-phone" className="sr-only">Phone</label><input id="d-phone" name="phone" type="tel" placeholder="Phone" className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                    <div className="w-full"><label htmlFor="d-email" className="sr-only">Email</label><input id="d-email" name="email" type="email" placeholder="Email" required className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                  </div>
                  <div><label htmlFor="d-scope" className="sr-only">Project description</label><input id="d-scope" name="scope" type="text" placeholder="Project type (e.g., residential kitchen, commercial lobby, bath remodel)" className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                  <div><label htmlFor="d-details" className="sr-only">Details</label><textarea id="d-details" name="details" placeholder="Tell us about the project — materials, finishes, edge profiles, or specs you have in mind..." rows={3} className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500 resize-none" /></div>
                  <div className="mt-4 text-center"><PillButton gold size="lg">{formStatus === 'submitting' ? 'Sending...' : 'Submit inquiry'}</PillButton></div>
                </form>
              )}
            </div>
          </section>
        </Reveal>

        {/* ── SHOWROOMS ── */}
        <Reveal>
          <section aria-labelledby="showrooms-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-obsidian border-t border-stone-gold/10">
            <div className="max-w-[1440px] mx-auto">
              <div className="text-center mb-16 md:mb-20">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Showrooms</p>
                <h2 id="showrooms-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight mb-4">Bring your client. Pick the slab.</h2>
                <p className="text-[15px] text-cool-gray font-light max-w-md mx-auto">Both showrooms are open to designers and their clients. See full slabs, not just samples.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { name: 'Central Arkansas', city: 'Bryant', badge: 'Flagship', address: '26096 Interstate 30, Bryant, AR 72022', phone: '(501) 481-8117', hours: 'Mon-Fri 8am-5pm / Sat 9am-1pm', features: ['5,000+ sq ft showroom', 'Sasso-Lux technology center'], img: '/showrooms/bryant.webp', mapQuery: 'Countertop+World,26096+Interstate+30,Bryant,AR+72022' },
                  { name: 'Northwest Arkansas', city: 'Rogers', badge: 'New', address: '1706 Commerce Dr, Rogers, AR 72756', phone: '(479) 900-9119', hours: 'Mon-Fri 8am-5pm', features: ['18,700 sq ft facility', '1,000+ slabs on-site'], img: '/showrooms/rogers.webp', mapQuery: 'Countertop+World,1706+Commerce+Dr,Rogers,AR+72756' },
                ].map((loc, idx) => (
                  <article key={idx} className="border border-stone-gold/10 rounded-[12px] overflow-hidden group hover:border-stone-gold/25 transition-all duration-500 bg-granite">
                    <div className="aspect-[16/9] overflow-hidden bg-obsidian">
                      <img src={loc.img} alt={`${loc.name} showroom`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1500ms] brightness-[0.75]" loading="lazy" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="font-display text-[20px] text-vein-white font-medium tracking-tight">{loc.name}</h3>
                        <span className={`font-mono text-[9px] font-medium tracking-[3px] uppercase px-3 py-0.5 rounded-[6px] ${loc.badge === 'New' ? 'bg-stone-gold/10 text-stone-gold border border-stone-gold/20' : 'bg-white/5 text-cool-gray border border-white/10'}`}>{loc.badge}</span>
                      </div>
                      <address className="not-italic space-y-2 mb-5">
                        <div className="flex items-start gap-3"><MapPin size={14} className="text-stone-gold/60 mt-0.5 flex-shrink-0" /><span className="text-[13px] text-cool-gray font-light">{loc.address}</span></div>
                        <div className="flex items-center gap-3"><Phone size={14} className="text-stone-gold/60 flex-shrink-0" /><a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`} className="text-[13px] text-vein-white font-medium hover:text-stone-gold transition-colors">{loc.phone}</a></div>
                        <div className="flex items-center gap-3"><Clock size={14} className="text-stone-gold/60 flex-shrink-0" /><span className="text-[13px] text-cool-gray font-light">{loc.hours}</span></div>
                      </address>
                      <div className="flex flex-wrap gap-2 mb-6">{loc.features.map((f, i) => <span key={i} className="text-[11px] text-cool-gray font-light border border-stone-gold/10 rounded-[6px] px-3 py-1">{f}</span>)}</div>
                      <div className="rounded-[8px] overflow-hidden border border-stone-gold/10"><iframe title={`${loc.name} showroom map`} src={`https://www.google.com/maps?q=${loc.mapQuery}&output=embed`} width="100%" height="180" style={{ border: 0, filter: 'brightness(0.8) contrast(1.1)' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <SiteFooter />

      <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center z-50 md:hidden pointer-events-none" aria-hidden="true">
        <div className="bg-obsidian/70 backdrop-blur-2xl border border-stone-gold/15 shadow-lg shadow-black/20 rounded-[6px] p-1 pointer-events-auto">
          <PillButton href="#designer-contact" gold>Start a project</PillButton>
        </div>
      </div>
    </div>
  );
}
