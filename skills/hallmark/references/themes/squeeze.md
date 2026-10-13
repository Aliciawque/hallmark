---
name: Squeeze
slug: squeeze
genre: playful
paper: mid 41 154
display: geometric-sans Gabarito
accent: warm 55
posture: drenched
keywords: fruit, food box, grocer, market, delivery, weekly, seasonal, farm shop, subscription, produce, veg box, cheerful, family, treats, stall, orchard, local, fresh
material: forest-green paper with real chroma, warm white ink, Gabarito 800 heads over Manrope, soft rounded tiles, fruit photographed bright and close, peach controls
photo: natural vib=12 con=4
pictured: Bento Grid, Stage hero
---

# Squeeze

A market stall in colour: a forest-green ground with real chroma, warm white ink, Gabarito's round, heavy heads over a sturdy Manrope, soft tiles one step lighter than the ground, fruit photographed bright and close, peach controls and one warm-white card. It feels cheerful and fresh because the green is the whole surface, the fruit is the colour on it and every weight is sturdy. It is not a neutral grocery template with a green button, and not an organic label in serif and kraft.

## Tokens

```css
:root {
  --color-paper: oklch(41% 0.100 154); --color-paper-2: oklch(47% 0.105 154); --color-paper-3: oklch(34% 0.090 156);
  --color-ink: oklch(99% 0.005 90); --color-ink-2: oklch(94% 0.020 120); --color-muted: oklch(90% 0.030 150); --color-rule: oklch(53% 0.10 154);
  --color-accent: oklch(84% 0.10 55); --color-accent-ink: oklch(30% 0.06 40); --color-focus: oklch(88% 0.14 85);
  --color-card: oklch(97% 0.012 85); --color-card-ink: oklch(24% 0.05 160);
  --font-display: "Gabarito", ui-sans-serif, system-ui, sans-serif; --font-body: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 20px; --radius-pill: 999px; --rule-hair: 1px; --rule-bar: 2px;
  --shadow-card: 0 12px 28px -14px oklch(24% 0.05 160 / 0.45);
  --tracking-display: -0.025em; --display-weight: 800;
}
```

## Type

- **Display:** Gabarito 800, `--tracking-display`, line-height 1.0, sentence case, one colour per head. Round, compact and heavy, so it takes the shared display scale without a cap; never under 700.
- **Body:** Manrope 500, line-height 1.55, in `--color-muted`; links and row titles at 700.
- **Labels, captions, table heads, meta:** Manrope 700 a step smaller, sentence case, untracked. Never mono, never uppercase.
- **Outlier:** IBM Plex Mono only inside code and on figures that compare in a column.

## Surfaces

- Tiles, not cards: a tile is the ground one step lighter (`--color-paper-2`) at `--radius-card`, no border, no shadow; a sunk well takes `--color-paper-3`.
- The one raised surface is the warm-white card (`--color-card` with `--color-card-ink` type) and `--shadow-card`, the page's only shadow, once a page at most, for the thing a visitor pays for; inside it the focus ring takes `--color-card-ink`, since the pale ring fails 3:1 on white.
- Rules at `--rule-bar` in `--color-rule`; only a rule between list rows is `--rule-hair`.
- Bands: the page is green, so a band is the lighter or the deeper green (`--color-paper-2`, `--color-paper-3`); two a page at most, never a white, grey or peach band.
- Photographs: fruit close and in good daylight: a crate from above, a ripe peach in a hand, a bowl on a kitchen table, a box opened on the counter; bright, colourful, the fruit filling the frame. `--radius-card`, no ring and no shadow. Captions under the frame in the label style; type on a photograph sits over a `--color-paper-3` scrim at 45 to 65%.
- No texture: the green is a flat colour.

## Controls

- The control pair: a peach-filled primary with `--color-accent-ink` text beside a 2px ink-outlined secondary, both at a 14px radius, Manrope 700. Tags and chips are pills.
- Links are ink at 700 with an underline that turns peach on hover; inputs take a 2px `--color-rule` border at 14px and the `--color-focus` ring.
- Peach stays on controls: the primary, a chosen chip, a link's hover. Never peach type and never a peach field.

## Motion

Cheerful and quick, state only: a control presses 1px down at `--dur-micro`, a chip fills when chosen, a tile steps one green lighter on hover. No reveal, no parallax, nothing loops.

## Voice

The stall-holder's: the fruit, the farm, the day it comes, what ripe feels like in the hand. Plain and warm, never gourmet.

## Do-nots

- Never a neutral ground. White is for the one card; grey does not exist. The page is green.
- Never a dull or greyed green; the ground keeps its chroma, or it turns to army surplus.
- Never a weight under 500 and never a serif.
- Never a hairline border; a 1px rule lives only between list rows.
- Never a dim or washed-out photograph; the fruit is the brightest thing on the page.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@800&family=Manrope:wght@500;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: var(--display-weight); letter-spacing: var(--tracking-display); }
h1, h2 { line-height: 1; }
.tile { background: var(--color-paper-2); border-radius: var(--radius-card); }
.card { background: var(--color-card); color: var(--color-card-ink); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.btn { border: var(--rule-bar) solid var(--color-ink); border-radius: 14px; padding: var(--space-sm) var(--space-lg); font: 700 var(--text-md)/1.25 var(--font-body); color: var(--color-ink); transition: translate var(--dur-micro) var(--ease-out); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); border-color: var(--color-accent); }
.btn:active { translate: 0 1px; }
.photo img { border-radius: var(--radius-card); }
.scrim { background: linear-gradient(to top, color-mix(in oklab, var(--color-paper-3) 65%, transparent), transparent 60%); }
::selection { background: color-mix(in oklab, var(--color-accent) 45%, transparent); color: var(--color-card-ink); }
```
