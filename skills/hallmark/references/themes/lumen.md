---
name: Lumen
slug: lumen
genre: atmospheric
paper: dark 13 265
display: roman-serif Instrument Serif
accent: warm 50
posture: restrained
keywords: inference, model, llm, ai tool, agent, voice, synthesis, api, gpu, serverless, runtime, developer, console, research lab, climate model, ml platform, dev tools, premium
material: a cool-violet ground with a faint blueprint grid, one built light artefact, lowercase serif heads, molten brass
signature: one hand-built light source standing in dead space, lit from inside, under a lowercase serif headline with one coloured verb
---

# Lumen

A cool-violet ground under a 4% blueprint grid, one light artefact built in CSS with its light kept inside its own shape, and a lowercase Instrument Serif head carrying one coloured verb.

## Tokens

```css
:root {
  --color-paper: oklch(13% 0.014 265); --color-paper-2: oklch(17% 0.014 265); --color-paper-3: oklch(21% 0.014 265);
  --color-ink: oklch(96% 0.006 262); --color-ink-2: oklch(86% 0.008 262); --color-muted: oklch(64% 0.012 262);
  --color-rule: oklch(28% 0.016 265); --rule-blueprint: oklch(96% 0.006 262 / 0.04);
  --color-accent: oklch(76% 0.17 50); --color-accent-2: oklch(68% 0.16 18); --color-accent-ink: oklch(13% 0.014 265);
  --color-focus: oklch(76% 0.17 50);
  --font-display: "Instrument Serif", ui-serif, Georgia, serif; --font-body: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 8px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 24px 60px -28px oklch(6% 0.01 265 / 0.55);
  --tracking-display: -0.01em;
}
```

Two drops, stated in the stamp (`lumen: night`); consecutive Lumen pages use different drops unless the brief pins one. `--color-accent-2` is the verb colour on both.

| Drop | Ground and ink | Accent | The light |
| --- | --- | --- | --- |
| **night** (default) | `oklch(13% 0.014 265)` under `oklch(96% 0.006 262)` | brass `oklch(76% 0.17 50)` | emits: the inner gradient pulses slowly |
| **day** | bone `oklch(97% 0.008 265)` under `oklch(18% 0.014 265)` | indigo `oklch(46% 0.24 268)` with the bone as its text | refracts: one accent line enters the object and leaves as three hairlines, static after one 320ms reveal |

## Faces

- **Display:** Instrument Serif 400, roman, all lowercase, `--tracking-display`. Lowercase is the register for heads, nav, controls and labels; prose keeps sentence case so a model name survives.
- **Body:** Geist 400, 500, 600, `tabular-nums` wherever a figure appears.
- **Labels, captions, table heads, meta:** Geist 500 one step smaller, lowercase, `--color-muted`.
- **Readouts:** JetBrains Mono 400 and 500 at 12px, lowercase, untracked, only for a measured value with its unit (a p50 latency, a token count). Mono never sets a caption or a label.
- **The verb:** the one accented word on the page, in the hero head only, always a verb, in `--color-accent-2` with a 1px underline that draws in (stamp `waive 38iii`). Never a noun, never two words, never a second head.

## Material

- The blueprint grid: a hairline grid at about 4% over the ground; nothing is louder than the light source.
- The light artefact, one per page: a rounded rectangle or a circle with a 1px `--color-rule` edge and `overflow: hidden`, holding one radial gradient from the accent at 60% alpha to transparent at 70% (the emit) or one 1px accent line that splits into three hairlines past the centre (the refraction). That is the whole object; the ground stays flat and no bloom leaves it.
- Hairlines contain, shadows carry offset and blur, radii small; elevation is a lightness step from paper to paper-3.
- The control pair: one solid accent pill with `--color-accent-ink` text beside a hairline-bordered pill in `--color-rule`, both lowercase.

## Motion

The night light pulses 3% in intensity on a 4s period and never rotates; the day light reveals once over 320ms then holds. The verb underline draws in over 320ms after a 900ms delay. Nothing else moves: no rising heads, no stagger.

## Voice

Engineered, plain, specific: the model, the latency, the region. No exclamation marks.

## Do-nots

- Never a glowing orb, sphere or ring; the object has an edge.
- Never an `<img>` for the light source; it is built in code.
- Never colour a noun, never a second accented word; one verb in the hero.
- Never two light sources, and never a bloom larger than its object.
- Never sentence-case or title-case heads.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Geist:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
body { font-family: var(--font-body); font-variant-numeric: tabular-nums; color: var(--color-ink); background-size: 48px 48px;
  background-image: linear-gradient(var(--rule-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--rule-blueprint) 1px, transparent 1px); }
h1, h2, h3, nav, .btn, .label { text-transform: lowercase; }
h1, h2, h3 { font: 400 clamp(2.5rem, 5vw + 1rem, 5rem)/1.05 var(--font-display); letter-spacing: var(--tracking-display); }
.readout { font-family: var(--font-outlier); font-size: 12px; text-transform: lowercase; font-variant-numeric: tabular-nums; color: var(--color-muted); }
.lamp { border: 1px solid var(--color-rule); border-radius: var(--radius-card); overflow: hidden; background: radial-gradient(circle at 50% 60%, oklch(76% 0.17 50 / 0.6), transparent 70%) var(--color-paper-2); }
.verb { color: var(--color-accent-2); }
.verb::after { content: ""; display: block; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 320ms var(--ease-out) 900ms; }
.is-in .verb::after { transform: scaleX(1); }
.btn--primary { border-radius: var(--radius-pill); background: var(--color-accent); color: var(--color-accent-ink); }
::selection { background: oklch(76% 0.17 50 / 0.3); }
```
