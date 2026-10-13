---
name: Darkroom
slug: darkroom
genre: atmospheric
paper: dark 9 30
display: display-condensed Sofia Sans Extra Condensed
accent: chromatic-amber 62
posture: restrained
keywords: photographer, photography, film, analogue, darkroom, prints, portfolio, exhibition, gallery, edition, commission, cinematographer, negative, archive, monochrome, lab, moody, black and white, night, print shop, travel, places, landscape, portrait, photo studio
material: near-black ground, a fine light grain, warm pale ink, hairline Sofia Sans Extra Condensed capitals over Barlow, zero radius, black-and-white photographs printed deep and large, one amber safelight
photo: mono high=-20 shad=-12
pictured: Photographic, Poster hero
---

# Darkroom

A print room with the lights off: a near-black ground, a fine grain on its wells, hairline extra-condensed capitals over Barlow and one amber safelight. Photographs lead, black and white, printed deep and large. The only colour is the safelight; everything else is a grey a print could hold. It is not a film-strip costume, not a moody gradient and not a white-matted gallery.

## Tokens

```css
:root {
  --color-paper: oklch(9% 0.005 30); --color-paper-2: oklch(13% 0.005 30); --color-paper-3: oklch(17% 0.005 30);
  --color-ink: oklch(94% 0.006 60); --color-ink-2: oklch(84% 0.006 60); --color-muted: oklch(64% 0.008 50);
  --color-rule: oklch(26% 0.006 30);
  --color-accent: oklch(74% 0.16 62); --color-accent-deep: oklch(50% 0.11 60); --color-accent-ink: oklch(9% 0.005 30); --color-focus: oklch(74% 0.16 62);
  --font-display: "Sofia Sans Extra Condensed", ui-sans-serif, sans-serif; --font-body: "Barlow", ui-sans-serif, sans-serif;
  --font-outlier: var(--font-body);
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.005em; --grain: 0.08;
}
```

Three colourways, stated in the stamp (`darkroom: amber`).

| Colourway | Ground, ink, signal |
| --- | --- |
| **amber** (default) | the tokens above |
| **red** | signal `oklch(62% 0.19 32)`, deep `oklch(44% 0.16 32)` |
| **fibre paper** | ground `oklch(95% 0.01 80)`, ink `oklch(14% 0.006 40)`, muted `oklch(46% 0.01 50)`, signal `oklch(50% 0.2 30)`, rule `oklch(80% 0.014 70)`; dark specks at 0.12 |

## Type

- **Display:** Sofia Sans Extra Condensed in capitals, 200 on the hero and section heads and 400 on an item title, line-height 1.0, `--tracking-display`, roman. The hairline at scale is the look, never bolded; extra-condensed, a head may set one step above the shared scale.
- **Body:** Barlow 300 for prose, 400 under 16px.
- **Labels, captions, table heads:** Barlow 400 a step smaller, sentence case, in `--color-muted`; a plate number and a date are this voice. Figures take Barlow's tabular figures; no mono.

## Surfaces

- Depth is lightness, never light: ground 9, well 13, surface 17. No vignette, no bloom, no shadow.
- Rules: 1px `--color-rule` between rows and around inputs; radius 0 everywhere.
- Bands: a `--color-paper-2` or `--color-paper-3` band, never an amber field; two a page at most.
- Photographs: the work, and they lead. Black and white, printed deep (open highlights, full blacks, the film's grain); a subject at a distance with room around it (water, a bank, a bridge, a small figure) or close and flat (mud, reeds, a hand at a tray). Mono on the CDN (the `photo:` line), `grayscale(1)` on the user's own. Radius 0, no frame, no mat, no shadow; full-bleed or held to the columns, never thumbnail size. A caption beneath carries the plate number and a fact; type crosses a photograph only over its darkest third, on a scrim of the ground at 40 to 60%.
- Texture: the speck grain of `texture.md` § 1, light specks at `--grain`, on a band or a well; never over a photograph or under running text.

## Controls

- The pair: a 1px ink-outlined secondary beside an amber-filled primary in `--color-accent-ink`, both display capitals at 400, untracked, radius 0.
- Links are ink, underlined in `--color-rule`, and the underline turns amber on hover. Inputs: radius 0, a 1px `--color-muted` border on `--color-paper-2`.
- The safelight is scarce: a line, a selected plate, a caption on hover, the one filled control; `--color-accent-deep` is the quieter fill under ink text.

## Motion

Still as a print. A photograph may rise once from the ground over `--dur-long`, as in the tray, from a visible default; hover on a linked picture turns its caption amber. Nothing else moves.

## Voice

Lab notes and a collector's sheet: the series, the plate, the place, the month, the edition, the paper. Exact numbers, short lines, no adjectives about light or soul.

## Do-nots

- Never an amber wash, band or glow.
- Never a sprocket hole, a film strip, a grease-pencil ring or a drawn frame.
- Never Sofia Sans Extra Condensed above 400 for a head; the hairline is the head.
- Never sepia, duotone or a tint on a picture, and never a grey gradient where a print belongs.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed:wght@200;400&family=Barlow:wght@300;400&display=swap" rel="stylesheet">
```

```css
h1, h2, .display { font-family: var(--font-display); font-weight: 200; text-transform: uppercase; line-height: 1; letter-spacing: var(--tracking-display); }
h3 { font-family: var(--font-display); font-weight: 400; text-transform: uppercase; line-height: 1; }
.btn { padding: var(--space-sm) var(--space-lg); border: var(--rule-hair) solid var(--color-ink); border-radius: 0; background: transparent; color: var(--color-ink); font: 400 var(--text-md)/1 var(--font-display); text-transform: uppercase; }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
.band { background: var(--color-paper-2); }
figure img, [data-slot] > img { filter: grayscale(1); }
.grained { position: relative; isolation: isolate; }
.grained::after { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: var(--grain); background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 9 -4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E") 0 0 / 200px 200px; }
::selection { background: color-mix(in oklab, var(--color-accent) 35%, transparent); }
```
