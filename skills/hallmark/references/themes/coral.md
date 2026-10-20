---
name: Coral
slug: coral
genre: modern-minimal
paper: light 97 55
display: grotesk-sans General Sans
accent: warm 30
posture: restrained
keywords: saas, platform, billing, payments, invoicing, dashboard, b2b, startup, product, pricing, analytics, fintech, workflow, team, onboarding, trust, warm, human, calm
material: warm grey paper, warm charcoal ink, General Sans throughout with Geist Mono figures, soft pills, the product built on paper wells, one coral signal in two strengths
photo: muted sepia=8
pictured: Conversational FAQ, Stage hero
---

# Coral

A warm, plain product voice: warm grey paper, warm charcoal ink, General Sans from the head to the smallest label, soft pills and one coral signal, a true coral fill under ink with a deeper coral for the lines it draws. It reads as calm and human because the warmth sits in the paper, the muted photographs and the single colour, not in decoration, and the product itself, built in the same type and pills, does most of the showing. It is not a cream editorial page, not a red alert and not a blue SaaS template.

## Tokens

```css
:root {
  --color-paper: oklch(97% 0.006 55); --color-paper-2: oklch(94.5% 0.007 55); --color-paper-3: oklch(91.5% 0.009 55);
  --color-ink: oklch(21% 0.012 38); --color-ink-2: oklch(29% 0.013 40); --color-muted: oklch(47% 0.013 45);
  --color-rule: oklch(87% 0.009 55); --color-rule-2: oklch(81% 0.011 55);
  --color-accent: oklch(74% 0.125 30); --color-accent-ink: oklch(21% 0.012 38); --color-accent-2: oklch(54% 0.165 29); --color-focus: oklch(54% 0.17 30);
  --font-display: "General Sans", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 8px; --radius-input: 6px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(20% 0.01 35 / 0.05);
  --shadow-lift: 0 1px 2px oklch(20% 0.01 35 / 0.05), 0 18px 40px -22px oklch(20% 0.01 35 / 0.22);
  --tracking-display: -0.03em; --display-weight: 600;
}
```

## Type

- **Display:** General Sans 600, `--tracking-display`, line-height 1.02 to 1.08, sentence case, roman. Section heads take the same face and weight at `--text-section`; a page built on questions asks them in the heads, one per section.
- **A lone price:** the one figure a page is about sets in General Sans 600 at two to three times `--text-display`, tracked to -0.05em, line-height 0.85, its unit beside it at `--text-title` in 500.
- **Body:** General Sans 400 and 500 at 16 to 18px. One family on purpose: the warmth comes from paper and signal, never from a second face.
- **Labels, captions, table heads:** General Sans 500 a step smaller, sentence case, `--color-muted`.
- **Figures in a column:** General Sans has no tabular figures, so amounts, invoice numbers and dates that line up set in Geist Mono 400 at the size of the text beside them. A price in a sentence or a head stays General Sans.

## Surfaces

- 1px `--color-rule` hairlines between rows and around wells; radius 8px on surfaces, 6px on inputs, pills on controls and status. Concentric radii inside a well.
- Depth is the whisper `--shadow-card` on an interactive surface and a paper step on a well. A product window built on the page takes the one lift, `--shadow-lift`, with an inset ink ring at 8%; never a wide soft shadow on a card.
- Bands: a `--color-paper-2` band behind the product's other angles so the built screens lift off it, and one `--color-ink` band with paper text, where the price or the close lives. Two bands a page at most.
- Photographs: work seen at arm's length in daylight, hands on the tools of one trade; never a face to camera or a team at a laptop. Muted so the coral stays the only colour; the card radius, an inset ink ring at 6%, a caption beneath.
- No texture, no mesh, no blur.

## Range

- **The comparison:** a Table of the job done by hand against the job done by the product, the subject column in General Sans 500, the hand column in muted sentences, the product column in status pills; hairlines only, no ticks, no scores.
- **One record's life as Rows:** an invoice from sent to paid, dates in Geist Mono on the left, the event at `--text-title`, its status pill flush right, a 1px ink rule over the first row.
- **The price on the ink band:** the lone figure huge in paper, beside a ruled list of what it pays for and the inline form; the coral stays off the band.
- **The product from another angle:** what the other party sees (an email, a receipt, a document) built at full fidelity on a `--color-paper-2` well, two surfaces overlapping by a column, a caption beneath.

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
- Never a photograph in full colour or of people posing at work; one or two pictures a page, muted, showing the work itself.
- Never a product window as decoration in a corner; built screens stand 520px tall or more and carry the brief's nouns.

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
