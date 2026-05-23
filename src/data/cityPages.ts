export type CityPageData = {
  slug: string;
  cityName: string;
  region: "central" | "nwa";
  nearestShowroom: {
    name: string;
    address: string;
    phone: string;
    hours: string;
    mapQuery: string;
  };
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  localContext: string;
  driveTime: string;
  nearbyAreas: { name: string; slug: string }[];
  faq: { q: string; a: string }[];
};

const SHOWROOMS = {
  bryant: {
    name: "Bryant Showroom — Central Arkansas",
    address: "26096 Interstate 30, Bryant, AR 72022",
    phone: "(501) 481-8117",
    hours: "Mon–Fri 8am–5pm · Sat 9am–1pm",
    mapQuery: "Countertop+World,26096+Interstate+30,Bryant,AR+72022",
  },
  rogers: {
    name: "Rogers Showroom — Northwest Arkansas",
    address: "1706 Commerce Dr, Rogers, AR 72756",
    phone: "(479) 900-9119",
    hours: "Mon–Fri 8am–5pm · Sat by appt",
    mapQuery: "Countertop+World,1706+Commerce+Dr,Rogers,AR+72756",
  },
};

export const cityPages: Record<string, CityPageData> = {
  "little-rock": {
    slug: "little-rock",
    cityName: "Little Rock",
    region: "central",
    nearestShowroom: SHOWROOMS.bryant,
    metaTitle:
      "Countertops in Little Rock, AR | Granite, Quartz & Marble — Countertop World",
    metaDescription:
      "Little Rock countertop fabrication and installation. Granite, quartz, marble, and quartzite — cut and installed by our own crew. Free estimates. Bryant showroom is 15 minutes south.",
    heroSubtitle:
      "Arkansas's capital city deserves countertops cut by Arkansas's largest fabricator. Our Bryant showroom is a straight shot down I-30 — 15 minutes from downtown Little Rock.",
    localContext:
      "Little Rock homeowners remodeling in Hillcrest, The Heights, Pleasant Valley, Chenal Valley, and West Little Rock trust Countertop World for stone fabrication. We serve the entire metro — from Maumelle to Sherwood to Jacksonville — with in-house measuring, cutting, and installation.",
    driveTime: "~15 min from downtown LR",
    nearbyAreas: [
      { name: "Bryant", slug: "bryant" },
      { name: "Conway", slug: "conway" },
      { name: "Hot Springs", slug: "hot-springs" },
    ],
    faq: [
      {
        q: "How far is Countertop World from Little Rock?",
        a: "Our Bryant showroom is about 15 minutes south of downtown Little Rock on I-30. Most Little Rock homeowners are at our door in under 20 minutes.",
      },
      {
        q: "Do you install countertops in Little Rock?",
        a: "Yes. We install throughout the entire Little Rock metro — including The Heights, Hillcrest, Chenal Valley, West Little Rock, Maumelle, Sherwood, and North Little Rock. Our own crew handles every install.",
      },
      {
        q: "How much do countertops cost in Little Rock?",
        a: "Granite starts around $40/sq ft installed, engineered quartz from $50/sq ft, and premium stones like marble and quartzite from $70/sq ft. We provide free in-home estimates with exact pricing for your layout.",
      },
      {
        q: "Can I see full slabs before I choose?",
        a: "Absolutely. Our Bryant showroom has 1,000+ full slabs on-site. We encourage every homeowner to come pick their exact slab in person — photos never capture the true color and veining.",
      },
      {
        q: "How long does a countertop project take in Little Rock?",
        a: "Most kitchen countertop projects go from template to install in 7–10 business days. The install itself is typically completed in one day.",
      },
      {
        q: "How much do countertops cost in Central Arkansas?",
        a: "In 2026, countertop pricing in Central Arkansas typically ranges from $50–$80 per square foot installed for standard granite and entry-level quartz, $75–$110 for premium quartz brands (Cambria, Caesarstone), and $90–$175 for natural quartzite. A typical kitchen with 35 square feet of countertop surface runs $1,750–$6,000+ depending on material. Contact us for a free project-specific quote.",
      },
      {
        q: "How long does countertop installation take?",
        a: "From your first visit to completed installation, most residential projects take about 2–3 weeks. The process includes a showroom consultation and slab selection (day 1), digital laser templating after cabinets are set (scheduled within a few days), fabrication in our Bryant facility (7–10 business days), and installation (typically completed in one day).",
      },
      {
        q: "Can I pick my own slab?",
        a: "Yes — and we strongly encourage it. Our Bryant showroom at 26096 Interstate 30 has hundreds of full-size granite, quartz, quartzite, and marble slabs standing upright in our warehouse. You'll see the exact piece of stone that will go in your home before we cut it. No surprises.",
      },
      {
        q: "What is a leathered finish and where can I get one in Arkansas?",
        a: "A leathered finish is a textured matte surface created by running natural stone through a specialized Sasso-Lux machine with diamond-tipped brushes. It hides fingerprints, reduces glare, and adds warmth compared to a polished finish. Countertop World is the only fabricator in Arkansas with a Sasso-Lux machine, making us the only source for leathered, brushed, and antiqued finishes in the state.",
      },
      {
        q: "Do you do commercial projects?",
        a: "Yes. We fabricate countertops for multi-family housing, fitness centers, medical offices, restaurants, and retail spaces. Our CNC equipment and in-house capacity allow us to handle large-volume projects with consistent quality and phased delivery to match your construction schedule.",
      },
    ],
  },
  bryant: {
    slug: "bryant",
    cityName: "Bryant",
    region: "central",
    nearestShowroom: SHOWROOMS.bryant,
    metaTitle:
      "Countertops in Bryant, AR | Granite, Quartz & Marble — Countertop World",
    metaDescription:
      "Bryant countertop fabrication and installation. Visit our flagship showroom on I-30 with 1,000+ slabs, Sasso-Lux finishing, and in-house installation. Free estimates.",
    heroSubtitle:
      "Our flagship showroom and fabrication facility is right here in Bryant on Interstate 30. Walk in, pick your slab, and we handle the rest — all under one roof.",
    localContext:
      "Bryant and Saline County homeowners have the advantage of living minutes from our flagship facility. From new builds in Hurricane Creek to kitchen remodels in Salem and Benton, we serve the entire Saline County corridor with same-week templating availability.",
    driveTime: "You're already here",
    nearbyAreas: [
      { name: "Little Rock", slug: "little-rock" },
      { name: "Hot Springs", slug: "hot-springs" },
      { name: "Conway", slug: "conway" },
    ],
    faq: [
      {
        q: "Where is Countertop World in Bryant?",
        a: "We're at 26096 Interstate 30 in Bryant — right off the highway. Look for our showroom on the south side of I-30. Easy access from Benton, Salem, and the Saline County corridor.",
      },
      {
        q: "Do you fabricate on-site in Bryant?",
        a: "Yes. Our Bryant location is both a showroom and a full fabrication facility. We laser-template, CNC-cut, Sasso-Lux finish, and install — all from this location. Nothing is outsourced.",
      },
      {
        q: "What are your Bryant showroom hours?",
        a: "Monday through Friday 8am–5pm, Saturday 9am–1pm. Walk-ins are welcome, but scheduling a visit ensures a team member is available to walk you through options.",
      },
      {
        q: "Do you serve Benton and Saline County?",
        a: "Yes. We serve the entire Saline County area — Bryant, Benton, Salem, Bauxite, Alexander, and surrounding communities. Most addresses in the area are within 10 minutes of our showroom.",
      },
      {
        q: "How much do granite countertops cost in Bryant?",
        a: "Granite ranges from $40 to $200+ per square foot installed depending on the variety. Engineered quartz starts at about $50/sq ft. We offer free estimates so you get an exact number for your kitchen.",
      },
      {
        q: "How much do countertops cost in Central Arkansas?",
        a: "In 2026, countertop pricing in Central Arkansas typically ranges from $50–$80 per square foot installed for standard granite and entry-level quartz, $75–$110 for premium quartz brands (Cambria, Caesarstone), and $90–$175 for natural quartzite. A typical kitchen with 35 square feet of countertop surface runs $1,750–$6,000+ depending on material. Contact us for a free project-specific quote.",
      },
      {
        q: "How long does countertop installation take?",
        a: "From your first visit to completed installation, most residential projects take about 2–3 weeks. The process includes a showroom consultation and slab selection (day 1), digital laser templating after cabinets are set (scheduled within a few days), fabrication in our Bryant facility (7–10 business days), and installation (typically completed in one day).",
      },
      {
        q: "Can I pick my own slab?",
        a: "Yes — and we strongly encourage it. Our Bryant showroom at 26096 Interstate 30 has hundreds of full-size granite, quartz, quartzite, and marble slabs standing upright in our warehouse. You'll see the exact piece of stone that will go in your home before we cut it. No surprises.",
      },
      {
        q: "What is a leathered finish and where can I get one in Arkansas?",
        a: "A leathered finish is a textured matte surface created by running natural stone through a specialized Sasso-Lux machine with diamond-tipped brushes. It hides fingerprints, reduces glare, and adds warmth compared to a polished finish. Countertop World is the only fabricator in Arkansas with a Sasso-Lux machine, making us the only source for leathered, brushed, and antiqued finishes in the state.",
      },
      {
        q: "Do you do commercial projects?",
        a: "Yes. We fabricate countertops for multi-family housing, fitness centers, medical offices, restaurants, and retail spaces. Our CNC equipment and in-house capacity allow us to handle large-volume projects with consistent quality and phased delivery to match your construction schedule.",
      },
    ],
  },
  rogers: {
    slug: "rogers",
    cityName: "Rogers",
    region: "nwa",
    nearestShowroom: SHOWROOMS.rogers,
    metaTitle:
      "Countertops in Rogers, AR | Granite, Quartz & Marble — Countertop World",
    metaDescription:
      "Rogers countertop fabrication and installation from our brand-new 18,700 sq ft facility on Commerce Dr. 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.",
    heroSubtitle:
      "Our brand-new 18,700 sq ft facility on Commerce Drive is purpose-built for Northwest Arkansas. Walk the yard, pick your slab, and we cut and install it — all in-house.",
    localContext:
      "Rogers homeowners in Pinnacle Hills, Pleasant Crossing, Blossom Way, and the Lake Atalanta corridor are minutes from our newest showroom. We serve Rogers, Lowell, Cave Springs, and the surrounding area with dedicated NWA install crews.",
    driveTime: "You're already here",
    nearbyAreas: [
      { name: "Bentonville", slug: "bentonville" },
      { name: "Springdale", slug: "springdale" },
      { name: "Fayetteville", slug: "fayetteville" },
    ],
    faq: [
      {
        q: "Where is Countertop World in Rogers?",
        a: "We're at 1706 Commerce Dr in Rogers — an 18,700 sq ft facility with 1,000+ slabs on-site. Easy access from I-49 and Highway 71B.",
      },
      {
        q: "Is the Rogers location new?",
        a: "Yes. Our Rogers facility opened to serve the growing Northwest Arkansas market. It's a full fabrication and showroom facility — not a satellite office. Same equipment, same crew quality as our Bryant flagship.",
      },
      {
        q: "What hours is the Rogers showroom open?",
        a: "Monday through Friday 8am–5pm. Saturday visits available by appointment. Call (479) 900-9119 to schedule.",
      },
      {
        q: "Do you install countertops throughout NWA?",
        a: "Yes. Our Rogers-based crew installs throughout Northwest Arkansas — Rogers, Bentonville, Springdale, Fayetteville, Lowell, Cave Springs, Centerton, Bella Vista, and surrounding communities.",
      },
      {
        q: "How much do quartz countertops cost in Rogers?",
        a: "Engineered quartz typically ranges from $50 to $150 per square foot installed, depending on brand and complexity. We carry all major brands with new shipments weekly. Free estimates available.",
      },
      {
        q: "Where is Countertop World's NWA showroom?",
        a: "Our Northwest Arkansas showroom is at 1706 Commerce Dr, Rogers, AR 72756. We're open Monday–Friday 8am–5pm and Saturday 9am–1pm. The showroom features full stone slabs, edge profile samples, and finish comparisons. Call (479) 900-9119 to schedule a visit.",
      },
      {
        q: "What countertop materials are popular in Northwest Arkansas?",
        a: "Quartzite has become the most popular premium choice in NWA, especially in Bentonville and Rogers luxury homes. Taj Mahal, Mont Blanc, and Sea Pearl quartzite are top sellers. Engineered quartz remains the most popular overall choice for its zero-maintenance appeal. Natural granite continues to be a strong seller for homeowners who want a unique, one-of-a-kind slab.",
      },
      {
        q: "Do you work with NWA builders and contractors?",
        a: "Yes. We partner with Northwest Arkansas builders and general contractors on new construction, spec homes, and multi-family developments. Our builder program offers volume pricing, priority scheduling, 2-week turnaround, and phased delivery for multi-unit projects. Contact us at (479) 900-9119 for builder pricing.",
      },
      {
        q: "What makes Countertop World different from other NWA countertop shops?",
        a: "Three things: First, we fabricate everything in-house — we're not a broker. We own CNC saws, laser templating equipment, and edge profilers. Second, we're the only fabricator in Arkansas with a Sasso-Lux finishing machine, which means we can offer leathered, brushed, and antiqued finishes that no other shop in the state can produce. Third, you pick your exact slab from our warehouse — not from a sample.",
      },
      {
        q: "How much do quartzite countertops cost in NWA?",
        a: "Natural quartzite countertops in Northwest Arkansas typically range from $90–$175 per square foot installed, depending on the specific stone. Popular varieties like Taj Mahal and Mont Blanc fall in the $100–$140 range. A typical NWA kitchen (35–50 SF) runs $3,500–$7,000+ for quartzite. We provide free estimates with exact pricing based on your slab selection.",
      },
    ],
  },
  bentonville: {
    slug: "bentonville",
    cityName: "Bentonville",
    region: "nwa",
    nearestShowroom: SHOWROOMS.rogers,
    metaTitle:
      "Countertops in Bentonville, AR | Granite, Quartz & Marble — Countertop World",
    metaDescription:
      "Bentonville countertop fabrication and installation. Our Rogers showroom is 10 minutes away with 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.",
    heroSubtitle:
      "Bentonville homeowners are 10 minutes from our Rogers showroom — 18,700 sq ft of slabs, fabrication equipment, and a team that handles everything from template to install.",
    localContext:
      "Bentonville's growth from downtown to Centerton and Bella Vista means more kitchens, more builds, and more demand for quality stone. Whether you're renovating a home near the Square, building new in Osage Creek, or upgrading a property in Cave Springs, our Rogers facility is right around the corner.",
    driveTime: "~10 min from downtown Bentonville",
    nearbyAreas: [
      { name: "Rogers", slug: "rogers" },
      { name: "Fayetteville", slug: "fayetteville" },
      { name: "Springdale", slug: "springdale" },
    ],
    faq: [
      {
        q: "How far is Countertop World from Bentonville?",
        a: "Our Rogers showroom is about 10 minutes from downtown Bentonville via I-49 or Highway 71B. Easy access from anywhere in the Bentonville–Rogers corridor.",
      },
      {
        q: "Do you serve Bentonville, Centerton, and Bella Vista?",
        a: "Yes. Our NWA crew installs throughout Benton County — Bentonville, Centerton, Bella Vista, Cave Springs, Gravette, and Pea Ridge. All from our Rogers facility.",
      },
      {
        q: "What countertop materials are popular in Bentonville?",
        a: "Engineered quartz and quartzite are the top choices in Bentonville's newer builds. We also see strong demand for marble in luxury kitchens and leathered granite in transitional designs. Visit the showroom to compare.",
      },
      {
        q: "Do you work with Bentonville builders?",
        a: "Yes. We partner with builders across NWA for new construction and multi-unit projects. Builder accounts get volume pricing, priority scheduling, and a 2-week turnaround. Call (479) 900-9119.",
      },
      {
        q: "How much do marble countertops cost in Bentonville?",
        a: "Marble typically ranges from $75 to $250+ per square foot installed, depending on variety. Carrara is on the lower end; Calacatta Gold is at the top. We provide free estimates for exact pricing.",
      },
      {
        q: "Where is Countertop World's NWA showroom?",
        a: "Our Northwest Arkansas showroom is at 1706 Commerce Dr, Rogers, AR 72756. We're open Monday–Friday 8am–5pm and Saturday 9am–1pm. The showroom features full stone slabs, edge profile samples, and finish comparisons. Call (479) 900-9119 to schedule a visit.",
      },
      {
        q: "What countertop materials are popular in Northwest Arkansas?",
        a: "Quartzite has become the most popular premium choice in NWA, especially in Bentonville and Rogers luxury homes. Taj Mahal, Mont Blanc, and Sea Pearl quartzite are top sellers. Engineered quartz remains the most popular overall choice for its zero-maintenance appeal. Natural granite continues to be a strong seller for homeowners who want a unique, one-of-a-kind slab.",
      },
      {
        q: "Do you work with NWA builders and contractors?",
        a: "Yes. We partner with Northwest Arkansas builders and general contractors on new construction, spec homes, and multi-family developments. Our builder program offers volume pricing, priority scheduling, 2-week turnaround, and phased delivery for multi-unit projects. Contact us at (479) 900-9119 for builder pricing.",
      },
      {
        q: "What makes Countertop World different from other NWA countertop shops?",
        a: "Three things: First, we fabricate everything in-house — we're not a broker. We own CNC saws, laser templating equipment, and edge profilers. Second, we're the only fabricator in Arkansas with a Sasso-Lux finishing machine, which means we can offer leathered, brushed, and antiqued finishes that no other shop in the state can produce. Third, you pick your exact slab from our warehouse — not from a sample.",
      },
      {
        q: "How much do quartzite countertops cost in NWA?",
        a: "Natural quartzite countertops in Northwest Arkansas typically range from $90–$175 per square foot installed, depending on the specific stone. Popular varieties like Taj Mahal and Mont Blanc fall in the $100–$140 range. A typical NWA kitchen (35–50 SF) runs $3,500–$7,000+ for quartzite. We provide free estimates with exact pricing based on your slab selection.",
      },
    ],
  },
  fayetteville: {
    slug: "fayetteville",
    cityName: "Fayetteville",
    region: "nwa",
    nearestShowroom: SHOWROOMS.rogers,
    metaTitle:
      "Countertops in Fayetteville, AR | Granite, Quartz & Marble — Countertop World",
    metaDescription:
      "Fayetteville countertop fabrication and installation. Our Rogers showroom is 25 minutes north with 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.",
    heroSubtitle:
      "Fayetteville's mix of historic character homes and new construction calls for a fabricator who can handle both. Our Rogers showroom is 25 minutes up I-49.",
    localContext:
      "From Craftsman bungalows in Washington-Willow to new builds south of Wedington, Fayetteville homeowners need stone that fits the home — not just the trend. We serve Fayetteville, Farmington, Elkins, Greenland, and the entire south NWA corridor.",
    driveTime: "~25 min via I-49",
    nearbyAreas: [
      { name: "Springdale", slug: "springdale" },
      { name: "Rogers", slug: "rogers" },
      { name: "Bentonville", slug: "bentonville" },
    ],
    faq: [
      {
        q: "How far is Countertop World from Fayetteville?",
        a: "Our Rogers showroom is about 25 minutes north of Fayetteville via I-49. Straight shot — no surface-street maze.",
      },
      {
        q: "Do you install countertops in Fayetteville?",
        a: "Yes. Our NWA install crew serves all of Fayetteville — including Farmington, Elkins, Greenland, and south Washington County. Same quality, same timeline as our Rogers-area installs.",
      },
      {
        q: "Can you work with older home layouts in Fayetteville?",
        a: "Absolutely. Laser templating means we can handle unusual angles, non-standard depths, and tight spaces common in Fayetteville's older neighborhoods. The stone fits right the first time.",
      },
      {
        q: "What's popular for kitchen countertops in Fayetteville?",
        a: "White and gray quartz dominate modern kitchens, while natural granite and quartzite are popular in Fayetteville's transitional and farmhouse-style homes. Visit the showroom to compare 1,000+ slabs in person.",
      },
      {
        q: "Do you offer financing for Fayetteville homeowners?",
        a: "Yes. We offer financing through Enhancify — soft credit pull, monthly payment plans, quick approval. Check your rate at the showroom or online.",
      },
      {
        q: "Where is Countertop World's NWA showroom?",
        a: "Our Northwest Arkansas showroom is at 1706 Commerce Dr, Rogers, AR 72756. We're open Monday–Friday 8am–5pm and Saturday 9am–1pm. The showroom features full stone slabs, edge profile samples, and finish comparisons. Call (479) 900-9119 to schedule a visit.",
      },
      {
        q: "What countertop materials are popular in Northwest Arkansas?",
        a: "Quartzite has become the most popular premium choice in NWA, especially in Bentonville and Rogers luxury homes. Taj Mahal, Mont Blanc, and Sea Pearl quartzite are top sellers. Engineered quartz remains the most popular overall choice for its zero-maintenance appeal. Natural granite continues to be a strong seller for homeowners who want a unique, one-of-a-kind slab.",
      },
      {
        q: "Do you work with NWA builders and contractors?",
        a: "Yes. We partner with Northwest Arkansas builders and general contractors on new construction, spec homes, and multi-family developments. Our builder program offers volume pricing, priority scheduling, 2-week turnaround, and phased delivery for multi-unit projects. Contact us at (479) 900-9119 for builder pricing.",
      },
      {
        q: "What makes Countertop World different from other NWA countertop shops?",
        a: "Three things: First, we fabricate everything in-house — we're not a broker. We own CNC saws, laser templating equipment, and edge profilers. Second, we're the only fabricator in Arkansas with a Sasso-Lux finishing machine, which means we can offer leathered, brushed, and antiqued finishes that no other shop in the state can produce. Third, you pick your exact slab from our warehouse — not from a sample.",
      },
      {
        q: "How much do quartzite countertops cost in NWA?",
        a: "Natural quartzite countertops in Northwest Arkansas typically range from $90–$175 per square foot installed, depending on the specific stone. Popular varieties like Taj Mahal and Mont Blanc fall in the $100–$140 range. A typical NWA kitchen (35–50 SF) runs $3,500–$7,000+ for quartzite. We provide free estimates with exact pricing based on your slab selection.",
      },
    ],
  },
  springdale: {
    slug: "springdale",
    cityName: "Springdale",
    region: "nwa",
    nearestShowroom: SHOWROOMS.rogers,
    metaTitle:
      "Countertops in Springdale, AR | Granite, Quartz & Marble — Countertop World",
    metaDescription:
      "Springdale countertop fabrication and installation. Our Rogers showroom is 15 minutes away with 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.",
    heroSubtitle:
      "Springdale sits right between our Rogers showroom and Fayetteville — 15 minutes in either direction on I-49. Convenient access to 1,000+ slabs and in-house fabrication.",
    localContext:
      "Springdale is one of NWA's fastest-growing cities, and new construction from Har-Ber to Elm Springs means steady demand for quality countertops. We serve Springdale, Tontitown, Johnson, Bethel Heights, and the surrounding area from our Rogers facility.",
    driveTime: "~15 min via I-49",
    nearbyAreas: [
      { name: "Rogers", slug: "rogers" },
      { name: "Fayetteville", slug: "fayetteville" },
      { name: "Bentonville", slug: "bentonville" },
    ],
    faq: [
      {
        q: "How far is Countertop World from Springdale?",
        a: "Our Rogers showroom is about 15 minutes north of Springdale via I-49. Quick drive, no appointment needed to browse.",
      },
      {
        q: "Do you serve Tontitown and Elm Springs?",
        a: "Yes. We install throughout the Springdale metro — including Tontitown, Elm Springs, Johnson, and Bethel Heights. All served from our Rogers facility with our own install crew.",
      },
      {
        q: "What countertops work best for new construction in Springdale?",
        a: "Engineered quartz is the top choice for new builds — low maintenance, consistent look, and works with every cabinet color. Granite and quartzite are popular upgrades. Visit the showroom to pick your slab.",
      },
      {
        q: "Do you work with Springdale-area builders?",
        a: "Yes. We partner with builders throughout NWA for new construction and subdivision projects. Builder accounts get volume pricing, dedicated scheduling, and 2-week turnaround. Call (479) 900-9119.",
      },
      {
        q: "How much do countertops cost in Springdale?",
        a: "Granite starts around $40/sq ft installed, quartz from $50/sq ft, and premium stones from $70/sq ft. Exact pricing depends on your layout, edge profile, and stone selection. Free estimates available.",
      },
      {
        q: "Where is Countertop World's NWA showroom?",
        a: "Our Northwest Arkansas showroom is at 1706 Commerce Dr, Rogers, AR 72756. We're open Monday–Friday 8am–5pm and Saturday 9am–1pm. The showroom features full stone slabs, edge profile samples, and finish comparisons. Call (479) 900-9119 to schedule a visit.",
      },
      {
        q: "What countertop materials are popular in Northwest Arkansas?",
        a: "Quartzite has become the most popular premium choice in NWA, especially in Bentonville and Rogers luxury homes. Taj Mahal, Mont Blanc, and Sea Pearl quartzite are top sellers. Engineered quartz remains the most popular overall choice for its zero-maintenance appeal. Natural granite continues to be a strong seller for homeowners who want a unique, one-of-a-kind slab.",
      },
      {
        q: "Do you work with NWA builders and contractors?",
        a: "Yes. We partner with Northwest Arkansas builders and general contractors on new construction, spec homes, and multi-family developments. Our builder program offers volume pricing, priority scheduling, 2-week turnaround, and phased delivery for multi-unit projects. Contact us at (479) 900-9119 for builder pricing.",
      },
      {
        q: "What makes Countertop World different from other NWA countertop shops?",
        a: "Three things: First, we fabricate everything in-house — we're not a broker. We own CNC saws, laser templating equipment, and edge profilers. Second, we're the only fabricator in Arkansas with a Sasso-Lux finishing machine, which means we can offer leathered, brushed, and antiqued finishes that no other shop in the state can produce. Third, you pick your exact slab from our warehouse — not from a sample.",
      },
      {
        q: "How much do quartzite countertops cost in NWA?",
        a: "Natural quartzite countertops in Northwest Arkansas typically range from $90–$175 per square foot installed, depending on the specific stone. Popular varieties like Taj Mahal and Mont Blanc fall in the $100–$140 range. A typical NWA kitchen (35–50 SF) runs $3,500–$7,000+ for quartzite. We provide free estimates with exact pricing based on your slab selection.",
      },
    ],
  },
  conway: {
    slug: "conway",
    cityName: "Conway",
    region: "central",
    nearestShowroom: SHOWROOMS.bryant,
    metaTitle:
      "Countertops in Conway, AR | Granite, Quartz & Marble — Countertop World",
    metaDescription:
      "Conway countertop fabrication and installation. Our Bryant showroom is 30 minutes south with 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.",
    heroSubtitle:
      "Conway homeowners are 30 minutes from our Bryant showroom on I-40 to I-30. Drive down, pick your slab from 1,000+ options, and we handle the rest.",
    localContext:
      "Conway's steady growth — from established neighborhoods near Hendrix to new developments along Dave Ward Drive — means kitchens and bathrooms that need quality stone. We serve Conway, Greenbrier, Vilonia, and the Faulkner County corridor with our Central Arkansas install crew.",
    driveTime: "~30 min via I-40",
    nearbyAreas: [
      { name: "Little Rock", slug: "little-rock" },
      { name: "Bryant", slug: "bryant" },
      { name: "Hot Springs", slug: "hot-springs" },
    ],
    faq: [
      {
        q: "How far is Countertop World from Conway?",
        a: "Our Bryant showroom is about 30 minutes south of Conway via I-40 to I-30. Straightforward drive with easy highway access.",
      },
      {
        q: "Do you install countertops in Conway?",
        a: "Yes. Our Central Arkansas crew installs throughout Faulkner County — Conway, Greenbrier, Vilonia, and surrounding communities. Same crew, same quality as our Bryant-area installs.",
      },
      {
        q: "What countertop materials are popular in Conway?",
        a: "Engineered quartz and granite are the most popular choices for Conway homeowners. Quartz for low-maintenance modern kitchens, granite for character and heat resistance. Visit our showroom to compare side by side.",
      },
      {
        q: "Can you handle new construction in Conway?",
        a: "Yes. We work with builders throughout Central Arkansas for new construction and remodel projects. Builder accounts get volume pricing and priority scheduling. Call (501) 481-8117.",
      },
      {
        q: "Do you offer free estimates for Conway homeowners?",
        a: "Yes. We provide free in-home or virtual estimates for every project. Call (501) 481-8117 or fill out the contact form to get started.",
      },
      {
        q: "How much do countertops cost in Central Arkansas?",
        a: "In 2026, countertop pricing in Central Arkansas typically ranges from $50–$80 per square foot installed for standard granite and entry-level quartz, $75–$110 for premium quartz brands (Cambria, Caesarstone), and $90–$175 for natural quartzite. A typical kitchen with 35 square feet of countertop surface runs $1,750–$6,000+ depending on material. Contact us for a free project-specific quote.",
      },
      {
        q: "How long does countertop installation take?",
        a: "From your first visit to completed installation, most residential projects take about 2–3 weeks. The process includes a showroom consultation and slab selection (day 1), digital laser templating after cabinets are set (scheduled within a few days), fabrication in our Bryant facility (7–10 business days), and installation (typically completed in one day).",
      },
      {
        q: "Can I pick my own slab?",
        a: "Yes — and we strongly encourage it. Our Bryant showroom at 26096 Interstate 30 has hundreds of full-size granite, quartz, quartzite, and marble slabs standing upright in our warehouse. You'll see the exact piece of stone that will go in your home before we cut it. No surprises.",
      },
      {
        q: "What is a leathered finish and where can I get one in Arkansas?",
        a: "A leathered finish is a textured matte surface created by running natural stone through a specialized Sasso-Lux machine with diamond-tipped brushes. It hides fingerprints, reduces glare, and adds warmth compared to a polished finish. Countertop World is the only fabricator in Arkansas with a Sasso-Lux machine, making us the only source for leathered, brushed, and antiqued finishes in the state.",
      },
      {
        q: "Do you do commercial projects?",
        a: "Yes. We fabricate countertops for multi-family housing, fitness centers, medical offices, restaurants, and retail spaces. Our CNC equipment and in-house capacity allow us to handle large-volume projects with consistent quality and phased delivery to match your construction schedule.",
      },
    ],
  },
  "hot-springs": {
    slug: "hot-springs",
    cityName: "Hot Springs",
    region: "central",
    nearestShowroom: SHOWROOMS.bryant,
    metaTitle:
      "Countertops in Hot Springs, AR | Granite, Quartz & Marble — Countertop World",
    metaDescription:
      "Hot Springs countertop fabrication and installation. Our Bryant showroom is 50 minutes east with 1,000+ slabs. Granite, quartz, marble, quartzite. Free estimates.",
    heroSubtitle:
      "Hot Springs homeowners drive 50 minutes to our Bryant showroom and leave with a slab picked, measured, and scheduled. Worth the trip for 1,000+ options and in-house everything.",
    localContext:
      "Hot Springs blends lakefront properties, historic homes on Bathhouse Row, and new construction in HSV and Diamondhead. Each style needs different stone — and we carry the range. We serve Hot Springs, Hot Springs Village, Lake Hamilton, Jessieville, and Garland County.",
    driveTime: "~50 min via US-70",
    nearbyAreas: [
      { name: "Bryant", slug: "bryant" },
      { name: "Little Rock", slug: "little-rock" },
      { name: "Conway", slug: "conway" },
    ],
    faq: [
      {
        q: "Do you serve Hot Springs from your Bryant location?",
        a: "Yes. Our Bryant showroom is about 50 minutes east of Hot Springs via US-70. We install throughout Garland County — Hot Springs, Hot Springs Village, Lake Hamilton, and surrounding areas.",
      },
      {
        q: "Is it worth the drive from Hot Springs?",
        a: "Yes. We're the largest stone fabricator in Arkansas with 1,000+ full slabs on-site, equipment nobody else in the state has (including the only Sasso-Lux), and everything done in-house. Most Hot Springs homeowners make one trip to pick their slab, then we handle templating and install at your home.",
      },
      {
        q: "What countertops work for Hot Springs lakefront homes?",
        a: "For lakefront and outdoor kitchens, natural granite is the top choice — UV-stable, heat-proof, and weather-resistant. For indoor kitchens, quartz and quartzite are popular for their durability and low maintenance.",
      },
      {
        q: "Do you work with Hot Springs Village builders?",
        a: "Yes. We serve builders throughout the Hot Springs area, including HSV. Builder accounts get volume pricing and priority scheduling. Call (501) 481-8117.",
      },
      {
        q: "How much do countertops cost for a Hot Springs kitchen?",
        a: "A typical kitchen (30–45 sq ft) ranges from $1,500 to $7,000+ installed depending on the stone. Granite starts at $40/sq ft, quartz at $50/sq ft. We provide free estimates with exact pricing.",
      },
      {
        q: "How much do countertops cost in Central Arkansas?",
        a: "In 2026, countertop pricing in Central Arkansas typically ranges from $50–$80 per square foot installed for standard granite and entry-level quartz, $75–$110 for premium quartz brands (Cambria, Caesarstone), and $90–$175 for natural quartzite. A typical kitchen with 35 square feet of countertop surface runs $1,750–$6,000+ depending on material. Contact us for a free project-specific quote.",
      },
      {
        q: "How long does countertop installation take?",
        a: "From your first visit to completed installation, most residential projects take about 2–3 weeks. The process includes a showroom consultation and slab selection (day 1), digital laser templating after cabinets are set (scheduled within a few days), fabrication in our Bryant facility (7–10 business days), and installation (typically completed in one day).",
      },
      {
        q: "Can I pick my own slab?",
        a: "Yes — and we strongly encourage it. Our Bryant showroom at 26096 Interstate 30 has hundreds of full-size granite, quartz, quartzite, and marble slabs standing upright in our warehouse. You'll see the exact piece of stone that will go in your home before we cut it. No surprises.",
      },
      {
        q: "What is a leathered finish and where can I get one in Arkansas?",
        a: "A leathered finish is a textured matte surface created by running natural stone through a specialized Sasso-Lux machine with diamond-tipped brushes. It hides fingerprints, reduces glare, and adds warmth compared to a polished finish. Countertop World is the only fabricator in Arkansas with a Sasso-Lux machine, making us the only source for leathered, brushed, and antiqued finishes in the state.",
      },
      {
        q: "Do you do commercial projects?",
        a: "Yes. We fabricate countertops for multi-family housing, fitness centers, medical offices, restaurants, and retail spaces. Our CNC equipment and in-house capacity allow us to handle large-volume projects with consistent quality and phased delivery to match your construction schedule.",
      },
    ],
  },
};

export const cityPageSlugs = Object.keys(cityPages);
