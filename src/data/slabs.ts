// Stone Visualizer slab library.
// Display names are provisional visual IDs — confirm against CW inventory before launch.
export interface Slab {
  id: string;
  name: string;
  description: string; // fed to the AI prompt as the stone description
  image: string;
}

export const SLABS: Slab[] = [
  { id: "azul-fusion", name: "Azul Fusion Quartzite", description: "dramatic blue-gray quartzite with rust and copper veining", image: "/slabs/slab-01-azul-fusion-quartzite.jpg" },
  { id: "sequoia-brown", name: "Sequoia Brown Quartzite", description: "warm brown quartzite with diagonal cream and green banding", image: "/slabs/slab-02-sequoia-brown-quartzite.jpg" },
  { id: "emerald", name: "Emerald Quartzite", description: "teal green quartzite with fine red veining", image: "/slabs/slab-03-emerald-quartzite.jpg" },
  { id: "copper-canyon", name: "Copper Canyon Quartzite", description: "cream quartzite with bold burgundy and black flow patterns", image: "/slabs/slab-04-copper-canyon-quartzite.jpg" },
  { id: "fusion-gold", name: "Fusion Gold Granite", description: "rust, sage and cream granite with organic swirls", image: "/slabs/slab-05-fusion-gold-granite.jpg" },
  { id: "marinace-black", name: "Marinace Black Granite", description: "black granite with rounded rosewood pebble inclusions", image: "/slabs/slab-06-marinace-black-granite.jpg" },
  { id: "copper-river", name: "Copper River Quartzite", description: "rust quartzite split by a white crystalline river vein", image: "/slabs/slab-07-copper-river-quartzite.jpg" },
  { id: "emerald-bay", name: "Emerald Bay Quartzite", description: "deep teal quartzite with layered wave veining", image: "/slabs/slab-08-emerald-bay-quartzite.jpg" },
  { id: "silver-ridge", name: "Silver Ridge Marble", description: "silver-gray marble with bold charcoal fracture veining", image: "/slabs/slab-09-silver-ridge-marble.jpg" },
  { id: "golden-fusion", name: "Golden Fusion Marble", description: "charcoal gray marble with vivid gold rivers", image: "/slabs/slab-10-golden-fusion-marble.jpg" },
];

export const SURFACES = [
  { id: "countertop", label: "Countertops", hint: "All kitchen counters" },
  { id: "island", label: "Island Only", hint: "Just the island top" },
  { id: "vanity", label: "Vanity", hint: "Bathroom vanity top" },
  { id: "backsplash", label: "Backsplash", hint: "Between counter & cabinets" },
  { id: "shower", label: "Shower", hint: "Shower walls" },
  { id: "fireplace", label: "Fireplace", hint: "Fireplace surround" },
] as const;

export type SurfaceId = (typeof SURFACES)[number]["id"];
