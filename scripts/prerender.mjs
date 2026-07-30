#!/usr/bin/env node
// Post-build prerenderer: injects per-route <title>, <meta>, OG, Twitter,
// canonical, and JSON-LD into static HTML files so non-JS crawlers
// (ChatGPT, Perplexity, social scrapers) see correct metadata.
// No browser required — runs on Vercel's build container.

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { transform } from 'esbuild';

const DIST = join(import.meta.dirname, '..', 'dist');

// Load the city page data (single source of truth, shared with the React app).
// esbuild strips the TypeScript types so plain Node can import it.
const citySource = readFileSync(
  join(import.meta.dirname, '..', 'src', 'data', 'cityPages.ts'),
  'utf-8',
);
const { code: cityCode } = await transform(citySource, { loader: 'ts', format: 'esm' });
const { cityPages } = await import(
  'data:text/javascript;base64,' + Buffer.from(cityCode).toString('base64')
);
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
  // Knowledge Center — Cluster Pages
  {
    path: '/knowledge/quartzite-vs-quartz-difference',
    title: 'Quartzite vs Quartz: What\'s the Difference? | Countertop World',
    description: 'Quartzite is natural stone. Quartz is engineered. They sound alike but perform differently. Here is how to tell them apart and choose the right one.',
    ogImage: '/og/knowledge-quartzite-vs-quartz-difference.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Quartzite vs Quartz', path: '/knowledge/quartzite-vs-quartz-difference' }],
  },
  {
    path: '/knowledge/is-marble-right-for-your-kitchen',
    title: 'Is Marble Right for Your Kitchen? | Countertop World',
    description: 'Marble etches, stains, and requires more care than any other countertop. Some people love it anyway. Here is how to decide.',
    ogImage: '/og/knowledge-is-marble-right-for-your-kitchen.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Is Marble Right for Your Kitchen?', path: '/knowledge/is-marble-right-for-your-kitchen' }],
  },
  {
    path: '/knowledge/best-countertop-material-for-kitchens',
    title: 'Best Countertop Material for Kitchens (2026) | Countertop World',
    description: 'There is no single best kitchen countertop. The right material depends on how you cook, how you clean, and what you want in ten years.',
    ogImage: '/og/knowledge-best-countertop-material-for-kitchens.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Best Countertop Material', path: '/knowledge/best-countertop-material-for-kitchens' }],
  },
  {
    path: '/knowledge/what-is-laser-templating',
    title: 'What Is Laser Templating for Countertops? | Countertop World',
    description: 'Laser templating measures your kitchen to 1/32-inch accuracy. Here is what happens during the appointment and why it replaced cardboard templates.',
    ogImage: '/og/knowledge-what-is-laser-templating.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Laser Templating', path: '/knowledge/what-is-laser-templating' }],
  },
  {
    path: '/knowledge/countertop-edge-profiles-guide',
    title: 'Countertop Edge Profiles Guide | Countertop World',
    description: 'Eased, beveled, bullnose, ogee, waterfall, mitered — every countertop edge profile explained with cost, style, and when to use each one.',
    ogImage: '/og/knowledge-countertop-edge-profiles-guide.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Edge Profiles Guide', path: '/knowledge/countertop-edge-profiles-guide' }],
  },
  {
    path: '/knowledge/countertop-seam-placement',
    title: 'Countertop Seam Placement Guide | Countertop World',
    description: 'Every long countertop run needs a seam. Where it falls affects strength, appearance, and longevity. Here is how fabricators decide.',
    ogImage: '/og/knowledge-countertop-seam-placement.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Seam Placement', path: '/knowledge/countertop-seam-placement' }],
  },
  {
    path: '/knowledge/countertop-remnants-save-money',
    title: 'Countertop Remnants in Arkansas | Save 40-60% | Countertop World',
    description: 'Learn how countertop remnants can save you 40-60% on bathroom vanities, bar tops, and small projects. Same premium stone, professional fabrication.',
    ogImage: '/og/knowledge-countertop-remnants-save-money.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Countertop Remnants', path: '/knowledge/countertop-remnants-save-money' }],
  },
  {
    path: '/knowledge/what-is-included-countertop-quote',
    title: 'What\'s Included in a Countertop Quote? | Countertop World',
    description: 'Learn what line items belong in a countertop quote, what is usually excluded, and how to compare estimates apples to apples.',
    ogImage: '/og/knowledge-what-is-included-countertop-quote.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'What\'s in a Quote?', path: '/knowledge/what-is-included-countertop-quote' }],
  },
  {
    path: '/knowledge/countertop-cost-by-kitchen-size',
    title: 'Countertop Cost by Kitchen Size | Arkansas Budget Guide 2026',
    description: 'What countertops actually cost for small, medium, large, and custom kitchens in Arkansas. Real budget ranges by square footage.',
    ogImage: '/og/knowledge-countertop-cost-by-kitchen-size.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Cost by Kitchen Size', path: '/knowledge/countertop-cost-by-kitchen-size' }],
  },
  {
    path: '/knowledge/how-to-seal-granite-countertops',
    title: 'How to Seal Granite Countertops | Countertop World',
    description: 'Learn when your Granite countertops actually need sealing, how to do it right, and the common mistakes that waste your time and money.',
    ogImage: '/og/knowledge-how-to-seal-granite-countertops.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'How to Seal Granite', path: '/knowledge/how-to-seal-granite-countertops' }],
  },
  {
    path: '/knowledge/fix-marble-etch-marks',
    title: 'How to Fix Marble Etch Marks | Countertop World',
    description: 'Learn what causes etch marks on Marble countertops, how to remove light etching yourself, when to call a professional, and how to prevent new ones.',
    ogImage: '/og/knowledge-fix-marble-etch-marks.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Fix Marble Etch Marks', path: '/knowledge/fix-marble-etch-marks' }],
  },
  {
    path: '/knowledge/outdoor-countertop-winter-care',
    title: 'Outdoor Countertop Winter Care | Arkansas Freeze-Thaw Guide',
    description: 'How to protect outdoor countertops from Arkansas freeze-thaw cycles. Sealing schedules, winter prep, material guidance, and spring recovery.',
    ogImage: '/og/knowledge-outdoor-countertop-winter-care.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Outdoor Winter Care', path: '/knowledge/outdoor-countertop-winter-care' }],
  },
  {
    path: '/knowledge/waterfall-countertop-island-guide',
    title: 'Waterfall Countertop Islands: Design & Cost | Countertop World',
    description: 'How waterfall countertop islands are fabricated, what they cost, which materials work best, and when the investment makes sense.',
    ogImage: '/og/knowledge-waterfall-countertop-island-guide.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Waterfall Islands', path: '/knowledge/waterfall-countertop-island-guide' }],
  },
  {
    path: '/knowledge/mixing-countertop-materials',
    title: 'Mixing Countertop Materials | Countertop World',
    description: 'When and how to mix countertop materials in your kitchen or bathroom. Design rules, common pairings, and cost benefits.',
    ogImage: '/og/knowledge-mixing-countertop-materials.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Mixing Materials', path: '/knowledge/mixing-countertop-materials' }],
  },
  {
    path: '/knowledge/honed-vs-polished-countertops',
    title: 'Honed vs Polished Countertops | Countertop World',
    description: 'The real differences between honed, polished, and leathered countertop finishes. How each affects maintenance, color, and durability.',
    ogImage: '/og/knowledge-honed-vs-polished-countertops.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Honed vs Polished', path: '/knowledge/honed-vs-polished-countertops' }],
  },
  {
    path: '/knowledge/countertop-project-timeline',
    title: 'Countertop Project Timeline | Countertop World',
    description: 'How long a countertop project takes from first call to finished install. Typical phases, common delays, and how to stay on schedule.',
    ogImage: '/og/knowledge-countertop-project-timeline.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Project Timeline', path: '/knowledge/countertop-project-timeline' }],
  },
  {
    path: '/knowledge/builder-countertop-program',
    title: 'Builder Countertop Programs | Countertop World',
    description: 'How builder countertop programs work — volume pricing, priority scheduling, dedicated account management, and streamlined specs.',
    ogImage: '/og/knowledge-builder-countertop-program.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Builder Program', path: '/knowledge/builder-countertop-program' }],
  },
  {
    path: '/knowledge/questions-to-ask-countertop-fabricator',
    title: 'Questions to Ask a Countertop Fabricator | Countertop World',
    description: '12 essential questions to ask any countertop fabricator before signing — about the shop, the quote, the process, and the warranty.',
    ogImage: '/og/knowledge-questions-to-ask-countertop-fabricator.png',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Knowledge Center', path: '/knowledge' }, { name: 'Questions to Ask', path: '/knowledge/questions-to-ask-countertop-fabricator' }],
  },
  // City / Service Area pages
  {
    path: '/areas',
    title: 'Service Areas | Countertop World',
    description: 'Countertop World installs granite, quartz, marble, and quartzite across Arkansas. Our Bryant showroom serves Little Rock, Conway, and Hot Springs. Our Rogers showroom serves Bentonville, Fayetteville, and Springdale.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/areas' }],
  },
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
  // Legal / compliance
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Countertop World',
    description: 'How Countertop World LLC collects, uses, and protects your information, including our SMS / text messaging practices. We never share your SMS consent or mobile information with third parties for marketing.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }],
  },
  {
    path: '/sms-terms',
    title: 'SMS Terms of Service | Countertop World',
    description: 'Countertop World LLC SMS Terms of Service: message types, frequency, message & data rates, STOP/HELP keywords, and how we protect your mobile information.',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'SMS Terms', path: '/sms-terms' }],
  },
];

