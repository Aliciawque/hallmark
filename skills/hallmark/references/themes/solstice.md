---
name: Solstice
slug: solstice
genre: editorial
paper: light 94 80
display: high-contrast-serif Yeseva One
accent: warm 24
posture: restrained
keywords: farm, orchard, cider, perry, winery, harvest, seasonal, food, almanac, produce, vineyard, calendar, market, craft drink, label, bottle, rural, slow, sun, midsummer
material: cream paper, warm brown ink and one brown dusk band, Yeseva One over Archivo and Archivo Narrow, 2px ink bars and gold hairlines, square wells on hard paper shadows, photographs in low warm light, one vermilion signal
photo: warm high=-12
pictured: Release Sheet, Stage hero
---

# Solstice

An almanac's warmth: cream paper, warm brown ink, fat Yeseva One heads, Archivo for the reading and Archivo Narrow for the small print, a 2px ink bar and gold hairlines doing the ruling, square wells on hard paper shadows, photographs taken in low late light, one vermilion signal. It reads as seasonal and rural through the ink, the gold, the serif and the light in its pictures, never through drawings of produce or a painted sun. It is not a farmhouse script page and not a terracotta-on-cream template.

## Tokens

```css
:root {
  --color-paper: oklch(94% 0.03 80); --color-paper-2: oklch(97.5% 0.018 85); --color-paper-3: oklch(88% 0.05 78);
  --color-ink: oklch(27% 0.05 50); --color-ink-2: oklch(36% 0.05 50); --color-muted: oklch(48% 0.06 55);
  --color-rule: oklch(82% 0.06 76);
  --color-accent: oklch(54% 0.20 24); --color-accent-deep: oklch(46% 0.18 24); --color-accent-ink: oklch(97% 0.02 85); --color-focus: oklch(54% 0.20 24);
  --color-gold: oklch(72% 0.14 72); --color-gold-2: oklch(84% 0.11 80); --color-dusk: oklch(25% 0.045 55); --color-slot: var(--color-gold);
  --font-display: "Yeseva One", ui-serif, Georgia, serif; --font-body: "Archivo", ui-sans-serif, sans-serif;
  --font-outlier: "Archivo Narrow", ui-sans-serif, sans-serif;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 2px;
  --shadow-card: 10px 10px 0 var(--color-paper-3);
  --tracking-display: -0.012em; --display-weight: 400;
}
```

The signal is vermilion at hue 24, a red with warmth that sits with the gold and the brown, never clay; the gold rules and never fills. Three lights, stated in the stamp (`solstice: long-light`).

| Light | Paper and ink | Signal and gold |
| --- | --- | --- |
| `long-light` (default) | cream under brown, one `--color-dusk` band | the block above |
| `dusk` | `--color-dusk` under cream ink; raised wells stay cream | vermilion keeps its value with cream text, gold `oklch(78% 0.14 80)` |
| `midwinter` | frost `oklch(95% 0.012 230)` under cold brown `oklch(28% 0.03 260)` | vermilion keeps its hue, gold goes pale `oklch(80% 0.06 230)` |

## Type

- **Display:** Yeseva One 400, roman, line-height 1.02, `--tracking-display`, one colour per head; a head on the dusk band may take `--color-gold-2`. Figures take it at display size and up, with lining numerals.
- **Body:** Archivo 400, 17px, line-height 1.6, in `--color-ink-2`; Archivo 500 only for a lead's first words or a table's name column.
- **Small print:** Archivo Narrow 600 at 13 to 14px, sentence case, untracked, the outlier: dates, captions under a photograph, labels in a ruled list, the control pair. No mono.

## Surfaces

- Rules: a `--rule-bar` ink bar under the nav and across the top of a ruled list, `--rule-hair` in `--color-rule` between its rows, a gold hairline under a head inside a well.
- Square everything: no radius on a well, a photograph, an input or a control.
- Depth: a raised well takes a `--rule-bar` ink border, a 1px gold rule inset 6px and the hard `--shadow-card`, an offset with no blur; a cut-out object (a bottle, a jar) may cast the same hard shadow. Never a soft shadow.
- Bands: `--color-paper-2`, or one `--color-dusk` band with cream text; two a page at most, never a vermilion field.
- Photographs: the season in low, late light (fruit on the branch, long grass, a glass outside, trees against a low sun), warm, a little hazy. Square, a 1px ink hairline at 10%, a caption under the frame in the small print. Type on a photograph sits on its shaded side over a brown scrim at 40 to 60%. No texture.

## Range

- **Figures in the fat serif:** the brief's real numbers (the run, the bottle size, the price) in Yeseva One at 9rem and over, gold hairlines between them, the price alone in vermilion, each with a small-print line under it.
- **The label as a ruled list:** a raised cream well with the hard shadow and the gold inset, its facts as rows (style, place, bottle, run, price) with small-print labels left and Yeseva values right, so the product's own label is a section.
- **A statement at the season's size:** one line of Yeseva across ten columns at display size on cream, or in gold-2 on the dusk band.
- **An order that counts:** a working quantity control beside the well, the running total set in Yeseva at section size, the one vermilion button under it.

## Controls

- The pair: a vermilion-filled square button in Archivo Narrow 600 with `--color-accent-ink` text, `--color-accent-deep` on hover, beside a plain one in ink over a 2px ink underline, no box.
- Links underline in gold and turn vermilion on hover; inputs and steppers are square on `--color-paper-2` with a 1px ink border.
- Restrained: vermilion sits on the primary, the focus ring and one figure, under 5% of a screen; gold never fills.

## Motion

Quiet: a row lights on hover and a total updates as a stepper moves, over `--dur-short` on `--ease-out`. No reveal, no counter, no loop, no rising sun.

## Voice

The almanac: the season, the place, the bottle, the run. Plain and warm; never a toast to the good life.

## Do-nots

- Never a second warm colour; a second orange makes a fruit stand.
- Never a neutral ink; a grey-black kills the cream.
- Never a pill, a rounded card, a soft or coloured glow shadow; a raised thing is square, ruled and hard-shadowed.
- Never a drawn sun, hill or field; the season comes from photographs and type.
- Never clay or terracotta in place of vermilion; past hue 28 the theme becomes the cream, serif and clay page every generator makes.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Yeseva+One&family=Archivo:wght@400;500&family=Archivo+Narrow:wght@600&display=swap" rel="stylesheet">
```

```css
h1, h2, h3, .figure { font-family: var(--font-display); font-weight: 400; line-height: 1.02; letter-spacing: var(--tracking-display); }
.small, figcaption, dt { font: 600 var(--text-sm)/1.3 var(--font-outlier); color: var(--color-muted); }
.btn { display: inline-flex; align-items: center; min-height: 48px; padding: 0 var(--space-xl); border: 0; border-radius: 0; font: 600 var(--text-md)/1 var(--font-outlier); background: var(--color-accent); color: var(--color-accent-ink); }
.btn:hover { background: var(--color-accent-deep); }
.btn--plain { background: none; color: var(--color-ink); padding-inline: 0; box-shadow: inset 0 calc(-1 * var(--rule-bar)) 0 var(--color-ink); }
.well { background: var(--color-paper-2); border: var(--rule-bar) solid var(--color-ink); outline: var(--rule-hair) solid var(--color-gold); outline-offset: -8px; box-shadow: var(--shadow-card); }
.band--dusk { background: var(--color-dusk); color: var(--color-paper); }
.cutout { filter: drop-shadow(14px 14px 0 var(--color-paper-3)); }
a { text-decoration-color: var(--color-gold); } a:hover { text-decoration-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-gold) 40%, transparent); }
```
