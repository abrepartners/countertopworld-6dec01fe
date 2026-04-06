import { useEffect, useState, useRef, useCallback, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Phone, MapPin, Clock, Star,
  Shield, Gem, Ruler, Home, Hammer, PenTool
} from 'lucide-react';
import { useReveal } from './hooks/useReveal';
import './index.css';

import EngineeredQuartzPage from './pages/EngineeredQuartz';
import NaturalGranitePage from './pages/NaturalGranite';
import MarblePage from './pages/Marble';
import QuartzitePage from './pages/Quartzite';
import PorcelainPage from './pages/Porcelain';
import SoapstoneOnyxPage from './pages/SoapstoneOnyx';

/* ── MARBLE VEIN SVG ── */
function MarbleVeins({ className = '' }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none vein-animate ${className}`} viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M-50,200 Q200,180 400,320 T800,280 T1200,400 T1500,300" stroke="rgba(201,169,110,0.12)" strokeWidth="1" fill="none"/>
      <path d="M-50,400 Q300,350 500,500 T900,450 T1300,550 T1500,480" stroke="rgba(201,169,110,0.08)" strokeWidth="0.8" fill="none"/>
      <path d="M-50,600 Q250,580 450,650 T850,600 T1250,700 T1500,650" stroke="rgba(201,169,110,0.06)" strokeWidth="0.6" fill="none"/>
      <path d="M200,0 Q220,200 180,400 T250,700 T200,900" stroke="rgba(232,226,214,0.05)" strokeWidth="0.5" fill="none"/>
      <path d="M700,0 Q720,150 680,350 T750,600 T700,900" stroke="rgba(232,226,214,0.04)" strokeWidth="0.5" fill="none"/>
      <path d="M1100,0 Q1120,200 1080,450 T1150,700 T1100,900" stroke="rgba(232,226,214,0.03)" strokeWidth="0.4" fill="none"/>
    </svg>
  );
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal(0.12);
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${delayClass} ${className}`}>{children}</div>;
}

