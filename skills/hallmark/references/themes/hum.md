---
name: Hum
slug: hum
genre: playful
paper: light 97 95
display: rounded-sans Chillax
accent: chromatic-yellow 95
posture: full-palette
keywords: daily, habit, streak, practice, learning, reading, curiosity, mood, energy, friendship, community, kids, family, parents, school, game, puzzle, creative, playful, alive
material: cream paper pulled toward pear-yellow, blue-black ink, Chillax throughout, round corners and a press you can feel, three accents that never blend and a mint for growth
photo: natural vib=12 exp=4
pictured: Workbench, Settled hero
---

# Hum

Cheerful and tactile without turning childish: cream paper pulled toward pear-yellow, a blue-black ink, Chillax from head to label (its single-storey a and g read like an early reader's page), round corners, and a primary control that presses down like a real key. Three accents never blend: pear for the action and the one sunny field, blue for links, coral for one loud moment; mint is the colour of growth, as a field or a bar. Not a pastel nursery template, not a rainbow page.

## Tokens

```css
:root {
  --color-paper: oklch(97% 0.012 95); --color-paper-2: oklch(94.5% 0.018 95); --color-paper-3: oklch(91% 0.022 95);
  --color-ink: oklch(20% 0.014 255); --color-ink-2: oklch(29% 0.014 255); --color-muted: oklch(47% 0.014 255);
  --color-rule: oklch(87% 0.016 95);
  --color-accent: oklch(87% 0.175 96); --color-accent-deep: oklch(72% 0.16 92); --color-accent-ink: oklch(20% 0.014 255);
  --color-accent-2: oklch(50% 0.17 250); --color-accent-3: oklch(70% 0.2 22);
  --color-mint: oklch(82% 0.15 152); --color-mint-deep: oklch(48% 0.12 155); --color-glow: oklch(78% 0.19 95); --color-focus: oklch(50% 0.17 250);
  --font-display: "Chillax", ui-rounded, ui-sans-serif, sans-serif; --font-body: var(--font-display);
  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 24px; --radius-input: 14px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(20% 0.014 255 / 0.06), 0 12px 28px -14px oklch(20% 0.014 255 / 0.22);
  --tracking-display: -0.03em; --display-weight: 600;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); --ease-snap: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Type

- **Display:** Chillax 600, `--tracking-display`, line-height 1.02 to 1.05, sentence case. Figures at `--text-display` or larger, tracked -0.04em, their unit at `--text-title`.
- **Body:** Chillax 500 at 17 to 19px, line-height 1.5 (its 400 is too thin for a paragraph); emphasis is a pear highlighter band behind the words, never inside a head. No serif anywhere; two weights, 500 and 600.
- **Labels, captions, table heads, units:** Chillax 500 a step smaller, sentence case, untracked, in `--color-muted`. Geist Mono only inside code.

## Surfaces

- Round everywhere: wells and frames at 24px, inputs at 14px, controls and tags as pills, concentric inside. Radius is a per-build lever (28 to 32px for children, 14px for a quiet tool); no corner is square.
- Rules are rare: 1px `--color-rule` on an input or between figures; most divisions are a paper step.
- Depth: wells sit flat on `--color-paper-2` or `--color-paper-3`; `--shadow-card` only on a surface that is a link.
- Bands: `--color-paper-2`, an ink band with paper text, or one pear field with ink on it. Two a page at most.
- Photographs: bright daylight at a child's height: small hands, a kite, a garden; never a face, never a posed family. Rounded, a 1px inset ink outline at 6%, no type on them; one or two a page.
- No texture, no grain.

## Range

- **Figures on the pear field:** three or four of the brief's numbers at `--text-display` or larger in ink on one pear band, parted by thin ink rules at 20%, each unit beneath in 500.
- **The product's surfaces as a bento:** the app's screens built in HTML, one lead tile on the mint field, one on coral for the loud moment, the rest on paper-2 wells, mixed spans and one photograph at most among them.
- **Steps as wells:** three stages in paper-2 wells, each a numeral at `--text-display-s` in `--color-mint-deep`, a title and a line, with a fragment of the product beneath (a highlighted word, a growing bar, a done chip).
- **A choice as pressable pills:** a working control on the brief's facts (a start day, a plan, an age) as a row of pills, the chosen one in ink, the result a sentence with its key value in a pear highlighter band, updated in place.

## Controls

- The press: the primary is a pear pill on a solid `--color-accent-deep` edge (an offset shadow, no blur) under a soft `--color-glow` cast; hover lifts it, active presses it down to a 1px edge. The secondary is a pill with a 1px `--color-rule` ring and no edge.
- Each accent owns a job: pear the primary action and the one pear field; blue links, hover tints and the focus ring; coral one high-energy fill with ink on it; mint growth (a field, a progress bar in `--color-mint-deep`).
- Inputs: 14px radius, 52px tall, a 1px `--color-muted` border on `--color-paper`, the blue focus ring. A chosen pill is ink with paper type.

## Motion

Spring posture declared (gate 12): the spring runs on the primary control only, on `--ease-spring`; everything else eases out on `--ease-snap`. The press runs `--dur-micro` on hover and half that on active, never `scale()`; a linked surface lifts 4px over `--dur-short`. A growth bar may fill once on arrival; nothing loops or counts up.

## Voice

Warm, smart, casual, direct, written to the grown-up beside the child. Sentence case, verbs over nouns, honest numbers only.

## Do-nots

- Never a serif, never pure white paper, never a square corner.
- Never a gradient between two accents and never a rainbow ground.
- Never one restrained accent; three are on stage, each on its own job.
- Never emoji, stock icons or a drawn character, plant or sticker for personality; the press, the colour and the product carry it.
- Never the spring on anything but the primary control.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=chillax@500,600&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: var(--display-weight); }
.btn { border: 0; border-radius: var(--radius-pill); min-height: 52px; padding: 0 var(--space-lg); font-weight: 600; }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink);
  box-shadow: 0 4px 0 0 var(--color-accent-deep), 0 6px 12px -3px color-mix(in oklab, var(--color-glow) 45%, transparent);
  transition: transform var(--dur-micro) var(--ease-spring), box-shadow var(--dur-micro) var(--ease-spring); }
.btn--primary:hover { transform: translateY(-2px); box-shadow: 0 6px 0 0 var(--color-accent-deep), 0 12px 22px -4px color-mix(in oklab, var(--color-glow) 45%, transparent); }
.btn--primary:active { transform: translateY(3px); box-shadow: 0 1px 0 0 var(--color-accent-deep); transition-duration: calc(var(--dur-micro) / 2); }
.btn--secondary { background: var(--color-paper); color: var(--color-ink); box-shadow: inset 0 0 0 var(--rule-hair) var(--color-rule); }
.well { background: var(--color-paper-2); border-radius: var(--radius-card); }
.field-pear { background: var(--color-accent); color: var(--color-accent-ink); }
mark { background: color-mix(in oklab, var(--color-accent) 60%, transparent); color: inherit; border-radius: var(--space-2xs); box-decoration-break: clone; -webkit-box-decoration-break: clone; }
a { color: var(--color-accent-2); }
::selection { background: color-mix(in oklab, var(--color-accent) 60%, transparent); color: var(--color-ink); }
```
