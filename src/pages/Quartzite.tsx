import StonePageLayout, { type StonePageData } from '@/components/StonePageLayout';

const data: StonePageData = {
  slug: 'quartzite',
  tag: 'Premium',
  title: 'Quartzite Countertops',
  metaTitle: 'Quartzite Countertops — Care, Cost & Design Guide | Countertop World',
  metaDescription: 'Complete guide to quartzite countertops in Arkansas. Care tips, pricing ($70-$200+/sq ft), design ideas, and whether quartzite is the right stone for you.',
  heroImage: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=1800&auto=format&fit=crop',
  heroImageAlt: 'White quartzite countertop with soft veining in a luxury bathroom',
  subtitle: 'The look of marble with the strength of granite. Natural beauty without compromise — for homeowners who want it all.',
  stoneInterest: 'Quartzite',
  overview: {
    heading: 'What Is Quartzite?',
    intro: 'Quartzite is a natural metamorphic rock formed when sandstone is subjected to extreme heat and pressure. It rates a 7 on the Mohs hardness scale — harder than granite — while offering the luminous, veined appearance that many associate with marble. Important: quartzite is NOT the same as engineered quartz.',
    cards: [
      { title: "Marble's Look, Granite's Strength", desc: 'Quartzite delivers the soft, veined beauty of marble with durability that exceeds most natural stones. It\'s the best of both worlds.' },
      { title: 'Exceptional Hardness', desc: 'At 7 on the Mohs scale (granite is 6-7), quartzite is extremely resistant to scratching and chipping in daily kitchen use.' },
      { title: 'Heat Resistant', desc: "Unlike engineered quartz, natural quartzite handles heat beautifully. Hot pots and pans won't damage the surface." },
      { title: 'UV Stable', desc: "Quartzite won't fade in sunlight, making it suitable for outdoor applications and sun-drenched kitchens." },
    ],
    brandsTitle: 'Sought-After Varieties',
    brandsText: "We source exceptional quartzite including Taj Mahal (warm cream with soft gold veining), Super White (clean white with subtle gray), Calacatta Macaubas (bold marble-like veining), Sea Pearl (silver and blue-gray movement), and Fantasy Brown (warm browns with white veining).",
  },
  care: {
    highlight: 'Good news: Quartzite is significantly more forgiving than marble. It requires similar care to granite — annual sealing and sensible daily cleaning.',
    sections: [
      { title: 'Sealing', content: "Seal quartzite once a year with a quality impregnating stone sealer. Some denser quartzites may need sealing less frequently. We'll advise you based on your specific variety." },
      { title: 'Daily Cleaning', content: 'Use a pH-neutral stone cleaner or mild dish soap with warm water. Avoid acidic cleaners (though quartzite is much more resistant to etching than marble).' },
      { title: 'What Makes Quartzite Easier Than Marble', content: ["<strong>More scratch-resistant:</strong> Quartzite's hardness means knives and abrasive objects are less likely to leave marks", '<strong>More etch-resistant:</strong> While not immune, quartzite handles acidic spills much better than marble', '<strong>More heat-resistant:</strong> Hot pans and trivets are less of a concern'] },
    ],
    bottomHighlight: "Bottom line: If you can handle granite's maintenance level, quartzite is no harder to care for — and you get marble-like beauty in return.",
  },
  cost: {
    intro: 'Quartzite is a premium natural stone, typically ranging from <strong>$70 to $200+ per square foot installed</strong>. It sits at the higher end of natural stone pricing, reflecting its rarity and exceptional properties.',
    factors: [
      { title: 'Pattern Rarity', desc: 'Exotic movement and rare color combinations command top dollar. Taj Mahal quartzite, for example, is highly sought-after and priced accordingly.' },
      { title: 'Origin', desc: 'Brazil is the primary source for premium quartzite. Transportation, import costs, and limited supply from specific quarries affect pricing.' },
      { title: 'Slab Selection', desc: 'Bookmatched pairs and large, flawless slabs cost more. The specific slab you choose affects the price significantly.' },
    ],
    tableHeaders: ['Material', 'Installed Cost/sq ft', 'Hardness', 'Maintenance'],
    tableRows: [
      { cells: ['<strong>Quartzite</strong>', '$70 – $200+', '7 (Mohs)', 'Moderate'] },
      { cells: ['Marble', '$75 – $250+', '3-5 (Mohs)', 'High'] },
      { cells: ['Engineered Quartz', '$50 – $150', '7 (Mohs)*', 'Very Low'] },
      { cells: ['Natural Granite', '$40 – $200+', '6-7 (Mohs)', 'Moderate'] },
    ],
    footnote: '*Engineered quartz hardness is from the quartz content, but resin binders affect heat and UV resistance.',
    highlight: "The value proposition: Quartzite costs more than granite but offers marble's aesthetic with granite-level (or better) durability. For many homeowners, it's the perfect compromise. Contact us for a personalized quote.",
  },
  design: {
    intro: "Quartzite is the designer's stone — it works everywhere marble does, with fewer compromises.",
    cards: [
      { title: 'Luxury Kitchen Islands', desc: 'Where marble might worry you, quartzite delivers the same visual impact with daily-driver durability. The ideal choice for active, design-forward kitchens.' },
      { title: 'Bookmatched Feature Walls', desc: 'Two quartzite slabs mirrored to create a symmetrical masterpiece. Stunning behind a range or as a bathroom focal point.' },
      { title: 'Outdoor Kitchens', desc: 'UV-stable and weather-resistant, quartzite is one of the few luxury stones that performs beautifully in outdoor applications.' },
      { title: 'Waterfall Islands', desc: 'The continuous veining flowing from the countertop down to the floor creates an architectural moment that stops people in their tracks.' },
    ],
    listTitle: 'Style Compatibility',
    listItems: [
      '<strong>Modern:</strong> Super White quartzite with clean-lined cabinetry and matte black hardware',
      '<strong>Transitional:</strong> Taj Mahal quartzite with warm wood and mixed metals',
      '<strong>Contemporary:</strong> Calacatta Macaubas with waterfall edges and integrated lighting',
      '<strong>Traditional:</strong> Fantasy Brown with raised-panel cabinets and classic fixtures',
    ],
    varieties: [
      { name: 'Taj Mahal', swatch: 'linear-gradient(135deg, #f5efe5 0%, #e2d5c0 30%, #c8b79a 50%, #f5efe5 100%)', images: [
        { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', alt: 'Taj Mahal quartzite open kitchen', caption: 'Taj Mahal quartzite open kitchen' },
        { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop', alt: 'Taj Mahal quartzite bath', caption: 'Taj Mahal quartzite bath' },
        { src: 'https://images.unsplash.com/photo-1600585154526-990dced4ea0d?q=80&w=800&auto=format&fit=crop', alt: 'Taj Mahal waterfall edge', caption: 'Taj Mahal waterfall edge' },
        { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop', alt: 'Taj Mahal quartzite island', caption: 'Taj Mahal quartzite island' },
      ]},
      { name: 'Super White', swatch: 'linear-gradient(135deg, #faf8f4 0%, #ece8e0 30%, #d8d2c8 50%, #faf8f4 100%)', images: [
        { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop', alt: 'Super White quartzite minimal kitchen', caption: 'Super White quartzite minimal kitchen' },
        { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop', alt: 'Super White quartzite bathroom', caption: 'Super White quartzite bathroom' },
        { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop', alt: 'Super White waterfall counter', caption: 'Super White waterfall counter' },
        { src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop', alt: 'Super White quartzite laundry', caption: 'Super White quartzite laundry' },
      ]},
      { name: 'Fusion Wow', swatch: 'linear-gradient(135deg, #d4c4a8 0%, #a08060 30%, #6b4e38 50%, #d4c4a8 70%, #8a6b50 100%)', images: [
        { src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=800&auto=format&fit=crop', alt: 'Fusion quartzite statement kitchen', caption: 'Fusion quartzite statement kitchen' },
        { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop', alt: 'Exotic quartzite vanity', caption: 'Exotic quartzite vanity' },
        { src: 'https://images.unsplash.com/photo-1600585154526-990dced4ea0d?q=80&w=800&auto=format&fit=crop', alt: 'Fusion quartzite waterfall', caption: 'Fusion quartzite waterfall' },
        { src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop', alt: 'Fusion quartzite accent feature', caption: 'Fusion quartzite accent feature' },
      ]},
    ],
  },
  fit: {
    heading: 'Is Quartzite Right for You?',
    cards: [
      { type: 'yes', title: 'Perfect For You If…', items: ["You love marble's look but need more daily durability", 'You cook often, entertain regularly, and live in your kitchen', 'You want a natural stone with genuine one-of-a-kind character', 'You appreciate luxury materials that perform under pressure'] },
      { type: 'maybe', title: 'Consider It If…', items: ["You're torn between marble and a more practical option", "You're building an outdoor kitchen and want a premium surface", 'Budget allows for a higher-end natural stone investment'] },
      { type: 'no', title: 'Look Elsewhere If…', items: ["You're on a tight countertop budget (engineered quartz offers great value)", 'You want absolutely zero maintenance (quartz wins here)', 'You prefer perfectly uniform, consistent patterns across your space'] },
    ],
    highlight: "Our recommendation: If you've been eyeing marble but worry about daily use, quartzite is almost certainly your answer. Come see it in person — the photos don't do it justice.",
  },
  faq: [
    { question: 'Is quartzite the same as engineered quartz?', answer: 'No — they are completely different materials. Quartzite is a natural stone (metamorphic sandstone). Engineered quartz is a manufactured product made from ground quartz and polymer resins. They share a name but differ in origin, properties, and care requirements.' },
    { question: 'Does quartzite need sealing?', answer: 'Yes. Like granite, quartzite should be sealed annually with an impregnating stone sealer. Some denser quartzites absorb less and may need sealing less frequently.' },
    { question: 'Can quartzite handle hot pans?', answer: "Yes. Natural quartzite has excellent heat resistance and can handle hot cookware without damage — a significant advantage over engineered quartz, which can be damaged by high heat." },
    { question: 'Is quartzite more durable than granite?', answer: 'Quartzite is slightly harder than most granites (7 vs. 6-7 on the Mohs scale) and is extremely scratch-resistant. Both are excellent in terms of overall durability for countertop use.' },
    { question: 'Why is quartzite expensive?', answer: "Quartzite's premium pricing reflects its rarity (limited quarries, mostly in Brazil), the difficulty of fabrication (its hardness makes it harder to cut), and its unique combination of marble aesthetics with superior durability." },
  ],
};

export default function QuartzitePage() {
  return <StonePageLayout data={data} />;
}
