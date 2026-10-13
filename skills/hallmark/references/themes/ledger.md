---
name: Ledger
slug: ledger
genre: modern-minimal
paper: dark 19 20
display: grotesk-sans Instrument Sans
accent: chromatic-teal 182
posture: committed
keywords: treasury, banking, fintech, payments, reconciliation, ledger, accounting, close, month end, audit, balance, cash management, payouts, settlement, compliance, controller, bookkeeping, finance team, invoicing, payroll
material: oxblood binding for a ground, bone ink, Instrument Sans with tabular IBM Plex Mono figures, ruled rows and double-ruled totals, two inks with one job each
photo: duotone paper ink
pictured: Split Studio, Stage hero
---

# Ledger

A page of a book, never a console: a ground the colour of an oxblood binding, bone ink, Instrument Sans for words and tabular IBM Plex Mono for every figure, rows ruled like an account book, and two inks with one job each, credit and debit. It reads as audited and calm: figures align digit for digit, a total closes on a double rule, nothing glows. It is not a dashboard of tiles, a neon trading screen or a wine list.

## Tokens

```css
:root {
  --color-paper: oklch(19% 0.034 20); --color-paper-2: oklch(23% 0.036 20); --color-paper-3: oklch(21.5% 0.035 20);
  --color-ink: oklch(94% 0.014 75); --color-ink-2: oklch(85% 0.018 60); --color-muted: oklch(71% 0.022 45);
  --color-rule: oklch(31% 0.036 20);
  --color-accent: oklch(80% 0.11 182); --color-accent-2: oklch(81% 0.11 88); --color-accent-ink: oklch(19% 0.034 20);
  --color-focus: oklch(80% 0.11 182);
  --font-display: "Instrument Sans", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 10px; --radius-input: 6px; --radius-pill: 0; --rule-hair: 1px;
  --shadow-card: 0 12px 32px -16px oklch(8% 0.03 20 / 0.6);
  --tracking-display: -0.02em;
}
```

Three dials, each stated in the stamp (`ledger: bordeaux/teal-brass/banded`); two Ledger pages in one run differ on at least two of them.

| Dial | Options |
| --- | --- |
| **Binding** (the ground; the neutrals take its hue, the ink turns cool off bordeaux) | `bordeaux` (default): `oklch(19% 0.034 20)`. `navy`: `oklch(20% 0.025 255)`. `cloth`: `oklch(19% 0.024 168)` |
| **Inks** (credit, then debit) | `teal-brass` (default): `oklch(80% 0.11 182)` and `oklch(81% 0.11 88)`. `ice-oxide`: `oklch(82% 0.085 215)` and `oklch(64% 0.14 38)`. Inks sit 40 degrees or more from the binding: bordeaux takes teal-brass, cloth ice-oxide |
| **Ruling** (the texture) | `banded` (default): row bands in `--color-paper-3` at 28 to 34px. `columnar`: 1px vertical columns in `--color-rule` the full height of a band |

## Type

- **Display:** Instrument Sans 600, `--tracking-display`, sentence case; no thin weight.
- **Body:** Instrument Sans 400 and 500 at 1.0625rem, line-height 1.55.
- **Figures:** IBM Plex Mono 400 and 500 with tabular numerals on every number; mono is this theme's material. A headline figure is mono 500 in its side's ink. A column head over figures may be mono; over words it is the body face, a step smaller, untracked.
- **Captions, field labels, status words, meta:** Instrument Sans 500 a step smaller, sentence case, `--color-muted`.

## Surfaces

- 1px `--color-rule` on every edge and between rows. A total sits under a 1px rule and closes on a double rule in `--color-ink`.
- Radius 10px on wells and photographs, 6px on controls; never a pill.
- Depth: a raised well in `--color-paper-2` under `--shadow-card`; everything else lies flat.
- The ruling is the one texture, on a band or a well, never behind running text; it never brightens, moves or carries chroma.
- Bands: a `--color-paper-2` band or a ruled band; never a light band and never a field of either ink. Two a page at most.
- Photographs: close, quiet pictures of the work behind the figures: statements and receipts on a desk, a pen over a printed column, an office at the end of the day; level light, no faces. They print in the binding's two colours, duotone paper to ink. A 1px `--color-rule` edge at 10px; a caption beneath in the label style states the fact, a date or an account; text never sits on a photograph.

## Controls

- The pair: a solid bone button (`--color-ink` with `--color-paper` text) at 6px beside a hairline button outlined in `--color-rule`.
- Two inks, two jobs: credit (`--color-accent`, money in) takes credit figures, a matched mark and the focus ring; debit (`--color-accent-2`, money out) only ever colours a figure. A figure with no side takes `--color-ink`; a third meaning takes a word, not a hue.
- Inputs: 6px radius, a 1px `--color-rule` edge on `--color-paper-2`, figures in mono; links underline in the credit ink.

## Motion

Near-still, like a printed page: a linked row shifts one paper step on hover, a button dips 1px on active. Nothing counts up, nothing reveals, nothing pulses.

## Voice

Declarative, numeric, audited: the figure, its date, the lock time, what is not yet reconciled. A balance states its moment; a figure without a date is an assertion, not a record.

## Do-nots

- Never a proportional numeral on a figure, and never mono on words.
- Never a red debit and never a third hue; two inks, two jobs.
- Never a total that does not foot.
- Never strip out the ruling; it is the texture.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: 600; }
.num, .figure, td.num { font-family: var(--font-outlier); font-variant-numeric: tabular-nums; }
.cr { color: var(--color-accent); } .dr { color: var(--color-accent-2); }
.btn { border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-input); padding: var(--space-sm) var(--space-lg); font-weight: 500; background: transparent; color: var(--color-ink); transition: transform var(--dur-micro) var(--ease-out); }
.btn--primary { background: var(--color-ink); border-color: var(--color-ink); color: var(--color-paper); }
.btn:active { transform: translateY(1px); }
.well { background: var(--color-paper-2); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.total { border-bottom: 3px double var(--color-ink); }
.ruled { background-image: repeating-linear-gradient(to bottom, transparent 0 31px, var(--color-paper-3) 31px 62px); }
::selection { background: color-mix(in oklab, var(--color-accent) 30%, transparent); }
```
