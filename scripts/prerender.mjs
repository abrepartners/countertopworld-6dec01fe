#!/usr/bin/env node
// Post-build prerenderer: injects per-route <title>, <meta>, OG, Twitter,
// canonical, and JSON-LD into static HTML files so non-JS crawlers
// (ChatGPT, Perplexity, social scrapers) see correct metadata.
// No browser required — runs on Vercel's build container.

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';

const DIST = join(import.meta.dirname, '..', 'dist');
const ORIGIN = 'https://countertopworldar.com';
const DEFAULT_OG_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/wQneyghQcNSs2stXUaHo0G5Qhxe2/social-images/social-1772306326393-countertop_world_northwest_arkansas1.webp';

const routes = [
  {
    path: '/stones/engineered-quartz',
    title: 'Engineered Quartz Countertops — Care, Cost & Design Guide | Countertop World',
    description: 'Complete guide to engineered quartz countertops in Arkansas. Care tips, cost ranges ($50-$150/sq ft), design ideas, and whether quartz is right for you.',
    ogImage: '/materials/hero-engineered-quartz.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Materials', path: '/#materials' }, { name: 'Engineered Quartz', path: '/stones/engineered-quartz' }],
  },
  {
    path: '/stones/natural-granite',
    title: 'Natural Granite Countertops — Care, Cost & Design Guide | Countertop World',
    description: 'Complete guide to natural granite countertops in Arkansas. Care & sealing tips, pricing ($40-$200/sq ft), design ideas, and whether granite is right for you.',
    ogImage: '/materials/hero-natural-granite.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Materials', path: '/#materials' }, { name: 'Natural Granite', path: '/stones/natural-granite' }],
  },
  {
    path: '/stones/marble',
    title: 'Marble Countertops — Care, Cost & Design Guide | Countertop World',
    description: 'Complete guide to marble countertops in Arkansas. Honest care advice, pricing ($75-$250+/sq ft), design ideas, and whether marble is right for your home.',
    ogImage: '/materials/hero-marble.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Materials', path: '/#materials' }, { name: 'Marble', path: '/stones/marble' }],
  },
  {
    path: '/stones/quartzite',
    title: 'Quartzite Countertops — Care, Cost & Design Guide | Countertop World',
    description: 'Complete guide to quartzite countertops in Arkansas. Care tips, pricing ($70-$200+/sq ft), design ideas, and whether quartzite is the right stone for you.',
    ogImage: '/materials/hero-quartzite.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Materials', path: '/#materials' }, { name: 'Quartzite', path: '/stones/quartzite' }],
  },
  {
    path: '/stones/porcelain',
    title: 'Porcelain Countertops — Care, Cost & Design Guide | Countertop World',
    description: 'Complete guide to porcelain countertops in Arkansas. Care tips, pricing ($60-$150/sq ft), design ideas, and whether porcelain slab surfaces are right for you.',
    ogImage: '/materials/hero-porcelain.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Materials', path: '/#materials' }, { name: 'Porcelain', path: '/stones/porcelain' }],
  },
  {
    path: '/stones/soapstone-onyx',
    title: 'Soapstone & Onyx Countertops — Care, Cost & Design Guide | Countertop World',
    description: 'Complete guide to soapstone and onyx countertops in Arkansas. Care tips, pricing, design ideas, and whether these exotic stones are right for your home.',
    ogImage: '/materials/hero-onyx.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Materials', path: '/#materials' }, { name: 'Soapstone & Onyx', path: '/stones/soapstone-onyx' }],
  },
  {
    path: '/builders',
    title: 'Builder & Contractor Countertop Services | Countertop World — Bryant & Rogers, AR',
    description: 'Arkansas stone fabrication for builders and contractors. 2-week turnaround, volume pricing, laser templating, and in-house installation. Granite, Quartz, Marble, Quartzite countertops. Two locations: Bryant and Rogers.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Builders & Contractors', path: '/builders' }],
  },
  {
    path: '/designers',
    title: 'Designer & Architect Countertop Fabrication in Arkansas | Countertop World',
    description: 'Stone countertop fabrication for designers and architects in Arkansas. Sasso-Lux finishes, digital vein-matching, exotic stone sourcing. Calacatta, Quartzite, Onyx, Marble. Bryant and Rogers showrooms.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Designers & Architects', path: '/designers' }],
  },
  {
    path: '/book',
    title: 'Book a Showroom Visit — Countertop World',
    description: 'Schedule a showroom visit at Countertop World in Bryant or Rogers, Arkansas. Pick a time that works — no phone tag.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Book a Visit', path: '/book' }],
  },
  {
    path: '/packages',
    title: 'Countertop Packages — Entry, Signature, Premium | Countertop World',
    description: 'Three honest countertop packages. 40 sq ft installed, laser-templated to 1/16 inch, fabricated under our Arkansas roof. Bryant & Rogers, AR.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Packages', path: '/packages' }],
  },
  {
    path: '/blog',
    title: 'Blog — Countertop Guides, Pricing & Trends | Countertop World',
    description: 'Countertop guides from an Arkansas fabricator. Granite vs. quartz comparisons, pricing breakdowns, 2026 trends, and maintenance tips.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }],
  },
  {
    path: '/blog/granite-vs-quartz-countertops-arkansas',
    title: 'Granite vs. Quartz Countertops in Arkansas — Which Is Right for You? | Countertop World',
    description: 'Side-by-side comparison of granite and quartz countertops — durability, cost, maintenance, and style. From a family-owned Arkansas fabricator with 1,000+ slabs in stock.',
    ogImage: '/materials/hero-natural-granite.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Granite vs. Quartz', path: '/blog/granite-vs-quartz-countertops-arkansas' }],
  },
  {
    path: '/blog/countertop-cost-arkansas-2026',
    title: 'Countertop Cost in Arkansas (2026) — Granite, Quartz, Marble Pricing | Countertop World',
    description: 'Real countertop pricing from an Arkansas fabricator. Granite $40–$100/sf, quartz $50–$120/sf, marble $50–$150/sf — installed. What drives cost and how to budget.',
    ogImage: '/materials/hero-engineered-quartz.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Countertop Cost 2026', path: '/blog/countertop-cost-arkansas-2026' }],
  },
  {
    path: '/blog/countertop-trends-arkansas-2026',
    title: '2026 Countertop Trends in Arkansas — Materials, Colors & Finishes | Countertop World',
    description: 'What Arkansas homeowners are choosing for countertops in 2026. Warm neutrals, honed finishes, quartzite, waterfall edges, and the move away from gray. From our showroom floor.',
    ogImage: '/materials/hero-quartzite.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: '2026 Trends', path: '/blog/countertop-trends-arkansas-2026' }],
  },
];

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

