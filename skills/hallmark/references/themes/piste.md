---
name: Piste
slug: piste
genre: playful
paper: light 98.5 260
display: display-condensed Barlow Condensed
accent: cool 265
posture: committed
keywords: ski, mountain, resort, snow, winter, outdoor, sport, trail, lift, race, alpine, tickets, season pass, conditions, weather, club, active, bold
material: snow-white paper, cold near-black ink, Barlow Condensed 800 caps over Barlow, square edges on 2px ink rules, one cobalt for signal and field
photo: natural con=10 vib=15
pictured: Photographic, Ledge hero
---

# Piste

A mountain morning in print: snow-white paper, cold near-black ink, Barlow Condensed 800 in capitals for every head, square edges on 2px ink rules, and one cobalt doing all the colour work, from the primary control to a full field. Photographs bring the mountain in, crisp and in full colour, cut square like everything else, and the paper is the snow they open onto. It reads bold because the type is loud and the colour one cold blue; it is not a lens-flare resort brochure, a sporty gradient or a rounded app.

## Tokens

```css
:root {
  --color-paper: oklch(98.5% 0.005 260); --color-paper-2: oklch(96% 0.005 260); --color-paper-3: oklch(92% 0.006 260);
  --color-ink: oklch(16% 0.01 260); --color-ink-2: oklch(28% 0.012 260); --color-muted: oklch(50% 0.015 260);
  --color-rule: oklch(90% 0.006 260);
  --color-accent: oklch(52% 0.25 265); --color-accent-ink: oklch(98.5% 0.004 260); --color-focus: oklch(58% 0.22 28);
  --color-field: var(--color-accent);
  --font-display: "Barlow Condensed", ui-sans-serif, sans-serif; --font-body: "Barlow", ui-sans-serif, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 2px;
  --shadow-card: none;
  --tracking-display: -0.005em;
}
```

Committed: cobalt is `--color-field` and may fill whole bands; on controls and links it is the signal. Three grounds, stated in the stamp (`piste: snow`).

| Ground | Paper and ink | Cobalt and focus |
| --- | --- | --- |
| `snow` (default) | near-white under near-black | cobalt controls, links and field; red focus |
| `blue-run` | cobalt `oklch(52% 0.25 265)` under white ink; the page is the field | white takes the controls, links and focus |
| `night-piste` | `oklch(14% 0.01 260)` under white ink, 2px white rules | cobalt `oklch(56% 0.25 265)`, red focus `oklch(60% 0.23 28)` |

## Type

- **Display:** Barlow Condensed 800, uppercase, roman, `--tracking-display`; line-height 1.0 on any head that can wrap (55a), 0.92 only on a single line that cannot. Condensed, so it sets one step larger than the shared scale: a section head at `--text-display-s`, the hero head up to 7.25rem. Every head and big figure takes it, figures tabular.
- **Body:** Barlow 400 and 500, 16 to 19px, line-height 1.5.
- **Buttons:** Barlow Condensed 800 in capitals at 16px or more, untracked, following the display (legal under 67 on an uppercase display).
- **Nav links, table heads, captions, meta:** Barlow 500 a step smaller, sentence case, untracked. JetBrains Mono only inside code.

## Surfaces

- Rules: `--rule-bar` ink under a table's head and under the nav, `--rule-hair` in `--color-paper-3` between rows. Tables are ruled, never boxed.
- Radius 0 on everything: wells, photographs, inputs, controls and tags are cut square.
- Depth is flat: no shadow; a raised surface is a paper step or the cobalt field.
- Bands: the cobalt `--color-field` with `--color-accent-ink` text, or `--color-paper-2` for a dense table; two a page at most.
- Photographs: the mountain in daylight and in colour: a group on a slope seen from behind, a line of children after an instructor, a lift against the sky, skis standing in fresh snow; crisp and high-key, snow white and sky blue, never a dusk grade or a flare. Cut square with an inset ink hairline at 8%. Type on a photograph sits on its open snow or sky: ink straight on bright snow at 4.5:1, or paper over a cold ink scrim.
- No texture, no gradient but a photograph's scrim, no blur.

## Controls

- The pair: a cobalt fill with `--color-accent-ink` text beside a 2px inset ink outline, both square, in condensed capitals; on a scrim the outline turns paper.
- Links are ink and underlined, cobalt on hover; inputs square, 48px tall, with a 1px ink border.
- Cobalt sits on the primary, a link's hover, a field band and one figure set outside any head (a figure row, a price); red is the focus ring and nothing else.

## Motion

Still. A control darkens one step on hover over `--dur-micro` on `--ease-out`; nothing draws in, loops or follows the scroll.

## Voice

The morning report: the hour, the group, the run by name, the week booked, called across the snow. Never a slogan about freedom or powder.

## Do-nots

- Never lowercase display or a light condensed; Barlow Condensed at 800.
- Never a rounded corner, a pill or a soft card; everything is cut square.
- Never a second accent hue: cobalt and ink do the work, red is only the focus ring.
- Never cobalt on running text or as a card fill on snow paper.
- Never a sky gradient, a sunset grade, or a drawn mountain, snowflake or piste map.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800&family=Barlow:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: 800; text-transform: uppercase; line-height: 1; }
h2 { font-size: var(--text-display-s); }
.btn { display: inline-flex; align-items: center; min-height: 48px; padding: 0 var(--space-lg); border: 0; font: 800 var(--text-md)/1 var(--font-display); text-transform: uppercase; }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { background: none; box-shadow: inset 0 0 0 var(--rule-bar) var(--color-ink); color: var(--color-ink); }
.band--field { background: var(--color-field); color: var(--color-accent-ink); }
.photo { outline: 1px solid color-mix(in oklab, var(--color-ink) 8%, transparent); outline-offset: -1px; }
.scrim { background: linear-gradient(to top, color-mix(in oklab, var(--color-ink) 60%, transparent), transparent 55%); color: var(--color-paper); }
th { border-bottom: var(--rule-bar) solid var(--color-ink); font: 500 var(--text-sm) var(--font-body); text-align: left; }
td { border-bottom: var(--rule-hair) solid var(--color-paper-3); }
a:hover { text-decoration-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 30%, transparent); }
```
