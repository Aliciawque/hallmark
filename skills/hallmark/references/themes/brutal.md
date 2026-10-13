---
name: Brutal
slug: brutal
genre: editorial
paper: light 98 25
display: grotesk-heavy Libre Franklin
accent: chromatic-yellow 105
posture: committed
keywords: brutalist, raw, bold, high-contrast, statement, agency, design studio, portfolio, streetwear, drop, zine, type-forward, graphic design, poster, festival, collective, no-nonsense, uncompromising
material: near-white paper, near-black ink as 3px rules and solid fills, uppercase Libre Franklin 900 over its 400, zero radius, one acid-yellow fill
photo: duotone ink paper con=24
pictured: Marquee Hero, Poster hero
---

# Brutal

A raw, engineered sheet: near-white paper, near-black ink that arrives as 3px rules and solid fills, Libre Franklin at its blackest in tight capitals, zero radius, and one acid yellow that only ever fills. It reads as uncompromising because the structure is all rule and fill and the photographs print hard in the ink, with nothing soft and nothing added. It is not a dark hacker page, not a decorated zine and not a sticker sheet of offset shadows.

## Tokens

```css
:root {
  --color-paper: oklch(98% 0.005 25); --color-paper-2: oklch(95% 0.005 25); --color-paper-3: oklch(91% 0.005 25);
  --color-ink: oklch(8% 0.005 25); --color-ink-2: oklch(12% 0.005 25); --color-muted: oklch(38% 0.005 25);
  --color-rule: oklch(8% 0.005 25);
  --color-accent: oklch(90% 0.19 105); --color-accent-ink: oklch(8% 0.005 25); --color-focus: oklch(48% 0.1 110);
  --font-display: "Libre Franklin", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: var(--font-display);
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 3px; --shadow-card: none;
  --tracking-display: -0.02em; --display-weight: 900;
}
```

## Type

- **Display:** Libre Franklin 900, uppercase, `--tracking-display`, line-height 1.02 (the floor for capitals that wrap), roman, one weight per head. Section heads take the same setting at the shared `--text-section` step. Uppercase belongs to the heads and the wordmark alone.
- **Body:** Libre Franklin 400, sentence case, in ink; item titles and controls at 700, sentence case. Three weights in all: 400, 700, 900.
- **Labels, captions, table heads:** Libre Franklin 400 a step smaller, sentence case, in `--color-muted`. Figures take `tabular-nums` in the same face; mono appears only inside code.

## Surfaces

- Two rule weights and no others: `--rule-bar` in `--color-rule` boxes a well, a table or a photograph; `--rule-hair` splits rows inside them.
- Zero radius on everything: controls, inputs, wells, tags, photographs.
- Depth is fill and border, never shadow: a surface is bordered paper, an ink fill with paper text, or the one yellow fill under ink, and nothing floats above the paper.
- Bands: an `--color-ink` band with paper text, or a `--color-paper-2` band ruled top and bottom with `--rule-bar`; two a page at most. The yellow never runs as a band.
- Photographs: raw documentary of the thing in use, lit by whatever was there (stage light, flash, a street at night): the crowd from inside it, the room before doors, a wall of posters, hands; never a posed face. They print hard in the ink on the paper (the `photo:` duotone), cropped tight and flush inside a `--rule-bar` frame with no mat, or full-bleed where the page is loudest. Type meets a photograph only on a solid block, ink with paper type or paper with ink type, set flush against the frame; never a scrim.
- No texture, no ornament, no gradient anywhere.

## Controls

- The pair: a `--rule-bar` bordered paper button beside a solid ink button with paper text, Libre Franklin 700 in sentence case; hover inverts either in one frame.
- Links are ink, underlined; hover fills yellow under the ink. Inputs: zero radius, a `--rule-bar` border, ink text on paper.
- The yellow is a fill, never type, a rule or a ring: one filled well, a `mark` in running text, a chosen option, a link's hover. Always under ink, never inside a head or over a photograph, under 5% of a screen. Focus takes the deep olive `--color-focus`, which holds 3:1 on paper, ink and yellow.

## Motion

Nothing glides. State flips in one frame: a surface inverts to ink with paper text, or fills yellow under its ink. No reveal, no bounce, no parallax, no blur transition.

## Voice

Blunt, declarative: capitals in the heads, sentence case everywhere else; verbs and nouns in the trade's own words, no hedging, no hype. Say the thing flat.

## Do-nots

- Never a rounded corner; any radius above zero softens the sheet.
- Never a shadow, blurred or hard-offset; depth is border and fill.
- Never an ornament, a fleuron or a layered offset stack; Brutal is raw, not decorated.
- Never black paper; this is a light sheet with black structure.
- Never a second colour: photographs print in the ink, and the acid yellow only fills, never as type, a rule, a ring or a gradient.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;700;900&display=swap" rel="stylesheet">
```

```css
h1, h2, .display { font-family: var(--font-display); font-weight: var(--display-weight); text-transform: uppercase; letter-spacing: var(--tracking-display); line-height: 1.02; }
h3 { font-family: var(--font-display); font-weight: 700; }
.btn { border: var(--rule-bar) solid var(--color-rule); border-radius: 0; padding: var(--space-xs) var(--space-lg); background: var(--color-paper); color: var(--color-ink); font-weight: 700; transition: none; }
.btn:hover, .btn--ink { background: var(--color-ink); color: var(--color-paper); } .btn--ink:hover { background: var(--color-paper); color: var(--color-ink); }
.well { border: var(--rule-bar) solid var(--color-rule); border-radius: 0; }
.well--ink, .band--ink { background: var(--color-ink); color: var(--color-paper); }
.well--yellow, p mark, a:hover { background: var(--color-accent); color: var(--color-accent-ink); }
.photo { display: block; border: var(--rule-bar) solid var(--color-rule); border-radius: 0; }
.photo-block { background: var(--color-ink); color: var(--color-paper); padding: var(--space-md) var(--space-lg); }
::selection { background: var(--color-accent); color: var(--color-accent-ink); }
```
