# Handoff: maiņa.lv Homepage

## Overview
This is a high-fidelity homepage prototype for **maiņa.lv** — a Latvian classified ads marketplace. The layout is inspired by OLX.uz's structure (categories first, then listings) but uses maiņa.lv's own visual identity throughout. The goal is a modern, fast-browsing marketplace where users see categories immediately, then scroll into fresh listings.

## About the Design Files
The files in this bundle are **design references built in HTML/React** — interactive prototypes showing intended look, layout, and behavior. They are NOT production code to ship directly.

Your task is to **recreate this design in your existing codebase** (Next.js, React, Vue, etc.) using your established patterns, routing, real API data, and component library. Treat the HTML prototype as a pixel-perfect visual spec.

If you have no existing framework, **Next.js + Tailwind CSS** is the recommended starting point for this type of marketplace.

## Fidelity
**High-fidelity.** Colors, typography, spacing, border radii, hover states, and interactions are all final. Recreate pixel-perfectly using your codebase's patterns.

---

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--color-canvas` | `#FAFAF7` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, navbar, panels |
| `--color-ink` | `#0A0A0A` | Primary text, buttons |
| `--color-accent` | `#B8651E` | Amber — CTAs, TOP badge, brand |
| `--color-muted-surface` | `#F3F2EE` | Tags, chips default bg |
| `--color-border` | `#E8E6DF` | All borders and dividers |
| `--color-muted-text` | `#6B6B68` | Secondary labels, metadata |
| `--color-subtle-text` | `#9A9A96` | Timestamps, tertiary |
| `--color-success` | `#1D9E75` | JAUNS badge |
| `--color-danger` | `#E24B4A` | Saved/heart active state |
| `--color-dark-bg` | `#0A0A0A` | App banner, footer |
| `--color-footer-bg` | `#111111` | Footer background |

### Typography — Inter (Google Fonts, weights 400/500/600/700/800)
| Role | Size | Weight | Letter-spacing |
|---|---|---|---|
| Logo wordmark | 20px | 800 | -0.7px |
| Section heading | 16px | 700 | -0.3px |
| Card title | 13px | 600 | normal |
| Card price | 18px | 800 | -0.5px |
| Category name | 12px | 600 | normal |
| Chip / nav link | 12–13px | 500 | normal |
| Badge | 10px | 700 | 0.04em |
| Metadata / timestamp | 10–11px | 400 | normal |
| App banner headline | 24px | 800 | -0.8px |
| Footer link | 12px | 400 | normal |

### Spacing
- Page max-width: `1200px`, horizontal padding: `20px`
- Section vertical padding: `36px 0`
- Card inner padding: `11px 13px`
- Category tile padding: `18px 12px 14px`
- Navbar height: `60px`

### Border Radius
| Element | Radius |
|---|---|
| Navbar search bar | 9px |
| Category tile | 12px |
| Listing card | 10px |
| Chip / pill | 20px (fully rounded) |
| Button (primary) | 7px |
| Badge | 4px |
| City dropdown | 8px |

### Shadows
| Element | Shadow |
|---|---|
| Navbar | `0 1px 8px rgba(10,10,10,0.06)` |
| Card hover | `0 8px 32px rgba(10,10,10,0.13)` |
| TOP card | `0 2px 16px rgba(184,101,30,0.10)` |
| City dropdown | `0 8px 24px rgba(10,10,10,0.12)` |
| Mobile post FAB | `0 4px 16px rgba(184,101,30,0.4)` |

---

## Screens / Views

### 1. Sticky Navbar
**Height:** 60px | **Background:** `#FFFFFF` | **Border-bottom:** `1px solid #E8E6DF`

**Left:** Logo — exchange arrows SVG icon (24px, `#B8651E`) + wordmark "maiņa" (`#0A0A0A`, 20px, 800 weight) + ".lv" (`#B8651E`). Letter-spacing: -0.7px.

**Center:** Search bar (max-width 580px, flex row):
- City selector button: location icon + city name + chevron. Border-right `1px solid #E8E6DF`. Height 40px. Clicking opens a dropdown of 10 Latvian cities. Active city: text `#B8651E`, bg `#FEF3E7`.
- Text input: placeholder "Ko meklē?", font-size 13px. Transparent bg.
- Search submit button: bg `#0A0A0A`, padding `0 16px`, contains white search icon.

