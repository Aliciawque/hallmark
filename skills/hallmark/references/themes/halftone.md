---
name: Halftone
slug: halftone
genre: playful
paper: light 96.5 92
display: slab-serif Ultra
accent: warm 33
posture: committed
keywords: drinks, soda, food brand, print shop, zine, magazine, record label, packaging, campaign, label, bottle, can, screen print, bold, one colour, retail, craft, loud, fruit, snack
material: butter-cream stock, brown-black ink, Ultra over Chivo, three-pixel ink rules and square wells, one vermilion printed solid and through a dot screen, photographs in full colour
photo: natural vib=25 sat=10 con=6
pictured: Can Label, Settled hero
---

# Halftone

A loud one-colour print voice: butter-cream stock, brown-black ink, a fat Ultra slab for heads, Chivo for everything else, 3px ink rules and one vermilion that prints solid on controls and as a dot screen on a band or a well. Photographs are the only full colour on the page, close and bright like the product shot on a label. It feels screen-printed because there is one ink and its dots fade from solid to nothing, not because anything is drawn. It is not a comic-book pop-art page and not a pastel snack brand.

## Tokens

```css
:root {
  --color-paper: oklch(96.5% 0.024 92); --color-paper-2: oklch(93% 0.034 90); --color-paper-3: oklch(88% 0.045 88);
  --color-ink: oklch(24% 0.035 40); --color-ink-2: oklch(34% 0.04 42); --color-muted: oklch(45% 0.045 45);
  --color-rule: oklch(84% 0.035 82);
  --color-accent: oklch(54.5% 0.215 33); --color-accent-ink: oklch(97% 0.02 92); --color-focus: oklch(52% 0.2 33);
  --color-dot: var(--color-accent); --halftone-size: 12px; --halftone-dot: 3px;
  --font-display: "Ultra", ui-serif, Georgia, serif; --font-body: "Chivo", ui-sans-serif, sans-serif;
  --radius-card: 0; --radius-input: 3px; --radius-pill: 999px; --rule-hair: 1px; --rule-bar: 3px;
  --shadow-card: none;
  --tracking-display: 0.005em;
}
```

Committed: the spot carries the screen, the controls and a field band; nothing else is coloured but the photographs. Three stocks, stated in the stamp (`halftone: cream`).

| Stock | Paper and ink | The spot |
| --- | --- | --- |
| **Cream and vermilion** (default) | the tokens above | `oklch(54.5% 0.215 33)` |
| **Lemon on black** | `oklch(19% 0.01 60)` under `oklch(96% 0.02 90)` | yellow `oklch(88% 0.17 95)` with dark ink on it |
| **Blood orange** | the colour goes into the stock: `oklch(72% 0.17 45)` under plum `oklch(24% 0.06 25)` | the plum ink is also the spot, so the dots print dark |

## Type

- **Display:** Ultra 400, its only weight, roman, sentence case, line-height 1.08 (Ultra's descenders touch the next line any tighter), `--tracking-display`; one colour per head.
- **Body:** Chivo 400, 16 to 17px, line-height 1.55, in `--color-ink-2`; Chivo 700 on controls.
- **Labels, tags, table heads, captions:** Chivo 500 a step smaller, sentence case, untracked; their authority comes from the 3px rules and the fat slab. No mono; figures are Chivo with `tabular-nums`.

## Surfaces

- Rules do the work of borders: `--rule-bar` in ink across the top of a section, a table or a list, `--rule-hair` in `--color-rule` between rows.
- A well is the one boxed surface: `--color-paper-2` inside a `--rule-bar` ink border, square, with nothing boxed inside it. No shadow anywhere.
- Radii: 3px on buttons and inputs, a full pill on a chip; wells, tags and photographs are square.
- Bands: `--color-paper-2`, a spot field with `--color-accent-ink` text, or `--color-ink` with cream text. Two a page at most.
- Photographs: the product and what goes into it, close and bright (a can beaded with cold, a cut lemon, a knuckle of ginger, bubbles climbing a glass), hard daylight on a plain ground, nothing moody. The page's only full colour, lifted a little (the `photo:` line); square, a 1px ink hairline, no shadow; a caption beneath names what is in it. The spot never tints a picture.
- The screen (`texture.md` § Halftone): a `--halftone-dot` dot on a `--halftone-size` cell in the spot, masked to fade from solid to nothing, on a band or a well; one screened field per section, never under or across type or a photograph.

## Controls

- A spot-filled button in Chivo 700 at 3px beside a plain `--rule-bar` spot underline with no box.
- Links in ink with a spot underline; inputs at 3px with a 1px ink border.
- The spot sits on controls, the screen, a field band and the focus ring; never on body type.

## Motion

State only, `--dur-short` on `--ease-out`: a button darkens one step. The screen never moves: nothing on scroll, nothing ambient, no dots drifting.

## Voice

The label: the fruit, the calories, the size of the can, the price of the box. Blunt, sweet and specific; never a lifestyle.

## Do-nots

- Never a second ink; one spot does dots, buttons and fields, and a blue link on the cream is a different printer.
- Never a gradient that is not dots; a fade is a screen from solid to nothing.
- Never dots under or across type or a photograph.
- Never a photograph toned, tinted or dimmed; it prints as the thing looks.
- Never a synthesised bold Ultra, a soft shadow or a rounded well.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Ultra&family=Chivo:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: 400; line-height: 1.08; }
.btn { padding: var(--space-md) var(--space-lg); border-radius: var(--radius-input); font: 700 var(--text-sm) var(--font-body); background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { background: none; color: var(--color-ink); padding: var(--space-md) 0 var(--space-xs); border-radius: 0; border-bottom: var(--rule-bar) solid var(--color-accent); }
.well { border: var(--rule-bar) solid var(--color-ink); background: var(--color-paper-2); }
.ruled { border-top: var(--rule-bar) solid var(--color-ink); } .ruled > * { border-bottom: var(--rule-hair) solid var(--color-rule); }
.photo { outline: var(--rule-hair) solid var(--color-ink); outline-offset: calc(-1 * var(--rule-hair)); }
.halftone { position: relative; isolation: isolate; }
.halftone::before { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(var(--color-dot) var(--halftone-dot), transparent calc(var(--halftone-dot) + 0.5px)) 0 0 / var(--halftone-size) var(--halftone-size);
  mask: linear-gradient(110deg, transparent 45%, var(--color-ink) 95%); }
::selection { background: color-mix(in oklab, var(--color-accent) 30%, transparent); }
```
