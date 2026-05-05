import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { applyPageHead } from '../lib/pageHead';
import { blogPosts } from '../data/blogPosts';
import SiteFooter from '../components/SiteFooter';

export default function Blog() {
  useEffect(() => {
    return applyPageHead({
      title: 'Blog — Countertop Guides, Pricing & Trends | Countertop World',
      description: 'Countertop guides from an Arkansas fabricator. Granite vs. quartz comparisons, pricing breakdowns, 2026 trends, and maintenance tips.',
      path: '/blog',
    });
  }, []);

  return (
    <div className="min-h-screen bg-obsidian antialiased">
      <nav className="fixed top-0 inset-x-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10 px-6 h-14 flex items-center justify-between" aria-label="Site navigation">
        <Link to="/" className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline">Countertop World</Link>
        <Link to="/#materials" className="text-[13px] text-cool-gray hover:text-vein-white transition-colors no-underline">Materials</Link>
      </nav>

      <header className="pt-24 pb-16 px-6 text-center bg-granite border-b border-stone-gold/10">
        <span className="inline-block font-mono text-[10px] tracking-[4px] uppercase text-stone-gold bg-stone-gold/10 border border-stone-gold/20 px-3.5 py-1 rounded-[6px] mb-4">Blog</span>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light tracking-tight text-vein-white mb-4">Countertop Guides</h1>
        <p className="text-[16px] text-cool-gray font-light max-w-[500px] mx-auto">Straight talk on materials, pricing, and trends — from people who cut and install stone every day.</p>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-16">
        <div className="grid gap-12">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group">
              <Link to={`/blog/${post.slug}`} className="block no-underline">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-[280px] flex-shrink-0">
                    <div className="aspect-[16/10] rounded-[8px] overflow-hidden border border-stone-gold/10">
                      <img
                        src={post.heroImage}
                        alt={post.heroImageAlt}
                        className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.85] transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <time className="font-mono text-[10px] tracking-[2px] uppercase text-stone-gold/60">{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                      <span className="text-stone-gold/20">·</span>
                      <span className="font-mono text-[10px] tracking-[2px] uppercase text-stone-gold/60">{post.readTime}</span>
                    </div>
                    <h2 className="font-display text-[clamp(1.2rem,3vw,1.6rem)] font-light tracking-tight text-vein-white mb-3 group-hover:text-stone-gold transition-colors">{post.title}</h2>
                    <p className="text-[14px] text-cool-gray font-light leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-[13px] text-stone-gold font-medium">
                      Read guide <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
