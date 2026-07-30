// Shared class strings for city pages.
//
// Used in two places:
//   1. CityPageLayout.tsx — the hydrated React page.
//   2. scripts/prerender.mjs — the static HTML snapshot injected into #root
//      for /areas/* routes so raw-HTML crawlers see real content.
//
// Keeping both on the same constants guarantees the pre-hydration paint
// matches the hydrated page (no unstyled flash) and, because this file lives
// under src/, Tailwind's content scan picks up every class so snapshot-only
// classes are never purged from the built CSS. This module must stay
// dependency-free: prerender.mjs imports it via a single-file esbuild
// transform with no bundling.

export const cityStyles = {
  // Page shell (mirrors the CityPageLayout root + section rhythm).
  pageWrap: "min-h-screen bg-obsidian antialiased px-6 lg:px-10 pt-24 pb-24",
  inner: "max-w-[800px] mx-auto",

  // Hero (mirrors the hero section type styles).
  kicker: "font-mono text-[11px] text-stone-gold tracking-[4px] uppercase mb-4",
  h1: "font-display text-[clamp(2.2rem,6vw,4.5rem)] font-light text-vein-white tracking-tighter leading-[1.05] mb-6",
  heroParagraph:
    "text-[17px] md:text-[19px] text-cool-gray font-light leading-relaxed max-w-2xl mb-6",
  showroomLine: "text-[13px] text-cool-gray font-light mb-12",

  // Editorial sections — shared verbatim with CityPageLayout.
  sectionHeading:
    "font-display text-[clamp(1.4rem,3vw,2.1rem)] font-light text-vein-white tracking-tight leading-tight mb-6",
  sectionHeadingSpacing: "mt-14", // snapshot-only: replaces the wrapper-div gap
  sectionParagraph:
    "text-[15px] md:text-[16px] text-cool-gray font-light leading-relaxed mb-5 last:mb-0",
  inlineLink:
    "text-stone-gold hover:text-stone-gold-light underline underline-offset-4 decoration-stone-gold/30 hover:decoration-stone-gold transition-colors",

  // FAQ (mirrors the FAQ list type styles).
  faqQuestion: "text-[15px] font-medium text-vein-white mt-8 mb-2",
  faqAnswer: "text-[14px] text-cool-gray leading-relaxed mb-4",
};
