#!/usr/bin/env node
// Generates branded 1200×630 OG social cards for every page.
// Uses satori (JSX → SVG) + @resvg/resvg-js (SVG → PNG).
// Runs at build time — zero runtime cost.

import { writeFileSync, mkdirSync } from 'fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { join } from 'path';

const OUT = join(import.meta.dirname, '..', 'public', 'og');
mkdirSync(OUT, { recursive: true });

// Fetch Google Fonts as ArrayBuffers
async function loadFont(url) {
  const res = await fetch(url);
  return res.arrayBuffer();
}

// Direct font file URLs (woff2 doesn't work with satori, use ttf)
const FONT_URLS = {
  displayLight: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_qE6GnM.ttf',
  display: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_s06GnM.ttf',
  body: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf',
  bodyMedium: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf',
  mono: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPQ.ttf',
};

const COLORS = {
  obsidian: '#0A0A0A',
  stoneGold: '#C9A84C',
  stoneGoldDim: 'rgba(201, 168, 76, 0.35)',
  stoneGoldFaint: 'rgba(201, 168, 76, 0.08)',
  veinWhite: '#F5F0EB',
  coolGray: '#9C9A96',
};

const pages = [
  // Homepage
  { slug: 'home', title: 'Stone Countertops,\nFabricated in Arkansas', subtitle: 'Bryant & Rogers Showrooms', tag: null },
  // Stone pages
  { slug: 'stones-engineered-quartz', title: 'Engineered Quartz\nCountertops', subtitle: 'Care, Cost & Design Guide', tag: 'MATERIAL GUIDE' },
  { slug: 'stones-natural-granite', title: 'Natural Granite\nCountertops', subtitle: 'Care, Cost & Design Guide', tag: 'MATERIAL GUIDE' },
  { slug: 'stones-marble', title: 'Marble\nCountertops', subtitle: 'Care, Cost & Design Guide', tag: 'MATERIAL GUIDE' },
  { slug: 'stones-quartzite', title: 'Quartzite\nCountertops', subtitle: 'Care, Cost & Design Guide', tag: 'MATERIAL GUIDE' },
  { slug: 'stones-porcelain', title: 'Porcelain\nCountertops', subtitle: 'Care, Cost & Design Guide', tag: 'MATERIAL GUIDE' },
  { slug: 'stones-soapstone-onyx', title: 'Soapstone & Onyx\nCountertops', subtitle: 'Care, Cost & Design Guide', tag: 'MATERIAL GUIDE' },
  // Service pages
  { slug: 'builders', title: 'Builder & Contractor\nServices', subtitle: '2-Week Turnaround · Volume Pricing', tag: 'TRADE PROGRAM' },
  { slug: 'designers', title: 'Designer & Architect\nFabrication', subtitle: 'Exotic Stone · Sasso-Lux Finishes', tag: 'TRADE PROGRAM' },
  { slug: 'packages', title: 'Countertop\nPackages', subtitle: 'Entry · Signature · Premium', tag: 'PRICING' },
  { slug: 'book', title: 'Book a\nShowroom Visit', subtitle: 'Bryant & Rogers, Arkansas', tag: 'SCHEDULE' },
  // Blog
  { slug: 'blog', title: 'Countertop Guides,\nPricing & Trends', subtitle: 'From an Arkansas Fabricator', tag: 'BLOG' },
  { slug: 'blog-granite-vs-quartz-countertops-arkansas', title: 'Granite vs. Quartz\nCountertops', subtitle: 'An Arkansas Homeowner\'s Guide', tag: 'BLOG' },
  { slug: 'blog-countertop-cost-arkansas-2026', title: 'Countertop Cost\nin Arkansas (2026)', subtitle: 'Granite, Quartz, Marble Pricing', tag: 'BLOG' },
  { slug: 'blog-countertop-trends-arkansas-2026', title: '2026 Countertop\nTrends in Arkansas', subtitle: 'Materials, Colors & Finishes', tag: 'BLOG' },
];

function buildCard({ title, subtitle, tag }) {
  const lines = title.split('\n');
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: COLORS.obsidian,
        padding: '60px 70px',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Subtle corner accent — top right
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '0',
              right: '0',
              width: '300px',
              height: '300px',
              background: `radial-gradient(circle at top right, ${COLORS.stoneGoldFaint}, transparent 70%)`,
            },
          },
        },
        // Gold line at top
        {
          type: 'div',
          props: {
            style: {
              width: '60px',
              height: '2px',
              backgroundColor: COLORS.stoneGold,
              marginBottom: '8px',
            },
          },
        },
        // Tag
        tag
          ? {
              type: 'div',
              props: {
                style: {
                  fontFamily: 'JetBrains Mono',
                  fontSize: '13px',
                  letterSpacing: '4px',
                  color: COLORS.stoneGold,
                  marginBottom: '24px',
                },
                children: tag,
              },
            }
          : {
              type: 'div',
              props: { style: { marginBottom: '24px' } },
            },
        // Title
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: '1',
              justifyContent: 'center',
            },
            children: [
              ...lines.map((line) => ({
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Cormorant Garamond',
                    fontSize: '62px',
                    fontWeight: 300,
                    color: COLORS.veinWhite,
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em',
                  },
                  children: line,
                },
              })),
              // Subtitle
              subtitle
                ? {
                    type: 'div',
                    props: {
                      style: {
                        fontFamily: 'Inter',
                        fontSize: '20px',
                        fontWeight: 400,
                        color: COLORS.coolGray,
                        marginTop: '16px',
                      },
                      children: subtitle,
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
        // Bottom bar: brand left, domain right
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `1px solid ${COLORS.stoneGoldDim}`,
              paddingTop: '20px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Cormorant Garamond',
                    fontSize: '22px',
                    fontWeight: 500,
                    color: COLORS.stoneGold,
                    letterSpacing: '-0.01em',
                  },
                  children: 'Countertop World',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'JetBrains Mono',
                    fontSize: '13px',
                    color: COLORS.coolGray,
                    letterSpacing: '1px',
                  },
                  children: 'countertopworldar.com',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  console.log('Loading fonts...');
  const [displayLight, display, body, bodyMedium, mono] = await Promise.all([
    loadFont(FONT_URLS.displayLight),
    loadFont(FONT_URLS.display),
    loadFont(FONT_URLS.body),
    loadFont(FONT_URLS.bodyMedium),
    loadFont(FONT_URLS.mono),
  ]);

  const fonts = [
    { name: 'Cormorant Garamond', data: displayLight, weight: 300, style: 'normal' },
    { name: 'Cormorant Garamond', data: display, weight: 500, style: 'normal' },
    { name: 'Inter', data: body, weight: 400, style: 'normal' },
    { name: 'Inter', data: bodyMedium, weight: 500, style: 'normal' },
    { name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' },
  ];

  let count = 0;
  for (const page of pages) {
    const card = buildCard(page);
    const svg = await satori(card, {
      width: 1200,
      height: 630,
      fonts,
    });

    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1200 },
    });
    const png = resvg.render().asPng();

    writeFileSync(join(OUT, `${page.slug}.png`), png);
    count++;
  }

  console.log(`Generated ${count} OG social cards in public/og/`);
}

main().catch((err) => {
  console.error('OG generation failed:', err);
  process.exit(1);
});
