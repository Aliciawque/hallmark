---
name: Bloom
slug: bloom
genre: atmospheric
paper: light 97 72
display: grotesk-sans Ranade
accent: warm 35
posture: committed
keywords: generative, ai creative, music, song, video, image, voice, art, make, create, compose, render, imagine, prompt, creative studio, playground, expressive, warm, daylight, consumer creative, portrait, headshot, selfie, retouch
material: warm off-white paper lit by two terracotta blooms, warm umber ink, Ranade throughout with one roman Gambarino line, raised warm surfaces, one terracotta signal
photo: warm exp=4
pictured: Kitchen Session, Split hero
---

# Bloom

Daylight on paper: warm off-white stock lit by two fixed terracotta blooms, warm umber ink, Ranade throughout with one roman Gambarino line, raised warm surfaces and a terracotta signal. It feels human because the warmth sits in the light, in a humanist face that still shows the pen, and in that one serif line, while every head stays plain. It is not a dark generative canvas with neon glows and not a cream editorial page.

## Tokens

```css
:root {
  --color-paper: oklch(97% 0.010 72); --color-paper-2: oklch(94.5% 0.012 70); --color-paper-3: oklch(91% 0.014 68);
  --color-ink: oklch(20% 0.022 40); --color-ink-2: oklch(30% 0.022 46); --color-muted: oklch(50% 0.018 58);
  --color-rule: oklch(88% 0.012 65);
  --color-accent: oklch(54% 0.13 35); --color-accent-2: oklch(64% 0.09 55);
  --color-accent-ink: oklch(98% 0.010 72); --color-focus: oklch(54% 0.13 35);
  --font-display: "Ranade", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: "Gambarino", Georgia, serif;
  --font-code: "Geist Mono", ui-monospace, monospace;
  --radius-card: 14px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(20% 0.022 40 / 0.06), 0 16px 32px -16px oklch(20% 0.022 40 / 0.24);
  --tracking-display: -0.022em; --display-weight: 600;
}
```

## Type

- **Display:** Ranade from the variable file at `--display-weight` (600 by default, within 500 to 700), one weight for every head, `--tracking-display`, line-height 1.04 to 1.08, sentence case, roman.
- **Body:** Ranade 400 at 17 to 18px, line-height 1.55; 500 for labels and controls. Three weights in all: 400, 500 and the display weight.
- **The serif line:** Gambarino 400, roman, once a page: a lede sentence or a large numeral. Never a head, never italic.
- **Labels, captions, tags, meta:** Ranade 500 a step smaller, sentence case, `--color-muted`. Geist Mono only inside code and on figures that compare, never on a tag.

## Surfaces

- The paper is lit: two warm blooms and no more, `--color-accent` at the top right near 10% alpha and `--color-accent-2` at the bottom left near 7%, fixed and static, sized within the genre's allowance (gate 29). They count as paper, not accent footprint.
- Raised warm surfaces, never hairline boxes: `--color-paper-2` or `--color-paper-3` lifted by `--shadow-card` (a contact line and a soft warm cast below), never an outline with it; 14px radius, concentric inside.
- Bands: a `--color-paper-2` or `--color-paper-3` band, two a page at most; never an ink band, never a terracotta field.
- Photographs: daylight at home, close and warm: hands on strings or keys, an instrument by a window, a table in morning light, people from behind or cropped at the shoulder, never a face to camera. 14px radius, an inset ink outline at 8%, no shadow. Captions sit under the frame in the label voice; a line set on a photograph rides a `--color-paper-2` plate.
- No texture, no glass, no mesh. Every neutral carries a warm cast, hue 40 to 72.

## Controls

- A terracotta-filled pill with `--color-accent-ink` text beside a hairline-outlined pill in ink.
- Links in terracotta, underlined on hover; inputs 48px at the pill radius with a 1px `--color-muted` edge.
- The terracotta stays under 8% of a screen: the filled pill, links, small tags.

## Motion

One settle: one surface fades in once over `--dur-long` on `--ease-out`, or one line types in once and stays; never both. Hover deepens the shadow of a surface that links. The blooms never move: no drift, no parallax.

## Voice

Warm, daylight, expressive, specific: say the verb (make, hum, describe), the output (song, scene, image) and where it happens (the kitchen, the walk home).

## Do-nots

- Never a dark canvas; the paper stays at L 97.
- Never cool paper, a cool accent or an accent flood; a large terracotta field reads as a warning colour.
- Never a hard-edged, drifting or third bloom; two, soft, low alpha, fixed.
- Never an italic serif line, and never the serif in a head.
- Never the dark studio stock (a microphone in a pop filter, a neon desk, a face at the mic); the warmth is a room in daylight.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=ranade@1&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=gambarino@400&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
body { color: var(--color-ink-2); }
body::before { content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(42% 38% at 72% 16%, color-mix(in oklab, var(--color-accent) 10%, transparent), transparent 70%),
              radial-gradient(46% 40% at 18% 90%, color-mix(in oklab, var(--color-accent-2) 7%, transparent), transparent 72%); }
h1, h2, h3 { font-weight: var(--display-weight); color: var(--color-ink); }
.serif-line { font: 400 var(--text-xl)/1.35 var(--font-outlier); }
.surface { background: var(--color-paper-2); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.photo { border-radius: var(--radius-card); outline: var(--rule-hair) solid color-mix(in oklab, var(--color-ink) 8%, transparent); outline-offset: calc(var(--rule-hair) * -1); }
figcaption { font: 500 var(--text-sm)/1.45 var(--font-body); color: var(--color-muted); }
.btn { border: var(--rule-hair) solid var(--color-ink); border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); color: var(--color-ink); font-weight: 500; }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
a { color: var(--color-accent); text-underline-offset: 0.2em; }
::selection { background: color-mix(in oklab, var(--color-accent) 25%, transparent); }
```