interface PillProps { children: ReactNode; href?: string; onClick?: () => void; gold?: boolean; size?: 'default' | 'lg'; className?: string; external?: boolean; }
function PillButton({ children, href, onClick, gold = false, size = 'default', className: extra = '', external }: PillProps) {
  const sz = size === 'lg' ? 'px-8 py-3.5 text-[14px]' : 'px-6 py-3 text-[13px]';
  const base = `inline-flex items-center justify-center rounded-[6px] tracking-wide transition-all duration-500 border font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian ${sz}`;
  const outline = 'border-stone-gold/30 text-vein-white hover:bg-stone-gold hover:text-obsidian hover:border-stone-gold';
  const goldS = 'bg-stone-gold text-obsidian border-stone-gold hover:bg-stone-gold-light';
  const cls = `${base} ${gold ? goldS : outline} ${extra}`;
  if (href) return <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

function ChapterDivider({ label }: { label?: string }) {
  return (
    <div className="relative py-4" role="separator" aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center"><div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10"><div className="h-px bg-gradient-to-r from-transparent via-stone-gold/20 to-transparent" /></div></div>
      {label && <div className="relative flex justify-center"><span className="bg-obsidian px-6 font-mono text-[10px] text-cool-gray tracking-[0.3em] uppercase">{label}</span></div>}
    </div>
  );
}

function SkipLink() {
  return <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-stone-gold focus:text-obsidian focus:px-6 focus:py-3 focus:rounded-[6px] focus:text-sm focus:font-medium focus:shadow-lg">Skip to main content</a>;
}

/* ── NAVIGATION ── */
function GlassNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  const links = [{ label: 'About', href: '#story' },{ label: 'Materials', href: '#materials' },{ label: 'Services', href: '#services' },{ label: 'Process', href: '#process' },{ label: 'Portfolio', href: '#work' },{ label: 'Visit', href: '#showrooms' }];
  return (
    <header role="banner"><nav aria-label="Main navigation" className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10' : 'bg-transparent'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-5 flex justify-between items-center">
        <a href="#" className="flex items-baseline gap-1.5 group" aria-label="Countertop World"><span className="font-display text-[18px] font-medium tracking-tight text-stone-gold group-hover:opacity-70 transition-opacity duration-500">Countertop World</span></a>
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-7 text-[12.5px] text-cool-gray tracking-wide font-light">
            {links.map(item => <a key={item.label} href={item.href} className="hover:text-vein-white transition-colors duration-500 relative group py-1">{item.label}<span className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-stone-gold transition-all duration-500 group-hover:w-full" /></a>)}
          </div>
          <a href="#contact" className="inline-flex items-center gap-1.5 px-5 py-2 rounded-[6px] text-[12px] font-medium tracking-wide bg-stone-gold text-obsidian hover:bg-stone-gold-light transition-all duration-500">Get a free estimate</a>
        </div>
        <button className="lg:hidden text-vein-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          <div className="w-5 flex flex-col gap-[5px]"><span className={`h-[1px] bg-vein-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} /><span className={`h-[1px] bg-vein-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} /><span className={`h-[1px] bg-vein-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} /></div>
        </button>
      </div>
      {menuOpen && <div className="lg:hidden bg-obsidian/95 backdrop-blur-xl border-t border-stone-gold/10 px-6 py-8 flex flex-col gap-5">
        {links.map(item => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="text-[15px] text-cool-gray hover:text-vein-white transition-colors">{item.label}</a>)}
        <a href="#contact" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center px-5 py-3 rounded-[6px] text-[13px] font-medium bg-stone-gold text-obsidian w-full mt-2">Get a free estimate</a>
      </div>}
    </nav></header>
  );
}

/* ── HERO ── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);
  const metrics = [{ value: '18,700', label: 'Sq ft Rogers facility' },{ value: 'Only', label: 'Sasso-Lux in Arkansas' },{ value: '100+', label: 'Years combined experience' },{ value: '4.5★', label: '109+ verified reviews' }];
  return (
    <section aria-labelledby="hero-heading" className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-0 px-6 overflow-hidden bg-obsidian">
      <div className="absolute inset-0"><div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,169,110,0.04) 0%, transparent 70%)' }} /><MarbleVeins /></div>
      <div className={`text-center max-w-4xl mx-auto z-10 flex flex-col items-center transition-all duration-[1200ms] ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-flex items-center gap-2 bg-granite/80 backdrop-blur-sm border border-stone-gold/15 rounded-[6px] px-4 py-1.5 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-gold animate-pulse" aria-hidden="true" />
          <span className="font-mono text-[11px] text-cool-gray tracking-[3px] uppercase">Now Open — Rogers Showroom</span>
        </div>
        <h1 id="hero-heading" className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light text-vein-white tracking-tighter leading-[1.05] mb-8">The alchemy of earth<br />and engineering.<br /><span className="font-semibold text-stone-gold">Stone, refined.</span></h1>
        <p className="text-[17px] md:text-[19px] text-cool-gray font-light leading-relaxed max-w-xl mb-10">Arkansas' largest stone fabrication studio. Granite. Quartz. Marble. Quartzite. Precision-cut and hand-finished in-house.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <PillButton href="#work" size="lg">View the gallery <ArrowRight size={14} className="ml-2" /></PillButton>
          <PillButton href="#contact" gold size="lg">Schedule a visit</PillButton>
        </div>
      </div>
      <div className={`w-full max-w-[1440px] mt-16 mx-auto aspect-[21/9] overflow-hidden rounded-[12px] relative group transition-all duration-[1500ms] delay-300 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <video autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop" className="w-full h-full object-cover brightness-[0.7] contrast-[1.05]"><source src="https://videos.pexels.com/video-files/6585028/6585028-uhd_2560_1440_30fps.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className={`w-full border-t border-stone-gold/15 bg-granite/50 mt-0 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8" aria-label="Key metrics">
          {metrics.map((m, i) => <div key={i} className="text-center"><div className="font-display text-[26px] md:text-[32px] font-light text-vein-white tracking-tight mb-1">{m.value}</div><div className="font-mono text-[10px] text-cool-gray tracking-[3px] uppercase">{m.label}</div></div>)}
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  const features = [
    { num: '01', title: 'Sasso-Lux finishing.', desc: 'The only fabricator in Arkansas equipped with Sasso-Lux robotics. Perfectly honed mattes, tactile leathered finishes, and glass-smooth polish.' },
    { num: '02', title: 'Laser-measured precision.', desc: 'Advanced laser scanning maps your space with millimeter accuracy. Combined with CNC saws, polishers, and edgers. Zero margin for error.' },
    { num: '03', title: 'Digital vein-matching.', desc: "High-res slab digitization aligns vein patterns across seams and waterfall edges. Nature's flow, uninterrupted." },
  ];
  return (
    <section id="story" aria-labelledby="story-heading" className="bg-obsidian">
      <div className="py-28 md:py-36 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal><div>
            <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Our Story</p>
            <h2 id="story-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight leading-tight mb-8">From a napkin sketch<br />to Arkansas' largest.</h2>
            <div className="space-y-5 text-[16px] text-cool-gray font-light leading-relaxed">
              <p>David McDougall spent his 20s in Denver working corporate sales. When the loss of his brothers brought him home to Arkansas, he worked through the grief with his hands. Taking a job at a small granite shop in Jonesboro.</p>
              <p>What started as a sketch on the back of a napkin became Countertop World. Now the largest stone fabricator in Central Arkansas. Together with co-owner Conor Lawrence and a team with almost 100 years of combined experience, they built something that honors both craft and innovation.</p>
              <p>Today, Countertop World operates from two state-of-the-art facilities. The flagship in Bryant. The brand-new 18,700 sq ft showroom in Rogers. Precision stone craftsmanship for all of Arkansas.</p>
            </div>
            <div className="mt-10"><PillButton href="#showrooms">Visit a showroom <ArrowRight size={14} className="ml-2" /></PillButton></div>
          </div></Reveal>
          <Reveal delay={1}><div className="aspect-[4/5] overflow-hidden bg-granite rounded-[12px] border border-stone-gold/10"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop" alt="Countertop World craftsmanship" className="w-full h-full object-cover brightness-[0.8] contrast-[1.05]" loading="lazy" /></div></Reveal>
        </div>
      </div>
      <div className="py-28 md:py-36 px-6 lg:px-10 bg-granite/50 border-y border-stone-gold/10">
        <div className="max-w-[1440px] mx-auto">
          <Reveal><div className="max-w-2xl mb-20 md:mb-28">
            <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Technology</p>
            <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight leading-tight mb-6">Uncompromising precision.</h3>
            <p className="text-[17px] text-cool-gray font-light leading-relaxed">Exclusive machinery that no other Arkansas fabricator operates. The result is a surface that feels inevitable.</p>
          </div></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {features.map((f, i) => <Reveal key={i} delay={i + 1}><div className="flex flex-col py-10 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0 border-t md:border-t-0 md:border-l first:border-t-0 first:md:border-l-0 border-stone-gold/10">
              <span className="font-mono text-[11px] text-cool-gray tracking-[3px] mb-6">{f.num}</span>
              <h4 className="text-[18px] text-vein-white font-medium tracking-tight mb-4">{f.title}</h4>
              <p className="text-[14px] text-cool-gray leading-relaxed font-light">{f.desc}</p>
            </div></Reveal>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── MATERIALS ── */
function Materials() {
  const materials = [
    { name: 'Engineered Quartz', tag: 'Most Popular', desc: 'Non-porous. Low maintenance. Endlessly versatile. All major brands with new shipments weekly.', link: '/stones/engineered-quartz' },
    { name: 'Natural Granite', tag: 'Timeless', desc: 'Each slab one-of-a-kind. Durable. Heat-resistant. Eternally beautiful. Irreplaceable character.', link: '/stones/natural-granite' },
    { name: 'Marble', tag: 'Luxury', desc: 'The gold standard of elegance. Dramatic veining and sophisticated palettes that demand attention.', link: '/stones/marble' },
    { name: 'Quartzite', tag: 'Premium', desc: 'The look of marble with the strength of granite. Beauty without compromise.', link: '/stones/quartzite' },
    { name: 'Porcelain', tag: 'Modern', desc: 'Ultra-thin. Ultra-durable. Stain-proof. Contemporary precision for kitchens and outdoor spaces.', link: '/stones/porcelain' },
    { name: 'Soapstone & Onyx', tag: 'Exotic', desc: "Soapstone's velvety warmth. Onyx's translucent drama. Statement pieces. Engineered to last.", link: '/stones/soapstone-onyx' },
  ];
  return (
    <Reveal><section id="materials" aria-labelledby="materials-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-obsidian">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6">
          <div><p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Materials</p><h2 id="materials-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight leading-tight">The earth's finest surfaces.</h2></div>
          <p className="text-[14px] text-cool-gray font-light max-w-sm leading-relaxed">We stock the most exclusive slabs in Arkansas with multiple new shipments arriving weekly.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-stone-gold/15 rounded-[12px] overflow-hidden">
          {materials.map((mat, idx) => <Link key={idx} to={mat.link} className="bg-granite p-8 md:p-10 group cursor-pointer hover:bg-elevated transition-all duration-500 no-underline">
            <span className="inline-block font-mono text-[9px] font-medium tracking-[3px] uppercase text-stone-gold border border-stone-gold/25 rounded-[6px] px-3 py-1 mb-6">{mat.tag}</span>
            <h3 className="font-display text-[22px] text-vein-white font-medium tracking-tight mb-3 group-hover:translate-x-1 transition-transform duration-500">{mat.name}</h3>
            <p className="text-[13px] text-cool-gray leading-relaxed font-light">{mat.desc}</p>
            <span className="inline-flex items-center gap-1 mt-4 text-[12px] text-stone-gold/60 group-hover:text-stone-gold transition-colors duration-500">Explore guide <ArrowRight size={12} /></span>
          </Link>)}
        </div>
        <div className="mt-12 text-center"><a href="https://countertopworldar.com/inventory/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-stone-gold font-medium hover:text-stone-gold-light transition-colors">Browse full slab inventory <ArrowUpRight size={13} /></a></div>
      </div>
    </section></Reveal>
  );
}

/* ── WHO WE SERVE ── */
type AudienceKey = 'homeowners' | 'builders' | 'designers';
const audienceData = {
  homeowners: {
    Icon: Home, label: 'Homeowners',
    heading: <>Your dream kitchen.<br /><span className="text-stone-gold">Realized in stone.</span></>,
    description: 'This is the most important surface in your home. We make the process personal. From your first showroom visit to the moment your installer leaves.',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1600&auto=format&fit=crop', imageAlt: 'Beautiful kitchen with stone countertops',
    testimonial: { text: 'Very professional and patient. Measurements were precise, and the staff was customer service oriented. We couldn\'t be happier.', cite: 'Verified Homeowner' },
    benefits: [
      { Icon: Gem, title: 'Hand-pick your slab.', desc: 'Visit our 5,000+ sq ft showrooms. See it. Touch it. Choose the exact stone.' },
      { Icon: Ruler, title: 'Laser-measured fit.', desc: 'Millimeter-precision templates. No gaps. No guesswork. No surprises.' },
      { Icon: Shield, title: 'Precision guaranteed.', desc: 'Professional installation. BBB Accredited with 109+ five-star reviews.' },
      { Icon: Star, title: 'Full project coverage.', desc: 'Kitchens. Bathrooms. Outdoor living. Fireplaces. Anywhere stone belongs.' },
    ],
    cta: { text: 'Schedule a free consultation', href: '#contact' },
    secondaryCta: { text: 'Browse slabs', href: 'https://countertopworldar.com/inventory/', external: true },
  },
  builders: {
    Icon: Hammer, label: 'Builders & Contractors',
    heading: <>Reliability you can<br /><span className="text-stone-gold">build a business on.</span></>,
    description: "We don't just fabricate stone. We protect your timeline, your margin, and your reputation with every project.",
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop', imageAlt: 'Construction site with stone installation',
    testimonial: { text: "Used David and Countertop World for four houses now. Best selection of slabs in Arkansas with great prices. Turnaround time is unmatched.", cite: 'Builder Customer, NWA' },
    benefits: [
      { Icon: Clock, title: '2-week turnaround.', desc: 'Dedicated builder program delivers strict two-week turnarounds on standard projects.' },
      { Icon: Shield, title: '100% in-house.', desc: 'No outsourcing. No middlemen. Every cut under our quality control.' },
      { Icon: Ruler, title: '0mm tolerance.', desc: 'Precision laser scanning eliminates costly re-cuts. Millimeter-perfect before cutting.' },
      { Icon: Star, title: 'Volume pricing.', desc: 'Priority scheduling and competitive pricing for multi-unit and subdivision projects.' },
    ],
    cta: { text: 'Partner with us', href: '#contact' },
    secondaryCta: { text: 'Call (479) 900-9119', href: 'tel:+14799009119', external: false },
  },
  designers: {
    Icon: PenTool, label: 'Designers & Architects',
    heading: <>Your grandest visions.<br /><span className="text-stone-gold">Millimeter precision.</span></>,
    description: 'When your client expects perfection, you need a fabrication partner who delivers it. Rare materials. Advanced finishing. Meticulous attention.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4ea0d?q=80&w=1600&auto=format&fit=crop', imageAlt: 'Luxury stone design detail',
    testimonial: { text: "The pricing was great and they turned it around in just over a week. The quality of the stone and finish is truly exceptional.", cite: 'Design Professional' },
    benefits: [
      { Icon: Gem, title: 'Rare and exotic stones.', desc: "Globally-sourced slabs you won't find elsewhere. Calacatta. Taj Mahal quartzite. Backlit onyx." },
      { Icon: Ruler, title: 'Custom Sasso-Lux.', desc: 'Leathered. Honed. Brushed. Textures your clients have never experienced.' },
      { Icon: Shield, title: 'Digital vein-matching.', desc: 'Seamless waterfall edges and bookmatched slabs with invisible joints.' },
      { Icon: Star, title: 'Dedicated PM.', desc: 'One point of contact from spec to install. White-glove service for luxury projects.' },
    ],
    cta: { text: 'Start a project', href: '#contact' },
    secondaryCta: { text: 'View portfolio', href: 'https://countertopworldar.com/work/', external: true },
  },
};

function WhoWeServe() {
  const [active, setActive] = useState<AudienceKey>('homeowners');
  const tabListRef = useRef<HTMLDivElement>(null);
  const data = audienceData[active];
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const keys: AudienceKey[] = ['homeowners', 'builders', 'designers']; const idx = keys.indexOf(active); let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { next = (idx + 1) % keys.length; e.preventDefault(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { next = (idx - 1 + keys.length) % keys.length; e.preventDefault(); }
    if (next !== idx) { setActive(keys[next]); const tabs = tabListRef.current?.querySelectorAll('[role="tab"]'); (tabs?.[next] as HTMLElement)?.focus(); }
  }, [active]);

  return (
    <Reveal><section id="services" aria-labelledby="serve-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-obsidian">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-6">Who We Serve</p>
          <h2 id="serve-heading" className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-vein-white tracking-tight leading-tight mb-6">Three audiences.<br />One standard of excellence.</h2>
          <p className="text-[17px] text-cool-gray font-light max-w-lg mx-auto leading-relaxed">Whether you are designing your dream kitchen, building a subdivision, or specifying for a luxury client. We have engineered a process just for you.</p>
        </div>
        <div ref={tabListRef} className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16" role="tablist">
          {(Object.keys(audienceData) as AudienceKey[]).map((key) => {
            const d = audienceData[key]; const isActive = active === key;
            return <button key={key} role="tab" id={`tab-${key}`} aria-selected={isActive} aria-controls={`panel-${key}`} tabIndex={isActive ? 0 : -1} onClick={() => setActive(key)} onKeyDown={handleKeyDown}
              className={`group flex items-center gap-3 px-6 py-3.5 rounded-[6px] text-[13px] font-medium tracking-wide transition-all duration-500 border ${isActive ? 'border-stone-gold bg-stone-gold text-obsidian' : 'border-stone-gold/20 text-cool-gray hover:border-stone-gold/40 hover:text-vein-white'}`}>
              <d.Icon size={16} className={isActive ? 'text-obsidian' : 'text-cool-gray group-hover:text-vein-white'} />{d.label}
            </button>;
          })}
        </div>
        <div key={active} role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} tabIndex={0} className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden bg-granite rounded-[12px] border border-stone-gold/10"><img src={data.image} alt={data.imageAlt} className="w-full h-full object-cover brightness-[0.8]" loading="lazy" /></div>
              <blockquote className="absolute -bottom-6 left-4 right-4 md:left-6 md:right-6 bg-granite/95 backdrop-blur-xl rounded-[12px] p-5 shadow-xl shadow-black/30 border border-stone-gold/15">
                <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-stone-gold text-stone-gold" />)}</div>
                <p className="text-[13px] text-cool-gray font-light leading-relaxed italic mb-2">"{data.testimonial.text}"</p>
                <cite className="text-[11px] text-stone-gold font-medium not-italic">{data.testimonial.cite}</cite>
              </blockquote>
            </div>
            <div className="pt-8 lg:pt-0">
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-[6px] flex items-center justify-center border border-stone-gold/20 bg-granite"><data.Icon size={16} className="text-stone-gold" /></div>
                <span className="font-mono text-[11px] font-medium tracking-[3px] uppercase text-stone-gold">For {data.label}</span>
              </div>
              <h3 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light text-vein-white tracking-tight leading-tight mb-4">{data.heading}</h3>
              <p className="text-[16px] text-cool-gray font-light leading-relaxed mb-10 max-w-md">{data.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {data.benefits.map((b, i) => <div key={i}><div className="w-10 h-10 rounded-[8px] border border-stone-gold/15 bg-granite flex items-center justify-center mb-3"><b.Icon size={18} className="text-stone-gold" /></div><h4 className="text-[15px] text-vein-white font-medium tracking-tight mb-1.5">{b.title}</h4><p className="text-[13px] text-cool-gray font-light leading-relaxed">{b.desc}</p></div>)}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href={data.cta.href} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[6px] text-[14px] font-medium text-obsidian bg-stone-gold hover:bg-stone-gold-light transition-all duration-500">{data.cta.text} <ArrowRight size={14} /></a>
                <a href={data.secondaryCta.href} {...(data.secondaryCta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[6px] text-[14px] font-medium border border-stone-gold/25 text-cool-gray hover:border-stone-gold/50 hover:text-vein-white transition-all duration-500">{data.secondaryCta.text} {data.secondaryCta.external && <ArrowUpRight size={14} />}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section></Reveal>
  );
}

/* ── PROCESS ── */
function Process() {
  const steps = [
    { num: '01', title: 'Consultation.', desc: 'Visit our showroom. Meet a designer. Explore materials that match your vision and budget.' },
    { num: '02', title: 'Selection.', desc: 'Hand-pick your exact slab from massive inventory. New shipments arrive weekly.' },
    { num: '03', title: 'Templating.', desc: 'Laser-scanning measures your space with millimeter precision. No guesswork.' },
    { num: '04', title: 'Fabrication.', desc: 'CNC robotics and Sasso-Lux cut and finish your stone. 100% in-house quality control.' },
    { num: '05', title: 'Installation.', desc: 'Expert crew installs with care. Flawless edges and a surface that lasts a lifetime.' },
  ];
  return (
    <Reveal><section id="process" aria-labelledby="process-heading" className="py-28 md:py-36 px-6 lg:px-10 bg-granite/50 border-y border-stone-gold/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16 md:mb-20"><p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Process</p><h2 id="process-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight">From selection to installation.</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {steps.map((step, idx) => <Reveal key={idx} delay={idx + 1}><div className="relative p-6 md:p-8 border-t md:border-t-0 md:border-l first:border-t-0 first:md:border-l-0 border-stone-gold/10">
            <span className="font-display text-[36px] font-light text-stone-gold/20 tracking-tight block mb-3" aria-hidden="true">{step.num}</span>
            <h3 className="text-[15px] text-vein-white font-medium tracking-tight mb-2">{step.title}</h3>
            <p className="text-[12px] text-cool-gray leading-relaxed font-light">{step.desc}</p>
          </div></Reveal>)}
        </div>
      </div>
    </section></Reveal>
  );
}

/* ── PORTFOLIO ── */
const stoneTypes = [
  { name: 'Quartz', accent: '#C9A96E', swatch: 'linear-gradient(135deg, #f5f0ea 0%, #e8ddd0 40%, #c9bfb0 60%, #f5f0ea 100%)', link: '/stones/engineered-quartz', images: [
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1600&auto=format&fit=crop', label: 'Calacatta Quartz — Kitchen Island' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop', label: 'White Quartz — Bathroom Vanity' },
    { src: 'https://images.unsplash.com/photo-1600585154526-990dced4ea0d?q=80&w=1600&auto=format&fit=crop', label: 'Quartz — Waterfall Edge Detail' },
    { src: 'https://images.unsplash.com/photo-1600573472556-e636c2acda9e?q=80&w=1600&auto=format&fit=crop', label: 'Quartz — Full-Height Backsplash' },
  ]},
  { name: 'Granite', accent: '#8A8A8A', swatch: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #3a3530 60%, #1a1a2e 100%)', link: '/stones/natural-granite', images: [
    { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop', label: 'Black Galaxy Granite — Modern Kitchen' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop', label: 'White Ice Granite — Open Layout' },
    { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop', label: 'Leathered Granite — Rustic Kitchen' },
    { src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1600&auto=format&fit=crop', label: 'Santa Cecilia Granite — Traditional' },
  ]},
  { name: 'Marble', accent: '#D4BA8A', swatch: 'linear-gradient(135deg, #faf6f0 0%, #e8dfd0 30%, #c5a96e 50%, #faf6f0 70%)', link: '/stones/marble', images: [
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop', label: 'Calacatta Gold — Luxury Kitchen' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop', label: 'Carrara White — Master Bath' },
    { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1600&auto=format&fit=crop', label: 'Statuario — Spa Bathroom' },
    { src: 'https://images.unsplash.com/photo-1600573472556-e636c2acda9e?q=80&w=1600&auto=format&fit=crop', label: 'Emperador Dark — Bar Top' },
  ]},
  { name: 'Quartzite', accent: '#B87333', swatch: 'linear-gradient(135deg, #f5efe5 0%, #e2d5c0 30%, #c8b79a 50%, #f5efe5 100%)', link: '/stones/quartzite', images: [
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop', label: 'Taj Mahal Quartzite — Open Kitchen' },
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1600&auto=format&fit=crop', label: 'Super White Quartzite — Minimal Kitchen' },
    { src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1600&auto=format&fit=crop', label: 'Fusion Quartzite — Statement Island' },
    { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop', label: 'Taj Mahal Quartzite — Breakfast Bar' },
  ]},
  { name: 'Porcelain', accent: '#8A8A8A', swatch: 'linear-gradient(135deg, #a09890 0%, #8c8480 40%, #787070 60%, #a09890 100%)', link: '/stones/porcelain', images: [
    { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop', label: 'Concrete Porcelain — Modern Kitchen' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop', label: 'Marble-Look Porcelain — Kitchen' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop', label: 'Porcelain — Bathroom Counter' },
    { src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop', label: 'Porcelain — Outdoor Kitchen' },
  ]},
  { name: 'Soapstone', accent: '#8A8A8A', swatch: 'linear-gradient(135deg, #5a5a5a 0%, #4a4a4a 40%, #3a3a3a 60%, #5a5a5a 100%)', link: '/stones/soapstone-onyx', images: [
    { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop', label: 'Classic Soapstone — Farmhouse Kitchen' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop', label: 'Backlit Onyx — Luxury Bar' },
    { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1600&auto=format&fit=crop', label: 'Soapstone — Bathroom Vanity' },
    { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop', label: 'Onyx — Reception Desk' },
  ]},
];

function Portfolio() {
  const [activeStone, setActiveStone] = useState(0);
  const active = stoneTypes[activeStone];
  return (
    <Reveal><section id="work" aria-labelledby="portfolio-heading" className="py-28 md:py-36 bg-obsidian overflow-hidden">
      <div className="px-6 lg:px-10 mb-8 max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div><p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Portfolio</p><h2 id="portfolio-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight">See it in your space.</h2></div>
          <Link to={active.link} className="hidden md:inline-flex items-center gap-1 text-[12px] text-stone-gold font-medium hover:text-stone-gold-light transition-colors">Explore {active.name} guide <ArrowUpRight size={12} /></Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar" role="group">
          {stoneTypes.map((stone, idx) => <button key={stone.name} onClick={() => setActiveStone(idx)} aria-pressed={idx === activeStone}
            className={`flex flex-col items-center gap-2 px-4 py-3 rounded-[12px] border-2 transition-all duration-500 min-w-[90px] flex-shrink-0 ${idx === activeStone ? 'border-stone-gold/40 bg-granite' : 'border-transparent hover:border-stone-gold/15 hover:bg-granite/50'}`}>
            <div className="w-14 h-14 rounded-[8px] shadow-md transition-transform duration-300" style={{ background: stone.swatch, transform: idx === activeStone ? 'scale(1.08)' : 'scale(1)' }} />
            <span className={`text-[11px] font-medium tracking-wide ${idx === activeStone ? 'text-vein-white' : 'text-cool-gray'}`}>{stone.name}</span>
          </button>)}
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto px-6 lg:px-10 pb-6 snap-x no-scrollbar">
        {active.images.map((img, idx) => <figure key={`${activeStone}-${idx}`} className="w-[85vw] md:w-[55vw] lg:w-[40vw] flex-shrink-0 snap-start group" style={{ animation: 'fadeSlideIn 0.5s ease forwards', animationDelay: `${idx * 0.1}s`, opacity: 0 }}>
          <div className="aspect-[16/10] overflow-hidden bg-granite rounded-[12px] mb-4 border border-stone-gold/10"><img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out brightness-[0.85]" loading="lazy" /></div>
          <figcaption className="text-[12px] text-cool-gray font-light tracking-wide">{img.label}</figcaption>
        </figure>)}
      </div>
      <div className="md:hidden px-6 mt-4 text-center"><Link to={active.link} className="inline-flex items-center gap-1 text-[12px] text-stone-gold font-medium hover:text-stone-gold-light transition-colors">Explore full {active.name} guide <ArrowUpRight size={12} /></Link></div>
    </section></Reveal>
  );
}

/* ── VISIT + CONTACT ── */
function Visit() {
  const [clientType, setClientType] = useState('Homeowner');
  const [location, setLocation] = useState('Rogers');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const locations = [
    { name: 'Northwest Arkansas', city: 'Rogers', badge: 'New', address: '1706 Commerce Dr, Rogers, AR 72756', phone: '(479) 900-9119', hours: 'Mon–Fri 8am–5pm · Sat by appointment', features: ['18,700 sq ft facility', 'Premium slab gallery', 'Expert design team'], img: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1600&auto=format&fit=crop' },
    { name: 'Central Arkansas', city: 'Bryant', badge: 'Flagship', address: '26096 Interstate 30, Bryant, AR 72022', phone: '(501) 481-8117', hours: 'Mon–Fri 8am–5pm · Sat by appointment', features: ['5,000+ sq ft showroom', 'On-site fabrication', 'Sasso-Lux technology center'], img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop' },
  ];
  return (
    <section className="bg-obsidian">
      <div id="showrooms" className="py-28 md:py-36 px-6 lg:px-10 bg-granite/30 border-t border-stone-gold/10">
        <div className="max-w-[1440px] mx-auto">
          <Reveal><div className="text-center mb-16 md:mb-20"><p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Showrooms</p><h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight mb-4">Two locations. One standard.</h2><p className="text-[15px] text-cool-gray font-light max-w-md mx-auto">See it. Touch it. Choose it. Visit a showroom to experience our stone selection firsthand.</p></div></Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {locations.map((loc, idx) => <Reveal key={idx} delay={idx + 1}><article className="border border-stone-gold/10 rounded-[12px] overflow-hidden group hover:border-stone-gold/25 transition-all duration-500 bg-granite">
              <div className="aspect-[16/9] overflow-hidden bg-obsidian"><img src={loc.img} alt={`${loc.name} showroom`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1500ms] brightness-[0.75]" loading="lazy" /></div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4"><h3 className="font-display text-[22px] text-vein-white font-medium tracking-tight">{loc.name}</h3><span className={`font-mono text-[9px] font-medium tracking-[3px] uppercase px-3 py-0.5 rounded-[6px] ${loc.badge === 'New' ? 'bg-stone-gold/10 text-stone-gold border border-stone-gold/20' : 'bg-white/5 text-cool-gray border border-white/10'}`}>{loc.badge}</span></div>
                <address className="not-italic space-y-3 mb-6">
                  <div className="flex items-start gap-3"><MapPin size={14} className="text-stone-gold/60 mt-0.5 flex-shrink-0" /><span className="text-[13px] text-cool-gray font-light">{loc.address}</span></div>
                  <div className="flex items-center gap-3"><Phone size={14} className="text-stone-gold/60 flex-shrink-0" /><a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`} className="text-[13px] text-vein-white font-medium hover:text-stone-gold transition-colors">{loc.phone}</a></div>
                  <div className="flex items-center gap-3"><Clock size={14} className="text-stone-gold/60 flex-shrink-0" /><span className="text-[13px] text-cool-gray font-light">{loc.hours}</span></div>
                </address>
                <div className="flex flex-wrap gap-2 mb-8">{loc.features.map((f, i) => <span key={i} className="text-[11px] text-cool-gray font-light border border-stone-gold/10 rounded-[6px] px-3 py-1">{f}</span>)}</div>
                <PillButton href="#contact">Schedule a visit <ArrowRight size={14} className="ml-2" /></PillButton>
              </div>
            </article></Reveal>)}
          </div>
        </div>
      </div>
      <Reveal><div id="contact" className="py-28 md:py-36 px-6 lg:px-10 bg-obsidian border-t border-stone-gold/10">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16"><p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Contact</p><h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-vein-white tracking-tight leading-tight">Tell us about<br />your project.</h2></div>
          {formStatus === 'success' ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-stone-gold/10 border border-stone-gold/20 flex items-center justify-center mx-auto mb-6"><Star size={28} className="text-stone-gold" /></div>
              <h3 className="font-display text-[28px] text-vein-white font-light tracking-tight mb-4">Thank you!</h3>
              <p className="text-[16px] text-cool-gray font-light leading-relaxed max-w-md mx-auto mb-8">We've received your inquiry and will get back to you within one business day. In the meantime, feel free to call us directly.</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a href="tel:+14799009119" className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] text-[13px] font-medium border border-stone-gold/25 text-cool-gray hover:border-stone-gold/50 hover:text-vein-white transition-all duration-500"><Phone size={14} /> (479) 900-9119</a>
                <a href="tel:+15014818117" className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] text-[13px] font-medium border border-stone-gold/25 text-cool-gray hover:border-stone-gold/50 hover:text-vein-white transition-all duration-500"><Phone size={14} /> (501) 481-8117</a>
              </div>
            </div>
          ) : (
          <form className="flex flex-col gap-8" onSubmit={(e) => { e.preventDefault(); setFormStatus('submitting'); const form = e.currentTarget; const formData = new FormData(form); formData.append('clientType', clientType); formData.append('preferredLocation', location); fetch('https://formsubmit.co/ajax/info@countertopworldar.com', { method: 'POST', body: formData }).then(() => { setFormStatus('success'); form.reset(); }).catch(() => { setFormStatus('success'); form.reset(); }); }}>
            <fieldset className="flex flex-col gap-3 border-none p-0"><legend className="text-[12px] text-cool-gray font-light tracking-wide">I am a:</legend>
              <div className="flex flex-wrap gap-3" role="radiogroup">{['Homeowner', 'Builder / Contractor', 'Designer / Architect'].map((type) => <button key={type} type="button" role="radio" aria-checked={clientType === type} onClick={() => setClientType(type)} className={`px-5 py-2.5 rounded-[6px] text-[13px] tracking-wide transition-all duration-500 border ${clientType === type ? 'border-stone-gold bg-stone-gold text-obsidian' : 'border-stone-gold/20 text-cool-gray hover:border-stone-gold/40 hover:text-vein-white'}`}>{type}</button>)}</div>
            </fieldset>
            <fieldset className="flex flex-col gap-3 border-none p-0"><legend className="text-[12px] text-cool-gray font-light tracking-wide">Preferred showroom:</legend>
              <div className="flex gap-3" role="radiogroup">{['Rogers', 'Bryant'].map((loc) => <button key={loc} type="button" role="radio" aria-checked={location === loc} onClick={() => setLocation(loc)} className={`px-5 py-2.5 rounded-[6px] text-[13px] tracking-wide transition-all duration-500 border ${location === loc ? 'border-stone-gold bg-stone-gold text-obsidian' : 'border-stone-gold/20 text-cool-gray hover:border-stone-gold/40 hover:text-vein-white'}`}>{loc === 'Rogers' ? 'Rogers / NWA' : 'Bryant / Little Rock'}</button>)}</div>
            </fieldset>
            <div className="flex flex-col md:flex-row gap-8"><div className="w-full"><label htmlFor="name" className="sr-only">Name</label><input id="name" name="name" type="text" placeholder="Name" required className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div><div className="w-full"><label htmlFor="phone" className="sr-only">Phone</label><input id="phone" name="phone" type="tel" placeholder="Phone" className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div></div>
            <div><label htmlFor="email" className="sr-only">Email</label><input id="email" name="email" type="email" placeholder="Email" required className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
            <div><label htmlFor="scope" className="sr-only">Project scope</label><input id="scope" name="scope" type="text" placeholder="Project scope (e.g., Kitchen remodel, new build, commercial)" className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
            <div><label htmlFor="details" className="sr-only">Project details</label><textarea id="details" name="details" placeholder="Tell us more about your project..." rows={3} className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500 resize-none" /></div>
            <div className="mt-4 text-center"><PillButton gold size="lg">{formStatus === 'submitting' ? 'Sending…' : 'Submit inquiry'}</PillButton></div>
          </form>
          )}
        </div>
      </div></Reveal>
    </section>
  );
}

/* ── FOOTER ── */
function SiteFooter() {
  return (
    <footer className="py-20 px-6 lg:px-10 bg-granite border-t border-stone-gold/10" role="contentinfo">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
          <div className="max-w-sm">
            <span className="font-display text-[20px] font-medium tracking-tight text-stone-gold block mb-4">Countertop World</span>
            <p className="text-[13px] text-cool-gray font-light leading-relaxed mb-4">Arkansas' largest stone fabrication studio. Laser-measured. CNC-machined. Hand-finished. Family-owned since 2016.</p>
            <p className="font-mono text-[11px] text-cool-gray tracking-[3px] uppercase mb-4">Strength. Set in Stone.</p>
            <a href="https://countertopworldar.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] text-stone-gold font-medium hover:text-stone-gold-light transition-colors">countertopworldar.com <ArrowUpRight size={12} /></a>
          </div>
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 text-[13px] font-light text-cool-gray">
            <address className="not-italic"><h4 className="font-mono text-stone-gold/80 font-medium mb-4 text-[10px] tracking-[3px] uppercase">Northwest Arkansas</h4><p className="mb-1">1706 Commerce Dr</p><p className="mb-3">Rogers, AR 72756</p><a href="tel:+14799009119" className="text-vein-white font-medium hover:text-stone-gold transition-colors">(479) 900-9119</a></address>
            <address className="not-italic"><h4 className="font-mono text-stone-gold/80 font-medium mb-4 text-[10px] tracking-[3px] uppercase">Central Arkansas</h4><p className="mb-1">26096 Interstate 30</p><p className="mb-3">Bryant, AR 72022</p><a href="tel:+15014818117" className="text-vein-white font-medium hover:text-stone-gold transition-colors">(501) 481-8117</a></address>
            <div><h4 className="font-mono text-stone-gold/80 font-medium mb-4 text-[10px] tracking-[3px] uppercase">Hours</h4><p className="mb-1">Monday – Friday</p><p className="mb-1">8:00 am – 5:00 pm</p><p className="mt-3">Saturday by appt</p></div>
          </div>
        </div>
        <div className="pt-8 border-t border-stone-gold/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-cool-gray font-light">
          <p>&copy; {new Date().getFullYear()} Countertop World, LLC. All rights reserved.</p>
          <div className="flex items-center gap-6"><span>BBB Accredited</span><span className="text-stone-gold/30">·</span><span>4.5 ★ · 109+ Reviews</span><span className="text-stone-gold/30">·</span><span>Precision guaranteed.</span></div>
        </div>
      </div>
    </footer>
  );
}

/* ── HOME PAGE ── */
function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian antialiased">
      <SkipLink /><GlassNav />
      <main id="main-content"><Hero /><About /><ChapterDivider /><Materials /><ChapterDivider label="tailored for you" /><WhoWeServe /><ChapterDivider /><Process /><Portfolio /><ChapterDivider label="come see us" /><Visit /></main>
      <SiteFooter />
      <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center z-50 md:hidden pointer-events-none" aria-hidden="true"><div className="bg-obsidian/70 backdrop-blur-2xl border border-stone-gold/15 shadow-lg shadow-black/20 rounded-[6px] p-1 pointer-events-auto"><PillButton href="#contact" gold>Get a Free Estimate</PillButton></div></div>
    </div>
  );
}

/* ── 404 PAGE ── */
function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian antialiased flex flex-col items-center justify-center px-6 text-center">
      <MarbleVeins />
      <span className="font-display text-[120px] font-light text-stone-gold/20 leading-none tracking-tighter mb-4">404</span>
      <h1 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-light text-vein-white tracking-tight mb-4">Page not found.</h1>
      <p className="text-[16px] text-cool-gray font-light leading-relaxed max-w-md mb-10">The surface you're looking for doesn't exist. Let's get you back to solid ground.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <PillButton href="/" gold>Back to home</PillButton>
        <PillButton href="/#materials">Browse materials</PillButton>
      </div>
    </div>
  );
}

/* ── APP ROUTER ── */
export default function App() {
  return (
    <BrowserRouter><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stones/engineered-quartz" element={<EngineeredQuartzPage />} />
      <Route path="/stones/natural-granite" element={<NaturalGranitePage />} />
      <Route path="/stones/marble" element={<MarblePage />} />
      <Route path="/stones/quartzite" element={<QuartzitePage />} />
      <Route path="/stones/porcelain" element={<PorcelainPage />} />
      <Route path="/stones/soapstone-onyx" element={<SoapstoneOnyxPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes></BrowserRouter>
  );
}
