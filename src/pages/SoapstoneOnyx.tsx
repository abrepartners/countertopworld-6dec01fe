import StonePageLayout, { type StonePageData } from '@/components/StonePageLayout';

const data: StonePageData = {
  slug: 'soapstone-onyx',
  tag: 'Exotic',
  title: 'Soapstone & Onyx Countertops',
  metaTitle: 'Soapstone & Onyx Countertops — Care, Cost & Design Guide | Countertop World',
  metaDescription: 'Complete guide to soapstone and onyx countertops in Arkansas. Care tips, pricing, design ideas, and whether these exotic stones are right for your home.',
  heroImage: '/materials/hero-onyx.webp',
  heroImageAlt: 'Dark soapstone countertop with velvety matte finish',
  subtitle: "From soapstone's velvety warmth to onyx's translucent drama. Statement pieces for homeowners who dare to be different.",
  stoneInterest: 'Soapstone & Onyx',
  overview: {
    heading: 'Two Extraordinary Stones',
    intro: 'Soapstone and onyx represent the far ends of the countertop spectrum — one warm, forgiving, and understated; the other dramatic, translucent, and bold. Both are exotic choices that make a statement no other material can match.',
    cards: [
      { title: 'Soapstone: Velvety Warmth', desc: 'A naturally non-porous metamorphic rock with a soft, velvety texture. Used in science labs for centuries, soapstone is remarkably resistant to chemicals and heat. It darkens beautifully over time — a living surface.' },
      { title: 'Onyx: Translucent Drama', desc: 'A calcite-based stone with stunning translucency. When backlit, onyx glows from within — creating one of the most visually striking effects in all of interior design.' },
      { title: 'Soapstone Character', desc: 'Starts as light gray and gradually darkens to a rich charcoal. You can accelerate this with mineral oil or let it happen naturally. Either way, the result is stunning.' },
      { title: 'Onyx Rarity', desc: 'Onyx is one of the rarest countertop materials. Each slab features dramatic, flowing veining and colors ranging from creamy white to deep green, honey gold, and pink.' },
    ],
  },
  care: {
    highlight: 'Soapstone is surprisingly forgiving — naturally non-porous, so it never needs sealing. Onyx requires more intentional care.',
    sections: [
      { title: 'Soapstone Care', content: ['<strong>Daily cleaning:</strong> Soap and water — any soap, any cleaner. Soapstone is remarkably chemical-resistant.', '<strong>Mineral oil:</strong> Apply periodically to deepen the color and create a uniform dark patina faster. This is optional — soapstone darkens naturally over time.', '<strong>Scratches:</strong> Light scratches can be sanded out with fine-grit sandpaper and a drop of mineral oil. This is unique to soapstone — it\'s genuinely repairable.', '<strong>Heat:</strong> Soapstone is extremely heat-resistant. You can set hot pots directly on it without concern.'] },
      { title: 'Onyx Care', content: ['<strong>Seal every 6-12 months:</strong> Onyx is porous and needs regular sealing to resist stains', '<strong>pH-neutral cleaners only:</strong> Acids (vinegar, citrus, wine) will etch onyx on contact', '<strong>Avoid heavy impact:</strong> Onyx is softer than granite and quartzite — treat it gently', '<strong>Best in low-traffic areas:</strong> Powder rooms, bar tops, accent walls — places where it\'s admired more than abused'] },
    ],
  },
  cost: {
    intro: 'Both soapstone and onyx are specialty materials with pricing that reflects their rarity and unique character.',
    factors: [
      { title: 'Soapstone Pricing', desc: 'Color, origin (Brazil is primary source), and slab size drive cost. Darker, more dramatic soapstone slabs tend to be more expensive.' },
      { title: 'Onyx Pricing', desc: 'Rarity is the main factor. Backlit-suitable slabs (thin enough to transmit light) command significant premiums. Color and veining pattern also affect price.' },
    ],
    tableHeaders: ['Stone', 'Installed Cost/sq ft', 'Maintenance', 'Best Use'],
    tableRows: [
      { cells: ['<strong>Soapstone</strong>', '$70 – $150', 'Low (no sealing)', 'Kitchens, labs, fireplaces'] },
      { cells: ['<strong>Onyx</strong>', '$100 – $300+', 'High (regular sealing)', 'Accent pieces, backlit features'] },
      { cells: ['Marble', '$75 – $250+', 'High', 'Luxury kitchens, baths'] },
      { cells: ['Quartzite', '$70 – $200+', 'Moderate', 'Active luxury kitchens'] },
    ],
    highlight: "These are statement investments. Soapstone and onyx aren't mass-market materials — they're for homeowners who want something genuinely unique. Contact us to discuss your vision.",
  },
  design: {
    intro: 'These exotic stones shine in applications where they can make a statement.',
    cards: [
      { title: 'Farmhouse Kitchens', desc: "Soapstone's warm, matte surface is the soul of farmhouse design. Pair with apron-front sinks, open shelving, and reclaimed wood." },
      { title: 'Wine Bars & Wet Bars', desc: 'Chemical-resistant and naturally dark — soapstone hides wine stains and creates an intimate, sophisticated bar atmosphere.' },
      { title: 'Backlit Bar Tops', desc: 'The signature onyx application. LED lighting behind translucent onyx creates a warm, ethereal glow that transforms any bar or reception area.' },
      { title: 'Powder Room Vanities', desc: 'A low-traffic space where onyx can be the star. The dramatic veining turns a small room into a design moment.' },
    ],
    varieties: [
      { name: 'Classic Soapstone', swatch: 'linear-gradient(135deg, #5a5a5a 0%, #4a4a4a 40%, #3a3a3a 60%, #5a5a5a 100%)', images: [
        { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop', alt: 'Classic soapstone farmhouse kitchen', caption: 'Classic soapstone farmhouse kitchen' },
        { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop', alt: 'Soapstone bathroom vanity', caption: 'Soapstone bathroom vanity' },
        { src: 'https://images.unsplash.com/photo-1600585154526-990dced4ea0d?q=80&w=800&auto=format&fit=crop', alt: 'Soapstone waterfall counter', caption: 'Soapstone waterfall counter' },
        { src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop', alt: 'Soapstone utility sink', caption: 'Soapstone utility sink' },
      ]},
      { name: 'Backlit Onyx', swatch: 'linear-gradient(135deg, #e8d8b8 0%, #c9a86c 30%, #f0e0c0 50%, #8b6914 70%, #e8d8b8 100%)', images: [
        { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', alt: 'Backlit onyx luxury bar', caption: 'Backlit onyx luxury bar' },
        { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop', alt: 'Illuminated onyx powder room', caption: 'Illuminated onyx powder room' },
        { src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=800&auto=format&fit=crop', alt: 'Onyx accent wall', caption: 'Onyx accent wall' },
        { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop', alt: 'Backlit onyx reception desk', caption: 'Backlit onyx reception desk' },
      ]},
      { name: 'Green Soapstone', swatch: 'linear-gradient(135deg, #5a6b5a 0%, #4a5b4a 40%, #3a4b3a 60%, #5a6b5a 100%)', images: [
        { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop', alt: 'Green soapstone rustic kitchen', caption: 'Green soapstone rustic kitchen' },
        { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop', alt: 'Green soapstone bathroom', caption: 'Green soapstone bathroom' },
        { src: 'https://images.unsplash.com/photo-1600585154526-990dced4ea0d?q=80&w=800&auto=format&fit=crop', alt: 'Green soapstone apron sink', caption: 'Green soapstone apron sink' },
        { src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop', alt: 'Green soapstone mudroom', caption: 'Green soapstone mudroom' },
      ]},
    ],
  },
  fit: {
    heading: 'Is Soapstone or Onyx Right for You?',
    sections: [
      {
        title: 'Soapstone',
        cards: [
          { type: 'yes', title: 'Perfect If…', items: ['You love the idea of a surface that ages beautifully', 'You prefer a warm, matte, tactile surface over glossy polish', 'You cook with heat and chemicals without worry', 'You appreciate farmhouse, rustic, or old-world aesthetics'] },
          { type: 'no', title: 'Not Ideal If…', items: ['You want a bright, light-colored countertop (soapstone darkens)', 'You dislike the idea of visible scratches (even fixable ones)', 'You prefer a high-gloss, polished surface'] },
        ],
      },
      {
        title: 'Onyx',
        cards: [
          { type: 'yes', title: 'Perfect If…', items: ['You want a true showpiece that no one else has', "You're designing a dramatic bar, powder room, or commercial space", 'You appreciate the artistry of backlighting natural stone'] },
          { type: 'no', title: 'Not Ideal If…', items: ['You need a surface for heavy daily kitchen use', 'You want low-maintenance countertops', "You're working with a conservative budget"] },
        ],
      },
    ],
    highlight: "Our advice: Soapstone and onyx aren't for everyone — and that's the point. If you're drawn to one of these materials, come see them in our showroom. Touching soapstone's velvety surface or seeing backlit onyx in person will tell you everything you need to know.",
  },
  faq: [
    { question: 'Does soapstone scratch easily?', answer: "Soapstone is softer than granite, so it can scratch with sharp objects. However, this is actually an advantage: light scratches can be sanded out with fine sandpaper and a drop of mineral oil, making soapstone one of the only truly repairable countertop surfaces." },
    { question: 'Can onyx be used as a kitchen countertop?', answer: "While possible, onyx is better suited for low-traffic areas. It's softer and more porous than granite or quartzite, making it vulnerable to etching and staining in a busy kitchen. Onyx excels as accent pieces, bar tops, and vanities." },
    { question: 'Why does soapstone change color?', answer: "Soapstone naturally oxidizes over time, causing it to darken from light gray to rich charcoal. This is a feature, not a flaw — it's the stone developing its signature patina. Applying mineral oil accelerates the process and creates a uniform color." },
    { question: 'How do you backlight onyx?', answer: "LED strip lighting is installed behind the onyx slab (which must be thin enough to transmit light — typically 2cm or less). The stone is mounted with an air gap between the lights and the slab for even illumination. Our team can guide you through the technical requirements." },
    { question: 'Is soapstone heat resistant?', answer: 'Extremely. Soapstone has been used in wood-burning stoves and laboratory surfaces for centuries specifically because of its ability to absorb and withstand extreme heat. You can set hot pots and pans directly on soapstone without any risk of damage.' },
  ],
};

export default function SoapstoneOnyxPage() {
  return <StonePageLayout data={data} />;
}
