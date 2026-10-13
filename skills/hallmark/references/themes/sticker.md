---
name: Sticker
slug: sticker
genre: playful
paper: light 95.7 82
display: display-heavy Bowlby One SC
accent: chromatic-magenta 2
posture: full-palette
keywords: stickers, print, merch, shop, maker, creator, diy, craft, vinyl, packaging, labels, small business, ecommerce, fun, loud, pink, cut, ship, order
material: warm off-white paper, warm black ink, Bowlby One SC over Sofia Sans, white die-cut borders on hard offset shadows, hot pink and lime fills
photo: natural vib=15 con=5
pictured: Price List, Settled hero
---

# Sticker

A print shop's material: a warm off-white sheet, warm black ink, Bowlby One SC capitals over a Sofia Sans body, hot pink and lime fills, and every raised surface edged in a thick white die-cut border on a hard offset shadow. It feels loud and handmade because the depth is printed, a shadow with no blur, and the colours are fills, never tints; photographs come bright and close, in the same white edge. It is not a soft pastel shop with blurred shadows, and not a cartoon toy page.

## Tokens

```css
:root {
  --color-paper: oklch(95.7% 0.013 82); --color-paper-2: oklch(92.8% 0.021 79); --color-paper-3: oklch(99.4% 0.007 89);
  --color-ink: oklch(21% 0.011 81); --color-ink-2: oklch(30% 0.013 78); --color-muted: oklch(50% 0.017 64);
  --color-rule: oklch(89.7% 0.02 80); --color-white: oklch(99.5% 0.003 82);
  --color-accent: oklch(56% 0.225 2); --color-accent-2: oklch(87.6% 0.179 119); --color-slot: oklch(95% 0.021 355);
  --color-accent-ink: oklch(99.5% 0.003 82); --color-focus: oklch(56% 0.225 2);
  --font-display: "Bowlby One SC", "Arial Black", sans-serif; --font-body: "Sofia Sans", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 18px; --radius-pill: 999px; --rule-hair: 1px; --rule-bar: 2px;
  --shadow-card: 5px 6px 0 var(--color-ink);
  --tracking-display: 0.005em;
}
```

Two colourways, stated in the stamp (`sticker: sheet`).

| Colourway | Paper, ink, fills |
| --- | --- |
| `sheet` (default) | the block above |
| `vinyl` | ground `oklch(21% 0.011 81)`, cards `oklch(25.5% 0.013 72)`, ink `oklch(95.7% 0.013 82)`, rule `oklch(33% 0.016 75)`; pink and lime unchanged, the borders still white |

## Type

- **Display:** Bowlby One SC 400, capitals only by design, `--tracking-display`, line-height 1.02. It is wide and heavy, so the `h1` caps at 4rem; prices may set in it at `--text-3xl`. Never a paragraph.
- **Body:** Sofia Sans 400 and 600, line-height 1.5, `tabular-nums`.
- **Labels, tags, captions, table heads:** Sofia Sans 700 a step smaller, sentence case, untracked, `--color-muted`. Mono only inside code.

## Surfaces

- The die-cut: a raised surface (a card, a tag, a photograph, the primary control) carries a 6px `--color-white` border and `--shadow-card`, a hard offset with no blur. Surfaces that are the sheet itself (tiles, a table) stay borderless, with a whisper of `--color-rule` at `--rule-hair`.
- A raised surface may tilt between -6 and 6 degrees, never all one way; text blocks, tables and inputs stay square.
- Radii: `--radius-card` on cards, 22px on photographs, pills on controls and tags; a `--rule-bar` dashed `--color-rule` is the divider and the edge of a drop zone.
- Bands: a `--color-paper-2` band, a `--color-ink` band with paper type, or one lime field with ink type; two a page at most.
- Photographs: things in use or held up to the lens, close, the subject lit and filling the frame, flat-lay or three-quarter, colour kept loud, never washed out or moodily graded. 22px radius inside the white die-cut on `--shadow-card`; one a screen may tilt, 3 degrees or less. A tag may overlap a frame's corner with a fact, never the subject; type never sits on a picture.
- No texture, no gradient behind type: depth is the hard offset alone.

## Controls

- The control pair: a pink pill with a 5px white ring and `--shadow-card`, beside a ghost pill with an inset 2px ink border. Chips are pills with a 2px inset rule, the chosen one ink-filled.
- Links are ink with a pink underline on hover; inputs take the ghost pill's 2px ink edge at `--radius-card`.
- Colour in thirds: pink for the fills that act (the primary, a price), lime for the fills that mark (a tag, a count, a highlight), ink for the type.

## Motion

Sticker physics: a hover lifts a clickable raised surface 2px and turns it a degree further; a press pushes it onto its shadow (translate by the offset, shadow to 1px). `--dur-micro` on `--ease-out`, nothing on scroll.

## Voice

Cheerful and exact: the price, the quantity, the size, the ship day. It sounds like the person at the cutter.

## Do-nots

- Never a soft blurred drop under a raised surface; the shadow is a hard offset or there is no shadow.
- Never a die-cut border thinner than 4px, or in any colour but white.
- Never Bowlby at body size, in a table or on a label; it is for heads and prices.
- Never pink text on the paper; pink is a fill with white on it.
- Never a drawn sticker, mascot or doodle; the die-cut edges a real surface or photograph, never a shape drawn to stand for a design.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=Sofia+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: 400; letter-spacing: var(--tracking-display); line-height: 1.02; }
h1 { font-size: min(var(--text-display), 4rem); }
.diecut { border: 6px solid var(--color-white); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.diecut--photo { border-radius: 22px; overflow: hidden; background: var(--color-slot); }
.btn { display: inline-flex; align-items: center; height: 52px; padding: 0 var(--space-lg); border-radius: var(--radius-pill); font-weight: 700; font-size: var(--text-md); color: var(--color-ink); box-shadow: inset 0 0 0 2px var(--color-ink); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); box-shadow: 0 0 0 5px var(--color-white), 5px 6px 0 var(--color-ink); transition: translate var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out); }
.btn--primary:active { translate: 4px 5px; box-shadow: 0 0 0 5px var(--color-white), 1px 1px 0 var(--color-ink); }
.well { background: var(--color-paper-2); border-radius: var(--radius-card); }
.rule { border-top: var(--rule-bar) dashed var(--color-rule); }
::selection { background: var(--color-accent-2); color: var(--color-ink); }
```
