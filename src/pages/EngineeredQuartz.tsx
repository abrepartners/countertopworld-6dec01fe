import StonePageLayout, { type StonePageData } from '@/components/StonePageLayout';

const data: StonePageData = {
  slug: 'engineered-quartz',
  tag: 'Most Popular',
  title: 'Engineered Quartz Countertops',
  metaTitle: 'Engineered Quartz Countertops — Care, Cost & Design Guide | Countertop World',
  metaDescription: 'Complete guide to engineered quartz countertops in Arkansas. Care tips, cost ranges ($50-$150/sq ft), design ideas, and whether quartz is right for you.',
  heroImage: '/materials/hero-engineered-quartz.webp',
  heroImageAlt: 'Beautiful engineered quartz countertop with waterfall edge in a modern kitchen',
  subtitle: 'Non-porous, low maintenance, and endlessly versatile. The modern standard for kitchens and bathrooms across Arkansas.',
  stoneInterest: 'Engineered Quartz',

  overview: {
    heading: 'What Is Engineered Quartz?',
    intro: 'Engineered quartz is manufactured from approximately 90-95% ground natural quartz crystals bound together with polymer resins, pigments, and recycled materials. The result is one of the most durable and versatile countertop surfaces available today.',
    cards: [
      { title: 'Non-Porous Surface', desc: 'Never needs sealing. Resists bacteria, mold, and staining without any special treatment.' },
      { title: 'Consistent Patterns', desc: 'Unlike natural stone, quartz delivers uniform color and pattern across every slab. What you see in the showroom is what you get.' },
      { title: 'Wide Color Range', desc: 'From marble-look veining to solid whites, concrete tones, and bold colors — hundreds of options from top brands.' },
      { title: 'Exceptional Durability', desc: 'Scratch-resistant, chip-resistant, and built to handle the demands of busy households for 25+ years.' },
    ],
    brandsTitle: 'Trusted Brands We Carry',
    brandsText: 'Countertop World stocks all major engineered quartz brands with new shipments arriving weekly: Cambria, Caesarstone, Silestone, MSI, Viatera, Daltile, and more. Visit our showroom to see the full collection.',
  },

  care: {
    highlight: 'The short version: Engineered quartz is one of the lowest-maintenance countertop surfaces you can buy. A little soap and water is all you need for daily care.',
    sections: [
      { title: 'Daily Cleaning', content: "Wipe surfaces with a soft cloth, warm water, and a few drops of mild dish soap. Dry with a clean towel. That's it — really." },
      { title: 'What to Avoid', content: ['<strong>Harsh chemicals:</strong> Bleach, oven cleaners, and drain openers can damage the resin binders', '<strong>Abrasive pads:</strong> Steel wool and scouring pads will dull the finish over time', '<strong>Direct heat:</strong> Always use trivets or hot pads — sustained heat above 300°F can discolor the resin'] },
      { title: 'Stain Prevention', content: 'While quartz is highly stain-resistant, it\'s best to wipe up spills (especially wine, coffee, or turmeric) promptly. For dried-on residue, a non-abrasive cleaner or a paste of baking soda and water works well.' },
    ],
    bottomHighlight: 'Sealing? Never needed. Engineered quartz is non-porous right out of the box and stays that way for life.',
  },

  cost: {
    intro: 'Engineered quartz typically ranges from <strong>$50 to $150 per square foot installed</strong>, depending on the brand, color, edge profile, and project complexity.',
    factors: [
      { title: 'Brand & Color', desc: 'Premium brands (Cambria) and exotic patterns cost more. Solid colors and simpler designs are budget-friendly.' },
      { title: 'Edge Profile', desc: 'Simple eased edges are included. Waterfall, mitered, and ogee edges add $10-$30/linear foot.' },
      { title: 'Project Complexity', desc: 'Sink cutouts, cooktop openings, seam placement, and backsplash integration affect the final cost.' },
    ],
    tableHeaders: ['Material', 'Installed Cost/sq ft', 'Maintenance', 'Durability'],
    tableRows: [
      { cells: ['<strong>Engineered Quartz</strong>', '$50 – $150', 'Very Low', 'Excellent'] },
      { cells: ['Natural Granite', '$40 – $200', 'Moderate (seal yearly)', 'Excellent'] },
      { cells: ['Marble', '$75 – $250+', 'High (seal + care)', 'Good'] },
      { cells: ['Quartzite', '$70 – $200+', 'Moderate (seal yearly)', 'Excellent'] },
    ],
    highlight: 'Every project is unique. Contact Countertop World for a personalized quote — we\'ll measure your space and walk you through all your options.',
  },

  design: {
    intro: 'Engineered quartz adapts to virtually any design style. Here are the most popular applications we install across Arkansas.',
    cards: [
      { title: 'Kitchen Islands', desc: 'The centerpiece of modern kitchens. Quartz islands offer seamless surfaces that handle cooking, homework, and hosting.' },
      { title: 'Waterfall Edges', desc: 'The surface flows down the side of the island for a sleek, architectural statement. One of our most requested details.' },
      { title: 'Bathroom Vanities', desc: 'Non-porous quartz stands up to daily moisture, cosmetics, and cleaning products without staining or warping.' },
      { title: 'Full-Height Backsplashes', desc: 'Extend your countertop material up the wall for a seamless, easy-to-clean cooking area.' },
    ],
    listTitle: 'Trending Styles',
    listItems: [
      '<strong>Marble-look quartz:</strong> The elegant veining of Calacatta or Carrara without the maintenance — our top seller',
      '<strong>Concrete & industrial tones:</strong> Matte gray and warm taupe for modern farmhouse and industrial kitchens',
      '<strong>Solid whites:</strong> Bright, clean, and timeless — the minimalist\'s dream surface',
      '<strong>Bold veining:</strong> Dramatic movement and contrast for homeowners who want a statement',
    ],
    varieties: [
      { name: 'Calacatta Look', swatch: 'linear-gradient(135deg, #f5f0ea 0%, #e8ddd0 40%, #c9bfb0 60%, #f5f0ea 100%)', images: [
        { src: '/materials/engineered-quartz.webp', alt: 'Calacatta-style engineered quartz slab detail with refined gray veining', caption: 'Calacatta Look — refined gray veining on warm-white' },
      ]},
      { name: 'Concrete Gray', swatch: 'linear-gradient(135deg, #9e9e9e 0%, #b0b0b0 40%, #888 60%, #a5a5a5 100%)', images: [
        { src: '/materials/var-eq-concrete-gray.webp', alt: 'Concrete gray engineered quartz slab detail, matte honed finish', caption: 'Concrete Gray — matte honed, architectural' },
      ]},
      { name: 'Solid White', swatch: 'linear-gradient(135deg, #fff 0%, #f8f8f8 40%, #f0eded 60%, #fff 100%)', images: [
        { src: '/materials/var-eq-solid-white.webp', alt: 'Solid white engineered quartz slab detail, pristine uniform surface', caption: 'Solid White — minimal, clean, timeless' },
      ]},
      { name: 'Bold Veining', swatch: 'linear-gradient(135deg, #f0ebe4 0%, #d4c9ba 30%, #3a3530 50%, #f0ebe4 70%, #c4b9aa 100%)', images: [
        { src: '/materials/var-eq-bold-veining.webp', alt: 'Bold-vein engineered quartz slab detail with thick black veining on white', caption: 'Bold Veining — dramatic black rivers on white' },
      ]},
    ],
  },

  fit: {
    heading: 'Is Engineered Quartz Right for You?',
    cards: [
      { type: 'yes', title: 'Perfect For You If…', items: ['You want a beautiful surface without ongoing maintenance', 'You have a busy household with kids', 'You prefer consistent patterns and wide color choices', "You're building rental or investment properties", 'You value a surface that never needs sealing'] },
      { type: 'maybe', title: 'Consider It If…', items: ["You want luxury without marble's upkeep", "You're choosing between quartz and granite", 'You need outdoor surfaces (check UV-stable options)'] },
      { type: 'no', title: 'Look Elsewhere If…', items: ['You want 100% natural stone character', 'You routinely set hot pans directly on surfaces', 'You love the idea of a surface that develops patina'] },
    ],
    highlight: 'Lifestyle match: Engineered quartz is the "set it and forget it" surface. If you want to spend time enjoying your kitchen instead of maintaining it, quartz is likely your best choice.',
  },

  faq: [
    { question: 'Is engineered quartz heat resistant?', answer: 'Quartz can handle brief contact with warm items, but sustained heat above 300°F can damage the resin binders. Always use trivets or hot pads when placing hot cookware on quartz surfaces.' },
    { question: 'Can quartz countertops stain?', answer: 'Quartz is highly stain-resistant thanks to its non-porous surface, but prolonged contact with strong pigments like turmeric, wine, or permanent marker can leave marks. Wipe spills promptly for best results.' },
    { question: 'How long do quartz countertops last?', answer: "With proper care, engineered quartz countertops last 25 years or more. Many manufacturers offer 10-15 year warranties, and the surface doesn't degrade with normal household use." },
    { question: 'Is quartz cheaper than granite?', answer: 'The two are similarly priced, with both ranging from $40-$200 per square foot installed. Entry-level quartz and granite are comparable, while premium options in both materials cost more.' },
    { question: 'Can you use engineered quartz outdoors?', answer: 'Standard quartz is not recommended for outdoor use because UV exposure can cause discoloration over time. Some newer UV-stable formulations exist — ask us about outdoor-rated options.' },
  ],
};

export default function EngineeredQuartzPage() {
  return <StonePageLayout data={data} />;
}
