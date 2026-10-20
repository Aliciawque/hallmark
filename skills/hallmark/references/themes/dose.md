---
name: Dose
slug: dose
genre: modern-minimal
paper: light 99 160
display: grotesk-sans Schibsted Grotesk
accent: chromatic-green 160
posture: committed
keywords: health, medication, pharmacy, care, carer, family, reminders, schedule, app, mobile, medicine, patients, clinic, prescription, tracking, calm, trust, routine, elderly, parents
material: near-white paper with pale green tint bands and one green-black ink band, green-black ink, Schibsted Grotesk over Instrument Sans with DM Mono for times and doses, soft app radii, one pharmacy green with a mint second strength
photo: natural sat=-15 con=-6
pictured: Care Register, Settled hero
---

# Dose

A calm care register: near-white paper with pale green tint bands, green-black ink, Schibsted Grotesk heads over Instrument Sans, DM Mono for the time and the milligrams, the soft radii of a phone app and one pharmacy green. It is trustworthy because it is exact and unhurried, and its photographs are of a home, not a clinic. It is not a clinical blue portal, not a wellness pastel and not an alarm.

## Tokens

```css
:root {
  --color-paper: oklch(99% 0.006 160); --color-paper-2: oklch(96.5% 0.02 160); --color-paper-3: oklch(93% 0.036 160);
  --color-ink: oklch(21% 0.025 170); --color-ink-2: oklch(31% 0.02 170); --color-muted: oklch(49% 0.024 165);
  --color-rule: oklch(87% 0.024 160);
  --color-accent: oklch(50% 0.13 160); --color-accent-deep: oklch(42% 0.11 162); --color-accent-soft: oklch(88% 0.08 160); --color-accent-ink: oklch(99% 0.006 160);
  --color-focus: oklch(45% 0.14 160);
  --font-display: "Schibsted Grotesk", ui-sans-serif, sans-serif; --font-body: "Instrument Sans", ui-sans-serif, sans-serif;
  --font-outlier: "DM Mono", ui-monospace, monospace;
  --radius-card: 14px; --radius-input: 8px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(30% 0.03 165 / 0.08), 0 24px 48px -24px oklch(40% 0.08 165 / 0.35);
  --tracking-display: -0.03em; --display-weight: 700;
}
```

Committed: the paper family is the green; paper-2 and paper-3 are tint bands, the ink is a green-black that can carry one band, mint (`--color-accent-soft`) marks what is checked, and the accent proper stays on the controls, the focus and one figure. Three grounds, stated in the stamp (`dose: white`).

| Ground | Paper and ink | The green |
| --- | --- | --- |
| **White** (default) | the tokens above | `oklch(50% 0.13 160)` |
| **Green** | drenched `oklch(46% 0.12 160)` under white ink; surfaces are white with dark ink inside | mint `oklch(88% 0.09 160)` on the ground, green on a white surface |
| **Night dose** | `oklch(13% 0.01 170)` under `oklch(96% 0.01 160)`, surfaces at 20% | mint `oklch(86% 0.13 160)` with dark ink on it |

## Type

- **Display:** Schibsted Grotesk 700, `--tracking-display`, line-height 1.02, sentence case, roman, lining tabular figures. A price or a count set large takes 700 at -0.04em.
- **Body:** Instrument Sans 400 and 500, 16 to 18px, line-height 1.5.
- **Labels, captions, table heads:** Instrument Sans 500 a step smaller, sentence case.
- **Times and doses:** DM Mono 400 and 500, `08:00` and `500 mg`, at the size of the text they sit in, like a pharmacy label, or at title size where a timetable's first column is the time; never a label, a tab, a table head or a display figure. Three weights a page: 400, 500, 700.

## Surfaces

- Radii that read as an app: 8px on controls and inputs, 14px on surfaces, 999 on tags, a phone-sized screen at about 28px. A flat surface's edge is a 1px rule ring, not a border.
- Depth: a white surface on a tint band takes the one soft green-tinted lift (`--shadow-card`), no ring under it; nothing else lifts.
- Bands: `--color-paper-2` and `--color-paper-3` tint bands, and at most one `--color-ink` band with paper text for a statement; on the White ground the green itself never fills a band. Two a page, never touching.
- Photographs: the home where a dose is given, in soft daylight: a kitchen table, a pill organiser beside a mug, an older hand, a phone on the counter. Hands and rooms, never a face to camera, never a clinic. Softened (the `photo:` line); 14px radius with the rule ring; captions beneath in the label style, never a head over a photograph.
- No gradient, no mesh, no texture.

## Range

- **Timetable:** a day of doses as a full-width ruled table: the time in DM Mono at title size in the first column, the dose in Instrument Sans 500, the amount and who gave it in muted, the state as a pill (green filled when given, a rule ring when due, grey when missed).
- **The product, large:** a phone-sized screen at 28px radius lifted on a tint band, or one dose cropped from it at twice its size.
- **Statement on the ink band:** one plain sentence in Schibsted 700 at `--text-display` on the green-black, one figure or word in mint beneath it, nothing else.
- **Price or plan as a lifted surface:** one white surface on a tint band holding the price in Schibsted 700 at display size and three or four ruled lines of what is included, the form or the action beside it.

## Controls

- The pair: a green fill with paper text beside a 1.5px inset rule outline, both 52px tall, both at 8px.
- Links underline in green on hover. Inputs: 52px at 8px with a 1px `--color-muted` border.
- Toggles and choices are pills: a rule ring at rest, mint fill with ink text when checked. The green sits on the primary control, a link's hover, the focus ring and one figure; the tint bands carry the rest of the hue.

## Motion

One settle: a surface fades in once over `--dur-long` on `--ease-out`; a check fills over `--dur-micro`. Nothing ticks, autoplays or pulses.

## Voice

A pharmacist's plainness, spoken by a family: the name, the dose, the time, who gave it, in the words a son or daughter uses (Mum, your brother). Reassuring by being exact. Never a journey, never a warning in red.

## Do-nots

- Never red or amber for a missed or late state; it is grey, and the page stays calm.
- Never a medical blue or a second brand colour; one green does every signal.
- Never clinical stock: spilled pills, blister packs in close-up, white coats, a patient smiling at the camera.
- Never a sharp-cornered surface or a square button; Dose is 8, 14 and 999.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@700&family=Instrument+Sans:wght@400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: 700; letter-spacing: var(--tracking-display); } h1, h2 { line-height: 1.02; }
.btn { height: 52px; padding: 0 var(--space-lg); border-radius: var(--radius-input); font: 500 var(--text-md) var(--font-body); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); } .btn--primary:hover { background: var(--color-accent-deep); }
.btn--secondary { box-shadow: inset 0 0 0 1.5px var(--color-rule); background: var(--color-paper); color: var(--color-ink); }
.card { background: var(--color-paper); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.band { background: var(--color-paper-2); } .band--deep { background: var(--color-paper-3); } .band--ink { background: var(--color-ink); color: var(--color-paper); }
.toggle:checked + label { background: var(--color-accent-soft); color: var(--color-ink); box-shadow: none; }
.dose { font-family: var(--font-outlier); font-variant-numeric: tabular-nums; }
::selection { background: color-mix(in oklab, var(--color-accent) 25%, transparent); }
```
