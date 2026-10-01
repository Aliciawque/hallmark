---
name: Stencil
slug: stencil
genre: playful
paper: dark 15 90
display: display-condensed Big Shoulders Stencil Display
accent: chromatic-yellow 90
posture: committed
keywords: logistics, freight, shipping, pallet, warehouse, courier, delivery, fleet, cargo, depot, streetwear, merch, drop, workwear, hardware, industrial, utility, tracking, export, crate
material: crate-black ground, stencilled condensed capitals, hazard yellow, a typed mono body, hazard stripes, a double-ringed stamp and a barcode
signature: the stencilled head over a hazard stripe, with one stamp struck at a tilt and a barcode at the foot
---

# Stencil

Crate-black paint, Big Shoulders Stencil Display 900 caps with the bridges showing, hazard yellow for the stripe and the fill, an IBM Plex Mono body typed like a manifest, one stamp struck at a tilt and a barcode.

## Tokens

```css
:root {
  --color-paper: oklch(15% 0.006 90); --color-paper-2: oklch(19% 0.007 90); --color-paper-3: oklch(95% 0.015 90);
  --color-ink: oklch(95% 0.015 90); --color-ink-2: oklch(86% 0.014 90); --color-muted: oklch(70% 0.02 90);
  --color-rule: oklch(30% 0.01 90);
  --color-accent: oklch(84% 0.17 90); --color-accent-ink: oklch(15% 0.006 90); --color-focus: oklch(84% 0.17 90);
  --font-display: "Big Shoulders Stencil Display", Impact, sans-serif; --font-body: "IBM Plex Mono", ui-monospace, monospace;
  --font-outlier: "Allerta Stencil", Impact, sans-serif;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 3px; --shadow-card: none;
  --tracking-display: 0.01em;
}
```

Three crates, stated in the stamp (`stencil: manifest`). Yellow and black are constant; the paper label plate (`--color-paper-3`, black type on it) flips to black on the paper crate.

| Crate | Ground, ink |
| --- | --- |
| **manifest** (default) | the tokens above |
| **paper** | ground `oklch(95% 0.015 90)`, ink `oklch(15% 0.006 90)`, muted `oklch(45% 0.01 90)`, rule `oklch(80% 0.02 90)` |
| **hi-vis** | ground `oklch(84% 0.17 90)`, ink `oklch(15% 0.006 90)`, muted `oklch(30% 0.04 90)`, rule `oklch(60% 0.12 90)`; the stripes go black on paper |

## Faces

- **Display:** Big Shoulders Stencil Display 900 uppercase, line-height 0.88, `--tracking-display`; 700 for a subhead. Controls are set in it at 22px.
- **Stamp face:** Allerta Stencil 400 uppercase tracked 0.04em, only inside the stamp and on crate marks, never a head.
- **Body and all small type:** IBM Plex Mono 400 at 16px, line-height 1.5; labels, table heads and meta in 500 at 12.5px, sentence case, untracked. Mono is the material here, a typed manifest, so there is no proportional body face (the gate 64 guard).

## Material

- Hazard stripes: a 14px band of `repeating-linear-gradient(-45deg, yellow 0 16px, black 16px 32px)` as the divider and the foot of a placeholder; an 8px variant under a head.
- Rules `--rule-hair` in `--color-rule` in tables; borders `--rule-bar` ink on controls and the stamp; radius 0; no shadows; no texture, the crate is flat paint.
- The stamp: a 3px border with an inset 3px gap and a second 5px ring, the stamp face, rotated -3°; one per page. A stamp carries a fact, a date or a frame number, or does not appear.
- The control pair: a yellow-filled primary with black text beside a 3px-outlined ghost, both in the display face at 22px uppercase; a paper-filled third exists on the black crate only.
- Objects: the barcode (a 56px row of 1px to 6px bars drawn with spans, encoding a real order number, or absent), the crossed-out figure (`line-through` at 0.14em for the old price), the tariff table, the tracking log, the paper label plate, and the placeholder: a dark radial wash with yellow in one corner, three ruled rows and a hazard foot.

## Motion

Mechanical: a stamp lands once on entry (scale 1.15 to 1 over 160ms ease-out); the tracking log adds a row in one frame; nothing else moves.

## Voice

Manifest voice: the pallet, the depot, the cut-off, the price per unit.

## Do-nots

- Never a stencil face on body copy; the bridges break at reading size.
- Never yellow as running text on the black crate; yellow fills, stripes and stamps.
- Never rust, scratches or spray drips; the crate is clean paint.
- Never a rounded corner or a shadow on any surface.
- Never yellow and paper as fills in one control row.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Display:wght@700;900&family=Allerta+Stencil&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
body { font-family: var(--font-body); font-size: 16px; }
.display { font-family: var(--font-display); font-weight: 900; text-transform: uppercase; line-height: 0.88; letter-spacing: var(--tracking-display); }
.label { font-weight: 500; font-size: 12.5px; color: var(--color-muted); }
.hazard { height: 14px; background: repeating-linear-gradient(-45deg, var(--color-accent) 0 16px, var(--color-accent-ink) 16px 32px); }
.stamp { display: inline-block; padding: 10px 16px 8px; border: var(--rule-bar) solid currentColor; box-shadow: inset 0 0 0 3px var(--color-paper), inset 0 0 0 5px currentColor;
  font-family: var(--font-outlier); font-size: 20px; letter-spacing: 0.04em; text-transform: uppercase; line-height: 1; transform: rotate(-3deg); white-space: nowrap; }
.btn { font-family: var(--font-display); font-weight: 900; font-size: 22px; letter-spacing: 0.04em; text-transform: uppercase; padding: 12px 24px 10px; border: var(--rule-bar) solid var(--color-ink); color: var(--color-ink); background: transparent; line-height: 1; }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
.barcode { display: flex; height: 56px; }
.barcode i { display: block; height: 100%; background: currentColor; }
.barcode i.g { background: transparent; }
.was { text-decoration: line-through; text-decoration-thickness: 0.14em; }
::selection { background: oklch(84% 0.17 90 / 0.4); color: var(--color-accent-ink); }
```
