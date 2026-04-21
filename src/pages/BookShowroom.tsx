import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';

// Two GoHighLevel calendar widgets — one per showroom. Calendar IDs are
// pulled from the CW GHL sub-account (calendars "Central Arkansas |
// Showroom Consultation" and "Rogers (NWA) Showroom Consultation").
const CALENDARS = {
  bryant: {
    id: '7ITzPxNAzfzVzHoYDm5G',
    label: 'Bryant · Central Arkansas',
    address: '26096 Interstate 30, Bryant, AR 72022',
    hours: 'By appointment — books directly with David',
  },
  rogers: {
    id: 'nr2uPqa8ofKqFcSXjhsN',
    label: 'Rogers · Northwest Arkansas',
    address: '1706 Commerce Dr, Rogers, AR 72756',
    hours: 'By appointment — books directly with David',
  },
} as const;

type Location = keyof typeof CALENDARS;

export default function BookShowroom() {
  const [active, setActive] = useState<Location>('bryant');

  useEffect(() => {
    document.title = 'Book a Showroom Visit — Countertop World';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Schedule a showroom visit at Countertop World in Bryant or Rogers, Arkansas. Pick a time that works — no phone tag.',
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const cal = CALENDARS[active];

  return (
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

        <div className="flex flex-wrap gap-3 mb-8" role="tablist" aria-label="Choose a location">
          {(Object.keys(CALENDARS) as Location[]).map((key) => {
            const c = CALENDARS[key];
            const isActive = active === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(key)}
                className={`px-5 py-2.5 rounded-[6px] text-[13px] tracking-wide transition-all duration-500 border ${
                  isActive
                    ? 'border-stone-gold bg-stone-gold text-obsidian'
                    : 'border-stone-gold/20 text-cool-gray hover:border-stone-gold/40 hover:text-vein-white'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

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
            src={`https://api.leadconnectorhq.com/widget/booking/${cal.id}`}
            title={`Book a visit at ${cal.label}`}
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
  );
}
