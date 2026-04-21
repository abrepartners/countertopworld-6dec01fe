import StonePageLayout, { type StonePageData } from '@/components/StonePageLayout';

const data: StonePageData = {
  slug: 'marble',
  tag: 'Luxury',
  title: 'Marble Countertops',
  metaTitle: 'Marble Countertops — Care, Cost & Design Guide | Countertop World',
  metaDescription: 'Complete guide to marble countertops in Arkansas. Honest care advice, pricing ($75-$250+/sq ft), design ideas, and whether marble is right for your home.',
  heroImage: '/materials/hero-marble.webp',
  heroImageAlt: 'Elegant marble kitchen island with dramatic Calacatta veining',
  subtitle: 'The gold standard of elegance. Dramatic veining and sophisticated palettes that command attention in any space.',
  stoneInterest: 'Marble',
  overview: {
    heading: 'What Is Marble?',
    intro: "Marble is a metamorphic rock formed when limestone is subjected to extreme heat and pressure deep within the earth. This process creates the dramatic veining and luminous depth that has made marble the premier luxury surface material for thousands of years.",
    cards: [
      { title: 'Unmatched Elegance', desc: "Nothing compares to marble's visual impact. The depth, veining, and luminosity create a sense of luxury that no engineered material has fully replicated." },
      { title: 'Natural Cool Surface', desc: 'Marble stays naturally cool to the touch, making it the preferred surface for bakers and pastry chefs working with temperature-sensitive doughs.' },
      { title: 'Increases in Character', desc: 'Over time, marble develops a gentle patina — a soft, lived-in quality that many homeowners find adds warmth and authenticity to their space.' },
      { title: 'Timeless Investment', desc: "Marble has graced the world's finest architecture for millennia. In a home, it signals taste and permanence in a way few other materials can match." },
    ],
    brandsTitle: 'Premium Varieties',
    brandsText: 'We source exceptional marble from Italy and around the world: Calacatta (bold, dramatic veining on warm white), Carrara (soft gray feathering — the classic), Statuario (striking gray and gold veining), Emperador (rich brown tones), and Nero Marquina (dramatic black with white veining).',
  },
  care: {
    highlight: "Let's be honest: Marble is a higher-maintenance surface. If you choose marble, you're choosing beauty that asks for a bit of care in return. For many homeowners, it's absolutely worth it.",
    sections: [
      { title: 'Sealing', content: 'Seal marble every 6-12 months with a high-quality impregnating sealer. This is the single most important thing you can do to protect your investment. Lighter marbles may need more frequent sealing.' },
      { title: 'Daily Cleaning', content: 'Use only pH-neutral stone cleaners or very mild dish soap with warm water. Dry thoroughly after cleaning. Never let water pool on the surface.' },
      { title: 'What to Avoid', content: ['<strong>Acidic substances:</strong> Lemon juice, vinegar, wine, tomato sauce, and even some fruits will <em>etch</em> marble on contact', '<strong>Bleach and ammonia:</strong> These damage the surface and strip sealant', '<strong>Abrasive cleaners:</strong> Scouring powder and steel wool will scratch the polish'] },
      { title: 'Etching vs. Staining', content: 'Etching (dull marks from acid contact) and staining (discoloration from absorbed liquids) are different issues. Etching affects the surface finish; staining penetrates the stone. Sealing helps prevent stains but does not prevent etching — only careful use does.' },
    ],
    bottomHighlight: "Embrace the journey: Many marble lovers view the gradual patina as part of the stone's story. Your marble countertop will tell the story of your home — every meal, every gathering, every season.",
  },
  cost: {
    intro: 'Marble is a premium material, typically ranging from <strong>$75 to $250+ per square foot installed</strong>. Calacatta varieties sit at the top of the range, while Carrara offers a more accessible entry into marble luxury.',
    factors: [
      { title: 'Variety & Origin', desc: 'Italian Calacatta is the most expensive. Domestic and Turkish marbles offer beauty at lower price points. Rarity drives price.' },
      { title: 'Veining & Character', desc: 'Dramatic, heavily-veined slabs cost more. Bookmatched marble (two slabs mirrored) commands significant premiums.' },
      { title: 'Slab Size', desc: 'Larger, flawless slabs are rarer and more expensive. Smaller projects may access remnant pieces at reduced cost.' },
    ],
    tableHeaders: ['Material', 'Installed Cost/sq ft', 'Maintenance', 'Luxury Factor'],
    tableRows: [
      { cells: ['<strong>Marble</strong>', '$75 – $250+', 'High', 'Highest'] },
      { cells: ['Quartzite', '$70 – $200+', 'Moderate', 'Very High'] },
      { cells: ['Engineered Quartz', '$50 – $150', 'Very Low', 'High'] },
      { cells: ['Natural Granite', '$40 – $200+', 'Moderate', 'High'] },
    ],
    highlight: "Worth considering: If you love marble's look but need more durability, marble-look quartz or quartzite can deliver a similar aesthetic at a different price and maintenance level. We'll help you explore all options.",
  },
  design: {
    intro: 'Marble makes a room. Here are the most popular ways our customers use it.',
    cards: [
      { title: 'Luxury Kitchen Islands', desc: 'A Calacatta marble island is the crown jewel of high-end kitchen design. Pair with dark cabinetry and brass fixtures for maximum impact.' },
      { title: 'Master Bath Vanities', desc: "Marble transforms bathrooms into spa-like retreats. The luminous surface pairs beautifully with warm lighting and natural materials." },
      { title: 'Waterfall Edges', desc: 'When marble cascades down the side of an island, the continuous veining creates a breathtaking architectural statement.' },
      { title: 'Bookmatched Feature Walls', desc: 'Two slabs mirrored to create a symmetrical pattern — one of the most dramatic uses of natural stone in residential design.' },
    ],
    listTitle: 'Design Pairings That Work',
    listItems: [
      "<strong>Gold and brass fixtures:</strong> Warm metals complement marble's cool tones beautifully",
      '<strong>Dark cabinetry:</strong> Navy, charcoal, or black cabinets make white marble pop with dramatic contrast',
      "<strong>Natural wood:</strong> Warm wood tones soften marble's formality for a more approachable luxury",
      '<strong>Minimalist design:</strong> Let the marble be the star — simple hardware, clean lines, understated surroundings',
    ],
    varieties: [
      { name: 'Calacatta Gold', swatch: 'linear-gradient(135deg, #faf6f0 0%, #e8dfd0 30%, #c5a96e 50%, #faf6f0 70%)', images: [
        { src: '/materials/marble.webp', alt: 'Calacatta Gold marble slab detail with dramatic gold veining', caption: 'Calacatta Gold — dramatic gold veining on warm-white' },
      ]},
      { name: 'Carrara White', swatch: 'linear-gradient(135deg, #f0ece6 0%, #ddd8d0 30%, #b8b0a4 50%, #f0ece6 100%)', images: [
        { src: '/materials/var-marble-carrara.webp', alt: 'Carrara White marble slab detail with soft feathery gray veining', caption: 'Carrara White — soft feathery gray on cool white' },
      ]},
      { name: 'Statuario', swatch: 'linear-gradient(135deg, #fefcf8 0%, #eae4da 25%, #524a3e 45%, #fefcf8 65%, #d6cfc2 100%)', images: [
        { src: '/materials/var-marble-statuario.webp', alt: 'Statuario marble slab detail with bold black veining on brilliant white', caption: 'Statuario — bold black veining, high contrast' },
      ]},
      { name: 'Emperador Dark', swatch: 'linear-gradient(135deg, #4a3728 0%, #5c4636 40%, #3b2a1c 60%, #4a3728 100%)', images: [
        { src: '/materials/var-marble-emperador.webp', alt: 'Emperador Dark marble slab detail with warm cream veining on deep brown', caption: 'Emperador Dark — cream veining on chocolate brown' },
      ]},
    ],
  },
  fit: {
    heading: 'Is Marble Right for You?',
    cards: [
      { type: 'yes', title: 'Perfect For You If…', items: ["You appreciate natural beauty and don't mind some care", 'You view your home as an investment in lasting quality', 'You love the idea of a surface that develops character over time', 'You want a statement piece that guests will remember'] },
      { type: 'maybe', title: 'Consider It If…', items: ["You bake frequently (marble's cool surface is ideal for pastry)", "You're torn between marble and quartzite — visit us to compare", 'You want marble for a low-traffic area (powder room, fireplace)'] },
      { type: 'no', title: 'Look Elsewhere If…', items: ['You have young kids who spill juice and leave sticky fingerprints daily', "You cook with lots of acidic ingredients and don't want to worry", 'You want a truly zero-maintenance surface (consider engineered quartz)'] },
    ],
    highlight: "Our honest advice: If you're on the fence, consider using marble in a lower-traffic area first — a bathroom vanity or a baking station. Fall in love with it there, and you'll know if it's right for your kitchen too.",
  },
  faq: [
    { question: 'Does marble stain easily?', answer: 'Marble is porous and can absorb liquids if not properly sealed. Regular sealing every 6-12 months creates a protective barrier. With proper care, most everyday spills can be wiped away without staining.' },
    { question: 'Can you use marble in kitchens?', answer: "Absolutely — millions of kitchens worldwide feature marble countertops. The key is understanding that marble requires more care than quartz or granite. If you're willing to use coasters, wipe spills promptly, and seal regularly, marble works beautifully in kitchens." },
    { question: "What's the difference between Calacatta and Carrara?", answer: 'Both are Italian white marbles, but Calacatta features bolder, more dramatic veining with warm gold and gray tones. Carrara has softer, more subtle gray veining. Calacatta is rarer and significantly more expensive.' },
    { question: 'Can marble countertops crack?', answer: 'Marble can chip or crack from severe impact, but this is uncommon with proper installation. Full support underneath the slab and avoiding heavy point impacts keeps marble intact for decades.' },
    { question: 'How do you remove etching from marble?', answer: 'Light etching can be buffed out with marble polishing powder. Deeper etching may require professional honing. Prevention is best: use coasters, wipe acidic spills immediately, and keep the surface sealed.' },
  ],
};

export default function MarblePage() {
  return <StonePageLayout data={data} />;
}