function resolveImage(route) {
  if (route.ogImage?.startsWith('/')) return ORIGIN + route.ogImage;
  return route.ogImage || DEFAULT_OG_IMAGE;
}

function buildMetaTags(route) {
  const canonical = ORIGIN + route.path;
  const image = resolveImage(route);

  const tags = [
    `<meta name="description" content="${esc(route.description)}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:title" content="${esc(route.title)}">`,
    `<meta property="og:description" content="${esc(route.description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:image" content="${image}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(route.title)}">`,
    `<meta name="twitter:description" content="${esc(route.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
  ];

  if (route.breadcrumbs) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: route.breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: ORIGIN + b.path,
      })),
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
  }

  return tags.join('\n    ');
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function render(route) {
  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${esc(route.title)}</title>`
  );

  // Replace homepage meta description with route-specific one
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${esc(route.description)}">`
  );

  // Replace homepage canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*" ?\/?>/,
    `<link rel="canonical" href="${ORIGIN + route.path}">`
  );

  // Replace homepage OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${esc(route.title)}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${esc(route.description)}">`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" ?\/?>/,
    `<meta property="og:url" content="${ORIGIN + route.path}">`
  );
  const image = resolveImage(route);
  html = html.replace(
    /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${image}">`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${esc(route.title)}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${esc(route.description)}">`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*">/,
    `<meta name="twitter:image" content="${image}">`
  );

  // Inject BreadcrumbList schema before </head>
  if (route.breadcrumbs) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: route.breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: ORIGIN + b.path,
      })),
    };
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`
    );
  }

  return html;
}

let count = 0;
for (const route of routes) {
  const html = render(route);
  const dir = join(DIST, route.path.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  count++;
}

console.log(`Prerendered ${count} routes.`);
