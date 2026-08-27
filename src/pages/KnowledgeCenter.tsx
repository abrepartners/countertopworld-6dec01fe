import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { applyPageHead } from '../lib/pageHead';
import { knowledgePages, getClusterPages } from '../data/knowledgePages';
import SiteFooter from '../components/SiteFooter';

export default function KnowledgeCenter() {
  useEffect(() => {
    return applyPageHead({
      title: 'Stone Knowledge Center — Countertop Guides | Countertop World',
      description: 'Everything you need to know about countertop materials, fabrication, pricing, and care. Straight talk from an Arkansas stone fabricator.',
      path: '/knowledge',
    });
  }, []);

  const pillars = knowledgePages.filter(p => p.category === 'pillar');

  return (
    <div className="min-h-screen bg-obsidian antialiased">
      <nav className="fixed top-0 inset-x-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10 px-6 h-14 flex items-center justify-between" aria-label="Site navigation">
        <Link to="/" className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline">Countertop World</Link>
        <Link to="/#materials" className="text-[13px] text-cool-gray hover:text-vein-white transition-colors no-underline">Materials</Link>
      </nav>

      <header className="pt-24 pb-16 px-6 text-center bg-granite border-b border-stone-gold/10">
        <span className="inline-block font-mono text-[10px] tracking-[4px] uppercase text-stone-gold bg-stone-gold/10 border border-stone-gold/20 px-3.5 py-1 rounded-[6px] mb-4">Knowledge Center</span>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light tracking-tight text-vein-white mb-4">Stone Knowledge Center</h1>
        <p className="text-[16px] text-cool-gray font-light max-w-[560px] mx-auto">Everything you need to know about countertop materials — from people who cut and install stone every day.</p>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-16">
        <div className="grid gap-8">
          {pillars.map((page) => (
            <article key={page.slug} className="group">
              <Link to={`/knowledge/${page.slug}`} className="block no-underline">
                <div className="flex flex-col md:flex-row gap-6 p-6 rounded-[12px] border border-stone-gold/10 hover:border-stone-gold/25 hover:bg-stone-gold/[0.02] transition-all duration-500">
                  <div className="md:w-[260px] flex-shrink-0">
                    <div className="aspect-[16/10] rounded-[8px] overflow-hidden border border-stone-gold/10">
                      <img
                        src={page.heroImage}
                        alt={page.heroImageAlt}
                        className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-[0.75] transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[9px] tracking-[3px] uppercase text-stone-gold/70 bg-stone-gold/5 border border-stone-gold/15 px-2.5 py-0.5 rounded-[4px]">{page.category}</span>
                      <span className="font-mono text-[10px] tracking-[2px] uppercase text-stone-gold/60">{page.readTime}</span>
                    </div>
                    <h2 className="font-display text-[clamp(1.2rem,3vw,1.5rem)] font-light tracking-tight text-vein-white mb-3 group-hover:text-stone-gold transition-colors">{page.title}</h2>
                    <p className="text-[14px] text-cool-gray font-light leading-relaxed mb-4">{page.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-[13px] text-stone-gold font-medium">
                      Read guide <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
              {(() => {
                const clusters = getClusterPages(page.slug);
                if (clusters.length === 0) return null;
                return (
                  <div className="mt-3 ml-6 md:ml-[284px] grid gap-1.5">
                    {clusters.map(c => (
                      <Link key={c.slug} to={`/knowledge/${c.slug}`} className="flex items-center gap-2 py-1.5 text-[13px] text-cool-gray/80 hover:text-stone-gold transition-colors no-underline group/cluster">
                        <ArrowRight size={11} className="text-stone-gold/30 group-hover/cluster:text-stone-gold flex-shrink-0" />
                        {c.title}
                      </Link>
                    ))}
                  </div>
                );
              })()}
            </article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/blog" className="flex items-center gap-3 p-5 rounded-[8px] border border-stone-gold/10 hover:border-stone-gold/30 hover:bg-stone-gold/5 transition-all no-underline group">
            <ArrowRight size={14} className="text-stone-gold/40 group-hover:text-stone-gold flex-shrink-0" />
            <div>
              <span className="block text-[14px] text-vein-white font-medium group-hover:text-stone-gold transition-colors">Blog</span>
              <span className="block text-[12px] text-cool-gray/60 mt-0.5">Pricing guides, trends, and how-tos</span>
            </div>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
