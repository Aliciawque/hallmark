---
name: Atelier
slug: atelier
genre: editorial
paper: light 94.5 70
display: roman-serif Sentient
accent: cool 250
posture: restrained
keywords: fashion, atelier, couture, fragrance, gallery, exhibition, museum, ceramics, furniture, homeware, architecture, design studio, lookbook, collection, craft, small-batch, made by hand, brand story, luxury, object, hotel, boutique hotel, hospitality, stay
material: warm limewash paper, umber ink, bold Sentient heads over Hanken Grotesk, hairlines and square corners, still photographs in warm daylight, one cool slate signal
photo: warm con=-6 vib=-10
pictured: Gallery Hang, Settled hero
---

# Atelier

The register of a gallery's wall text or a maker's catalogue: warm limewash paper, umber ink, Sentient 700 heads over Hanken Grotesk reading, hairlines, square corners and one cool slate signal kept nearly as dark as the ink. Photographs are still lifes and rooms in warm daylight, printed soft and hung square on the plaster like work on a wall, each with its label. It feels hand-set and quiet because the serif is bold and soft and nothing is filled. It is not a cream page with a thin luxury serif and not a product page with a blue button.

## Tokens

```css
:root {
  --color-paper: oklch(94.5% 0.009 70); --color-paper-2: oklch(91.5% 0.011 68); --color-paper-3: oklch(87.5% 0.013 65);
  --color-ink: oklch(12% 0.020 40); --color-ink-2: oklch(28% 0.014 45); --color-muted: oklch(46% 0.012 55);
  --color-rule: oklch(79% 0.009 62);
  --color-accent: oklch(40% 0.080 250); --color-accent-ink: oklch(96% 0.008 70); --color-focus: oklch(50% 0.090 250);
  --font-display: "Sentient", Georgia, serif; --font-body: "Hanken Grotesk", system-ui, sans-serif;
  --font-outlier: var(--font-body);
  --radius-card: 0; --radius-pill: 3px; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.018em; --display-weight: 700;
}
```

## Type

- **Display:** Sentient 700 for every head, `--tracking-display`, line-height 1.02 to 1.08, sentence case, roman. The face has no optical-size axis, so it holds 700 at every step of the shared scale.
- **Body:** Hanken Grotesk 400 and 500, line-height 1.55. Never running prose in the serif.
- **Labels, captions, meta:** Hanken Grotesk 500 a step smaller, sentence case, `--color-muted`; never capitals, never mono. A wall label beside a photograph is this voice: the object on one line, the material or the fact on the next.
- **Drop cap:** at most one a page, opening a paragraph: Sentient 700 in slate, three lines deep.

## Surfaces

- 1px `--color-rule` hairlines on divisions, rows and frames; one 2px slate rule a page is the heaviest line.
- Square corners on every surface, 3px only on an outlined control. No cards, no shadows, no glass: depth is a hairline and a paper step.
- Bands: a `--color-paper-2` band, or one `--color-ink` band with plaster type. Two bands a page at most; never a slate field.
- Photographs: still life and rooms in warm daylight: glass on stone, a bottle and its shadow, a material close up, a bench, a window, a quiet street; from arm's length to across a room, one subject a frame with air inside the picture, never a face to camera and never a cool or flash-lit cast. Printed soft and warm (the `photo:` line). Square, no mat, no shadow; a 1px inset ring of ink at 6% where a pale picture meets the plaster. The label sits beside or beneath in the label voice; a head never sits on a photograph, except one full-bleed picture, where it takes the calmest third over an ink scrim and turns plaster.
- No texture, no mesh, no blur.

## Controls

- A hairline-outlined control in ink at 3px (hover fills ink, plaster text) beside an underlined text link with a slate underline. No colour-filled control anywhere.
- Inputs square, 48px tall, a 1px `--color-muted` edge, the slate focus ring.
- The slate stays under 4% of a screen: link underlines, one `<mark>` in running text (never in a head), the one 2px rule, the drop cap. Never a wash.

## Motion

One entrance: the h1 fades in once over `--dur-long` on `--ease-out`. A slate underline grows on link hover and the outlined control fills over `--dur-short`. Photographs never move; nothing else does either.

## Voice

Hand-set, literary, object-precise: verbs over adjectives; name the object, the material, the number made and the days the door is open. Short sentences, no superlatives, never "shop now" or "discover".

## Do-nots

- Never a warm accent; the signal is cool slate under chroma 0.09.
- Never a bright pop; slate is nearly ink, and a saturated blue reads as a product page.
- Never a thin or high-contrast cut; Sentient is bold and soft-contrast.
- Never serif running text; Sentient in paragraphs turns the page into a broadsheet.
- Never a card, a drop shadow, a mat inside a frame or a colour-filled button; a hairline frames every surface and a photograph meets the plaster square.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=sentient@700&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500&display=swap" rel="stylesheet">
```

```css
body { color: var(--color-ink-2); }
h1, h2, h3 { font-weight: var(--display-weight); color: var(--color-ink); }
.dropcap::first-letter { float: left; font: var(--display-weight) 3.9em/0.82 var(--font-display); padding: 0.06em 0.08em 0 0; color: var(--color-accent); }
.btn { border: var(--rule-hair) solid var(--color-ink); border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); color: var(--color-ink); background: transparent;
  transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out); }
.btn:hover { background: var(--color-ink); color: var(--color-paper); }
a { color: inherit; text-decoration-color: var(--color-accent); text-underline-offset: 0.2em; }
figure img { display: block; width: 100%; height: 100%; object-fit: cover; outline: var(--rule-hair) solid color-mix(in oklab, var(--color-ink) 6%, transparent); outline-offset: calc(var(--rule-hair) * -1); }
figcaption { margin-top: var(--space-sm); font: 500 var(--text-sm)/1.45 var(--font-body); color: var(--color-muted); }
.band { background: var(--color-paper-2); }
.rule--slate { border-top: 2px solid var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 22%, transparent); }
```