**Right (desktop only):** 3 nav links (Transports, Nekustamais, Darbs) in `#6B6B68`, hover to `#0A0A0A`. Bell icon button. "Ieiet" outlined button (border `#E8E6DF`, height 36px). "Ievietot" filled button (bg `#B8651E`, height 36px, white text, 700 weight, plus icon).

**Mobile (≤768px):** Nav links hidden. Only logo + search + Ievietot button visible.

---

### 2. Category Grid
**Background:** `#FFFFFF` | **Padding:** `28px 0 24px` | **Border-bottom:** `1px solid #E8E6DF`

**Section label:** "Pārlūko kategorijas" — 16px, 700 weight, `#0A0A0A`, margin-bottom 18px.

**Grid:** 5 columns × 2 rows (10 tiles). Gap: 12px.
- **Mobile ≤900px:** 4 columns
- **Mobile ≤600px:** 3 columns

**Each tile:** `background: cat.bg` (unique per category), `border-radius: 12px`, padding `18px 12px 14px`, flex column, center-aligned. Hover: `translateY(-2px)` + shadow.
- SVG icon: 36×36px, `currentColor` = category icon color
- Name: 12px, 600 weight, `#0A0A0A`
- Count: 10px, `#6B6B68`, margin-top 2px

**10 Categories:**
| Name (Latvian) | Background | Icon Color | Count |
|---|---|---|---|
| Transports | `#EEF5FB` | `#1A6FAA` | 12 840 |
| Nekustamais īpašums | `#EDF6F0` | `#1A7A52` | 8 210 |
| Elektronika | `#FEF3E7` | `#B8651E` | 23 540 |
| Darbs | `#F4EEFB` | `#7B3FA0` | 5 320 |
| Pakalpojumi | `#FFF0ED` | `#C04030` | 9 180 |
| Mājai un dārzam | `#EDFAF4` | `#1D9E75` | 7 430 |
| Apģērbs | `#FFF0F6` | `#B03080` | 18 650 |
| Dzīvnieki | `#FFF8EC` | `#C07A10` | 3 290 |
| Bērnu preces | `#EEF4FF` | `#3060C0` | 6 710 |
| Hobiji | `#F5F0FF` | `#5A35C0` | 4 880 |

Clicking a category tile scrolls to the latest ads section and filters it by that category name.

---

### 3. Quick Filter Chips
**Background:** `#FAFAF7` | **Padding:** `12px 0` | **Border-bottom:** `1px solid #E8E6DF`

Horizontally scrollable row (no scrollbar visible) of pill buttons. 15 chips:
`Automašīnas, Dzīvokļi īrē, iPhone, Velosipēdi, Mēbeles, Suni, Klēpjdatori, Vakances Rīgā, Bērnu ratiņi, Elektroinstrumenti, Apavi, Mājas, Planšetes, Darba apģērbs, Kaķi`

**Default chip:** bg `#FFFFFF`, border `1.5px solid #E8E6DF`, color `#0A0A0A`, padding `7px 14px`, border-radius 20px, font-size 12px, weight 500.
**Active chip:** bg `#0A0A0A`, border `#0A0A0A`, color `#FFFFFF`.
Clicking a chip sets it active and populates the search bar.

---

### 4. TOP Listings (Featured Row)
**Padding:** `36px 0 0` | **Background:** `#FAFAF7`

**Section header (flex, space-between):**
- Left: 4px wide `#B8651E` vertical bar + "TOP sludinājumi" (16px, 700) + amber "TOP" badge (bg `#FEF3E7`, border amber 30%, text `#B8651E`, 10px, 700)
- Right: "Skatīt visus" text link in `#B8651E` + right arrow icon

**Card row:** Horizontal scroll (`overflow-x: auto`, no scrollbar). Cards have `minWidth: 260px`, `maxWidth: 300px`, `flexShrink: 0`, displayed in **row layout** (image left, content right).

---

### 5. Latest Ads Grid
**Padding:** `36px 0` | **Background:** `#FAFAF7`

**Section header (flex, space-between):**
- Left: 4px `#0A0A0A` bar + heading (dynamic: category name or "Jaunākie sludinājumi") + grey count
- Right: 3 filter buttons (Visi/Šodien/Vakar). First is active: bg `#0A0A0A`, white text. Others: outlined.

