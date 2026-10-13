---
name: Hedgerow
slug: hedgerow
genre: editorial
paper: dark 24 165
display: high-contrast-serif Prata
accent: chromatic-green 115
posture: drenched
keywords: distillery, gin, brewery, forager, botanicals, nature reserve, walking, trail, seeds, plants, nursery, hedge, countryside, field guide, provenance, harvest, batch, seasonal, map, miles
material: deep hedge-green paper, cream ink, Prata heads over Manrope, low-key photographs in true colour, square flat surfaces with pill controls, one chartreuse signal
photo: natural sat=-10 con=8 exp=-8
pictured: Field Guide, Poster hero
---

# Hedgerow

A dark page that reads as green, not night: a deep hedge-green ground, cream ink, Prata's sharp high-contrast names over a quiet Manrope, plants photographed close in shade, and one chartreuse that marks the controls and the few lines the page draws. It feels botanical, exact and fresh, like a field guide. It is not black luxury with a gold accent, and not a rustic kraft-paper page.

## Tokens

```css
:root {
  --color-paper: oklch(24% 0.05 165); --color-paper-2: oklch(20% 0.045 165); --color-paper-3: oklch(30% 0.05 165);
  --color-ink: oklch(93% 0.02 85); --color-ink-2: oklch(80% 0.04 160); --color-muted: oklch(68% 0.05 160);
  --color-rule: oklch(36% 0.05 165);
  --color-accent: oklch(86% 0.19 115); --color-accent-2: oklch(91% 0.13 115); --color-accent-ink: oklch(24% 0.05 165); --color-focus: oklch(91% 0.13 115);
  --font-display: "Prata", Georgia, serif; --font-body: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: none;
  --tracking-display: 0;
}
```

One dial, the colourway, stated in the stamp (`hedgerow: hedge`). Line work and controls follow the accent.

| Colourway | Ground | Ink | Accent |
| --- | --- | --- | --- |
| `hedge` (default) | oklch(24% 0.05 165) | cream oklch(93% 0.02 85) | chartreuse oklch(86% 0.19 115) |
| `sloe` | plum oklch(25% 0.06 320) | oklch(94% 0.02 80) | straw oklch(88% 0.15 95) |

## Type

- **Display:** Prata 400, its only weight, so a head never takes a synthesised bold; line-height 1.1, untracked, sentence case, roman. Item titles take Prata too, never under 20px, where its hairlines thin out.
- **Body:** Manrope 400 and 500 at 16 to 17px, line-height 1.55, in `--color-ink-2`; Manrope 700 only on controls.
- **Labels, captions, table heads, tags:** Manrope 500 a step smaller, sentence case, untracked, in `--color-muted`. Figures are Manrope with tabular numerals; IBM Plex Mono only inside code.

## Surfaces

- 1px rules: `--color-rule` between rows and around a well, `--color-muted` on a rule that parts two sections, the accent on the one rule that heads a list.
- Square and flat: radius 0 on wells, photographs and inputs; no shadow, no blur, no gradient but a photograph's scrim. Depth is a paper step, a well in `--color-paper-3` above the ground or a band in `--color-paper-2` below it.
- Bands: a `--color-paper-2` band, or one cream band (`--color-ink` ground, `--color-paper` text) for a dense section, where the controls turn hedge green. Two a page at most.
- Photographs: plants as a forager meets them, close and low-key: one plant at arm's length against leaves in shade, a hedge along a lane, the still, a glass on a dark bench; overcast or late light. Square, a 1px inset ring of cream at 8%, colour kept true, never toned green. A caption names the plant under the frame in the label style; type on a photograph sits only over a hedge-green scrim at 45 to 65%.
- Line work only for a chart or a map of real places, 1.2px chartreuse strokes, unfilled, dots the only fills. No texture anywhere.

## Controls

- The pair: a chartreuse pill in Manrope 700 with `--color-accent-ink` text beside a pill outlined in 1.5px chartreuse with chartreuse text. The primary lightens to `--color-accent-2` on hover.
- Links are cream with a 1px chartreuse underline; inputs are square, a 1px `--color-muted` border on `--color-paper-2`, the focus ring in `--color-focus`.
- Chartreuse sits on the controls, the focus ring, line work, one rule and one figure; the reading stays cream.

## Motion

Still. State only, over `--dur-short` on `--ease-out`: the primary lightens, an underline thickens, a linked row's rule turns chartreuse. No growth, no drift, no scroll reveal.

## Voice

A field guide's: the plant and where it grows, then how far and when, only where the brief knows; never invent a distance or a month. Distances to one decimal. Provenance as a sentence, never a badge.

## Do-nots

- Never a second accent; sold out is muted, not red.
- Never a black or blue-black ground; the dark is green at 24%, or plum on `sloe`.
- Never a bright, high-key photograph: a berry on white seamless or a sunny meadow reads as a hole in the green.
- Never a rounded card or a drop shadow; only the controls are round.
- Never chartreuse running text or a chartreuse band.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Prata&family=Manrope:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: 400; line-height: 1.1; font-synthesis: none; }
.btn { border: 1.5px solid var(--color-accent); border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); font-size: var(--text-sm); font-weight: 700; transition: background-color var(--dur-short) var(--ease-out); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--primary:hover { background: var(--color-accent-2); border-color: var(--color-accent-2); }
.btn--secondary { background: transparent; color: var(--color-accent); }
.well { background: var(--color-paper-3); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); }
.band--cream { background: var(--color-ink); color: var(--color-paper); }
.band--cream .btn { border-color: var(--color-paper); color: var(--color-paper); }
.band--cream .btn--primary { background: var(--color-paper); color: var(--color-ink); }
.photo img { outline: var(--rule-hair) solid color-mix(in oklab, var(--color-ink) 8%, transparent); outline-offset: -1px; }
.scrim { background: linear-gradient(to top, color-mix(in oklab, var(--color-paper) 65%, transparent), transparent 60%); }
a { text-decoration-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 30%, transparent); color: var(--color-ink); }
```
