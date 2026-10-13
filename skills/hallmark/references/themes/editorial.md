---
name: Editorial
slug: editorial
genre: editorial
paper: light 96.5 88
display: display-condensed Bricolage Grotesque
accent: chromatic-green 152
posture: restrained
keywords: magazine, editorial, feature, culture, fashion, design annual, interview, longform, publication, issue, contemporary, art direction, profile, lookbook, brand story, journal, considered, travel, city guide, guide
material: warm white uncoated stock, printed black ink with a cool tilt, Bricolage Grotesque condensed at 800 over Source Serif 4, square corners and 1px hairlines, one printer's green
photo: natural sat=-10 con=4
pictured: Marquee Hero, Poster hero
---

# Editorial

A contemporary magazine voice: warm white uncoated stock, a printed black with a faint cool tilt (hue 280), Bricolage Grotesque at 800 squeezed to width 75 for every head, Source Serif 4 for reading, square corners, 1px hairlines and one printer's green. It reads as art-directed because the condensed head, the serif text and the photographs carry it, not ornament. It is not a serif literary journal, not a cream page with a terracotta accent, and not a poster of giant numerals.

## Tokens

```css
:root {
  --color-paper: oklch(96.5% 0.008 88); --color-paper-2: oklch(93.5% 0.010 88); --color-paper-3: oklch(90.5% 0.012 86);
  --color-ink: oklch(16% 0.012 280); --color-ink-2: oklch(27% 0.010 60); --color-muted: oklch(47% 0.012 70);
  --color-rule: oklch(84% 0.010 85); --color-rule-2: oklch(66% 0.010 80);
  --color-accent: oklch(49% 0.130 152); --color-accent-ink: oklch(98% 0.005 88); --color-focus: oklch(52% 0.135 152);
  --font-display: "Bricolage Grotesque", ui-sans-serif, sans-serif; --font-body: "Source Serif 4", ui-serif, Georgia, serif;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.01em; --display-weight: 800;
}
```

## Type

- **Display:** Bricolage Grotesque 800 with `"wdth" 75, "opsz" 96`, `--tracking-display`, sentence case, roman, line-height 1.0 to 1.05. Condensed, it sets narrow for its size, so a section head may take one step up (`--text-display-s`). One weight and one colour per head.
- **Body:** Source Serif 4 400 and its italic at 17 to 19px, optical size automatic, line-height 1.55, in `--color-ink-2`. A quotation takes the italic at `--text-lead` to `--text-title`, never a head and never a word inside one.
- **Labels, captions, nav links, controls, table heads, bylines:** Bricolage Grotesque 500 at `"opsz" 12` and full width, a step smaller, sentence case, untracked; captions in `--color-muted`. No mono on the page.

## Surfaces

- 1px `--color-rule` hairlines part rows, columns and sections; `--color-rule-2` is the firmer rule over a table or a list. Nothing is boxed: no card border, no shadow, no blur.
- Radius 0 on everything: controls, tags, inputs, wells and photographs are sharp rectangles.
- Depth is a paper step: a well is `--color-paper-2` under a `--color-rule-2` rule, never a raised card.
- Bands: a `--color-paper-2` band or one `--color-ink` band with `--color-paper` text; never a green band. Two a page at most.
- Photographs: editorial photography, seen close: hands at work, an object on a table, a room or a street in daylight, printed pages. Mid to close distance, soft window light, people from behind or cropped at the shoulder, never a face to the lens. Natural colour, a little quieter than life (the `photo:` line). Square corners, no border, an inset ink outline at 8%; full-bleed, or cut to a column edge with the type beside it. Captions sit under the frame in the label face; a head crosses a photograph only as a cover line, once a page, on its calmest third over an ink scrim.
- No texture, no grain, no mesh.

## Controls

- An ink-filled square block (`--color-paper` on `--color-ink`) beside a 1px ink-outlined block, both in the label face; a tag may be the one filled green rectangle.
- Links carry a hairline underline that turns green on hover; inputs are square with a 1px `--color-muted` border.
- Green stays under 5% of a screen: a link's hover, one tag, the focus ring; never a field, never behind running text.

## Motion

State only: a green underline grows under a link over `--dur-short` on `--ease-out`, a block darkens one step. No reveal, nothing on scroll.

## Voice

Contemporary, lightly literary, exact. Name the issue, the piece, the page count, the date; a head reads like a cover line, never a category.

## Do-nots

- Never a serif head; Source Serif 4 sets reading text and quotations, never an `h1` to `h3`.
- Never Bricolage at its default width; without `"wdth" 75` the head loses the magazine proportion.
- Never a rounded corner, a pill or a shadow.
- Never a figure at poster size standing in for a cover: a price, a page count or a date sets at the section size beside its label, and the cover is a photograph.
- Never an all-caps shout; sentence case, tight, magazine-modern.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,500..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&display=swap" rel="stylesheet">
```

```css
body { color: var(--color-ink-2); font-optical-sizing: auto; }
h1, h2, h3 { font-weight: var(--display-weight); font-variation-settings: "wdth" 75, "opsz" 96; color: var(--color-ink); }
h3 { font-variation-settings: "wdth" 75; }
small, figcaption, th, nav, label, .btn, .tag { font-family: var(--font-display); font-weight: 500; font-variation-settings: "opsz" 12; }
blockquote { font: italic 400 var(--text-lead)/1.35 var(--font-body); color: var(--color-ink); }
.btn { border: var(--rule-hair) solid var(--color-ink); border-radius: 0; padding: var(--space-sm) var(--space-lg); }
.btn--primary { background: var(--color-ink); color: var(--color-paper); }
.btn--secondary { background: none; color: var(--color-ink); }
.tag { background: var(--color-accent); color: var(--color-accent-ink); padding: var(--space-3xs) var(--space-xs); }
.well { background: var(--color-paper-2); border-top: var(--rule-hair) solid var(--color-rule-2); }
.photo > img { outline: 1px solid color-mix(in oklab, var(--color-ink) 8%, transparent); outline-offset: -1px; }
a { text-decoration-color: var(--color-rule-2); text-underline-offset: 0.2em; } a:hover { text-decoration-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 22%, transparent); }
```
