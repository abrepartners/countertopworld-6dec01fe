

## Plan: Convert Stone Pages to React + Improve Text Contrast

### 1. Improve text contrast across the site

The site uses `text-gray-400` extensively for body text and descriptions, which is too light on white backgrounds (fails WCAG AA). Changes:

- **Hero subtitle**: `text-gray-400` → `text-gray-600`
- **Section labels** ("Our story", "Technology", "Materials", etc.): `text-gray-400` → `text-gray-500`
- **Body paragraphs** throughout About, Materials, WhoWeServe, Process, Portfolio, Visit, Footer: `text-gray-400` → `text-gray-600`
- **Feature/benefit descriptions**: `text-gray-400` → `text-gray-500`
- **Form legends and placeholders**: `text-gray-300` → `text-gray-400`
- **Step numbers**: `text-gray-200` → `text-gray-300`
- **Footer bottom bar**: `text-gray-300` → `text-gray-400`

This is a systematic find-and-replace across `src/App.tsx` — roughly 30+ instances.

### 2. Convert 6 static HTML stone pages to React routes

**New files to create:**

- `src/pages/EngineeredQuartz.tsx`
- `src/pages/NaturalGranite.tsx`
- `src/pages/Marble.tsx`
- `src/pages/Quartzite.tsx`
- `src/pages/Porcelain.tsx`
- `src/pages/SoapstoneOnyx.tsx`
- `src/components/StonePageLayout.tsx` — shared layout with nav, hero, tabs, CTA, footer

**Shared layout includes:**
- Reusable `GlassNav` and `SiteFooter` from `App.tsx` (extract to shared components)
- Tabbed content structure (Overview, Care, Cost, Design, Fit, FAQ)
- CTA section with contact form
- FAQ accordion

**Each stone page provides:** data object with tab content, images, FAQ items, cost table rows, and design gallery items.

**Routing setup:**
- Install `react-router-dom`
- Update `App.tsx` to use `BrowserRouter` with routes for `/`, `/stones/engineered-quartz`, `/stones/marble`, etc.
- Update portfolio links from `.html` paths to React routes

**Cleanup:**
- Delete all 18 duplicate HTML files (6 in root, 6 in `stones/`, 6 in `public/stones/`)

### 3. Files deleted

- `engineered-quartz.html`, `marble.html`, `natural-granite.html`, `porcelain.html`, `quartzite.html`, `soapstone-onyx.html` (root)
- `stones/*.html` (6 files)
- `public/stones/*.html` (6 files)

### Implementation order

1. Improve text contrast in `App.tsx` (quick wins)
2. Extract shared components (`GlassNav`, `SiteFooter`) to separate files
3. Create `StonePageLayout.tsx` shared template
4. Create 6 stone page components with content from HTML files
5. Add routing with `react-router-dom`
6. Update portfolio stone links to use React routes
7. Delete all static HTML files

