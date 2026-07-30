export type CitySection = {
  heading: string;
  // Paragraphs support inline links written as [label](/path).
  paragraphs: string[];
};

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
  sections: CitySection[];
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
    // PROJECT SLOT: David-confirmed Little Rock project here.
    sections: [
      {
        heading: "The metro's countertops, cut 15 minutes down I-30",
        paragraphs: [
          "Little Rock is the biggest countertop market in the state, and it gets served by the biggest fabrication shop in Central Arkansas. Countertop World was founded in 2017 by David McDougall and Chad Crank, and our Bryant headquarters sits right on Interstate 30, about 15 minutes south of downtown. Every Little Rock job runs through that one building: the slab you pick, the digital template of your kitchen, the sawjet and CNC router that cut it, and the crew that installs it.",
          "That matters in a metro this size. A lot of countertop companies in Little Rock are brokers. They sell the stone, then send the cutting and the install to somebody else. We do not. Templating, fabrication, edge profiling, and installation are all handled by our own W-2 employees. No subcontractors touch your project at any stage. When something needs an answer, one shop owns it.",
        ],
      },
      {
        heading: "For Little Rock designers, builders, and commercial work",
        paragraphs: [
          "Little Rock has the deepest bench of designers, custom builders, and commercial general contractors in Arkansas, and much of our production capacity exists to serve them. We are members of the Home Builders Association of Greater Little Rock, a CBUSA vendor, and BBB Accredited. For projects that spec a brand by name, we hold six manufacturer certifications: Cambria, Caesarstone, Silestone, Dekton, Neolith, and Lapitec. Certified fabrication is what keeps those manufacturer warranties intact.",
          "For commercial and multifamily work, in-house capacity is the whole story. Because our saws, routers, and install crews are ours, we can hold a construction schedule without waiting on a third party. Multi-unit and phased projects are quoted and sequenced against your timeline, not ours.",
        ],
      },
      {
        heading: "How a Little Rock project runs",
        paragraphs: [
          "Start at the Bryant showroom and walk the yard. We keep more than 1,000 slabs in stock, so you are choosing the actual piece of [granite](/stones/natural-granite), [quartz](/stones/engineered-quartz), [marble](/stones/marble), or [quartzite](/stones/quartzite) that goes in your home, not a 4-inch sample. Once your cabinets are set, we send a technician to digitally template the space. Exact dimensions are captured at template and your final numbers are confirmed on the quote. Fabrication happens in Bryant, then our install crew makes one more trip to set the tops.",
          "For homeowners in The Heights, Hillcrest, and other older Little Rock neighborhoods, the digital template is the part that earns its keep. Walls in a 1940s house are rarely square. Laser measurement picks that up before the stone is cut, so the tops fit the house you actually have.",
        ],
      },
    ],
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
        q: "Do you work with Little Rock designers and builders?",
        a: "Yes. We are members of the Home Builders Association of Greater Little Rock, a CBUSA vendor, and we hold manufacturer certifications from Cambria, Caesarstone, Silestone, Dekton, Neolith, and Lapitec. Designers regularly send clients to the Bryant yard to tag their slab in person.",
      },
      {
        q: "Do you template before or after cabinets are installed?",
        a: "After. Digital templating happens once your cabinets are set and level, so the stone is cut to the space as it actually exists. Measurements are captured at template and confirmed on your quote before anything is cut.",
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
    // PROJECT SLOT: David-confirmed Bryant / Saline County project here.
    sections: [
      {
        heading: "This is where the company lives",
        paragraphs: [
          "Every countertop company has a service area page for its home town. This one is different, because Bryant is not a town we drive to. It is where Countertop World started in 2017, where David McDougall and Chad Crank built the shop, and where every Central Arkansas countertop we make gets cut. The showroom, the slab yard, the sawjet, the CNC router, the edge profilers, and the install crews all work out of 26096 Interstate 30.",
          "If you live in Bryant, Benton, or anywhere in Saline County, that means the largest stone fabrication operation in Central Arkansas is a few minutes from your driveway. Short trips for you, short trips for us, and no shipping your project out of town.",
        ],
      },
      {
        heading: "Walk the yard, tag your slab",
        paragraphs: [
          "The yard holds more than 1,000 slabs: [granite](/stones/natural-granite), [engineered quartz](/stones/engineered-quartz), [marble](/stones/marble), [quartzite](/stones/quartzite), [porcelain](/stones/porcelain), and exotics like [soapstone and onyx](/stones/soapstone-onyx). You walk the rows, see full slabs in daylight, and put your name on the exact piece that goes in your kitchen. Photos flatten stone. Standing in front of the slab does not.",
          "Because fabrication happens in the same building, a showroom visit here shows you more than stone. The production floor is where your slab gets templated against a digital file, cut on the sawjet, shaped on the CNC router, and edge-profiled by hand and machine. You are not buying from a sales office. You are buying from the shop floor.",
        ],
      },
      {
        heading: "A shop run like a trade, not a storefront",
        paragraphs: [
          "Stone fabrication done wrong is dangerous work, and we treat that seriously. Our OSHA silica program runs on every shift: air monitoring, engineering controls, wet cutting, and personal protective equipment. We are also building a US Department of Labor Registered Apprenticeship Program, because the next generation of Arkansas stone fabricators has to be trained by somebody.",
          "Installers are our own W-2 employees. No subcontractors, no borrowed crews. The people who set your tops answer to the same building that cut them, which is why we can stand behind the work with 109+ reviews and a 4.4-star rating.",
        ],
      },
    ],
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
        q: "Can I walk the slab yard and pick my exact slab?",
        a: "Yes, that is the point of the Bryant yard. More than 1,000 slabs are on site, and the slab you tag is the slab we cut for your project. Come during open hours and a team member will walk the rows with you.",
      },
      {
        q: "Do you template before or after cabinets are installed?",
        a: "After your cabinets are set. Digital templating captures the space exactly as built, and your measurements are confirmed on the quote before fabrication starts. Because the shop is here in Bryant, template trips around Saline County are easy to schedule.",
      },
      {
        q: "Do you serve Benton and Saline County?",
        a: "Yes. We serve the entire Saline County area — Bryant, Benton, Salem, Bauxite, Alexander, and surrounding communities. Most addresses in the area are within 10 minutes of our showroom.",
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
    // PROJECT SLOT: David-confirmed Rogers project here.
    // NOTE: /areas/rogers is the only city page with existing GSC rankings
    // (1,491 impressions, pos 9). Hero, localContext, meta, and FAQ are kept
    // exactly as they ranked; sections below are additive only.
    sections: [
      {
        heading: "A working fabrication shop, not a satellite office",
        paragraphs: [
          "The Commerce Drive facility is Countertop World's Northwest Arkansas home base, and it runs the same way our Bryant headquarters has since 2017: everything in-house. Digital templating, sawjet cutting, CNC routing, edge profiling, and installation are all handled by our own W-2 crews. No subcontractors at any stage, which is rarer in the countertop business than it should be.",
          "That is what lets us hold schedules for Rogers homeowners and NWA builders alike. When the shop that cuts the stone also employs the crew that installs it, there is no handoff where your project can stall.",
        ],
      },
      {
        heading: "Certified for the brands NWA projects spec",
        paragraphs: [
          "We hold six manufacturer certifications: Cambria, Caesarstone, Silestone, Dekton, Neolith, and Lapitec. If your designer or builder has spec'd one of those brands by name, certified fabrication is what keeps the manufacturer warranty intact. The showroom carries [engineered quartz](/stones/engineered-quartz), [granite](/stones/natural-granite), [quartzite](/stones/quartzite), [marble](/stones/marble), and [porcelain](/stones/porcelain) so you can compare them side by side in person.",
          "The shop also runs a full OSHA silica program on every shift, with air monitoring, wet cutting, engineering controls, and PPE, and we are building a US Department of Labor Registered Apprenticeship Program to train fabricators here in Arkansas.",
        ],
      },
    ],
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
    // PROJECT SLOT: David-confirmed Bentonville project here.
    sections: [
      {
        heading: "A fabricator built for Bentonville's pace",
        paragraphs: [
          "Bentonville is one of the fastest-building cities in Arkansas. Subdivisions push out toward Centerton, infill goes up near downtown, and remodels follow every resale. All of that construction needs countertops on a schedule, and schedule is where most countertop vendors fall apart, because they broker out the cutting or the install and lose control of the timeline.",
          "We keep the whole line in-house. Our Rogers facility, about 10 minutes from downtown Bentonville, handles digital templating, sawjet and CNC fabrication, edge profiling, and installation with our own W-2 crews. One shop, one schedule, no subcontractor handoffs. That is the practical reason builders and homeowners in a boom market use us.",
        ],
      },
      {
        heading: "Builder, spec, and multifamily work",
        paragraphs: [
          "We are members of the Northwest Arkansas Home Builders Association and a CBUSA vendor, and we fabricate for single-family builds, spec homes, and multi-unit projects. In-house capacity means multi-unit work can be sequenced and delivered in phases against your construction calendar rather than all at once or all late.",
          "For projects that spec a brand, we hold manufacturer certifications from Cambria, Caesarstone, Silestone, Dekton, Neolith, and Lapitec. Certified fabrication protects the manufacturer warranty on every top we cut, which matters when you are handing keys to a buyer.",
        ],
      },
      {
        heading: "Homeowners: your slab is 10 minutes away",
        paragraphs: [
          "If you are remodeling near the Square or finishing a new build, the Rogers yard is close enough to visit on a lunch break. Walk the slab rows and tag the exact piece of [quartzite](/stones/quartzite), [engineered quartz](/stones/engineered-quartz), [granite](/stones/natural-granite), or [marble](/stones/marble) for your kitchen. On new construction, templating happens after your cabinets are set, so coordinate the visit early and the template late. Your measurements are captured at template and confirmed on the quote before we cut.",
          "Bentonville's newer builds lean modern, and the material mix reflects it: large-format [porcelain](/stones/porcelain) for clean minimal kitchens, honed and leathered finishes instead of high polish, and waterfall islands that need precise miter work. That kind of fabrication is exactly what a CNC shop is for, and it is worth seeing the finish options in person before you commit to a look from a photo.",
        ],
      },
    ],
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
        a: "Yes. We partner with builders across NWA for new construction and multi-unit projects. We are NWAHBA members and a CBUSA vendor, with in-house fabrication and our own install crews. Call (479) 900-9119.",
      },
      {
        q: "When do you template on a new build?",
        a: "After cabinets are set and level. Templating too early is how tops end up wrong, so we schedule the digital template once the space is real. Measurements are confirmed on your quote before fabrication starts.",
      },
      {
        q: "Can I pick my own slab for a Bentonville project?",
        a: "Yes. The Rogers yard is about 10 minutes away with 1,000+ slabs on site. The slab you tag is the slab we fabricate, whether it is a remodel or a new build.",
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
    // PROJECT SLOT: David-confirmed Fayetteville project here.
    sections: [
      {
        heading: "Fayetteville houses are not cookie-cutter, and templates prove it",
        paragraphs: [
          "Fayetteville is the oldest city in Northwest Arkansas, and its housing stock shows it in the best way. Craftsman bungalows near the university, mid-century ranches off Township, and brand-new construction south of Wedington all end up on our template schedule. The older the house, the less square the walls, and that is exactly what digital templating exists for. We measure the room as it actually is, down to the out-of-plumb corner, before the stone is cut.",
          "That is the difference between a fabricator and a broker in a town like this. Because our own technicians template and our own W-2 crews install, the person measuring your 1935 kitchen works for the same shop as the person setting the stone. Nothing gets lost in a handoff.",
        ],
      },
      {
        heading: "Remodels, done in the right order",
        paragraphs: [
          "Most of our Fayetteville work is remodel work, and remodels live or die on sequence. Cabinets first, always. Once your cabinets are set and level, we digitally template the space. Fabrication happens at our Rogers facility, and then our install crew comes back to set the tops. Exact dimensions are captured at template and confirmed on your quote, so there are no surprises between the measurement and the install.",
          "If you are updating a rental near campus or a family home in Wilson Park, the material conversation is different for each. [Engineered quartz](/stones/engineered-quartz) takes daily abuse without maintenance. [Granite](/stones/natural-granite) and [quartzite](/stones/quartzite) bring natural variation that suits older homes. [Marble](/stones/marble) is beautiful and honest about its tradeoffs. We will tell you which is which.",
        ],
      },
      {
        heading: "The I-49 trip is the easy part",
        paragraphs: [
          "Our Rogers showroom is about 25 minutes up I-49, a straight shot with 1,000+ slabs waiting at the end of it. Most Fayetteville customers make that drive once, tag their slab, and never need to come back. The template trip and the install trip happen at your house on our schedule with yours. We cover all of south Washington County from the same shop: Fayetteville, Farmington, Greenland, and Elkins.",
          "For landlords and investors near campus, it is worth asking about smaller-scope work while you are at it. Bathroom vanities and bar tops are quick projects for a shop this size, and durable, easy-clean surfaces are the right call for rental turnover. The same in-house crew handles a vanity top with the same process as a full kitchen.",
        ],
      },
    ],
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
        q: "Do you template before or after cabinets are installed?",
        a: "After. Cabinets go in first, then we digitally template the space as built. That order matters even more in older Fayetteville homes where walls are rarely square. Final measurements are confirmed on your quote before fabrication.",
      },
      {
        q: "Does quartzite need sealing?",
        a: "Yes, quartzite is a natural stone and benefits from periodic sealing to resist staining. It is still one of the most durable natural surfaces you can buy. Engineered quartz, by contrast, never needs sealing. We go over care for your specific stone at slab selection.",
      },
      {
        q: "Do you offer financing for Fayetteville homeowners?",
        a: "Yes. We offer financing through Enhancify — soft credit pull, monthly payment plans, quick approval. Check your rate at the showroom or online.",
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
    // PROJECT SLOT: David-confirmed Springdale project here.
    sections: [
      {
        heading: "No runaround, just countertops",
        paragraphs: [
          "Springdale is a working town, and we run a working shop. Here is the whole arrangement: you drive 15 minutes up I-49 or 71B to our Rogers showroom, walk the yard, and tag the slab you want. We come to your house and digitally template once your cabinets are set. We cut the stone on our own sawjet and CNC router, profile the edges, and our own crew installs it. Every person who touches the job is a Countertop World W-2 employee. That is the entire process, and nobody else is involved.",
          "The reason to care is accountability. When a fabricator subs out the install, problems turn into phone tag between three companies. When it is one shop start to finish, a problem has exactly one owner, and it is us.",
        ],
      },
      {
        heading: "Surfaces that stand up to a busy household",
        paragraphs: [
          "Most Springdale kitchens we do are the busiest room in the house, so the honest recommendation is usually the durable one. [Engineered quartz](/stones/engineered-quartz) is the low-maintenance workhorse: no sealing, easy cleanup, consistent color. [Granite](/stones/natural-granite) handles heat better and gives you a one-of-a-kind slab for similar money. [Quartzite](/stones/quartzite) is the step up when you want natural stone that is harder than granite. All three are standing in the Rogers yard where you can put your hands on them.",
          "We hold manufacturer certifications from Cambria, Caesarstone, Silestone, Dekton, Neolith, and Lapitec, so if you have a specific brand in mind, the warranty stays intact when we fabricate it.",
        ],
      },
      {
        heading: "Tontitown to Bethel Heights, one crew",
        paragraphs: [
          "Our NWA install crew covers Springdale, Tontitown, Johnson, Elm Springs, and Bethel Heights out of the Rogers shop. New construction along the Har-Ber corridor and remodels in older central Springdale neighborhoods run through the same process: showroom trip to pick stone, template trip after cabinets, install trip to finish. Dimensions are captured at template and confirmed on your quote, so the number you approve is the number you pay.",
          "One tip for the showroom trip: bring whatever you have. Rough countertop dimensions, a cabinet plan, photos of your kitchen, a cabinet door or flooring sample if you are matching colors. None of it is required, but the more we can see, the more useful the visit is, and you can leave with real numbers to think about instead of a brochure.",
        ],
      },
    ],
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
        q: "Can I stop by the showroom without an appointment?",
        a: "Yes. Come during open hours, walk the slab yard, and shortlist what you like. If you want a team member dedicated to your visit, a quick call to (479) 900-9119 ahead of time helps.",
      },
      {
        q: "Does quartz need sealing?",
        a: "No. Engineered quartz is non-porous and never needs sealing, which is a big part of why it is the most popular choice for busy Springdale households. Natural granite and quartzite benefit from periodic sealing, and we cover the care routine when you pick your stone.",
      },
      {
        q: "How fast can my countertops be installed?",
        a: "The honest answer: it depends on when your cabinets are ready. We template after cabinets are set, fabrication follows the template, and your dates are confirmed at quote. Picking your slab early keeps everything else moving.",
      },
      {
        q: "Do you work with Springdale-area builders?",
        a: "Yes. We partner with builders throughout NWA for new construction and subdivision projects, with in-house fabrication and our own install crews. Call (479) 900-9119.",
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
    // PROJECT SLOT: David-confirmed Conway / Faulkner County project here.
    sections: [
      {
        heading: "A college town that keeps building",
        paragraphs: [
          "Conway runs on three campuses and an interstate. UCA, Hendrix, and Central Baptist keep the town young, and the I-40 corridor keeps it growing, with new construction pushing out along Dave Ward Drive and toward Greenbrier while the older neighborhoods near Hendrix turn over one remodel at a time. Both kinds of projects land on our schedule, and they need different things from a fabricator.",
          "New builds need a shop that can coordinate with a builder's calendar. Remodels need a shop that can measure a lived-in kitchen accurately and get in and out without wrecking your week. We do both from one building in Bryant, where every Conway countertop we make is templated, cut, and finished before our own W-2 crew brings it up I-40 to install it.",
        ],
      },
      {
        heading: "How the 30 minutes actually works",
        paragraphs: [
          "You make the drive once. Take I-40 to I-30 and you are at the Bryant yard in about half an hour, standing in front of more than 1,000 full slabs of [granite](/stones/natural-granite), [quartz](/stones/engineered-quartz), [quartzite](/stones/quartzite), and [marble](/stones/marble). Tag the one you want. After that, the trips are ours: a template trip to Conway once your cabinets are set, and an install trip when your tops are cut. You never haul anything, and you never visit twice unless you want to.",
          "Dimensions are captured at the template appointment and confirmed on your quote, so the price you approve reflects your actual kitchen, not an estimate off a sketch.",
        ],
      },
      {
        heading: "Remodel or new build, the order is the same",
        paragraphs: [
          "The most common scheduling question we get from Faulkner County is when to call us. The answer for a remodel: once you have chosen your new cabinets, because we template after cabinets are set and level. The answer for a new build: earlier than you think, because slab selection is the step you control and templating is the step the construction schedule controls. Pick your stone early, and the template and install fall into place when the house is ready.",
          "For material choice, Conway follows the same pattern as most of Central Arkansas: engineered quartz for low-maintenance family kitchens, granite for heat tolerance and one-of-a-kind slabs, quartzite when you want natural stone with more hardness. All of it is in the Bryant yard to compare in person.",
        ],
      },
    ],
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
        q: "Do I have to visit the showroom to get a quote?",
        a: "No. You can start a quote by phone or through the contact form with your layout and rough dimensions. We do recommend one showroom trip to pick your slab in person, because stone color and veining never photograph accurately.",
      },
      {
        q: "Do you template before or after cabinets are installed?",
        a: "After. We digitally template once cabinets are set and level, whether it is a remodel or a new build. Exact measurements are captured at template and confirmed on your quote before the stone is cut.",
      },
      {
        q: "Will my granite countertops need sealing?",
        a: "Granite is natural stone, so periodic sealing keeps it stain-resistant. It is a simple wipe-on treatment, not a project. Engineered quartz never needs sealing. We walk you through care for your specific stone before install.",
      },
      {
        q: "Can you handle new construction in Conway?",
        a: "Yes. We work with builders throughout Central Arkansas for new construction and remodel projects. Builder accounts get volume pricing and priority scheduling. Call (501) 481-8117.",
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
    // PROJECT SLOT: David-confirmed Hot Springs / lake house project here.
    sections: [
      {
        heading: "Lake houses ask more of their countertops",
        paragraphs: [
          "Hot Springs is not a typical countertop market. Between Lake Hamilton, Lake Ouachita, and the hillside builds in Hot Springs Village and Diamondhead, a lot of the kitchens here live harder than a suburban kitchen does. Outdoor kitchens take direct sun and hundred-degree summers. Lakefront entertaining means wet glasses, hot pans, and a counter that gets used like a dock. The stone has to be chosen for that, not just for the color.",
          "For outdoor kitchens and covered patios, the short list is [granite](/stones/natural-granite) and [porcelain](/stones/porcelain). Granite is UV-stable and shrugs off heat. Porcelain and sintered surfaces are built for exactly this use, and we are certified fabricators for Dekton, Neolith, and Lapitec, three of the leading outdoor-rated brands. Most engineered quartz, by contrast, is not warrantied outdoors because sunlight can discolor the resin. We will steer you away from it for a patio even though it is our best seller indoors.",
        ],
      },
      {
        heading: "How we handle the distance",
        paragraphs: [
          "Our shop is in Bryant, about 50 minutes east on US-70, and the process is built so you only make that drive once. Trip one is yours: walk the yard, compare full slabs in person, and tag your stone. The remaining trips are ours. We come to Garland County to digitally template after your cabinets are set, and we come back to install when your tops are finished. Exact dimensions are captured at template and confirmed on your quote.",
          "The distance does not change who does the work. Templating, sawjet cutting, CNC routing, edge profiling, and installation are all done by Countertop World W-2 employees. No subcontractors, whether the job is five minutes from the shop or fifty.",
        ],
      },
      {
        heading: "From Bathhouse Row bungalows to HSV new builds",
        paragraphs: [
          "The housing mix around Hot Springs runs from historic homes near downtown to new construction in Hot Springs Village, and the fabrication challenges differ. Older homes come with out-of-square walls and odd nooks that digital templating captures precisely. New builds in HSV and Diamondhead are more about coordination, working with your builder so the template happens at the right point in the schedule. Either way, the stone is cut in Bryant by the largest fabricator in Central Arkansas, with more than 1,000 slabs to choose from, including [quartzite](/stones/quartzite) and [marble](/stones/marble) for interior kitchens and baths.",
        ],
      },
    ],
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
        a: "For lakefront and outdoor kitchens, natural granite is the top choice — UV-stable, heat-proof, and weather-resistant. Porcelain and sintered stone are the other outdoor-rated options; we are certified for Dekton, Neolith, and Lapitec. For indoor kitchens, quartz and quartzite are popular for their durability and low maintenance.",
      },
      {
        q: "How does scheduling work with the drive?",
        a: "You make one trip to Bryant to pick your slab. After that, we come to you: a template trip once your cabinets are set, and an install trip when your tops are fabricated. Dates are confirmed at quote, and the distance does not add cost or steps for you.",
      },
      {
        q: "Do outdoor countertops need special care here?",
        a: "Granite outdoors should be sealed periodically, same as indoors, and it handles Arkansas sun and freeze-thaw well. Porcelain needs essentially no maintenance. We go over the care routine for your specific material before install.",
      },
      {
        q: "Do you work with Hot Springs Village builders?",
        a: "Yes. We serve builders throughout the Hot Springs area, including HSV. Builder accounts get volume pricing and priority scheduling. Call (501) 481-8117.",
      },
    ],
  },
};

export const cityPageSlugs = Object.keys(cityPages);
