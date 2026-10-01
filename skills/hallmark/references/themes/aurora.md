---
name: Aurora
slug: aurora
genre: atmospheric
paper: dark 11 200
display: geometric-sans Sora
accent: chromatic-teal 172
posture: committed
keywords: dev tool, ai tool, generative, model, playground, render, pipeline, observability, deploy, ship, dark mode, after-hours, late-night, nocturnal, moody, aurora, northern lights, blue-green, cold
material: near-black cyan-tilted ground, two cold blooms, weighty Sora over a Sentient serif body, one teal-green signal
signature: cyan and teal-green blooms overlapping across the ground like a curtain, a serif paragraph reading warm inside the cold
---

# Aurora

A near-black ground tilted to cyan under two fixed cold blooms, cyan top-right and teal-green bottom-left, Sora 600 heads over a Sentient body, one teal-green signal. The signature is the two blooms overlapping like a curtain with a serif paragraph inside the cold.

## Tokens

```css
:root {
  --color-paper: oklch(11% 0.025 200); --color-paper-2: oklch(15% 0.028 200); --color-paper-3: oklch(18% 0.030 200);
  --color-ink: oklch(96% 0.010 200); --color-ink-2: oklch(82% 0.012 200); --color-muted: oklch(64% 0.015 200);
  --color-rule: oklch(28% 0.022 200);
  --color-accent: oklch(68% 0.145 172); --color-accent-2: oklch(72% 0.170 200);
  --color-accent-ink: oklch(11% 0.025 200); --color-focus: oklch(75% 0.150 172);
  --font-display: "Sora", system-ui, sans-serif; --font-body: "Sentient", Georgia, serif;
  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 12px; --radius-pill: 999px; --rule-hair: 1px; --shadow-card: 0 8px 24px oklch(4% 0.02 200 / 0.5);
  --tracking-display: -0.035em; --display-weight: 600;
}
```

## Faces

- **Display:** Sora 600, `--tracking-display`, up to 5.75rem, roman. Heavy sans against the serif body.
- **Body:** Sentient 400 and 500, lede and running text both; it warms the cold canvas and is the theme's instant tell. Roman only.
- **Labels, captions, table heads, meta:** Sentient 500 one step smaller, sentence case, in `--color-muted`. Geist Mono appears only inside code and on figures that compare (a latency column, a token count); it never sets a label or a chip.

## Material

- Two cold blooms and no more, fixed and static: cyan (`--color-accent-2`) top-right, teal-green (`--color-accent`) bottom-left, each 25 to 30% of the viewport at low alpha, overlapping toward the centre so the ground curtains. The whole canvas treatment.
- Elevated dark surfaces: `--color-paper-2` and `--color-paper-3` seamed by 1px `--color-rule`, depth from the lightness step and `--shadow-card` (offset and blur in the ground's own dark). The blooms are the only light.
- Soft radii: pill controls, 12px surfaces. The control pair: a teal-green filled pill with `--color-accent-ink` text beside a hairline-outlined pill in ink. The signal stays under 5% of any viewport: that button, a link hover, one status chip.
- The object family is the console panel: an elevated surface with a hairline head row, a status chip and a serif paragraph inside it. Generous void around every panel. No texture.

## Motion

One settle: the lead panel fades in once over 400ms ease-out. Hover grows a teal-green underline on a link, lifts a panel 2px with its shadow deepening. The blooms never animate; no slide, no bounce, no parallax.

## Voice

Cool, dev-fluent, warmed by the serif: name the command, the model, the number.

## Do-nots

- Never one azure bloom at hue 250; Aurora is two blooms and greener, 172 and 200.
- Never a warm accent; the light here is cold.
- Never an all-sans body; running text is the serif.
- Never a thin display; Sora 600, never 300.
- Never a rainbow curtain, and never a built apparatus as the focal object; the canvas is ambient.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=sentient@400,500&display=swap" rel="stylesheet">
```

```css
body { background: var(--color-paper); color: var(--color-ink-2); font-family: var(--font-body); }
body::before { content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(38% 32% at 82% 12%, oklch(72% 0.17 200 / 0.20), transparent 70%),
              radial-gradient(40% 34% at 12% 92%, oklch(68% 0.145 172 / 0.16), transparent 72%); }
.display { font: var(--display-weight) clamp(3rem, 6vw + 1rem, 5.75rem)/1.05 var(--font-display); letter-spacing: var(--tracking-display); color: var(--color-ink); }
.panel { background: var(--color-paper-2); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); border-radius: var(--radius-pill); }
::selection { background: oklch(68% 0.145 172 / 0.35); }
```
