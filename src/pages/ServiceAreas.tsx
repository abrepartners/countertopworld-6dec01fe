import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { applyPageHead } from '../lib/pageHead';
import { cityPages } from '../data/cityPages';
import SiteFooter from '../components/SiteFooter';

const REGIONS = [
  {
    key: 'central' as const,
    name: 'Central Arkansas',
    showroom: 'Served from our Bryant showroom',
    address: '26096 Interstate 30, Bryant, AR 72022',
    phone: '(501) 481-8117',
    phoneHref: 'tel:+15014818117',
  },
  {
    key: 'nwa' as const,
    name: 'Northwest Arkansas',
    showroom: 'Served from our Rogers showroom',
    address: '1706 Commerce Dr, Rogers, AR 72756',
    phone: '(479) 900-9119',
    phoneHref: 'tel:+14799009119',
  },
];

const allCities = Object.values(cityPages);

export default function ServiceAreas() {
  useEffect(() => {
    return applyPageHead({
      title: 'Service Areas | Countertop World',
      description:
        'Countertop World installs granite, quartz, marble, and quartzite across Arkansas. Our Bryant showroom serves Little Rock, Conway, and Hot Springs. Our Rogers showroom serves Bentonville, Fayetteville, and Springdale.',
      path: '/areas',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Service Areas', path: '/areas' },
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-obsidian antialiased">
      <nav className="fixed top-0 inset-x-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10 px-6 h-14 flex items-center justify-between" aria-label="Site navigation">
        <Link to="/" className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline">Countertop World</Link>
        <Link to="/book" className="text-[13px] text-cool-gray hover:text-vein-white transition-colors no-underline">Book a Visit</Link>
      </nav>

      <header className="pt-24 pb-16 px-6 text-center bg-granite border-b border-stone-gold/10">
        <span className="inline-block font-mono text-[10px] tracking-[4px] uppercase text-stone-gold bg-stone-gold/10 border border-stone-gold/20 px-3.5 py-1 rounded-[6px] mb-4">Service Areas</span>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light tracking-tight text-vein-white mb-4">Where We Work</h1>
        <p className="text-[16px] text-cool-gray font-light max-w-[620px] mx-auto">Two showrooms, one crew, statewide reach. Our Bryant shop covers Central Arkansas and our Rogers shop covers Northwest Arkansas. Every countertop is measured, cut, and installed by our own team.</p>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-16">
        {REGIONS.map((region) => (
          <section key={region.key} className="mb-16 last:mb-0" aria-labelledby={`region-${region.key}`}>
            <div className="mb-8">
              <h2 id={`region-${region.key}`} className="font-display text-[clamp(1.4rem,3.5vw,2rem)] font-light tracking-tight text-vein-white mb-2">{region.name}</h2>
              <p className="text-[13px] text-cool-gray font-light flex flex-wrap items-center gap-x-2">
                <MapPin size={13} className="text-stone-gold flex-shrink-0" />
                <span>{region.showroom}: {region.address}</span>
                <span className="text-stone-gold/30">&middot;</span>
                <a href={region.phoneHref} className="text-vein-white font-medium hover:text-stone-gold transition-colors no-underline">{region.phone}</a>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allCities.filter((c) => c.region === region.key).map((city) => (
                <Link
                  key={city.slug}
                  to={`/areas/${city.slug}`}
                  className="group flex items-center justify-between gap-4 p-5 rounded-[8px] border border-stone-gold/10 hover:border-stone-gold/30 hover:bg-stone-gold/5 transition-all no-underline"
                >
                  <div>
                    <span className="block font-display text-[18px] font-light text-vein-white group-hover:text-stone-gold transition-colors">{city.cityName}, AR</span>
                    <span className="block text-[12px] text-cool-gray/70 font-light mt-1">{city.driveTime}</span>
                  </div>
                  <ArrowRight size={15} className="text-stone-gold/40 group-hover:text-stone-gold group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-16 text-center border-t border-stone-gold/10 pt-12">
          <p className="text-[14px] text-cool-gray font-light mb-6 max-w-[520px] mx-auto">Outside these cities? We install across the entire state of Arkansas. Tell us where you are and we will route you to the right showroom.</p>
          <Link to="/book" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[6px] text-[14px] tracking-wide font-medium bg-stone-gold text-obsidian border border-stone-gold hover:bg-stone-gold-light transition-all duration-500 no-underline">
            Book a showroom visit <ArrowRight size={14} />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
