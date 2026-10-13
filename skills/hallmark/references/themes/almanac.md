---
name: Almanac
slug: almanac
genre: editorial
paper: mid 84 245
display: grotesk-sans Hanken Grotesk
accent: chromatic-magenta 350
posture: restrained
keywords: almanac, yearbook, field guide, reference, handbook, manual, index, catalogue, encyclopedia, data, figures, tables, statistics, research, dataset, records, directory, glossary, specifications
material: cool slate stock, blue-black ink, Hanken Grotesk heads over Newsreader prose with mono figures, two rule weights and square corners, one chart magenta
photo: muted
pictured: Workbench, Stage hero
---

# Almanac

The register of a reference book: cool slate stock, blue-black ink, Hanken Grotesk heads over Newsreader prose, figures in mono lined up to the decimal, rules in two weights, and one deep magenta, the colour a sea chart prints its lights in, kept small. It reads as exact because the rules and the numerals hold the authority, not colour or ornament. It is not a dashboard on grey and not a warm editorial page.

## Tokens

```css
:root {
  --color-paper: oklch(84% 0.012 245); --color-paper-2: oklch(81% 0.012 245); --color-paper-3: oklch(77% 0.012 245);
  --color-ink: oklch(16% 0.020 245); --color-ink-2: oklch(24% 0.018 245); --color-muted: oklch(38% 0.016 245);
  --color-rule: oklch(74% 0.012 240); --color-rule-2: oklch(38% 0.018 240);
  --color-accent: oklch(44% 0.170 350); --color-accent-ink: oklch(96% 0.006 245); --color-focus: oklch(46% 0.190 350);
  --font-display: "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Newsreader", ui-serif, Georgia, serif;
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 2px; --rule-hair: 1px; --rule-bar: 2px; --shadow-card: none;
  --tracking-display: -0.014em;
}
```

## Type

- **Display:** Hanken Grotesk 600 for every head, `--tracking-display`, line-height 1.05, sentence case, roman. The grotesk sets structure; the serif never sets a head.
- **Body:** Newsreader 400 and 500 with optical sizing, line-height 1.55; italic is in-paragraph emphasis only.
- **Labels, captions, table heads, meta:** Newsreader 500 a step smaller, sentence case, `--color-muted`. Never mono.
- **Figures:** IBM Plex Mono 400 and 500 with `tabular-nums`, right-aligned in a column, decimals lined up. Mono sets numerals that compare and nothing else.

## Surfaces

- Two rule weights: `--rule-hair` in `--color-rule` parts rows and divisions; `--rule-bar` in `--color-rule-2` draws one firm line under a head or a table head. Nothing heavier.
- Square corners on every surface, 2px at most on a control. No boxed cards, no shadows: depth is a rule and a paper step (`--color-paper-2` on a well or an alternate row).
- Bands: a `--color-paper-2` band, or one `--color-ink` band with paper text. Two bands a page at most; never a magenta field.
- Photographs: the coast at working distance: a harbour at low water, boats on their moorings, a slipway, a sea wall, the sea's surface under weather. Mid to far, flat overcast or first light, the horizon high or low in the frame, never through its middle; no face to the lens. Quieted to sit on the slate (the `photo:` line); square, an inset 1px `--color-rule-2` outline, no shadow, full-bleed or across ten columns. A caption beneath in the label style carries a fact (a port, a date, a state of tide); type never sits on a photograph.
- No texture: ruled paper, never a card surface.

## Controls

- A magenta filled control (`--color-accent-ink` on `--color-accent`) beside a hairline-outlined control in ink, both Hanken Grotesk 500 at the 2px radius.
- Links in ink with a 1px magenta underline at a 0.15em offset that thickens on hover; inputs square with a 1px `--color-muted` edge.
- Magenta stays under 5% of a screen: the filled control, link underlines, the one series a chart argues from.

## Motion

Nothing moves except state: a row that links tints on hover, a link's underline thickens. No reveal, no count-up, no marquee.

## Voice

Declarative, dated, exact: cite the figure, the edition, the source, the unit. Never a hype adjective.

## Do-nots

- Never a hot pink or a violet; the magenta holds at L 44, hue 350, deep enough to read as a chart's print.
- Never warm or white paper; slate at hue 245, always tinted.
- Never a boxed card or a drop shadow; two rule weights carry every surface.
- Never a giant count as the hero, or a page of small charts: one chart of real figures, set large, carries the data.
- Never proportional figures in a column; numerals that compare are Plex Mono, tabular, right-aligned.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
body { color: var(--color-ink-2); }
h1, h2, h3 { font-weight: 600; color: var(--color-ink); }
.num, td.num { font-family: var(--font-outlier); font-variant-numeric: tabular-nums; text-align: right; }
thead th, .rule-firm { border-bottom: var(--rule-bar) solid var(--color-rule-2); }
th { font: 500 var(--text-sm)/1.3 var(--font-body); color: var(--color-muted); text-align: left; }
td { border-top: var(--rule-hair) solid var(--color-rule); }
.btn { border: var(--rule-hair) solid var(--color-ink); border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); font: 500 var(--text-sm)/1 var(--font-display); color: var(--color-ink); background: transparent; }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
.well { background: var(--color-paper-2); border-top: var(--rule-bar) solid var(--color-rule-2); }
.band--ink { background: var(--color-ink); color: var(--color-paper); }
.chart .series { fill: none; stroke: var(--color-accent); stroke-width: 2; }
.photo > img { outline: var(--rule-hair) solid var(--color-rule-2); outline-offset: -1px; }
a { color: var(--color-ink); text-decoration-color: var(--color-accent); text-underline-offset: 0.15em; } a:hover { text-decoration-thickness: 2px; }
::selection { background: color-mix(in oklab, var(--color-accent) 22%, transparent); }
```
