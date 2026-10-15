---
name: Specimen
slug: specimen
genre: editorial
paper: light 96 80
display: high-contrast-serif Bodoni Moda
accent: cool 262
posture: restrained
keywords: typography, type specimen, foundry, letterform, portfolio, editorial, magazine, essay, type studio, agency, brand story, print, publication, craft, considered, literary
material: warm oat paper, warm near-black ink, razor-hairline Bodoni Moda over Geist, square 1px rules, one ink-blue signal
photo: duotone ink paper con=8
pictured: Specimen Book, Poster hero
---

# Specimen

A foundry's material: warm oat paper, warm near-black ink, Bodoni Moda 400 pinned at its highest optical size so the hairlines thin to a razor against the stems, a Geist body beneath it, square 1px rules and one ink-blue signal. It reads as hand-set and exact because all the contrast lives inside the letters, none in colour or depth. It is not a cream luxury page with a terracotta accent, and not a fashion masthead in bold Didone.

## Tokens

```css
:root {
  --color-paper: oklch(96% 0.018 80); --color-paper-2: oklch(93.5% 0.02 80); --color-paper-3: oklch(90.5% 0.022 78);
  --color-ink: oklch(18% 0.014 60); --color-ink-2: oklch(26% 0.014 60); --color-muted: oklch(48% 0.014 65);
  --color-rule: oklch(80% 0.016 75);
  --color-accent: oklch(46% 0.17 262); --color-accent-ink: oklch(96% 0.018 80); --color-focus: oklch(50% 0.18 262);
  --font-display: "Bodoni Moda", ui-serif, Georgia, serif; --font-body: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px;
  --shadow-card: none;
  --tracking-display: -0.025em; --display-weight: 400; --display-optical: 96;
}
```

## Type

- **Display:** Bodoni Moda 400, `--tracking-display`, line-height 1.02, sentence case, roman. `h1` and `h2` take `"opsz" 96` (`--display-optical`), where the hairline nearly vanishes against the stem and that contrast is the graphic; an `h3` lets the axis follow its size (`font-optical-sizing: auto`), since a razor hairline breaks at 25px.
- **Body:** Geist 400 and 500, line-height 1.5; the plain sans under the Didone is the tension. Bodoni Moda italic stays inside running text, one emphasised word at most, and never enters a head.
- **Labels, captions, table heads, meta:** Geist 500 a step smaller, sentence case, `--color-muted`. Mono is not this theme's material: Geist Mono appears only inside code and on figures that compare (a size, a weight, a price).

## Surfaces

- 1px `--color-rule` hairlines on divisions, on table rows and between columns; a double rule (3px `double`) is the one heavier rule, once a page at most. Radius 0 on everything.
- No depth: nothing lifts and nothing casts a shadow. A well is a paper step (`--color-paper-2`) under a hairline, never a boxed card.
- Bands: a `--color-paper-2` band, or one `--color-ink` band with oat type, where the Didone reads at its sharpest; two bands a page at most, never a blue one.
- Photographs: one at most, the face in print: a book open on a desk, a page under raking light, a printed sheet, metal sorts in a case; close, in soft daylight, cropped to the type. It prints in the ink on the oat (the `photo:` duotone) so it reads as a plate in the specimen: square, a 1px `--color-rule` hairline, no shadow, eight columns or the full width. Its caption sits beneath in Geist and names the setting (the face, the size, the paper); type never sits on it.
- No texture, no mesh, no gradient behind type: the oat is a colour, not a paper scan.

## Controls

- The control pair: an ink-filled rectangle with oat text beside a 1px ink-outlined one, both square, Geist 500.
- Links carry a 1px ink-blue underline at 0.18em that thickens on hover; inputs are square with a 1px `--color-rule` border and the `--color-focus` ring.
- The blue stays under 5% of a screen: a link underline, the focus ring, one control, one figure. Never a fill behind type, never a second hue.

## Motion

Nothing moves except state: the blue underline thickens under a link on hover. No reveal, nothing loops.

## Voice

Editorial, hand-set, lightly literary. Verbs over adjectives; name the face, the size, the number.

## Do-nots

- Never a heavy display; Bodoni Moda stays at 400, and bold turns the Didone into a fashion masthead.
- Never an optical size under 72 on an `h1` or `h2`; fat hairlines are this theme's most common failure.
- Never a warm accent; the signal is ink blue, and the warmth comes from the oat.
- Never cool paper; the ground is oat, hue 80, and every neutral tints toward it.
- Never rounded corners, pills, shadows or texture. Square, hairline, flat.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: var(--display-weight); letter-spacing: var(--tracking-display); line-height: 1.02; }
h1, h2 { font-variation-settings: "opsz" var(--display-optical); }
h3 { font-optical-sizing: auto; line-height: 1.15; }
.btn { border: var(--rule-hair) solid var(--color-ink); border-radius: var(--radius-card); padding: var(--space-sm) var(--space-lg); font-weight: 500; }
.btn--primary { background: var(--color-ink); color: var(--color-paper); }
.btn--secondary { background: transparent; color: var(--color-ink); }
.well { background: var(--color-paper-2); border-top: var(--rule-hair) solid var(--color-rule); }
.rule--double { border: 0; border-top: 3px double var(--color-rule); }
.photo > img { outline: var(--rule-hair) solid var(--color-rule); outline-offset: -1px; }
a { text-decoration-color: var(--color-accent); text-underline-offset: 0.18em; }
a:hover { text-decoration-thickness: 2px; }
::selection { background: color-mix(in oklab, var(--color-accent) 22%, transparent); }
```
