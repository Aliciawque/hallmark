---
name: Canvas
slug: canvas
genre: playful
paper: light 99.5 90
display: grotesk-sans Instrument Sans
accent: chromatic-yellow 92
posture: full-palette
keywords: family, household, meal planning, planner, week, kids, home, shared, chores, recipes, shopping list, calendar, education, school, playful, fridge, pastel, sticker
material: a white fridge door, three pastels (butter, sky, blush) each inside a 1.5px ink border, Instrument Sans 700, panes and stickers
signature: a pane with a pastel head band, and a die-cut sticker with a white ring outside its ink border
---

# Canvas

A white fridge door, three pastels (butter, sky, blush) each inside a 1.5px ink border, Instrument Sans 700 heads, panes and stickers. The signature is a pane with a pastel head band beside a die-cut sticker with a white ring outside its ink border.

## Tokens

```css
:root {
  --color-paper: oklch(99.5% 0.005 90); --color-paper-2: oklch(97.5% 0.005 90); --color-paper-3: oklch(94% 0.006 90);
  --color-ink: oklch(22% 0.006 260); --color-ink-2: oklch(34% 0.008 260); --color-muted: oklch(48% 0.008 260);
  --color-rule: oklch(90% 0.005 260);
  --color-accent: oklch(94% 0.10 92); --color-accent-ink: oklch(22% 0.006 260); --color-focus: oklch(60% 0.12 250);
  --color-sky: oklch(88% 0.07 250); --color-blush: oklch(88% 0.07 20);
  --color-person-1: oklch(70% 0.14 40); --color-person-2: oklch(60% 0.12 250); --color-person-3: oklch(65% 0.12 150);
  --font-display: "Instrument Sans", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 16px; --radius-pill: 999px; --rule-hair: 1px; --border-ink: 1.5px;
  --shadow-card: none;
  --tracking-display: -0.035em; --display-weight: 700;
}
```

Three colourways, stated in the stamp (`canvas: white`); the pastel that becomes the ground goes near-white.

| Colourway | Ground | Highlight |
| --- | --- | --- |
| `white` (default) | the block above | butter |
| `sky` | `oklch(89% 0.065 250)`, ink `oklch(26% 0.06 260)`, rules `oklch(80% 0.07 250)` | butter; sky itself goes to `oklch(96% 0.02 250)` |
| `butter` | `oklch(94% 0.10 92)`, ink `oklch(24% 0.02 80)`, rules `oklch(84% 0.10 90)` | sky; butter itself goes to `oklch(98% 0.02 92)` |

## Faces

- **Display:** Instrument Sans 700, `--tracking-display`, line-height 1.02, up to 4.25rem. Heads are plain ink, one weight and one colour; the butter goes on a pane's band and a sticker, never on a word in a head.
- **Body:** Instrument Sans 400 at 15 to 16px, line-height 1.55, in `--color-muted`; chips, stickers and links at 600.
- **Labels, captions, meta:** Instrument Sans 600 one step smaller, sentence case, untracked. Never mono, never uppercase.
- **Outlier:** IBM Plex Mono only inside code and on figures that compare (list quantities, a timer's tabular digits).

## Material

- The ink border: 1.5px of `--color-ink` around every block, pane, chip, sticker, tile, button, checkbox and person dot. A pastel rectangle without it is a tint, not a thing.
- The pane: a 16px rounded box with a pastel head band carrying a name on the left and a count or a time on the right, nothing else on the band. Days, steps, cupboard items and leftovers are panes. A labelled card, never a drawn window.
- The sticker: a pill with a die-cut edge, a 3px white ring and a hairline ring outside the ink border, a small bordered pastel dot inside. Ingredients, tags and a sticker strip; the strip may tilt each sticker one to three degrees.
- The meal chip: a 10px rounded pastel box with the cook's dot, draggable, and the only thing with a shadow, only while dragged.
- People are three saturated dots with a white initial, the only saturated colours on the page. The control pair is an ink-filled primary beside an ink-bordered transparent secondary, both at 12px.
- Radii: 10 chips, 12 buttons, 14 tiles, 16 panes, 999 stickers. No texture.

## Motion

Handled, not animated. Meals drag between days with native drag and drop and the target day goes butter with a dashed border; stickers pick on tap; a list ticks; a timer ring counts down a second at a time. No reveals, no parallax, no autoplay.

## Voice

The note on the fridge: who is cooking, what is left, what to buy. Short, domestic, a little dry.

## Do-nots

- Never a fourth pastel; butter, sky, blush, and a mint or a lilac makes it a nursery.
- Never a saturated accent; the people's dots are the only saturated colours.
- Never a borderless block, and never a shadow at rest.
- Never a photograph of food; meals are words on chips and ingredients are stickers.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
.display { font: 700 var(--text-display)/1.02 var(--font-display); letter-spacing: var(--tracking-display); }
.pane { border: var(--border-ink) solid var(--color-ink); border-radius: var(--radius-card); background: var(--color-paper-2); overflow: hidden; }
.pane .band { display: flex; justify-content: space-between; padding: 9px 14px; border-bottom: var(--border-ink) solid var(--color-ink); font-size: 12.5px; font-weight: 600; }
.band--butter { background: var(--color-accent); } .band--sky { background: var(--color-sky); } .band--blush { background: var(--color-blush); }
.sticker { display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px 7px 9px; border-radius: var(--radius-pill); border: var(--border-ink) solid var(--color-ink);
  background: var(--color-paper-2); font-weight: 600; box-shadow: 0 0 0 3px var(--color-paper), 0 0 0 4.5px var(--color-rule); }
.btn { border-radius: 12px; padding: 0.7rem 1.125rem; font-weight: 600; border: var(--border-ink) solid var(--color-ink); background: transparent; }
.btn--primary { background: var(--color-ink); color: var(--color-paper); }
::selection { background: var(--color-accent); color: var(--color-accent-ink); }
```
