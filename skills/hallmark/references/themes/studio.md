---
name: Studio
slug: studio
genre: editorial
paper: light 96.5 200
display: roman-serif Hedvig Letters Serif
accent: warm 52
posture: restrained
keywords: design studio, creative studio, branding, brand identity, art direction, agency, portfolio, case study, selected work, editorial design, typography, creative direction, graphic design, considered, curatorial
material: cool studio-white paper, blue-black ink, Hedvig Letters Serif heads over Geist, square hairlines, the work photographed in true colour, one cadmium-orange signal
photo: natural
pictured: Portfolio Grid, Stage hero
---

# Studio

A design studio's material: cool studio-white paper, blue-black ink, Hedvig Letters Serif for the heads, a contemporary serif with a calligraphic hand in its joins, a clean Geist body, 1px hairlines and one cadmium orange, with nothing else coloured but the work. Photographs show the work where it is used, in its own colours. It reads as considered because the serif has a voice, the frame stays quiet and the only colour is one decision. It is not a warm cream portfolio with a terracotta accent, and not a grey minimal template in a geometric sans.

## Tokens

```css
:root {
  --color-paper: oklch(96.5% 0.005 200); --color-paper-2: oklch(93.5% 0.007 200); --color-paper-3: oklch(90.5% 0.008 200);
  --color-ink: oklch(13% 0.024 205); --color-ink-2: oklch(34% 0.016 205); --color-muted: oklch(50% 0.014 205);
  --color-rule: oklch(82% 0.008 200);
  --color-accent: oklch(68% 0.170 52); --color-accent-ink: oklch(13% 0.024 205); --color-focus: oklch(54% 0.14 50);
  --font-display: "Hedvig Letters Serif", ui-serif, Georgia, serif; --font-body: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: var(--font-body);
  --radius-card: 4px; --radius-pill: 4px; --rule-hair: 1px;
  --shadow-card: none;
  --tracking-display: -0.015em; --display-weight: 400;
}
```

## Type

- **Display:** Hedvig Letters Serif 400, its one weight, `--tracking-display`, line-height 1.0 to 1.05, sentence case, roman, at its largest optical size (`font-optical-sizing: auto`). The hand in its joins holds from the hero head down to a 25px item title, so every head on the page reads as the same voice. Heads only.
- **Body:** Geist 400 and 500, line-height 1.55. The clean sans under a serif with a hand in it is the pairing.
- **Labels, captions, dates, roles, disciplines, table heads:** Geist 500 a step smaller, sentence case, `--color-muted`. Figures that compare take Geist's tabular figures; there is no mono.

## Surfaces

- Hairlines, not boxes: 1px `--color-rule` on divisions and between rows; no box, no glass.
- Radius 4px on controls, inputs and photographs; no pills.
- No shadow: depth is a rule or a paper step, and a well is `--color-paper-2` with no border.
- Bands: a `--color-paper-2` band, or one `--color-ink` band with paper type; two a page at most, never an orange one.
- Photographs: the work where it is used, at the distance a visitor meets it: a facade and its banner, signs in a stair hall, posters on a hoarding, printed matter on a table, a ticket in a hand; level, daylight, verticals straight. Never a mockup, never a blank poster, never a person posed beside the work. True colour (the `photo:` line), since the work's own palette is the point; radius `min(1vw, 4px)`, a 1px inset ring of ink at 6%, no shadow. A caption beneath in the label voice names the surface; type never sits on a photograph.
- No texture: the cool paper is the whole surface.

## Controls

- The control pair: an orange-filled rectangle with ink text beside a hairline-outlined one, both 4px, Geist 500.
- Links grow an orange underline on hover, and focus takes the deeper `--color-focus`; inputs are 4px with a 1px `--color-muted` border.
- The orange stays under 5% of a screen: the filled control with ink type on it, a hover underline, one marked figure. Never orange type on the paper; emphasis in running text is weight, and nothing else is coloured.

## Motion

Nothing moves except state: an orange underline grows under a link on hover; a hairline shifts toward orange on a focusable row. No reveal, no bounce, no parallax.

## Voice

Spare and exact, a little literary. Verbs over adjectives; name the work, the kind of institution, the surface it lives on, the year. Never "creative solutions" or "brands brought to life".

## Do-nots

- Never Hedvig Letters Serif in running text, and never a substitute serif at display size; its hand turns to noise at body size and to nothing in a stand-in.
- Never an orange flood, an orange tint band or a second warm colour.
- Never warm paper; the ground is cool, hue 200.
- Never boxed cards, shadows or glass; structure is the hairline.
- Never the work on a device mockup or a blank frame; show it photographed where it is used.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Geist:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: var(--display-weight); letter-spacing: var(--tracking-display); color: var(--color-ink); font-optical-sizing: auto; }
h1, h2 { line-height: 1.02; }
.btn { border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); padding: var(--space-sm) var(--space-lg); font-weight: 500; color: var(--color-ink); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); border-color: var(--color-accent); }
.well { background: var(--color-paper-2); border-radius: var(--radius-card); }
.rule { border-top: var(--rule-hair) solid var(--color-rule); }
figure img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: min(1vw, var(--radius-card)); outline: var(--rule-hair) solid color-mix(in oklab, var(--color-ink) 6%, transparent); outline-offset: calc(var(--rule-hair) * -1); }
.figure { font-variant-numeric: tabular-nums; }
a { text-underline-offset: 0.2em; } a:hover { text-decoration-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 25%, transparent); }
```
