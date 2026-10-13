---
name: Blueprint
slug: blueprint
genre: modern-minimal
paper: mid 36 255
display: geometric-sans Chakra Petch
accent: neutral 240
posture: drenched
keywords: architecture, architect, engineering, construction, structural, interiors, planning, surveying, cad, drafting, fabrication, prefab, developer, technical, spec, permit, renovation, build, drawings, architecture studio, timber
material: prussian-blue sheet, white line ink, Chakra Petch capitals over IBM Plex Sans with mono measurements, square double keylines, photographs printed as cyanotypes, the white line as the only signal
photo: duotone paper-3 ink con=30 exp=-10
pictured: Split Studio, Settled hero
---

# Blueprint

A drafting sheet as a material: Prussian-blue paper, a white line for ink, Chakra Petch drafted capitals over IBM Plex Sans, mono measurements with their units, keylines instead of cards, and photographs printed as cyanotypes, the sheet's blue in the shadows and its white in the light. It reads technical because everything is a line or a print on one ground and the line is the only signal. It is not a dark product page with a blue gradient and not a neon wireframe.

## Tokens

```css
:root {
  --color-paper: oklch(36% 0.10 255); --color-paper-2: oklch(32% 0.10 255); --color-paper-3: oklch(28% 0.10 257);
  --color-ink: oklch(97% 0.01 240); --color-ink-2: oklch(90% 0.02 240); --color-muted: oklch(80% 0.04 240);
  --color-rule: oklch(92% 0.02 240 / 0.85); --color-rule-2: oklch(92% 0.02 240 / 0.35);
  --color-grid: oklch(97% 0.01 240 / 0.10); --color-grid-2: oklch(97% 0.01 240 / 0.22);
  --color-accent: oklch(97% 0.01 240); --color-accent-ink: oklch(36% 0.10 255); --color-focus: oklch(97% 0.01 240);
  --font-display: "Chakra Petch", ui-sans-serif, sans-serif; --font-body: "IBM Plex Sans", ui-sans-serif, sans-serif;
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.01em; --sheet-inset: 20px;
}
```

Three sheets, stated in the stamp (`blueprint: cyanotype`).

| Sheet | Ground, line, muted |
| --- | --- |
| **cyanotype** (default) | the tokens above |
| **whiteprint** | ground `oklch(97.5% 0.006 240)`, ink `oklch(36% 0.10 255)`, muted `oklch(52% 0.07 255)` |
| **brownline** | ground `oklch(86% 0.045 80)`, ink `oklch(28% 0.05 50)`, muted `oklch(45% 0.05 55)`, a red pencil `oklch(45% 0.19 28)` for annotation only |

## Type

- **Display:** Chakra Petch 600 for every head, `--tracking-display`, roman, one weight a head: the h1 and h2 uppercase at line-height 1.02 (55a), the h3 in sentence case.
- **Body:** IBM Plex Sans 400 for prose and 500 for labels and controls; reversed on the sheet, nothing lighter than 400.
- **Labels, captions, table heads, meta:** IBM Plex Sans 500 a step smaller, sentence case. IBM Plex Mono 500 sets a measurement with its unit, coordinates, revision and drawing numbers and code, nothing else.

## Surfaces

- Lines only: 1px `--color-rule` keylines on every surface, and a second keyline in `--color-rule-2` 5px inside on a figure or a photograph. Radius 0, no shadows; depth is a second line or a one-step darker ground (`--color-paper-2`, `--color-paper-3`).
- The grid: 24px minor lines in `--color-grid`, 120px major in `--color-grid-2`, offset by `--sheet-inset`, only under a drawing, a plan or a chart of real data.
- Bands: a `--color-paper-2` or `--color-paper-3` band, two a page at most. The sheet is already the colour (drenched), so there is no other field.
- Photographs: timber structures built and building, shot square-on so the frame reads like a drawing: glulam portals, panels on a crane, a frame against the sky, a connection's plate and bolts, a hall's roof from below. Printed as cyanotypes (the `photo:` duotone), square, inside the double keyline, cropped on a focal point so no blurred foreground or stray figure crowds the frame; a caption beneath in the label style carries a fact; type on one only over a `--color-paper-3` scrim from its edge.
- Emphasis is a thicker line or a filled shape, never a second hue on the cyanotype sheet.

## Controls

- An ink-filled primary with sheet-coloured text beside a 1px-outlined secondary in ink, both square, in IBM Plex Sans 500.
- Links in ink with a 1px underline; inputs square, 48px, a 1px `--color-rule` keyline, the white focus ring.
- The line is the accent: white on blue, in rules, the primary fill and the focus ring.

## Motion

Static, drafted. A rule may draw itself once a page (scaleX from the left over `--dur-long` on `--ease-out`); hover on a keylined surface that links darkens its ground one step.

## Voice

Specification voice: the span, the storeys, the year, the drawing number, a unit on every figure; nothing a drawing could not show.

## Do-nots

- Never a filled card, a blur or a lifted panel; the sheet has lines, not layers.
- Never a second colour on the cyanotype, in type or in a photograph; the red pencil belongs to the brownline sheet.
- Never a building, frame or section drawn to stand in for a project; a drawing is real project data or it is absent.
- Never the grid as decoration, and never a lowercase h1 or h2.
- Never a rounded corner, anywhere.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: 600; }
h1, h2 { text-transform: uppercase; line-height: 1.02; }
.num { font-family: var(--font-outlier); font-weight: 500; }
.sheet { background-color: var(--color-paper-2); background-position: var(--sheet-inset) var(--sheet-inset); background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
  background-image: linear-gradient(var(--color-grid-2) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-2) 1px, transparent 1px), linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px); }
.fig { position: relative; border: var(--rule-hair) solid var(--color-rule); }
.fig::before { content: ""; position: absolute; inset: 5px; z-index: 2; border: var(--rule-hair) solid var(--color-rule-2); pointer-events: none; }
.btn { border: var(--rule-hair) solid var(--color-rule); border-radius: 0; background: transparent; color: var(--color-ink); padding: var(--space-sm) var(--space-lg); font-weight: 500; }
.btn--primary { background: var(--color-ink); border-color: var(--color-ink); color: var(--color-accent-ink); }
::selection { background: color-mix(in oklab, var(--color-ink) 28%, transparent); }
```
