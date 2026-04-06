import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
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

/* ── Sub-components (Mythic Dark) ─────────────────── */

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="border-b border-stone-gold/15">
          <button
            className="w-full text-left py-5 flex justify-between items-center gap-4 text-[15px] font-medium text-vein-white hover:text-stone-gold transition-colors"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {item.question}
            <ChevronDown size={20} className={`text-cool-gray shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180 text-stone-gold' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-400 ${open === i ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
            <p className="text-[14px] text-cool-gray leading-relaxed">{item.answer}</p>
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
            className={`flex flex-col items-center gap-2 px-4 py-2.5 rounded-[12px] border-2 transition-all duration-400 min-w-[90px] shrink-0 ${idx === active ? 'border-stone-gold/40 bg-stone-gold/5 shadow-sm' : 'border-transparent hover:border-stone-gold/15 hover:bg-white/[0.02]'}`}
          >
            <div className="w-16 h-16 rounded-[10px] shadow-md transition-transform duration-300" style={{ background: variety.swatch, transform: idx === active ? 'scale(1.08)' : 'scale(1)' }} />
            <span className={`text-[11px] font-medium tracking-wide ${idx === active ? 'text-vein-white' : 'text-cool-gray'}`}>{variety.name}</span>
          </button>
        ))}
      </div>
      <h3 className="font-display text-[20px] font-medium text-vein-white mt-8 mb-3">See It In Your Space</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {v.images.map((img, idx) => (
          <figure key={`${active}-${idx}`} className="rounded-[12px] overflow-hidden aspect-[4/3] relative group border border-stone-gold/10" style={{ animation: 'fadeIn 0.5s ease forwards', animationDelay: `${idx * 0.1}s`, opacity: 0 }}>
            <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover brightness-[0.85] group-hover:scale-[1.04] transition-transform duration-600" />
            <figcaption className="absolute bottom-0 inset-x-0 px-3.5 py-2.5 bg-gradient-to-t from-black/70 to-transparent text-vein-white text-[12px] font-light tracking-wide">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function Highlight({ children }: { children: ReactNode }) {
  return (
    <div className="bg-stone-gold/5 border-l-[3px] border-stone-gold px-6 py-5 rounded-r-[12px] my-6">
      <p className="text-[14px] text-cool-gray leading-relaxed m-0">{children}</p>
    </div>
  );
}

function InfoCards({ cards }: { cards: StoneCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-7">
      {cards.map((c, i) => (
        <div key={i} className="bg-granite rounded-[12px] p-6 border border-stone-gold/10">
          <h4 className="text-[15px] font-semibold text-vein-white mb-2">{c.title}</h4>
          <p className="text-[14px] text-cool-gray leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

function DecisionGrid({ cards }: { cards: DecisionCard[] }) {
  const colors = {
    yes: { bg: 'bg-emerald-900/20', border: 'border-emerald-700/30', title: 'text-emerald-400' },
    maybe: { bg: 'bg-stone-gold/5', border: 'border-stone-gold/20', title: 'text-stone-gold' },
    no: { bg: 'bg-red-900/20', border: 'border-red-700/30', title: 'text-red-400' },
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {cards.map((c, i) => {
        const s = colors[c.type];
        return (
          <div key={i} className={`p-6 rounded-[12px] border ${s.bg} ${s.border}`}>
            <h4 className={`text-[14px] font-semibold mb-2 ${s.title}`}>{c.title}</h4>
            <ul className="text-[14px] text-cool-gray space-y-2 list-disc pl-4">
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

/* ── Main Layout (Mythic Dark) ─────────────────────── */

export default function StonePageLayout({ data }: { data: StonePageData }) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = data.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', data.metaDescription);
    window.scrollTo(0, 0);
  }, [data.metaTitle, data.metaDescription]);

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
    <div className="min-h-screen bg-obsidian antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10 px-6 h-14 flex items-center justify-between" aria-label="Site navigation">
        <Link to="/" className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline">Countertop World</Link>
        <Link to="/#materials" className="flex items-center gap-1.5 text-[13px] text-cool-gray hover:text-vein-white transition-colors no-underline">
          <ArrowLeft size={16} /> Back to Materials
        </Link>
      </nav>

      {/* Hero */}
      <header className="relative pt-24 pb-12 text-center overflow-hidden min-h-[340px] flex flex-col justify-center items-center bg-granite">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt={data.heroImageAlt} className="w-full h-full object-cover brightness-[0.25] contrast-[1.1]" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian/80" />
        </div>
        <div className="relative z-10">
          <span className="inline-block font-mono text-[10px] tracking-[4px] uppercase text-stone-gold bg-stone-gold/10 border border-stone-gold/20 px-3.5 py-1 rounded-[6px] mb-4">{data.tag}</span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light tracking-tight leading-tight mb-4 text-vein-white">{data.title}</h1>
          <p className="text-[clamp(15px,2vw,18px)] text-cool-gray max-w-[600px] mx-auto font-light leading-relaxed">{data.subtitle}</p>
        </div>
      </header>

      {/* Sticky Tabs */}
      <div className="sticky top-14 z-40 bg-obsidian/92 backdrop-blur-lg border-b border-stone-gold/15 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
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
                  ? 'text-stone-gold border-stone-gold font-semibold'
                  : 'text-cool-gray border-transparent hover:text-vein-white'
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
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-vein-white">{data.overview.heading}</h2>
            <p className="text-[15px] text-cool-gray font-light leading-relaxed mb-4">{data.overview.intro}</p>
            <InfoCards cards={data.overview.cards} />
            {data.overview.brandsTitle && <h3 className="font-display text-[20px] font-medium text-vein-white mt-8 mb-3">{data.overview.brandsTitle}</h3>}
            {data.overview.brandsText && <p className="text-[15px] text-cool-gray font-light leading-relaxed">{data.overview.brandsText}</p>}
          </div>
        )}

        {activeTab === 'care' && (
          <div role="tabpanel" id="panel-care" aria-labelledby="tab-care">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-vein-white">Care & Maintenance</h2>
            <Highlight>{data.care.highlight}</Highlight>
            {data.care.sections.map((s, i) => (
              <div key={i}>
                <h3 className="font-display text-[20px] font-medium text-vein-white mt-8 mb-3">{s.title}</h3>
                {typeof s.content === 'string' ? (
                  <p className="text-[15px] text-cool-gray font-light leading-relaxed">{s.content}</p>
                ) : (
                  <ul className="text-[15px] text-cool-gray font-light leading-relaxed space-y-2 list-disc pl-5">
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
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-vein-white">Cost Guide</h2>
            <p className="text-[15px] text-cool-gray font-light leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: data.cost.intro }} />
            {data.cost.factors.length > 0 && (
              <>
                <h3 className="font-display text-[20px] font-medium text-vein-white mt-8 mb-3">What Affects the Price</h3>
                <InfoCards cards={data.cost.factors} />
              </>
            )}
            <h3 className="font-display text-[20px] font-medium text-vein-white mt-8 mb-3">How It Compares</h3>
            <div className="overflow-x-auto my-6 rounded-[12px] border border-stone-gold/15">
              <table className="w-full text-[14px] border-collapse">
                <thead>
                  <tr>
                    {data.cost.tableHeaders.map((h, i) => (
                      <th key={i} className="bg-granite text-stone-gold px-4 py-3 text-left font-mono text-[11px] tracking-[2px] uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.cost.tableRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-white/[0.02]' : ''}>
                      {row.cells.map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-cool-gray border-b border-stone-gold/10" dangerouslySetInnerHTML={{ __html: cell }} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.cost.footnote && <p className="text-[12px] text-cool-gray/50 mt-2">{data.cost.footnote}</p>}
            <Highlight>{data.cost.highlight}</Highlight>
          </div>
        )}

        {activeTab === 'design' && (
          <div role="tabpanel" id="panel-design" aria-labelledby="tab-design">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-vein-white">Design Inspiration</h2>
            <p className="text-[15px] text-cool-gray font-light leading-relaxed mb-4">{data.design.intro}</p>
            <InfoCards cards={data.design.cards} />
            {data.design.listTitle && <h3 className="font-display text-[20px] font-medium text-vein-white mt-8 mb-3">{data.design.listTitle}</h3>}
            {data.design.listItems && (
              <ul className="text-[15px] text-cool-gray font-light leading-relaxed space-y-2 list-disc pl-5 mb-8">
                {data.design.listItems.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
              </ul>
            )}
            {data.design.varieties.length > 0 && (
              <>
                <h3 className="font-display text-[20px] font-medium text-vein-white mt-8 mb-3">Choose a Style</h3>
                <VarietySelector varieties={data.design.varieties} />
              </>
            )}
          </div>
        )}

        {activeTab === 'fit' && (
          <div role="tabpanel" id="panel-fit" aria-labelledby="tab-fit">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-vein-white">{data.fit.heading}</h2>
            {data.fit.sections ? (
              data.fit.sections.map((section, i) => (
                <div key={i}>
                  {section.title && <h3 className="font-display text-[20px] font-medium text-vein-white mt-8 mb-3">{section.title}</h3>}
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
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light tracking-tight mb-6 text-vein-white">Frequently Asked Questions</h2>
            <FAQAccordion items={data.faq} />
          </div>
        )}
      </main>

      {/* CTA */}
      <section className="bg-granite text-vein-white py-16 px-6 text-center border-t border-stone-gold/15">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-light mb-3">Get a free quote for {data.stoneInterest.toLowerCase()}</h2>
        <p className="text-cool-gray text-[15px] mb-8 font-light">Tell us about your project and we'll get back to you within one business day.</p>
        <div className="flex justify-center gap-6 flex-wrap mb-8">
          <a href="tel:+15014818117" className="bg-stone-gold/5 border border-stone-gold/15 rounded-[12px] px-7 py-5 text-vein-white no-underline hover:bg-stone-gold/10 transition-colors">
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-cool-gray mb-1">Bryant / Little Rock</div>
            <div className="font-display text-[18px] font-medium">(501) 481-8117</div>
          </a>
          <a href="tel:+14799009119" className="bg-stone-gold/5 border border-stone-gold/15 rounded-[12px] px-7 py-5 text-vein-white no-underline hover:bg-stone-gold/10 transition-colors">
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-cool-gray mb-1">Rogers / NWA</div>
            <div className="font-display text-[18px] font-medium">(479) 900-9119</div>
          </a>
        </div>
        <Link to="/#contact" className="inline-flex items-center px-8 py-3.5 rounded-[6px] bg-stone-gold text-obsidian text-[14px] font-semibold tracking-wide hover:bg-stone-gold-light transition-colors no-underline">
          Request Free Quote
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 text-center text-[13px] text-cool-gray/50 bg-obsidian border-t border-stone-gold/10">
        <p>&copy; {new Date().getFullYear()} Countertop World. Strength. Set in Stone.</p>
        <p className="mt-2">
          <Link to="/" className="text-cool-gray no-underline hover:text-stone-gold">Home</Link>
          {' · '}
          <Link to="/#materials" className="text-cool-gray no-underline hover:text-stone-gold">All Materials</Link>
          {' · '}
          <Link to="/#showrooms" className="text-cool-gray no-underline hover:text-stone-gold">Visit Us</Link>
        </p>
      </footer>
    </div>
  );
}
