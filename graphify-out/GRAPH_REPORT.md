# Graph Report - .  (2026-04-27)

## Corpus Check
- Corpus is ~27,275 words - fits in a single context window. You may not need a graph.

## Summary
- 212 nodes · 184 edges · 8 communities detected
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Listings & Browse Pages|Listings & Browse Pages]]
- [[_COMMUNITY_Brand Design System|Brand Design System]]
- [[_COMMUNITY_Project Setup & Docs|Project Setup & Docs]]
- [[_COMMUNITY_Utility Functions|Utility Functions]]
- [[_COMMUNITY_API Route Handlers|API Route Handlers]]
- [[_COMMUNITY_Color Design Tokens|Color Design Tokens]]
- [[_COMMUNITY_Auth Pages|Auth Pages]]
- [[_COMMUNITY_Navigation Bar|Navigation Bar]]

## God Nodes (most connected - your core abstractions)
1. `Select()` - 19 edges
2. `maiņa.lv Brand / Visual Identity` - 17 edges
3. `GET()` - 9 edges
4. `Next.js Project (maina)` - 8 edges
5. `POST()` - 6 edges
6. `Color Palette Tokens` - 6 edges
7. `generateMetadata()` - 4 edges
8. `getListingById()` - 4 edges
9. `getAllCategoriesGrouped()` - 4 edges
10. `getCategoryFamily()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `File Icon SVG (document/file representation)` --conceptually_related_to--> `Next.js Project (maina)`  [INFERRED]
  public/file.svg → README.md
- `Globe Icon SVG (web/internet symbol)` --conceptually_related_to--> `Next.js Project (maina)`  [INFERRED]
  public/globe.svg → README.md
- `Window/Browser Icon SVG (desktop/app window)` --conceptually_related_to--> `Next.js Project (maina)`  [INFERRED]
  public/window.svg → README.md
- `Next.js Wordmark SVG` --conceptually_related_to--> `Next.js Framework`  [INFERRED]
  public/next.svg → README.md
- `Vercel Logo SVG (triangle logomark, white)` --conceptually_related_to--> `Vercel Deployment Platform`  [INFERRED]
  public/vercel.svg → README.md

## Hyperedges (group relationships)
- **Visual Identity System Sections** — design_logos_section, design_favicon_section, design_navbar_section, design_spinner_section, design_og_section, design_tagline_section [EXTRACTED 1.00]
- **Brand Color Token Set** — design_amber_accent, design_canvas_color, design_ink_color, design_success_color, design_danger_color [EXTRACTED 1.00]
- **Next.js Project Core Stack** — readme_nextjs_project, readme_nextjs_framework, readme_create_next_app, readme_vercel_deployment, readme_next_font, readme_geist_font [EXTRACTED 1.00]
- **Design System Runtime Dependencies** — design_maina_brand, design_react_18, design_babel_standalone, design_logos_jsx, design_sections_jsx [EXTRACTED 1.00]
- **Latvian Brand Identity Rationale** — design_maina_name_origin, design_latvian_identity, design_exchange_icon, design_amber_accent [INFERRED 0.85]

## Communities

### Community 0 - "Listings & Browse Pages"
Cohesion: 0.11
Nodes (23): FilterSidebar(), middleware(), EditListingPage(), generateMetadata(), PostPage(), getAllCategoriesGrouped(), getCategories(), getCategoryBySlug() (+15 more)

### Community 1 - "Brand Design System"
Cohesion: 0.14
Nodes (16): Babel Standalone 7.29.0, Bolt/Wise Aesthetic Inspiration, Exchange Icon (ExchangeIcon component), Favicon Set Section, Inter Typeface (weights 400/600/700/800), Latvian Identity (ņ character as brand asset), maina-logos.jsx Component File, Logo Concepts Section (A/B/C) (+8 more)

### Community 2 - "Project Setup & Docs"
Cohesion: 0.14
Nodes (14): Next.js Breaking Changes Warning, Next.js Local Docs Guide (node_modules/next/dist/docs/), CLAUDE.md References AGENTS.md, File Icon SVG (document/file representation), Globe Icon SVG (web/internet symbol), Next.js Wordmark SVG, Vercel Logo SVG (triangle logomark, white), Window/Browser Icon SVG (desktop/app window) (+6 more)

### Community 3 - "Utility Functions"
Cohesion: 0.18
Nodes (2): listingUrl(), slugify()

### Community 8 - "API Route Handlers"
Cohesion: 0.33
Nodes (1): POST()

### Community 11 - "Color Design Tokens"
Cohesion: 0.33
Nodes (6): Amber Accent Color (#B8651E), Canvas Color (#FAFAF7), Color Palette Tokens, Danger Color (#E24B4A), Ink Color (#0A0A0A), Success Color (#1D9E75)

### Community 13 - "Auth Pages"
Cohesion: 0.67
Nodes (2): " "(), handleSubmit()

### Community 17 - "Navigation Bar"
Cohesion: 0.67
Nodes (1): SearchBar()

## Knowledge Gaps
- **26 isolated node(s):** `create-next-app Bootstrap Tool`, `Geist Font Family`, `Next.js Local Docs Guide (node_modules/next/dist/docs/)`, `CLAUDE.md References AGENTS.md`, `Amber Accent Color (#B8651E)` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Utility Functions`** (12 nodes): `utils.ts`, `categoryUrl()`, `cn()`, `formatDate()`, `formatNumber()`, `formatPrice()`, `initials()`, `isFeatured()`, `listingUrl()`, `slugify()`, `timeAgo()`, `truncate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `API Route Handlers`** (6 nodes): `POST()`, `route.ts`, `route.ts`, `route.ts`, `route.ts`, `route.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Pages`** (4 nodes): `" "()`, `handleSubmit()`, `page.tsx`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Navigation Bar`** (3 nodes): `handleLogout()`, `SearchBar()`, `Navbar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Select()` connect `Listings & Browse Pages` to `API Route Handlers`, `Select UI Component`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `maiņa.lv Brand / Visual Identity` connect `Brand Design System` to `Project Setup & Docs`, `Color Design Tokens`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `Next.js Project (maina)` connect `Project Setup & Docs` to `Brand Design System`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `Select()` (e.g. with `GET()` and `POST()`) actually correct?**
  _`Select()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `GET()` (e.g. with `middleware()` and `Select()`) actually correct?**
  _`GET()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Next.js Project (maina)` (e.g. with `File Icon SVG (document/file representation)` and `Globe Icon SVG (web/internet symbol)`) actually correct?**
  _`Next.js Project (maina)` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `create-next-app Bootstrap Tool`, `Geist Font Family`, `Next.js Local Docs Guide (node_modules/next/dist/docs/)` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._