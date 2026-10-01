---
name: Darkroom
slug: darkroom
genre: atmospheric
paper: dark 9 30
display: display-condensed Barlow Condensed
accent: warm 32
posture: restrained
keywords: photographer, photography, film, analogue, darkroom, prints, portfolio, exhibition, gallery, edition, commission, cinematographer, negative, archive, monochrome, lab, moody, black and white, night, print shop
material: near-black ground with a fine grain, hairline condensed capitals, a safelight red, sprocket-holed strips of numbered frames, a grease-pencil ring and a greyscale step wedge
signature: the sprocket-holed strip of numbered frames, one of them ringed in grease pencil
---

# Darkroom

A near-black ground under a fine grain, Barlow Condensed 200 capitals, pictures held in numbered frames on a sprocket-holed strip, one safelight red used as a grease-pencil ring, six greys as a step wedge. The signature is the strip of numbered frames with one ringed in grease pencil.

## Tokens

```css
:root {
  --color-paper: oklch(9% 0.005 30); --color-paper-2: oklch(13% 0.005 30); --color-paper-3: oklch(17% 0.005 30);
  --color-ink: oklch(94% 0.006 60); --color-ink-2: oklch(84% 0.006 60); --color-muted: oklch(62% 0.008 50);
  --color-rule: oklch(24% 0.006 30);
  --color-accent: oklch(62% 0.19 32); --color-accent-deep: oklch(44% 0.16 32); --color-accent-ink: oklch(9% 0.005 30); --color-focus: oklch(62% 0.19 32);
  --g0: oklch(10% 0.006 260); --g1: oklch(24% 0.008 260); --g2: oklch(48% 0.008 260); --g3: oklch(66% 0.008 260); --g4: oklch(84% 0.006 260); --g5: oklch(96% 0.005 260);
  --font-display: "Barlow Condensed", ui-sans-serif, sans-serif; --font-body: "Barlow", ui-sans-serif, sans-serif;
  --font-outlier: "Overpass Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.005em; --grain: 0.3;
}
```

Three colourways, stated in the stamp (`darkroom: safelight`).

| Colourway | Ground, ink, signal |
| --- | --- |
| **safelight** (default) | the tokens above |
| **fibre paper** | ground `oklch(95% 0.01 80)`, ink `oklch(14% 0.006 40)`, muted `oklch(46% 0.01 50)`, signal `oklch(50% 0.2 30)`, rule `oklch(80% 0.014 70)`; grain at 0.16 |
| **amber** | ground `oklch(14% 0.02 255)`, ink `oklch(93% 0.012 80)`, muted `oklch(64% 0.02 250)`, signal amber `oklch(78% 0.16 70)`, rule `oklch(28% 0.022 255)`; grain at 0.28 |

## Faces

- **Display:** Barlow Condensed 200 uppercase, line-height 0.9, `--tracking-display`, roman, one weight per head. The hairline at poster size is the look and it is never bolded.
- **Body:** Barlow 300 for prose, 400 under 16px, roman throughout. Controls are Barlow Condensed 500 uppercase at 15px, tracked 0.04em, following the display's capitals.
- **Labels, captions, table heads, meta:** Barlow 400 one step smaller, sentence case. Overpass Mono is the edge print: the frame number over a frame, exposure figures (stop, seconds, grade), negative and edition numbers, and code.

## Material

- Grain once, fixed, over the whole page at `--grain` with overlay (texture.md § 1). No vignette, no bloom, no red wash; depth is lightness, ground 9, plate 13, surface 17.
- The strip: a plate with two rows of 7px light rectangles on a 17px pitch as sprocket holes, top and bottom, and numbered frames between; a frame is a 1px `--color-rule` box, its number above in edge print.
- The grease-pencil ring: a 2.5px accent border with an uneven radius (`48% 52% 50% 50% / 55% 45% 55% 45%`) at -3°, around the chosen frame, figure or word; one per screen.
- The step wedge: six equal cells from `--g0` to `--g5`, the divider between sections and the base of every placeholder.
- The control pair: a 1px ink-outlined secondary beside an accent-filled primary with ground-coloured text, uppercase, radius 0.
- Objects: the strip, the ring, the mounted print (a picture on an ink-coloured sheet with 10px of margin). A stamp carries a fact, a date or a frame number, or does not appear.

## Motion

Still as a print. A frame may come up from `--g1` to full over 600ms once; the ring is drawn, never animated; hover moves a frame's number to the accent.

## Voice

Lab notes: the roll, the frame, the grade, the minute. Exact numbers, short lines.

## Do-nots

- Never a red wash, a red band or a red glow; the safelight is a line, a ring and a stamp.
- Never Barlow Condensed at 500 or heavier for a whole head; the hairline is the head.
- Never sepia, duotone or a colour tint on a picture; prints are greyscale and the wedge says so.
- Never a rounded card or a shadow on the dark colourways; only the fibre-paper sheet mounts.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@200;500&family=Barlow:wght@300;400&family=Overpass+Mono:wght@400;600&display=swap" rel="stylesheet">
```

```css
.display { font-family: var(--font-display); font-weight: 200; text-transform: uppercase; line-height: 0.9; letter-spacing: var(--tracking-display); }
.strip { --hole: linear-gradient(90deg, oklch(94% 0.006 60 / 0.5) 0 7px, transparent 7px); border-bottom: 1px solid var(--color-rule);
  background: var(--hole) 9px 7px / 17px 5px repeat-x, var(--hole) 9px calc(100% - 12px) / 17px 5px repeat-x var(--color-paper-2); }
.frame { border: 1px solid var(--color-rule); background: var(--color-paper); }
.ring { position: relative; }
.ring::after { content: ""; position: absolute; inset: -7px -10px; border: 2.5px solid var(--color-accent); border-radius: 48% 52% 50% 50% / 55% 45% 55% 45%; transform: rotate(-3deg); pointer-events: none; }
.btn { font-family: var(--font-display); font-weight: 500; font-size: 15px; letter-spacing: 0.04em; text-transform: uppercase; padding: 12px 20px; border: 1px solid var(--color-ink); color: var(--color-ink); background: transparent; }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
::selection { background: oklch(62% 0.19 32 / 0.35); }
```
