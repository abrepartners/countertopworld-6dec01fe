import StonePageLayout, { type StonePageData } from '@/components/StonePageLayout';

const data: StonePageData = {
  slug: 'natural-granite',
  tag: 'Timeless',
  title: 'Natural Granite Countertops',
  metaTitle: 'Natural Granite Countertops — Care, Cost & Design Guide | Countertop World',
  metaDescription: 'Complete guide to natural granite countertops in Arkansas. Care & sealing tips, pricing ($40-$200/sq ft), design ideas, and whether granite is right for you.',
  heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1800&auto=format&fit=crop',
  heroImageAlt: 'Natural granite countertop showing unique mineral patterns and crystals',
  subtitle: 'Each slab one-of-a-kind. Durable, heat-resistant, and eternally beautiful — irreplaceable character formed over millions of years.',
  stoneInterest: 'Natural Granite',
  overview: {
    heading: 'What Is Natural Granite?',
    intro: "Granite is an igneous rock formed deep beneath the earth's surface over millions of years. Composed primarily of quartz, feldspar, and mica, each slab carries a completely unique pattern of minerals, crystals, and veining that can never be replicated.",
    cards: [
      { title: 'One-of-a-Kind Beauty', desc: 'No two granite slabs are identical. The natural variation in color, movement, and crystal structure means your countertop is truly yours alone.' },
      { title: 'Extreme Heat Resistance', desc: 'Set a hot pot directly on granite without worry. It can withstand temperatures well above what your kitchen produces.' },
      { title: 'Proven Durability', desc: 'Granite has been used in architecture for thousands of years. With proper sealing, it easily lasts 25+ years in your home.' },
      { title: 'Adds Home Value', desc: 'Natural stone countertops consistently rank as a top feature buyers look for, offering strong return on investment.' },
    ],
    brandsTitle: 'Popular Granite Varieties',
    brandsText: 'We carry hundreds of granite colors and patterns. Some of our most popular selections include Uba Tuba, Giallo Ornamental, Santa Cecilia, Black Galaxy, White Ice, and Blue Pearl. Visit the showroom to find your slab.',
  },
  care: {
    highlight: 'The most important thing: Seal your granite countertops once a year. This 15-minute task is the key to keeping granite looking beautiful for decades.',
    sections: [
      { title: 'Daily Cleaning', content: 'Use a stone-specific cleaner or a few drops of pH-neutral dish soap with warm water. Wipe with a soft cloth and dry. Avoid paper towels on polished surfaces — they can leave micro-scratches over time.' },
      { title: 'What to Avoid', content: ['<strong>Acidic cleaners:</strong> Vinegar, lemon juice, and citrus-based cleaners can etch the surface', '<strong>Ammonia or bleach:</strong> These strip the sealer and can discolor the stone', '<strong>Leaving spills:</strong> Blot (don\'t wipe) spills immediately — especially wine, coffee, and oil'] },
      { title: 'Why Sealing Matters', content: "Granite is a natural stone with microscopic pores. Sealing fills these pores, creating a barrier against stains and moisture. A properly sealed granite countertop is remarkably resistant to everyday spills." },
    ],
    bottomHighlight: 'We can help: Countertop World offers guidance on the right sealers and maintenance schedule for your specific granite variety.',
  },
  cost: {
    intro: 'Natural granite has one of the widest price ranges: <strong>$40 to $200+ per square foot installed</strong>. The massive variation comes from the stone\'s origin, rarity, and visual character.',
    factors: [
      { title: 'Origin & Rarity', desc: 'Common domestic granites are affordable. Exotic imported varieties from Brazil, India, or Italy command premium prices.' },
      { title: 'Color & Pattern', desc: 'Whites and blues tend to cost more than browns and tans. Dramatic movement and unique mineral formations increase price.' },
      { title: 'Thickness & Finish', desc: '3cm slabs cost more than 2cm. Leathered and honed finishes require extra processing versus standard polished.' },
    ],
    tableHeaders: ['Material', 'Installed Cost/sq ft', 'Maintenance', 'Heat Resistance'],
    tableRows: [
      { cells: ['<strong>Natural Granite</strong>', '$40 – $200+', 'Moderate (annual seal)', 'Excellent'] },
      { cells: ['Engineered Quartz', '$50 – $150', 'Very Low', 'Good (use trivets)'] },
      { cells: ['Marble', '$75 – $250+', 'High', 'Good'] },
      { cells: ['Quartzite', '$70 – $200+', 'Moderate', 'Excellent'] },
    ],
    highlight: 'Granite offers exceptional value — especially at the mid-range where you get stunning natural beauty at a competitive price. Contact us for a free quote.',
  },
  design: {
    intro: "Granite's natural variation makes it incredibly versatile across design styles.",
    cards: [
      { title: 'Rustic & Farmhouse', desc: 'Warm browns and golds complement wood cabinets and apron-front sinks for a cozy, timeless kitchen.' },
      { title: 'Outdoor Kitchens', desc: "Granite excels outdoors — UV-stable, heat-proof, and weather-resistant. The ideal surface for Arkansas outdoor living." },
      { title: 'Transitional Style', desc: 'White and gray granites bridge traditional and modern design, pairing beautifully with shaker cabinets and clean hardware.' },
      { title: 'Fireplace Surrounds', desc: "Granite's heat resistance makes it perfect for fireplace mantels and hearths, adding natural elegance to living spaces." },
    ],
    listTitle: 'Finish Options',
    listItems: [
      '<strong>Polished:</strong> High-gloss mirror finish — shows the full depth of color and crystal. Most popular and easiest to clean.',
      '<strong>Honed:</strong> Matte, velvety surface with a softer, contemporary look. Requires more frequent sealing.',
      '<strong>Leathered:</strong> Textured, tactile finish that hides fingerprints and adds rustic character. Increasingly popular.',
    ],
    varieties: [
      { name: 'Black Galaxy', swatch: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f0f23 60%, #1a1a2e 100%)', images: [
        { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop', alt: 'Black Galaxy granite kitchen', caption: 'Black Galaxy granite kitchen' },
        { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop', alt: 'Dark granite powder room', caption: 'Dark granite powder room' },
        { src: 'https://images.unsplash.com/photo-1600585154526-990dced4ea0d?q=80&w=800&auto=format&fit=crop', alt: 'Black granite waterfall edge', caption: 'Black granite waterfall edge' },
        { src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop', alt: 'Black granite outdoor kitchen', caption: 'Black granite outdoor kitchen' },
      ]},
      { name: 'White Ice', swatch: 'linear-gradient(135deg, #f2efe8 0%, #e0dbd2 30%, #c9c2b6 50%, #eae5dc 100%)', images: [
        { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop', alt: 'White Ice granite bright kitchen', caption: 'White Ice granite bright kitchen' },
        { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop', alt: 'Light granite bathroom', caption: 'Light granite bathroom' },
        { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', alt: 'White granite island countertop', caption: 'White granite island countertop' },
        { src: 'https://images.unsplash.com/photo-1600573472556-e636c2acda9e?q=80&w=800&auto=format&fit=crop', alt: 'White granite laundry counter', caption: 'White granite laundry counter' },
      ]},
      { name: 'Santa Cecilia', swatch: 'linear-gradient(135deg, #d4b896 0%, #c4a67a 40%, #a8895e 60%, #d4b896 100%)', images: [
        { src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=800&auto=format&fit=crop', alt: 'Santa Cecilia granite traditional kitchen', caption: 'Santa Cecilia granite traditional kitchen' },
        { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop', alt: 'Warm granite vanity top', caption: 'Warm granite vanity top' },
        { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop', alt: 'Santa Cecilia granite breakfast bar', caption: 'Santa Cecilia granite breakfast bar' },
        { src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop', alt: 'Gold granite accent wall', caption: 'Gold granite accent wall' },
      ]},
    ],
  },
  fit: {
    heading: 'Is Natural Granite Right for You?',
    cards: [
      { type: 'yes', title: 'Perfect For You If…', items: ['You love the unique character of natural stone', "You're a cook who wants to set hot pans down freely", "You're building an outdoor kitchen", 'You appreciate that no one else will have your exact countertop', 'You want proven, time-tested durability'] },
      { type: 'maybe', title: 'Consider It If…', items: ["You're torn between granite and quartz (visit us to compare side-by-side)", 'You want natural stone on a moderate budget', "You're open to annual sealing as part of home care"] },
      { type: 'no', title: 'Look Elsewhere If…', items: ['You want absolutely zero maintenance (consider quartz)', 'You need perfectly consistent patterns across a large project', 'You prefer a perfectly uniform, man-made aesthetic'] },
    ],
    highlight: "Lifestyle match: Granite is for homeowners who appreciate nature's artistry and don't mind 15 minutes of annual care in exchange for a surface with genuine, irreplaceable character.",
  },
  faq: [
    { question: 'Does granite need to be sealed?', answer: "Yes. Natural granite should be sealed once a year (some lighter granites every 6 months). Sealing is a simple 15-minute process that protects against stains and moisture. We'll recommend the right sealer for your specific stone." },
    { question: 'Is granite outdated?', answer: 'Not at all. Granite remains one of the most popular countertop materials in new construction and renovations. Design trends shift toward different colors and finishes, but natural stone never goes out of style.' },
    { question: 'Can granite crack?', answer: 'Granite is extremely durable, but it can chip or crack from severe impact (like dropping a heavy cast iron pan on an unsupported edge). Proper installation with full support underneath prevents virtually all cracking.' },
    { question: 'Is granite safe for food preparation?', answer: 'Yes. When properly sealed, granite is a safe and hygienic surface for food prep. The sealed surface won\'t harbor bacteria and is approved for direct food contact.' },
    { question: 'How does granite compare to engineered quartz?', answer: "Both are excellent countertop materials. Granite offers unique natural beauty and superior heat resistance. Quartz offers more consistent patterns and lower maintenance. The best choice depends on your priorities — visit our showroom to compare them side by side." },
  ],
};

export default function NaturalGranitePage() {
  return <StonePageLayout data={data} />;
}