const rawTemplate = readFileSync(join(DIST, 'index.html'), 'utf-8');

// Static in-body links for non-JS crawlers. The React app renders these same
// links in its footer at runtime, but the raw SPA shell has no anchors at all,
// which leaves every route looking orphaned to crawlers that skip JavaScript.
// A <noscript> nav keeps them out of the browser while giving raw-HTML
// fetchers a real link graph.
const CRAWL_LINKS = [
  ['/', 'Home'],
  ['/stones/engineered-quartz', 'Engineered Quartz'],
  ['/stones/natural-granite', 'Natural Granite'],
  ['/stones/marble', 'Marble'],
  ['/stones/quartzite', 'Quartzite'],
  ['/stones/porcelain', 'Porcelain'],
  ['/stones/soapstone-onyx', 'Soapstone and Onyx'],
  ['/builders', 'Builders'],
  ['/designers', 'Designers'],
  ['/packages', 'Packages'],
  ['/book', 'Book a Visit'],
  ['/knowledge', 'Knowledge Center'],
  ['/blog', 'Blog'],
  ['/areas', 'Service Areas'],
  ['/areas/little-rock', 'Countertops in Little Rock, AR'],
  ['/areas/bryant', 'Countertops in Bryant, AR'],
  ['/areas/conway', 'Countertops in Conway, AR'],
  ['/areas/hot-springs', 'Countertops in Hot Springs, AR'],
  ['/areas/rogers', 'Countertops in Rogers, AR'],
  ['/areas/bentonville', 'Countertops in Bentonville, AR'],
  ['/areas/fayetteville', 'Countertops in Fayetteville, AR'],
  ['/areas/springdale', 'Countertops in Springdale, AR'],
];
const noscriptNav = `<noscript><nav aria-label="Site links">${CRAWL_LINKS.map(([href, label]) => `<a href="${href}">${label}</a>`).join('\n')}</nav></noscript>`;
const template = rawTemplate.replace('</body>', `${noscriptNav}\n  </body>`);

