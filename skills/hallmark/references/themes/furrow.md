---
name: Furrow
slug: furrow
genre: modern-minimal
paper: light 96.5 90
display: grotesk-sans Red Hat Display
accent: warm 40
posture: committed
keywords: farm, agriculture, land, field, livestock, sheep, cattle, crop, records, compliance, inspection, fleet, field service, rural, contractor, hectares, yard, outdoors, seasonal, working, units
material: warm office paper, near-black ink in rules and hairlines, Red Hat Display 600 over Red Hat Text with Red Hat Mono figures, flat 6px controls, one tangerine signal
photo: natural con=8 sat=-6
pictured: Photographic, Stage hero
---

# Furrow

A working records voice: warm office paper, near-black ink, Red Hat Display 600 over Red Hat Text, the family's own mono on the figures that get copied onto a form, flat 6px controls, one tangerine signal (the orange of an ear tag or baler twine) and a green for what is growing. It feels useful because every list is ruled, every number carries its unit and every photograph shows the work in its weather, like a well-kept farm office. It is not a pastoral lifestyle page and not a glossy dashboard template.

## Tokens

```css
:root {
  --color-paper: oklch(96.5% 0.008 90); --color-paper-2: oklch(99.5% 0.005 90); --color-paper-3: oklch(92.5% 0.012 90);
  --color-ink: oklch(18% 0.005 60); --color-ink-2: oklch(28% 0.008 60); --color-muted: oklch(44% 0.010 60); --color-rule: oklch(89% 0.010 90);
  --color-accent: oklch(70% 0.19 40); --color-accent-ink: oklch(18% 0.005 60); --color-focus: oklch(62% 0.19 40);
  --color-green: oklch(50% 0.11 150);
  --font-display: "Red Hat Display", "Red Hat Text", ui-sans-serif, sans-serif; --font-body: "Red Hat Text", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "Red Hat Mono", ui-monospace, monospace;
  --radius-card: 10px; --radius-pill: 6px; --rule-hair: 1px;
  --shadow-card: 0 10px 24px -14px oklch(18% 0.005 60 / 0.2);
  --tracking-display: -0.035em; --display-weight: 600;
}
```

## Type

- **Display:** Red Hat Display 600, `--tracking-display`, line-height 1.0, sentence case. One weight and one colour per head.
- **Body:** Red Hat Text 400 at 16px, line-height 1.55, in `--color-muted`; Red Hat Text 500 for a row's title.
- **Labels, captions, table heads, chips, meta:** Red Hat Text 500 a step smaller, sentence case, untracked. Never mono, never uppercase.
- **Figures (mono as material):** Red Hat Mono 400 and 500, tabular, a step smaller than the text beside them, only for what gets copied onto a form: dates, tag numbers, doses, withdrawal days, hectares, prices. One superfamily, so the figures sit in the line.

## Surfaces

- Rules: a 1px `--color-ink` rule over a list or a table, `--color-rule` hairlines between its rows. Lists are ruled, never boxed into a grid of cards.
- Radii: 4px on chips and checkboxes, 6px on controls and inputs, 10px on wells, screens and photographs, concentric inside.
- Depth is flat with one exception: a white `--color-paper-2` sheet (a form, a dialog, a phone's screen) lifts on `--shadow-card` with no border, because it is paper. Wells are `--color-paper-3` and flat.
- Bands: `--color-paper-3`, a tangerine field with ink text (the posture is committed), or `--color-ink` with paper text. Two a page at most.
- Photographs: the working holding in ordinary weather, at mid distance under overcast light: ewes in a wet field, a gateway and its mud, a stock trailer in a yard, hands at a hurdle or a pen. Natural colour with a little contrast; never golden hour. 10px radius with an inset ring of ink at 8%; a caption beneath in the label style; where text sits on a photograph, an ink scrim from its edge. Tangerine never tints a picture.
- No texture, no grain, no gradient.

## Controls

- A tangerine-filled primary with ink text beside a white `--color-paper-2` secondary with a 1px `--color-rule` border, both at 6px.
- Links underline in `--color-rule` and the line turns tangerine on hover; inputs are white, 6px, with a 1px `--color-muted` border, and a figure field sets in mono.
- Tangerine is a fill with ink on it: the primary, a selected chip, the field band, the focus ring. `--color-green` marks what is growing or in date on a chip or a figure, never a control.

## Motion

State only, `--dur-short` on `--ease-out`: a row tints to `--color-paper-3` on hover, a figure updates in place when its input changes. No reveals, no parallax.

## Voice

Plain and unit-bearing: 214 ha, 6.1 t/ha, 12 days withdrawal, GBP per hectare. Never a number without its unit, never a pastoral adjective.

## Do-nots

- Never tangerine as type; it is a fill with ink on it.
- Never a third colour: tangerine records, green grows, everything else is ink and paper.
- Never a second shadow; only the white sheet lifts.
- Never mono on a label, a chip or a head; mono is the figure that goes onto a form.
- Never the pastoral picture: hay bales at sunset, boots on a porch, a picnic in a meadow; the farm at work, in its weather.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@600&family=Red+Hat+Text:wght@400;500&family=Red+Hat+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: var(--display-weight); line-height: 1; }
.btn { border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-md); font-weight: 500; background: var(--color-paper-2); color: var(--color-ink); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); border-color: var(--color-accent); }
.ruled { border-top: var(--rule-hair) solid var(--color-ink); } .ruled > * { border-bottom: var(--rule-hair) solid var(--color-rule); }
.sheet { background: var(--color-paper-2); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.band--field { background: var(--color-accent); color: var(--color-accent-ink); }
.num { font-family: var(--font-outlier); font-variant-numeric: tabular-nums; }
::selection { background: color-mix(in oklab, var(--color-accent) 30%, transparent); }
```