**Grid:** 4 columns, gap 16px. Responsive: 3→2 columns.

**"Rādīt vairāk" button:** Only shown when >8 ads. Outlined `#0A0A0A` button, centered, `padding: 12px 32px`.

---

### 6. Listing Card (shared component)
Two variants: **grid card** (vertical) and **wide card** (horizontal, for TOP row).

**Grid card:**
- Wrapper: `border-radius: 10px`, `border: 1.5px solid #E8E6DF` (TOP: `#B8651E`), `background: #FFFFFF`
- Hover: `translateY(-3px)` + shadow `0 8px 32px rgba(10,10,10,0.13)`
- **Image area:** 150px tall, grey placeholder. Contains:
  - TOP badge: top-left, bg `#B8651E`, text white, 10px, 700, padding `3px 8px`, radius 4px
  - JAUNS badge: bg `#1D9E75`
  - Heart/save button: top-right, 30×30px circle, bg `rgba(255,255,255,0.92)`. Toggle: outline → filled `#E24B4A`
- **Content area:** padding `11px 13px`
  - Category: 11px, `#6B6B68`
  - Title: 13px, 600, `#0A0A0A`, line-height 1.35
  - Price: 18px, 800, `#0A0A0A`, letter-spacing -0.5px
  - Footer row: city (location icon + text, 11px, `#6B6B68`) + timestamp (10px, `#9A9A96`)

**Wide card (TOP row):** `display: flex`. Image 120px wide, full height. Content same as above.

---

### 7. Popular Searches
**Background:** `#FFFFFF` | **Border-top:** `1px solid #E8E6DF` | **Padding:** `32px 0`

**Label:** "Populāri meklējumi" — 13px, 700, `#6B6B68`, uppercase, 0.06em letter-spacing.

**Tags:** flex-wrap. Each: bg `#F3F2EE`, border `#E8E6DF`, radius 20px, padding `6px 14px`, 12px.
Hover: bg `#FEF3E7`, color `#B8651E`, border `rgba(184,101,30,0.3)`. Clicking populates search.

---

### 8. App Download Banner
**Background:** `#0A0A0A` | **Padding:** `40px 0`

Flex row, space-between, wraps on mobile.
- Left: logo (28px exchange icon + wordmark in white/.lv amber) + headline "Pērc. Pārdod. Mainies." (24px, 800, white, amber on "Mainies.") + subtext (14px, `#555555`)
- Right: 2 buttons side by side. Each: bg `#1A1A1A`, border `#2A2A2A`, radius 10px, padding `12px 22px`. "Lejupielādēt no" (10px, `#555`) above "App Store" / "Google Play" (14px, 700, white).

---

### 9. Footer
**Background:** `#111111` | **Padding:** `48px 0 28px` | **Border-top:** `1px solid #1A1A1A`

**Top section:** 4-column grid, gap 32px. Mobile: 2 columns.
Each column: title (12px, 700, white, 0.04em tracking) + links (12px, `#444444`, hover to `#888888`).

Columns: maiņa.lv | Palīdzība | Populāras kategorijas | Biznesam

**Bottom bar:** border-top `#1A1A1A`, padding-top 24px. Flex, space-between.
- Left: small logo (16px exchange icon + 14px wordmark)
- Right: "© 2026 maiņa.lv · Latvija · Sludinājumi bez komisijas" (11px, `#2A2A2A`)

---

### 10. Mobile Bottom Navigation (≤768px only)
Fixed bottom bar. `background: #FFFFFF`, `border-top: 1px solid #E8E6DF`, `padding: 8px 0 env(safe-area-inset-bottom, 12px)`.

5 tabs: Sākums (grid icon) | Meklēt (search) | **Ievietot** (CTA) | Ziņas (chat) | Profils (user)

**Post CTA tab:** 48×48px circle, bg `#B8651E`, box-shadow `0 4px 16px rgba(184,101,30,0.4)`, `margin-top: -20px` (floats above bar). White plus icon.

**Active tab:** icon + label in `#B8651E`, weight 600.
**Inactive tab:** icon + label in `#6B6B68`, weight 400.

---

## Interactions & Behavior

