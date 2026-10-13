---
name: Coral
slug: coral
genre: modern-minimal
paper: light 97 55
display: grotesk-sans General Sans
accent: warm 30
posture: restrained
keywords: saas, platform, billing, payments, invoicing, dashboard, b2b, startup, product, pricing, analytics, fintech, workflow, team, onboarding, trust, warm, human, calm
material: warm grey paper, warm charcoal ink, General Sans throughout with Geist Mono figures, soft pills, one coral signal in two strengths
photo: muted sepia=8
pictured: Conversational FAQ, Settled hero
---

# Coral

A warm, plain product voice: warm grey paper, warm charcoal ink, General Sans from the head to the smallest label, soft pills and one coral signal, a true coral fill under ink with a deeper coral for the lines it draws. It reads as calm and human because the warmth sits in the paper, the muted photographs and the single colour, not in decoration. It is not a cream editorial page, not a red alert and not a blue SaaS template.

## Tokens

```css
:root {
  --color-paper: oklch(97% 0.006 55); --color-paper-2: oklch(94.5% 0.007 55); --color-paper-3: oklch(91.5% 0.009 55);
  --color-ink: oklch(20% 0.010 35); --color-ink-2: oklch(27% 0.012 40); --color-muted: oklch(46% 0.012 45);
  --color-rule: oklch(87% 0.009 55); --color-rule-2: oklch(81% 0.011 55);
  --color-accent: oklch(74% 0.125 30); --color-accent-ink: oklch(20% 0.010 35); --color-accent-2: oklch(54% 0.165 29); --color-focus: oklch(54% 0.17 30);
  --font-display: "General Sans", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 8px; --radius-input: 6px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(20% 0.01 35 / 0.05);
  --shadow-lift: 0 1px 2px oklch(20% 0.01 35 / 0.05), 0 18px 40px -22px oklch(20% 0.01 35 / 0.22);
  --tracking-display: -0.025em; --display-weight: 600;
}
```

## Type

- **Display:** General Sans 600, `--tracking-display`, line-height 1.02 to 1.08, sentence case, roman. Section heads take the same face and weight at the shared `--text-section` step.
- **Body:** General Sans 400 and 500 at 16 to 18px. One family on purpose: the warmth comes from paper and signal, never from a second face.
- **Labels, captions, table heads:** General Sans 500 a step smaller, sentence case, `--color-muted`.
- **Figures:** General Sans has no tabular figures, so figures that line up in a column (amounts, invoice numbers, dates in a table) set in Geist Mono 400 at the size of the text beside them. A price in a sentence or a head stays General Sans.

## Surfaces

- 1px `--color-rule` hairlines between rows and around wells; radius 8px on surfaces, 6px on inputs, pills on controls and status. Concentric radii inside a well.
- Depth is the whisper `--shadow-card` on an interactive surface and a paper step (`--color-paper-2`, `--color-paper-3`) on a well. A product window built on the page takes the one lift, `--shadow-lift`, short and close, with an inset ring of ink at 8%; never a wide soft shadow on a card.
- Bands: a `--color-paper-2` band for a dense section, one `--color-ink` band with paper text. Two bands a page at most.
- Photographs: work seen at arm's length in daylight, a desk by a window, hands on a sketchbook or a keyboard, the tools of one trade on a table; never a face to camera, never a team around a laptop. Muted toward the paper so the coral stays the only colour. The frame is the card radius with an inset ring of ink at 6%; a caption sits beneath in the label style, never on the picture.
- No texture, no mesh, no blur.

## Controls

- An ink-filled pill (`--color-paper` text on `--color-ink`) beside a 1px `--color-rule-2` outlined pill. When the coral is spent on a fill, it is `--color-accent` with `--color-accent-ink` text.
- Links underline on hover in `--color-accent-2`; inputs 48px tall at 6px radius with a 1px `--color-muted` border and the deep coral focus ring.
- Status is a soft pill: an outline for in progress, the coral fill with ink for what is late or being chased, an ink fill for done. The coral stays under 5% of a screen: status, a link's underline, the focus ring, one figure.

## Motion

State only: an underline grows under a link, a border lifts to `--color-rule-2` on a focusable surface, a pill darkens one step. No reveal, nothing autoplays.

## Voice

Plain, warm sentences in the second person about the work and the money: the client, the amount, the date, what the product did. Kind to the person who pays late, never cute, never hype.

## Do-nots

- Never cool paper or a blue signal; warm grey and coral, or it is not this theme.
- Never a second text face: no serif, no other sans; Geist Mono only for figures in a column.
- Never square 4px controls on the primary action; Coral is pills.
- Never coral as a band, a gradient or a head; the deep coral draws lines and one figure, the coral fill marks a status.
- Never a photograph in full colour or of people posing at work; the pictures are muted and show the work itself.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: var(--display-weight); }
.btn { border: 1px solid transparent; border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-lg); font-weight: 500; }
.btn--primary { background: var(--color-ink); color: var(--color-paper); }
.btn--secondary { border-color: var(--color-rule-2); color: var(--color-ink); }
.status { border: 1px solid var(--color-rule-2); border-radius: var(--radius-pill); font-weight: 500; } .status--late { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
.well { background: var(--color-paper-2); border-radius: var(--radius-card); }
.lifted { background: var(--color-paper); border-radius: var(--radius-card); box-shadow: var(--shadow-lift); outline: 1px solid color-mix(in oklab, var(--color-ink) 8%, transparent); outline-offset: -1px; }
.fig { font-family: var(--font-outlier); font-variant-numeric: tabular-nums; }
a { text-underline-offset: 0.2em; } a:hover { text-decoration-color: var(--color-accent-2); }
::selection { background: color-mix(in oklab, var(--color-accent) 35%, transparent); }
```
