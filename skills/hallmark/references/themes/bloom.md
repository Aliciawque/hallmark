---
name: Bloom
slug: bloom
genre: atmospheric
paper: light 97 72
display: grotesk-sans Ranade
accent: warm 36
posture: committed
keywords: generative, ai creative, music, song, video, image, voice, art, make, create, compose, render, imagine, prompt, creative studio, playground, expressive, warm, daylight, consumer creative, portrait, headshot, selfie, retouch
material: warm off-white paper lit by two terracotta blooms, warm umber ink, Ranade throughout with one roman Gambarino figure or line, raised warm surfaces, one terracotta signal over a soft clay wash
photo: warm exp=4
pictured: Workbench, Stage hero
---

# Bloom

Daylight on paper: warm off-white stock lit by two fixed terracotta blooms, warm umber ink, Ranade throughout with one roman Gambarino moment, raised warm surfaces and a terracotta signal. It feels human because the warmth sits in the light, in a humanist face that still shows the pen, and in that one serif figure, while every head stays plain. It is not a dark generative canvas with neon glows, not a cream editorial page, and not a terracotta poster.

## Tokens

```css
:root {
  --color-paper: oklch(97% 0.010 72); --color-paper-2: oklch(94.6% 0.013 70); --color-paper-3: oklch(91.5% 0.016 66);
  --color-ink: oklch(21% 0.024 40); --color-ink-2: oklch(31% 0.022 46); --color-muted: oklch(49% 0.02 56);
  --color-rule: oklch(88% 0.014 64);
  --color-accent: oklch(53% 0.145 36); --color-accent-2: oklch(66% 0.10 55); --color-accent-soft: oklch(53% 0.145 36 / 0.11);
  --color-accent-ink: oklch(98.5% 0.008 72); --color-focus: oklch(53% 0.145 36);
  --font-display: "Ranade", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: "Gambarino", Georgia, serif;
  --font-code: "Geist Mono", ui-monospace, monospace;
  --radius-card: 18px; --radius-inner: 10px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(21% 0.024 40 / 0.06), 0 18px 36px -18px oklch(21% 0.024 40 / 0.26);
  --shadow-lift: 0 2px 4px oklch(21% 0.024 40 / 0.07), 0 36px 72px -32px oklch(45% 0.1 40 / 0.34);
  --tracking-display: -0.024em; --display-weight: 600;
}
```

## Type

- **Display:** Ranade at `--display-weight` (600, within 500 to 700), one weight for every head, `--tracking-display`, line-height 1.04 to 1.08, sentence case, roman, one colour: the ink.
- **Body:** Ranade 400 at 17 to 18px, line-height 1.55; 500 for labels and controls. Three weights in all.
- **The serif moment:** Gambarino 400, roman, once a page: one figure set at 160px or more (the time a thing takes, the size of a free tier) or one lede sentence. Never a head, never italic, never beside a second serif.
- **Labels, captions, tags, meta:** Ranade 500 a step smaller, sentence case, `--color-muted`. Geist Mono only for timecodes and figures inside the built product, never on a tag.

## Surfaces

- The paper is lit: two warm blooms and no more, `--color-accent` at the top right near 10% alpha and `--color-accent-2` at the bottom left near 7%, fixed and static (gate 29's allowance). They count as paper, not accent.
- Raised warm surfaces, never hairline boxes: `--color-paper` or `--color-paper-2` lifted by `--shadow-card`; the one surface that matters most on a screen takes `--shadow-lift`, a warm cast. Radius 18px outside, `--radius-inner` for anything nested, never an outline with a shadow.
- Bands: a `--color-paper-2` or `--color-paper-3` band, two a page at most; never an ink band, never a terracotta field. `--color-accent-soft` washes a track, a tag or a selected row.
- Photographs: daylight at home, close and warm: an instrument by a window, hands at a table, people from behind or cropped at the shoulder, never a face to camera and never a studio at night. Card radius, an inset ink outline at 8%, no shadow; a caption beneath in the label voice.
- No texture, no glass, no mesh. Every neutral carries a warm cast, hue 40 to 72.

## Range

- **The product, built large on a raised surface:** lanes, a timeline with a playhead, a list of parts as rows with their own controls, the accent wash marking what the user made; a second angle cropped close lower down.
- **One figure in the serif:** a single real number in Gambarino at statement size beside a plain Ranade label and a raised surface that shows what happens in that time.
- **Before and after as two surfaces:** what goes in on a flat `--color-paper-2` well, what comes out lifted beside it, the same rows aligned across both.
- **Questions and plans as soft rows:** an FAQ or a free tier as rows on a `--color-paper-2` band, parted by space and a warm rule rather than boxes, the one action a terracotta pill.

## Controls

- A terracotta-filled pill with `--color-accent-ink` text beside a hairline-outlined pill in ink; press sinks it 1px and drops the shadow.
- Links in terracotta, underlined on hover; inputs 52px at the pill radius with a 1px `--color-muted` edge on `--color-paper`.
- The terracotta stays under 8% of a screen: the filled pill, links, small tags, a lane.

## Motion

One settle: one surface rises once over `--dur-long` on `--ease-out`, or one line types in once and stays; never both. Hover deepens the shadow of a surface that links. The blooms never move.

## Voice

Warm, daylight, expressive, specific: the verb (hum, make, listen), the output (song, part, scene) and where it happens (the kitchen, the walk home).

## Do-nots

- Never a dark canvas; the paper stays at L 97.
- Never a terracotta field or card; a large terracotta area reads as a warning colour.
- Never a hard-edged, drifting or third bloom.
- Never an italic serif, and never the serif in a head or in two places.
- Never the dark studio stock (a microphone in a pop filter, a neon desk, a face at the mic).

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=ranade@400,500,600&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=gambarino@400&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
body { color: var(--color-ink-2); }
body::before { content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(42% 38% at 72% 16%, color-mix(in oklab, var(--color-accent) 10%, transparent), transparent 70%),
              radial-gradient(46% 40% at 18% 90%, color-mix(in oklab, var(--color-accent-2) 7%, transparent), transparent 72%); }
h1, h2, h3 { font-weight: var(--display-weight); color: var(--color-ink); }
.serif-figure { font: 400 clamp(8rem, 16vw, 15rem)/0.85 var(--font-outlier); color: var(--color-ink); }
.surface { background: var(--color-paper); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.surface--lead { box-shadow: var(--shadow-lift); }
.btn { border: var(--rule-hair) solid var(--color-ink); border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); color: var(--color-ink); font-weight: 500; }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
a { color: var(--color-accent); text-underline-offset: 0.2em; }
```