| Interaction | Behavior |
|---|---|
| City dropdown | Click city button → dropdown opens. Click city → closes + updates label. |
| Category tile click | Filters latest ads section + smooth scrolls to it. Click same category again → shows all. |
| Chip click | Sets chip active (toggle style) + populates search input |
| Popular search click | Populates search input |
| Heart/save button | Toggles saved state. Outline → filled red (`#E24B4A`) |
| "Rādīt vairāk" | Expands ads from 8 → all. Button disappears. |
| Card hover | `translateY(-3px)` + shadow deepens (0.18s ease) |
| Category tile hover | `translateY(-2px)` + shadow (0.15s ease) |
| Nav link hover | Color `#6B6B68` → `#0A0A0A` |
| Popular tag hover | bg → `#FEF3E7`, color → `#B8651E` |

---

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| ≤1024px | Ads grid: 4→3 columns |
| ≤900px | Category grid: 5→4 columns |
| ≤768px | Nav links hidden; mobile bottom bar appears; ads grid 2 cols; body padding-bottom 68px; footer 2-col |
| ≤600px | Category grid: 3 columns |
| ≤480px | Ads grid: 2 columns, gap 10px |

---

## Logo Component
The `ExchangeIcon` is a custom SVG of two curved arrows forming a cycle (exchange motif):
- Two arcs: upper (left→right, over top) and lower (right→left, under bottom)
- Arrowheads at each arc's end terminus
- Drawn with `stroke-linecap: round`, configurable color and stroke width
- Always rendered in `#B8651E` (or `#D08840` on very dark backgrounds)

Wordmark: "maiņa" in `#0A0A0A` + ".lv" in `#B8651E`, single text node (no gap).

---

## Data Shape

### Ad object
```typescript
interface Ad {
  id: number;
  cat: string;        // Category name (Latvian)
  title: string;      // Ad title
  price: string;      // Formatted price string e.g. "€ 18 900"
  city: string;       // City name
  time: string;       // Relative time string e.g. "Šodien, 10:45"
  top: boolean;       // Featured/promoted listing
  img: string;        // Image URL (placeholder hex color in prototype)
  tag: string | null; // Badge text: "TOP" | "JAUNS" | null
}
```

### Category object
```typescript
interface Category {
  id: string;
  lv: string;         // Latvian name
  count: string;      // Formatted count e.g. "12 840"
  bg: string;         // Tile background hex
  icon: string;       // SVG icon color hex
  iconPath: ReactNode; // SVG path elements
}
```

---

## Assets
- **Font:** Inter via Google Fonts — weights 400, 500, 600, 700, 800
- **Icons:** All custom inline SVG — no icon library needed. See `ExchangeIcon` and `Icon` components in `maina-homepage.html`
- **Images:** Prototype uses SVG placeholders. Replace with real `<img>` tags pointing to your CDN/storage.

---

## Files in this Bundle
| File | Description |
|---|---|
| `maina-homepage.html` | Full interactive prototype — open in any browser |
| `maina-design-system.html` | Logo concepts, color palette, OG templates, identity system |
| `README.md` | This document |

---

## Implementation Notes for Claude Code

1. **Start with the Navbar** — it's the global component and establishes the token system.
2. **`ExchangeIcon`** — copy the SVG path generation logic directly; it's a computed SVG, not a static file.
3. **Category icons** — inline SVG paths. Consider wrapping them in a `CategoryIcon` component that takes an `id` prop and returns the right path.
4. **Horizontal scroll rows** — use `overflow-x: auto` with `scrollbar-width: none` (Firefox) and `::-webkit-scrollbar { height: 0 }` (Chrome). No JS needed.
5. **Sticky navbar** — `position: sticky; top: 0; z-index: 100` — works without JS.
6. **Category filter** — a simple `useState` string that filters the ads array client-side. In production, pass as a query param and fetch from API.
7. **TOP listings** — in production, these are a separate API endpoint (promoted ads). In the prototype they're just `ADS.filter(a => a.top)`.
8. **Mobile nav** — use CSS `@media (max-width: 768px)` to toggle `display: none / flex`. No JS needed.
9. **Safe area inset** — mobile nav bottom padding uses `env(safe-area-inset-bottom, 12px)` for iPhone notch support.
