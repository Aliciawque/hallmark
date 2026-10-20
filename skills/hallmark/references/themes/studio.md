---
name: Studio
slug: studio
genre: editorial
paper: light 97.2 215
display: roman-serif Hedvig Letters Serif
accent: warm 52
posture: restrained
keywords: design studio, creative studio, branding, brand identity, art direction, agency, portfolio, case study, selected work, editorial design, typography, creative direction, graphic design, considered, curatorial
material: cool studio-white paper, blue-black ink, Hedvig Letters Serif heads over Geist, hairlines with an ink rule at the head of a set, the work photographed in true colour, one cadmium-orange signal
photo: natural
pictured: Portfolio Index, Stage hero
---

# Studio

A design studio's material: cool studio-white paper, blue-black ink, Hedvig Letters Serif for the heads, a contemporary serif with a calligraphic hand in its joins, a clean Geist body, hairlines in two weights of colour and one cadmium orange, with nothing else coloured but the work. It reads as considered because the serif has a voice, the frame is drawn in rules like a proof sheet and the only colour is one decision. It is not a warm cream portfolio with a terracotta accent, and not a grey minimal template in a geometric sans.

## Tokens

```css
:root {
  --color-paper: oklch(97.2% 0.006 215); --color-paper-2: oklch(94% 0.009 215); --color-paper-3: oklch(90.5% 0.011 215);
  --color-ink: oklch(16% 0.032 250); --color-ink-2: oklch(34% 0.022 245); --color-muted: oklch(49% 0.018 240);
  --color-rule: oklch(84% 0.010 225);
  --color-accent: oklch(68% 0.172 50); --color-accent-ink: oklch(16% 0.032 250); --color-focus: oklch(52% 0.15 48);
  --font-display: "Hedvig Letters Serif", ui-serif, Georgia, serif; --font-body: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: var(--font-body);
  --radius-card: 3px; --radius-pill: 3px; --rule-hair: 1px;
  --shadow-card: none;
  --tracking-display: -0.022em; --display-weight: 400;
}
```

## Type

- **Display:** Hedvig Letters Serif 400, its one weight, `--tracking-display`, line-height 0.98 to 1.04 on hero and section heads, sentence case, roman, `font-optical-sizing: auto` so the joins sharpen at size. The hand holds from a 200px figure down to a 25px item title (tracking relaxes to -0.005em there), so every head reads as one voice. Heads, figures and the wordmark only.
- **Body:** Geist 400 and 500, line-height 1.55, ink-2 for running text so the ink is kept for heads.
- **Labels, captions, roles, table heads:** Geist 500 a step smaller, sentence case, `--color-muted`. Figures that compare take Geist's tabular figures; there is no mono. Three weights at most on a page: Hedvig 400, Geist 400 and 500.

## Surfaces

- Two rules, one weight: 1px `--color-rule` between rows and on divisions; 1px `--color-ink` opening a set (the top of an index, a table, a figure row), like the head rule of a proof. No boxes, no glass.
- Radius 3px on controls, inputs and photographs; no pills.
- No shadow: depth is a rule or a paper step, and a well is `--color-paper-2` with no border.
- Bands: `--color-paper-2`, or one `--color-ink` band with paper type where a figure or a statement needs weight; two a page at most, never an orange field.
- Photographs: the work where it is used, at the distance a visitor meets it: a hall, a stair, a facade, posters on a hoarding, printed matter on a table; level, daylight, verticals straight. Never a mockup or a person posed beside the work. True colour, 3px radius, a 1px inset ring of ink at 6%, a caption beneath in the label voice naming the surface; type never sits on a photograph.
- No texture: the cool paper is the whole surface.

## Range

- **An index as rules:** a list of surfaces, disciplines or projects set as full-width rows under an ink rule, Hedvig at item size on the left, the Geist line on the right, the row's hairline turning orange on hover.
- **One line as a specimen:** a single phrase set three or four times at falling sizes (banner, poster, ticket), each on its own hairline with its use in the label voice beside it; the serif's hand is the picture.
- **Figures in the display face:** the brief's real numbers in Hedvig at 160px and over on an ink band, paper type, hairlines between, the orange kept to the one control.
- **A brief as a form:** the fields on paper-2 in a hairline grid, labels above in Geist 500, the orange primary alone at its foot.

## Controls

- The control pair: an orange-filled rectangle with ink text beside a hairline-outlined one, both 3px, Geist 500.
- Links take an orange underline on hover; focus takes the deeper `--color-focus`; inputs are 3px with a 1px `--color-muted` border.
- The orange stays under 5% of a screen: the filled control, a hover underline, one marked figure. Never orange type on paper; emphasis in running text is weight.

## Motion

Nothing moves except state, at `--dur-short` on `--ease-out`: an orange underline under a link, an index row's hairline turning orange. No reveal, no parallax.

## Voice

Spare and exact, a little literary. Verbs over adjectives; name the work, the kind of institution, the surface it lives on. Never "creative solutions" or "brands brought to life".

## Do-nots

- Never Hedvig Letters Serif in running text, and never a substitute serif at display size.
- Never an orange flood, an orange band or a second warm colour.
- Never warm paper; the ground is cool, hue 215.
- Never boxed cards or shadows; structure is the rule, and the ink rule only opens a set.
- Never the work on a device mockup or a blank frame; show it photographed where it is used.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Geist:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: var(--display-weight); letter-spacing: var(--tracking-display); color: var(--color-ink); font-optical-sizing: auto; }
h1, h2 { line-height: 1.0; } h3 { letter-spacing: -0.005em; }
.btn { border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); padding: var(--space-sm) var(--space-lg); font-weight: 500; color: var(--color-ink); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); border-color: var(--color-accent); }
.set { border-top: var(--rule-hair) solid var(--color-ink); }
.set > * { border-bottom: var(--rule-hair) solid var(--color-rule); }
.band--ink { background: var(--color-ink); color: var(--color-paper); }
figure img { border-radius: var(--radius-card); outline: var(--rule-hair) solid color-mix(in oklab, var(--color-ink) 6%, transparent); outline-offset: calc(var(--rule-hair) * -1); }
a { text-decoration: underline 1px transparent; text-underline-offset: 0.3em; transition: text-decoration-color var(--dur-short) var(--ease-out); }
a:hover { text-decoration-color: var(--color-accent); } .set > *:hover { border-bottom-color: var(--color-accent); }
.figure { font-family: var(--font-display); font-variant-numeric: tabular-nums; line-height: 0.9; }
::selection { background: color-mix(in oklab, var(--color-accent) 25%, transparent); }
```
