---
name: Vellum
slug: vellum
genre: editorial
paper: light 93 80
display: blackletter Grenze Gotisch
accent: cool 275
posture: committed
keywords: roastery, coffee, bakery, wine, cellar, apothecary, bookshop, press, letterpress, guild, heritage, artisan, manuscript, parchment, edition, tasting, vintage, craft, old world, slow
material: parchment paper, a long tan fibre wash on bands, umber ink, Grenze Gotisch heads over Hanken Grotesk, hairline and double rules, one ultramarine pigment
photo: warm con=6
pictured: Trade Ledger, Poster hero
---

# Vellum

An old printing house: a parchment ground, umber ink, Grenze Gotisch for the heads, a plain Hanken Grotesk for everything read, hairlines and double rules, and ultramarine as the one pigment. The gothic face carries the age, so nothing else is ornamented: no tavern, no distressed pastiche, no cream-and-serif editorial page.

## Tokens

```css
:root {
  --color-paper: oklch(93% 0.025 80); --color-paper-2: oklch(89% 0.03 78); --color-paper-3: oklch(85% 0.032 76);
  --color-ink: oklch(22% 0.02 60); --color-ink-2: oklch(30% 0.02 60); --color-muted: oklch(46% 0.02 65);
  --color-rule: oklch(74% 0.03 75);
  --color-accent: oklch(42% 0.16 275); --color-accent-deep: oklch(34% 0.15 275); --color-accent-ink: oklch(94% 0.02 80);
  --color-focus: oklch(50% 0.17 275); --color-field: var(--color-accent);
  --font-display: "Grenze Gotisch", ui-serif, Georgia, serif; --font-body: "Hanken Grotesk", ui-sans-serif, sans-serif;
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 2px; --radius-pill: 2px; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.01em; --fibre: 0.5;
}
```

Three colourways, stated in the stamp (`vellum: parchment`).

| Colourway | Ground, ink, pigment |
| --- | --- |
| **parchment** (default) | the tokens above |
| **oxblood, reversed** | ground `oklch(27% 0.09 20)`, ink `oklch(94% 0.02 80)`, pigment gold `oklch(84% 0.11 85)` texted in the ground, rule `oklch(44% 0.08 20)`, fibre at 0.25 |
| **indigo, the ledger** | ground `oklch(93% 0.012 240)`, ink `oklch(24% 0.035 265)`, the same ultramarine, rule `oklch(76% 0.02 250)`, fibre at 0.14 |

## Type

- **Display:** Grenze Gotisch 600 for heads, line-height 0.92, `--tracking-display`, sentence case. The face closes up below 30px, so `h3` and anything smaller set in Hanken Grotesk 600.
- **Body:** Hanken Grotesk 400 and 500, line-height 1.5; nav links at 600.
- **Labels, captions, table heads, meta:** Hanken Grotesk 500 a step smaller, sentence case, untracked. IBM Plex Mono sets only the figures a table compares (prices, weights, lots) and code.

## Surfaces

- Rules: 1px `--color-rule` hairlines inside tables, 1px ink along a section's top, and a `4px double` ink rule where a printer would double one, as over a table's head.
- Radius 2px everywhere, no pills, no shadows: the page is printed flat.
- Bands: a `--color-paper-2` band, where the fibre wash may sit, or one ultramarine `--color-field` with parchment text; two a page at most.
- Photographs: the trade in its own light: green beans into the drum, a roast tipping into the cooling tray, sacks against brick, a cup on the counter, hands folding a bag. Close, in window light or the roaster's glow, no face to the lens; warmed (the `photo:` line), 2px radius, a 1px `--color-rule` edge, no shadow. Captions beneath carry a fact (the coffee, the weight, the day); a head sits on one only over an umber scrim at its foot.
- Texture, the fibre wash: long tan fibres of SVG turbulence, stitched so they never tile, multiplied at `--fibre` (the low-frequency wash in `texture.md`), on a band or a well only, never under running text or a photograph.

## Controls

- A pigment-filled primary (`--color-accent-ink` on `--color-accent`) that deepens to `--color-accent-deep` on hover, beside a ghost with a 1px ink border, both 2px radius, Hanken Grotesk 500.
- Links underline in pigment on hover; inputs take 2px radius and a 1px ink border.
- Ultramarine is the one pigment: the primary, a link's hover, the focus ring, the numerals that index a list or a table, one band.

## Motion

Still. A hover underline in pigment and the primary deepening over `--dur-micro`; no reveal, no parallax.

## Voice

Ledger-plain and dated: the item, the price paid, the hour, the room. Never *artisanal*, never *curated*.

## Do-nots

- Never clay, terracotta or oxblood as the pigment on parchment; oxblood is a ground only.
- Never Grenze Gotisch below 30px, at paragraph length, or opening a head on a capital I, which reads as J.
- Never a torn or deckled edge, a vignette, a coffee ring, a burn or a second texture.
- Never a year or a count at poster size standing in for a picture; the founding year sits in a sentence or a table row.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@400;600&family=Hanken+Grotesk:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2 { font-weight: 600; line-height: 0.92; }
h3 { font-family: var(--font-body); font-weight: 600; }
.btn { border: var(--rule-hair) solid currentColor; border-radius: var(--radius-card); padding: var(--space-sm) var(--space-lg); font-weight: 500; color: inherit; background: transparent; transition: background-color var(--dur-micro) var(--ease-out); }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
.btn--primary:hover { background: var(--color-accent-deep); border-color: var(--color-accent-deep); }
.band--pigment { background: var(--color-field); color: var(--color-accent-ink); }
.band--pigment .btn--primary { background: var(--color-accent-ink); border-color: var(--color-accent-ink); color: var(--color-accent); }
.rule-double { border-top: 4px double var(--color-ink); }
.fibre { position: relative; isolation: isolate; }
.fibre::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: var(--fibre); mix-blend-mode: multiply; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='p' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.004 0.02' numOctaves='4' seed='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.62 0 0 0 0 0.52 0 0 0 0 0.36 0 0 0 0.3 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E"); }
```
