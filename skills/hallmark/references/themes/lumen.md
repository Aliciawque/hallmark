---
name: Lumen
slug: lumen
genre: atmospheric
paper: dark 12.5 290
display: roman-serif Instrument Serif
accent: warm 58
posture: restrained
keywords: inference, model, llm, ai tool, agent, voice, synthesis, api, gpu, serverless, runtime, tokens, latency, open models, developer, research lab, ml platform, dev tools, premium
material: violet-black ground, near-white ink, lowercase Instrument Serif heads over Geist, hairline wells, a faint blueprint grid, one molten brass signal and one rose verb
photo: duotone paper ink-2
pictured: Quarry, Split hero
---

# Lumen

A night console with a literary voice: a violet-black ground, near-white ink, Instrument Serif set all in lowercase over a Geist body, hairline wells and one molten brass signal. Cool dark, warm light: the warmth is rationed to the brass and one rose verb, so the page reads engineered and quietly lit at once. It is not a neon dark mode, an orb on black, a purple poster or a serif magazine.

## Tokens

```css
:root {
  --color-paper: oklch(12.5% 0.026 290); --color-paper-2: oklch(16.5% 0.029 290); --color-paper-3: oklch(20.5% 0.031 290);
  --color-ink: oklch(96% 0.01 300); --color-ink-2: oklch(86% 0.016 298); --color-muted: oklch(68% 0.026 295);
  --color-rule: oklch(27% 0.034 290); --rule-blueprint: oklch(96% 0.01 300 / 0.045);
  --color-accent: oklch(79% 0.15 58); --color-accent-2: oklch(70% 0.15 14); --color-accent-ink: oklch(13% 0.026 290);
  --color-focus: oklch(79% 0.15 58);
  --font-display: "Instrument Serif", ui-serif, Georgia, serif; --font-body: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 8px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 24px 60px -28px oklch(5% 0.02 290 / 0.6);
  --tracking-display: -0.01em;
}
```

A second drop, `day`: bone `oklch(97% 0.008 290)` under `oklch(18% 0.02 290)`, an indigo `oklch(46% 0.24 268)` signal with bone text, the verb in `oklch(56% 0.16 18)`. The drop is stated in the stamp (`lumen: night`); change it between Lumen pages.

## Type

- **Display:** Instrument Serif 400, roman, all lowercase, `--tracking-display`, line-height 1.05. Lowercase is the register for heads, nav, controls and labels; prose keeps sentence case so a model name survives.
- **Body:** Geist 400, 500 and 600, `tabular-nums` wherever a figure appears.
- **Labels, captions, table heads, meta:** Geist 500 a step smaller, lowercase, untracked, `--color-muted`.
- **Readouts:** JetBrains Mono 400 and 500 at 12px, lowercase, untracked, only for a measured value with its unit (a p50 latency, a token count) and for code.
- **The verb:** the one accented word on the page, in the hero head only, always a verb, in `--color-accent-2` with a 1px underline that draws in (stamp `waive 38iii`). Never a noun, never two words, never a second head.

## Surfaces

- Hairlines contain: 1px `--color-rule` on wells, rows and inputs; radius 8px on surfaces, pills on controls and tags.
- Depth is a lightness step from paper to paper-3; a surface that must lift trades its hairline for `--shadow-card` in the ground's own dark, never a glow.
- Bands: `--color-paper-2` or `--color-paper-3`, two a page at most; no accent field, and a night page never takes a bone band.
- Photographs: one at most on this words-and-code material, a wide band (21:9) of the machines the work runs on: an aisle of racks, cabling, a lit rack face, held level. It prints in the ground's violet (duotone paper to ink-2), its highlights under the type. 8px radius and a 1px `--color-rule` edge, none when it bleeds; a caption beneath names the region or the hardware; no head sits on it.
- Texture: the blueprint grid, 1px `--rule-blueprint` lines on a 48px pitch, on one band or well and never under running text (stamp `waive 47c`). No glass, no blur.

## Controls

- The control pair: a solid brass pill with `--color-accent-ink` text beside a hairline pill in `--color-rule`, both lowercase.
- Links take a brass underline on hover; inputs sit on `--color-paper-2` with a 1px `--color-rule` border at 8px.
- The brass stays under 5% of a screen: the primary fill, the focus ring, a link's hover, one readout. The rose belongs to the verb alone.

## Motion

One reveal: the verb's underline draws in once over `--dur-long`. Otherwise state only: a hairline pill takes `--color-paper-2` on hover. No ambient loop, no rising heads, no stagger.

## Voice

Engineered, plain, specific: the model, the latency, the region, the price. Lowercase heads read like a note in a lab book, never cute. No exclamation marks.

## Do-nots

- Never a drawn light: no orb, lamp, ring or halo behind a head.
- Never let the violet climb: the ground stays near black; a violet field or a violet-to-blue gradient is the generated look, not this theme.
- Never colour a noun, never a second accented word; one verb, in the hero.
- Never sentence-case or title-case heads; lowercase is the voice.
- Never a warm ground or a third warm colour; the brass and the rose verb carry all the warmth.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Geist:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
body { font-variant-numeric: tabular-nums; }
h1, h2, h3, nav, label, th, figcaption, .btn { text-transform: lowercase; }
h1, h2, h3 { font-weight: 400; }
.verb { display: inline-block; color: var(--color-accent-2); }
.verb::after { content: ""; display: block; height: var(--rule-hair); background: currentColor; transform-origin: left; animation: draw var(--dur-long) var(--ease-out) both; }
@keyframes draw { from { transform: scaleX(0); } }
.btn { border: var(--rule-hair) solid transparent; background: none; border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); font-weight: 500; }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { border-color: var(--color-rule); color: var(--color-ink); }
.btn--secondary:hover { background: var(--color-paper-2); }
.well { background: var(--color-paper-2); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); }
.blueprint { background-image: linear-gradient(var(--rule-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--rule-blueprint) 1px, transparent 1px); background-size: 48px 48px; }
::selection { background: color-mix(in oklab, var(--color-accent) 30%, transparent); }
```
