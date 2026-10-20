---
name: Furrow
slug: furrow
genre: modern-minimal
paper: light 96 85
display: grotesk-sans Red Hat Display
accent: warm 40
posture: committed
keywords: farm, agriculture, land, field, livestock, sheep, cattle, crop, records, compliance, inspection, fleet, field service, rural, contractor, hectares, yard, outdoors, seasonal, working, units
material: warm manila office paper, near-black ink in rules and hairlines, Red Hat Display 600 over Red Hat Text with Red Hat Mono figures, flat 6px controls, one white sheet that lifts, one tangerine signal and a grass green for what is in date
photo: natural con=8 sat=-6
pictured: Field Record, Stage hero
---

# Furrow

A working records voice: warm manila office paper, near-black ink, Red Hat Display 600 over Red Hat Text, the family's own mono on the figures that get copied onto a form, flat 6px controls, one tangerine signal (the orange of an ear tag or baler twine) and a grass green for what is in date. It feels useful because every list is ruled, every number carries its unit and every photograph shows the work in its weather, like a well-kept farm office. It is not a pastoral lifestyle page and not a glossy dashboard template.

## Tokens

```css
:root {
  --color-paper: oklch(96% 0.011 85); --color-paper-2: oklch(99.5% 0.005 85); --color-paper-3: oklch(92% 0.016 85);
  --color-ink: oklch(18% 0.006 60); --color-ink-2: oklch(28% 0.008 60); --color-muted: oklch(44% 0.012 60); --color-rule: oklch(88% 0.013 85);
  --color-accent: oklch(70% 0.19 40); --color-accent-ink: oklch(18% 0.006 60); --color-accent-soft: oklch(91% 0.05 50); --color-focus: oklch(60% 0.19 40);
  --color-green: oklch(48% 0.11 150); --color-green-soft: oklch(92% 0.04 150);
  --font-display: "Red Hat Display", "Red Hat Text", ui-sans-serif, sans-serif; --font-body: "Red Hat Text", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "Red Hat Mono", ui-monospace, monospace;
  --radius-card: 10px; --radius-pill: 6px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(18% 0.006 60 / 0.08), 0 14px 28px -16px oklch(18% 0.006 60 / 0.28);
  --tracking-display: -0.035em; --display-weight: 600;
}
```

## Type

- **Display:** Red Hat Display 600, `--tracking-display`, line-height 1.0, sentence case; the price, when it is the offer, sets in it at display size. One weight and one colour per head.
- **Body:** Red Hat Text 400 at 16 to 17px, line-height 1.55, in `--color-muted`; Red Hat Text 500 for a row's title.
- **Labels, captions, table heads, chips, tabs:** Red Hat Text 500 a step smaller, sentence case, untracked. Never mono, never uppercase.
- **Figures (mono as material):** Red Hat Mono 400 and 500, tabular, a step smaller than the text beside them, only for what gets copied onto a form: dates, times, tag numbers, doses, batches, hectares, prices in a row.

## Surfaces

- Rules: a 1px `--color-ink` rule over a list or a table, `--color-rule` hairlines between its rows, a 2px ink rule over a total. Lists are ruled, never boxed into a grid of cards.
- Radii: 4px on chips, 6px on controls and inputs, 10px on wells, sheets and photographs, concentric inside.
- Depth is flat with one exception: a white `--color-paper-2` sheet (a form, a phone's screen, the record) lifts on `--shadow-card` with no border, because it is paper. Wells are `--color-paper-3` and flat.
- Bands: `--color-paper-3`, a tangerine field with ink text (the posture is committed), or `--color-ink` with paper text. Two a page at most.
- Photographs: the working holding in ordinary weather at mid distance: stock on a fell, walls and barns, a gateway and its mud, hands at a pen. Natural colour, a little contrast, never golden hour; 10px radius with an inset ring of ink at 8%, or full-bleed under an ink scrim where text sits on it. A white sheet may overlap a photograph's edge. Tangerine never tints a picture.
- No texture, no grain, no gradient on a surface.

## Range

- **Timetables:** a day or a season as ruled rows, the time in mono on the left, a chip for the kind of entry, the entry in Red Hat Text 500, its figure and unit flush right.
- **Records:** a table on the white sheet, a segmented control of the logs above it, the ink rule over the head row, chips on the soft green or soft tangerine for in date and in withdrawal.
- **Bills:** a price as ruled lines with a 2px ink rule over the total, the total in the display face at display size, on paper or on the tangerine field.
- **Places:** a run of three ruled cells under a full-bleed photograph, each a place, a figure and its unit.

## Controls

- A tangerine-filled primary with ink text beside a white `--color-paper-2` secondary with a 1px `--color-rule` border, both at 6px.
- Tabs and segmented controls sit on `--color-paper-3` with the selected segment in tangerine and ink. Links underline in `--color-rule` and turn tangerine on hover; inputs are white, 6px, with a 1px `--color-muted` border, and a figure field sets in mono.
- Tangerine is a fill with ink on it: the primary, a selected tab, the field band, the focus ring. Green marks what is growing or in date on a chip, never a control.

## Motion

State only, `--dur-short` on `--ease-out`: a row tints to `--color-paper-3` on hover, a tab swaps its table in place, a figure updates when its input changes. No reveals, no parallax.

## Voice

Plain and unit-bearing: 3.6 ha, 10 ml, 28 days, a pound sign on a price. Never a number without its unit, never a pastoral adjective.

## Do-nots

- Never tangerine as type; it is a fill with ink on it.
- Never a third colour: tangerine records, green grows, everything else is ink and paper.
- Never a second shadow; only the white sheet lifts.
- Never mono on a label, a chip or a head; mono is the figure that goes onto a form.
- Never the pastoral picture: hay bales at sunset, boots on a porch, a picnic in a meadow.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@600&family=Red+Hat+Text:wght@400;500&family=Red+Hat+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: var(--display-weight); line-height: 1; }
.btn { border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-md); font-weight: 500; background: var(--color-paper-2); color: var(--color-ink); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); border-color: var(--color-accent); }
.ruled { border-top: var(--rule-hair) solid var(--color-ink); } .ruled > * { border-bottom: var(--rule-hair) solid var(--color-rule); }
.total { border-top: 2px solid var(--color-ink); }
.sheet { background: var(--color-paper-2); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.seg { display: flex; padding: var(--space-2xs); border-radius: var(--radius-pill); background: var(--color-paper-3); } .seg [aria-selected="true"] { background: var(--color-accent); color: var(--color-accent-ink); }
.chip--in-date { background: var(--color-green-soft); color: var(--color-green); } .chip--held { background: var(--color-accent-soft); color: var(--color-ink); }
.band--field { background: var(--color-accent); color: var(--color-accent-ink); }
.num { font-family: var(--font-outlier); font-variant-numeric: tabular-nums; }
```
