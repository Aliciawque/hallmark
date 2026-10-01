---
name: Studio
slug: studio
genre: editorial
paper: light 96.5 200
display: roman-serif Erode
accent: chromatic-green 145
posture: restrained
keywords: design studio, creative studio, branding, brand identity, art direction, agency, portfolio, case study, selected work, editorial design, typography, creative direction, graphic design, considered, curatorial
material: cool studio-white, a roughened roman serif at scale, hairlines and air, one botanical green
signature: an Erode headline set huge with its chipped edges legible, over a hairline, and one green rectangle beneath it
---

# Studio

Cool studio-white, Erode 500 set huge with its chipped edges legible over a hairline, a Geist body, whitespace doing the structure, and one botanical green rectangle under 5%.

## Tokens

```css
:root {
  --color-paper: oklch(96.5% 0.005 200); --color-paper-2: oklch(93.5% 0.007 200); --color-paper-3: oklch(90.5% 0.008 200);
  --color-ink: oklch(13% 0.024 205); --color-ink-2: oklch(34% 0.016 205); --color-muted: oklch(50% 0.014 205);
  --color-rule: oklch(82% 0.008 200);
  --color-accent: oklch(46% 0.140 145); --color-accent-ink: oklch(96.5% 0.005 200); --color-focus: oklch(50% 0.16 145);
  --font-display: "Erode", serif; --font-body: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 4px; --radius-pill: 4px; --rule-hair: 1px;
  --shadow-card: none;
  --tracking-display: -0.022em; --display-weight: 500;
}
```

## Faces

- **Display:** Erode 500, `--tracking-display`, up to 6.25rem, line-height 0.98, two or three lines; roman. A chipped, hand-set edge on every terminal: at display size the letters read impressed into the page, and that texture is the signature. No optical axis: set it big enough that the erosion reads as intent.
- **Body:** Geist 400 and 500 at a 45 to 75ch measure. The clean sans under a textured serif is the pairing. Erode never sets running text (its edge turns to mud at reading size); Erode italic is a pulled line at text size only.
- **Labels, captions, dates, roles, disciplines, table heads, folios:** Geist 500 one step smaller, sentence case, `--color-muted`. Mono is not this theme's material; Geist Mono appears only inside code and on figures that compare.

## Material

- Hairlines, not cards: 1px `--color-rule` defines structure; no box, no shadow, no glass. Depth is rules and air.
- Radius 4px on the one filled control; no pills. No texture: the cool paper is the whole surface.
- The green under 5%: a link underline, a small tick, an active state, the one filled control (green fill, paper text). A head is one colour; emphasis in running text is weight.
- The control pair: a green-filled rectangle beside a hairline-outlined one, both 4px.
- The object family: the case-study index. A selected-work list ruled by hairlines with year and discipline in the label voice, an image slot framed by whitespace, a colophon block.

## Motion

Nothing moves except state: a green underline grows under a link on hover; a hairline shifts toward green on a focusable row. No reveal, no bounce, no parallax.

## Voice

Spare, a little literary. Verbs over adjectives; name the work, the discipline, the year.

## Do-nots

- Never smooth Erode out: no substitute serif at display size, no text-shadow or blur on the edge. Without the roughness this is any serif on white.
- Never a green flood or a neon green; one deep botanical signal.
- Never warm paper; the ground is cool, hue 200.
- Never boxed cards, shadows or glass; hairlines and air carry the page.
- Never a pill or gradient control; one filled green rectangle plus typographic links.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=erode@400,500,600&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
.display { font: var(--display-weight) var(--text-display)/0.98 var(--font-display); letter-spacing: var(--tracking-display); color: var(--color-ink); }
.index > li { display: grid; grid-template-columns: 1fr auto auto; gap: 2rem; padding: 1rem 0; border-top: 1px solid var(--color-rule); }
.btn { border-radius: var(--radius-card); padding: 0.7rem 1.2rem; font-weight: 500; }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { border: 1px solid var(--color-rule); color: var(--color-ink); }
a:hover { text-decoration-color: var(--color-accent); text-underline-offset: 0.2em; }
::selection { background: oklch(46% 0.14 145 / 0.22); }
```
