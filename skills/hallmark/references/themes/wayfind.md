---
name: Wayfind
slug: wayfind
genre: modern-minimal
paper: light 95 250
display: mono Chivo Mono
accent: cool 264
posture: committed
keywords: transit, metro, rail, station, wayfinding, departures, timetable, live, map, commute, city, platform, signage, logistics, status, operations, schedule, mobility, travel, trip, journey, itinerary, booking, flights, airport
material: cool grey paper, blue-black ink, Chivo Mono throughout, square 2px ink borders, cobalt for what is live, amber for figures
photo: natural sat=-12 con=10 sharp=8
pictured: Split Studio, Stage hero
---

# Wayfind

Public signage set as a page: cool grey paper, blue-black ink, every glyph in Chivo Mono (a sober grotesk cut to the fixed cell of a departure board), square 2px ink borders, cobalt for what is live and amber for figures. The mono is the board's face and the borders mark the way. It reads in daylight and at a glance; it is not a developer tool, not a dark terminal and not a retro departures pastiche.

## Tokens

```css
:root {
  --color-paper: oklch(95% 0.005 250); --color-paper-2: oklch(91% 0.008 250); --color-paper-3: oklch(99.5% 0.005 250);
  --color-ink: oklch(15% 0.01 260); --color-ink-2: oklch(28% 0.012 260); --color-muted: oklch(48% 0.015 260);
  --color-rule: oklch(82% 0.01 250);
  --color-accent: oklch(52% 0.22 264); --color-accent-2: oklch(80% 0.16 85); --color-accent-ink: oklch(99.5% 0.003 250); --color-focus: oklch(52% 0.22 264);
  --font-display: "Chivo Mono", ui-monospace, monospace; --font-body: var(--font-display); --font-outlier: var(--font-body);
  --radius-card: 0; --radius-pill: 999px; --rule-hair: 1px; --rule-bar: 2px;
  --shadow-card: 0 24px 40px -24px oklch(8% 0.01 260 / 0.6);
  --tracking-display: -0.02em;
}
```

Three colourways, set once per page and stated in the stamp (`wayfind: platform`).

| Colourway | Paper, ink, rule |
| --- | --- |
| `platform` (default) | the block above |
| `night` | paper `oklch(14% 0.01 260)`, ink `oklch(96% 0.005 250)`, rule `oklch(30% 0.012 260)`, cobalt lifts to `oklch(60% 0.2 264)` |
| `signal` | paper `oklch(52% 0.22 264)` cobalt, ink white, rule `oklch(75% 0.12 264)`; the cobalt button becomes the ink one |

## Type

- **Display:** Chivo Mono 800, `--tracking-display`, line-height 1, sentence case. A mono line runs wide, so `h1` caps at 4.5rem; section heads take the shared step.
- **Body:** Chivo Mono 400, line-height 1.55, `tabular-nums` on everything. Mono is the material here, gate 64 waived: it is the board's face, so the whole page is set in it. Three weights: 400, 500 and 800.
- **Labels, table heads, pills, buttons:** Chivo Mono 500 a step smaller (buttons 800), sentence case, untracked; the signage reads through the mono and the borders, never through capitals. Status and time columns take 800.

## Surfaces

- Rules: `--rule-bar` ink borders on every surface (cards, wells, buttons, the underside of a nav, a table's head rule); row dividers are `--rule-hair` in `--color-rule`.
- Radius 0 everywhere except pills.
- Depth: borders, not shadows. `--shadow-card` sits only under a surface that floats over another, such as a menu or a popover.
- Bands: a `--color-paper-2` band, an `--color-ink` band with paper text where figures turn amber, or one cobalt field in the `signal` colours; two bands a page at most.
- Photographs: the network at a commuter's eye level: platforms, tiled walls, a train pulling in, stairs up to daylight, an exit sign; station light or sharp daylight, people only from behind and moving. Square, inside the `--rule-bar` ink border, no shadow. A phone screen built from the product takes its own portrait frame (9:19.5) in that border, never a drawn bezel. Type never sits on the image: it rides a square ink or paper plate inside the frame, bordered like a sign; captions under the frame name the station or the line.
- No texture, and no gradient.

## Controls

- A cobalt-filled button beside a transparent one with a `--rule-bar` ink border, both square, Chivo Mono 800, sentence case.
- Links are ink, underlined, and turn cobalt on hover; inputs are square with a `--rule-bar` ink border on `--color-paper-3`.
- Cobalt is for what is live (an open lift, the current stop, a clock); amber colours figures (exits, minutes, platforms) only on an ink surface or as a fill under ink text. Pills carry no dot; one cobalt dot may mark data that is live.

## Motion

Departure-board stiff: `--dur-micro` colour changes, rows updating in place, no reveal on scroll. A live dot blinks once in `steps(1)` when a row updates; it never loops.

## Voice

Signage: the platform, the exit, the minute, the carriage. Imperative and short.

## Do-nots

- Never a proportional face anywhere, not even for prose.
- Never amber as a text colour on the paper; it belongs on ink or under ink text.
- Never a dot before every pill or label; one live dot, on live data.
- Never rounded cards or soft grey shadows on cards; Wayfind is bordered.
- Never a drawn platform, train or carriage row standing in for the place; photograph the station, build the screen.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@400;500;800&display=swap" rel="stylesheet">
```

```css
body { font-variant-numeric: tabular-nums; }
h1, h2, h3 { font-weight: 800; line-height: 1; }
h1 { font-size: min(var(--text-display), 4.5rem); }
small, th, figcaption { font-weight: 500; color: var(--color-muted); }
.btn { display: inline-flex; align-items: center; gap: var(--space-xs); padding: var(--space-md) var(--space-lg); border: var(--rule-bar) solid currentColor; font: 800 var(--text-sm)/1 var(--font-body); color: inherit; transition: background-color var(--dur-micro) steps(1); }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
.well { border: var(--rule-bar) solid var(--color-ink); background: var(--color-paper-3); }
.band--ink { background: var(--color-ink); color: var(--color-paper); }
.band--ink .figure { color: var(--color-accent-2); }
th { border-bottom: var(--rule-bar) solid var(--color-ink); } td { border-bottom: var(--rule-hair) solid var(--color-rule); }
::selection { background: var(--color-accent-2); color: var(--color-ink); }
```
