---
name: Prism
slug: prism
genre: modern-minimal
paper: light 99.6 260
display: geometric-sans Sora
accent: cool 268
posture: committed
keywords: shipping, logistics, parcel, delivery, api, infrastructure, developer, tracking, payments, fintech, platform, integration, dashboard, live, board, carriers, webhooks, sdk, enterprise
material: white with every neutral tinted toward cobalt, Sora semi-bold, hairline tables, one tilted aurora panel in cobalt as the page's object
signature: a rounded panel tilted five to eight degrees carrying three radial pools of cobalt, violet and cyan under grain, beside a flat cobalt button
---

# Prism

White paper with every neutral tinted toward cobalt, Sora 600 tracked tight, data in hairline tables, and one tilted panel where three radial pools of cobalt, violet and cyan sit under grain, beside a flat cobalt button. The panel is a thing on the page, never a wash behind it.

## Tokens

```css
:root {
  --color-paper: oklch(99.6% 0.002 260); --color-paper-2: oklch(97% 0.008 260); --color-paper-3: oklch(94.5% 0.012 260);
  --color-ink: oklch(22% 0.045 265); --color-ink-2: oklch(32% 0.04 264); --color-muted: oklch(50% 0.030 262);
  --color-rule: oklch(90% 0.012 260);
  --color-accent: oklch(48% 0.20 268); --color-accent-ink: oklch(99.6% 0.002 260); --color-focus: oklch(55% 0.22 268);
  --color-deep: oklch(24% 0.06 265); --color-deep-ink: oklch(96% 0.01 260);
  --color-pool-1: oklch(55% 0.22 268); --color-pool-2: oklch(62% 0.20 320); --color-pool-3: oklch(80% 0.13 205);
  --color-ok: oklch(60% 0.14 160); --color-warn: oklch(66% 0.15 60);
  --font-display: "Sora", ui-sans-serif, system-ui, sans-serif; --font-body: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 14px; --radius-pill: 8px; --rule-hair: 1px;
  --shadow-card: 0 24px 60px oklch(22% 0.045 265 / 0.12);
  --tracking-display: -0.035em;
}
```

One dial, the colourway, stated in the stamp (`prism: daylight`). The first pool is always the accent's own hue.

| Colourway | Paper | Ink | Accent and pools |
| --- | --- | --- | --- |
| `daylight` (default) | the block above | | pools at 268, 320, 205 |
| `harbour-night` | navy `oklch(19% 0.045 262)` | `oklch(95% 0.010 260)` | ice `oklch(82% 0.11 210)` with the navy as its text; pools at 270, 330, 200 |
| `sand` | `oklch(96.5% 0.014 80)`, neutrals at hue 78 | `oklch(24% 0.035 50)` | rust `oklch(58% 0.16 42)`; pools at 40, 350, 85 |

## Faces

- **Display:** Sora 600, `--tracking-display`, line-height 1.02, roman; 700 for the wordmark only. One colour per head. Big figures are Sora 600 at 34 to 56px, tabular.
- **Body:** Geist 400, 16px, line-height 1.55 to 1.6, measure 42 to 46ch, in `--color-muted`.
- **Labels, captions, table heads, meta:** Geist 500 one step smaller, sentence case, in `--color-muted`. JetBrains Mono only inside code, the deep panel and what a machine produced (ids, figures, an ETA). A word a person wrote is never mono.

## Material

- The aurora panel: three radial pools over a linear base, a fractal-noise layer at 18% in soft-light, radius 18 to 26px, tilted 5 to 8 degrees, once per page. An object with edges: never the page's background, never behind text, never blurred, no glow.
- Hairline tables: 1px `--color-rule` between rows, right-aligned tabular figures. Never a card per row.
- The deep panel: code, JSON or an event stream sits on `--color-deep`, with the third pool's hue for keys and a gold for strings.
- Radii: 8px on controls, 14px on cards, 18px on panels; nothing a pill. A screenshot bleeds off the edge of its slot or sits in a plain 18px plate, never inside a drawn phone bezel.
- One shadow, under a card over the aurora.
- The control pair: a flat accent fill with paper text beside a 1px `--color-rule` outline. A 7px status dot in ok, warn or accent states something checkable, never decoration.

## Motion

Operational. Parcels move along lanes at a few pixels a second; an event stream appends a line every 1.4s; a calculator recomputes on input. No reveals, no parallax, and the aurora never animates.

## Voice

Precise, declarative, dated: the id, the hub, the ETA, the rate, each with a date or a unit under it.

## Do-nots

- Never two auroras, and never the aurora as a wash or a hero backdrop.
- Never a gradient button; the panel is the only place hues mix.
- Never neutral grey; every neutral carries the hue.
- Never a card grid of features; features are rows in a table.
- Never fake data; every figure states its moment in time.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Geist:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
.display { font: 600 var(--text-display)/1.02 var(--font-display); letter-spacing: var(--tracking-display); }
.aurora { position: relative; overflow: hidden; border-radius: 18px; rotate: -6deg; background:
  radial-gradient(60% 70% at 20% 20%, var(--color-pool-1), transparent 70%), radial-gradient(55% 65% at 80% 30%, var(--color-pool-2), transparent 70%),
  radial-gradient(70% 60% at 50% 95%, var(--color-pool-3), transparent 70%), linear-gradient(160deg, var(--color-pool-1), var(--color-pool-2)); }
.aurora::after { content: ""; position: absolute; inset: 0; opacity: 0.18; mix-blend-mode: soft-light;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E"); }
.btn { border-radius: var(--radius-pill); padding: 11px 18px; font-weight: 500; border: 1px solid var(--color-rule); background: var(--color-paper); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); border-color: var(--color-accent); }
::selection { background: oklch(48% 0.20 268 / 0.2); }
```
