---
name: Midnight
slug: midnight
genre: atmospheric
paper: dark 14 264
display: grotesk-sans Mona Sans
accent: cool 230
posture: committed
keywords: render, 3d, animation, vfx, film, video, frames, pipeline, generative, ai tool, model playground, dark mode, nocturnal, late-night, after-hours, overnight, moody, cinematic, cerebral, calm, technical, midnight
material: midnight-blue ground to every edge, cool white ink, Mona Sans expanded at 300 over its normal width, square-cut surfaces in lightness steps, photographs as moonlight, one azure signal
photo: duotone paper ink-2
pictured: Feature Stack, Stage hero
---

# Midnight

A cold, calm night instrument whose blue is the ground itself: deep midnight blue to every edge, cool white ink, Mona Sans at an expanded 300 for the heads like titles on a film, the same family at its normal width for reading, surfaces cut square in steps of lighter blue, and one azure signal. Photographs arrive as moonlight, their shadows in the ground's blue and their highlights in the ink. It is not a neon dark mode, not frosted glass, and not a black page with a blue button.

## Tokens

```css
:root {
  --color-paper: oklch(14% 0.048 264); --color-paper-2: oklch(18.5% 0.052 264); --color-paper-3: oklch(23% 0.055 264);
  --color-ink: oklch(95% 0.016 250); --color-ink-2: oklch(88% 0.05 245); --color-muted: oklch(71% 0.04 256);
  --color-rule: oklch(29% 0.058 264); --color-rule-2: oklch(40% 0.06 262);
  --color-accent: oklch(80% 0.11 230); --color-accent-ink: oklch(16% 0.05 264); --color-focus: oklch(84% 0.12 228);
  --font-display: "Mona Sans", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display); --font-outlier: var(--font-display);
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px;
  --shadow-card: 0 24px 48px -24px oklch(6% 0.04 264 / 0.7);
  --tracking-display: -0.015em; --display-weight: 300; --display-stretch: 125%;
}
```

## Type

- **Display:** Mona Sans 300 at the expanded width (`--display-stretch`) on `h1` and `h2`, `--tracking-display`, line-height 1.04, sentence case, roman. The wide light cut is the voice, calm and cold; a head that runs long steps down to `--text-display-s` rather than closing up. Item titles (`h3`) take Mona Sans 500 at the normal width.
- **Body:** Mona Sans 400 at the normal width, line-height 1.6. One family at two widths: the cold comes from the ground and the ink, never from a second face.
- **Labels, captions, table heads, meta, status:** Mona Sans 500 a step smaller, sentence case, untracked, `--color-muted`.
- **Figures:** tabular Mona Sans wherever numbers compare (frames, hours, pence); no mono anywhere. A figure that is the point may take the display cut at 300.

## Surfaces

- No outlines on surfaces: depth is a step of lightness from paper to paper-2 to paper-3, cut square at radius 0 like a frame. A lifted surface takes `--shadow-card` in the ground's own dark. A 1px `--color-rule` parts rows inside a dense product table and nowhere else.
- Bands: `--color-paper-2` or `--color-paper-3`, two a page at most; never an azure field and never a light band.
- Photographs: low-key pictures of light after dark, architecture at night, a lit window or stairwell, a long corridor, a city seen from above, one subject held still and cropped wide (16:9, 21:9) or tall (4:5). The duotone runs from the paper to the pale moon blue of ink-2, so a frame's shadows are the ground and its light is moonlight; a daylight or high-key picture turns to a pale sheet, so pick night. Frames are square with a 1px inset outline of ink at 8%; text on a photograph sits on its darkest part over a paper scrim at 40 to 65%; a caption beneath, in the label style, gives the hour or the frame.
- No texture, no glass, no blur, no bloom.

## Controls

- The pair: a solid azure rectangle with `--color-accent-ink` text beside a secondary outlined in `--color-rule-2`, both square, Mona Sans 500.
- Links take an azure underline on hover; inputs sit on `--color-paper-2` with a 1px `--color-rule` edge, square.
- The azure stays under 5%: the one primary control, a link's hover, an active nav item, one progress value or one figure. It is never a field, a gradient or a second light.

## Motion

One settle: the hero's text fades from 0.6 to 1 over `--dur-long` on `--ease-out`, once, from an already-visible default. Hover steps a surface one lightness up. A product value changes when its source does; nothing slides, loops or follows the cursor.

## Voice

Cool and spare, the night shift's register: the hour, the count, the cost. Short declaratives; a number always carries its unit or its time. Never hype, never a superlative.

## Do-nots

- Never a warm accent (amber, orange, gold); the light here is cold.
- Never a heavy display weight or a head at the normal width; the expanded 300 is the face.
- Never a lamp: no radial glow, no halo, no lit edge on a card. The light is the ink and the photographs.
- Never a rounded corner or a light section; dark and square end to end.
- Never a photograph in its own colours beside the duotone, and never a daylight scene.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@100,400;100,500;125,300&display=swap" rel="stylesheet">
```

```css
h1, h2 { font-weight: var(--display-weight); font-stretch: var(--display-stretch); line-height: 1.04; }
h3 { font-weight: 500; }
.num, td.num { font-variant-numeric: tabular-nums; }
.well { background: var(--color-paper-2); border-radius: var(--radius-card); }
.well--raised { background: var(--color-paper-3); box-shadow: var(--shadow-card); }
.btn { border: var(--rule-hair) solid transparent; background: none; border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); font-weight: 500; color: var(--color-ink); transition: background-color var(--dur-short) var(--ease-out); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { border-color: var(--color-rule-2); }
.btn--secondary:hover { background: var(--color-paper-2); }
a:hover { text-decoration-color: var(--color-accent); }
.photo { outline: var(--rule-hair) solid color-mix(in oklab, var(--color-ink) 8%, transparent); outline-offset: calc(var(--rule-hair) * -1); }
.settle { animation: settle var(--dur-long) var(--ease-out) both; }
@keyframes settle { from { opacity: 0.6; } }
::selection { background: color-mix(in oklab, var(--color-accent) 30%, transparent); color: var(--color-ink); }
```
