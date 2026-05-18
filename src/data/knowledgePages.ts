export interface KnowledgePage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishDate: string;
  updatedDate?: string;
  readTime: string;
  heroImage: string;
  heroImageAlt: string;
  excerpt: string;
  category: 'pillar' | 'cluster';
  pillarSlug?: string;
  tags: string[];
  sections: { heading: string; body: string }[];
  faq?: { q: string; a: string }[];
  relatedLinks?: { title: string; href: string }[];
}

export const knowledgePages: KnowledgePage[] = [
  {
    slug: 'stone-types-compared',
    title: 'Stone Types Compared: Granite, Quartz, Quartzite, Marble, Porcelain, Soapstone',
    metaTitle: 'Countertop Materials Compared (2026) | Countertop World Arkansas',
    metaDescription: 'Six countertop materials compared side by side — cost, durability, maintenance, heat resistance, and best uses. Honest breakdown from an Arkansas fabricator.',
    publishDate: '2026-05-18',
    readTime: '12 min read',
    heroImage: '/materials/hero-natural-granite.webp',
    heroImageAlt: 'Natural granite and quartz slabs displayed in a fabrication showroom',
    excerpt: 'Six materials. Honest trade-offs. No marketing spin. We cut and install all of these every week — here is what actually matters when you are choosing.',
    category: 'pillar',
    tags: ['comparison', 'materials', 'granite', 'quartz', 'quartzite', 'marble'],
    sections: [
      {
        heading: 'What this guide covers',
        body: `We get asked "which stone is best?" dozens of times a week. The honest answer is that there is no single best — there is a best fit for how you cook, how you clean, and what you want your kitchen to look like in ten years.\n\nThis guide compares the six countertop materials we fabricate and install: <a href="/stones/natural-granite" class="text-stone-gold hover:text-stone-gold-light transition-colors">natural granite</a>, <a href="/stones/engineered-quartz" class="text-stone-gold hover:text-stone-gold-light transition-colors">engineered quartz</a>, <a href="/stones/quartzite" class="text-stone-gold hover:text-stone-gold-light transition-colors">quartzite</a>, <a href="/stones/marble" class="text-stone-gold hover:text-stone-gold-light transition-colors">marble</a>, <a href="/stones/porcelain" class="text-stone-gold hover:text-stone-gold-light transition-colors">porcelain</a>, and <a href="/stones/soapstone-onyx" class="text-stone-gold hover:text-stone-gold-light transition-colors">soapstone</a>. Every comparison is based on what we see in our own shop — not manufacturer marketing.`
      },
      {
        heading: 'Natural stone vs engineered: the fundamental split',
        body: `Before comparing individual materials, understand the two camps.\n\n<strong>Natural stone</strong> — granite, quartzite, marble, soapstone — is quarried from the earth. Every slab is unique. Color, veining, and mineral composition vary piece to piece. That is the appeal: no two kitchens look the same. The trade-off is that natural stone is porous to varying degrees, so most types need sealing.\n\n<strong>Engineered stone</strong> — quartz and porcelain — is manufactured. Quartz is roughly 90% crushed natural quartz crystals bound with resin. Porcelain is kiln-fired clay with a printed surface. Both offer consistency: what you see in the sample is what you get across every slab. The trade-off is that engineered materials have limitations natural stone does not, particularly with heat and UV exposure.`
      },
      {
        heading: 'The six materials at a glance',
        body: `<table style="width:100%;border-collapse:collapse;font-size:14px;"><thead><tr style="border-bottom:1px solid rgba(201,169,110,0.2);"><th style="text-align:left;padding:8px 12px;color:#E8E2D6;font-weight:500;">Material</th><th style="text-align:left;padding:8px 12px;color:#E8E2D6;font-weight:500;">Type</th><th style="text-align:left;padding:8px 12px;color:#E8E2D6;font-weight:500;">Cost/sqft</th><th style="text-align:left;padding:8px 12px;color:#E8E2D6;font-weight:500;">Sealing</th><th style="text-align:left;padding:8px 12px;color:#E8E2D6;font-weight:500;">Outdoor?</th></tr></thead><tbody><tr style="border-bottom:1px solid rgba(201,169,110,0.1);"><td style="padding:8px 12px;">Granite</td><td style="padding:8px 12px;">Natural</td><td style="padding:8px 12px;">$40–200+</td><td style="padding:8px 12px;">Annual</td><td style="padding:8px 12px;">Yes</td></tr><tr style="border-bottom:1px solid rgba(201,169,110,0.1);"><td style="padding:8px 12px;">Quartz</td><td style="padding:8px 12px;">Engineered</td><td style="padding:8px 12px;">$50–150</td><td style="padding:8px 12px;">Never</td><td style="padding:8px 12px;">No</td></tr><tr style="border-bottom:1px solid rgba(201,169,110,0.1);"><td style="padding:8px 12px;">Quartzite</td><td style="padding:8px 12px;">Natural</td><td style="padding:8px 12px;">$70–200+</td><td style="padding:8px 12px;">Annual</td><td style="padding:8px 12px;">Yes</td></tr><tr style="border-bottom:1px solid rgba(201,169,110,0.1);"><td style="padding:8px 12px;">Marble</td><td style="padding:8px 12px;">Natural</td><td style="padding:8px 12px;">$75–250+</td><td style="padding:8px 12px;">Frequent</td><td style="padding:8px 12px;">Limited</td></tr><tr style="border-bottom:1px solid rgba(201,169,110,0.1);"><td style="padding:8px 12px;">Porcelain</td><td style="padding:8px 12px;">Engineered</td><td style="padding:8px 12px;">$60–150</td><td style="padding:8px 12px;">Never</td><td style="padding:8px 12px;">Yes</td></tr><tr><td style="padding:8px 12px;">Soapstone</td><td style="padding:8px 12px;">Natural</td><td style="padding:8px 12px;">$70–120</td><td style="padding:8px 12px;">Oil (optional)</td><td style="padding:8px 12px;">Yes</td></tr></tbody></table>\n\nAll prices include material, fabrication, and installation in Arkansas. Actual cost depends on edge profile, cutout count, slab rarity, and project complexity. See our full <a href="/blog/countertop-cost-arkansas-2026" class="text-stone-gold hover:text-stone-gold-light transition-colors">2026 countertop cost guide</a> for detailed breakdowns.`
      },
      {
        heading: 'Heat, stain, and scratch resistance ranked',
        body: `<strong>Heat resistance (best to worst):</strong>\n• Soapstone — virtually heatproof. Set anything on it.\n• Granite — formed at 1,200°F+. Hot pans are not a problem.\n• Quartzite — natural stone, handles heat well.\n• Porcelain — kiln-fired, good heat tolerance.\n• Marble — handles heat but thermal shock can cause issues on thinner slabs.\n• Quartz — resin binders discolor and crack from sustained heat. Always use trivets.\n\n<strong>Stain resistance (best to worst):</strong>\n• Quartz — non-porous, nothing absorbs. Ever.\n• Porcelain — non-porous surface, excellent stain resistance.\n• Granite (sealed) — resists stains well when seal is maintained.\n• Quartzite (sealed) — comparable to granite when properly sealed.\n• Soapstone — does not stain in the traditional sense, but darkens over time.\n• Marble — etches from acids (lemon, wine, vinegar). This is chemical, not staining — sealing does not prevent it.\n\n<strong>Scratch resistance (best to worst):</strong>\n• Quartzite — 7–8 on the Mohs scale. Harder than granite.\n• Granite — 6–7 Mohs. Excellent scratch resistance.\n• Quartz — 7 Mohs. Very good.\n• Porcelain — hard surface but the printed layer can chip from impact.\n• Marble — 3–5 Mohs. Softer. Will scratch from abrasive contact.\n• Soapstone — 1–3 Mohs. The softest option. Scratches buff out with oil but will develop patina.`
      },
      {
        heading: 'Maintenance realities',
        body: `We hear "zero maintenance" a lot. Here is what that actually means for each material.\n\n<strong><a href="/stones/engineered-quartz" class="text-stone-gold hover:text-stone-gold-light transition-colors">Quartz</a>:</strong> Wipe with soap and water. That is it. No sealing, no special cleaners. The closest thing to truly zero maintenance.\n\n<strong><a href="/stones/porcelain" class="text-stone-gold hover:text-stone-gold-light transition-colors">Porcelain</a>:</strong> Same as quartz — soap and water. Non-porous, no sealing. The grout lines between slabs need occasional cleaning if visible.\n\n<strong><a href="/stones/natural-granite" class="text-stone-gold hover:text-stone-gold-light transition-colors">Granite</a>:</strong> Seal once a year. Takes 15 minutes, costs under $20. Between sealings, daily cleanup is just soap and water. If you skip a year, the stone does not fail — it just becomes slightly more susceptible to oil absorption.\n\n<strong><a href="/stones/quartzite" class="text-stone-gold hover:text-stone-gold-light transition-colors">Quartzite</a>:</strong> Same sealing schedule as granite. Annual seal, soap and water daily. Some quartzites are denser than others — your fabricator can advise whether yours needs more or less frequent sealing.\n\n<strong><a href="/stones/soapstone-onyx" class="text-stone-gold hover:text-stone-gold-light transition-colors">Soapstone</a>:</strong> Optional mineral oil application darkens the stone evenly and hides scratches. Some owners oil monthly; others let the patina develop naturally. No sealing required.\n\n<strong><a href="/stones/marble" class="text-stone-gold hover:text-stone-gold-light transition-colors">Marble</a>:</strong> The highest-maintenance option. Seal every 6–12 months. Clean up acid spills immediately — lemon juice, vinegar, wine, and tomato sauce will etch the surface even through sealant. If you accept the patina, marble maintenance drops significantly. If you want it pristine, plan on attentive care.`
      },
      {
        heading: 'Indoor vs outdoor use',
        body: `Arkansas weather matters here. We get 100°F summers, hard freezes in winter, and plenty of rain. Not every material handles that.\n\n<strong>Fully outdoor-rated:</strong>\n• <a href="/stones/natural-granite" class="text-stone-gold hover:text-stone-gold-light transition-colors">Granite</a> — the most popular <a href="/blog/outdoor-kitchen-countertops-arkansas" class="text-stone-gold hover:text-stone-gold-light transition-colors">outdoor countertop</a> we install. UV-stable, freeze-thaw resistant, heat-proof. Seal twice a year outdoors.\n• <a href="/stones/quartzite" class="text-stone-gold hover:text-stone-gold-light transition-colors">Quartzite</a> — same natural stone durability as granite. Excellent outdoors.\n• <a href="/stones/soapstone-onyx" class="text-stone-gold hover:text-stone-gold-light transition-colors">Soapstone</a> — handles all weather. Popular for outdoor fire pit surrounds.\n• <a href="/stones/porcelain" class="text-stone-gold hover:text-stone-gold-light transition-colors">Porcelain</a> — UV-stable, non-porous, handles freeze-thaw. Growing fast for outdoor kitchens.\n\n<strong>Indoor only:</strong>\n• <a href="/stones/engineered-quartz" class="text-stone-gold hover:text-stone-gold-light transition-colors">Quartz</a> — UV degrades the resin binders. Yellowing, fading, and warping within 1–2 years of direct sunlight. Every manufacturer voids the warranty for outdoor use.\n\n<strong>Limited outdoor:</strong>\n• <a href="/stones/marble" class="text-stone-gold hover:text-stone-gold-light transition-colors">Marble</a> — technically survives outdoors but etches from rain acidity and stains more easily without consistent sealing. We do not recommend it for Arkansas outdoor kitchens.`
      },
      {
        heading: '2026 design trends by material',
        body: `The countertop market has shifted hard in the last two years. Cool gray is out. Warm tones, textured finishes, and dramatic veining are in.\n\n<strong>Granite:</strong> <a href="/blog/leathered-granite-countertops-arkansas" class="text-stone-gold hover:text-stone-gold-light transition-colors">Leathered finishes</a> are the biggest granite story in 2026. The textured surface hides fingerprints, adds visual depth, and feels different from the polished granite that dominated 2000s kitchens. Warm-toned granites with sweeping veining — nothing like the busy speckle patterns of the past.\n\n<strong>Quartz:</strong> Bold veined patterns mimicking marble and quartzite. Brands like Cambria and Caesarstone produce convincing marble alternatives without marble maintenance. Matte and honed finishes are outselling polished in our showrooms.\n\n<strong>Quartzite:</strong> The premium natural stone pick for 2026. Dramatic veining, better durability than marble, natural depth that engineered products cannot replicate. Taj Mahal and Calacatta quartzites are consistently our fastest sellers.\n\n<strong>Marble:</strong> Still the luxury standard for bathrooms and feature islands. The "imperfect patina" trend has actually increased marble adoption — more people are embracing the lived-in look rather than fighting the etch marks.\n\n<strong>Porcelain:</strong> Growing fast in the commercial and modern residential space. Large-format slabs with marble-look prints are convincing at a distance. The ultra-thin profile appeals to designers doing floating vanity designs.\n\n<strong>Soapstone:</strong> Niche but steady. Appeals to farmhouse, industrial, and heritage kitchen styles. The deep charcoal-green tones pair well with the warm-neutral trend.`
      },
      {
        heading: 'How to choose your material',
        body: `Stop comparing spec sheets. Start with three questions.\n\n<strong>1. How do you actually use your kitchen?</strong>\nHeavy cooking with hot pans? Granite, quartzite, or soapstone. Lots of meal prep with oils and sauces? Quartz or porcelain. Baking with acidic ingredients? Avoid marble for work surfaces.\n\n<strong>2. What level of maintenance are you honest about doing?</strong>\nIf the answer is none, quartz or porcelain. If 15 minutes a year is fine, granite or quartzite. If you enjoy the ritual, soapstone. If you will commit to careful daily habits, marble.\n\n<strong>3. What do you want the kitchen to feel like in ten years?</strong>\nUnchanged and pristine? Quartz. Developing natural character? Soapstone or marble. Looking exactly like the day it was installed with minimal effort? Granite.\n\nIf you are still uncertain, that is normal. Come see the stone in person. Samples and photos cannot show you how light moves across a natural slab, how a leathered texture feels, or how the scale changes when a full slab is laid across your island. We keep over 1,000 slabs in stock across our <a href="/areas/bryant" class="text-stone-gold hover:text-stone-gold-light transition-colors">Bryant</a> and <a href="/areas/rogers" class="text-stone-gold hover:text-stone-gold-light transition-colors">Rogers</a> showrooms.`
      },
    ],
    faq: [
      {
        q: 'What is the most durable countertop material?',
        a: 'Quartzite is the hardest at 7–8 on the Mohs scale, followed closely by granite and quartz at 6–7. All three resist scratches, chips, and daily wear for decades. Durability alone should not drive your decision — maintenance, heat tolerance, and appearance matter just as much.',
      },
      {
        q: 'Which countertop material is best for outdoor kitchens in Arkansas?',
        a: 'Granite is the most popular and proven outdoor countertop material. Quartzite, soapstone, and porcelain also handle UV, rain, and freeze-thaw cycles. Quartz cannot be used outdoors — UV degrades the resin binders and every manufacturer voids the warranty.',
      },
      {
        q: 'Is quartz cheaper than granite in 2026?',
        a: 'It depends on the tier. Entry-level granite starts around $40/sqft installed, while quartz starts around $50/sqft. At the mid-range, they overlap ($65–$90/sqft). Premium quartz and exotic granite both push past $100/sqft. Your total cost depends more on edge profiles, cutouts, and project complexity than the material itself.',
      },
      {
        q: 'Does marble really stain that easily?',
        a: 'Marble etches from acid contact — lemon, wine, vinegar, and tomato sauce cause dull marks on the polished surface. This is a chemical reaction, not a stain, and sealing does not prevent it. Marble does stain from oils if unsealed. If you embrace the patina that develops over time, marble is manageable. If you want a pristine surface, choose a different material.',
      },
      {
        q: 'What is the difference between quartzite and quartz?',
        a: 'Quartzite is a natural stone — metamorphic rock quarried from the earth. Every slab is unique. Quartz is an engineered product — crushed quartz crystals bound with resin to create a consistent, non-porous surface. The names cause confusion but they are fundamentally different materials with different strengths and trade-offs.',
      },
    ],
    relatedLinks: [
      { title: 'Granite vs. Quartz: The Complete Arkansas Guide', href: '/blog/granite-vs-quartz-countertops-arkansas' },
      { title: 'How Much Do Countertops Cost in Arkansas? (2026)', href: '/blog/countertop-cost-arkansas-2026' },
      { title: 'Leathered Granite: The Textured Finish Trend', href: '/blog/leathered-granite-countertops-arkansas' },
      { title: 'Outdoor Kitchen Countertops for Arkansas', href: '/blog/outdoor-kitchen-countertops-arkansas' },
      { title: 'View our package pricing', href: '/packages' },
      { title: 'Book a showroom visit', href: '/book' },
    ],
  },
];

export function getKnowledgePageBySlug(slug: string): KnowledgePage | undefined {
  return knowledgePages.find(p => p.slug === slug);
}

export function getPillarPages(): KnowledgePage[] {
  return knowledgePages.filter(p => p.category === 'pillar');
}

export function getClusterPages(pillarSlug: string): KnowledgePage[] {
  return knowledgePages.filter(p => p.category === 'cluster' && p.pillarSlug === pillarSlug);
}
