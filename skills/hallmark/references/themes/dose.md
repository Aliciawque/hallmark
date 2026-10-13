---
name: Dose
slug: dose
genre: modern-minimal
paper: light 99 160
display: grotesk-sans Schibsted Grotesk
accent: chromatic-green 160
posture: committed
keywords: health, medication, pharmacy, care, carer, family, reminders, schedule, app, mobile, medicine, patients, clinic, prescription, tracking, calm, trust, routine, elderly, parents
material: near-white paper with pale green tint bands, green-black ink, Schibsted Grotesk over Instrument Sans with DM Mono for times and doses, soft app radii, one pharmacy green
photo: natural sat=-15 con=-6
pictured: Feature Stack, Settled hero
---

# Dose

A calm care register: near-white paper with pale green tint bands, green-black ink, Schibsted Grotesk heads over Instrument Sans, DM Mono for the time and the milligrams, the soft radii of a phone app and one pharmacy green. It reads as trustworthy because it is exact and unhurried, the green lives in the paper as much as in the signal, and its photographs are of a home, not a clinic. It is not a clinical blue portal, not a wellness pastel and not an alarm.

## Tokens

```css
:root {
  --color-paper: oklch(99% 0.005 160); --color-paper-2: oklch(97% 0.016 160); --color-paper-3: oklch(94% 0.03 160);
  --color-ink: oklch(19% 0.012 170); --color-ink-2: oklch(30% 0.015 170); --color-muted: oklch(50% 0.022 165);
  --color-rule: oklch(88% 0.02 160);
  --color-accent: oklch(50% 0.13 160); --color-accent-ink: oklch(99% 0.005 160); --color-focus: oklch(45% 0.14 160);
  --font-display: "Schibsted Grotesk", ui-sans-serif, sans-serif; --font-body: "Instrument Sans", ui-sans-serif, sans-serif;
  --font-outlier: "DM Mono", ui-monospace, monospace;
  --radius-card: 12px; --radius-input: 8px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(30% 0.03 165 / 0.08), 0 24px 48px -24px oklch(40% 0.08 165 / 0.35);
  --tracking-display: -0.028em;
}
```

Committed: the paper family is the green; paper-2 and paper-3 are tint bands, while the accent proper stays on the controls, the focus and one figure. Three grounds, stated in the stamp (`dose: white`).

| Ground | Paper and ink | The green |
| --- | --- | --- |
| **White** (default) | near-white under near-black; tint bands at 97% and 94% | `oklch(50% 0.13 160)` |
| **Green** | drenched `oklch(46% 0.12 160)` under white ink; surfaces are white with dark ink inside | mint `oklch(88% 0.09 160)` on the ground, green on a white surface |
| **Night dose** | `oklch(13% 0.01 170)` under `oklch(96% 0.01 160)`, surfaces at 20% | mint `oklch(86% 0.13 160)` with dark ink on it |

## Type

- **Display:** Schibsted Grotesk 700, `--tracking-display`, line-height 1.02, sentence case, roman. A price or a count set large takes 700 at -0.035em.
- **Body:** Instrument Sans 400 and 500, 16 to 18px, line-height 1.5.
- **Labels, captions, table heads:** Instrument Sans 500 a step smaller, sentence case.
- **Times and doses:** DM Mono 400 and 500, `08:00` and `500 mg`, at the size of the text they sit in, like a pharmacy label; never a caption, a tab, a table head or a display figure.

## Surfaces

- Radii that read as an app: 8px on controls and inputs, 12px on surfaces, 999 on tags, a phone-sized screen at about 28px. Hairlines at 1px; a flat surface's edge is a `0 0 0 1px` rule ring rather than a border.
- Depth: a white surface on a tint band takes the one soft green-tinted lift (`--shadow-card`), short and close, with no ring under it; nothing else lifts.
- Bands: `--color-paper-2` and `--color-paper-3` tint bands; on the White ground the green itself never fills a band. Two a page at most.
- Photographs: the home where a dose is given, close to mid distance in soft daylight: a kitchen table in the morning, a weekly pill organiser beside a mug, an older hand around a cup, a phone on the counter. Hands and rooms, never a face to camera, never a clinic. Softened (the `photo:` line); 12px radius with the rule ring; captions beneath in the label style, never a head over a photograph.
- No gradient, no mesh, no texture.

## Controls

- The pair: a green fill with paper text beside a 1.5px inset rule outline, both 52px tall, both at 8px.
- Links are ink and underline in green on hover. Inputs: 52px tall at 8px with a 1px `--color-muted` border; focus in `--color-focus`.
- The green sits on the primary control, a link's hover, the focus ring, a checked state and one figure; the tint bands carry the rest of the hue.

## Motion

One settle: a surface fades in once over `--dur-long` on `--ease-out`. A check fills on tap over `--dur-micro`; a time never ticks. Nothing autoplays, nothing pulses.

## Voice

A pharmacist's plainness: the name, the dose, the time, who gave it. Reassuring by being exact. Never a journey, never a warning in red.

## Do-nots

- Never red or amber for a missed or late state; it is grey, and the page stays calm.
- Never a medical blue or a second brand colour; one green does every signal.
- Never clinical stock: spilled pills, blister packs in close-up, white coats, a patient smiling at the camera.
- Never a sharp-cornered surface or a square button; Dose is 8, 12 and 999.
- Never mono on a label or a tab; mono is the time and the milligrams.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@700&family=Instrument+Sans:wght@400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: 700; letter-spacing: var(--tracking-display); } h1, h2 { line-height: 1.02; }
.btn { height: 52px; padding: 0 var(--space-lg); border-radius: var(--radius-input); font: 500 var(--text-md) var(--font-body); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { box-shadow: inset 0 0 0 1.5px var(--color-rule); background: var(--color-paper); color: var(--color-ink); }
.card { background: var(--color-paper); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.band { background: var(--color-paper-2); } .band--deep { background: var(--color-paper-3); }
.dose { font-family: var(--font-outlier); font-variant-numeric: tabular-nums; }
::selection { background: color-mix(in oklab, var(--color-accent) 25%, transparent); }
```
