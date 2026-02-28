import { useState, useCallback, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';

/* ── Types ──────────────────────────────────────────── */

export interface StoneCard { title: string; desc: string }
export interface GalleryImage { src: string; alt: string; caption: string }
export interface StoneVariety { name: string; swatch: string; images: GalleryImage[] }
export interface DecisionCard { type: 'yes' | 'maybe' | 'no'; title: string; items: string[] }
export interface FAQItem { question: string; answer: string }
export interface TableRow { cells: string[] }

export interface StonePageData {
  slug: string;
  tag: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  subtitle: string;
  stoneInterest: string;

  overview: {
    heading: string;
    intro: string;
    cards: StoneCard[];
    brandsTitle?: string;
    brandsText?: string;
  };

  care: {
    highlight: string;
    sections: { title: string; content: string | string[] }[];
    bottomHighlight?: string;
  };

  cost: {
    intro: string;
    factors: StoneCard[];
    tableHeaders: string[];
    tableRows: TableRow[];
    highlight: string;
    footnote?: string;
  };

  design: {
    intro: string;
    cards: StoneCard[];
    listTitle?: string;
    listItems?: string[];
    varieties: StoneVariety[];
  };

  fit: {
    heading: string;
    sections?: { title?: string; cards: DecisionCard[] }[];
    cards?: DecisionCard[];
    highlight: string;
  };

  faq: FAQItem[];
}

/* ── Sub-components ─────────────────────────────────── */

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="border-b border-gray-200">
          <button
            className="w-full text-left py-5 flex justify-between items-center gap-4 text-[15px] font-medium text-gray-800 hover:text-amber-700 transition-colors"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {item.question}
            <ChevronDown size={20} className={`text-gray-400 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180 text-amber-600' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-400 ${open === i ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
            <p className="text-[14px] text-gray-600 leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function VarietySelector({ varieties }: { varieties: StoneVariety[] }) {
  const [active, setActive] = useState(0);
  const v = varieties[active];
  return (
    <div>
      <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1" role="group" aria-label="Stone variety selector">
        {varieties.map((variety, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            aria-pressed={idx === active}
            className={`flex flex-col items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-400 min-w-[90px] shrink-0 ${idx === active ? 'border-amber-600/50 bg-amber-50/50 shadow-sm' : 'border-transparent hover:border-gray-200 hover:bg-gray-50'}`}
          >
            <div className="w-16 h-16 rounded-[10px] shadow-md transition-transform duration-300" style={{ background: variety.swatch, transform: idx === active ? 'scale(1.08)' : 'scale(1)' }} />
            <span className={`text-[11px] font-medium tracking-wide ${idx === active ? 'text-gray-800' : 'text-gray-500'}`}>{variety.name}</span>
          </button>
        ))}
      </div>
      <h3 className="text-[18px] font-semibold text-gray-800 mt-8 mb-3">See It In Your Space</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {v.images.map((img, idx) => (
          <figure key={`${active}-${idx}`} className="rounded-xl overflow-hidden aspect-[4/3] relative group" style={{ animation: 'fadeIn 0.5s ease forwards', animationDelay: `${idx * 0.1}s`, opacity: 0 }}>
            <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" />
            <figcaption className="absolute bottom-0 inset-x-0 px-3.5 py-2.5 bg-gradient-to-t from-black/60 to-transparent text-white text-[12px] font-light tracking-wide">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ── Reusable content blocks ────────────────────────── */

function Highlight({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-amber-50/80 to-amber-50/30 border-l-[3px] border-amber-500 px-6 py-5 rounded-r-xl my-6">
      <p className="text-[14px] text-gray-700 leading-relaxed m-0">{children}</p>
    </div>
  );
}

function InfoCards({ cards }: { cards: StoneCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-7">
      {cards.map((c, i) => (
        <div key={i} className="bg-amber-50/40 rounded-xl p-6 border border-amber-100/30">
          <h4 className="text-[15px] font-semibold text-gray-800 mb-2">{c.title}</h4>
          <p className="text-[14px] text-gray-600 leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

function DecisionGrid({ cards }: { cards: DecisionCard[] }) {
  const colors = {
    yes: { bg: 'bg-emerald-50/50', border: 'border-emerald-200/60', title: 'text-emerald-700' },
    maybe: { bg: 'bg-amber-50/50', border: 'border-amber-200/60', title: 'text-amber-700' },
    no: { bg: 'bg-red-50/50', border: 'border-red-200/60', title: 'text-red-700' },
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {cards.map((c, i) => {
        const s = colors[c.type];
        return (
          <div key={i} className={`p-6 rounded-xl border ${s.bg} ${s.border}`}>
            <h4 className={`text-[14px] font-semibold mb-2 ${s.title}`}>{c.title}</h4>
            <ul className="text-[14px] text-gray-600 space-y-2 list-disc pl-4">
              {c.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ── Tab keys ───────────────────────────────────────── */

type TabKey = 'overview' | 'care' | 'cost' | 'design' | 'fit' | 'faq';
const tabLabels: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'care', label: 'Care & Maintenance' },
  { key: 'cost', label: 'Cost Guide' },
  { key: 'design', label: 'Design Ideas' },
  { key: 'fit', label: 'Is It For You?' },
  { key: 'faq', label: 'FAQ' },
];

/* ── Main Layout ────────────────────────────────────── */

export default function StonePageLayout({ data }: { data: StonePageData }) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const keys = tabLabels.map(t => t.key);
    const idx = keys.indexOf(activeTab);
    let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { next = (idx + 1) % keys.length; e.preventDefault(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { next = (idx - 1 + keys.length) % keys.length; e.preventDefault(); }
    else if (e.key === 'Home') { next = 0; e.preventDefault(); }
    else if (e.key === 'End') { next = keys.length - 1; e.preventDefault(); }
    if (next !== idx) {
      setActiveTab(keys[next]);
      const tabs = tabListRef.current?.querySelectorAll('[role="tab"]');
      (tabs?.[next] as HTMLElement)?.focus();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06] px-6 h-14 flex items-center justify-between" aria-label="Site navigation">
        <Link to="/" className="text-[16px] font-semibold text-gray-800 tracking-tight no-underline">Countertop World</Link>
        <Link to="/#materials" className="flex items-center gap-1.5 text-[13px] text-gray-600 hover:text-gray-900 transition-colors no-underline">
          <ArrowLeft size={16} /> Back to Materials
        </Link>
      </nav>

      {/* Hero */}
      <header className="relative pt-24 pb-12 text-center overflow-hidden min-h-[340px] flex flex-col justify-center items-center" style={{ background: '#F7F3EE' }}>
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt={data.heroImageAlt} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(247,243,238,0.92) 0%, rgba(247,243,238,0.96) 100%)' }} />
        </div>
        <div className="relative z-10">
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-amber-700 font-semibold bg-amber-100/60 px-3.5 py-1 rounded-full mb-4">{data.tag}</span>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-light tracking-tight leading-tight mb-4 text-gray-800">{data.title}</h1>
          <p className="text-[clamp(15px,2vw,18px)] text-gray-600 max-w-[600px] mx-auto font-light leading-relaxed">{data.subtitle}</p>
        </div>
      </header>

      {/* Sticky Tabs */}
      <div className="sticky top-14 z-40 bg-white/92 backdrop-blur-lg border-b border-gray-200 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div ref={tabListRef} className="flex justify-center gap-0 px-4 min-w-max mx-auto" role="tablist" aria-label={`${data.title} guide sections`}>
          {tabLabels.map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              aria-selected={activeTab === key}
              aria-controls={`panel-${key}`}
              id={`tab-${key}`}
              tabIndex={activeTab === key ? 0 : -1}
              onClick={() => setActiveTab(key)}
              onKeyDown={handleKeyDown}
              className={`px-5 py-3.5 text-[13px] font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === key
                  ? 'text-gray-800 border-amber-500 font-semibold'
                  : 'text-gray-500 border-transparent hover:text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      <main className="max-w-[900px] mx-auto px-6 py-12 animate-fade-in" key={activeTab}>
        {activeTab === 'overview' && (
          <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-gray-800">{data.overview.heading}</h2>
            <p className="text-[15px] text-gray-600 font-light leading-relaxed mb-4">{data.overview.intro}</p>
            <InfoCards cards={data.overview.cards} />
            {data.overview.brandsTitle && <h3 className="text-[18px] font-semibold text-gray-800 mt-8 mb-3">{data.overview.brandsTitle}</h3>}
            {data.overview.brandsText && <p className="text-[15px] text-gray-600 font-light leading-relaxed">{data.overview.brandsText}</p>}
          </div>
        )}

        {activeTab === 'care' && (
          <div role="tabpanel" id="panel-care" aria-labelledby="tab-care">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-gray-800">Care & Maintenance</h2>
            <Highlight>{data.care.highlight}</Highlight>
            {data.care.sections.map((s, i) => (
              <div key={i}>
                <h3 className="text-[18px] font-semibold text-gray-800 mt-8 mb-3">{s.title}</h3>
                {typeof s.content === 'string' ? (
                  <p className="text-[15px] text-gray-600 font-light leading-relaxed">{s.content}</p>
                ) : (
                  <ul className="text-[15px] text-gray-600 font-light leading-relaxed space-y-2 list-disc pl-5">
                    {s.content.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: item }} />)}
                  </ul>
                )}
              </div>
            ))}
            {data.care.bottomHighlight && <Highlight>{data.care.bottomHighlight}</Highlight>}
          </div>
        )}

        {activeTab === 'cost' && (
          <div role="tabpanel" id="panel-cost" aria-labelledby="tab-cost">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-gray-800">Cost Guide</h2>
            <p className="text-[15px] text-gray-600 font-light leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: data.cost.intro }} />
            {data.cost.factors.length > 0 && (
              <>
                <h3 className="text-[18px] font-semibold text-gray-800 mt-8 mb-3">What Affects the Price</h3>
                <InfoCards cards={data.cost.factors} />
              </>
            )}
            <h3 className="text-[18px] font-semibold text-gray-800 mt-8 mb-3">How It Compares</h3>
            <div className="overflow-x-auto my-6 rounded-xl border border-gray-200">
              <table className="w-full text-[14px] border-collapse">
                <thead>
                  <tr>
                    {data.cost.tableHeaders.map((h, i) => (
                      <th key={i} className="bg-gray-800 text-white px-4 py-3 text-left font-medium text-[13px] tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.cost.tableRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                      {row.cells.map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-gray-600 border-b border-gray-100" dangerouslySetInnerHTML={{ __html: cell }} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.cost.footnote && <p className="text-[12px] text-gray-400 mt-2">{data.cost.footnote}</p>}
            <Highlight>{data.cost.highlight}</Highlight>
          </div>
        )}

        {activeTab === 'design' && (
          <div role="tabpanel" id="panel-design" aria-labelledby="tab-design">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-gray-800">Design Inspiration</h2>
            <p className="text-[15px] text-gray-600 font-light leading-relaxed mb-4">{data.design.intro}</p>
            <InfoCards cards={data.design.cards} />
            {data.design.listTitle && <h3 className="text-[18px] font-semibold text-gray-800 mt-8 mb-3">{data.design.listTitle}</h3>}
            {data.design.listItems && (
              <ul className="text-[15px] text-gray-600 font-light leading-relaxed space-y-2 list-disc pl-5 mb-8">
                {data.design.listItems.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
              </ul>
            )}
            {data.design.varieties.length > 0 && (
              <>
                <h3 className="text-[18px] font-semibold text-gray-800 mt-8 mb-3">Choose a Style</h3>
                <VarietySelector varieties={data.design.varieties} />
              </>
            )}
          </div>
        )}

        {activeTab === 'fit' && (
          <div role="tabpanel" id="panel-fit" aria-labelledby="tab-fit">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-gray-800">{data.fit.heading}</h2>
            {data.fit.sections ? (
              data.fit.sections.map((section, i) => (
                <div key={i}>
                  {section.title && <h3 className="text-[18px] font-semibold text-gray-800 mt-8 mb-3">{section.title}</h3>}
                  <DecisionGrid cards={section.cards} />
                </div>
              ))
            ) : data.fit.cards ? (
              <DecisionGrid cards={data.fit.cards} />
            ) : null}
            <Highlight>{data.fit.highlight}</Highlight>
          </div>
        )}

        {activeTab === 'faq' && (
          <div role="tabpanel" id="panel-faq" aria-labelledby="tab-faq">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-gray-800">Frequently Asked Questions</h2>
            <FAQAccordion items={data.faq} />
          </div>
        )}
      </main>

      {/* CTA */}
      <section className="bg-gray-800 text-white py-16 px-6 text-center">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-light mb-3">Get a free quote for {data.stoneInterest.toLowerCase()}</h2>
        <p className="text-white/70 text-[15px] mb-8 font-light">Tell us about your project and we'll get back to you within one business day.</p>
        <div className="flex justify-center gap-6 flex-wrap mb-8">
          <a href="tel:+15014818117" className="bg-white/10 border border-white/15 rounded-xl px-7 py-5 text-white no-underline hover:bg-white/20 transition-colors">
            <div className="text-[12px] tracking-[0.1em] uppercase opacity-60 mb-1">Bryant / Little Rock</div>
            <div className="text-[18px] font-medium">(501) 481-8117</div>
          </a>
          <a href="tel:+14799009119" className="bg-white/10 border border-white/15 rounded-xl px-7 py-5 text-white no-underline hover:bg-white/20 transition-colors">
            <div className="text-[12px] tracking-[0.1em] uppercase opacity-60 mb-1">Rogers / NWA</div>
            <div className="text-[18px] font-medium">(479) 900-9119</div>
          </a>
        </div>
        <Link to="/#contact" className="inline-flex items-center px-8 py-3.5 rounded-full bg-amber-600 text-white text-[14px] font-semibold tracking-wide hover:bg-amber-500 transition-colors no-underline">
          Request Free Quote
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 text-center text-[13px] text-gray-400" style={{ background: '#F7F3EE' }}>
        <p>&copy; {new Date().getFullYear()} Countertop World — Arkansas' Largest Stone Fabrication Studio</p>
        <p className="mt-2">
          <Link to="/" className="text-gray-600 no-underline hover:text-gray-900">Home</Link>
          {' · '}
          <Link to="/#materials" className="text-gray-600 no-underline hover:text-gray-900">All Materials</Link>
          {' · '}
          <Link to="/#showrooms" className="text-gray-600 no-underline hover:text-gray-900">Visit Us</Link>
        </p>
      </footer>
    </div>
  );
}
