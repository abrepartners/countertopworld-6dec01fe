import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';
import { applyPageHead } from '../lib/pageHead';
import { appendAttributionToUrl } from '../lib/attribution';

// GoHighLevel calendar widgets. Three options total — Bryant splits into a
// weekday round-robin and a Saturday-only calendar owned by David, since
// GHL can't do per-member day restrictions in a single round robin.
type CalConfig = {
  id: string;
  title: string;
  hours: string;
  address: string;
};

const CALENDARS = {
  bryant_weekday: {
    id: '7ITzPxNAzfzVzHoYDm5G',
    title: 'Weekdays · Team Consultation',
    hours: 'Mon–Fri 8am–5pm',
    address: '26096 Interstate 30, Bryant, AR 72022',
  },
  bryant_saturday: {
    id: 'lqA2vLmq9ao8E1vPdVt0',
    title: 'Saturday · With David',
    hours: 'Sat 9am–1pm',
    address: '26096 Interstate 30, Bryant, AR 72022',
  },
  rogers: {
    id: 'nr2uPqa8ofKqFcSXjhsN',
    title: 'Rogers · With David',
    hours: 'By appointment',
    address: '1706 Commerce Dr, Rogers, AR 72756',
  },
} as const satisfies Record<string, CalConfig>;

type Location = 'bryant' | 'rogers';
type BryantSub = 'bryant_weekday' | 'bryant_saturday';

export default function BookShowroom() {
  const [location, setLocation] = useState<Location>('bryant');
  const [bryantSub, setBryantSub] = useState<BryantSub>('bryant_weekday');

  useEffect(() => {
    const cleanup = applyPageHead({
      title: 'Book a Showroom Visit — Countertop World',
      description:
        'Schedule a showroom visit at Countertop World in Bryant or Rogers, Arkansas. Pick a time that works — no phone tag.',
      path: '/book',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Book a Visit', path: '/book' },
      ],
    });
    return cleanup;
  }, []);

  const activeKey = location === 'bryant' ? bryantSub : 'rogers';
  const cal = CALENDARS[activeKey];

  // Append captured marketing attribution (gclid, utm_*, fbclid, etc.) to the
  // GHL calendar widget URL. GHL stores these on the resulting contact/opportunity
  // which feeds Google Ads offline conversion import via GHL's native integration.
  const iframeSrc = useMemo(
    () => appendAttributionToUrl(`https://api.leadconnectorhq.com/widget/booking/${cal.id}`),
    [cal.id],
  );

  return (
    <>
    <main className="min-h-screen bg-obsidian text-vein-white">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[12px] font-mono text-stone-gold tracking-[3px] uppercase hover:text-stone-gold-light transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <header className="mb-12">
          <p className="font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4">Schedule</p>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light tracking-tight leading-[1.05] mb-6">
            Book a showroom visit.
          </h1>
          <p className="text-[17px] text-cool-gray font-light leading-relaxed max-w-2xl">
            Pick a time that works and one of our specialists will walk you through slabs, finishes, and edge profiles in person.
            Bring measurements, photos, or inspiration — the more we know, the better we can guide you.
          </p>
        </header>

        {/* Location tabs */}
        <div className="flex flex-wrap gap-3 mb-4" role="tablist" aria-label="Choose a location">
          {([
            { key: 'bryant', label: 'Bryant · Central Arkansas' },
            { key: 'rogers', label: 'Rogers · Northwest Arkansas' },
          ] as const).map((t) => {
            const isActive = location === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setLocation(t.key)}
                className={`px-5 py-2.5 rounded-[6px] text-[13px] tracking-wide transition-all duration-500 border ${
                  isActive
                    ? 'border-stone-gold bg-stone-gold text-obsidian'
                    : 'border-stone-gold/20 text-cool-gray hover:border-stone-gold/40 hover:text-vein-white'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Bryant day-of-week sub-tabs */}
        {location === 'bryant' && (
          <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Bryant visit type">
            {([
              { key: 'bryant_weekday' as const, label: 'Weekday visit' },
              { key: 'bryant_saturday' as const, label: 'Saturday appointment' },
            ]).map((t) => {
              const isActive = bryantSub === t.key;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setBryantSub(t.key)}
                  className={`px-4 py-2 rounded-[6px] text-[12px] tracking-wide transition-all duration-500 border ${
                    isActive
                      ? 'border-stone-gold/60 bg-stone-gold/10 text-vein-white'
                      : 'border-stone-gold/15 text-cool-gray hover:border-stone-gold/30 hover:text-vein-white'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        )}

        {location === 'rogers' && <div className="mb-8" />}

        <div className="mb-8 flex flex-col sm:flex-row gap-6 text-[13px] text-cool-gray font-light">
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} className="text-stone-gold/60" />
            {cal.address}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock size={14} className="text-stone-gold/60" />
            {cal.hours}
          </span>
        </div>

        <div className="rounded-lg border border-stone-gold/10 bg-granite/40 overflow-hidden">
          <iframe
            key={cal.id}
            src={iframeSrc}
            title={`Book — ${cal.title}`}
            loading="lazy"
            style={{ width: '100%', border: 'none', minHeight: '900px' }}
          />
        </div>

        <p className="mt-10 text-[12px] font-mono text-cool-gray tracking-[2px] uppercase text-center">
          Prefer to write first?{' '}
          <Link to="/#contact" className="text-stone-gold hover:text-stone-gold-light transition-colors">
            Send us a note instead
          </Link>
        </p>
      </div>
    </main>
    <SiteFooter />
    </>
  );
}
