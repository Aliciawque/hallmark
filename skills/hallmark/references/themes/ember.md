---
name: Ember
slug: ember
genre: atmospheric
paper: dark 17 60
display: slab-serif Bitter
accent: warm 45
posture: committed
keywords: foundry, forge, furnace, metal, hardware, ceramics, kiln, glass, glassblowing, workshop, fabrication, casting, bakery, oven, heat, industrial, tools, knives, brass, bronze
material: soot-dark ground, heavy slab heads with light-weight figures, one grained orb of heat, cast plates with inset seams, a heat bar and a tick ruler
signature: a single molten orb beside the head, with every temperature read off a ruler in the light slab weight
---

# Ember

A soot ground with no wash, Bitter 800 heads with figures in Bitter 300, one grained orb of heat as the page's only light, cast plates with inset seams, a heat bar and a tick ruler. The signature is the molten orb beside the head with every temperature read off a ruler in the light weight.

## Tokens

```css
:root {
  --color-paper: oklch(17% 0.006 60); --color-paper-2: oklch(21% 0.007 60); --color-paper-3: oklch(25% 0.008 60); --color-paper-0: oklch(13% 0.005 60);
  --color-ink: oklch(93% 0.01 70); --color-ink-2: oklch(85% 0.01 70); --color-muted: oklch(64% 0.012 65);
  --color-rule: oklch(30% 0.008 60);
  --color-accent: oklch(70% 0.19 45); --color-accent-2: oklch(84% 0.16 70); --color-accent-deep: oklch(40% 0.14 30); --color-accent-ink: oklch(15% 0.02 45);
  --color-focus: oklch(84% 0.16 70);
  --font-display: "Bitter", Georgia, serif; --font-body: "Instrument Sans", ui-sans-serif, sans-serif;
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 2px; --radius-pill: 2px; --rule-hair: 1px;
  --shadow-card: inset 0 1px 0 oklch(97% 0.01 70 / 0.08), inset 0 -1px 0 oklch(8% 0.01 60 / 0.5), 0 1px 0 oklch(8% 0.01 60 / 0.4);
  --tracking-display: -0.02em;
}
```

Three colourways, stated in the stamp (`ember: furnace`).

| Colourway | Ground, ink, heat |
| --- | --- |
| **furnace** (default) | the tokens above |
| **sand** | ground `oklch(94% 0.018 80)`, ink `oklch(20% 0.015 50)`, muted `oklch(47% 0.02 60)`, accent `oklch(60% 0.19 40)`, hot `oklch(50% 0.18 32)`, rule `oklch(80% 0.022 75)` |
| **blue flame** | ground `oklch(21% 0.025 250)`, ink `oklch(95% 0.01 230)`, muted `oklch(66% 0.02 240)`, accent `oklch(74% 0.14 225)`, hot `oklch(90% 0.1 195)`, rule `oklch(33% 0.025 250)` |

## Faces

- **Display:** Bitter 800, `--tracking-display`, line-height 1.02, roman. Every figure that stands on its own is Bitter 300 in the hot ink: the light weight is the theme's second voice. A head is one weight throughout.
- **Body:** Instrument Sans 400 and 500 at 16px.
- **Labels, captions, table heads, meta:** Instrument Sans 500 one step smaller, sentence case. IBM Plex Mono sets the readouts pinned to a diagram (a temperature, a pour time, a batch code), the ruler's values and code.

## Material

- Two fixed blooms, declared here, and no other light: the orb (a radial gradient from a white-hot core through the accent to the ground, with a turbulence overlay at 0.6, texture.md § 1) and one wide radial in the ground behind it at about 25% alpha. Both static, both `aria-hidden`. Buttons, dots, plates and the heat bar carry no glow.
- Cast plates: `--color-paper-3` surfaces with a 1px highlight seam on top and a 1px dark seam below (the shadow token), 2px radius. Depth is a lightness step, paper-0 under, paper-3 on top.
- Rules 1px; under a figure that measures, the tick ruler: a 1px line with 1px ticks every 20px.
- The control pair: an accent-filled primary with `--color-accent-ink` text beside a ghost with a 1px muted border; hover moves the primary to `--color-accent-2`, no shadow.
- Objects: the orb, the heat bar (9px, a gradient from deep through accent to hot, width by `--t`), the readout (a mono figure on a ground-coloured patch pinned to a diagram). A stamp carries a fact, a date or a frame number, or does not appear.

## Motion

Slow and thermal: the heat bar may fill once on entry over 900ms ease-out; the primary shifts colour over 200ms; the orb never pulses, breathes or drifts.

## Voice

Foundry-plain, figures first: the pour, the alloy, the hour, the temperature. No fire metaphors in copy; the orb does that.

## Do-nots

- Never a glow shadow on a control, a dot, a plate or the bar; the light is the orb.
- Never Bitter 800 on a figure or a paragraph; figures are 300, prose is the sans.
- Never a flame, spark or fire illustration, and never a second orb.
- Never a warm gradient wash across the ground or a spotlight behind the head.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@300;800&family=Instrument+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
.display { font-family: var(--font-display); font-weight: 800; letter-spacing: var(--tracking-display); line-height: 1.02; }
.num { font-weight: 300; color: var(--color-accent-2); font-variant-numeric: tabular-nums; }
.orb { position: relative; border-radius: 50%; aspect-ratio: 1;
  background: radial-gradient(circle at 45% 40%, oklch(97% 0.08 80) 0%, oklch(86% 0.17 65) 14%, var(--color-accent) 34%, oklch(42% 0.14 35) 58%, oklch(22% 0.05 40) 78%, var(--color-paper) 100%); }
.orb-ground { background: radial-gradient(40% 50% at 70% 50%, oklch(70% 0.19 45 / 0.25), transparent 70%); }
.plate { background: var(--color-paper-3); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.heat { display: block; height: 9px; width: calc(var(--t) * 100%); background: linear-gradient(90deg, var(--color-accent-deep), var(--color-accent) 65%, var(--color-accent-2)); }
.btn { background: var(--color-accent); color: var(--color-accent-ink); padding: 14px 20px; border-radius: var(--radius-card); font-weight: 500; }
.btn--ghost { background: transparent; color: var(--color-ink); border: 1px solid var(--color-muted); }
::selection { background: oklch(70% 0.19 45 / 0.3); }
```
