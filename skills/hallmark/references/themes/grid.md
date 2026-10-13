---
name: Grid
slug: grid
genre: editorial
paper: light 99 255
display: grotesk-heavy Archivo
accent: warm 28
posture: committed
keywords: identity, brand system, wayfinding, signage, design studio, type specimen, editorial grid, institution, museum, archive, index, directory, systems, modular, swiss, grotesque, manual, programme, poster
material: cool near-white paper, cool near-black ink, Archivo 800 lowercase over Archivo 400, square hairlines and column rails, one signal ink
photo: duotone ink paper con=10
pictured: Index-First, Settled hero
---

# Grid

A rational, institutional voice: a cool near-white sheet, cool near-black ink, one family (Archivo 800 set lowercase for heads, 400 for reading), square hairline rules and one signal ink dialled to red, ultramarine or yellow. It feels systematic because one face, one ink and the hairlines do the work, and photographs print in the same cool ink, frontal and squared to the columns. It is not a nostalgic poster pastiche and not a minimal product page.

## Tokens

```css
:root {
  --color-paper: oklch(99% 0.005 255); --color-paper-2: oklch(97.2% 0.005 255); --color-paper-3: oklch(94.5% 0.005 255);
  --color-ink: oklch(16% 0.010 255); --color-ink-2: oklch(26% 0.010 255); --color-muted: oklch(48% 0.012 255);
  --color-rule: oklch(88% 0.006 255);
  --color-accent: oklch(54% 0.21 28); --color-accent-ink: oklch(99% 0.005 255); --color-focus: oklch(54% 0.21 28);
  --color-field: oklch(54% 0.21 28); --color-field-ink: oklch(99% 0.005 255);
  --font-display: "Archivo", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: var(--font-display);
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.015em; --display-weight: 800;
}
```

One dial, the signal ink, stated in the stamp (`grid: red`). `--color-focus` and the field pair follow it.

| Ink | Value | Register | On a field |
| --- | --- | --- | --- |
| **red** (default) | `oklch(54% 0.21 28)` | cultural, editorial, civic | paper text on an ink flood |
| **ultramarine** | `oklch(45% 0.19 264)` | technical, institutional, engineering | paper text on an ink flood |
| **yellow** | `oklch(82% 0.17 95)` | industrial, archive, logistics | surface only: floods a field under ink text; never yellow type |

## Type

- **Display:** Archivo 800, lowercase, `--tracking-display`, line-height 1.0; one weight and one colour per head, section heads included. Every line starts on a column line, flush left and ragged right; nothing is centred or justified.
- **Body:** Archivo 400 at 16px, line-height 1.5, flush left. One family: discipline comes from weight, scale and tracking, never from a second face.
- **Labels, captions, table heads, meta, units:** Archivo 500 a step smaller, sentence case, untracked, `--color-muted`. Figures take `tabular-nums` in Archivo; there is no mono.

## Surfaces

- Rules do the structure: a solid ink rule tops a section or a table; items part by 1px `--color-rule` hairlines (`border-inline-start`). Zero cards.
- Radius 0 and no shadow anywhere; a well is a `--color-paper-2` step under an ink rule.
- Bands: one field of the signal ink with `--color-accent-ink` text (ink text on yellow), `--color-paper-2`, or `--color-ink` with paper text; flush against the rules above and below. Two a page at most.
- Photographs: documentary and frontal, in even light, the subject squared to the frame: a drawer from above, a sheet flat on a table, a press from the side, a room from its door. They print in the cool ink on the paper (the `photo:` duotone), square, edged with a 1px `--color-rule` hairline and cropped so their edges fall on column lines. Type never sits on one; the caption runs beneath, flush left on the picture's first column, in the label style.
- Texture, the rails: a 1px `--color-rule` line at the left edge of each of the shared twelve columns, painted over the content box of a band's container or a well; across a signal field they run at 15% paper. Never under running text or a photograph.

## Controls

- An ink-filled square block with paper text beside a 1px ink-outlined block whose outline moves to the signal ink on hover.
- Links in ink with a 1px underline; inputs square with a 1px `--color-muted` border.
- `::selection` is the signal ink with paper text (ink on yellow). Otherwise the ink sits on a field band, an outline's hover, the focus ring and one figure.

## Motion

State only, `--dur-short` on `--ease-out`: a row shifts to `--color-paper-2` under a hovered link, an outline moves to the signal ink. No scroll reveals, no parallax.

## Voice

Rational and exact, lowercase in the heads: name the record, the field, the place and the year, in the order a catalogue lists them, and leave the adjectives out.

## Do-nots

- Never uppercase display and never a second family.
- Never two signal inks on one page; the colourway is one dial.
- Never a rounded corner, a shadow or a boxed card.
- Never the rails behind a paragraph or a photograph; they stay on a band or a well.
- Never a photograph in colour or toned in the signal ink; pictures print in the ink.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;800&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: var(--display-weight); text-transform: lowercase; line-height: 1; text-align: start; }
.btn { border: var(--rule-hair) solid var(--color-ink); border-radius: 0; padding: var(--space-sm) var(--space-lg); font-weight: 500; transition: border-color var(--dur-short) var(--ease-out); }
.btn--primary { background: var(--color-ink); color: var(--color-paper); }
.btn--secondary { color: var(--color-ink); } .btn--secondary:hover { border-color: var(--color-accent); }
.band--field { background: var(--color-field); color: var(--color-field-ink); --rail: color-mix(in oklab, var(--color-paper) 15%, transparent); }
.rails { background-image: repeating-linear-gradient(to right, var(--rail, var(--color-rule)) 0 1px, transparent 1px calc((100% + var(--gap-columns)) / 12)); background-origin: content-box; background-repeat: no-repeat; }
.photo { border-radius: 0; outline: var(--rule-hair) solid var(--color-rule); outline-offset: calc(-1 * var(--rule-hair)); }
.photo + figcaption { font-weight: 500; font-size: var(--text-sm); color: var(--color-muted); padding-top: var(--space-xs); }
::selection { background: var(--color-accent); color: var(--color-accent-ink); }
```
