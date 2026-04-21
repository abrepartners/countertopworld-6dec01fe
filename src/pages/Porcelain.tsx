import StonePageLayout, { type StonePageData } from '@/components/StonePageLayout';

const data: StonePageData = {
  slug: 'porcelain',
  tag: 'Modern',
  title: 'Porcelain Countertops',
  metaTitle: 'Porcelain Countertops — Care, Cost & Design Guide | Countertop World',
  metaDescription: 'Complete guide to porcelain countertops in Arkansas. Care tips, pricing ($60-$150/sq ft), design ideas, and whether porcelain slab surfaces are right for you.',
  heroImage: '/materials/hero-porcelain.webp',
  heroImageAlt: 'Sleek modern kitchen with porcelain slab countertops',
  subtitle: 'Ultra-thin, ultra-durable, and completely stain-proof. The newest surface technology for contemporary kitchens and outdoor spaces.',
  stoneInterest: 'Porcelain',
  overview: {
    heading: 'What Are Porcelain Countertops?',
    intro: 'Porcelain countertop slabs are ultra-compact surfaces created by firing natural clays, minerals, and pigments at extreme temperatures (over 2,200°F). The result is a nearly indestructible material available in ultra-thin profiles as slim as 6mm — a revolution in surface technology.',
    cards: [
      { title: 'Virtually Indestructible', desc: 'Scratch-proof, stain-proof, UV-resistant, and heat-resistant up to 600°F. Porcelain shrugs off everything your kitchen throws at it.' },
      { title: 'Ultra-Thin Profiles', desc: "Available as thin as 6mm (compared to stone's standard 3cm), enabling sleek, contemporary designs that traditional stone can't achieve." },
      { title: 'UV Stable', desc: "Porcelain won't fade in direct sunlight — perfect for outdoor kitchens, sun-drenched spaces, and anywhere color consistency matters." },
      { title: 'Large-Format Slabs', desc: 'Available in jumbo sizes that minimize seams. Fewer seams mean cleaner lines and easier maintenance.' },
    ],
    brandsTitle: 'Leading Brands',
    brandsText: 'We carry premium porcelain slab brands including Dekton (by Cosentino), Neolith, and Lapitec. Each offers a wide range of colors, finishes, and formats to suit any design vision.',
  },
  care: {
    highlight: 'The short version: Porcelain is the easiest countertop surface to maintain. Period. No sealing, no special cleaners, no restrictions.',
    sections: [
      { title: 'Daily Cleaning', content: "Use any household cleaner. Seriously — from simple soap and water to all-purpose spray cleaners, porcelain handles them all without issue. No special products required." },
      { title: "What Can't Hurt Porcelain", content: ['<strong>Wine, coffee, turmeric:</strong> Wipe away without a trace. The non-porous surface absorbs nothing.', "<strong>UV exposure:</strong> Porcelain won't fade or discolor in direct sunlight, even after years of exposure", '<strong>Heat up to 600°F:</strong> Set hot pans directly on the surface without damage', '<strong>Harsh cleaners:</strong> Bleach, acids, solvents — porcelain resists them all'] },
      { title: 'Sealing?', content: 'Never needed. Porcelain is completely non-porous from day one and stays that way forever. There is no maintenance schedule — just clean and enjoy.' },
    ],
    bottomHighlight: 'For perspective: Porcelain countertops require less maintenance than any other surface material available today, including engineered quartz.',
  },
  cost: {
    intro: 'Porcelain countertop slabs typically range from <strong>$60 to $150 per square foot installed</strong> — competitive with mid-range quartz and granite while offering superior performance characteristics.',
    factors: [
      { title: 'Brand & Design', desc: 'Premium brands and intricate stone-look patterns cost more. Simple solid colors are the most affordable entry point.' },
      { title: 'Thickness', desc: 'Ultra-thin 6mm slabs require less material but may need substrate backing. Standard 12mm-20mm thicknesses are self-supporting.' },
      { title: 'Slab Size & Format', desc: 'Large-format slabs (up to 126" x 60") reduce seam count and improve aesthetics. Larger slabs cost more per piece.' },
    ],
    tableHeaders: ['Material', 'Installed Cost/sq ft', 'Maintenance', 'Outdoor Use'],
    tableRows: [
      { cells: ['<strong>Porcelain</strong>', '$60 – $150', 'None', 'Excellent'] },
      { cells: ['Engineered Quartz', '$50 – $150', 'Very Low', 'Limited'] },
      { cells: ['Natural Granite', '$40 – $200+', 'Moderate', 'Good'] },
      { cells: ['Quartzite', '$70 – $200+', 'Moderate', 'Good'] },
    ],
    highlight: 'Porcelain offers exceptional value when you factor in zero lifetime maintenance costs. Contact us for a personalized quote.',
  },
  design: {
    intro: "Porcelain's versatility opens design possibilities that traditional stone simply can't match.",
    cards: [
      { title: 'Ultra-Modern Kitchens', desc: 'Thin-profile porcelain with waterfall edges creates the sleek, minimalist aesthetic that defines contemporary kitchen design.' },
      { title: 'Outdoor Kitchens & BBQ', desc: "UV-stable and weather-proof — porcelain is arguably the best material for Arkansas' outdoor living spaces. Rain, sun, and heat won't faze it." },
      { title: 'Commercial Spaces', desc: "Restaurants, hotels, and retail — porcelain's durability and easy maintenance make it ideal for high-traffic commercial environments." },
      { title: 'Wall Cladding & Panels', desc: 'Thin porcelain can be used as wall panels, backsplashes, and feature walls — extending your surface material floor-to-ceiling.' },
    ],
    listTitle: 'Available Finishes',
    listItems: [
      '<strong>Marble-look:</strong> Convincing stone replicas with the veining and depth of natural marble',
      '<strong>Concrete & cement:</strong> Industrial chic with matte, tactile finishes',
      '<strong>Metal & oxide:</strong> Weathered steel and copper effects for dramatic accent surfaces',
      '<strong>Natural stone:</strong> Granite, quartzite, and slate reproductions with authentic texture',
    ],
    varieties: [
      { name: 'Marble Look', swatch: 'linear-gradient(135deg, #f8f5ef 0%, #e8e0d4 30%, #bfb5a5 50%, #f8f5ef 100%)', images: [
        { src: '/materials/var-porcelain-marble-look.webp', alt: 'Marble-look porcelain slab detail with refined gray veining, matte finish', caption: 'Marble Look — honed porcelain mimicking Calacatta' },
      ]},
      { name: 'Concrete Effect', swatch: 'linear-gradient(135deg, #a09890 0%, #8c8480 40%, #787070 60%, #a09890 100%)', images: [
        { src: '/materials/porcelain.webp', alt: 'Concrete-look matte porcelain slab detail with subtle directional texture', caption: 'Concrete Effect — matte honed, architectural' },
      ]},
      { name: 'Natural Stone Look', swatch: 'linear-gradient(135deg, #e0d8cc 0%, #c8bfb0 30%, #a89880 50%, #e0d8cc 100%)', images: [
        { src: '/materials/var-porcelain-natural-stone.webp', alt: 'Natural-stone-look porcelain slab detail with warm cream and beige tones', caption: 'Natural Stone Look — warm cream, grounded' },
      ]},
    ],
  },
  fit: {
    heading: 'Is Porcelain Right for You?',
    cards: [
      { type: 'yes', title: 'Perfect For You If…', items: ['You want the absolute lowest maintenance surface available', "You're building an outdoor kitchen or entertaining space", 'You love clean, modern, minimalist design', 'You need stain-proof performance for a busy household', 'You value cutting-edge surface technology'] },
      { type: 'maybe', title: 'Consider It If…', items: ['You want a commercial-grade surface for residential use', "You're comparing porcelain and quartz for your kitchen", 'You need wall cladding that matches your countertops'] },
      { type: 'no', title: 'Look Elsewhere If…', items: ['You prefer the warmth and character of natural stone', 'You want thick, traditional edge profiles (consider granite or quartzite)', 'You love the idea of a surface that develops a natural patina over time'] },
    ],
    highlight: 'Lifestyle match: Porcelain is for the homeowner who wants a surface that performs flawlessly without asking anything in return. If "set it and forget it" isn\'t enough — you want "never think about it" — porcelain is your material.',
  },
  faq: [
    { question: 'Can porcelain countertops be used outdoors?', answer: "Yes — this is one of porcelain's greatest strengths. UV-stable, freeze-thaw resistant, and weatherproof, porcelain is one of the best materials for outdoor kitchens, BBQ areas, and patio surfaces." },
    { question: "Is porcelain fragile because it's thin?", answer: 'No. Despite thin profiles, porcelain slabs are incredibly strong. The sintering process creates a dense, durable material. Thinner slabs (6mm) are typically bonded to a substrate for additional structural support in countertop applications.' },
    { question: 'Does porcelain look artificial?', answer: "Modern porcelain manufacturing produces remarkably realistic stone and concrete reproductions with natural-looking depth and variation. The technology has advanced significantly — today's porcelain surfaces are difficult to distinguish from natural materials." },
    { question: 'Can you cut directly on porcelain?', answer: 'While porcelain is extremely scratch-resistant, we still recommend using cutting boards to protect your knife blades. Porcelain is harder than most knife steels and will dull your blades quickly.' },
    { question: 'How does porcelain compare to engineered quartz?', answer: 'Both are low-maintenance engineered surfaces. Porcelain offers superior heat resistance (600°F vs 300°F), UV stability for outdoor use, and zero porosity. Quartz offers more edge profile options and a slightly warmer feel. Both are excellent choices.' },
  ],
};

export default function PorcelainPage() {
  return <StonePageLayout data={data} />;
}