// The homepage is served from the base index.html (it is not in the routes
// list), so write the link-enriched shell back for "/" and the SPA fallback.
writeFileSync(join(DIST, 'index.html'), template);

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

// Escape text and convert inline [label](/path) links to anchors.
function inline(s) {
  return esc(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

// Plain-text version of a paragraph (links flattened to their labels),
// used for JSON-LD where markup does not belong.
function plain(s) {
  return s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}

// Static, crawlable HTML for a city page, injected into <div id="root">.
// React's createRoot() replaces this content on hydration, so browsers see
// the full interactive page while raw-HTML fetchers (and crawlers that skip
// JS) see the real per-city content instead of an empty SPA shell.
function cityBodyHtml(city) {
  const s = city.nearestShowroom;
  const tel = s.phone.replace(/[^0-9]/g, '');
  const parts = [];
  parts.push('<article>');
  parts.push(`<h1>Countertops in ${esc(city.cityName)}, Arkansas</h1>`);
  parts.push(`<p>${inline(city.heroSubtitle)}</p>`);
  parts.push(
    `<p><strong>${esc(s.name)}</strong> · ${esc(s.address)} · <a href="tel:${tel}">${esc(s.phone)}</a> · ${esc(s.hours)} · From ${esc(city.cityName)}: ${esc(city.driveTime)}</p>`,
  );
  parts.push(`<h2>Serving ${esc(city.cityName)} homeowners and builders</h2>`);
  parts.push(`<p>${inline(city.localContext)}</p>`);
  for (const section of city.sections) {
    parts.push(`<h2>${esc(section.heading)}</h2>`);
    for (const p of section.paragraphs) parts.push(`<p>${inline(p)}</p>`);
  }
  parts.push(`<h2>Common questions from ${esc(city.cityName)} homeowners</h2>`);
  for (const f of city.faq) {
    parts.push(`<h3>${esc(f.q)}</h3>`);
    parts.push(`<p>${esc(f.a)}</p>`);
  }
  parts.push(
    `<p>Also serving: ${city.nearbyAreas.map((a) => `<a href="/areas/${a.slug}">${esc(a.name)}, AR</a>`).join(' · ')} · <a href="/areas">All service areas</a></p>`,
  );
  parts.push(
    `<p><a href="/book">Book a showroom visit</a> or call <a href="tel:${tel}">${esc(s.phone)}</a> for a free estimate in ${esc(city.cityName)}.</p>`,
  );
  parts.push('</article>');
  return parts.join('\n      ');
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

  // City pages: inject FAQPage JSON-LD + static crawlable body content.
  const citySlug = route.path.startsWith('/areas/') ? route.path.slice('/areas/'.length) : null;
  const city = citySlug ? cityPages[citySlug] : null;
  if (city) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: city.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: plain(item.a) },
      })),
    };
    // The id lets CityPageLayout remove this copy before injecting its own
    // client-side FAQPage schema, so rendering crawlers never see two.
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json" id="city-faq-schema-ssr">${JSON.stringify(faqSchema)}</script>\n  </head>`
    );
    html = html.replace(
      /<div id="root">\s*<\/div>/,
      `<div id="root">\n      ${cityBodyHtml(city)}\n    </div>`
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
