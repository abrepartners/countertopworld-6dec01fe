// Runtime head tag manager for SPA client-side navigation. The initial HTML
// for each route is prerendered by scripts/prerender.mjs at build time, so
// non-JS crawlers already see correct meta. This module updates tags during
// in-app navigation after the first load.

const SITE_ORIGIN = 'https://countertopworldar.com';

type PageHeadOptions = {
  title: string;
  description: string;
  path: string;           // e.g. "/stones/marble" — no origin, no trailing slash
  ogImage?: string;       // absolute URL — if omitted, resolves from /og/ cards
  breadcrumbs?: { name: string; path: string }[];
};

function resolveOgImage(path: string, explicit?: string): string {
  if (explicit?.startsWith('http')) return explicit;
  const slug = path === '/' ? 'home' : path.slice(1).replace(/\//g, '-');
  return `${SITE_ORIGIN}/og/${slug}.png`;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, schema: unknown) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Apply title, description, canonical, OG, Twitter, and BreadcrumbList
 * schema for a route. Call from a useEffect on each page component.
 * Returns a cleanup function that removes the BreadcrumbList script.
 */
export function applyPageHead(opts: PageHeadOptions): () => void {
  const canonical = SITE_ORIGIN + opts.path;
  document.title = opts.title;

  setMeta('name', 'description', opts.description);
  setLink('canonical', canonical);

  setMeta('property', 'og:title', opts.title);
  setMeta('property', 'og:description', opts.description);
  setMeta('property', 'og:url', canonical);
  setMeta('property', 'og:type', 'website');
  const ogImage = resolveOgImage(opts.path, opts.ogImage);
  setMeta('property', 'og:image', ogImage);

  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', opts.title);
  setMeta('name', 'twitter:description', opts.description);
  setMeta('name', 'twitter:image', ogImage);

  if (opts.breadcrumbs && opts.breadcrumbs.length > 0) {
    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': opts.breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': b.name,
        'item': SITE_ORIGIN + b.path,
      })),
    });
  }

  window.scrollTo(0, 0);

  return () => {
    const bc = document.getElementById('breadcrumb-schema');
    if (bc) bc.remove();
  };
}
