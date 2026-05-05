import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronDown, Clock, Calendar } from 'lucide-react';
import { applyPageHead } from '../lib/pageHead';
import { getPostBySlug } from '../data/blogPosts';
import SiteFooter from '../components/SiteFooter';

function PostFAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-stone-gold/10 border-t border-stone-gold/10 mt-12">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className="text-[15px] text-vein-white font-light leading-snug pr-4 group-hover:text-stone-gold transition-colors">{item.q}</span>
            <ChevronDown size={16} className={`text-stone-gold/50 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
            <p className="text-[14px] text-cool-gray font-light leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    const cleanup = applyPageHead({
      title: post.metaTitle,
      description: post.metaDescription,
      path: `/blog/${post.slug}`,
      ogImage: post.heroImage.startsWith('http') ? post.heroImage : `https://countertopworldar.com${post.heroImage}`,
    });

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog-schema', post.slug);
    const schemaData: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription,
        image: post.heroImage.startsWith('http') ? post.heroImage : `https://countertopworldar.com${post.heroImage}`,
        datePublished: post.publishDate,
        dateModified: post.updatedDate || post.publishDate,
        author: { '@type': 'Organization', name: 'Countertop World', url: 'https://countertopworldar.com/' },
        publisher: { '@type': 'Organization', name: 'Countertop World', url: 'https://countertopworldar.com/' },
        mainEntityOfPage: `https://countertopworldar.com/blog/${post.slug}`,
      },
    ];
    if (post.faq && post.faq.length > 0) {
      schemaData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      });
    }
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => { cleanup(); script.remove(); };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-obsidian antialiased">
      <nav className="fixed top-0 inset-x-0 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-stone-gold/10 px-6 h-14 flex items-center justify-between" aria-label="Site navigation">
        <Link to="/" className="font-display text-[16px] font-medium text-stone-gold tracking-tight no-underline">Countertop World</Link>
        <Link to="/blog" className="flex items-center gap-1.5 text-[13px] text-cool-gray hover:text-vein-white transition-colors no-underline">
          <ArrowLeft size={16} /> All articles
        </Link>
      </nav>

      <nav aria-label="Breadcrumb" className="pt-16 pb-0 px-6 bg-obsidian">
        <ol className="flex items-center gap-1.5 text-[12px] max-w-[720px] mx-auto">
          <li><Link to="/" className="text-cool-gray/60 hover:text-vein-white transition-colors no-underline">Home</Link></li>
          <li><ChevronRight size={12} className="text-stone-gold/30" /></li>
          <li><Link to="/blog" className="text-cool-gray/60 hover:text-vein-white transition-colors no-underline">Blog</Link></li>
          <li><ChevronRight size={12} className="text-stone-gold/30" /></li>
          <li aria-current="page" className="text-stone-gold font-medium truncate max-w-[200px]">{post.title}</li>
        </ol>
      </nav>

      <header className="pt-8 pb-12 px-6 text-center">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="font-mono text-[9px] tracking-[3px] uppercase text-stone-gold/70 bg-stone-gold/5 border border-stone-gold/15 px-2.5 py-0.5 rounded-[4px]">{tag}</span>
            ))}
          </div>
          <h1 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light tracking-tight leading-tight text-vein-white mb-6">{post.title}</h1>
          <div className="flex items-center justify-center gap-4 text-[12px] text-cool-gray/60">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-stone-gold/20">·</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
          </div>
        </div>
      </header>

      <div className="px-6 mb-12">
        <div className="max-w-[720px] mx-auto aspect-[2/1] rounded-[12px] overflow-hidden border border-stone-gold/10">
          <img src={post.heroImage} alt={post.heroImageAlt} className="w-full h-full object-cover brightness-[0.6]" loading="eager" />
        </div>
      </div>

      <main className="max-w-[720px] mx-auto px-6 pb-20">
        <div className="text-[16px] text-cool-gray/80 font-light leading-relaxed italic mb-12 border-l-2 border-stone-gold/20 pl-6">
          {post.excerpt}
        </div>

        {post.sections.map((section, i) => (
          <section key={i} className="mb-10">
            <h2 className="font-display text-[clamp(1.3rem,3vw,1.8rem)] font-light tracking-tight text-vein-white mb-4">{section.heading}</h2>
            <div
              className="text-[15px] text-cool-gray font-light leading-[1.8] space-y-4 [&_strong]:text-vein-white [&_strong]:font-medium"
              dangerouslySetInnerHTML={{ __html: section.body.split('\n\n').map(p => `<p>${p}</p>`).join('') }}
            />
          </section>
        ))}

        {post.faq && post.faq.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-[clamp(1.3rem,3vw,1.8rem)] font-light tracking-tight text-vein-white mb-2">Frequently Asked Questions</h2>
            <PostFAQ items={post.faq} />
          </section>
        )}

        <div className="mt-16 p-8 rounded-[12px] bg-stone-gold/5 border border-stone-gold/15 text-center">
          <h3 className="font-display text-[22px] font-light text-vein-white mb-3">Ready to see the stone in person?</h3>
          <p className="text-[14px] text-cool-gray font-light mb-6">Walk through 1,000+ slabs at our Bryant or Rogers showroom. Free estimates for every project.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/book" className="inline-flex items-center px-7 py-3 rounded-[6px] bg-stone-gold text-obsidian text-[13px] font-semibold tracking-wide hover:bg-stone-gold-light transition-colors no-underline">Book a showroom visit</Link>
            <Link to="/#contact" className="inline-flex items-center px-7 py-3 rounded-[6px] border border-stone-gold/30 text-vein-white text-[13px] font-medium hover:border-stone-gold hover:bg-stone-gold/5 transition-colors no-underline">Request free quote</Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
