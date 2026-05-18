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
    title: 'Countertop Cost in Arkansas (2026) — Real Pricing by Material | Countertop World',
    description: 'Real countertop pricing from an Arkansas fabricator. Granite $40–$100/sf, quartz $50–$120/sf, quartzite $60–$150/sf — installed. Sample budgets, what\'s included, and how to save.',
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
  {
    path: '/blog/leathered-granite-countertops-arkansas',
    title: 'Leathered Granite Countertops in Arkansas — What It Is & Why It\'s Trending | Countertop World',
    description: 'Leathered granite explained — how it\'s made, cost premium, best colors, pros and cons. From an Arkansas fabricator that actually does the finishing in-house.',
    ogImage: '/materials/hero-natural-granite.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Leathered Granite', path: '/blog/leathered-granite-countertops-arkansas' }],
  },
  {
    path: '/blog/how-to-choose-countertop-fabricator-arkansas',
    title: 'How to Choose a Countertop Fabricator in Arkansas — 10 Questions to Ask | Countertop World',
    description: 'The fabricator matters more than the stone. 10 questions to ask before signing, red flags to watch for, and what separates great fabrication from average work.',
    ogImage: '/materials/hero-engineered-quartz.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Choosing a Fabricator', path: '/blog/how-to-choose-countertop-fabricator-arkansas' }],
  },
  {
    path: '/blog/outdoor-kitchen-countertops-arkansas',
    title: 'Outdoor Kitchen Countertops in Arkansas — Best Materials for Hot Summers & Ice Storms | Countertop World',
    description: 'Which countertop materials survive Arkansas heat, humidity, and freeze-thaw cycles outdoors? Granite, quartzite, porcelain — ranked by durability, cost, and maintenance.',
    ogImage: '/materials/hero-quartzite.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Outdoor Countertops', path: '/blog/outdoor-kitchen-countertops-arkansas' }],
  },
  // Knowledge Center
  {
    path: '/knowledge',
    title: 'Stone Knowledge Center — Countertop Guides | Countertop World',
    description: 'Everything you need to know about countertop materials, fabrication, pricing, and care. Straight talk from an Arkansas stone fabricator.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }],
  },
  {
    path: '/knowledge/stone-types-compared',
    title: 'Countertop Materials Compared (2026) | Countertop World Arkansas',
    description: 'Six countertop materials compared side by side — cost, durability, maintenance, heat resistance, and best uses. Honest breakdown from an Arkansas fabricator.',
    ogImage: '/materials/hero-natural-granite.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Stone Types Compared', path: '/knowledge/stone-types-compared' }],
  },
  {
    path: '/knowledge/countertop-fabrication-process',
    title: 'Countertop Fabrication Process Explained | Countertop World Arkansas',
    description: 'How countertops are made — laser templating, CNC cutting, seam placement, edge profiles, and installation. Step-by-step from an Arkansas fabricator.',
    ogImage: '/materials/hero-quartzite.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Fabrication Process', path: '/knowledge/countertop-fabrication-process' }],
  },
  {
    path: '/knowledge/countertop-pricing-guide',
    title: 'Countertop Pricing Guide (2026) | Countertop World Arkansas',
    description: 'What countertops actually cost in Arkansas — material ranges, fabrication fees, edge profiles, cutouts, and what drives the final price. No guessing.',
    ogImage: '/materials/hero-engineered-quartz.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Pricing Guide', path: '/knowledge/countertop-pricing-guide' }],
  },
  {
    path: '/knowledge/countertop-care-maintenance',
    title: 'Countertop Care & Maintenance Guide | Countertop World Arkansas',
    description: 'How to clean, seal, and protect every countertop material — granite, quartz, quartzite, marble, porcelain, and soapstone. From an Arkansas fabricator.',
    ogImage: '/materials/hero-marble.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Care & Maintenance', path: '/knowledge/countertop-care-maintenance' }],
  },
  {
    path: '/knowledge/countertop-design-selection',
    title: 'Countertop Design & Selection Guide | Countertop World Arkansas',
    description: 'How to choose the right countertop material, color, edge profile, and finish for your kitchen or bathroom. Practical guidance from an Arkansas fabricator.',
    ogImage: '/materials/hero-porcelain.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Design & Selection', path: '/knowledge/countertop-design-selection' }],
  },
  {
    path: '/knowledge/working-with-countertop-professionals',
    title: 'Working with Countertop Professionals | Countertop World Arkansas',
    description: 'What to expect when working with a countertop fabricator — timelines, communication, builder coordination, and how to avoid common project delays.',
    ogImage: '/materials/hero-natural-granite.webp',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Working with Professionals', path: '/knowledge/working-with-countertop-professionals' }],
  },
  // City / Service Area pages
  {
    path: '/areas/little-rock',
    title: 'Countertops in Little Rock, AR | Granite, Quartz & Marble — Countertop World',
    description: 'Little Rock countertop fabrication and installation. Granite, quartz, marble, and quartzite — cut and installed by our own crew. Free estimates. Bryant showroom is 15 minutes south.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/areas' }, { name: 'Little Rock', path: '/areas/little-rock' }],
  },
  {
    path: '/areas/bryant',
    title: 'Countertops in Bryant, AR | Granite, Quartz & Marble — Countertop World',
    description: 'Bryant countertop fabrication and installation. Visit our flagship showroom on I-30 with 1,000+ slabs, Sasso-Lux finishing, and in-house installation. Free estimates.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/areas' }, { name: 'Bryant', path: '/areas/bryant' }],
  },
  {
    path: '/areas/rogers',
    title: 'Countertops in Rogers, AR | Granite, Quartz & Marble — Countertop World',
    description: 'Rogers countertop fabrication and installation from our brand-new 18,700 sq ft facility on Commerce Dr. 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/areas' }, { name: 'Rogers', path: '/areas/rogers' }],
  },
  {
    path: '/areas/bentonville',
    title: 'Countertops in Bentonville, AR | Granite, Quartz & Marble — Countertop World',
    description: 'Bentonville countertop fabrication and installation. Our Rogers showroom is 10 minutes away with 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/areas' }, { name: 'Bentonville', path: '/areas/bentonville' }],
  },
  {
    path: '/areas/fayetteville',
    title: 'Countertops in Fayetteville, AR | Granite, Quartz & Marble — Countertop World',
    description: 'Fayetteville countertop fabrication and installation. Our Rogers showroom is 25 minutes north with 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/areas' }, { name: 'Fayetteville', path: '/areas/fayetteville' }],
  },
  {
    path: '/areas/springdale',
    title: 'Countertops in Springdale, AR | Granite, Quartz & Marble — Countertop World',
    description: 'Springdale countertop fabrication and installation. Our Rogers showroom is 15 minutes away with 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/areas' }, { name: 'Springdale', path: '/areas/springdale' }],
  },
  {
    path: '/areas/conway',
    title: 'Countertops in Conway, AR | Granite, Quartz & Marble — Countertop World',
    description: 'Conway countertop fabrication and installation. Our Bryant showroom is 30 minutes south with 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/areas' }, { name: 'Conway', path: '/areas/conway' }],
  },
  {
    path: '/areas/hot-springs',
    title: 'Countertops in Hot Springs, AR | Granite, Quartz & Marble — Countertop World',
    description: 'Hot Springs countertop fabrication and installation. Our Bryant showroom is 50 minutes east with 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/areas' }, { name: 'Hot Springs', path: '/areas/hot-springs' }],
  },
];

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

function resolveImage(route) {
  const slug = route.path === '/' ? 'home' : route.path.slice(1).replace(/\//g, '-');
  return `${ORIGIN}/og/${slug}.png`;
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
