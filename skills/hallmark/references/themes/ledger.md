---
name: Ledger
slug: ledger
genre: modern-minimal
paper: dark 19 18
display: grotesk-sans Instrument Sans
accent: chromatic-teal 182
posture: committed
keywords: treasury, banking, fintech, payments, reconciliation, ledger, accounting, close, month end, audit, balance, cash management, payouts, settlement, compliance, controller, bookkeeping, finance team, invoicing, payroll
material: oxblood binding for a ground, bone ink, Instrument Sans with tabular IBM Plex Mono figures, ruled rows and double-ruled totals, two inks with one job each
photo: duotone paper ink
pictured: Narrative Workflow, Stage hero
---

# Ledger

A page of a book, never a console: a ground the colour of an oxblood binding, bone ink, Instrument Sans for words and tabular IBM Plex Mono for every figure, rows ruled like an account book, and two inks with one job each, credit and debit. It reads as audited and calm: figures align digit for digit, a total closes on a double rule, nothing glows. It is not a dashboard of tiles, a neon trading screen or a wine list.

## Tokens

```css
:root {
  --color-paper: oklch(19% 0.040 18); --color-paper-2: oklch(23.5% 0.044 18); --color-paper-3: oklch(21% 0.042 18);
  --color-ink: oklch(94% 0.014 75); --color-ink-2: oklch(85% 0.018 60); --color-muted: oklch(72% 0.024 45);
  --color-rule: oklch(33% 0.042 18);
  --color-accent: oklch(80% 0.11 182); --color-accent-2: oklch(81% 0.11 88); --color-accent-ink: oklch(19% 0.040 18);
  --color-focus: oklch(80% 0.11 182);
  --font-display: "Instrument Sans", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 10px; --radius-input: 6px; --radius-pill: 0; --rule-hair: 1px; --rule-total: 3px;
  --shadow-card: 0 12px 32px -16px oklch(8% 0.03 18 / 0.6);
  --tracking-display: -0.025em; --display-weight: 600;
}
```

Three dials, each stated in the stamp (`ledger: bordeaux/teal-brass/banded`); two Ledger pages in one run differ on two of them.

| Dial | Options |
| --- | --- |
| **Binding** (the neutrals take its hue) | `bordeaux` (default) as above. `navy`: `oklch(20% 0.025 255)`. `cloth`: `oklch(19% 0.024 168)` |
| **Inks** (credit, then debit) | `teal-brass` (default). `ice-oxide`: `oklch(82% 0.085 215)` and `oklch(64% 0.14 38)`; cloth takes ice-oxide |
| **Ruling** | `banded` (default): rows in `--color-paper-3` at 28 to 34px. `columnar`: 1px columns in `--color-rule` the full height of a band |

## Type

- **Display:** Instrument Sans 600, `--tracking-display`, line-height 1.02, sentence case; no thin weight.
- **Body:** Instrument Sans 400 and 500 at 1.0625rem, line-height 1.55.
- **Figures:** IBM Plex Mono 400 and 500, tabular, on every number; mono is this theme's material. A figure set as a statement is mono 500 at `--text-display` or larger, tracked -0.03em, in its side's ink or in `--color-ink`. A column head over figures may be mono; over words it is the body face a step smaller, untracked.
- **Captions, field labels, status words, meta:** Instrument Sans 500 a step smaller, sentence case, `--color-muted`.

## Surfaces

- 1px `--color-rule` on every edge and between rows. A total sits under a 1px ink rule and closes on a `--rule-total` double rule in `--color-ink`; the nav may close the same way.
- Radius 10px on wells, 6px on controls; never a pill.
- Depth: a raised well in `--color-paper-2` under `--shadow-card`; everything else lies flat.
- The ruling is the one texture, on a band or a well, never behind running text; it never brightens, moves or carries chroma.
- Bands: a `--color-paper-2` band or a ruled band; never a light band and never a field of either ink. Two a page at most.
- Photographs: rare and quiet, the work behind the figures (paper, a pen over a column, a desk at the day's end), no faces, printed duotone paper to ink at 10px with a `--color-rule` edge; a caption states the date or account; text never sits on one.

## Range

- A comparison as a T-account: two sides under one ruled head, a single vertical rule between them, rows aligned across, each side closing on its own double-ruled line.
- A figure set as a statement: a real number from the brief in Plex Mono at display size, aligned to its unit, a double rule under it and its one line beside it.
- A sequence as a day book: stages on a ruled band, mono numerals at the section step, a time or a date in the margin where the brief gives one.
- A list as a statement of account: dates in mono on the left, the entry in words, the amount right-aligned, a running total in the last column footing on a double rule.

## Controls

- The pair: a solid bone button (`--color-ink` with `--color-paper` text) at 6px beside a hairline button outlined in `--color-muted`.
- Two inks, two jobs: credit (`--color-accent`, money in) takes credit figures, a matched mark and the focus ring; debit (`--color-accent-2`, money out) only ever colours a figure. A figure with no side takes `--color-ink`; a third meaning takes a word, not a hue.
- Inputs: 6px radius, a 1px `--color-muted` edge on `--color-paper`, figures in mono; links underline in the credit ink.

## Motion

Near-still, like a printed page: a linked row shifts one paper step on hover, a button dips 1px on active. Nothing counts up, nothing reveals, nothing pulses.

## Voice

Declarative, numeric, audited: the figure, its date, the run time, what is not yet reconciled. A balance states its moment; a figure without a date is an assertion, not a record.

## Do-nots

- Never a proportional numeral on a figure, and never mono on words.
- Never a red debit and never a third hue; two inks, two jobs.
- Never a total that does not foot.
- Never a grid of tiles with a number in each; figures live in rows, sides and totals.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: 600; line-height: 1.02; }
.num, .figure, td.num { font-family: var(--font-outlier); font-variant-numeric: tabular-nums; }
.figure { font-size: var(--text-display); font-weight: 500; letter-spacing: -0.03em; }
.cr { color: var(--color-accent); } .dr { color: var(--color-accent-2); }
.btn { border: var(--rule-hair) solid var(--color-muted); border-radius: var(--radius-input); padding: var(--space-sm) var(--space-lg); font-weight: 500; background: transparent; color: var(--color-ink); transition: transform var(--dur-micro) var(--ease-out); }
.btn--primary { background: var(--color-ink); border-color: var(--color-ink); color: var(--color-paper); }
.btn:active { transform: translateY(1px); }
.well { background: var(--color-paper-2); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
.total { border-top: var(--rule-hair) solid var(--color-ink); border-bottom: var(--rule-total) double var(--color-ink); }
.ruled { background-image: repeating-linear-gradient(to bottom, transparent 0 31px, var(--color-paper-3) 31px 62px); }
::selection { background: color-mix(in oklab, var(--color-accent) 30%, transparent); }
```
