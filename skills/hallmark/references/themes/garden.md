---
name: Garden
slug: garden
genre: editorial
paper: light 95.5 92
display: roman-serif Young Serif
accent: chromatic-green 140
posture: committed
keywords: farm, apiary, honey, cidery, orchard, seed, nursery, herbalist, botanical, tea, preserves, single-origin, seasonal, harvest, small-maker, csa, provenance, grown, field, homestead
material: oat paper, green ink, one chunky roman serif, a leaf-green signal, clay kept inside hand-built craft
signature: a specimen drawn in CSS and SVG mounted on a warm oat sheet beside its caption
---

# Garden

Warm oat paper, a near-black green ink, Young Serif heads over Hanken Grotesk, one leaf-green signal, a clay pop kept inside hand-built CSS and SVG craft. The signature is a drawn specimen mounted on the oat sheet beside its caption.

## Tokens

```css
:root {
  --color-paper: oklch(95.5% 0.022 92); --color-paper-2: oklch(92.5% 0.026 92); --color-paper-3: oklch(89.5% 0.030 92);
  --color-ink: oklch(24% 0.052 152); --color-ink-2: oklch(33% 0.050 150); --color-muted: oklch(48% 0.030 145);
  --color-rule: oklch(84% 0.020 120); --color-rule-2: oklch(70% 0.040 140);
  --color-accent: oklch(47% 0.130 140); --color-accent-2: oklch(54% 0.140 46); --color-accent-ink: oklch(97% 0.015 95);
  --color-focus: oklch(47% 0.130 140); --tint-moss: oklch(47% 0.130 140 / 0.10); --tint-clay: oklch(54% 0.140 46 / 0.10);
  --font-display: "Young Serif", ui-serif, Georgia, serif; --font-body: "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "Newsreader", ui-serif, Georgia, serif;
  --radius-card: 4px; --radius-pill: 999px; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.006em;
}
```

## Faces

- **Display:** Young Serif 400, roman, `--tracking-display`, up to 5rem. One weight ships, so hierarchy comes from size, never from italic or a bolder cut. Chunky and hand-cut, not a high-contrast serif.
- **Body:** Hanken Grotesk 400, 500, 600 with `oldstyle-nums`. Newsreader 400 carries long provenance prose at 58ch; Young Serif never runs as body.
- **Labels, captions, table heads, meta, lot codes, dates:** Hanken Grotesk 500 one step smaller, sentence case, untracked, `--color-muted`: the herbarium tag reads like a caption, never like a stamp. No mono on the page.

## Material

- Hand-built botanical craft: the imagery is pure CSS and hand-authored SVG (a honeycomb wash, a jar of amber, corked vials, a pressed leaf), never a stock photo. It is the thing being sold, not decoration.
- Tint bands, not boxed cards: soft full-bleed washes in `--tint-moss` or `--tint-clay`; structure is 1px hairlines plus whitespace, never a drop-shadowed box. Flat paper, no texture.
- Every neutral carries a green cast (hue 90 to 152), no pure grey. Leaf-green stays under 5% of a viewport. Clay lives inside the craft, almost never as chrome.
- The control pair: one flat leaf-green pill with `--color-accent-ink` text beside a hairline-outlined pill in `--color-rule-2`.
- A sprig ornament: one small hand-authored SVG leaf in `--color-rule-2`, the fleuron botanised; ornament, never chrome.

## Motion

Nothing moves except state: one hover on a piece of craft, a jar filling or a leaf tilting, on transform and opacity only. No reveal, no stagger, no parallax.

## Voice

Warm, honest, seasonal, unhurried. Say the ridge, the flower, the pour date, the number of jars; never artisanal, curated or small-batch as a hollow badge.

## Do-nots

- Never grey-sage or slate paper; the ground is warm oat, hue 92.
- Never a photograph where the craft should be.
- Never a cool teal or corporate emerald; the green is chlorophyll, hue 140.
- Never italic or faux-bold Young Serif.
- Never clay on a control or a nav, never a gradient on the leaf-green control.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Hanken+Grotesk:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400&display=swap" rel="stylesheet">
```

```css
body { font-family: var(--font-body); font-variant-numeric: oldstyle-nums; color: var(--color-ink-2); }
.display { font: 400 clamp(2.25rem, 4vw + 1rem, 5rem)/1.05 var(--font-display); letter-spacing: var(--tracking-display); color: var(--color-ink); }
.tag { font-size: 0.8125rem; font-weight: 500; color: var(--color-muted); }
.band--moss { background: var(--tint-moss); }
.btn--solid { border-radius: var(--radius-pill); background: var(--color-accent); color: var(--color-accent-ink); }
.btn--line { border-radius: var(--radius-pill); border: var(--rule-hair) solid var(--color-rule-2); color: var(--color-ink); }
::selection { background: oklch(47% 0.130 140 / 0.22); }
```
