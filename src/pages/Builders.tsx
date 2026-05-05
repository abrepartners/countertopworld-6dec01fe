import { useEffect, useState, useCallback, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Clock, Shield, Ruler, Star,
  Hammer, MapPin, ChevronDown, Wrench, Building2, Home,
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
  { q: 'What is your standard turnaround time for builder projects?', a: 'Two weeks from template to install for standard kitchen countertop projects. Multi-unit projects get dedicated scheduling to keep your build on track. We provide a firm timeline before we start.' },
  { q: 'Do you offer volume pricing for subdivisions and multi-unit builds?', a: 'Yes. Multi-unit and subdivision projects receive builder rates with priority scheduling. Contact us with your project scope and unit count for a custom quote.' },
  { q: 'What areas do you serve?', a: 'We serve all of Arkansas from two locations — Bryant (Central Arkansas) and Rogers (Northwest Arkansas). We handle projects in both regions with our own install crews.' },
  { q: 'Do you handle templating and installation, or just fabrication?', a: 'Everything is in-house. We laser-template, fabricate on CNC saws with Sasso-Lux finishing, and install with our own crew. No subcontractors at any stage.' },
  { q: 'What stone materials do you carry?', a: 'We stock 1,000+ slabs including Engineered Quartz, Natural Granite, Marble, Quartzite, Porcelain, Soapstone, and Onyx. New shipments arrive weekly. Builders can visit either showroom or send a spec sheet.' },
  { q: 'How do I set up a builder account?', a: 'Call us at (501) 481-8117 (Bryant) or (479) 900-9119 (Rogers), or fill out the form below. We will set you up with a dedicated point of contact, builder pricing, and priority scheduling.' },
  { q: 'Can you match slab selections across multiple units?', a: 'Yes. For multi-unit projects, we reserve slab lots to maintain visual consistency across all units. We also digitize veining patterns to match seams and waterfall edges.' },
];

