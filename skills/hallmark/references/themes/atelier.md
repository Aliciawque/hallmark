---
name: Atelier
slug: atelier
genre: editorial
paper: light 94.5 76
display: roman-serif Sentient
accent: cool 248
posture: restrained
keywords: fashion, atelier, couture, fragrance, gallery, exhibition, museum, ceramics, furniture, homeware, architecture, design studio, lookbook, collection, craft, small-batch, made by hand, brand story, luxury, object, hotel, boutique hotel, hospitality, stay
material: limewash paper, deep umber ink, Sentient in two weights over Hanken Grotesk, hairlines with an ink head rule, square corners, still photographs in warm daylight, one cool slate signal
photo: warm con=-6 vib=-10
pictured: Gallery Hang, Stage hero
---

# Atelier

The register of a gallery's wall text or a maker's catalogue: limewash paper, deep umber ink, Sentient bold in heads and regular at statement size, Hanken Grotesk for reading, hairlines under an ink head rule, square corners, one slate signal nearly as dark as the ink. Still lifes and rooms in warm daylight hang square with a wall label; between them the catalogue speaks: figures like entry numbers, ruled tables, a statement. Not a cream page with a thin luxury serif, not a product page with a blue button.

## Tokens

```css
:root {
  --color-paper: oklch(94.5% 0.010 76); --color-paper-2: oklch(91.8% 0.013 74); --color-paper-3: oklch(88% 0.015 72);
  --color-ink: oklch(19% 0.024 52); --color-ink-2: oklch(31% 0.018 54); --color-muted: oklch(47% 0.014 60);
  --color-rule: oklch(81% 0.011 70);
  --color-accent: oklch(41% 0.075 248); --color-accent-ink: oklch(96% 0.008 76); --color-focus: oklch(50% 0.095 248);
  --font-display: "Sentient", Georgia, serif; --font-body: "Hanken Grotesk", system-ui, sans-serif;
  --font-outlier: var(--font-body);
  --radius-card: 0; --radius-pill: 3px; --rule-hair: 1px; --rule-head: 1px; --shadow-card: none;
  --tracking-display: -0.018em; --tracking-statement: -0.022em; --display-weight: 700; --statement-weight: 400;
}
```

## Type

- **Display:** Sentient 700 for every head, `--tracking-display`, line-height 1.02 to 1.08, sentence case, roman. One weight and one colour a head.
- **Statement and figure:** Sentient 400 at `--text-display-s` or larger, `--tracking-statement`, line-height 1.1: a sentence set across the columns, a number in a figure row, an entry numeral. The regular cut is the gallery's voice; never in a head, never under 40px.
- **Body:** Hanken Grotesk 400, line-height 1.6, `--color-ink-2`; never prose in the serif. Three weights a page: Sentient 400 and 700, Hanken 400; a label or control is 400 in ink against muted.
- **Labels, captions, meta:** the wall label: Hanken 400 a step smaller, sentence case, untracked; the object in ink, then the material, number or day in `--color-muted`. Never capitals or mono.
- **Drop cap:** at most one a page, opening a paragraph: Sentient 700 in slate, three lines deep.

## Surfaces

- 1px `--color-rule` hairlines on rows and divisions; a table, a list or a figure row opens on one `--rule-head` rule in ink, the catalogue's head rule. One 2px slate rule a page is the heaviest line.
- Square corners on every surface, 3px only on an outlined control. No cards, no shadows, no glass: depth is a hairline and a paper step.
- Bands: `--color-paper-2` for a form or a table, one `--color-ink` band with plaster type. Two bands a page at most; never a slate field.
- Photographs: still life and rooms in warm daylight (glass on stone or wood, a bottle and its shadow, a material close up, a quiet room), one subject a frame, never a face to camera or a cool cast. Hung square, no mat, no shadow, a 1px ink ring at 6% inside; the label beside or beneath; a head crosses a photograph only full-bleed, over an ink scrim.
- No texture, no mesh, no blur.

## Range

- **Statement:** one sentence of the brief in Sentient 400 across nine or ten columns, a wall-text paragraph beneath opening on the slate drop cap.
- **Figures:** the brief's numbers in Sentient 400 at display size under the ink head rule, a two-line wall label beneath, hairlines between; catalogue entries, never a counter.
- **Table or timetable:** hours, days, editions, sizes or a price list as a ruled table under the ink head rule: the row's name in Sentient 700 at title size, values in Hanken tabular figures, a closed or sold-out row in muted, never struck through.
- **Steps or rows:** a real ordered list hung from hairlines, each numeral in Sentient 400 at section size, the title in Sentient 700, one line of Hanken beside it; and a form on the paper-2 band with its choices set as square cells joined edge to edge.

## Controls

- A hairline-outlined control in ink at 3px (hover fills ink, plaster text) beside an underlined text link with a slate underline. No colour-filled control anywhere.
- Inputs square, 48 to 52px, a 1px `--color-muted` edge, paper fill; a chosen cell takes a 1px ink inset ring, the slate focus ring on the keyboard only.
- The slate stays under 4% of a screen: link underlines, the drop cap, the one 2px rule, a focus ring. Never a wash.

## Motion

One entrance: the h1 fades in once over `--dur-long` on `--ease-out`. A slate underline thickens on link hover and the outlined control fills over `--dur-short`. Photographs never move; nothing else does either.

## Voice

Hand-set, object-precise: name the object, the material, the number made, the days the door is open. Short declaratives, no superlatives, never "shop now" or "discover".

## Do-nots

- Never a warm accent; the signal is cool slate under chroma 0.09.
- Never a thin or high-contrast cut; Sentient regular only at statement size.
- Never serif running text; Sentient in paragraphs turns the page into a broadsheet.
- Never a card, a drop shadow, a mat inside a frame or a colour-filled button; a hairline frames every surface and a photograph meets the plaster square.
- Never two still lifes side by side at one size; a pair hangs at two heights or two widths, like work on a wall.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=sentient@400,700&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400&display=swap" rel="stylesheet">
```

```css
body { color: var(--color-ink-2); line-height: 1.6; }
h1, h2, h3 { font-weight: var(--display-weight); color: var(--color-ink); }
.statement, .figure { font: var(--statement-weight) var(--text-display-s)/1.1 var(--font-display); letter-spacing: var(--tracking-statement); color: var(--color-ink); }
.ruled { border-top: var(--rule-head) solid var(--color-ink); } .ruled > * + * { border-top: var(--rule-hair) solid var(--color-rule); }
.dropcap::first-letter { float: left; font: var(--display-weight) 3.9em/0.82 var(--font-display); padding: 0.06em 0.08em 0 0; color: var(--color-accent); }
.btn { border: var(--rule-hair) solid var(--color-ink); border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); color: var(--color-ink); background: transparent;
  transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out); }
.btn:hover { background: var(--color-ink); color: var(--color-paper); }
figure img { outline: var(--rule-hair) solid color-mix(in oklab, var(--color-ink) 6%, transparent); outline-offset: calc(var(--rule-hair) * -1); }
figcaption { margin-top: var(--space-sm); font: 400 var(--text-sm)/1.45 var(--font-body); color: var(--color-muted); } figcaption b { display: block; font-weight: 400; color: var(--color-ink); }
.band { background: var(--color-paper-2); } .rule--slate { border-top: 2px solid var(--color-accent); }
```
