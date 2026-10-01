---
name: Overprint
slug: overprint
genre: playful
paper: light 93 85
display: grotesk-heavy Archivo Black
accent: chromatic-magenta 5
posture: full-palette
keywords: venue, gigs, festival, music, label, print studio, bar, club, poster, tickets, events, nightlife, two-colour, punk, zine, loud, listings, door
material: warm newsprint stock, a shouted grotesk, two flat inks that miss each other by four pixels, tickets and stamps
signature: a headline in one ink with a second copy of one word printed in the other ink four pixels out of register
---

# Overprint

Newsprint stock, Archivo Black in caps, a pink pass and a blue pass that miss each other by four pixels on one hero word, and a third colour that exists only where the two overlap. Lists are ruled, tickets are perforated, stamps sit on a slant.

## Tokens

```css
:root {
  --color-paper: oklch(93% 0.02 85); --color-paper-2: oklch(90% 0.025 85); --color-paper-3: oklch(86% 0.03 85);
  --color-ink: oklch(18% 0.006 60); --color-ink-2: oklch(30% 0.008 60); --color-muted: oklch(45% 0.01 60);
  --color-rule: oklch(80% 0.025 85);
  --color-accent: oklch(66% 0.22 5); --color-accent-ink: oklch(18% 0.006 60); --color-focus: oklch(45% 0.22 270);
  --color-accent-2: oklch(45% 0.22 270); --color-accent-2-ink: oklch(96% 0.01 85);
  --color-mix: oklch(28% 0.13 300);
  --blend: multiply; --mis: 4px; --texture-opacity: 0.07;
  --font-display: "Archivo Black", ui-sans-serif, sans-serif; --font-body: "Archivo", ui-sans-serif, sans-serif;
  --font-outlier: "Archivo Narrow", ui-sans-serif, sans-serif;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 3px;
  --shadow-card: none;
  --tracking-display: -0.01em;
}
```

Pass 1 (pink) takes sold-out, the main button and the echo; pass 2 (blue) takes free, the days and the headline; the overlap is a role nobody paints. Three stocks, stated in the stamp (`overprint: newsprint`).

| Stock | Paper and ink | The two passes |
| --- | --- | --- |
| **Newsprint** (default) | `oklch(93% 0.02 85)` under near-black, multiply | pink `oklch(66% 0.22 5)` and blue `oklch(45% 0.22 270)` |
| **Kraft** | brown `oklch(79% 0.055 75)` under `oklch(22% 0.02 60)`, multiply, grain 0.09 | orange `oklch(70% 0.21 45)` and teal `oklch(40% 0.12 200)`; teal sets display type only |
| **Black stock** | `oklch(20% 0.01 280)` under `oklch(95% 0.01 90)`; the blend flips to screen so the overlap goes pale; grain 0.12 | yellow `oklch(88% 0.17 95)` and aqua `oklch(78% 0.13 200)` |

## Faces

- **Display:** Archivo Black 400, uppercase, line-height 0.96, `--tracking-display`, from 46px for a section head to 190px for a door time; figures and prices too.
- **Body:** Archivo 400 to 600, 16 to 17px, line-height 1.5.
- **Small print:** Archivo Narrow 600 at 12 to 13px, sentence case, untracked, for days, hours, table heads and the stub, the theme's outlier. Captions and meta are Archivo. No mono anywhere.

## Material

- Two passes: everything coloured is pass 1 or pass 2 and blends with `--blend` where it crosses the other; a third colour only ever comes from an overlap.
- Misregistration (`texture.md` § Misregistration): one word in the hero head carries a second copy in pass 1, offset `--mis` right and three quarters of it down, blended (the signature; stamp `waive 38iii`); never the whole line, never a second head. Grain (§ Grain) sits over the stock at `--texture-opacity`.
- Rules `--rule-bar` ink across the top of a list or a nav, `--rule-hair` in `--color-rule` between rows.
- A ticket carries a 2px dashed perforation and is the only container. Stamps are one-ink bordered rectangles with an inner hairline, turned 1 to 4 degrees; a stamp carries a fact, a date or a frame number, or does not appear.
- No radius, no shadow, no gradient. The control pair: a pass-1 fill in Narrow capitals, tracked 0.04em under the shouted display, beside a 2px inset ink outline.

## Motion

The press does not animate. The echo slides into register on hover (350ms), a bill swaps its date on click, a door clock ticks once a second. Nothing reveals, floats or loops.

## Voice

The bill on the wall: the room, the door time, the price, sold out or free.

## Do-nots

- Never a third ink; a green button is a different press.
- Never in register; if every headline lines up it is a laser printer.
- Never a gradient, a shadow or a rounded corner; flat ink on cut stock.
- Never a photograph; discs, bars, type and the overlap are the pictures.
- Never lowercase display; the heavy grotesk is shouted.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600&family=Archivo+Narrow:wght@600&display=swap" rel="stylesheet">
```

```css
.display { font: 400 var(--text-display)/0.96 var(--font-display); text-transform: uppercase; letter-spacing: var(--tracking-display); color: var(--color-accent-2); }
.reg { position: relative; display: inline-block; white-space: nowrap; }
.reg::after { content: attr(data-text); position: absolute; left: var(--mis); top: calc(var(--mis) * 0.75); color: var(--color-accent); mix-blend-mode: var(--blend); pointer-events: none; transition: translate 350ms var(--ease-out); }
a:hover .reg::after { translate: calc(var(--mis) * -1) calc(var(--mis) * -0.75); }
.small { font: 600 12.5px var(--font-outlier); color: var(--color-muted); }
.btn { padding: 16px 28px; font: 600 14px var(--font-outlier); letter-spacing: 0.04em; text-transform: uppercase; }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { box-shadow: inset 0 0 0 2px var(--color-ink); color: var(--color-ink); }
.list { border-top: var(--rule-bar) solid var(--color-ink); } .list > li { border-bottom: var(--rule-hair) solid var(--color-rule); }
.stamp { display: inline-block; border: 2px solid var(--color-ink); outline: 1px solid var(--color-ink); outline-offset: -5px; padding: 6px 12px; rotate: -2deg; }
::selection { background: oklch(66% 0.22 5 / 0.35); }
```
