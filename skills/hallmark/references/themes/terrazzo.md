---
name: Terrazzo
slug: terrazzo
genre: modern-minimal
paper: light 96 80
display: geometric-sans Syne
accent: warm 35
posture: restrained
keywords: materials, library, architects, samples, catalogue, surfaces, stone, timber, terrazzo, ceramic, tile, interiors, interiors studio, showroom, specification, swatches, supplier, drawer, photography, tactile
material: off-white paper, white plates ruled in ink, wide Syne heads over Onest, hard offset shadows, surfaces photographed flat-on in true colour, rust the one signal
photo: natural con=4
pictured: Catalogue, Settled hero
---

# Terrazzo

A materials library's catalogue voice: off-white paper, near-black ink, wide Syne heads over a plain Onest body, and square white plates ruled in ink that hold the surfaces themselves, photographed flat-on and close. Controls are ink; colour arrives only in aggregate, in the stone, timber, terrazzo and glaze the photographs show, with rust as the one signal. It is not a pastel lifestyle page and not confetti.

## Tokens

```css
:root {
  --color-paper: oklch(96% 0.01 80); --color-paper-2: oklch(92% 0.013 80); --color-paper-3: oklch(88% 0.015 80);
  --color-plate: oklch(99.5% 0.003 80);
  --color-ink: oklch(15% 0.005 60); --color-ink-2: oklch(26% 0.006 60); --color-muted: oklch(47% 0.01 60);
  --color-rule: oklch(82% 0.012 80);
  --color-accent: oklch(52% 0.15 35); --color-accent-ink: oklch(99.5% 0.003 80); --color-focus: oklch(50% 0.16 35);
  --font-display: "Syne", ui-sans-serif, sans-serif; --font-body: "Onest", ui-sans-serif, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 2px;
  --shadow-card: 16px 16px 0 var(--color-paper-3); --shadow-card-hover: 16px 16px 0 var(--color-ink);
  --tracking-display: -0.02em;
}
```

Three colourways, stated in the stamp (`terrazzo: off-white`).

| Colourway | Paper and ink | Signal and controls |
| --- | --- | --- |
| **Off-white** (default) | `oklch(96% 0.01 80)` under near-black ink | rust; ink controls |
| **Black** | `oklch(14% 0.005 60)` under bone ink `oklch(96% 0.01 80)`; plates stay white | rust lifted to `oklch(68% 0.14 40)`; bone controls with ink text |
| **Stone** | warm grey `oklch(85% 0.012 80)` under the same ink, a `--rule-bar` ink rule under the nav | rust; ink controls |

## Type

- **Display:** Syne 700 for heads and the wordmark, `--tracking-display`, line-height 1.02, roman, sentence case. The face sets wide, so heads stay short rather than drop a step; 800 turns its wide forms clumsy, so it is never used.
- **Body:** Onest 400 and 500, line-height 1.5.
- **Labels, captions, table heads, meta:** Onest 500 a step smaller, sentence case, untracked. JetBrains Mono 500 sets sample codes, dimensions and spec figures only, never a label or a head.

## Surfaces

- Rules: `--rule-bar` ink on the top of a table and around a plate; `--rule-hair` in `--color-rule` between rows. Radius 0 everywhere.
- Plates: `--color-plate` inside a `--rule-bar` ink border over the hard `--shadow-card` (paper-3, no blur), the page's one container; nothing else casts.
- Bands: a `--color-ink` band with paper text, or a `--color-paper-2` band; never a coloured field, two a page at most.
- Photographs: the surface itself, flat-on and close in even daylight, so grain, chips, veins and joints read near one to one: a polished terrazzo slab, a honed stone edge, oak end grain, a glazed tile's face; one wider frame of samples on a table or on shelves for scale. True colour, a little sharpened (the `photo:` line). Each sits on a plate, edge to edge or with the plate as its margin; a caption beneath in the label style names the family and the finish; type never sits on a photograph.
- No texture and nothing drawn on the paper: the surfaces in the photographs are the pattern.

## Controls

- An ink-filled primary with paper text beside a `--rule-bar` inset ink outline, both square, Onest 500. On the ink band the primary turns plate with ink text.
- Links are ink with a hairline underline that turns rust on hover; inputs are square on `--color-plate` with a 1px ink border.
- Rust reaches a figure, a selected row or chip, a hover underline and the focus ring; colour otherwise comes only from the photographs.

## Motion

Still. A plate that links swaps its offset from paper-3 to ink on hover over `--dur-micro`; nothing reveals.

## Voice

A catalogue's plainness: the family, the finish, the count, the size at one to one. Never sells the feeling of stone.

## Do-nots

- Never a drawn chip, speck or confetti; a surface's colour comes from its photograph.
- Never a photograph as a background or under type; it lives on a plate.
- Never a coloured primary on off-white paper; controls are ink.
- Never a rounded corner, on a plate, a control or a photograph.
- Never mono on a label; mono is the sample code and the millimetres.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700&family=Onest:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: 700; line-height: 1.02; }
.btn { border-radius: 0; padding: var(--space-md) var(--space-lg); font-weight: 500; color: inherit; }
.btn--primary { background: var(--color-ink); color: var(--color-paper); }
.btn--secondary { box-shadow: inset 0 0 0 var(--rule-bar) currentColor; }
.plate { background: var(--color-plate); border: var(--rule-bar) solid var(--color-ink); box-shadow: var(--shadow-card); }
a.plate { transition: box-shadow var(--dur-micro) var(--ease-out); }
a.plate:hover { box-shadow: var(--shadow-card-hover); }
.plate img { display: block; width: 100%; height: 100%; object-fit: cover; }
.band--ink { background: var(--color-ink); color: var(--color-paper); }
.band--ink .btn--primary { background: var(--color-plate); color: var(--color-ink); }
.code { font-family: var(--font-outlier); font-weight: 500; font-variant-numeric: tabular-nums; }
::selection { background: color-mix(in oklab, var(--color-accent) 25%, transparent); }
```
