---
name: Garden
slug: garden
genre: editorial
paper: light 95.5 92
display: roman-serif Vollkorn
accent: chromatic-green 140
posture: committed
keywords: farm, apiary, honey, cidery, orchard, pick your own, apples, seed, nursery, herbalist, botanical, tea, preserves, single-origin, seasonal, harvest, small-maker, csa, provenance, grown, field, homestead
material: warm oat paper, deep green ink, Vollkorn 700 over Hanken Grotesk, hairlines and soft moss or clay tints, daylight photographs in true colour, one leaf-green signal
photo: natural con=6 sat=-6
pictured: Narrative Workflow, Stage hero
---

# Garden

A grower's voice: warm oat paper, a near-black green ink, sturdy Vollkorn heads over Hanken Grotesk, hairlines, soft moss and clay tints, the place photographed in daylight, one leaf-green signal. It feels honest and seasonal because every neutral leans green, the fruit keeps its real colour and nothing is boxed, glossy or grey. It is not a sage-and-slate wellness page and not a cream bookshop with a terracotta accent.

## Tokens

```css
:root {
  --color-paper: oklch(95.5% 0.022 92); --color-paper-2: oklch(92.5% 0.026 92); --color-paper-3: oklch(89.5% 0.030 92);
  --color-ink: oklch(24% 0.052 152); --color-ink-2: oklch(33% 0.050 150); --color-muted: oklch(48% 0.030 145);
  --color-rule: oklch(84% 0.020 120); --color-rule-2: oklch(70% 0.040 140);
  --color-accent: oklch(47% 0.130 140); --color-accent-ink: oklch(97% 0.015 95);
  --color-focus: oklch(47% 0.130 140); --tint-moss: oklch(47% 0.130 140 / 0.10); --tint-clay: oklch(54% 0.140 46 / 0.10);
  --font-display: "Vollkorn", ui-serif, Georgia, serif; --font-body: "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "Newsreader", ui-serif, Georgia, serif;
  --radius-card: 4px; --radius-pill: 999px; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.01em;
}
```

## Type

- **Display:** Vollkorn 700, roman, sentence case, `--tracking-display`, line-height 1.05; one weight for every head, never italic. A sturdy old-style serif with a dark, warm colour on the page, not a high-contrast serif.
- **Body:** Hanken Grotesk 400 and 500 with `oldstyle-nums`; heads, tables and figures take lining tabular numerals.
- **Captions under a photograph (the outlier):** Newsreader 400 at the label size, sentence case, in `--color-muted`, one fact a line, like a nursery's label. Vollkorn never runs as body.
- **Labels, table heads, meta, lot codes, dates:** Hanken Grotesk 500 a step smaller, sentence case, untracked, `--color-muted`. No mono on the page.

## Surfaces

- Rules: 1px `--color-rule` hairlines part rows and sections; `--color-rule-2` tops a table or outlines a control. Radius 4px on wells and photographs, pills on controls.
- Depth is flat paper: no shadow, no drop-shadowed box; a well is `--color-paper-2` or a tint, never a bordered card.
- Bands: a full-bleed `--tint-moss` or `--tint-clay` wash, `--color-paper-2`, or the green ink with oat text; never a solid leaf-green field. Two a page at most.
- Photographs: the place in its season, in daylight and true colour: fruit on the bough at arm's length, the rows seen from the grass, hands and baskets at the work, crates in the barn; soft overcast or low sun, the fruit never pushed past its real colour. 4px radius, a 1px `--color-rule` hairline, no shadow. A head sits on a photograph only over an ink scrim at 40 to 60%.
- Every neutral carries a green or oat cast (hue 90 to 152), never a pure grey. No texture.

## Controls

- One flat leaf-green pill with `--color-accent-ink` text beside a hairline-outlined pill in `--color-rule-2`.
- Links in ink, underlined, the line turning leaf green on hover; inputs at 4px with a 1px `--color-muted` border on oat.
- Leaf green stays under 5% of a screen: the primary, a link's hover, the focus ring, one figure. Clay lives in its tint band only, never on a control, a nav or a head.

## Motion

State only, `--dur-short` on `--ease-out`: a pill darkens one step, an underline grows under a link. No reveal, no stagger, no parallax.

## Voice

Warm, honest, seasonal, unhurried. Say the field, the variety, the month, the acreage, the number of jars, only as the brief gives them; never artisanal, curated or small-batch as a hollow badge.

## Do-nots

- Never grey-sage or slate paper; the ground is warm oat, hue 92.
- Never a cool teal or corporate emerald; the green is chlorophyll, hue 140.
- Never italic or faux-bold Vollkorn; load the real 700.
- Never clay on a control or a head, and never a gradient on the leaf-green pill.
- Never produce styled on white or a staged picnic; the place is a working one.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Vollkorn:wght@700&family=Hanken+Grotesk:wght@400;500&family=Newsreader:opsz,wght@6..72,400&display=swap" rel="stylesheet">
```

```css
body { font-variant-numeric: oldstyle-nums; color: var(--color-ink-2); }
h1, h2, h3, table, .num { font-variant-numeric: lining-nums tabular-nums; }
h1, h2, h3 { font-weight: 700; color: var(--color-ink); }
.btn { border-radius: var(--radius-pill); border: var(--rule-hair) solid var(--color-rule-2); padding: var(--space-sm) var(--space-lg); font-weight: 500; color: var(--color-ink); }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
.band--moss { background: var(--tint-moss); }
.photo img { border-radius: var(--radius-card); outline: var(--rule-hair) solid var(--color-rule); outline-offset: -1px; }
.photo figcaption { font: 400 var(--text-sm)/1.4 var(--font-outlier); color: var(--color-muted); }
a:hover { text-decoration-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 22%, transparent); }
```