export default function BuildersPage() {
  const [loaded, setLoaded] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [location, setLocation] = useState('Rogers');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { setLoaded(true); }, []);

  useEffect(() => {
    const cleanupHead = applyPageHead({
      title: 'Builder & Contractor Countertop Services | Countertop World — Bryant & Rogers, AR',
      description: 'Arkansas stone fabrication for builders and contractors. 2-week turnaround, volume pricing, laser templating, and in-house installation. Granite, Quartz, Marble, Quartzite countertops. Two locations: Bryant and Rogers.',
      path: '/builders',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Builders & Contractors', path: '/builders' },
      ],
    });

    const existingFaq = document.getElementById('builders-faq-schema');
    if (existingFaq) existingFaq.remove();
    const faqScript = document.createElement('script');
    faqScript.id = 'builders-faq-schema';
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

    const existingSvc = document.getElementById('builders-service-schema');
    if (existingSvc) existingSvc.remove();
    const svcScript = document.createElement('script');
    svcScript.id = 'builders-service-schema';
    svcScript.type = 'application/ld+json';
    svcScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Builder & Contractor Countertop Fabrication',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Countertop World',
        address: [
          { '@type': 'PostalAddress', streetAddress: '26096 Interstate 30', addressLocality: 'Bryant', addressRegion: 'AR', postalCode: '72022' },
          { '@type': 'PostalAddress', streetAddress: '1706 Commerce Dr', addressLocality: 'Rogers', addressRegion: 'AR', postalCode: '72756' },
        ],
        telephone: ['(501) 481-8117', '(479) 900-9119'],
        url: 'https://countertopworldar.com/builders',
      },
      serviceType: 'Stone Countertop Fabrication and Installation',
      areaServed: { '@type': 'State', name: 'Arkansas' },
      description: 'In-house stone countertop fabrication and installation for builders and contractors. 2-week turnaround, volume pricing, laser templating, CNC fabrication, and Sasso-Lux finishing.',
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
    formData.append('clientType', 'Builder / Contractor');
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
    { value: '2-Week', label: 'Template to Install' },
    { value: '100%', label: 'In-House Fabrication' },
    { value: '1,000+', label: 'Slabs in Stock' },
    { value: '2', label: 'Arkansas Locations' },
  ];

  const benefits = [
    { Icon: Clock, title: '2-week turnaround.', desc: 'Standard projects go from template to install in two weeks. Multi-unit projects get dedicated scheduling. We give you a firm date and hit it.' },
    { Icon: Shield, title: '100% in-house.', desc: 'Every cut, every finish, every install is done by our crew. No subcontractors. One team, one point of accountability.' },
    { Icon: Ruler, title: 'Laser-perfect templates.', desc: 'We laser-scan your spaces down to the millimeter. The stone fits right the first time. No re-cuts, no wasted days.' },
    { Icon: Star, title: 'Volume pricing.', desc: 'Multi-unit and subdivision projects get builder rates and priority scheduling. The more you build, the better the pricing.' },
  ];

  const services = [
    { Icon: Building2, title: 'New Construction', desc: 'Custom countertops for new builds. Pick the slab or send a spec sheet, and we handle template through install on your timeline.' },
    { Icon: Home, title: 'Multi-Unit & Subdivision', desc: 'Consistent quality across 5 units or 50. We reserve slab lots for visual consistency and offer dedicated scheduling for your build sequence.' },
    { Icon: Wrench, title: 'Remodel & Renovation', desc: 'Kitchen and bath upgrades for your remodel projects. We work around your schedule and coordinate with your other trades.' },
  ];

  const steps = [
    { num: '01', title: 'Get a quote.', desc: 'Tell us the scope. We respond within 24 hours with a detailed estimate.' },
    { num: '02', title: 'Select materials.', desc: 'Pick from 1,000+ slabs at either showroom, or send us your spec sheet.' },
    { num: '03', title: 'We template.', desc: 'Our crew laser-scans the space. 30 minutes, millimeter precision.' },
    { num: '04', title: 'We fabricate.', desc: 'CNC saws and Sasso-Lux finishing. Everything stays in our shop.' },
    { num: '05', title: 'We install.', desc: 'Our crew handles the install. Clean site, no punch list surprises.' },
  ];

  const materials = [
    { name: 'Engineered Quartz', tag: 'Most Popular', link: '/stones/engineered-quartz', img: '/materials/engineered-quartz.webp' },
    { name: 'Natural Granite', tag: 'Timeless', link: '/stones/natural-granite', img: '/materials/natural-granite.webp' },
    { name: 'Marble', tag: 'Luxury', link: '/stones/marble', img: '/materials/marble.webp' },
    { name: 'Quartzite', tag: 'Premium', link: '/stones/quartzite', img: '/materials/quartzite.webp' },
    { name: 'Porcelain', tag: 'Modern', link: '/stones/porcelain', img: '/materials/porcelain.webp' },
    { name: 'Soapstone & Onyx', tag: 'Exotic', link: '/stones/soapstone-onyx', img: '/materials/onyx.webp' },
  ];

  const testimonials = [
    { text: "Used David and Countertop World for four houses now. Best selection of slabs in Arkansas with great prices. Turnaround time is unmatched.", cite: 'Builder Customer, NWA' },
    { text: "Very professional and patient. Measurements were precise, and the staff was customer service oriented. We couldn't be happier.", cite: 'Verified Customer' },
    { text: "The pricing was great and they turned it around in just over a week. The quality of the stone and finish is truly exceptional.", cite: 'Builder Partner' },
  ];

  return (
    <div className="min-h-screen bg-obsidian antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10 px-6 h-14 flex items-center justify-between" aria-label="Site navigation">
        <Link to="/" className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline">Countertop World</Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hidden md:flex items-center gap-1.5 text-[13px] text-cool-gray hover:text-vein-white transition-colors no-underline">
            <ArrowLeft size={16} /> Home
          </Link>
          <a href="#builder-contact" onClick={e => { e.preventDefault(); document.getElementById('builder-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-[6px] text-[12px] font-medium tracking-wide bg-stone-gold text-obsidian hover:bg-stone-gold-light transition-all duration-500">Partner with us</a>
        </div>
      </nav>

      <main id="main-content">
        {/* ── HERO ── */}
        <section aria-labelledby="builder-hero-heading" className="relative min-h-[85vh] flex flex-col items-center justify-center pt-28 pb-0 px-6 overflow-hidden bg-obsidian">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,169,110,0.04) 0%, transparent 70%)' }} />
            <MarbleVeins />
          </div>
          <div className={`text-center max-w-4xl mx-auto z-10 flex flex-col items-center transition-all duration-[1200ms] ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-granite/80 backdrop-blur-sm border border-stone-gold/15 rounded-[6px] px-4 py-1.5 mb-10">
              <Hammer size={12} className="text-stone-gold" />
              <span className="font-mono text-[11px] text-cool-gray tracking-[3px] uppercase">Builder & Contractor Program</span>
            </div>
            <h1 id="builder-hero-heading" className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light text-vein-white tracking-tighter leading-[1.05] mb-8">
              On time, on budget,<br /><span className="font-semibold text-stone-gold">every project.</span>
            </h1>
            <p className="text-[17px] md:text-[19px] text-cool-gray font-light leading-relaxed max-w-xl mb-10">
              You need a fabricator who won't hold up your build. Two Arkansas locations, 1,000+ slabs in stock, and a 2-week turnaround from template to install. No middlemen. No subcontractors.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <PillButton href="#builder-contact" gold size="lg">Partner with us <ArrowRight size={14} className="ml-2" /></PillButton>
            </div>
          </div>
          <div className={`w-full max-w-[1440px] mt-16 mx-auto aspect-[21/9] overflow-hidden rounded-[12px] relative transition-all duration-[1500ms] delay-300 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <img src="/builders/hero-new-construction.webp" alt="Freshly installed quartzite countertop on a new-construction kitchen island with kraft paper and blue painter's tape" className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className={`w-full border-t border-stone-gold/15 bg-granite/50 mt-0 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8" aria-label="Key metrics">
              {metrics.map((m, i) => <div key={i} className="text-center"><div className="font-display text-[26px] md:text-[32px] font-light text-vein-white tracking-tight mb-1">{m.value}</div><div className="font-mono text-[10px] text-cool-gray tracking-[3px] uppercase">{m.label}</div></div>)}
            </div>
          </div>
        </section>

        {/* ── WHY BUILDERS CHOOSE CW ── */}
        <Reveal>
          <section aria-labelledby="why-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-obsidian">
            <div className="max-w-[1440px] mx-auto">
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Why Builders Choose Us</p>
                <h2 id="why-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight leading-tight mb-6">Built for your timeline, not ours.</h2>
                <p className="text-[17px] text-cool-gray font-light leading-relaxed">We invested in equipment and process so your projects stay on schedule. Here's what that means for your builds.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((b, i) => (
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
            </div>
          </section>
        </Reveal>

        {/* ── MULTI-UNIT IMAGE BREAK ── */}
        <Reveal>
          <div className="relative">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
              <div className="aspect-[21/9] overflow-hidden rounded-[12px] border border-stone-gold/10">
                <img src="/builders/multi-unit-kitchens.webp" alt="Multiple new-construction kitchen islands with matching engineered quartz countertops in a subdivision walkthrough" className="w-full h-full object-cover brightness-[0.8]" loading="lazy" />
              </div>
              <p className="text-center text-[12px] text-cool-gray/60 font-light mt-4 tracking-wide">Consistent quality across every unit in your subdivision.</p>
            </div>
          </div>
        </Reveal>

        {/* ── SERVICES ── */}
        <Reveal>
          <section aria-labelledby="services-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-granite/50 border-y border-stone-gold/10">
            <div className="max-w-[1440px] mx-auto">
              <div className="text-center mb-16 md:mb-20">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Services</p>
                <h2 id="services-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight">Every project type. One fabricator.</h2>
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
                  <h2 id="process-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight">From quote to install in 5 steps.</h2>
                </div>
                <p className="text-[14px] text-cool-gray font-light max-w-sm leading-relaxed">Every step happens in-house. One team handles your project from start to finish.</p>
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

        {/* ── LASER TEMPLATING IMAGE ── */}
        <Reveal>
          <div className="py-8 px-6 lg:px-10 bg-granite/30 border-y border-stone-gold/10">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-[12px] border border-stone-gold/10">
                <img src="/builders/laser-templating.webp" alt="Stone fabrication technician operating a precision laser templating device in a new-construction kitchen" className="w-full h-full object-cover brightness-[0.85]" loading="lazy" />
              </div>
              <div className="py-8">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Precision</p>
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light text-vein-white tracking-tight leading-tight mb-6">Laser-scan. CNC-cut.<br />Sasso-Lux finish.</h3>
                <p className="text-[16px] text-cool-gray font-light leading-relaxed mb-6">
                  We laser-scan every space down to the millimeter, cut on CNC saws to match, and finish on the only Sasso-Lux in Arkansas. Leathered, honed, brushed — finishes other shops have to outsource or skip.
                </p>
                <p className="text-[16px] text-cool-gray font-light leading-relaxed">
                  Digital vein-matching lines up patterns across seams and waterfall edges. The joints disappear.
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
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">What Builders Say</p>
                <h2 id="testimonials-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight">Trusted by builders across Arkansas.</h2>
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
                <h2 id="materials-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight mb-4">1,000+ slabs. Every major stone type.</h2>
                <p className="text-[15px] text-cool-gray font-light max-w-md mx-auto">New shipments arrive every week. Visit the showroom or send your spec sheet.</p>
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
                <h2 id="faq-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight">Common builder questions.</h2>
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
          <section id="builder-contact" aria-labelledby="contact-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-granite/30 border-t border-stone-gold/10">
            <div className="max-w-[800px] mx-auto">
              <div className="text-center mb-16">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Get Started</p>
                <h2 id="contact-heading" className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-vein-white tracking-tight leading-tight">Partner with Countertop World.</h2>
              </div>
              {formStatus === 'success' ? (
                <div className="text-center py-16 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-stone-gold/10 border border-stone-gold/20 flex items-center justify-center mx-auto mb-6"><Star size={28} className="text-stone-gold" /></div>
                  <h3 className="font-display text-[28px] text-vein-white font-light tracking-tight mb-4">We'll be in touch.</h3>
                  <p className="text-[16px] text-cool-gray font-light leading-relaxed max-w-md mx-auto mb-8">We've received your inquiry. David or a member of our team will follow up within one business day. In the meantime, feel free to call us directly.</p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <PillButton href="/" gold>Back to homepage</PillButton>
                  </div>
                </div>
              ) : (
                <form ref={formRef} className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="bg-granite/60 rounded-[12px] border border-stone-gold/10 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Hammer size={14} className="text-stone-gold" />
                      <span className="font-mono text-[10px] text-stone-gold tracking-[3px] uppercase font-medium">Builder / Contractor</span>
                    </div>
                    <p className="text-[12px] text-cool-gray font-light">This form is pre-tagged for builder inquiries. You'll get builder pricing and priority scheduling.</p>
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
                    <div className="w-full"><label htmlFor="b-name" className="sr-only">Name</label><input id="b-name" name="name" type="text" placeholder="Name" required className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                    <div className="w-full"><label htmlFor="b-company" className="sr-only">Company</label><input id="b-company" name="companyName" type="text" placeholder="Company" className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full"><label htmlFor="b-phone" className="sr-only">Phone</label><input id="b-phone" name="phone" type="tel" placeholder="Phone" className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                    <div className="w-full"><label htmlFor="b-email" className="sr-only">Email</label><input id="b-email" name="email" type="email" placeholder="Email" required className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                  </div>
                  <div><label htmlFor="b-scope" className="sr-only">Project scope</label><input id="b-scope" name="scope" type="text" placeholder="Project scope (e.g., 12-unit subdivision, kitchen remodel, commercial)" className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                  <div><label htmlFor="b-details" className="sr-only">Details</label><textarea id="b-details" name="details" placeholder="Tell us about your project or what you're looking for in a fabrication partner..." rows={3} className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500 resize-none" /></div>
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
                <h2 id="showrooms-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight mb-4">Come see the slabs in person.</h2>
                <p className="text-[15px] text-cool-gray font-light max-w-md mx-auto">Walk the yard, pick your slab, or bring your spec sheet. Both locations are open to builders.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { name: 'Northwest Arkansas', city: 'Rogers', badge: 'New', address: '1706 Commerce Dr, Rogers, AR 72756', hours: 'Mon-Fri 8am-5pm', features: ['18,700 sq ft facility', '1,000+ slabs on-site'], img: '/showrooms/rogers.webp', mapQuery: 'Countertop+World,1706+Commerce+Dr,Rogers,AR+72756' },
                  { name: 'Central Arkansas', city: 'Bryant', badge: 'Flagship', address: '26096 Interstate 30, Bryant, AR 72022', hours: 'Mon-Fri 8am-5pm / Sat 9am-1pm', features: ['5,000+ sq ft showroom', 'Sasso-Lux technology center'], img: '/showrooms/bryant.webp', mapQuery: 'Countertop+World,26096+Interstate+30,Bryant,AR+72022' },
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
                        <div className="flex items-center gap-3"><Clock size={14} className="text-stone-gold/60 flex-shrink-0" /><span className="text-[13px] text-cool-gray font-light">By appointment</span></div>
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

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 lg:px-10 bg-granite border-t border-stone-gold/10" role="contentinfo">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-[12px] text-cool-gray font-light">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline">Countertop World</Link>
            <span className="text-stone-gold/30">|</span>
            <span>Strength. Set in Stone.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>&copy; {new Date().getFullYear()} Countertop World, LLC</span>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center z-50 md:hidden pointer-events-none" aria-hidden="true">
        <div className="bg-obsidian/70 backdrop-blur-2xl border border-stone-gold/15 shadow-lg shadow-black/20 rounded-[6px] p-1 pointer-events-auto">
          <PillButton href="#builder-contact" gold>Partner with us</PillButton>
        </div>
      </div>
    </div>
  );
}
