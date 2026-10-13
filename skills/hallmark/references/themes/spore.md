---
name: Spore
slug: spore
genre: atmospheric
paper: dark 15 60
display: roman-serif Young Serif
accent: warm 30
posture: committed
keywords: grower, mushroom, fungi, farm, food, producer, fermentation, wine, natural wine, wine bar, bottle shop, cellar, preserves, dark, culture, night market, harvest, subscription, small batch
material: coffee-ground black with a warm grain, cream ink, Young Serif over Instrument Sans, soft pills and panels, photographs lit by lamps and candles, one oyster pink
photo: warm con=6 exp=-4
pictured: Photographic, Settled hero
---

# Spore

A cellar at night: coffee-ground black warmed toward brown, a warm grain on its panels, cream Young Serif over a green-cream Instrument Sans, soft pills, photographs lit only by lamps and candles, and one oyster-mushroom pink. It feels close and handmade because the warmth sits in the ground, the grain, the pictures and one soft colour, never in drawn light. It is not a dark-mode template with a glow, nor a wellness label.

## Tokens

```css
:root {
  --color-paper: oklch(15% 0.01 60); --color-paper-2: oklch(19% 0.012 60); --color-paper-3: oklch(24% 0.02 50);
  --color-ink: oklch(93% 0.02 85); --color-ink-2: oklch(88% 0.02 120); --color-muted: oklch(64% 0.02 70);
  --color-rule: oklch(30% 0.015 60);
  --color-accent: oklch(77% 0.09 30); --color-accent-2: oklch(86% 0.06 30); --color-accent-ink: oklch(15% 0.01 60); --color-focus: oklch(86% 0.06 30);
  --font-display: "Young Serif", Georgia, serif; --font-body: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "DM Mono", ui-monospace, monospace;
  --radius-card: 12px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 12px 32px oklch(8% 0.01 60 / 0.35);
  --tracking-display: -0.01em;
  --grain: 0.15; --display-weight: 400;
}
```

One dial, the colourway, stated in the stamp (`spore: cellar`).

| Colourway | Ground | Ink | Accent |
| --- | --- | --- | --- |
| `cellar` (default) | `oklch(15% 0.01 60)`, grain screened at 15% | cream `oklch(93% 0.02 85)` | pink `oklch(77% 0.09 30)` |
| `lab` | cream `oklch(94% 0.02 85)`, grain multiplied at 6% | `oklch(17% 0.015 60)` | pink `oklch(70% 0.12 30)` |
| `head-torch` | `oklch(12% 0.008 60)`, grain at 15% | `oklch(93% 0.03 85)` | ochre `oklch(74% 0.13 80)` |

## Type

- **Display:** Young Serif 400, `--tracking-display`, line-height 1.02, sentence case, roman, one colour per head, never below `--text-title`. Prices and dates are figures in Young Serif.
- **Body:** Instrument Sans 400 and 500, line-height 1.5, in `--color-ink-2`. A second name after a product's (a Latin name, a grape, a vintage) takes Instrument Sans italic, the only italic.
- **Labels, captions, table heads, meta:** Instrument Sans 500 a step smaller, sentence case, `--color-muted`. DM Mono only in code and on figures that compare.

## Surfaces

- 1px `--color-rule` between rows and on divisions; a 1.5px `--color-ink-2` edge on form fields. Nothing else has a border.
- Radii: pills on controls and chips, `--radius-card` on panels, wells and photographs; inputs square.
- Depth is the ground's three steps; `--shadow-card` only under a menu or popover.
- Bands: a `--color-paper-2` or `--color-paper-3` band, or one `--color-ink` band with `--color-paper` type; two a page at most; pink is never a field.
- Photographs: the place after dark, close: bottles on a shelf, a glass on the bar, a pour, a candlelit table, a door lit from inside; low warm light falling into shadow, never flash or daylight. `--radius-card`, a 1px inset ink ring at 8%, no shadow or grain. Captions go beside or under, in the label style; type on a photograph sits on its dark side over a paper scrim at 45 to 65%.
- Grain: the speck grain of `texture.md` § 1, warm and screened at `--grain`, on a band or a well; never under a paragraph or over a photograph.

## Controls

- The pair: a pink-filled pill with `--color-accent-ink` text, lightening to `--color-accent-2` on hover, beside a pill outlined in 1.5px `--color-ink-2`. Chips are pills; the chosen one fills pink.
- Links are cream with an underline that turns pink on hover; inputs are square with the 1.5px edge and the `--color-focus` ring.
- Pink sits on the primary, a chosen chip, a price and the focus ring; status is a sentence in muted.

## Motion

State only, in one frame: a chip selects, a switch changes a price, a pill lightens. Nothing reveals, nothing grows, nothing loops.

## Voice

A maker's log: the name, the day, the weight or the vintage, where it goes. No wellness, no mystique.

## Do-nots

- Never a second hue; a green for "in stock" makes a garden centre.
- Never drawn light as the mood (a beam, a pool, a glow behind a head); the light lives in the photographs.
- Never a neutral or blue-black ground; every dark step tints toward hue 60, or it reads as any dark mode.
- Never pink running text or a pink outline; pink is a fill, a price or the focus.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: 400; letter-spacing: var(--tracking-display); line-height: 1.02; }
.btn { border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); font-weight: 600; transition: background-color var(--dur-micro) var(--ease-out); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--primary:hover { background: var(--color-accent-2); }
.btn--secondary { background: transparent; color: var(--color-ink); box-shadow: inset 0 0 0 1.5px var(--color-ink-2); }
.well { background: var(--color-paper-2); border-radius: var(--radius-card); }
.photo img { outline: var(--rule-hair) solid color-mix(in oklab, var(--color-ink) 8%, transparent); outline-offset: -1px; }
.grained { position: relative; isolation: isolate; }
.grained::after { content: ""; position: absolute; inset: 0; z-index: var(--z-base); border-radius: inherit; pointer-events: none; opacity: var(--grain); mix-blend-mode: screen;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.6 0 0 0 0 0.55 0 0 0 0 0.45 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E"); }
```
