import { useEffect, useState, useCallback, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from './SiteFooter';
import {
  ArrowLeft, ArrowRight, MapPin, Clock, Phone, Star,
  Shield, Gem, Ruler, ChevronDown,
} from 'lucide-react';
import { applyPageHead } from '../lib/pageHead';
import { getAttribution } from '../lib/attribution';
import { trackLead } from '../lib/tracking';
import { useReveal } from '../hooks/useReveal';
import type { CityPageData } from '../data/cityPages';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal(0.12);
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${delayClass} ${className}`}>{children}</div>;
}

const materials = [
  { name: 'Engineered Quartz', tag: 'Most Popular', link: '/stones/engineered-quartz', img: '/materials/engineered-quartz.webp' },
  { name: 'Natural Granite', tag: 'Timeless', link: '/stones/natural-granite', img: '/materials/natural-granite.webp' },
  { name: 'Marble', tag: 'Luxury', link: '/stones/marble', img: '/materials/marble.webp' },
  { name: 'Quartzite', tag: 'Premium', link: '/stones/quartzite', img: '/materials/quartzite.webp' },
  { name: 'Porcelain', tag: 'Modern', link: '/stones/porcelain', img: '/materials/porcelain.webp' },
  { name: 'Soapstone & Onyx', tag: 'Exotic', link: '/stones/soapstone-onyx', img: '/materials/onyx.webp' },
];

const steps = [
  { num: '01', title: 'Visit the showroom.', desc: 'Stop by and see 1,000+ slabs in person. Tell us what you need.' },
  { num: '02', title: 'Pick your slab.', desc: 'Choose the exact stone that goes in your kitchen. New inventory weekly.' },
  { num: '03', title: 'We measure.', desc: 'Laser-scan your space for a perfect fit. About 30 minutes.' },
  { num: '04', title: 'We cut and finish.', desc: 'CNC saws and Sasso-Lux finishing. Everything in-house.' },
  { num: '05', title: 'We install.', desc: 'Our crew handles the install and cleanup. One day for most kitchens.' },
];

export default function CityPageLayout({ data }: { data: CityPageData }) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const cleanupHead = applyPageHead({
      title: data.metaTitle,
      description: data.metaDescription,
      path: `/areas/${data.slug}`,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Service Areas', path: '/areas' },
        { name: data.cityName, path: `/areas/${data.slug}` },
      ],
    });

    const existingFaq = document.getElementById('city-faq-schema');
    if (existingFaq) existingFaq.remove();
    const faqScript = document.createElement('script');
    faqScript.id = 'city-faq-schema';
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
    document.head.appendChild(faqScript);

    const existingSvc = document.getElementById('city-service-schema');
    if (existingSvc) existingSvc.remove();
    const svcScript = document.createElement('script');
    svcScript.id = 'city-service-schema';
    svcScript.type = 'application/ld+json';
    svcScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Countertop Fabrication and Installation in ${data.cityName}, Arkansas`,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Countertop World',
        telephone: data.nearestShowroom.phone,
        url: `https://countertopworldar.com/areas/${data.slug}`,
      },
      serviceType: 'Stone Countertop Fabrication and Installation',
      areaServed: {
        '@type': 'City',
        name: data.cityName,
        containedInPlace: { '@type': 'State', name: 'Arkansas' },
      },
    });
    document.head.appendChild(svcScript);

    return () => {
      cleanupHead();
      faqScript.remove();
      svcScript.remove();
    };
  }, [data]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('clientType', 'Homeowner');
    formData.append('preferredLocation', data.region === 'nwa' ? 'Rogers' : 'Bryant');
    formData.append('source_city', data.cityName);
    const attr = getAttribution();
    for (const [k, v] of Object.entries(attr)) {
      if (v) formData.append(k, v);
    }
    formData.append('landing_path', window.location.pathname + window.location.search);
    fetch('/api/lead', { method: 'POST', body: formData })
      .then(() => { trackLead(); setFormStatus('success'); form.reset(); })
      .catch(() => { trackLead(); setFormStatus('success'); form.reset(); });
  }, [data]);

  const benefits = [
    { Icon: Gem, title: `1,000+ slabs on-site.`, desc: `Visit the showroom and pick the exact slab that goes in your ${data.cityName} kitchen. New inventory arrives weekly.` },
    { Icon: Ruler, title: 'Laser-measured fit.', desc: 'We laser-scan your counters so the stone fits perfectly. No shimming, no gaps, no callbacks.' },
    { Icon: Shield, title: '100% in-house.', desc: 'Every cut, every finish, every install is done by our crew. No subcontractors at any stage.' },
    { Icon: Star, title: 'BBB A+ accredited.', desc: '109+ verified reviews and a 4.4-star rating. We stand behind every install.' },
  ];

  return (
    <div className="min-h-screen bg-obsidian antialiased">
      <nav className="fixed top-0 inset-x-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10 px-6 h-14 flex items-center justify-between" aria-label="Site navigation">
        <Link to="/" className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline">Countertop World</Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hidden md:flex items-center gap-1.5 text-[13px] text-cool-gray hover:text-vein-white transition-colors no-underline">
            <ArrowLeft size={16} /> Home
          </Link>
          <Link to="/book" className="inline-flex items-center gap-1.5 px-5 py-2 rounded-[6px] text-[12px] font-medium tracking-wide bg-stone-gold text-obsidian hover:bg-stone-gold-light transition-all duration-500 no-underline">Book a visit</Link>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero */}
        <section aria-labelledby="city-hero" className="relative pt-28 pb-20 md:pb-28 px-6 lg:px-10 overflow-hidden bg-obsidian">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,169,110,0.04) 0%, transparent 70%)' }} />
          <div className="max-w-[1100px] mx-auto z-10 relative">
            <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Service Area</p>
            <h1 id="city-hero" className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-light text-vein-white tracking-tighter leading-[1.05] mb-6">
              Countertops in {data.cityName},<br /><span className="font-semibold text-stone-gold">Arkansas.</span>
            </h1>
            <p className="text-[17px] md:text-[19px] text-cool-gray font-light leading-relaxed max-w-2xl mb-8">
              {data.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[6px] text-[14px] font-medium bg-stone-gold text-obsidian hover:bg-stone-gold-light transition-all duration-500 no-underline">
                Schedule a visit <ArrowRight size={14} />
              </Link>
              <a href={`tel:${data.nearestShowroom.phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[6px] text-[14px] font-medium border border-stone-gold/25 text-cool-gray hover:border-stone-gold/50 hover:text-vein-white transition-all duration-500 no-underline">
                <Phone size={14} /> {data.nearestShowroom.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Local Context */}
        <Reveal>
          <section className="py-20 md:py-28 px-6 lg:px-10 bg-granite/50 border-y border-stone-gold/10">
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              <div className="lg:col-span-3">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Local Service</p>
                <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-light text-vein-white tracking-tight leading-tight mb-6">
                  Serving {data.cityName} homeowners and builders.
                </h2>
                <p className="text-[16px] text-cool-gray font-light leading-relaxed">{data.localContext}</p>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-obsidian rounded-[12px] border border-stone-gold/10 p-6">
                  <h3 className="font-mono text-[10px] text-stone-gold tracking-[3px] uppercase font-medium mb-4">Nearest Showroom</h3>
                  <p className="text-[15px] text-vein-white font-medium mb-4">{data.nearestShowroom.name}</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-stone-gold/60 mt-0.5 flex-shrink-0" />
                      <span className="text-[13px] text-cool-gray font-light">{data.nearestShowroom.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={14} className="text-stone-gold/60 flex-shrink-0" />
                      <a href={`tel:${data.nearestShowroom.phone.replace(/[^0-9]/g, '')}`} className="text-[13px] text-vein-white font-medium hover:text-stone-gold transition-colors">{data.nearestShowroom.phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-stone-gold/60 flex-shrink-0" />
                      <span className="text-[13px] text-cool-gray font-light">{data.nearestShowroom.hours}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-stone-gold/10">
                    <span className="font-mono text-[10px] text-cool-gray tracking-[2px] uppercase">From {data.cityName}: {data.driveTime}</span>
                  </div>
                  <div className="mt-4 rounded-[8px] overflow-hidden border border-stone-gold/10">
                    <iframe
                      title={`${data.nearestShowroom.name} map`}
                      src={`https://www.google.com/maps?q=${data.nearestShowroom.mapQuery}&output=embed`}
                      width="100%"
                      height="160"
                      style={{ border: 0, filter: 'brightness(0.8) contrast(1.1)' }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Benefits */}
        <Reveal>
          <section aria-labelledby="benefits-heading" className="py-24 md:py-32 px-6 lg:px-10 bg-obsidian">
            <div className="max-w-[1100px] mx-auto">
              <div className="max-w-2xl mb-14">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Why Us</p>
                <h2 id="benefits-heading" className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-light text-vein-white tracking-tight leading-tight">
                  Why {data.cityName} homeowners choose Countertop World.
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((b, i) => (
                  <Reveal key={i} delay={i + 1}>
                    <div className="bg-granite rounded-[12px] p-7 border border-stone-gold/10 hover:border-stone-gold/25 transition-all duration-500">
                      <div className="w-10 h-10 rounded-[8px] border border-stone-gold/15 bg-obsidian flex items-center justify-center mb-5">
                        <b.Icon size={18} className="text-stone-gold" />
                      </div>
                      <h3 className="text-[16px] text-vein-white font-medium tracking-tight mb-2">{b.title}</h3>
                      <p className="text-[13px] text-cool-gray font-light leading-relaxed">{b.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Materials */}
        <Reveal>
          <section aria-labelledby="city-materials" className="py-24 md:py-32 px-6 lg:px-10 bg-granite/50 border-y border-stone-gold/10">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-center mb-14">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Materials</p>
                <h2 id="city-materials" className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-light text-vein-white tracking-tight mb-4">Every major stone type. In stock.</h2>
                <p className="text-[15px] text-cool-gray font-light max-w-md mx-auto">Visit the showroom to pick your exact slab. New shipments arrive every week.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-stone-gold/15 rounded-[12px] overflow-hidden">
                {materials.map((mat, idx) => (
                  <Link key={idx} to={mat.link} className="bg-granite group hover:bg-elevated transition-all duration-500 no-underline">
                    <div className="aspect-[4/3] overflow-hidden bg-obsidian">
                      <img src={mat.img} alt={mat.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out" />
                    </div>
                    <div className="p-4 md:p-5">
                      <span className="font-mono text-[9px] font-medium tracking-[3px] uppercase text-stone-gold">{mat.tag}</span>
                      <h3 className="text-[15px] text-vein-white font-medium tracking-tight mt-1 group-hover:translate-x-1 transition-transform duration-500">{mat.name}</h3>
                      <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-stone-gold/60 group-hover:text-stone-gold transition-colors duration-500">View guide <ArrowRight size={10} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Process */}
        <Reveal>
          <section aria-labelledby="city-process" className="py-24 md:py-32 px-6 lg:px-10 bg-obsidian">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-center mb-14">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Process</p>
                <h2 id="city-process" className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-light text-vein-white tracking-tight">From slab to installed in 5 steps.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {steps.map((step, idx) => (
                  <Reveal key={idx} delay={idx + 1}>
                    <div className="relative p-6 md:p-8 border-t md:border-t-0 md:border-l first:border-t-0 first:md:border-l-0 border-stone-gold/10">
                      <span className="font-display text-[36px] font-light text-stone-gold/20 tracking-tight block mb-3" aria-hidden="true">{step.num}</span>
                      <h3 className="text-[14px] text-vein-white font-medium tracking-tight mb-2">{step.title}</h3>
                      <p className="text-[12px] text-cool-gray leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section aria-labelledby="city-faq" className="py-24 md:py-32 px-6 lg:px-10 bg-granite/50 border-y border-stone-gold/10">
            <div className="max-w-[800px] mx-auto">
              <div className="text-center mb-14">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">FAQ</p>
                <h2 id="city-faq" className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-light text-vein-white tracking-tight">
                  Common questions from {data.cityName} homeowners.
                </h2>
              </div>
              <div>
                {data.faq.map((item, i) => (
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

        {/* Contact Form */}
        <Reveal>
          <section id="city-contact" aria-labelledby="city-contact-heading" className="py-24 md:py-32 px-6 lg:px-10 bg-obsidian border-t border-stone-gold/10">
            <div className="max-w-[800px] mx-auto">
              <div className="text-center mb-14">
                <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Get Started</p>
                <h2 id="city-contact-heading" className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-vein-white tracking-tight leading-tight">
                  Get a free estimate in {data.cityName}.
                </h2>
              </div>
              {formStatus === 'success' ? (
                <div className="text-center py-16 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-stone-gold/10 border border-stone-gold/20 flex items-center justify-center mx-auto mb-6"><Star size={28} className="text-stone-gold" /></div>
                  <h3 className="font-display text-[28px] text-vein-white font-light tracking-tight mb-4">Thank you!</h3>
                  <p className="text-[16px] text-cool-gray font-light leading-relaxed max-w-md mx-auto mb-8">We've received your inquiry and will get back to you within one business day.</p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <a href={`tel:${data.nearestShowroom.phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] text-[13px] font-medium border border-stone-gold/25 text-cool-gray hover:border-stone-gold/50 hover:text-vein-white transition-all duration-500 no-underline">
                      <Phone size={14} /> {data.nearestShowroom.phone}
                    </a>
                  </div>
                </div>
              ) : (
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="bg-granite/60 rounded-[12px] border border-stone-gold/10 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={14} className="text-stone-gold" />
                      <span className="font-mono text-[10px] text-stone-gold tracking-[3px] uppercase font-medium">{data.cityName}, Arkansas</span>
                    </div>
                    <p className="text-[12px] text-cool-gray font-light">This form is tagged for {data.cityName} — you'll be connected with our {data.region === 'nwa' ? 'Rogers' : 'Bryant'} team.</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full"><label htmlFor="c-name" className="sr-only">Name</label><input id="c-name" name="name" type="text" placeholder="Name" required className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                    <div className="w-full"><label htmlFor="c-phone" className="sr-only">Phone</label><input id="c-phone" name="phone" type="tel" placeholder="Phone" className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                  </div>
                  <div><label htmlFor="c-email" className="sr-only">Email</label><input id="c-email" name="email" type="email" placeholder="Email" required className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                  <div><label htmlFor="c-scope" className="sr-only">Project scope</label><input id="c-scope" name="scope" type="text" placeholder="Project scope (e.g., Kitchen remodel, new build, bathroom vanity)" className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500" /></div>
                  <div><label htmlFor="c-details" className="sr-only">Details</label><textarea id="c-details" name="details" placeholder="Tell us about your project..." rows={3} className="w-full bg-transparent border-b border-stone-gold/15 py-4 text-[15px] text-vein-white font-light placeholder:text-cool-gray/60 outline-none focus:border-stone-gold transition-colors duration-500 resize-none" /></div>
                  <div className="mt-4 text-center">
                    <button type="submit" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[6px] text-[14px] tracking-wide font-medium bg-stone-gold text-obsidian border border-stone-gold hover:bg-stone-gold-light transition-all duration-500">
                      {formStatus === 'submitting' ? 'Sending...' : 'Get my free estimate'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </Reveal>

        {/* Nearby Areas */}
        <section className="py-16 px-6 lg:px-10 bg-granite/30 border-t border-stone-gold/10">
          <div className="max-w-[1100px] mx-auto text-center">
            <p className="font-mono text-[10px] text-cool-gray tracking-[3px] uppercase mb-6">Also serving nearby</p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.nearbyAreas.map((area) => (
                <Link
                  key={area.slug}
                  to={`/areas/${area.slug}`}
                  className="px-5 py-2.5 rounded-[6px] text-[13px] tracking-wide border border-stone-gold/20 text-cool-gray hover:border-stone-gold/40 hover:text-vein-white transition-all duration-500 no-underline"
                >
                  {area.name}, AR
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center z-50 md:hidden pointer-events-none" aria-hidden="true">
        <div className="bg-obsidian/70 backdrop-blur-2xl border border-stone-gold/15 shadow-lg shadow-black/20 rounded-[6px] p-1 pointer-events-auto">
          <a href="#city-contact" onClick={e => { e.preventDefault(); document.getElementById('city-contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center justify-center px-6 py-3 rounded-[6px] text-[13px] tracking-wide font-medium bg-stone-gold text-obsidian border border-stone-gold hover:bg-stone-gold-light transition-all duration-500 no-underline">
            Get a Free Estimate
          </a>
        </div>
      </div>
    </div>
  );
}
