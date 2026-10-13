---
name: Hum
slug: hum
genre: playful
paper: light 97 95
display: rounded-sans Chillax
accent: chromatic-yellow 95
posture: full-palette
keywords: daily, habit, streak, practice, learning, reading, curiosity, mood, energy, friendship, community, kids, family, parents, school, game, puzzle, creative, playful, alive
material: cream paper pulled toward pear-yellow, blue-black ink, Chillax throughout, round corners and a press you can feel, three accents that never blend
photo: natural vib=12 exp=4
pictured: Bento Grid, Settled hero
---

# Hum

Cheerful and tactile without turning childish: cream paper pulled toward pear-yellow, a blue-black ink, Chillax from head to label (its single-storey a and g read like an early reader's page), round corners, and a primary control that presses down like a real key. Three accents never blend: pear for the action, blue for links, coral for one loud moment; mint is the one field. Not a pastel nursery template, not a rainbow page.

## Tokens

```css
:root {
  --color-paper: oklch(97% 0.012 95); --color-paper-2: oklch(94% 0.016 95); --color-paper-3: oklch(91% 0.020 95);
  --color-ink: oklch(20% 0.012 250); --color-ink-2: oklch(28% 0.012 250); --color-muted: oklch(48% 0.012 250);
  --color-rule: oklch(88% 0.014 95);
  --color-accent: oklch(86% 0.18 95); --color-accent-deep: oklch(72% 0.16 95); --color-accent-ink: oklch(20% 0.012 250);
  --color-accent-2: oklch(51% 0.17 235); --color-accent-3: oklch(68% 0.24 18);
  --color-mint: oklch(80% 0.16 150); --color-glow: oklch(76% 0.20 95); --color-focus: oklch(51% 0.17 235);
  --font-display: "Chillax", "Geist", ui-rounded, ui-sans-serif, sans-serif; --font-body: var(--font-display);
  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 20px; --radius-input: 12px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(20% 0.012 250 / 0.06), 0 10px 24px -12px oklch(20% 0.012 250 / 0.18);
  --tracking-display: -0.025em; --display-weight: 600;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); --ease-snap: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Type

- **Display:** Chillax 600, `--tracking-display`, line-height 1.05, sentence case. A number inside a head takes the head's weight and colour.
- **Body:** Chillax 500 at 16 to 18px, line-height 1.55 (its 400 is too thin for a paragraph); emphasis is a pear highlighter band behind the words, never inside a head. No serif anywhere.
- **Labels, captions, table heads, units:** Chillax 500 a step smaller, sentence case, untracked, in `--color-muted`. Geist Mono only inside code.

## Surfaces

- Round everywhere: wells and frames at 20px, inputs at 12px, controls and tags as pills, concentric inside. Radius is a per-build lever (28px for children, 14px for a quiet tool); no corner is square.
- Rules are rare: 1px `--color-rule` on an input or between rows; most divisions are a paper step.
- Depth: wells sit flat on `--color-paper-2` or `--color-paper-3`; `--shadow-card`, a soft two-step cast, only on a surface that is a link.
- Bands: `--color-paper-2`, an ink band with paper text, or one accent field (pear or mint, with ink on it). Two a page at most.
- Photographs: bright daylight at a child's height: small hands turning a page, books piled on a bed, a kitchen table after school; never a child's face, never a posed family smile. 20px radius, a 1px inset outline of ink at 6%; captions under the frame in the label voice; no type on a photograph.
- No texture, no grain.

## Controls

- The press: the primary is a pear pill on a solid `--color-accent-deep` edge (an offset shadow, no blur) under a soft `--color-glow` cast; hover lifts it, active presses it down to a 1px edge. The secondary is a pill with a 1px `--color-rule` ring and no edge.
- Each accent owns a job: pear the primary action; blue (`--color-accent-2`, dark enough to read as type) links, hover tints and the focus ring; coral (`--color-accent-3`) one high-energy fill with ink on it. Mint appears once at most, as a tag or a field.
- Inputs: 12px radius, a 1px `--color-rule` border on `--color-paper`, the blue focus ring.

## Motion

Spring posture declared (gate 12): the spring runs on the primary control only, on `--ease-spring`; everything else eases out on `--ease-snap`. The press runs `--dur-micro` on hover and half that on active, never `scale()`; a linked surface lifts 4px over `--dur-short`. Nothing loops or counts up.

## Voice

Warm, smart, casual, direct. Sentence case, verbs over nouns, honest numbers only.

## Do-nots

- Never a serif, never pure white paper, never a square corner.
- Never a gradient between two accents and never a rainbow ground.
- Never one restrained accent; three are on stage, each on its own job.
- Never emoji, stock icons or a drawn character, plant or sticker for personality; the press, the colour and the photographs carry it.
- Never the spring on anything but the primary control.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=chillax@500,600&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: var(--display-weight); }
.btn { border: 0; border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); font-weight: 600; }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink);
  box-shadow: 0 4px 0 0 var(--color-accent-deep), 0 6px 12px -3px color-mix(in oklab, var(--color-glow) 45%, transparent);
  transition: transform var(--dur-micro) var(--ease-spring), box-shadow var(--dur-micro) var(--ease-spring); }
.btn--primary:hover { transform: translateY(-2px); box-shadow: 0 6px 0 0 var(--color-accent-deep), 0 12px 22px -4px color-mix(in oklab, var(--color-glow) 45%, transparent); }
.btn--primary:active { transform: translateY(3px); box-shadow: 0 1px 0 0 var(--color-accent-deep); transition-duration: calc(var(--dur-micro) / 2); }
.btn--secondary { background: var(--color-paper); color: var(--color-ink); box-shadow: inset 0 0 0 var(--rule-hair) var(--color-rule); }
.well { background: var(--color-paper-2); border-radius: var(--radius-card); }
mark { background: color-mix(in oklab, var(--color-accent) 55%, transparent); color: inherit; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
a { color: var(--color-accent-2); }
::selection { background: color-mix(in oklab, var(--color-accent) 60%, transparent); color: var(--color-ink); }
```
